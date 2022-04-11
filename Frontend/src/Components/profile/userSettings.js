import React, { useCallback, useMemo, useState } from 'react';
import { SimpleForm, useNotify, useGetIdentity, useDataProvider, SaveContextProvider, SelectInput, BooleanInput, TextInput, useRedirect, useTranslate } from 'react-admin';

export const UserSettings = ({ staticContext, ...props }) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const notify = useNotify();
    const [saving, setSaving] = useState();
    const { identity } = useGetIdentity();
    const redirect = useRedirect();

    const language_choices = [
        { id: "es-ES", name: translate("languages.Espanol") },
        { id: "en-EN", name: translate("languages.English") },
        { id: "fr-FR", name: translate("languages.Frances") },
        { id: "de-DE", name: translate("languages.Deutch") }
    ];

    const color_choices = [
        { id: "red", name: translate("colors.Red") },
        { id: "blue", name: translate("colors.Blue") },
        { id: "green", name: translate("colors.Green") },
        { id: "orange", name: translate("colors.Orange") },
        { id: "cyan", name: translate("colors.Cyan") }
    ];

    const appVersion = parseInt(localStorage.getItem('version'));

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
                    localStorage.setItem('locale', data.data.profile.config.language);
                    localStorage.setItem('version', appVersion+1);
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
    }, [dataProvider, notify, appVersion, redirect]);

    const saveContext = useMemo(() => ({
        save: handleSave,
        saving
    }), [saving, handleSave]);

    return (
        <SaveContextProvider value={saveContext}>
            <SimpleForm save={handleSave} record={identity ? identity : {}}>
                <TextInput style={{ display: 'none' }} source="id" />
                <SelectInput source="config.language" label={translate("resources.config.language")} choices={language_choices} />
                <BooleanInput source="config.darkTheme" label={translate("resources.config.darkTheme")} />
                <SelectInput source="config.color" label={translate("resources.config.color")} choices={color_choices} />
            </SimpleForm>
        </SaveContextProvider>
    );
}