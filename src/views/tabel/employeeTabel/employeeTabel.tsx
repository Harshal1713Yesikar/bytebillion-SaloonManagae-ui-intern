// ** React Imports
import { useEffect, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** ThirdParty Components

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import EmployeeToolbar from './employeeToolBar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'

//** Api Imports
import { listAllEmployeeApi } from 'src/store/APIs/Api'
import { Skeleton, Button } from '@mui/material'

// ** Utils Import

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

const dummyRows = [
  {
    employeeId: 1
  },
  {
    employeeId: 2
  }, {
    employeeId: 3
  }, {
    employeeId: 4
  },
]


interface ColorsType {
  [key: string]: ThemeColor
}
type SortType = 'asc' | 'desc' | undefined | null


const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("read"))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}



const EmployeeTable = () => {



  // ** State
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(10)
  const [rows, setRows] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')
  const [employeeTableData, setEmployeeTableData] = useState<any>([])
  const [user, setUser] = useState<any>()
  const [defaultList, setDefaultList] = useState<any>([])


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])


  useEffect(() => {
    employeeTableData ? employeeTableData.map((e: any) => {
      return (<>
        {setRows(e)}
      </>)
    }) : ""

  }, [employeeTableData])
  useEffect(() => {
    console.log(rows, "dkdkdk")
  }, [rows])

  function loadServerRows(currentPage: number, data: DataGridRowType[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const dummyData: GridColumns = [
    {
      flex: 0.05,
      minWidth: 150,
      field: 'employeeFirstname',
      headerName: 'Name',
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
      flex: 0.1,
      field: 'employeeDesignation',
      minWidth: 150,
      headerName: 'Designation',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.employeeDesignation}>
          <Skeleton>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              Lorem, ipsum. Lorem, ipsum dolor.
            </Typography>
          </Skeleton>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      headerName: 'Date Of Birth',
      field: 'employeeDateOfBirth',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={new Date(params.row.employeeDateOfBirth).toLocaleDateString('en-US', { day: "2-digit", month: '2-digit', year: 'numeric' })}>
          <Skeleton>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              Lorem ipsum
            </Typography>
          </Skeleton>
        </Tooltip>
      )
    },

    {
      flex: 0.175,
      field: 'employeeEmail',
      minWidth: 150,
      headerName: 'E-mail',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.employeeEmail}>
          <Skeleton>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              Lorem, ipsum. Lorem, ipsum dolor.
            </Typography>
          </Skeleton>
        </Tooltip>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'employeeSalary',
      headerName: 'Employee Status',
      renderCell: (params: GridRenderCellParams) => (
        <Skeleton>
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            Lorem, ipsum.
          </Typography>
        </Skeleton>
      )
    }
  ]

  const columns: GridColumns = [
    {
      flex: 0.05,
      minWidth: 150,
      field: 'employeeFirstname',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={`${row.employeeFirstname} ${row.employeeLastname}`} componentsProps={{
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
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {`${row.employeeFirstname} ${row.employeeLastname}`}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'employeeDesignation',
      minWidth: 150,
      headerName: 'Designation',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.employeeDesignation} componentsProps={{
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
            {params.row.employeeDesignation}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      headerName: 'Date Of Birth',
      field: 'employeeDateOfBirth',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={new Date(params.row.employeeDateOfBirth).toLocaleDateString('en-US', { day: "2-digit", month: '2-digit', year: 'numeric' })} componentsProps={{
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
            {/* {params.row.employeeDateOfBirth.slice(0, 10)} */}

            {`${new Date(params.row.employeeDateOfBirth).getDate()}`} / {`${new Date(params.row.employeeDateOfBirth).getMonth() + 1}`} / {`${new Date(params.row.employeeDateOfBirth).getFullYear()}`}
          </Typography>
        </Tooltip>
      )
    },

    {
      flex: 0.175,
      field: 'employeeEmail',
      minWidth: 150,
      headerName: 'E-mail',
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.row.employeeEmail} componentsProps={{
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
            {params.row.employeeEmail}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'employeeSalary',
      headerName: 'Employee Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.employeeStatus == "active" ? <CustomChip rounded size='small' skin='light' color='success' label={params.row.employeeStatus} /> : <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.employeeStatus} />}


        </Typography>
      )
    }
  ]

  const customLocaleText = {
    noRowsLabel: 'No data found',
  };



  const handleSortModel = (newModel: GridSortModel) => {

    if (newModel.length) {

      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('employeeId')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)

    if (value) {

      const data = employeeTableData.filter((e: any, index: any) => {
        if (e.employeeFirstname.toLowerCase().includes(value.toLowerCase()) || e.employeeLastname.toLowerCase().includes(value.toLowerCase())
          || e.employeeEmail.toLowerCase().includes(value.toLowerCase()) || e.employeeStatus.toLowerCase().includes(value.toLowerCase())) {
          return e
        }
      })
      if (data.length > 0) {
        setEmployeeTableData(data)
      }
      else {
        setEmployeeTableData(defaultList)
      }

    }
    else {

      setEmployeeTableData(defaultList)
    }

    // fetchTableData(sort, value, sortColumn)
  }

  //Api call of list Employee
  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  const listEmployeeFunc = (user: any) => {
    listAllEmployeeApi(user.customerId, user.organizationId).then((res: any) => {
      setEmployeeTableData(res.data)
      setDefaultList(res.data)

      setIsLoading(false)
    })
  }

  useEffect(() => {
    const customerId = user ? user.customerId : "";
    const organizationId = user ? user.organizationId : "";

    if (user) {
      listEmployeeFunc(user)

    }

  }, [user])
  const router = useRouter()

  const handleCellClick = (row: any) => {

    setRows(row.row)

    router.push(`/employee/employeeSalary/${row.id}`)

  }


  return (
    <>

      {permission?.some((obj: any) => obj?.title === "Employee" && (obj?.action?.includes("read"))) &&
        <>
          <Card>
            <div style={{ display: 'flex' }}>
              {/* <CardHeader title='Employee List' /> */}
              <Button
                className='refresh'
                variant='outlined' size='small' sx={{ ml: 6, mt: 5, mb: 5, height: 34 }} onClick={() => {
                  listEmployeeFunc(user);
                  setIsLoading(true)
                }}><RefreshIcon />
              </Button>
            </div>
            <DataGrid
              autoHeight
              pagination
              sx={{ cursor: "pointer" }}
              rows={isLoading ? dummyRows : employeeTableData}
              getRowId={(row) => row.employeeId}
              columns={isLoading ? dummyData : columns}
              localeText={customLocaleText}
              onCellClick={handleCellClick}
              pageSize={pageSize}
              onSortModelChange={handleSortModel}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onPageChange={newPage => setPage(newPage)}
              components={{ Toolbar: EmployeeToolbar }}
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
          </Card>
        </>}
    </>
  )
}

export default EmployeeTable
