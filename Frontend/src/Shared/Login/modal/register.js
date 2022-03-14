/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useState } from 'react';
import { useNotify } from 'react-admin';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import authProvider from '../../../Auth/authProvider';

const RegisterDialog = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isActive, setisActive] = useState(false);
    const [access_type, setAccessType] = useState('');
    const notify = useNotify();
    const submitModal = e => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        authProvider.register({ email, password, username, isActive, access_type })
            .then(() => {
                notify("Register Success!, Please Log In");
                setEmail('');
                setPassword('');
                setUsername('');
                setisActive(false);
                setAccessType('');
                setShowDialog(false);
            })
            .catch((res) => {
                notify(res.message);
            });
    };

    const [showDialog, setShowDialog] = useState(false);
    const handleClick = () => {
        setShowDialog(true);
    };
    const handleCloseClick = () => {
        setShowDialog(false);
    };
    return (
        <>
            <Button onClick={handleClick} color="secondary">
                Click here to Register
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Register User</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <form id='modalForm' style={{ width: "100%" }}>
                            <Grid container>
                                <Grid item md={2}>
                                    <label for="email">Email: </label>
                                </Grid>
                                <Grid item md={10}>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={2}>  <label for="password">Password: </label></Grid>
                                <Grid item md={10}>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={2}>
                                    <label for="username">Username: </label>

                                </Grid>
                                <Grid item md={10}>
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        required
                                        onChange={e => setUsername(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <label for="access_type">Access Type: </label>
                                <select name="access_type" value={access_type} onChange={e => setAccessType(e.target.value)}>
                                    <option value="">--</option>
                                    <option value="0">App User</option>
                                    <option value="1">Administrator Account</option>
                                </select>
                            </Grid>
                            <Grid item md={12}>
                                <label for="isActive">Is Active? </label>
                                <input
                                    name="isActive"
                                    type="checkbox"
                                    placeholder="Is Active?"
                                    value={isActive}
                                    required
                                    onChange={e => setisActive(e.target.checked)}
                                />

                            </Grid>
                        </form>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: 'red' }}
                        onClick={handleCloseClick}
                    >
                        <IconCancel />
                        Cancel
                    </Button>
                    <Button
                        style={{ color: 'green' }}
                        type='button'
                        onClick={submitModal}
                    >
                        <IconContentAdd />
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default RegisterDialog;