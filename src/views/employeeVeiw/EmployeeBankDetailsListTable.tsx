import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { makeStyles } from "@material-ui/core/styles";


//Custom Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'

//Api Imports
import { getEmployeeDetails, updateEmployee } from 'src/store/APIs/Api'

const useStyles = makeStyles({
  textField: {
    "& .MuiSelect-nativeInput": {
      paddingRight: 0,
      appearance: "none",
      "-moz-appearance": "none",
      "-webkit-appearance": "none",
      "&::-ms-expand": {
        display: "none",
      },
    },
  },
});

const EmployeeBankDetailsListTable = () => {

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [employeeData, setEmployeeData] = useState<any>([])
  const [user, setUser] = useState<any>()
  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [employeeBankData, setEmployeeBankData] = useState<any>({
    employeeBankName: '',
    employeeAccountNo: '',
    employeeIfsceCode: ''
  })
  const handleSnackbarClose = () => {

    if (openSnackBar.open == true) {
      setOpenSnackBar({ open: false, mssg: "" })

      // console.log(open, "open")
    }

  }
  const router: any = useRouter()
  const { employeeId } = router.query

  useEffect(() => {
    console.log("before moving")
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      console.log("after Moving")
      setUser(JSON.parse(userDetails))
    }

  }, [])

  useEffect(() => {
    if (user) {
      const customerId = user ? user.customerId : ""
      const organizationId = user ? user.organizationId : ""


      if (customerId && employeeId && organizationId) {

        getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {

          setEmployeeData([res.data])
          setIsLoading(false)

        })
      }
    }
  }, [user, employeeId])


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])



  const handleClickOpen = () => setOpen(true)


  const handleUpdateApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    const updateEmployeeData = {
      customerId: customerId,
      employeeId: employeeId,
      organizationId: organizationId,
      employeeBankName: employeeBankData.employeeBankName,
      employeeAccountNo: employeeBankData.employeeAccountNo,
      employeeIfsceCode: employeeBankData.employeeIfsceCode

    }
    if (updateEmployeeData.employeeBankName && updateEmployeeData.employeeAccountNo && updateEmployeeData.employeeIfsceCode) {
      updateEmployee(updateEmployeeData).then((res: any) => {
        if (res.statuscode == 200) {
          setEmployeeData([res.data])
          setSnackbarColor(true)
          setSnackbaropen(true)
          setResponseMessage("Bank details are successfully updated ")
          setSubmitted(false)
          handleClose()
        }

      })
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill all the required information ")
    }
  }

  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""


    if (customerId && employeeId && organizationId) {

      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
        console.log(res.data, "onedit")
        setEmployeeBankData(res.data)

      })
    }

  }

  const handleChange = (e: any) => {
    setEmployeeBankData({
      ...employeeBankData,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Bank Name</TableCell>
              <TableCell align='center'>Account Number</TableCell>
              <TableCell align='center'>IFSCE Code</TableCell>
              {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                <TableCell align='center'>Edit</TableCell>}

              {/* <TableCell align='right'>Protein (g)</TableCell> */}

            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Box sx={{ mt: 7, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) :
              employeeData.map((e: any) => (
                <TableRow
                  key={e.employeeId}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {e.employeeBankName}
                  </TableCell>
                  <TableCell align='center'>{e.employeeAccountNo}</TableCell>
                  <TableCell align='center'>{e.employeeIfsceCode}</TableCell>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&

                    <TableCell align='center'>
                      <Button onClick={() => {
                        handleClickOpen()
                        handleApi()
                      }}><Icon style={{ cursor: "pointer" }} icon='bx:pencil' ></Icon> </Button>
                    </TableCell>}

                  {/* <TableCell align='right'>{row.protein}</TableCell> */}

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px" }} >Update Bank Details</DialogTitle>
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

        <Grid container spacing={5} sx={{ padding: 5 }}>

          <Grid item xs={12} sm={6}>
            <TextField id='name' name='employeeBankName' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? employeeBankData.employeeBankName ? false : true : false}
              helperText={submitted && !employeeBankData.employeeBankName ? 'Required,max 50 chars' : ''}
              value={employeeBankData ? employeeBankData.employeeBankName : ""} fullWidth type='text' label='Bank name' inputProps={{
                maxLength: 50,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeAccountNo' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? employeeBankData.employeeAccountNo ? false : true : false}
              helperText={submitted && !employeeBankData.employeeAccountNo ? 'Required,max 25 chars' : ''}
              value={employeeBankData ? employeeBankData.employeeAccountNo : ""} fullWidth type='text' label='Account number' inputProps={{
                maxLength: 25,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeIfsceCode' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? employeeBankData.employeeIfsceCode ? false : true : false}
              helperText={submitted && !employeeBankData.employeeIfsceCode ? 'Required,max 15 chars' : ''}
              value={employeeBankData ? employeeBankData.employeeIfsceCode : ""} fullWidth type='text' label='IFSCE Code'
              inputProps={{
                maxLength: 15,
              }} />
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

              handleUpdateApi()
              setFormUpdateButton(false)
              setSubmitted(true)
            }} disabled={!formUpdateButton}>
              Update
            </Button>
          </DialogActions>


        </Grid>
      </Dialog>
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
    </>
  )
}

export default EmployeeBankDetailsListTable


