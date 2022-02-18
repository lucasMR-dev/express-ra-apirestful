import './App.css';
import * as React from 'react';
import  { Admin, Resource } from 'react-admin';
import authProvider from './Auth/authProvider';
import dataProvider from './Api/dataProvider';
import dashboard from './Components/dashboard.js';
import Footer from './Shared/Footer/footer';
import { ProductList, ProductEdit, ProductCreate, ProductShow } from './Components/products';
import { CategoryList, CategoryEdit, CategoryCreate, CategoryShow } from './Components/categories';
import { BrandList, BrandEdit, BrandCreate, BrandShow } from './Components/brands';
import { UserList, UserEdit, UserCreate } from './Components/users';
import { FamilyList, FamilyEdit, FamilyCreate, FamilyShow } from './Components/families';
import { ProfileEdit } from './Components/profile';
import NotFound from './Components/NotFound';
import UserIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import BusinessIcon from '@material-ui/icons/Business';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const App = () => (
  <React.Fragment>
  <Admin
  dataProvider= { dataProvider }
  dashboard= { dashboard } 
  authProvider= { authProvider }
  catchAll= { NotFound }
  >
    
    {permissions => [
      // Restrict access to the edit and remove views to admin only
      <Resource name="profile" edit={ProfileEdit} />,
      <Resource name="products" list={ProductList} create={permissions === 'admin' ? ProductCreate : null} edit={permissions === 'admin' ? ProductEdit : null} show={ProductShow} />,
      <Resource name="categories" list={ CategoryList } create={permissions === 'admin' ? CategoryCreate : null } edit={permissions === 'admin' ? CategoryEdit : null} show={CategoryShow} icon={CategoryIcon} />,
      <Resource name="brands" list={ BrandList } create={permissions === 'admin' ? BrandCreate : null } edit={permissions === 'admin' ? BrandEdit : null } show={BrandShow} icon={BusinessIcon}/>,
      <Resource name="families" list={ FamilyList } create={permissions === 'admin' ? FamilyCreate : null } edit={permissions === 'admin' ? FamilyEdit : null } show={FamilyShow} icon={AccountTreeIcon} />,
      // Admin Display Only
      permissions === 'admin'
      ? <Resource name="users" list={ UserList } create={ UserCreate } edit={ UserEdit } icon={UserIcon} />
      : null,      
    ]}

  </Admin>
  <Footer/>
  </React.Fragment>
);

export default App;
