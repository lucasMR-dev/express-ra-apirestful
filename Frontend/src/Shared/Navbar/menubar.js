import React from "react";
import { UserMenu, MenuItemLink, useGetIdentity, Loading, useTranslate, AppBar } from "react-admin";
import ProfileIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import { useProfile } from "../../Components/profile/profile";
import { EventsButton } from "./events";
import { NoticiationsButton } from "./notifications";


const MyUserMenu = (props) => {
  const translate = useTranslate();
  const { loading } = useGetIdentity();
  const { profileVersion } = useProfile();

  return loading ? (
    <Loading />
  ) : (
    <>
      <EventsButton {...props} />
      <NoticiationsButton {...props} />
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
    </>
  )
};

export const MyAppBar = (props) => {
  return (
    <AppBar {...props} userMenu={<MyUserMenu />} />
  )
}