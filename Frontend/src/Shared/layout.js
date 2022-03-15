import { Layout } from 'react-admin';
import { Links } from './Navbar/menu';

export const layout = (props) => <Layout {...props} menu={Links} />;