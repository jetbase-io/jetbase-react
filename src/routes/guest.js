import Forgot from '../containers/forgot';
import Login from '../containers/login';
import Register from '../containers/register';
import RegisterDetails from '../containers/register/details';
import ResetPassword from '../containers/reset';

const routes = [
  {
    path: '/', exact: true, name: 'Login', component: Login,
  },
  {
    path: '/forgot', exact: true, name: 'Forgot', component: Forgot,
  },
  {
    path: '/login', exact: true, name: 'Login', component: Login,
  },
  {
    path: '/register', exact: true, name: 'Register', component: Register,
  },
  {
    path: '/register/:token', exact: true, name: 'RegisterDetails', component: RegisterDetails,
  },
  {
    path: '/reset/:token', exact: true, name: 'ResetPassword', component: ResetPassword,
  },
];

export default routes;
