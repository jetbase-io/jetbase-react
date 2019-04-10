import Account from '../containers/account';
import ChangePassword from '../containers/account/password';
import Home from '../containers/home';
import User from '../containers/users/show';
import UserEdit from '../containers/users/edit';
import UserNew from '../containers/users/new';
import Users from '../containers/users';

const routes = [
  {
    path: '/', exact: true, name: 'Home', component: Home,
  },
  {
    path: '/account', exact: true, name: 'Account', component: Account,
  },
  {
    path: '/password', exact: true, name: 'Change Password', component: ChangePassword,
  },
  {
    path: '/users', exact: true, name: 'Users', component: Users,
  },
  {
    path: '/users/new', exact: true, name: 'User New', component: UserNew,
  },
  {
    path: '/users/:id', exact: true, name: 'User Details', component: User,
  },
  {
    path: '/users/:id/edit', exact: true, name: 'User Edit', component: UserEdit,
  },
];

export default routes;
