import * as React from 'react';
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
    usePermissions,
    SaveButton,
    Toolbar
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const FamilyFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="name" alwaysOn />
    </Filter>
);

export const FamilyList = ({ ...props }) => {
    const { loaded, permissions } = usePermissions();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return loaded ? (
        <List {...props} filters={<FamilyFilter />} bulkActionButtons={permissions.includes('manager') || permissions.includes('supervisor') ? true : false}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    linkType={permissions.includes('manager') ? 'edit' : 'show'}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" label="Family" />
                    <EditButton />
                    {permissions.includes('manager') || permissions.includes('supervisor') ? <DeleteButton /> : null}
                </Datagrid>
            )}
        </List>
    )
        : null;
};

export const FamilyShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);

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


export const FamilyEdit = props => {
    return (
        <Edit {...props}>
            <SimpleForm toolbar={<CustomToolbar />}>
                <TextInput source="id" disabled />
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    );
};

export const FamilyCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);