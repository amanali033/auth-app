import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdGroups,
  MdLocationOn,
  MdLocalHospital,
  MdListAlt,
  MdAssignmentInd,
  MdAssignment,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignIn from 'views/auth/signIn';
import ForgetPassword from 'views/auth/forgetPassword';
import ResetPassword from 'views/auth/resetPassword';
import Team from 'views/team';
import TeamDetails from 'views/team/teamDetails';
import Location from 'views/location';

const routes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/admin',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  // },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/data-tables',
  //   component: <DataTables />,
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  {
    name: 'Team',
    layout: '/admin',
    path: '/team',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: <Team />,
  },
  {
    name: 'Locations',
    layout: '/admin',
    path: '/locations',
    icon: <Icon as={MdLocationOn} width="20px" height="20px" color="inherit" />,
    component: <Location />,
  },
  {
    name: 'Providers',
    layout: '/admin',
    path: '/providers',
    icon: <Icon as={MdLocalHospital} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
  {
    name: 'Procedures',
    layout: '/admin',
    path: '/procedures',
    icon: <Icon as={MdListAlt} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
  {
    name: 'Roles',
    layout: '/admin',
    path: '/roles',
    icon: <Icon as={MdAssignmentInd} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
  {
    name: 'Status',
    layout: '/admin',
    path: '/status',
    icon: <Icon as={MdAssignment} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
  // Auth Routes
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    component: <SignIn />,
    show: false
  },
  {
    name: 'Forget Password',
    layout: '/auth',
    path: '/forgot-password',
    component: <ForgetPassword />,
    show: false
  },
  {
    name: 'Reset Password',
    layout: '/auth',
    path: '/reset-password',
    component: <ResetPassword />,
    show: false
  },
  {
    name: 'Team Details',
    layout: '/admin',
    path: '/team/details',
    component: <TeamDetails />,
    show: false
  },
];


export default routes;
