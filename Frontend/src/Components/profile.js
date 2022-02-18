import * as React from 'react';
import { DateInput, Edit, ImageField, SimpleForm, TextInput } from 'react-admin';

export const ProfileEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="phone" />
            <DateInput source="birthday" />
            <ImageField source="path" />
        </SimpleForm>
    </Edit>
);