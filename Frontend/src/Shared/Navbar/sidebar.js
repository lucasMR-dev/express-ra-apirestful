import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink, usePermissions, useTranslate } from 'react-admin';
import ProductsIcon from '@material-ui/icons/AccountBalance';
import CategoriesIcon from '@material-ui/icons/Category';
import BrandsIcon from '@material-ui/icons/Business';
import FamiliesIcon from '@material-ui/icons/AccountTree';
import DepartmentsIcon from '@material-ui/icons/Apartment';
import EmployeesIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    sidebar:{
        backgroundColor: "inherent"
    },
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
    const translate = useTranslate();
    return (
        <div className={classes.items}>
            {typeof permissions === "object" && permissions.includes("Warehouse") ? (
                <>
                    <h4>{translate("titles.warehouse")}</h4>
                    <MenuItemLink to="/products" primaryText={translate("resources.products.name", {smart_count: 2})} leftIcon={<ProductsIcon />} />
                    <MenuItemLink to="/brands" primaryText={translate("resources.brands.name", {smart_count: 2})} leftIcon={<BrandsIcon />} />
                    <MenuItemLink to="/categories" primaryText={translate("resources.categories.name", {smart_count: 2})} leftIcon={<CategoriesIcon />} />
                    <MenuItemLink to="/families" primaryText={translate("resources.families.name", {smart_count: 2})} leftIcon={<FamiliesIcon />} />
                </>
            ) : typeof permissions === "object" && permissions.includes("RRHH") ? (
                <>
                    <h4>{translate("titles.rrhh")}</h4>
                    <MenuItemLink to="/departments" primaryText={translate("resources.departments.name", {smart_count: 2})} leftIcon={<DepartmentsIcon />} />
                    <MenuItemLink to="/employees" primaryText={translate("resources.employees.name", {smart_count: 2})} leftIcon={<EmployeesIcon />} />
                </>
            ) : typeof permissions === "number" ? (
                <>
                    <h4>{translate("Administration")}</h4>
                    <MenuItemLink to="/departments" primaryText="Departments" leftIcon={<DepartmentsIcon />} />
                    <MenuItemLink to="/employees" primaryText="Employees" leftIcon={<EmployeesIcon />} />
                    <MenuItemLink to="/users" primaryText="Users" leftIcon={<EmployeesIcon />} />
                </>
            ) : null
            }
        </div>
    )
}

export const CustomSidebar = (props) => {
    const classes = useStyles();
    const { loaded, permissions } = usePermissions();
    return loaded ? (
        <Menu {...props} className={classes.sidebar}>
            <DashboardMenuItem />
            <FilteredItems permissions={permissions} />
        </Menu>
    ) : null;
};