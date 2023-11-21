import { useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import UserDialogBox from './UserDialogBox'
import { Skeleton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import { listAllUsers } from 'src/store/APIs/Api'
import Typography from '@mui/material/Typography'
import { UsersType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { SelectChangeEvent } from '@mui/material/Select'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Tooltip from '@mui/material/Tooltip';

import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** Custom Components Imports

interface UserRoleType {
  [key: string]: { icon: string; color: ThemeColor }
}

interface ColorsType {
  [key: string]: ThemeColor
}

interface UserRowColorType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'bx:mobile-alt', color: 'error' },
  author: { icon: 'bx:cog', color: 'warning' },
  maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
  editor: { icon: 'bx:edit', color: 'info' },
  subscriber: { icon: 'bx:user', color: 'primary' }
}

const roleColors: ColorsType = {
  admin: 'error',
  active: 'info',
  invited: 'warning',
  accepted: 'success',
  deleted: 'primary'
}

const dummyData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  }
]

export const dummyColumns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 150,
    field: 'student id',
    headerName: 'User Id',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Lorem, ipsum dolor.
              </Typography>
            </Skeleton>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'User Name',
    field: 'User Name',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem, ipsum dolor.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={params.row.userStatus}
            sx={{ fontWeight: 500 }}
            color={roleColors[params.row.userStatus]}
          />
          Lorem, ipsum dolor.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    field: 'studentEmail',
    minWidth: 200,
    headerName: 'Email Id',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem, ipsum dolor.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    field: 'designation',
    minWidth: 200,
    headerName: 'Designation',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem, ipsum dolor.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    field: 'user Role',
    minWidth: 80,
    headerName: 'user Role',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem, ipsum dolor.
        </Typography>
      </Skeleton>
    )
  },



]

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <CustomAvatar
      skin='light'
      color={color as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row.userName ? row.userName : 'John Doe')}
    </CustomAvatar>
  )

}

const columns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 150,
    field: 'student id',
    headerName: 'User Id',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip title={row.childCustomerId} componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  textTransform: "capitalize",
                  "& .MuiTooltip-arrow": {
                    color: "black"
                  }
                }
              }
            }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.childCustomerId}
              </Typography>
            </Tooltip>
          </Box>
        </Box >
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'User Name',
    field: 'User Name',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.userName + "  " + params.row.userSurname} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.userName} {params.row.userSurname}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={params.row.userStatus}
          sx={{ fontWeight: 500 }}
          color={roleColors[params.row.userStatus]}
        />

      </Typography>
    )
  },
  {
    flex: 0.175,
    field: 'studentEmail',
    minWidth: 200,
    headerName: 'Email Id',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.userEmail ? params.row.userEmail : '_'} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",

            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.userEmail ? params.row.userEmail : 'lorem ipsum'}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    field: 'designation',
    minWidth: 200,
    headerName: 'Designation',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.designation ? params.row.designation : '_'} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.designation ? params.row.designation : 'lorem ipsum'}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    field: 'user Role',
    minWidth: 80,
    headerName: 'user Role',
    renderCell: (params: GridRenderCellParams) => (

      // params.row.studentStatus == "active" ?
      // <CustomChip rounded size='small' skin='light' color='success' label={params.row.studentStatus} />
      // : <CustomChip rounded size='small' skin='light' color='error' label={params.row.studentStatus} />

      <Tooltip title={params.row.role.roleName ? params?.row.role.roleName : '-'} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.role.roleName ? params?.row.role.roleName : 'lorem ipsum'}
        </Typography>
      </Tooltip>
    )
  },



]

const UserList = ({ userReload, rolesArray, userListReload }: any) => {
  // ** State
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [userList, setUserList] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [userDetail, setUserDetail] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      const customerId = JSON.parse(orgData).customerId
      const organizationId = JSON.parse(orgData).organizationId
      listAllUserFunction(customerId, organizationId)
    }
  }, [])

  const listAllUserFunction = (customerId: any, organizationId: any) => {
    listAllUsers({ customerId: customerId, organizationId: organizationId }).then((res: any) => {
      setUserList(res.data.data)
      setLoading(false)
    })
  }

  const handleCellClick = (i: any) => {
    localStorage.setItem('subUserDetails', JSON.stringify(i))
    setUserDetail(i)
    setOpen(true)
  }



  useEffect(() => {
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      const customerId = JSON.parse(orgData).customerId
      const organizationId = JSON.parse(orgData).organizationId
      listAllUserFunction(customerId, organizationId)
    }
  }, [userReload, userListReload])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            {
              loading ?
                <>
                  <DataGrid
                    autoHeight
                    sx={{ cursor: 'pointer' }}
                    rows={dummyData}
                    columns={dummyColumns}
                    getRowId={(row) => row.id ? row.id : Math.random()}
                    pageSize={pageSize}
                    onCellClick={(i) => { handleCellClick(i.row) }}
                    disableSelectionOnClick
                    rowsPerPageOptions={[10, 25, 50]}
                    onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                  />
                </>
                :
                <DataGrid
                  autoHeight
                  sx={{ cursor: 'pointer' }}
                  rows={userList ? userList : []}
                  columns={columns}
                  getRowId={(row) => row.childCustomerId ? row.childCustomerId : Math.random()}
                  pageSize={pageSize}
                  onCellClick={(i) => { handleCellClick(i.row) }}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                />
            }
          </Card>
        </Grid>
      </Grid>
      <UserDialogBox open={open} setOpen={setOpen} userData={userDetail} rolesArray={rolesArray} listRecall={listAllUserFunction} />
    </>
  )
}

export default UserList
