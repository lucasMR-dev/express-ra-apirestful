import * as React from 'react';
import { List, Edit, Create, Datagrid, TextField, BooleanField, EditButton, SimpleForm, TextInput, SelectInput, ChipField, DeleteButton, BooleanInput, PasswordInput, SimpleList, UrlField } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const access_type_choices = [
    { id: 'user', name: 'User' },
    { id: 'admin', name: 'Administrator' },
    { id: 'webmaster', name: 'Webmaster' }
];

export const UserList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.username}
                    secondaryText={record => record.email}
                    tertiaryText={record => record.access_type}
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
    )
};

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput type="email" source="email" />
            <BooleanInput source="isActive" label="Account is active?" />
            <SelectInput source="access_type" choices={access_type_choices} />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" required />
            <TextInput type="email" source="email" required />
            <PasswordInput source="password" required />
            <BooleanInput source="isActive" label="Account is active?" defaultValue={false} />
            <SelectInput source="access_type" choices={access_type_choices} required />
        </SimpleForm>
    </Create>
);