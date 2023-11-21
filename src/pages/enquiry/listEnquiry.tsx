import { Card, Box, Typography, CardHeader, Button, Divider } from '@mui/material';
import React, { useState, useEffect, ChangeEvent } from 'react'
import { getAllEnquiryList } from 'src/store/APIs/Api';
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Router from 'next/router'
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { dummyColumns } from '../user-management/roles/UserTable';
import ServerSideToolbar from 'src/views/tabel/studentTabel/ServerSideToolBar'
import RefreshIcon from '@mui/icons-material/Refresh';

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

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Enquiry" && (obj?.action?.includes("read")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}


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
      {getInitials(row.studentName ? row.studentName : 'John Doe')}
    </CustomAvatar>
  )

}

type SortType = 'asc' | 'desc' | undefined | null

const customLocaleText = {
  noRowsLabel: 'No data found',
};

const columns: GridColumns = [


  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Student Name',
    field: 'studentFirstName',
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
        </Box>
        <Tooltip title={params.row.studentName} componentsProps={{
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
            {params.row.studentName?.charAt(0).toUpperCase() + params.row.studentName?.slice(1)}
          </Typography>
        </Tooltip>
      </>
    )
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Enquiry Subject',
    field: 'CourseName',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.enquiryCourse} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }} >
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.enquiryCourse}
        </Typography>
      </Tooltip>
    )
  },


  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Mobile Number',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.mobileNumber} componentsProps={{
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
          {params.row.mobileNumber}
        </Typography>
      </Tooltip>
    )
  },

  {
    flex: 0.175,
    field: 'studentEmail',
    minWidth: 200,
    headerName: 'Email Id',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.email} componentsProps={{
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
          {params.row.email}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    field: 'studentStatus',
    minWidth: 80,
    headerName: 'View & update',
    renderCell: (params: GridRenderCellParams) => (
      <div style={{ marginLeft: 20 }}>
        <RemoveRedEyeIcon color='primary' />
      </div>
    )
  },


]



export const ListEnquiry = () => {

  const router = useRouter();
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')
  const [studentData, setStudentData] = useState<any>([])
  const [user, setUser] = useState<any>()
  const [defaultList, setDefaultList] = useState<any>([])
  const [orgData, setOrgData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)



  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setOrgData(userDetails)
      setUser(JSON.parse(userDetails))
    }
  }, [])


  useEffect(() => {
    const organizationData = localStorage.getItem('organization')
    if (organizationData) {
      getEnquiryData(organizationData)
    }
  }, [])

  const getEnquiryData = (data: any) => {
    getAllEnquiryList({
      customerId: JSON.parse(data).customerId
      , organizationId: JSON.parse(data).organizationId
    }).then((res: any) => {
      const data = res.data.dataArray
      setStudentData(data)
      setDefaultList(data)
      setLoading(false)
    }).catch((error: any) => {
      return error;
    })
  }

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])


  useEffect(() => {
    const organizationData = localStorage.getItem('organization')
    if (organizationData) {
      getEnquiryData(organizationData)
    }
  }, [router.query])

  const handleCellClick = (row: any) => {
    router.push(`/enquiry/${row.id}`)

  }

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)

      // fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }
  const handleSearch = (value: string) => {
    setSearchValue(value)

    if (value) {
      const data = studentData.filter((e: any, index: number) => {
        if (e.studentName.toLowerCase().includes(value.toLowerCase())
          || e.mobileNumber.toLowerCase().includes(value.toLowerCase()) || e.email.toLowerCase().includes(value.toLowerCase())
          || e.enquiryCourse.toLowerCase().includes(value.toLowerCase())) {
          return e;
        }
      })
      if (data.length > 0) {
        setStudentData(data)
      }
      else {
        setStudentData(defaultList)
      }
    }
    else {
      setStudentData(defaultList)
    }
  }

  return (
    <>
      {permission?.some((obj: any) => obj?.title === "Enquiry" && (obj?.action?.includes("read"))) && <>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
            <Button className='refresh' variant='outlined' size='small' sx={{ ml: 6, mt: 5, mb: 5, height: 34 }} onClick={() => {
              getEnquiryData(orgData);
              setLoading(true)
            }}>
              <RefreshIcon className='refresh' />
            </Button>
          </div>
          {
            loading ? <>
              <DataGrid
                autoHeight
                pagination
                sx={{ cursor: "pointer" }}
                rows={dummyData}
                getRowId={(row) => row.id}
                columns={dummyColumns}
                localeText={customLocaleText}
                onCellClick={handleCellClick}
                pageSize={pageSize}
                onSortModelChange={handleSortModel}
                rowsPerPageOptions={[10, 25, 50, 100]}
                onPageChange={newPage => setPage(newPage)}
                components={{ Toolbar: ServerSideToolbar }}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                componentsProps={{
                  baseButton: {
                    variant: 'outlined'
                  },
                  toolbar: {
                    value: searchValue,
                    clearSearch: () => handleSearch(''),
                    onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                  }
                }}
              />
            </>
              :
              <DataGrid
                autoHeight
                pagination
                sx={{ cursor: "pointer" }}
                rows={studentData}
                getRowId={(row) => row.id}
                columns={columns}
                localeText={customLocaleText}
                onCellClick={handleCellClick}
                pageSize={pageSize}
                onSortModelChange={handleSortModel}
                rowsPerPageOptions={[10, 25, 50, 100]}
                onPageChange={newPage => setPage(newPage)}
                components={{ Toolbar: ServerSideToolbar }}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                componentsProps={{
                  baseButton: {
                    variant: 'outlined'
                  },
                  toolbar: {
                    value: searchValue,
                    clearSearch: () => handleSearch(''),
                    onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                  }
                }}
              />
          }

        </Card>



      </>}

      <Error404Component permission={permission} />
    </>

  )
}
export default ListEnquiry;
