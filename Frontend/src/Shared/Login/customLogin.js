/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { defaultTheme } from "react-admin";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import RegisterDialog from './modal/register';
import config from '../../Api/config';

export const customLogin = ({theme, ...props}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
   
    const submit = e => {       
        e.preventDefault();
        login({ email, password }).catch((res) => {
            notify(res.message);
        });
    };
    
    const loginTheme = createTheme({
        ...defaultTheme,
        overrides: {           
        }
    });

    return (
            <ThemeProvider theme={loginTheme}>
                <>
                <Grid container justifyContent="center">
                    <Card style={{ textAlign: "center", verticalAlign: "middle", alignItems: "center",  marginTop: 100, marginBottom: 100}}>
                        <CardHeader style={{ color: 'darkblue', textTransform: "uppercase" }} title="Custom Login Page" />
                        <CardMedia component="img" style={{ height: 150, width: 150, display: "inline" }} image="/logo192.png" />
                        <CardContent>
                            <form id='loginForm' onSubmit={submit}>
                                <Grid item>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <Button color='primary' type='submit'>Enviar</Button>
                                </Grid>
                                { config.env.NODE_ENV === 'development' || config.env.NODE_ENV === 'dev' ? (
                                    <>
                                        <Divider light />
                                        <Grid item>
                                            <RegisterDialog />
                                        </Grid>
                                    </>
                                    ) : null
                                }
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Notification />
                </>
            </ThemeProvider>
    );
};