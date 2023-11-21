// ** MUI Imports
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import { Button, InputAdornment } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

//Api imports
import { getEmployeeDetails, updateEmployee } from 'src/store/APIs/Api'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'


const spanStyles = {
  fontWeight: 'bolder',

};

const EmployeeEducationView = () => {

  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [employeeData, setEmployeeData] = useState<any>([])
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [highSchoolData, setHighSchoolData] = useState<any>({
    employeeHighSchoolName: "",
    employeeHighSchoolAddress: "",
    employeeHighSchoolPercentage: "",
    employeeHighSchoolBoard: ""

  })
  const router: any = useRouter()
  const { employeeId } = router.query
  const [submitted, setSubmitted] = useState<boolean>(false)

  // const handleSnackbarClose = () => {

  //   if (openSnackBar.open == true) {
  //     setOpenSnackBar({ open: false, mssg: "" })

  //     // console.log(open, "open")
  //   }

  // }


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

  const handleClose = () => setOpen(false)

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

  const handleChange = (e: any) => {
    setHighSchoolData({
      ...highSchoolData,
      [e.target.name]: e.target.value
    })

  }
  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""


    if (customerId && employeeId && organizationId) {

      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
        console.log(res.data, "onedit")
        setHighSchoolData(res.data)

      })
    }

  }

  const handleUpdateApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    const updateEmployeeData = {
      customerId: customerId,
      employeeId: employeeId,
      organizationId: organizationId,
      employeeHighSchoolName: highSchoolData.employeeHighSchoolName,
      employeeHighSchoolAddress: highSchoolData.employeeHighSchoolAddress,
      employeeHighSchoolPercentage: highSchoolData.employeeHighSchoolPercentage,
      employeeHighSchoolBoard: highSchoolData.employeeHighSchoolBoard,

    }
    if (updateEmployeeData.employeeHighSchoolName && updateEmployeeData.employeeHighSchoolAddress && updateEmployeeData.employeeHighSchoolPercentage && updateEmployeeData.employeeHighSchoolBoard) {
      updateEmployee(updateEmployeeData).then((res: any) => {
        if (res.statuscode == 200 && (updateEmployeeData.employeeHighSchoolPercentage) < 100 && (updateEmployeeData.employeeHighSchoolPercentage) > 0) {
          setEmployeeData([res.data])
          setSnackbarColor(true)
          setSnackbaropen(true)
          handleClose()
          setResponseMessage("Education details are successfully updated")
          setSubmitted(false)
        }
        else {
          setSnackbarColor(false)
          setSnackbaropen(true)
          setResponseMessage('Percentage must be between 0-99')
        }
      })
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage('Fill all the required information')
    }

  }

  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 779 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>High School Name</TableCell>
                  <TableCell align='center'>High School Address</TableCell>
                  <TableCell align='center'>High School Percentage</TableCell>
                  <TableCell align='center'>High School Board</TableCell>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                    <TableCell align='center'>Edit</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>

                {isLoading ? (
                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
                        {e.employeeHighSchoolName}
                      </TableCell>
                      <TableCell align='center'>{e.employeeHighSchoolAddress}</TableCell>
                      <TableCell align='center'>{e.employeeHighSchoolPercentage}</TableCell>
                      <TableCell align='center'>{e.employeeHighSchoolBoard}</TableCell>
                      {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                        <TableCell align='center'><Button onClick={() => { setOpen(true), handleApi() }}> <Icon style={{ cursor: "pointer" }} icon='bx:pencil' ></Icon></Button></TableCell>}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>

          <EmployeeHigherSecondary />
        </Grid>

        <Grid item xs={12}>

          <EmployeeUnderGraduation />
        </Grid>

        <Grid item xs={12}>

          <EmployeePostGraduation />
        </Grid>
      </Grid>


      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px" }} >Edit high school details</DialogTitle>
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
            <TextField id='name' name='employeeHighSchoolName' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? highSchoolData.employeeHighSchoolName ? false : true : false}
              helperText={submitted && !highSchoolData.employeeHighSchoolName ? 'High school name is required' : ''}
              value={highSchoolData ? highSchoolData.employeeHighSchoolName : ""} fullWidth type='text' label='High school name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHighSchoolAddress' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? highSchoolData.employeeHighSchoolAddress ? false : true : false}
              helperText={submitted && !highSchoolData.employeeHighSchoolAddress ? 'High school address is required' : ''}
              value={highSchoolData ? highSchoolData.employeeHighSchoolAddress : ""} fullWidth type='text' label='High school address'
              inputProps={{
                maxLength: 100,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHighSchoolPercentage' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? highSchoolData.employeeHighSchoolPercentage ? false : true : false}
              helperText={submitted && !highSchoolData.employeeHighSchoolPercentage ? 'Required,value must be between 0-99' : ''}
              value={highSchoolData ? highSchoolData.employeeHighSchoolPercentage : ""} fullWidth type='number' label='High school percentage'
              aria-describedby='validation-basic-first-name'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 99,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>%</InputAdornment>
                )
              }}
              style={{
                width: '100%'
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none'
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHighSchoolBoard' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? highSchoolData.employeeHighSchoolBoard ? false : true : false}
              helperText={submitted && !highSchoolData.employeeHighSchoolBoard ? 'High school board is required' : ''}
              value={highSchoolData ? highSchoolData.employeeHighSchoolBoard : ""} fullWidth type='text' label='High school board'
              inputProps={{
                maxLength: 50,
              }} />

          </Grid>



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
            }}
              disabled={!formUpdateButton}>
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
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>

    </>
  )
}


const EmployeeHigherSecondary = () => {

  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [employeeData, setEmployeeData] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })
  const router: any = useRouter()
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const { employeeId } = router.query
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [higherSecondarySchoolData, setHigherSecondarySchoolData] = useState<any>({
    employeeHigherSecondarySchoolName: "",
    employeeHigherSecondarySchoolAddress: "",
    employeeHigherSecondarySchoolPercentage: "",
    employeeHigherSecondarySchoolBoard: ""

  })


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])
  const handleSnackbarClose = () => {

    if (openSnackBar.open == true) {
      setOpenSnackBar({ open: false, mssg: "" })

      // console.log(open, "open")
    }

  }
  const handleClose = () => setOpen(false)
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

  const handleChange = (e: any) => {
    setHigherSecondarySchoolData({
      ...higherSecondarySchoolData,
      [e.target.name]: e.target.value
    })

  }
  const handleUpdateApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    const updateEmployeeData = {
      customerId: customerId,
      employeeId: employeeId,
      organizationId: organizationId,
      employeeHigherSecondarySchoolName: higherSecondarySchoolData.employeeHigherSecondarySchoolName,
      employeeHigherSecondarySchoolAddress: higherSecondarySchoolData.employeeHigherSecondarySchoolAddress,
      employeeHigherSecondarySchoolPercentage: higherSecondarySchoolData.employeeHigherSecondarySchoolPercentage,
      employeeHigherSecondarySchoolBoard: higherSecondarySchoolData.employeeHigherSecondarySchoolBoard,

    }
    if (updateEmployeeData.employeeHigherSecondarySchoolName && updateEmployeeData.employeeHigherSecondarySchoolAddress && updateEmployeeData.employeeHigherSecondarySchoolPercentage && updateEmployeeData.employeeHigherSecondarySchoolBoard) {
      updateEmployee(updateEmployeeData).then((res: any) => {
        if (res.statuscode == 200 && (updateEmployeeData.employeeHigherSecondarySchoolPercentage) < 100 && (updateEmployeeData.employeeHigherSecondarySchoolPercentage) > 0) {
          setEmployeeData([res.data])
          setSnackbarColor(true)
          setSnackbaropen(true)
          handleClose()
          setResponseMessage("Education details are successfully updated")
          setSubmitted(false)
        }
        else {
          setSnackbarColor(false)
          setSnackbaropen(true)
          setResponseMessage('Percentage value must be between 0-99')
        }
      })
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage('Fill all the required information')
    }

  }
  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""


    if (customerId && employeeId && organizationId) {

      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
        console.log(res.data, "onedit")
        setHigherSecondarySchoolData(res.data)

      })
    }

  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Higher Secondary School Name</TableCell>
              <TableCell align='center'>Higher Secondary School Address</TableCell>
              <TableCell align='center'>Higher Secondary School Percentage</TableCell>
              <TableCell align='center'>Higher Secondary School Board</TableCell>
              {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&

                <TableCell align='center'>Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>

            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
                  <TableCell align='center' component='th' scope='row'>
                    {e.employeeHigherSecondarySchoolName ? e.employeeHigherSecondarySchoolName : <Typography>--</Typography>}
                  </TableCell>
                  <TableCell align='center'>{e.employeeHigherSecondarySchoolAddress ? e.employeeHigherSecondarySchoolAddress : <Typography>--</Typography>}</TableCell>
                  <TableCell align='center'>{e.employeeHigherSecondarySchoolPercentage ? e.employeeHigherSecondarySchoolPercentage : <Typography>--</Typography>}</TableCell>
                  <TableCell align='center'>{e.employeeHigherSecondarySchoolBoard ? e.employeeHigherSecondarySchoolBoard : <Typography>--</Typography>}</TableCell>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                    <TableCell align='center'><Button onClick={() => { setOpen(true), handleApi() }}> <Icon style={{ cursor: "pointer" }} icon='bx:pencil' ></Icon></Button></TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px" }} >Edit higher secondary school details</DialogTitle>
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
            <TextField id='name' name='employeeHigherSecondarySchoolName' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? higherSecondarySchoolData.employeeHigherSecondarySchoolName ? false : true : false}
              helperText={submitted && !higherSecondarySchoolData.employeeHigherSecondarySchoolName ? 'High secondary school name is required' : ''}
              value={higherSecondarySchoolData ? higherSecondarySchoolData.employeeHigherSecondarySchoolName : ""} fullWidth type='text' label='Higher secondary school name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHigherSecondarySchoolAddress' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? higherSecondarySchoolData.employeeHigherSecondarySchoolAddress ? false : true : false}
              helperText={submitted && !higherSecondarySchoolData.employeeHigherSecondarySchoolAddress ? 'High secondary school address is required' : ''}
              value={higherSecondarySchoolData ? higherSecondarySchoolData.employeeHigherSecondarySchoolAddress : ""} fullWidth type='text' label='Higher secondary school address'
              inputProps={{
                maxLength: 100,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHigherSecondarySchoolPercentage' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? higherSecondarySchoolData.employeeHigherSecondarySchoolPercentage ? false : true : false}
              helperText={submitted && !higherSecondarySchoolData.employeeHigherSecondarySchoolPercentage ? 'Required,value must be a positive number' : ''}
              value={higherSecondarySchoolData ? higherSecondarySchoolData.employeeHigherSecondarySchoolPercentage : ""} fullWidth type='number' label='Higher secondary school percentage'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 99,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    %
                  </InputAdornment>
                )
              }}
              style={{
                width: '100%'
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none'
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeHigherSecondarySchoolBoard' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? higherSecondarySchoolData.employeeHigherSecondarySchoolBoard ? false : true : false}
              helperText={submitted && !higherSecondarySchoolData.employeeHigherSecondarySchoolBoard ? 'High secondary school board is required' : ''}
              value={higherSecondarySchoolData ? higherSecondarySchoolData.employeeHigherSecondarySchoolBoard : ""} fullWidth type='text' label='Higher secondary school board'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>



          <DialogActions sx={{ marginTop: "20px", width: "100%", display: 'flex', justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => {
              handleClose()
              setFormUpdateButton(false)
              setSubmitted(false)
            }}>
              Cancel
            </Button>
            <Button variant='contained' onClick={() => {

              handleUpdateApi()
              setSubmitted(true)
              setFormUpdateButton(false)
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
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </>
  )
}


const EmployeeUnderGraduation = () => {

  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [employeeData, setEmployeeData] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [underGraduationCollegeData, setUnderGraduationCollegeData] = useState<any>({
    employeeUnderGraduationCollegeName: "",
    employeeUnderGraduationCollegeAddress: "",
    employeeUnderGraduationCollegePercentage: "",
    employeeUnderGraduationCollegeCourseName: ""

  })
  const router: any = useRouter()
  const { employeeId } = router.query

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

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
  const handleSnackbarClose = () => {

    if (openSnackBar.open == true) {
      setOpenSnackBar({ open: false, mssg: "" })

      // console.log(open, "open")
    }

  }
  const handleClose = () => setOpen(false)

  const handleChange = (e: any) => {
    setUnderGraduationCollegeData({
      ...underGraduationCollegeData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    const updateEmployeeData = {
      customerId: customerId,
      employeeId: employeeId,
      organizationId: organizationId,
      employeeUnderGraduationCollegeName: underGraduationCollegeData.employeeUnderGraduationCollegeName,
      employeeUnderGraduationCollegeAddress: underGraduationCollegeData.employeeUnderGraduationCollegeAddress,
      employeeUnderGraduationCollegePercentage: underGraduationCollegeData.employeeUnderGraduationCollegePercentage,
      employeeUnderGraduationCollegeCourseName: underGraduationCollegeData.employeeUnderGraduationCollegeCourseName,

    }
    if (updateEmployeeData.employeeUnderGraduationCollegeName && updateEmployeeData.employeeUnderGraduationCollegeAddress && updateEmployeeData.employeeUnderGraduationCollegePercentage && updateEmployeeData.employeeUnderGraduationCollegeCourseName) {
      updateEmployee(updateEmployeeData).then((res: any) => {
        if (res.statuscode == 200 && (updateEmployeeData.employeeUnderGraduationCollegePercentage) < 100 && (updateEmployeeData.employeeUnderGraduationCollegePercentage) > 0) {
          setEmployeeData([res.data])
          setSnackbarColor(true)
          setSnackbaropen(true)
          handleClose()
          setResponseMessage("Education details are successfully updated")
          setSubmitted(false)
        }
        else {
          setSnackbarColor(false)
          setSnackbaropen(true)
          setResponseMessage('Percentage value must be between 0-99')
        }
      })
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage('Fill all the required information')
    }
  }
  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""


    if (customerId && employeeId && organizationId) {

      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
        console.log(res.data, "onedit")
        setUnderGraduationCollegeData(res.data)

      })
    }

  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Under Graduation College Name</TableCell>
              <TableCell align='center'>Under Graduation College Address</TableCell>
              <TableCell align='center'>Under Graduation College Percentage</TableCell>
              <TableCell align='center'>Under Graduation College Course</TableCell>
              {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&

                <TableCell align='center'>Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>

            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
                  <TableCell align='center' component='th' scope='row'>
                    {e.employeeUnderGraduationCollegeName ? e.employeeUnderGraduationCollegeName : <Typography>--</Typography>}
                  </TableCell>
                  <TableCell align='center'>{e.employeeUnderGraduationCollegeAddress ? e.employeeUnderGraduationCollegeAddress : <Typography>--</Typography>}</TableCell>
                  <TableCell align='center'>{e.employeeUnderGraduationCollegePercentage ? e.employeeUnderGraduationCollegePercentage : <Typography>--</Typography>}</TableCell>
                  <TableCell align='center'>{e.employeeUnderGraduationCollegeCourseName ? e.employeeUnderGraduationCollegeCourseName : <Typography>--</Typography>}</TableCell>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                    <TableCell align='center'><Button onClick={() => { setOpen(true), handleApi() }}> <Icon style={{ cursor: "pointer" }} icon='bx:pencil' ></Icon></Button></TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px" }} >Edit under graduation details</DialogTitle>
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
            <TextField id='name' name='employeeUnderGraduationCollegeName' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? underGraduationCollegeData.employeeUnderGraduationCollegeName ? false : true : false}
              helperText={submitted && !underGraduationCollegeData.employeeUnderGraduationCollegeName ? 'Under graduation college name is required' : ''}
              value={underGraduationCollegeData ? underGraduationCollegeData.employeeUnderGraduationCollegeName : ""} fullWidth type='text' label='Under graduation college name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeUnderGraduationCollegeAddress' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? underGraduationCollegeData.employeeUnderGraduationCollegeAddress ? false : true : false}
              helperText={submitted && !underGraduationCollegeData.employeeUnderGraduationCollegeAddress ? 'Under graduation college address is required' : ''}
              value={underGraduationCollegeData ? underGraduationCollegeData.employeeUnderGraduationCollegeAddress : ""} fullWidth type='text' label='Under graduation college address'
              inputProps={{
                maxLength: 100,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeUnderGraduationCollegePercentage' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? underGraduationCollegeData.employeeUnderGraduationCollegePercentage ? false : true : false}
              helperText={submitted && !underGraduationCollegeData.employeeUnderGraduationCollegePercentage ? 'Percentage value must be between 0-99' : ''}
              value={underGraduationCollegeData ? underGraduationCollegeData.employeeUnderGraduationCollegePercentage : ""} fullWidth type='number' label='Under graduation college percentage'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 99,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>%</InputAdornment>
                )
              }}
              style={{
                width: '100%'
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none'
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeeUnderGraduationCollegeCourseName' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? underGraduationCollegeData.employeeUnderGraduationCollegeCourseName ? false : true : false}
              helperText={submitted && !underGraduationCollegeData.employeeUnderGraduationCollegeCourseName ? 'Under graduation college course name is required' : ''}
              value={underGraduationCollegeData ? underGraduationCollegeData.employeeUnderGraduationCollegeCourseName : ""} fullWidth type='text' label='Under graduation college course name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>



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
      </Dialog >
      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
const EmployeePostGraduation = () => {

  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [employeeData, setEmployeeData] = useState<any>([])
  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })
  const [open, setOpen] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [postGraduationCollegeData, setPostGraduationCollegeData] = useState<any>({
    employeePostGraduationCollegeName: "",
    employeePostGraduationCollegeAddress: "",
    employeePostGraduationCollegePercentage: "",
    employeePostGraduationCollegeCourseName: ""

  })
  const router: any = useRouter()
  const { employeeId } = router.query

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

  const handleSnackbarClose = () => {

    if (openSnackBar.open == true) {
      setOpenSnackBar({ open: false, mssg: "" })

      // console.log(open, "open")
    }

  }

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
  const handleClose = () => setOpen(false)

  const handleChange = (e: any) => {
    setPostGraduationCollegeData({
      ...postGraduationCollegeData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    const updateEmployeeData = {
      customerId: customerId,
      employeeId: employeeId,
      organizationId: organizationId,
      updateEmployeeData: postGraduationCollegeData.employeePostGraduationCollegeName,
      employeePostGraduationCollegeAddress: postGraduationCollegeData.employeePostGraduationCollegeAddress,
      employeePostGraduationCollegePercentage: postGraduationCollegeData.employeePostGraduationCollegePercentage,
      employeePostGraduationCollegeCourseName: postGraduationCollegeData.employeePostGraduationCollegeCourseName,

    }
    if (updateEmployeeData.updateEmployeeData && updateEmployeeData.employeePostGraduationCollegeAddress && updateEmployeeData.employeePostGraduationCollegePercentage && updateEmployeeData.employeePostGraduationCollegeCourseName) {
      updateEmployee(updateEmployeeData).then((res: any) => {
        if (res.statuscode == 200 && (updateEmployeeData.employeePostGraduationCollegePercentage) < 100 && (updateEmployeeData.employeePostGraduationCollegePercentage) > 0) {
          setEmployeeData([res.data])
          setSnackbarColor(true)
          setSnackbaropen(true)
          handleClose()
          setResponseMessage("Education details are successfully updated")
          setSubmitted(false)
        }
        else {
          setSnackbarColor(false)
          setSnackbaropen(true)
          setResponseMessage('Percentage value must be between 0-99')
        }
      })
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage('Fill all the required information')
    }
  }
  const handleApi = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""


    if (customerId && employeeId && organizationId) {

      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
        console.log(res.data, "onedit")
        setPostGraduationCollegeData(res.data)

      })
    }

  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Post Graduation College Name</TableCell>
              <TableCell align='center'>Post Graduation College Address</TableCell>
              <TableCell align='center'>Post Graduation College Percentage</TableCell>
              <TableCell align='center'>Post Graduation College Course</TableCell>
              {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&

                <TableCell align='center'>Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>

            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
                  <TableCell align='center' component='th' scope='row'>{e.employeePostGraduationCollegeName == "" ? <Typography style={spanStyles}> -- </Typography> : e.employeePostGraduationCollegeName}</TableCell>
                  <TableCell align='center'>{e.employeePostGraduationCollegeAddress == "" ? <Typography style={spanStyles}> -- </Typography> : e.employeePostGraduationCollegeAddress}</TableCell>
                  <TableCell align='center'>{e.employeePostGraduationCollegePercentage == "" ? <Typography style={spanStyles}> -- </Typography> : e.employeePostGraduationCollegePercentage}</TableCell>
                  <TableCell align='center'>{e.employeePostGraduationCollegeCourseName == "" ? <Typography style={spanStyles}> -- </Typography> : e.employeePostGraduationCollegeCourseName}</TableCell>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                    <TableCell align='center'><Button onClick={() => { setOpen(true), handleApi() }} > <Icon style={{ cursor: "pointer" }} icon='bx:pencil' ></Icon></Button></TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' sx={{
        '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
        '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
      }} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important', marginBottom: "20px" }} >Edit post graduation details</DialogTitle>
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

          <Grid item xs={12} sm={6} >
            <TextField id='name' name='employeePostGraduationCollegeName' autoFocus
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? postGraduationCollegeData.employeePostGraduationCollegeName ? false : true : false}
              helperText={submitted && !postGraduationCollegeData.employeePostGraduationCollegeName ? 'Post graduation college name is required' : ''}
              value={postGraduationCollegeData ? postGraduationCollegeData.employeePostGraduationCollegeName : ""} fullWidth type='text' label='Employee post graduation college name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeePostGraduationCollegeAddress' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? postGraduationCollegeData.employeePostGraduationCollegeAddress ? false : true : false}
              helperText={submitted && !postGraduationCollegeData.employeePostGraduationCollegeAddress ? 'Post graduation college address is required' : ''}
              value={postGraduationCollegeData ? postGraduationCollegeData.employeePostGraduationCollegeAddress : ""} autoFocus fullWidth type='text' label='Employee post graduation college address'
              inputProps={{
                maxLength: 100,
              }} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeePostGraduationCollegePercentage' onChange={(event) => {
              handleChange(event);
              setFormUpdateButton(true);
            }}
              error={submitted ? postGraduationCollegeData.employeePostGraduationCollegePercentage ? false : true : false}
              helperText={submitted && !postGraduationCollegeData.employeePostGraduationCollegePercentage ? 'Required,percentage must be between 0-99' : ''}
              value={postGraduationCollegeData ? postGraduationCollegeData.employeePostGraduationCollegePercentage : ""} autoFocus fullWidth type='number' label='Employee post graduation college percentage'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 99,

              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>%</InputAdornment>
                )
              }}
              style={{
                width: '100%'
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none'
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField id='name' name='employeePostGraduationCollegeCourseName'
              onChange={(event) => {
                handleChange(event);
                setFormUpdateButton(true);
              }}
              error={submitted ? postGraduationCollegeData.employeePostGraduationCollegeCourseName ? false : true : false}
              helperText={submitted && !postGraduationCollegeData.employeePostGraduationCollegeCourseName ? 'Post graduation college course name is required' : ''}
              value={postGraduationCollegeData ? postGraduationCollegeData.employeePostGraduationCollegeCourseName : ""} autoFocus fullWidth type='text' label='Employee post graduation college course name'
              inputProps={{
                maxLength: 50,
              }} />
          </Grid>



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
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
export default EmployeeEducationView

