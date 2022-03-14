import * as React from "react";
import {
    Show,
    Create,
    Edit,
    List as RaList,
    TextField,
    Filter,
    SearchInput,
    SimpleList,
    SimpleShowLayout,
    DateField,
    ReferenceField,
    ImageField,
    TabbedForm,
    FormTab,
    BooleanField,
    EmailField,
    useListContext,
    Pagination,
    TextInput,
    DateInput,
    BooleanInput,
    ImageInput,
    ReferenceInput,
    SelectInput,
    NumberInput
} from "react-admin";
import {
    useMediaQuery,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { stringify } from "query-string";
import UserIcon from "@material-ui/icons/Group";
import { usePermissions } from 'react-admin';

const useStyles = makeStyles({
    root: {
        marginTop: "1em",
    },
    media: {
        height: 200,
    },
    image: {
        width: 50,
        height: 50,
    },
    title: {
        paddingBottom: "0.5em",
    },
    actionSpacer: {
        display: "flex",
        justifyContent: "space-around",
    },
    icon: { paddingRight: "0.5em" },
    link: {
        display: "inline-flex",
        alignItems: "center",
    },
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

const EmployeeFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

const employee_position_choices = [
    { id: "worker", name: "Worker" },
    { id: "supervisor", name: "Supervisor" },
    { id: "manager", name: "Manager" },
];

export const LinkToRelatedDepartment = ({ record }) => {
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: "/department",
                search: stringify({
                    filter: JSON.stringify({ id: record.id }),
                }),
            }}
            className={classes.link}
        >
            <UserIcon className={classes.icon} />
        </Button>
    ) : null;
};

export const EmployeeContext = () => {
    const imageFieldClasses = useStyles();
    const { data, ids } = useListContext();
    return ids ? (
        <List>
            {ids.map(id => {
                const employee = data[id];
                return (
                    <ListItem
                        button
                        key={id}
                        component={Link}
                        to={`/employees/${id}`}
                    >
                        <ListItemAvatar>
                            <Avatar src={employee.profile.path} variant="square" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${employee.profile.firstname} ${employee.profile.lastname}`}
                            secondary={
                                <>
                                    {employee.job_name} at{' '}
                                    <ReferenceField
                                        record={employee}
                                        source="department"
                                        reference="departments"
                                        link={false}
                                    >
                                        <TextField source="name" />
                                    </ReferenceField>{' '}
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="body1" color="textSecondary">
                                <ReferenceField
                                        record={employee}
                                        source="department"
                                        reference="departments"
                                        link={false}
                                    >
                                        <ReferenceField source="managers" reference="employees" link={true}>
                                            <ImageField classes={imageFieldClasses} source="profile.path"/>
                                        </ReferenceField>
                                </ReferenceField>
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    ) : null
};

export const EmployeeList = ({...props }) => {
    const { loaded, permissions } = usePermissions();
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return loaded ? (        
            <RaList
                {...props}
                perPage={25}
                pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
                filters={<EmployeeFilter />}
                bulkActionButtons={permissions.includes('manager') || permissions.includes('supervisor') ? true : false}
            >
                {isSmall ? (
                    <SimpleList
                        primaryText={(record) => record.name}
                        linkType={permissions.includes('supervisor') ||  permissions.includes('manager') ? "edit" : "show"}
                    />
                ) : (
                    <EmployeeContext permissions={permissions} />
                )}
    
            </RaList>
    ) : null
};

export const EmployeeShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="profile.firstname" />
                <TextField source="profile.lastname" />
                <DateField source="profile.birthday" />
                <TextField source="profile.phone" />
                <ImageField source="profile.path" />
                <TextField source="user.username" label="Username" />
                <TextField source="user.access_type" label="Access Type" />
                <EmailField source="user.email" label="Email" />
                <BooleanField source="user.isActive" label="Is Active?" />
            </SimpleShowLayout>
        </Show>
    )
};

export const EmployeeEdit = (props) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Profile">
                <TextInput source="profile.firstname" label="Firstname" />
                <TextInput source="profile.lastname" label="Lastname" />
                <DateInput source="profile.birthday" label="Birthday" />
                <TextInput source="profile.phone" label="Phone" />
                <ImageField source="profile.path" alt="picture" label="Picture" />
            </FormTab>
            <FormTab label="Company">
                <SelectInput choices={employee_position_choices} source="position" required />
                <TextInput source="job_name" />
                <DateInput source="hire_date" />
                <ReferenceInput
                    source="department"
                    reference="departments"
                    link={false}
                >
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>
                <NumberInput source="salary" />
            </FormTab>
            <FormTab label="Account">
                <TextInput source="user.username" label="Username" />
                <TextInput type="email" source="user.email" label="Email" />
                <BooleanInput source="user.isActive" label="Is Active?" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const EmployeeCreate = (props) => (
    <Create {...props}>
        <TabbedForm redirect={false}>
            <FormTab label="Profile">
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <DateInput source="birthday" />
                <TextInput source="phone" />
                <ImageInput source="picture" label="Profile Picture" accept="image/*" required>
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="Company">
                <SelectInput choices={employee_position_choices} source="position" required />
                <TextInput source="job_name" />
                <DateInput source="hire_date" />
                <ReferenceInput
                    source="department"
                    reference="departments"
                    link={false}
                >
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>
                <NumberInput source="salary" />
            </FormTab>
            <FormTab label="Account">
                <TextInput source="username" label="Username" />
                <TextInput type="email" source="email" label="Email" />
                <BooleanInput source="isActive" label="Is Active?" />
            </FormTab>
        </TabbedForm>
    </Create>
);
