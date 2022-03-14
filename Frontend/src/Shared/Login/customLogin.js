/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
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

export const customLogin = ({theme, ...props}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
   
    const submit = e => {       
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch((res) => {
            notify(res.message);
        });
    };

    return (
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <Grid container style={{ textAlign: "center", marginTop: 100, marginBottom: 100 }} justifyContent="center">
                    <Card style={{ verticalAlign: "middle", alignItems: "center" }}>
                        <CardHeader style={{ color: "Blue", textTransform: "uppercase" }} title="Custom Login Page" />
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
                                {!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
                                    <>
                                        <Divider light />
                                        <Grid item>
                                            <RegisterDialog />
                                        </Grid>
                                    </>) : null
                                }

                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Notification />
            </ThemeProvider>
    );
};