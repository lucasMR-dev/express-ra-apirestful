import React, { useCallback, useMemo, useState, createContext, useContext } from 'react';
import { ImageInput, TextInput, SimpleForm, useNotify, useGetIdentity, useDataProvider, SaveContextProvider, DateInput, ImageField, useRedirect  } from 'react-admin';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileVersion, setProfileVersion] = useState(0);
  const context = useMemo(
    () => ({
      profileVersion,
      refreshProfile: () => {
          setProfileVersion((currentVersion) => currentVersion + 1)
      }
    }),
    [profileVersion]
  );

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export const ProfileEdit = ({ staticContext, ...props }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [saving, setSaving] = useState();  
  const { refreshProfile } = useProfile();
  const {loaded, identity } = useGetIdentity();
  const redirect = useRedirect();
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
          refreshProfile();
          redirect('/')
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
  }, [dataProvider, notify, refreshProfile, redirect]);

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