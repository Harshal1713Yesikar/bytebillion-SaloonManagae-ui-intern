// ** Type import
import { useEffect, useState } from 'react'
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
const navigation = (): HorizontalNavItemsType => {
  const [user, setUser] = useState<any>()
  const [permissions, setPermissions] = useState<any>([])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (user) {
      setPermissions(user.role.permissions)
    }
  }, [user])


  let routesData = [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'bx:bar-chart-alt'
    },
    {
      title: 'Student',
      icon: 'mdi:account-student-outline',
      children: [
        {
          type: "read",
          icon: "mdi:account-multiple",
          title: 'Students',
          path: '/student/studentList'
        },
        {
          type: "create",
          icon: "mdi:account-edit",
          title: 'Student Admission',
          path: `/student/studentAdmission`
        },

      ]
    }
    ,
    {
      title: 'Enquiry',
      icon: 'mdi:message-question',
      children: [
        {
          type: "read",
          icon: "mdi:comment-multiple-outline",
          title: 'Enquiries',
          path: `/enquiry/listEnquiry`
        },
        {
          type: "create",
          icon: "mdi:comment-processing",
          title: 'Create Enquiry',
          path: '/enquiry/createEnquiry'
        }
      ]
    },
    {
      title: 'Courses',
      icon: 'bx:book-bookmark',
      path: '/courses'
    },
    {
      title: 'Batch',
      icon: 'material-symbols:group',
      path: '/batch/createBatch',
    },
    {
      subject: 'acl-page',
      title: 'Coupons',
      icon: 'bxs:coupon',
      path: '/coupons/couponsList',
    },
    {
      title: 'Employee',
      icon: 'clarity:employee-group-line',
      children: [
        {
          type: "read",
          icon: "mdi:account-multiple",
          title: 'Employee',
          path: '/employee/employeeList'
        },
        {
          type: "create",
          icon: "mdi:account-multiple-plus",
          title: 'Employee Registration',
          path: `/employee/employeeRegistration`
        }
      ]
    },
    {
      path: '/inventory/createInventory',
      action: 'read',
      subject: 'acl-page',
      title: 'Expenses',
      icon: 'material-symbols:add-notes-outline',
    },
    {
      path: '/user-management',
      action: 'read',
      subject: 'acl-page',
      title: `User & Permissions`,
      icon: 'bx:check-shield'
    },
    {
      path: '/settings',
      action: 'read',
      subject: 'acl-page',
      title: 'Settings',
      icon: 'material-symbols:settings'
    }
  ]


  let filterArrayOfRoute: any = []

  if (permissions) {
    routesData.filter((allItems) => {
      permissions.map((permissionList: any) => {
        if (permissionList.action?.includes('read') || permissionList.action?.includes('create')) {
          if (allItems?.title == permissionList?.title) {
            let filterChildren: any = []
            allItems?.children?.map((childrenData: any) => {
              permissionList?.action?.filter((actionData: any) => {
                if (actionData == childrenData?.type) {
                  filterChildren.push(childrenData)
                }
              })
            })
            allItems.children ? filterArrayOfRoute.push({ ...allItems, children: filterChildren }) : filterArrayOfRoute.push({ ...allItems })
          }
        }
      })
    })
  }

  if (permissions[permissions.length - 1]?.manageUser) {
    return filterArrayOfRoute
  } else {
    let newArray = []
    for (let singleObj of filterArrayOfRoute) {
      if (singleObj?.title != "User & Permissions") {
        newArray.push(singleObj)
      }
    }
    return newArray
  }

}

export default navigation
