// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  // {
  //   title: 'Dashboard',
  //   path: '/home',
  //   icon: 'bx:home-circle',
  // },

  {
    title: 'Home',
    path: '/home',
    icon: 'bx:home-circle',
  },
  {
    title: 'Quick Sale',
    path: '/quicksale',
    icon: 'bx:home-circle',
  },
  {
    title: 'Calender',
    path: '/calender',
    icon: 'bx:home-circle',
  },
  {
    title: 'Manage Satff',
    path: '/managesatff',
    icon: 'bx:home-circle',
  },
  {
    title: 'Products',
    path: '/products',
    icon: 'bx:home-circle',
  },
  {
    title: 'Clients',
    path: '/clients',
    icon: 'bx:home-circle',
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: 'bx:home-circle',
  },
  {
    title: 'Report',
    path: '/report',
    icon: 'bx:home-circle',
  },
  {
    title: 'Integration',
    path: '/integration',
    icon: 'bx:home-circle',
  },
  {
    title: 'Sale Tools',
    path: '/saletools',
    icon: 'bx:home-circle',
  },
  {
    title: 'Expense',
    path: '/expense',
    icon: 'bx:home-circle',
  },
 
  {
    path: '/entity',
    action: 'read',
    subject: 'acl-page',
    title: 'Entity',
    icon: 'bx:shield',
  },
  {
    path: '/settings',
    action: 'read',
    subject: 'acl-page',
    title: 'Settings',
    icon: 'bx:shield',
  }
] 
export default navigation
