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
    NumberInput,
    usePermissions,
    Button as RaButton,
    Toolbar,
    SaveButton,
    DeleteButton,
    useTranslate,
    PasswordInput
} from "react-admin";
import { useForm } from 'react-final-form';
import {
    useMediaQuery,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { stringify } from "query-string";
import UserIcon from "@material-ui/icons/Group";

const useStyles = makeStyles({
    image: {
        width: 50,
        height: 50,
    },
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

export const CredentialsButton = (props) => {
    const translate = useTranslate();
    const [disable, setDisable] = React.useState(false);
    const form = useForm();
    const handleClick = () => {
        let firstname = form.getFieldState('firstname');
        let lastname = form.getFieldState('lastname');
        let password = Math.random().toString(36).substring(2, 15);
        let randomF = Math.floor(Math.random() * 5) + 2;
        let randomL = Math.floor(Math.random() * 7) + 3;
        if(firstname.value !== undefined && lastname.value !== undefined ){
            let username = firstname.value.substr(0,randomF).toLowerCase()+"."+lastname.value.substr(0,randomL).toLowerCase();
            form.change("username",username);
            form.change("email", username+"@localhost.com");
            form.change("password", password);
            setDisable(true);
        }
        else {
            alert(translate("resources.employees.Fill Profile Tab first"));
        }
    }
    return (
        <RaButton label="Generate" color="primary" onClick={handleClick} {...props} disabled={disable} />
    )
}

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
                            <ReferenceField
                                record={employee}
                                source="department"
                                reference="departments"
                                link={false}
                            >
                                <ReferenceField source="managers" reference="employees" link={true}>
                                    <>
                                        <ImageField classes={imageFieldClasses} source="profile.path" />
                                    </>
                                </ReferenceField>
                            </ReferenceField>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    ) : null
};

export const PermissionsHandle = (permissions) => {
    return typeof permissions === "string" ? (permissions.includes('manager') || permissions.includes('supervisor') ? true : false) : false;
}

export const EmployeeList = ({ ...props }) => {
    const { loaded, permissions } = usePermissions();
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return loaded ? (
        <RaList
            {...props}
            perPage={25}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
            filters={<EmployeeFilter />}
            bulkActionButtons={<PermissionsHandle permissions={permissions} />}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    linkType={permissions.includes('supervisor') || permissions.includes('manager') ? "edit" : "show"}
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
                <ImageField source="profile.path" label="Picture" />
                <TextField source="profile.firstname" label="Firstname" />
                <TextField source="profile.lastname" label="Lastname" />
                <DateField source="profile.birthday" label="Birthday" />
                <TextField source="profile.phone" label="Phone" />
                <TextField source="user.username" label="Username" />
                <TextField source="user.access_type" label="Access Type" />
                <EmailField source="user.email" label="Email" />
                <BooleanField source="user.isActive" label="Is Active?" />
            </SimpleShowLayout>
        </Show>
    )
};

const CustomToolbar = (props) => {
    const { loaded, permissions } = usePermissions();
    return loaded ? (
        <>
            <Toolbar {...props}>
                <SaveButton />
                {permissions.includes('manager') ? <DeleteButton style={{ marginLeft: "auto" }} /> : null}
            </Toolbar>
        </>
    ) : null;
};

export const EmployeeEdit = (props) => (
    <Edit {...props}>
        <TabbedForm toolbar={<CustomToolbar />}>
            <FormTab label="Profile">
                <TextInput source="profile.firstname" record={props.record} />
                <TextInput source="profile.lastname" />
                <DateInput source="profile.birthday" />
                <TextInput source="profile.phone" />
                <ImageField source="profile.path" alt="picture" />
            </FormTab>
            <FormTab label="Company">
                <SelectInput choices={employee_position_choices} source="position" required />
                <TextInput source="job_name" />
                <DateInput source="hire_date" />
                <ReferenceInput
                    source="department"
                    reference="departments"
                    link="false"
                >
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>
                <NumberInput source="salary" />
            </FormTab>
            <FormTab label="Account">
                <TextInput source="user.username" />
                <TextInput type="email" source="user.email" />
                <BooleanInput source="user.isActive" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const EmployeeCreate = (props) => {
    const translate = useTranslate();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label={translate("resources.employees.Profile")}>
                    <TextInput source="firstname" />
                    <TextInput source="lastname" />
                    <DateInput source="birthday" />
                    <TextInput source="phone" />
                    <ImageInput source="picture" label="Profile Picture" accept="image/*" required>
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </FormTab>
                <FormTab label={translate("resources.employees.Company")}>
                    <SelectInput choices={employee_position_choices} source="position" required />
                    <TextInput source="job_name" />
                    <DateInput source="hire_date" />
                    <ReferenceInput
                        source="department"
                        reference="departments"
                        link="false"
                    >
                        <SelectInput optionText="name" optionValue="id" />
                    </ReferenceInput>
                    <NumberInput source="salary" />
                </FormTab>
                <FormTab label={translate("resources.employees.Account")}>
                    <CredentialsButton />
                    <TextInput source="username" />
                    <TextInput type="email" source="email" />
                    <PasswordInput source="password" disabled={true} />
                    <BooleanInput source="isActive" />
                </FormTab>
            </TabbedForm>
        </Create>
    )
};
