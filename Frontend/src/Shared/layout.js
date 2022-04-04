import * as React from 'react';
import { Layout, Loading, useGetIdentity, defaultTheme, useSetLocale } from 'react-admin';
import { CustomSidebar } from './Navbar/sidebar';
import { MyAppBar } from './Navbar/menubar';
import merge from 'lodash/merge';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/cyan';
import { ProfileProvider } from '../Components/profile/profile';
import Footer from './footer';

export const MyLayout = (props) => {
    const setLocale = useSetLocale();
    const { loading, loaded, identity } = useGetIdentity();
    let myTheme = merge({}, defaultTheme, {});
    let theme;
    let color;
    let primaryColor;

    if (identity) {
        identity.config.darkTheme ? theme = 'dark' : theme = 'light';
        switch (identity.config.color) {
            case 'red':
                color = '#f44336';
                primaryColor = red;
                break;
            case 'green':
                color = '#4caf50';
                primaryColor = green;
                break;
            case 'orange':
                color = '#ff9800';
                primaryColor = orange;
                break;
            case 'cyan':
                color = '#00bcd4';
                primaryColor = cyan;
                break;
            default:
                color = '#2196f3';
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
    React.useEffect(() => {
        const locale = localStorage.getItem('locale');
        setLocale(locale);
    }, [setLocale]);

    return loaded ? (
        <ProfileProvider>
            <Layout {...props} sidebar={CustomSidebar} appBar={MyAppBar} theme={myTheme} />
        </ProfileProvider >
    ) : loading ? (
        <Loading />
    ) : null;
};


export const CustomLayout = (props) => {
    const version = localStorage.getItem('version');
    return (
        <React.Fragment key={version}>
            <MyLayout {...props} />
            <Footer />
        </React.Fragment>
    )
} 