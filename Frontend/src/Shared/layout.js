import * as React from 'react';
import { Layout, Loading } from 'react-admin';
import { Links } from './Navbar/sidebar';
import { MyUserMenu } from './Navbar/menubar';
import { AppBar } from 'react-admin';
import { useGetIdentity } from 'react-admin';
import { defaultTheme } from 'react-admin';
import merge from 'lodash/merge';

const MyAppBar = (props) => {
    return (
        <AppBar {...props} userMenu={<MyUserMenu />} />
    )
}

export const LayoutCustom = (props) => {
    let myTheme = merge({}, defaultTheme, {
        palette: {
            type: '',
            contrastThreshold: 3,
            tonalOffset: 0.2,
        }
    });
    const date = new Date();
    const { loading, loaded, identity } = useGetIdentity();
    let theme;
    let color;

    if (identity) {
        identity.config.darkTheme ? theme = 'dark' : theme = 'light';
        identity.config.color === 'red' ?
            myTheme = {
                palette: {
                    type: theme
                },
                overrides: {
                    MuiAppBar: {
                        colorSecondary: {
                            backgroundColor: 'red'
                        }
                    }
                }
            } : identity.config.color === 'green' ?
            myTheme = {
                palette: {
                    type: theme
                },
                overrides: {
                    MuiAppBar: {
                        colorSecondary: {
                            backgroundColor: 'green'
                        }
                    }
                }
            } :
            myTheme = {
                palette: {
                    type: theme
                },
                overrides: {
                    MuiAppBar: {
                        colorSecondary: {
                            backgroundColor: 'blue'
                        }
                    }
                }
            };
        identity.config.color === 'red' ? color = 'red' : identity.config.color === 'green' ? color = 'green' : color = 'blue';
    }

    return loaded ? (
        <>
            <Layout {...props} sidebar={Links} appBar={MyAppBar} theme={myTheme} />
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
        </>
    ) : loading ? (
        <Loading />
    ) : null
};
