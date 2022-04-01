import './App.css';
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router';
import authProvider from './Auth/authProvider';
import dataProvider from './Api/dataProvider';
import dashboard from './Components/dashboard.js';
import { customLogin } from './Shared/Login/customLogin';
import { CustomLayout } from './Shared/customlayout';
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
import polyglotI18nProvider from 'ra-i18n-polyglot';
import CustomEnglishMessage from './translations/en';
import CustomFrenchMessage from './translations/fr';

const i18nProvider = polyglotI18nProvider(locale => locale === 'fr-FR' ? CustomFrenchMessage : CustomEnglishMessage, 'en-EN');

const App = () => (
  <React.Fragment>
    <Admin
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      dashboard={dashboard}
      loginPage={customLogin}
      authProvider={authProvider}
      catchAll={NotFound}
      layout={CustomLayout}
      customRoutes={[
        <Route
          key="profile"
          path="/profile"
          component={ProfileEdit}
        />,
        <Route
          key="settings"
          path="/settings"
          component={UserSettings}
        />
      ]}
    >
      {permissions => [
        // RBAC
        typeof permissions === "string" ? (
          //Section 1
          permissions.includes("Warehouse") ? <Resource name="products" list={ProductList} create={ProductCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? ProductEdit : null} show={ProductShow} /> : null,
          permissions.includes("Warehouse") ? <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? CategoryEdit : null} show={CategoryShow} /> : null,
          permissions.includes("Warehouse") ? <Resource name="brands" list={BrandList} create={BrandCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? BrandEdit : null} show={BrandShow} /> : null,
          permissions.includes("Warehouse") ? <Resource name="families" list={FamilyList} create={FamilyCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? FamilyEdit : null} show={FamilyShow} /> : null,
          // Section 2
          permissions.includes("RRHH") ? <Resource name="departments" list={DepartmentList} create={DepartmentCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? DepartmentEdit : null} show={DepartmentShow} /> : null,
          permissions.includes("RRHH") ? <Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={permissions.includes('manager') || permissions.includes('supervisor') ? EmployeeEdit : null} show={EmployeeShow} /> : null
        ) :
          // Webmaster or Maintance account has access to all components
          <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />,
          <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} />,
          <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} show={CategoryShow} />,
          <Resource name="brands" list={BrandList} create={BrandCreate} edit={BrandEdit} show={BrandShow} />,
          <Resource name="families" list={FamilyList} create={FamilyCreate} edit={FamilyEdit} show={FamilyShow} />,
          <Resource name="departments" list={DepartmentList} create={DepartmentCreate} edit={DepartmentEdit} show={DepartmentShow} />,
          <Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit} show={EmployeeShow} />
      ]}

    </Admin>
  </React.Fragment>
);

export default App;
