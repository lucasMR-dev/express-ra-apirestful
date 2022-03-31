import * as React from 'react';
import { useEffect } from 'react';
import { Layout, Loading, AppBar, useGetIdentity, defaultTheme, useSetLocale } from 'react-admin';
import { CustomSidebar } from './Navbar/sidebar';
import { MyUserMenu } from './Navbar/menubar';
import merge from 'lodash/merge';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/cyan';
import { ProfileProvider } from '../Components/profile/profile';

const MyAppBar = (props) => {
    return (
        <AppBar {...props} userMenu={<MyUserMenu />} />
    )
}

export const LayoutCustom = (props) => {
    const date = new Date();
    const setLocale = useSetLocale();
    const { loading, loaded, identity } = useGetIdentity();

    let myTheme = merge({}, defaultTheme, {
        palette: {
            type: '',
            contrastThreshold: 3,
            tonalOffset: 0.2,
        }
    });
    let theme;
    let color;
    let primaryColor;

    if (identity) {
        identity.config.darkTheme ? theme = 'dark' : theme = 'light';
        switch (identity.config.color) {
            case 'red':
                color = '#f44336';
                break;
            case 'green':
                color = '#4caf50';
                break;
            case 'orange':
                color = '#ff9800';
                break;
            case 'cyan':
                color = '#00bcd4';
                break;
            default:
                color = '#2196f3';
                break;
        }

        switch (color) {
            case '#f44336':
                primaryColor = red;
                break;
            case '#4caf50':
                primaryColor = green;
                break;
            case '#ff9800':
                primaryColor = orange;
                break;
            case '#00bcd4':
                primaryColor = cyan;
                break;
            default:
                primaryColor = blue;
                break;
        }

        myTheme = {
            palette: {
                type: theme,
                primary: primaryColor
            },
            overrides: {
                MuiAppBar: {
                    colorSecondary: {
                        backgroundColor: color
                    }
                }
            }
        }
    }

    useEffect(() => {
        const locale = localStorage.getItem('locale');
        setLocale(locale);
    }, [setLocale]);

    return loaded ? (
        <ProfileProvider>
            <Layout {...props} sidebar={CustomSidebar} appBar={MyAppBar} theme={myTheme} />
            <div
                style={{
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 100,
                    padding: 6,
                    backgroundColor: color,
                    textAlign: "center",
                    color: "white",
                }}
            >
                <strong> Company Name &copy; {date.getFullYear()} </strong>
            </div>
        </ProfileProvider>
    ) : loading ? (
        <Loading />
    ) : null
};
