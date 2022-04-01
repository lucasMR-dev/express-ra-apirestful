import * as React from 'react';
import { LayoutCustom } from './layout';
import Footer from './footer';

export const CustomLayout = (props) => {
    let version = parseInt(localStorage.getItem('version'));
    return (
        <React.Fragment key={version}>
            <LayoutCustom {...props} />
            <Footer  {...props} />
        </React.Fragment>        
    )
}