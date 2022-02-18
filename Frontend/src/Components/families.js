import * as React from 'react';
import { Show, List, Edit, Create, Datagrid, TextField, Filter, SearchInput, EditButton, SimpleList, SimpleForm, TextInput, DeleteButton, SimpleShowLayout } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const FamilyFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

export const FamilyList = ({ permissions, ...props }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<FamilyFilter />} bulkActionButtons={permissions === "admin" ? true : false}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    linkType={permissions === 'admin' ? 'edit' : 'show'}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" label="Family" />
                    {permissions === 'admin' ? <EditButton /> : null}
                    {permissions === 'admin' ? <DeleteButton /> : null}
                </Datagrid>
            )}
        </List>
    )
};

export const FamilyShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);

export const FamilyEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const FamilyCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);