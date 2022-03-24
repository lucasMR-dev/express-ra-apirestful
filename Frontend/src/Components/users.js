import * as React from "react";
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    TextInput,
    SelectInput,
    ChipField,
    DeleteButton,
    BooleanInput,
    PasswordInput,
    SimpleList,
    UrlField,
    TabbedForm,
    FormTab,
    DateInput,
    NumberInput,
    SimpleForm,
    ReferenceArrayInput,
    SelectArrayInput,
    ImageInput,
    ImageField
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const access_type_choices = [
    { id: "user", name: "User" },
    { id: "admin", name: "Administrator" },
    { id: "webmaster", name: "Webmaster" },
];

const employee_type_choices = [
    { id: "worker", name: "Worker" },
    { id: "practice", name: "Practice" },
    { id: "supervisor", name: "Supervisor" },
    { id: "manager", name: "Manager" }
];

export const UserList = (props) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.username}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.access_type}
                />
            ) : (
                <Datagrid>
                    <TextField source="username" />
                    <UrlField className="email" source="email" />
                    <BooleanField source="isActive" />
                    <ChipField source="access_type" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            )}
        </List>
    );
};

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput type="email" source="email" />
            <BooleanInput source="isActive" label="Account is active?" />
            <SelectInput source="access_type" choices={access_type_choices} />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="Account">
                <TextInput source="username" required />
                <TextInput type="email" source="email" required />
                <PasswordInput source="password" required />
                <BooleanInput
                    source="isActive"
                    label="Account is active?"
                    defaultValue={false}
                />
                <SelectInput
                    source="access_type"
                    choices={access_type_choices}
                    required
                />
            </FormTab>
            <FormTab label="Personal Info">
                <ImageInput source="path" label="Picture" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput source="firstname" required />
                <TextInput source="lastname" required />
                <DateInput source="birthday" />
                <TextInput source="phone" />
            </FormTab>
            <FormTab label="Employee">
                <TextInput source="job_name" />
                <DateInput source="hire_date" />
                <NumberInput source="salary" />
                <SelectInput
                    source="partnerStatus"
                    choices={employee_type_choices}
                    defaultValue={employee_type_choices[0].name}
                />
                <ReferenceArrayInput
                    label="Deparment"
                    source="deparment"
                    reference="departments"
                >
                    <SelectArrayInput optionText="name" optionValue="id" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);