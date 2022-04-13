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
    let events = [
        { id: 1, title: 'Contract Expire Soon', target: '1', body: 'Contract end with Date: ', status: 'Pending' }
    ];
    let initialCount = parseInt(sessionStorage.getItem('events'));
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    const [count, setCount] = React.useState(initialCount !== undefined && !isNaN(initialCount) ? initialCount : events.length );
    sessionStorage.setItem('events', count);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleHover = () => {
        if (count > 0) {
            setCount(count - 1);
            setHide(true);
            sessionStorage.setItem('events', setCount(count - 1));
        }
        setAnchorEl(false);
    }

    return (
        <>
            <IconButton style={{ color: "inherit" }} onClick={handleClick} >
                <Badge badgeContent={count} color="secondary">
                    <CalendarToday />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem>
                    <List>
                        {events.map((event, index) => (
                            <React.Fragment key={event.id}>
                                <ListItem 
                                    alignItems="flex-start" 
                                    component={Link} 
                                    to={`/employees/${event.target}`} 
                                    onMouseLeave={handleHover}
                                    style={hide ? {opacity: 0.3} : null}
                                    index={index}
                                >
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