// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'ion:home-outline',
    },
    {
      title: 'Quick Sale',
      path: '/quicksale',
      icon: 'icon-park-outline:id-card',
    },
    // {
    //   title: 'Calender',
    //   path: '/calender',
    //   icon: 'simple-line-icons:calender',
    // },
    {
      title: 'Manage Satff',
      path: '/managesatff',
      icon: 'ic:baseline-people-outline',
    },
    {
      title: 'Products',
      path: '/products',
      icon: 'material-symbols:production-quantity-limits-sharp',
    },

    // demo
    {
      title: 'Clients',
      path: '/clients',
      icon: 'fluent:people-team-16-regular',
    },


    // {
    //   title: 'Appointments',
    //   path: '/appointments',
    //   icon: 'teenyicons:appointments-outline',
    // },

    // {
    //   title: 'Report',
    //   path: '/report',
    //   icon: 'codicon:report',
    // },

    // {
    //   title: 'Integration',
    //   path: '/integration',
    //   icon: 'mdi:account-payment-outline',
    // },
    // {
    //   title: 'Sale Tools',
    //   path: '/saletools',
    //   icon: 'material-symbols:checked-bag-outline',
    // },
    {
      title: 'Expense',
      path: '/expense',
      icon: 'fa-regular:money-bill-alt',
    },

    // {
    //   path: '/entity',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Entity',
    //   icon: 'material-symbols:logo-dev-outline',
    // },
    // {
    //   path: '/settings',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Settings',
    //   icon: 'material-symbols:settings',
    // },

  ]
}

export default navigation
