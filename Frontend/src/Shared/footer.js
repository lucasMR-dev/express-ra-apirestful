import React from 'react';
import { useGetIdentity } from 'react-admin';

const Footer = () => {
    const date = new Date();    
    const { loaded, identity } = useGetIdentity();
    let color;

    if (identity) {
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
    }

    return loaded ? (
        <React.Fragment>
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
        </React.Fragment>
    ) : null;
}

export default Footer;