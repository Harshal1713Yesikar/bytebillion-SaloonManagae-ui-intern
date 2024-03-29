// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Grid, CardContent } from '@mui/material'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { MemoryRouter, Route, Routes, Link, matchPath, useLocation } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { listAllStaffApi } from 'src/store/APIs/api'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}


// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = (params: GridRenderCellParams) =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(params)}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.full_name}
        </Typography>
      </Box>
    </Box>
  )

function Router(props: { children?: React.ReactNode }) {
  const { children } = props
  if (typeof window === 'undefined') {
    return <StaticRouter location='/drafts'>{children}</StaticRouter>
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  )
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

function MyTabs() {
  const routeMatch = useRouteMatch(['/staffList', '/addStaff', '/staffSchedule', '/updateAttendanes', '/inactiveStaff'])
  const currentTab = routeMatch?.pattern?.path

}

function CurrentRoute() {
  const location = useLocation()


}

interface Props {
  updateCollegeState: any
  setUpdateCollegeState: any
}
const StaffList = (props: Props) => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const { updateCollegeState, setUpdateCollegeState } = props


  // State to store fetched staff data
  const [staffData, setStaffData] = useState<any[]>([]);

  // ... (other code)

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // Fetch staff data using listAllStaffApi
    const fetchData = async () => {
      try {
        const response: any = await listAllStaffApi("99f9bf2-8ac2-4f84-8286-83bb46595fde", "E7uqn"); // Pass customerId and salonId
        // Update the component's state with the fetched data
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'employeeName',
      headerName: 'Name',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.employeeName}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Joining Date',
      field: 'employeeJoiningDate',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.employeeJoiningDate}
        </Typography>
      )
    },

    // {
    //   flex: 0.15,
    //   minWidth: 110,
    //   field: 'salary',
    //   headerName: 'Salary',
    //   renderCell: (params: GridRenderCellParams) => (
    //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
    //       {params.row.salary}
    //     </Typography>
    //   )
    // },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'employeePhone ',
      headerName: 'contact',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.employeePhone}
        </Typography>
      )
    },

    // {
    //   flex: 0.1,
    //   field: 'Staff Id',
    //   minWidth: 80,
    //   headerName: 'Staff ID',
    //   renderCell: (params: GridRenderCellParams) => (
    //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
    //       {params.row.age}
    //     </Typography>
    //   )
    // },
    // {
    //   flex: 0.2,
    //   minWidth: 140,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: (params: GridRenderCellParams) => {
    //     const status = statusObj[params.row.status]

    //     return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    //   }
    // },

  ]


  return (
    <>
      <Grid>
        <Grid sx={{ borderRadius: '100' }}>
          <Card sx={{ width: '100%', marginRight: 50 }}>
            <CardContent>
              {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
              <Typography sx={{ color: 'black', fontSize: 20, fontWeight: '600' }}>Staff List</Typography>
              <Typography>
                Ensure the management of staff attendance, their availability, payroll, commissions, and access
                <br /> permissions.
              </Typography>
              <Router>
                <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}>
                </Box>
              </Router>
            </CardContent>
            <DataGrid
              autoHeight
              rows={staffData}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[7, 10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default StaffList
