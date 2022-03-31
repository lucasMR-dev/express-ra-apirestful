import React from "react";
import { UserMenu, MenuItemLink, useGetIdentity, Loading, useTranslate } from "react-admin";
import ProfileIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import { useProfile } from "../../Components/profile/profile";

export const MyUserMenu = (props) => {
  const translate = useTranslate();
  const { profileVersion } = useProfile();
  const { loading } = useGetIdentity();
  return loading ? (
    <Loading />
  ) : (
      <UserMenu key={profileVersion} {...props}>
        <MenuItemLink
          to="/my-profile"
          primaryText={translate('resources.profile.name')}
          leftIcon={<ProfileIcon />}
        />
        <MenuItemLink
          to="/app-settings"
          primaryText={translate('resources.config.name')}
          leftIcon={<SettingsIcon />}
        />
      </UserMenu>
  )
};