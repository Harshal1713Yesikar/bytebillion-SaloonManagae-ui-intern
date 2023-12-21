// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'bx:home-circle',
    },
    {
      title: 'Student',
      icon: 'mdi:account-student-outline',
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
      icon: 'clarity:employee-group-line',
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
      icon: 'material-symbols:add-notes-outline',
    },
    {
      path: '/settings',
      action: 'read',
      subject: 'acl-page',
      title: 'Settings',
      icon: 'material-symbols:settings',
    }
  ]
}

export default navigation
