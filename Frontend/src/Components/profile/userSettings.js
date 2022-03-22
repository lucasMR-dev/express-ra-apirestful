import React, { useCallback, useMemo, useState } from 'react';
import { SimpleForm, useNotify, useGetIdentity, useDataProvider, SaveContextProvider, SelectInput, BooleanInput, TextInput } from 'react-admin';


const language_choices = [
    { id: "es-ES", name: "Espanol" },
    { id: "en-EN", name: "English" },
    { id: "fr-FR", name: "Frances" },
    { id: "de-DE", name: "Deutch" }
];

const color_choices = [
    { id: "red", name: "Red" },
    { id: "blue", name: "Blue" },
    { id: "green", name: "Green" }
];


export const UserSettings = ({ staticContext, ...props }) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [saving, setSaving] = useState();

    const { identity } = useGetIdentity();

    const handleSave = useCallback((values) => {
        setSaving(true);
        dataProvider.updateTheme(
            {data: values},
            {
                onSuccess: () => {
                    setSaving(false);
                    notify("Your config has been updated", "info", {
                        _: "Your config has been updated"
                    });
                },
                onFailure: () => {
                    setSaving(false);
                    notify(
                        "A technical error occured while updating your Config. Please try later.",
                        "warning",
                        {
                            _: "A technical error occured while updating your Config. Please try later."
                        }
                    );
                }
            }
        );
    }, [dataProvider, notify]);

    const saveContext = useMemo(() => ({
        save: handleSave,
        saving
    }), [saving, handleSave]);

    return (
        <SaveContextProvider value={saveContext}>
            <SimpleForm save={handleSave} record={identity ? identity : {}}>
                <TextInput style={{display: 'none'}} source="id" />
                <SelectInput label="Language" source="config.language" choices={language_choices} />
                <BooleanInput label="Dark Theme" source="config.darkTheme" />
                <SelectInput label="Color" source="config.color" choices={color_choices} />
            </SimpleForm>
        </SaveContextProvider>
    );
}