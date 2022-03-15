import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink, usePermissions } from 'react-admin';
import ProductsIcon from '@material-ui/icons/AccountBalance';
import CategoriesIcon from '@material-ui/icons/Category';
import BrandsIcon from '@material-ui/icons/Business';
import FamiliesIcon from '@material-ui/icons/AccountTree';
import DepartmentsIcon from '@material-ui/icons/Apartment';
import EmployeesIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    items: {
        '& h4': {
            textAlign: "center",
            textTransform: "uppercase",
            color: "DarkGrey",
            fontWeight: "bold"
        }
    }
});

export const FilteredItems = (permission) => {
    const classes = useStyles();
    const permissions = permission.permissions;
    return (
        <div className={classes.items}>
            {typeof permissions === "object" && permissions.includes("Warehouse") ? (
                <>
                    <h4>Warehouse</h4>
                    <MenuItemLink to="/products" primaryText="Products" leftIcon={<ProductsIcon />} />
                    <MenuItemLink to="/brands" primaryText="Brands" leftIcon={<BrandsIcon />} />
                    <MenuItemLink to="/categories" primaryText="Categories" leftIcon={<CategoriesIcon />} />
                    <MenuItemLink to="/families" primaryText="Families" leftIcon={<FamiliesIcon />} />
                </>
            ) : typeof permissions === "object" && permissions.includes("RRHH") ? (
                <>
                    <h4>RRHH</h4>
                    <MenuItemLink to="/departments" primaryText="Departments" leftIcon={<DepartmentsIcon />} />
                    <MenuItemLink to="/employees" primaryText="Employees" leftIcon={<EmployeesIcon />} />
                </>
            ) : typeof permissions === "number" ? (
                <>
                    <h4>Administration</h4>
                    <MenuItemLink to="/departments" primaryText="Departments" leftIcon={<DepartmentsIcon />} />
                    <MenuItemLink to="/employees" primaryText="Employees" leftIcon={<EmployeesIcon />} />
                    <MenuItemLink to="/users" primaryText="Users" leftIcon={<EmployeesIcon />} />
                </>
            ) : null
            }
        </div>
    )
}

export const Links = (props) => {
    const { loaded, permissions } = usePermissions();
    return loaded ? (
        <Menu {...props}>
            <DashboardMenuItem />
            <FilteredItems permissions={permissions} />
        </Menu>
    ) : null;
};