import React, { useCallback, useMemo, useState  } from 'react';
import { SimpleForm, useNotify, useGetIdentity, useDataProvider, SaveContextProvider, SelectInput, BooleanInput, TextInput, useSetLocale, useRedirect } from 'react-admin';

const language_choices = [
    { id: "es-ES", name: "Espanol" },
    { id: "en-EN", name: "English" },
    { id: "fr-FR", name: "Frances" },
    { id: "de-DE", name: "Deutch" }
];

const color_choices = [
    { id: "red", name: "Red" },
    { id: "blue", name: "Blue" },
    { id: "green", name: "Green" },
    { id: "orange", name: "Orange" },
    { id: "cyan", name: "Cyan" }
];

export const UserSettings = ({ staticContext, ...props }) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [saving, setSaving] = useState();
    const setLocale = useSetLocale();
    const { identity } = useGetIdentity();
    const redirect = useRedirect();

    const handleSave = useCallback((values) => {
        setSaving(true);
        dataProvider.updateSettings(
            { data: values },
            {
                onSuccess: (data) => {
                    setSaving(false);
                    notify("Your config has been updated", "info", {
                        _: "Your config has been updated"
                    });
                    setLocale(data.data.profile.config.language);
                    redirect('/');
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
    }, [dataProvider, notify, setLocale, redirect]);

    const saveContext = useMemo(() => ({
        save: handleSave,
        saving
    }), [saving, handleSave]);

    return (
        <SaveContextProvider value={saveContext}>
            <SimpleForm save={handleSave} record={identity ? identity : {}}>
                <TextInput style={{ display: 'none' }} source="id" />
                <SelectInput label="Language" source="config.language" choices={language_choices} />
                <BooleanInput label="Dark Theme" source="config.darkTheme" />
                <SelectInput label="Color" source="config.color" choices={color_choices} />
            </SimpleForm>
        </SaveContextProvider>
    );
}