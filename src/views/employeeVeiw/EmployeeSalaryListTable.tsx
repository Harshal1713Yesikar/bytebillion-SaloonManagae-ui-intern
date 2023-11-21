// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { ReactDatePickerProps } from 'react-datepicker'
import { useTheme } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// ** Api Imports

import { useRouter } from 'next/router'
import { listEmployeeSalary, employeeSalaryDetails, updateEmployeeSalary, deleteEmployeeSalary, getEmployeeDetails, getEmployeeSalaryPdf, genrateEmployeeSalaryPdf } from 'src/store/APIs/Api'



// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'
import Icon from 'src/@core/components/icon'
import { CardContent, Grid } from '@mui/material'

interface CellType {
  row: ProjectListDataType
}

// const Img = styled('img')(({ theme }) => ({
//   width: 32,
//   height: 32,
//   borderRadius: '50%',
//   marginRight: theme.spacing(3)
// }))


const EmployeeSalaryListTable = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { apiCall, setApiCall } = props
  const [oneDaySalary, setOneDaySalary] = useState<any>()
  const [payAbleDays, setPayAbleDays] = useState<any>()
  const [employeeInHandSalary, setEmployeeInHandSalary] = useState<any>()
  const [deletePopUp, setDeletePopUp] = useState<any>()
  const theme = useTheme()
  const { direction } = theme
  const [salaryId, setSalaryId] = useState<any>()
  const [singleEmployeeData, setSingleEmployeeData] = useState<any>()

  //snack bar useState
  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })

  const [open, setOpen] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const [employeeSalaryData, setEmployeeSalaryData] = useState<any>([])
  const [deleteStatus, setDeleteStatus] = useState<any>()
  const [singleSalaryData, setSingleSalaryData] = useState<any>({
    totalSalary: "",
    totalWorkingDays: "",
    lossOfDays: "",
    payableDays: "",
    inhandSalary: '',
    salaryDate: ""
  })
  const [pageSize, setPageSize] = useState<number>(7)
  const [date, setDate] = useState<DateType>(new Date())
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const router: any = useRouter()
  const { employeeId } = router.query
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [permission, setPermission] = useState<any>()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [organizationLogo, setOrganizationLogo] = useState<any>("")

  useEffect(() => {
    const logoData = localStorage.getItem("organizationLogo")
    if (logoData) {
      setOrganizationLogo(JSON.parse(logoData).logo)
    }
  }, [])

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
      getEmployeeDetails(user.customerId, employeeId, user.organizationId).then(res => {
        setSingleEmployeeData(res.data)
      })
    }
  }, [user])

  useEffect(() => {
    const employeeOneDaySalary: any = singleSalaryData.totalSalary / singleSalaryData.totalWorkingDays
    setOneDaySalary(employeeOneDaySalary)
  }, [singleSalaryData.totalSalary, singleSalaryData.totalWorkingDays, singleSalaryData.lossOfDays, employeeInHandSalary])
  useEffect(() => {
    if (singleSalaryData.totalWorkingDays && singleSalaryData.lossOfDays) {
      setPayAbleDays(parseInt(singleSalaryData.totalWorkingDays) - parseInt(singleSalaryData.lossOfDays))
    }
  }, [singleSalaryData.totalWorkingDays, singleSalaryData.lossOfDays])

  useEffect(() => {

    setEmployeeInHandSalary(payAbleDays * oneDaySalary)

  }, [singleSalaryData.totalSalary, singleSalaryData.totalWorkingDays, singleSalaryData.lossOfDays, oneDaySalary, payAbleDays, employeeInHandSalary])

  useEffect(() => {
    if (employeeInHandSalary) {
      singleSalaryData.inhandSalary = parseInt(employeeInHandSalary)
      setSingleSalaryData(singleSalaryData)

    }

  }, [employeeInHandSalary])

  useEffect(() => {
    if (payAbleDays) {
      singleSalaryData.payableDays = payAbleDays
      setSingleSalaryData(singleSalaryData)
    }
  }, [payAbleDays])

  useEffect(() => {
    if (date) {
      singleSalaryData.salaryDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      setSingleSalaryData(singleSalaryData)
    }
  }, [date])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (user) {
      const customerId = user ? user.customerId : ""
      const organizationId = user ? user.organizationId : ""
      if (customerId && employeeId && organizationId) {
        listEmployeeSalary(customerId, employeeId, organizationId).then((res) => {
          if (res?.data) {
            setEmployeeSalaryData(res.data)
          }
          setIsLoading(false)
        })
      } else if (apiCall == true) {
        listEmployeeSalary(customerId, employeeId, organizationId).then((res) => {
          if (res?.data) {
            setEmployeeSalaryData(res.data)
          }
          setApiCall(false)
        })
      }
      setApiCall(false)
    }
  }, [user, employeeId, apiCall])

  const handleClickOpen = () => {
    setOpen(true)
    setDate(null)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""
    if (customerId && organizationId && employeeId && salaryId) {
      employeeSalaryDetails(customerId, organizationId, employeeId, salaryId).then((res: any) => {
        setSingleSalaryData(res.data)
      })
    }

  }, [salaryId])


  const handleDownload = async (date: any) => {

    const data = {
      customerId: user.customerId,
      employeeId: employeeId,
      organizationId: user.organizationId,
      salaryDate: date,
      employeeName: `${singleEmployeeData.employeeFirstname} ${singleEmployeeData.employeeLastname}`
    }
    getEmployeeSalaryPdf(data).then((res: any) => {
      if (res?.statusCode == 200) {
        const buffer = Buffer.from(res.data.pdfData, 'base64')

        // const buffer = res.data
        const blob = new Blob([buffer], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a');
        link.href = url;
        link.download = `${singleEmployeeData?.employeeFirstname}-${singleEmployeeData?.employeeLastname}-SalarySlip.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        setSnackbarColor(true)
        setOpenSnackBar({ open: true, mssg: "success" })
      }
      else if (res.statusCode == 404) {
        setSnackbarColor(false)
        setSnackbaropen(true)
        setResponseMessage("First you need to send Invoice")

      }
    })
  }

  const handleSalaryApi = (date: any) => {
    const customerId = user ? user.customerId : ''
    const organizationId = user ? user.organizationId : ''

    const data = {
      customerId: user.customerId,
      employeeId: singleEmployeeData.employeeId,
      organizationId: user.organizationId,
      employeeMail: singleEmployeeData.employeeEmail,
      organizationName: user.organizationName,
      currency: "",
      employeeDesignation: singleEmployeeData.employeeDesignation,
      paymentDate: date,
      employeeName: `${singleEmployeeData.employeeFirstname} ${singleEmployeeData.employeeLastname} `,
      templateIndex: '1',
      supportEmail: user.organizationEmail,
      organizationLogo: organizationLogo,
      purpose: "mail"
    }

    if (date) {
      genrateEmployeeSalaryPdf(data).then(res => {
        if (res.statusCode == 200) {
          setSnackbarColor(true)
          setOpenSnackBar({ open: true, mssg: res.message })

        } else {
          setSnackbarColor(false)
          setOpenSnackBar({ open: true, mssg: res.message })
        }
      })


    }
  }



  useEffect(() => {
    if (deleteStatus == true) {
      const customerId = user ? user.customerId : ""
      const organizationId = user ? user.organizationId : ""

      deleteEmployeeSalary(customerId, organizationId, employeeId, salaryId).then((res: any) => {
        if (res.statusCode == 204) {

          listEmployeeSalary(customerId, employeeId, organizationId).then((res: any) => {
            if (res?.data) {
              setEmployeeSalaryData(res.data)
            }
            setDeleteStatus(false)
            setSnackbarColor(true)
            setOpenSnackBar({ open: true, mssg: res.message })

          })

        }
        else {
          setSnackbarColor(false)
          setOpenSnackBar({ open: true, mssg: res.message })
        }
      })
    }
  }, [deleteStatus])

  const handleDeleteApi = () => {

    setDeleteStatus(true)
  }
  const [openPopUp, setOpenPopUp] = useState<any>(false)

  const columns = permission?.some((obj: any) => obj?.title === "Employee" && (obj.action.includes("update") && obj?.action?.includes("delete"))) ?
    [

      {
        flex: 0,
        minWidth: 150,
        field: 'totalSalary',
        headerName: 'Total Salary',
        renderCell: ({ row }: CellType) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Img src={row.img} alt={`project - ${ row.projectTitle } `} /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography variant='body2' sx={{ color: 'grey', alignItems: "center" }}>
                {row.totalSalary}
              </Typography>
            </Box>
          </Box>
        )
      },

      {
        flex: 0.15,
        minWidth: 200,
        headerName: 'Total Working Days',
        field: 'totalWorkingDays',
        renderCell: ({ row }: CellType) => (
          <Box sx={{ width: '100%' }}>
            <Typography variant='body2' style={{ color: "grey" }}>{row.totalWorkingDays}</Typography>

          </Box>
        )
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'lossOfDays',
        headerName: 'Loss Of Days',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.lossOfDays}</Typography>
      },
      {
        flex: 0.15,
        minWidth: 130,
        field: 'inhandSalary',
        headerName: 'Inhand Salary',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.inhandSalary}</Typography>
      },
      {
        flex: 0.15,
        minWidth: 120,
        field: 'salaryDate',
        headerName: 'Salary Date',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{`${new Date(row.salaryDate).getDate()} /${new Date(row.salaryDate).getMonth() + 1}/${new Date(row.salaryDate).getFullYear()} `}</Typography>
      },
      {
        flex: 0.15,
        minWidth: 100,
        field: 'Edit',
        headerName: 'Edit',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

          <Button onClick={handleClickOpen}>
            <Icon style={{ cursor: "pointer" }} icon='bx:pencil' >

            </Icon>
          </Button>

        </Typography >
      },
      {
        flex: 0.15,
        minWidth: 100,
        field: 'download',
        headerName: 'download',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

          <Button onClick={() => { handleDownload(row.salaryDate) }}>
            <Icon style={{ cursor: "pointer" }} icon='bx:download' >
            </Icon>
          </Button>

        </Typography >
      },
      {
        flex: 0.15,
        minWidth: 100,
        field: 'invoice',
        headerName: 'Send Invoice',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

          <Button onClick={() => { handleSalaryApi(row.salaryDate) }}>
            <Icon style={{ cursor: "pointer" }} icon='bx:envelope' >

            </Icon>
          </Button>

        </Typography >
      },
      {
        flex: 0.15,
        minWidth: 120,
        field: 'Delete',
        headerName: 'Delete',
        renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

          <Button onClick={() => { setOpenPopUp(true), setDeletePopUp(true) }}>
            <Icon style={{ cursor: "pointer" }} icon='ic:round-delete' >

            </Icon>
          </Button>

        </Typography >
      },
    ]
    :
    permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) ?

      [
        {
          flex: 0,
          minWidth: 150,
          field: 'totalSalary',
          headerName: 'Total Salary',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Img src={row.img} alt={`project - ${ row.projectTitle } `} /> */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <Typography variant='body2' sx={{ color: 'grey', alignItems: "center" }}>
                  {row.totalSalary}
                </Typography>
              </Box>
            </Box>
          )
        },
        {
          flex: 0.15,
          minWidth: 200,
          headerName: 'Total Working Days',
          field: 'totalWorkingDays',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ width: '100%' }}>
              <Typography variant='body2' style={{ color: "grey" }}>{row.totalWorkingDays}</Typography>

            </Box>
          )
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'lossOfDays',
          headerName: 'Loss Of Days',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.lossOfDays}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 130,
          field: 'inhandSalary',
          headerName: 'Inhand Salary',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.inhandSalary}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 120,
          field: 'salaryDate',
          headerName: 'Salary Date',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{`${new Date(row.salaryDate).getDate()} /${new Date(row.salaryDate).getMonth() + 1}/${new Date(row.salaryDate).getFullYear()} `}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'download',
          headerName: 'download',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleDownload(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:download' >

              </Icon>
            </Button>

          </Typography >
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'invoice',
          headerName: 'Send Invoice',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleSalaryApi(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:envelope' >

              </Icon>
            </Button>

          </Typography >
        },
      ] : permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("delete")) ? [
        {
          flex: 0,
          minWidth: 150,
          field: 'totalSalary',
          headerName: 'Total Salary',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Img src={row.img} alt={`project - ${ row.projectTitle } `} /> */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <Typography variant='body2' sx={{ color: 'grey', alignItems: "center" }}>
                  {row.totalSalary}
                </Typography>
              </Box>
            </Box>
          )
        },
        {
          flex: 0.15,
          minWidth: 200,
          headerName: 'Total Working Days',
          field: 'totalWorkingDays',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ width: '100%' }}>
              <Typography variant='body2' style={{ color: "grey" }}>{row.totalWorkingDays}</Typography>

            </Box>
          )
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'lossOfDays',
          headerName: 'Loss Of Days',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.lossOfDays}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 130,
          field: 'inhandSalary',
          headerName: 'Inhand Salary',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.inhandSalary}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 120,
          field: 'salaryDate',
          headerName: 'Salary Date',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{`${new Date(row.salaryDate).getDate()} /${new Date(row.salaryDate).getMonth() + 1}/${new Date(row.salaryDate).getFullYear()} `}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'download',
          headerName: 'download',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleDownload(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:download' >

              </Icon>
            </Button>

          </Typography >
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'invoice',
          headerName: 'Send Invoice',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleSalaryApi(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:envelope' >

              </Icon>
            </Button>

          </Typography >
        }, {
          flex: 0.15,
          minWidth: 120,
          field: 'Delete',
          headerName: 'Delete',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { setOpenPopUp(true), setDeletePopUp(true) }}>
              <Icon style={{ cursor: "pointer" }} icon='ic:round-delete' >

              </Icon>
            </Button>

          </Typography >
        },
      ] : [
        {
          flex: 0,
          minWidth: 150,
          field: 'totalSalary',
          headerName: 'Total Salary',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Img src={row.img} alt={`project - ${ row.projectTitle } `} /> */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <Typography variant='body2' sx={{ color: 'grey', alignItems: "center" }}>
                  {row.totalSalary}
                </Typography>
              </Box>
            </Box>
          )
        },
        {
          flex: 0.15,
          minWidth: 200,
          headerName: 'Total Working Days',
          field: 'totalWorkingDays',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ width: '100%' }}>
              <Typography variant='body2' style={{ color: "grey" }}>{row.totalWorkingDays}</Typography>

            </Box>
          )
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'lossOfDays',
          headerName: 'Loss Of Days',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.lossOfDays}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 130,
          field: 'inhandSalary',
          headerName: 'Inhand Salary',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{row.inhandSalary}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 120,
          field: 'salaryDate',
          headerName: 'Salary Date',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>{`${new Date(row.salaryDate).getDate()} /${new Date(row.salaryDate).getMonth() + 1}/${new Date(row.salaryDate).getFullYear()} `}</Typography>
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'download',
          headerName: 'download',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleDownload(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:download' >

              </Icon>
            </Button>

          </Typography >
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'invoice',
          headerName: 'Send Invoice',
          renderCell: ({ row }: CellType) => <Typography style={{ color: "grey" }} variant='body2'>

            <Button onClick={() => { handleSalaryApi(row.salaryDate) }}>
              <Icon style={{ cursor: "pointer" }} icon='bx:envelope' >

              </Icon>
            </Button>

          </Typography >
        },
      ]




  // ** State
  const [value, setValue] = useState<string>('')



  const [data, setData] = useState<ProjectListDataType[]>([])
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const names = [{ name: "Aman", id: 1 }, { name: "Ayan", id: 2 }]




  const handleChange = (e: any) => {
    setSingleSalaryData({
      ...singleSalaryData,
      [e.target.name]: e.target.value
    })

  }



  const handleCellClick = (row: any) => {
    setSalaryId(row.id)

  }

  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""
    if (singleSalaryData.totalSalary && singleSalaryData.totalWorkingDays && singleSalaryData.lossOfDays) {
      updateEmployeeSalary(customerId, organizationId, employeeId, salaryId, singleSalaryData).then((res: any) => {
        if (res.statusCode == 200) {

          listEmployeeSalary(customerId, employeeId, organizationId).then((res: any) => {
            if (res?.data) {
              setEmployeeSalaryData(res.data)
            }
            setSnackbarColor(true)
            setSnackbaropen(true)
            setResponseMessage("Successfully updated ")
            setSubmitted(false)
            handleClose()
          })

        }
        else {
          setOpenSnackBar({ open: true, mssg: res.message })
        }
      })
    }
    else {

      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill the required information ")
    }
  }
  const handleConfirmation = (value: string) => {
    handleDeleteClose()

  }

  const handleDeleteClose = () => {
    setOpenPopUp(false)
  }

  return (
    <>
      {isLoading ? (
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography>Loading...</Typography>
        </Box>
      ) :
        <Card>
          <CardHeader title="Salary Details" />

          <DataGrid
            autoHeight
            rows={employeeSalaryData}
            getRowId={(row) => row.salaryId}
            onCellClick={handleCellClick}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[7, 10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>}

      {/* Edit Dialog Box */}
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: 750 },
          '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{
            textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px"
          }} >Update Salary Details</DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => {
              handleClose()
              setFormUpdateButton(false)
              setSubmitted(false)
            }}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid >

        <Grid container spacing={5} sx={{
          padding: 5
        }}>

          <Grid item xs={12} sm={6}>
            <TextField id='name' name='totalSalary' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              value={singleSalaryData ? singleSalaryData.totalSalary : ""} fullWidth type='number' label='Total salary'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,

              }}
              style={{
                width: '100%'
              }}
              error={submitted ? singleSalaryData.totalSalary ? false : true : false}
              helperText={submitted && !singleSalaryData.totalSalary ? 'Required,value must be a positive number' : ''} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='totalWorkingDays' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }} autoFocus value={singleSalaryData ? singleSalaryData.totalWorkingDays : ""} fullWidth type='number' label='Total working days'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,

              }}
              style={{
                width: "100%"
              }}
              error={submitted ? singleSalaryData.totalWorkingDays ? false : true : false}
              helperText={submitted && !singleSalaryData.totalWorkingDays ? 'Required,value must be a positive number' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='lossOfDays' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }} autoFocus value={singleSalaryData ? singleSalaryData.lossOfDays : ""} fullWidth type='number' label='Loss of days'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,

              }}
              style={{
                width: "100%"
              }}
              error={submitted ? singleSalaryData.lossOfDays ? false : true : false}
              helperText={submitted && !singleSalaryData.lossOfDays ? 'Required,value must be a positive number' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' InputLabelProps={{ shrink: true, }} name='payableDays' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }} autoFocus value={payAbleDays ? payAbleDays : singleSalaryData.payableDays} fullWidth type='number' label='PayAble days' />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' autoFocus name='inhandSalary' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }} value={employeeInHandSalary ? parseInt(employeeInHandSalary) : singleSalaryData.inhandSalary} fullWidth type='number' label='Inhand salary' />
          </Grid>

          <Grid item xs={12} sm={6}></Grid>
          <DialogActions sx={{ marginTop: "20px", width: '100%', display: 'flex', justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => {
              handleClose()
              setFormUpdateButton(false)
              setSubmitted(false)
            }}>
              Cancel
            </Button>
            <Button variant='contained' onClick={() => {

              handleApi()
              setFormUpdateButton(false)
              setSubmitted(true)
            }} disabled={!formUpdateButton}>
              Update
            </Button>
          </DialogActions>

        </Grid>
      </Dialog >
      {/* DELETE DIALOG BOX */}
      {
        deletePopUp ? <Dialog fullWidth open={openPopUp} onClose={handleDeleteClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
          <Grid container justifyContent="flex-end">
            <Icon
              className="iconContainer"
              onClick={() => handleConfirmation('cancel')}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </Grid >
          <DialogContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                  Are you sure?
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1.125rem', mb: 5 }}>You won't be able to revert Employee !</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
              Cancel
            </Button>
            <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
              handleConfirmation('yes')
              handleDeleteApi()
            }}>
              Yes, delete salary record!
            </Button>

          </DialogActions>
        </Dialog> : ""
      }

      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackBar.open} onClose={() => setOpenSnackBar({ open: false, mssg: "success" })} autoHideDuration={2000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'}
        >
          {openSnackBar.mssg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EmployeeSalaryListTable
