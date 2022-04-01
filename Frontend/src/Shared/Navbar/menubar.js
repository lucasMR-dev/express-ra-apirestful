import React from "react";
import { UserMenu, MenuItemLink, useGetIdentity, Loading, useTranslate, AppBar } from "react-admin";
import ProfileIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import { ProfileProvider, useProfile } from "../../Components/profile/profile";

const MyUserMenu = (props) => {
  const translate = useTranslate();
  const { profileVersion } = useProfile();
  const { loading } = useGetIdentity();
  return loading ? (
    <Loading />
  ) : (
      <UserMenu key={profileVersion} {...props}>
        <MenuItemLink
          to="/profile"
          primaryText={translate('resources.profile.name')}
          leftIcon={<ProfileIcon />}
        />
        <MenuItemLink
          to="/settings"
          primaryText={translate('resources.config.name')}
          leftIcon={<SettingsIcon />}
        />
      </UserMenu>
  )
};

export const MyAppBar = (props) => {
  return (
        <ProfileProvider>
          <AppBar {...props} userMenu={<MyUserMenu />} />
        </ProfileProvider>
  )
}