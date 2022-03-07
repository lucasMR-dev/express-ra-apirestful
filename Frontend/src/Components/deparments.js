import * as React from "react";
import {
    Show,
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    Filter,
    SearchInput,
    EditButton,
    SimpleList,
    SimpleForm,
    TextInput,
    DeleteButton,
    SimpleShowLayout,
    SingleFieldList,
    ReferenceArrayField,
    ImageField,
    ReferenceArrayInput,
    SelectArrayInput
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { stringify } from "query-string";
import UserIcon from "@material-ui/icons/Group";

const useStyles = makeStyles({
    icon: { paddingRight: "0.5em" },
    link: {
        display: "inline-flex",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
    },
});

const DepartmentFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

export const LinkToRelatedEmployee = ({ record }) => {
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: "/employee",
                search: stringify({
                    filter: JSON.stringify({ name: record.name }),
                }),
            }}
            className={classes.link}
        >
            <UserIcon className={classes.icon} />
        </Button>
    ) : null;
};

export const DepartmentList = ({ permissions, ...props }) => {
    const imageFieldClasses = useStyles();
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            {...props}
            filters={<DepartmentFilter />}
            bulkActionButtons={permissions === "admin" ? true : false}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    linkType={permissions === "admin" ? "edit" : "show"}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="code" />
                    <TextField source="location" />
                    <ReferenceArrayField reference="employees" source="managers">
                        <SingleFieldList linkType="show">
                        <ImageField classes={imageFieldClasses} source="profile.path" title="profile.firstname" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <ReferenceArrayField reference="employees" source="employees">
                        <SingleFieldList linkType="show">
                            <ImageField classes={imageFieldClasses} source="profile.path" title=""/>
                        </SingleFieldList>
                    </ReferenceArrayField>
                    {permissions === "admin" ? <EditButton /> : null}
                    {permissions === "admin" ? <DeleteButton /> : null}
                </Datagrid>
            )}
        </List>
    );
};

export const DepartmentShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);

export const DepartmentEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <TextInput source="code" />
            <TextInput source="location" />
            <ReferenceArrayInput reference="employees" source="managers" filter={{ position: 'manager' }}>
                <SelectArrayInput optionText={(record) => `${record.profile.firstname} ${record.profile.lastname}`} />
            </ReferenceArrayInput>
            <ReferenceArrayInput reference="employees" source="employees">
                <SelectArrayInput optionText={(record) => `${record.profile.firstname} ${record.profile.lastname}`} />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const DepartmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="code" />
            <TextInput source="location" />
            <TextInput source="managers" />
            <TextInput source="employees" />
        </SimpleForm>
    </Create>
);
