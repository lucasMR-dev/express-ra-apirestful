import './App.css';
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router';
import authProvider from './Auth/authProvider';
import dataProvider from './Api/dataProvider';
import dashboard from './Components/dashboard.js';
import { customLogin } from './Shared/Login/customLogin';
import { LayoutCustom } from './Shared/layout';
import { ProductList, ProductEdit, ProductCreate, ProductShow } from './Components/products';
import { CategoryList, CategoryEdit, CategoryCreate, CategoryShow } from './Components/categories';
import { BrandList, BrandEdit, BrandCreate, BrandShow } from './Components/brands';
import { UserList, UserEdit, UserCreate } from './Components/users';
import { FamilyList, FamilyEdit, FamilyCreate, FamilyShow } from './Components/families';
import { DepartmentList, DepartmentEdit, DepartmentCreate, DepartmentShow } from './Components/deparments';
import { EmployeeList, EmployeeCreate, EmployeeEdit, EmployeeShow } from './Components/employees';
import { ProfileEdit } from './Components/profile/profile';
import { UserSettings } from './Components/profile/userSettings';
import NotFound from './Components/NotFound';
import ProductsIcon from '@material-ui/icons/AccountBalance';
import CategoriesIcon from '@material-ui/icons/Category';
import BrandsIcon from '@material-ui/icons/Business';
import FamiliesIcon from '@material-ui/icons/AccountTree';
import DepartmentsIcon from '@material-ui/icons/Apartment';
import EmployeesIcon from '@material-ui/icons/Group';
//import SalesIcon from '@material-ui/icons/AttachMoney';

const App = () => (
    <React.Fragment>
      <Admin
        dataProvider={dataProvider}
        dashboard={dashboard}
        loginPage={customLogin}
        authProvider={authProvider}
        catchAll={NotFound}
        layout={LayoutCustom}
        customRoutes={[
          <Route
            key="my-profile"
            path="/my-profile"
            component={ProfileEdit}
          />,
          <Route
            key="app-settings"
            path="/app-settings"
            component={UserSettings}
          />
        ]}
      >
        {permissions => [
          // Restrict access to the edit and remove views to admin only
          typeof permissions === "string" ? (
            permissions.includes("Warehouse") ? <Resource name="products" list={ProductList} create={ProductCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? ProductEdit : null} show={ProductShow} icon={ProductsIcon} /> : null,
            permissions.includes("Warehouse") ? <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? CategoryEdit : null} show={CategoryShow} icon={CategoriesIcon} /> : null,
            permissions.includes("Warehouse") ? <Resource name="brands" list={BrandList} create={BrandCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? BrandEdit : null} show={BrandShow} icon={BrandsIcon} /> : null,
            permissions.includes("Warehouse") ? <Resource name="families" list={FamilyList} create={FamilyCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? FamilyEdit : null} show={FamilyShow} icon={FamiliesIcon} /> : null,
            /*permissions.includes("Warehouse") ? <Resource name="sales" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit} show={EmployeeShow} icon={SalesIcon} /> : null,*/
            permissions.includes("RRHH") ? <Resource name="departments" list={DepartmentList} create={DepartmentCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? DepartmentEdit : null} show={DepartmentShow} icon={DepartmentsIcon} /> : null,
            permissions.includes("RRHH") ? <Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? EmployeeEdit : null} show={EmployeeShow} icon={EmployeesIcon} /> : null
          ) :
            <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />,
          <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} icon={ProductsIcon} />,
          <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} show={CategoryShow} icon={CategoriesIcon} />,
          <Resource name="brands" list={BrandList} create={BrandCreate} edit={BrandEdit} show={BrandShow} icon={BrandsIcon} />,
          <Resource name="families" list={FamilyList} create={FamilyCreate} edit={FamilyEdit} show={FamilyShow} icon={FamiliesIcon} />,
          <Resource name="departments" list={DepartmentList} create={DepartmentCreate} edit={DepartmentEdit} show={DepartmentShow} icon={DepartmentsIcon} />,
          <Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit} show={EmployeeShow} icon={EmployeesIcon} />
        ]}

      </Admin>
    </React.Fragment>
);

export default App;
