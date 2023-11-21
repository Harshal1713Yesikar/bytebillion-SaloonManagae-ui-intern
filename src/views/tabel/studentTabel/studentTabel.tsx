import { useEffect, useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip';
import { getAllStudentList } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { Button } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/tabel/studentTabel/ServerSideToolBar'
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { Skeleton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';


// const defaultTheme = createTheme();
// const theme = createTheme({
//   components: {
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           backgroundColor: "black",

//         }
//       }
//     }
//   }
// });

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

type SortType = 'asc' | 'desc' | undefined | null

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
      {getInitials(row.studentFirstName ? row.studentFirstName : 'John Doe')}
    </CustomAvatar>
  )
}

const dummyData = [
  {
    rollNo: 1
  },
  {
    rollNo: 2
  },
  {
    rollNo: 3
  },
  {
    rollNo: 4
  },

]

const customLocaleText = {
  noRowsLabel: 'No data found',

  // You can customize other text labels here as well
};

const dummyColumns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 180,
    field: 'rollNo',
    headerName: 'Student Enrollment',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Lorem, ipsum.
              </Typography>
            </Skeleton>
            <Skeleton>
              <Typography noWrap variant='caption'>
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
    headerName: 'Student Name',
    field: 'studentFirstName',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }} >
          Lorem.
        </Typography>
      </Skeleton>
    )
  },
  // {
  //   flex: 0.175,
  //   minWidth: 120,
  //   headerName: 'Course Name',
  //   field: 'CourseName',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Skeleton>
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         Lorem.
  //       </Typography>
  //     </Skeleton>
  //   )
  // },
  // {
  //   flex: 0.175,
  //   minWidth: 120,
  //   headerName: 'Batch Name',
  //   field: 'BatchName',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Skeleton >
  //       <Typography variant='body2' sx={{ display: 'flex', color: 'text.primary', justifyContent: 'center' }}>
  //         Lorem, ipsum.
  //       </Typography>
  //     </Skeleton >
  //   )
  // },

  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Mobile Number',
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
    field: 'studentEmail',
    minWidth: 200,
    headerName: 'Email Id',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem ipsum dolor sit.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    field: 'studentStatus',
    minWidth: 80,
    headerName: 'Student Status',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <CustomChip rounded size='small' skin='light' color='success' label={params.row.studentStatus} />
      </Skeleton>
    )
  },
  {

    flex: 0.175,
    field: 'paymentStatus',
    minWidth: 80,
    headerName: 'Payment Status',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <CustomChip rounded size='small' skin='light' color='success' label={"PAID"} />
      </Skeleton>
    )
  },
]

const columns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 180,
    field: 'rollNo',
    headerName: 'Student Enrollment',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}

          <Tooltip title={params.row.studentEnrollmentNumber} componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "black",

                "& .MuiTooltip-arrow": {
                  color: "black"
                }
              }
            }
          }} >

            <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
              {row.studentEnrollmentNumber}
            </Typography>

          </Tooltip>
        </Box>
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Student Name',
    field: 'studentFirstName',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.studentFirstName + " " + params.row.studentLastName}
        componentsProps={{
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
        <Typography variant='body2' sx={{ color: 'text.primary' }} >
          {params.row.studentFirstName.charAt(0).toUpperCase() + params.row.studentFirstName.slice(1)} {params.row.studentLastName.charAt(0).toUpperCase() + params.row.studentLastName.slice(1)}
        </Typography>
      </Tooltip>
    )
  },
  // {
  //   flex: 0.175,
  //   minWidth: 120,
  //   headerName: 'Course Name',
  //   field: 'CourseName',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Tooltip title={params.row.courses ? params.row.courses.map((e: any, index: any) =>
  //       index + 1 != params.row.courses.length ? <>{e.courseName}, </> : <>
  //         {e.courseName}
  //       </>
  //     ) : " "} componentsProps={{
  //       tooltip: {
  //         sx: {
  //           bgcolor: "black",
  //           textTransform: "capitalize",
  //           "& .MuiTooltip-arrow": {
  //             color: "black"
  //           }
  //         }
  //       }
  //     }} >
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         {params.row.courses ? params.row.courses.map((e: any) => e.courseName + " ") : " "}
  //       </Typography>
  //     </Tooltip>
  //   )
  // },
  // {
  //   flex: 0.175,
  //   minWidth: 120,
  //   headerName: 'Batch Name',
  //   field: 'BatchName',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Tooltip title={params.row.batch && params.row?.batch.length > 0
  //       ? params.row.batch.map((e: any, index: any) => index + 1 != params.row.batch.length ? <>{e.batchName}, </> : <>
  //         {e.batchName}
  //       </>)
  //       : <CustomChip rounded size='small' skin='light' label={'No batch'} style={{ color: 'white' }} />} componentsProps={{
  //         tooltip: {
  //           sx: {
  //             bgcolor: "black",
  //             textTransform: "capitalize",
  //             "& .MuiTooltip-arrow": {
  //               color: "black"
  //             }
  //           }
  //         }
  //       }} >
  //       <Typography variant='body2' sx={{ display: 'flex', color: 'text.primary', justifyContent: 'center' }}>
  //         {params.row.batch && params.row?.batch.length > 0
  //           ? params.row.batch.map((e: any) => e.batchName + " ")
  //           : <CustomChip rounded size='small' skin='light' label={'-'} style={{ marginLeft: '17px' }} />}

  //       </Typography>
  //     </Tooltip>
  //   )
  // },

  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Mobile Number',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.studentContact} componentsProps={{
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
          {params.row.studentContact}
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
      <Tooltip title={params.row.studentEmail} componentsProps={{
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
          {params.row.studentEmail}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    field: 'studentStatus',
    minWidth: 100,
    headerName: 'Student Status',
    renderCell: (params: GridRenderCellParams) => (
      params.row.studentStatus == "active" ?
        <CustomChip rounded size='small' skin='light' color='info' label={params.row.studentStatus} />
        :
        params.row.studentStatus == "inActive" ?
          <CustomChip rounded size='small' skin='light' color='warning' label={params.row.studentStatus} />

          : <CustomChip rounded size='small' skin='light' color='error' label={params.row.studentStatus} />
    )
  },
  {

    flex: 0.175,
    field: 'paymentStatus',
    minWidth: 80,
    headerName: 'Payment Status',
    renderCell: (params: GridRenderCellParams) => (
      params.row.allPaymentStatus == "payed" ?
        <CustomChip rounded size='small' skin='light' color='success' label={"PAID"} />
        : params.row.allPaymentStatus == "due" ?
          <CustomChip rounded size='small' skin='light' color='warning' label={params.row.allPaymentStatus} />
          :
          params.row.allPaymentStatus == "refund" ?
            <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.allPaymentStatus} />
            :
            <CustomChip rounded size='small' skin='light' color='error' label={params.row.allPaymentStatus} />
    )
  },
]


const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read"))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}

const StudentTable = () => {

  // ** State
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [user, setUser] = useState<any>()
  const [sort, setSort] = useState<SortType>('asc')
  const [org, setOrg] = useState<any>({})
  const [pageSize, setPageSize] = useState<number>(10)
  const [permission, setPermission] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [studentData, setStudentData] = useState<any>([])
  const [defaultList, setDefaultList] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)

    }
  }, [user])

  function loadServerRows(currentPage: number, data: DataGridRowType[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const handleCellClick = (row: any) => {
    router.push(`/student/studentDetails/${row.row.rollNo}`)
  }
  useEffect(() => {

    if (user) {
      studentListFunc(user)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])



  const studentListFunc = (user: any) => {
    getAllStudentList(user.customerId, user.organizationId)
      .then((res) => {
        const data = res?.data
        setStudentData(data)
        setDefaultList(data)
        setLoading(false)
      })
  }


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value) {
      let data
      if (value == "paid") {
        data = studentData.filter((e: any, index: number) => {
          if (e.allPaymentStatus.includes("payed")) {
            return e;
          }
        })

      } else {
        data = studentData.filter((e: any, index: number) => {
          if (e.studentFirstName.toLowerCase().includes(value.toLowerCase()) || e.studentLastName.toLowerCase().includes(value.toLowerCase())
            || e.studentContact.toLowerCase().includes(value.toLowerCase()) || e.studentEmail.toLowerCase().includes(value.toLowerCase())
            || e.studentStatus.toLowerCase().includes(value.toLowerCase())
          ) {
            return e;
          }
        })
      }

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

    // fetchTableData(sort, value, sortColumn)
  }




  return (

    <Card>
      {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) &&
        <>
          <div >
            <Button
              className='refresh'
              variant='outlined' size='small' sx={{ ml: 6, mt: 5, mb: 5, height: 34 }} onClick={() => {
                studentListFunc(user);
                setLoading(true)
              }}><RefreshIcon />
            </Button>
          </div>
          <DataGrid
            autoHeight
            pagination
            rows={loading ? dummyData : studentData}
            sx={{ cursor: "pointer" }}
            getRowId={(row) => row.rollNo}
            columns={loading ? dummyColumns : columns}
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
      }

      <Error404Component permission={permission} />
    </Card>

  )
}

export default StudentTable
