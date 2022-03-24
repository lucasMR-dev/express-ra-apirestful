import React from "react";
import { UserMenu, MenuItemLink, useGetIdentity, Loading } from "react-admin";
import ProfileIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";

export const MyUserMenu = (props) => {
  const { loading } = useGetIdentity();
  return loading ? (
    <Loading />
  ) : (
    <UserMenu  {...props}>
      <MenuItemLink
        to="/my-profile"
        primaryText="Profile"
        leftIcon={<ProfileIcon />}
      />
      <MenuItemLink
        to="/app-settings"
        primaryText="Config"
        leftIcon={<SettingsIcon />}
      />
    </UserMenu>
  )
};