// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/home',
    icon: 'bx:home-circle',
  },
  {
    title: 'Student',
    icon: 'bx:home-circle',
    children: [
      {
        title: 'Students',
        path: '/student/studentList'

      },
      {
        title: 'Student Admission',
        path: '/student/studentAdmission'
      },
      
    ]
  },
  {
    title: 'Employee',
    icon: 'bx:home-circle',
    children: [
      {
        title: 'Employee',
        path: '/employee/employeeList'

      },
      {
        title: 'Employee Admission',
        path: '/employee/employeeAdmission'
      },
      
    ]
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
