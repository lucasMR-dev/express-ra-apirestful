import React from "react";
import { useTranslate } from "react-admin";
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider
} from "@material-ui/core";
import MailIcon  from "@material-ui/icons/Mail";
import WarningIcon from "@material-ui/icons/Warning";
import AnnouncementIcon from "@material-ui/icons/Announcement";

export const NoticiationsButton = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const translate = useTranslate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    let notications = [
        { id: 'one', type: 'notification', body: 'Logged In' },
        { id: 'two', type: 'warning', body: 'Session Expired' },
        { id: 'three', type: 'notification', body: 'Profile Updated' },
    ];

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
                <Badge badgeContent={notications.length} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem>
                    <List>
                        {notications.map((n) => (
                            <React.Fragment key={n.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={msjIcon(n.type)}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body1"
                                                >
                                                    {translate(`notifications.${n.body}`)}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider light />
                            </React.Fragment>
                        ))}
                    </List>
                </MenuItem>
            </Menu>
        </>
    )
}