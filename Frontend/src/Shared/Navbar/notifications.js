import React from "react";
import { useTranslate } from "react-admin";
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import WarningIcon from "@material-ui/icons/Warning";
import AnnouncementIcon from "@material-ui/icons/Announcement";

export const NoticiationsButton = (props) => {
    let notications = [
        { id: 'one', type: 'notification', body: 'Logged In', date: new Date() },
        { id: 'two', type: 'warning', body: 'Session Expired', date: new Date() },
        { id: 'three', type: 'notification', body: 'Profile Updated', date: new Date(Date.now() - 86400000) },
    ];
    let list = {
        ids: []
    };
    let today = new Date();
    notications.forEach((n) => {
        if (n.date < today) {
            list.ids.push({ status: "readed", id: n.id });
        }
    });
    const [hide, setHide] = React.useState({
        ids: list.ids
    });
    let initialCount = parseInt(sessionStorage.getItem('notifications'));
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [count, setCount] = React.useState(initialCount !== undefined && !isNaN(initialCount) ? initialCount : notications.length - hide.ids.length);
    sessionStorage.setItem('notifications', count);
    const open = Boolean(anchorEl);
    const translate = useTranslate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleDisable = (event) => {
        if (count > 0) {
            setCount(count - 1);
            sessionStorage.setItem('notifications', setCount(count - 1));
            let list = hide.ids;
            list.push({ status: 'readed', id: event.currentTarget.id });
            setHide({ ids: list });
            sessionStorage.setItem('notifications', setCount(count - 1));
            sessionStorage.setItem('notificationsReaded', setHide({ ids: list }));
        }
    }

    const msjIcon = (type) => {
        let icon;
        if (type === 'notification') {
            icon = <AnnouncementIcon color="primary" />
        }
        else {
            icon = <WarningIcon color="secondary" />
        }
        return (
            icon
        )
    }

    return (
        <>
            <IconButton style={{ color: "inherit" }} onClick={handleClick} >
                <Badge badgeContent={count} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {notications.map((n, index) => (
                    <MenuItem
                        onClick={handleDisable}
                        key={n.id}
                        id={n.id}
                        divider={true}
                        disabled={hide.ids.some(ids => ids.id === n.id) || hide.ids.some(ids => ids.status === 'readed' && ids.id === n.id) ? true : false}
                    >
                        {msjIcon(n.type)}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                        >
                            {translate(`notifications.${n.body}`)}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}