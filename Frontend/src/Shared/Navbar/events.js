import React from "react";
import { Link } from "react-router-dom";
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
import CalendarToday from "@material-ui/icons/CalendarToday";

export const EventsButton = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    let events = [
        { id: 1, title: 'Contract Expire Soon', target: '1', body: 'Contract end with Date: ', status: 'Pending' }
    ]

    return (
        <>
            <IconButton style={{ color: "inherit" }} onClick={handleClick} >
                <Badge badgeContent={events.length} color="secondary">
                    <CalendarToday />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem>
                    <List>
                        {events.map((event) => (
                            <React.Fragment key={event.id}>
                                <ListItem alignItems="flex-start" component={Link} to={`/employees/${event.target}`} onClick={handleClose}>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography>
                                                    {event.title}
                                                </Typography>
                                            </>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body1"
                                                    color="primary"
                                                >
                                                    {event.status}
                                                </Typography>
                                                {event.body}
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