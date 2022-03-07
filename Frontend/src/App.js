import './App.css';
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './Auth/authProvider';
import dataProvider from './Api/dataProvider';
import dashboard from './Components/dashboard.js';
import { customLogin } from './Shared/Login/customLogin';
import Footer from './Shared/Footer/footer';
import { ProductList, ProductEdit, ProductCreate, ProductShow } from './Components/products';
import { CategoryList, CategoryEdit, CategoryCreate, CategoryShow } from './Components/categories';
import { BrandList, BrandEdit, BrandCreate, BrandShow } from './Components/brands';
import { UserList, UserEdit, UserCreate } from './Components/users';
import { FamilyList, FamilyEdit, FamilyCreate, FamilyShow } from './Components/families';
import { DepartmentList, DepartmentEdit, DepartmentCreate, DepartmentShow } from './Components/deparments';
import { EmployeeList, EmployeeCreate, EmployeeEdit, EmployeeShow } from './Components/employees';
import { ProfileEdit } from './Components/profile';
import NotFound from './Components/NotFound';
import ProductsIcon from '@material-ui/icons/AccountBalance';
import CategoriesIcon from '@material-ui/icons/Category';
import BrandsIcon from '@material-ui/icons/Business';
import FamiliesIcon from '@material-ui/icons/AccountTree';
import DepartmentsIcon from '@material-ui/icons/Apartment';
import EmployeesIcon from '@material-ui/icons/Group';
import SalesIcon from '@material-ui/icons/AttachMoney';


const App = () => (
  <React.Fragment>
    <Admin
      dataProvider={dataProvider}
      dashboard={dashboard}
      loginPage={customLogin}
      authProvider={authProvider}
      catchAll={NotFound}
    >

      {permissions => [
        // Restrict access to the edit and remove views to admin only
        <Resource name="profile" edit={ProfileEdit} />,
        <Resource name="products" list={ProductList} create={permissions === 'admin' ? ProductCreate : null} edit={permissions === 'admin' ? ProductEdit : null} show={ProductShow} icon={ProductsIcon} />,
        <Resource name="categories" list={CategoryList} create={permissions === 'admin' ? CategoryCreate : null} edit={permissions === 'admin' ? CategoryEdit : null} show={CategoryShow} icon={CategoriesIcon} />,
        <Resource name="brands" list={BrandList} create={permissions === 'admin' ? BrandCreate : null} edit={permissions === 'admin' ? BrandEdit : null} show={BrandShow} icon={BrandsIcon} />,
        <Resource name="families" list={FamilyList} create={permissions === 'admin' ? FamilyCreate : null} edit={permissions === 'admin' ? FamilyEdit : null} show={FamilyShow} icon={FamiliesIcon} />,
        <Resource name="departments" list={DepartmentList} create={permissions === 'admin' ? DepartmentCreate : null} edit={permissions === 'admin' ? DepartmentEdit : null} show={DepartmentShow} icon={DepartmentsIcon} />,
        <Resource name="sales" list={EmployeeList} create={permissions === 'admin' ? EmployeeCreate : null} edit={permissions === 'admin' ? EmployeeEdit : null} show={EmployeeShow} icon={SalesIcon} />,
        <Resource name="employees" list={EmployeeList} create={permissions === 'admin' ? EmployeeCreate : null} edit={permissions === 'admin' ? EmployeeEdit : null} show={EmployeeShow} icon={EmployeesIcon} />,
        // Admin Display Only
        permissions === 'admin'
          ? <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
          : null,
      ]}

    </Admin>
    <Footer />
  </React.Fragment>
);

export default App;
