import React, { useCallback, useMemo, useState } from 'react';
import { ImageInput, TextInput, SimpleForm, useNotify, useGetIdentity, useDataProvider, SaveContextProvider, DateInput, ImageField  } from 'react-admin';



export const ProfileEdit = ({ staticContext, ...props }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [saving, setSaving] = useState();  

  const {loaded, identity } = useGetIdentity();

  const handleSave = useCallback((values) => {
    setSaving(true);
    dataProvider.updateUserProfile(
      { data: values },
      {
        onSuccess: () => {
          setSaving(false);
          notify("Your profile has been updated", "info", {
            _: "Your profile has been updated"
          });
        },
        onFailure: () => {
          setSaving(false);
          notify(
            "A technical error occured while updating your profile. Please try later.",
            "warning",
            {
              _:
                "A technical error occured while updating your profile. Please try later."
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


  return loaded ? (
    <SaveContextProvider value={saveContext}>
      <SimpleForm save={handleSave} record={identity ? identity : {}}>
        <TextInput style={{display: 'none'}} source="id" />
        <TextInput source="fullName" disabled={true} />
        <DateInput source="birthday" />
        <TextInput source="phone" />
        <ImageField source="avatar" />
        <ImageInput
            source="picture"
            label="Picture"
            accept="image/*"
            multiple={false}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
      </SimpleForm>
    </SaveContextProvider>
  ) : null;
};