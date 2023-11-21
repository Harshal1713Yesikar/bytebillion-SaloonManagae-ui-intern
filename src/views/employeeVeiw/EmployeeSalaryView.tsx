// ** React Imports
import { ChangeEvent, useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { ReactDatePickerProps } from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CustomInput from './PickersCustomInput/PickersCustomInput'

//Api Imports
import { createSalary, genrateEmployeeSalaryPdf, getEmployeeDetails, listEmployeeSalary } from 'src/store/APIs/Api'

// ** Custom Imports
import EmployeeSalaryListTable from './EmployeeSalaryListTable'




const EmployeeSalaryView = () => {
  // ** States
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [oneDaySalary, setOneDaySalary] = useState<any>()
  const [user, setUser] = useState<any>()
  const [payAbleDays, setPayAbleDays] = useState<any>()
  const [employeeInHandSalary, setEmployeeInHandSalary] = useState<any>()
  const [date, setDate] = useState<DateType>(new Date())
  const router = useRouter()
  const [apiCall, setApiCall] = useState<any>()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [permission, setPermission] = useState<any>()
  const [employeeDetails, setEmployeeDetails] = useState<any>("")

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
    }
  }, [user])

  const [open, setOpen] = useState<any>({ open: false, mssg: "" })

  const handleClose = () => {
    if (open.open == true) {
      setOpen({ open: false, mssg: "" })
    }
  }

  const { employeeId } = router.query
  const [salaryDetails, setSalaryDetails] = useState<any>({
    totalSalary: "",
    totalWorkingDays: "",
    payableDays: "",
    lossOfDays: "",
    inHandSalary: "",
    date: ""
  })

  useEffect(() => {
    if (user && employeeId)
      getEmployeeDetails(user.customerId, employeeId, user.organizationId).then((res: any) => {
        setEmployeeDetails(res.data)
      })
  }, [user, employeeId])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
      setDate(null)
    }
  }, [])
  useEffect(() => {
    if (date) {
      salaryDetails.date = `${date.getFullYear()}-${((date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))}-${("0" + date.getDate()).slice(-2)}`
      setSalaryDetails(salaryDetails)
    }
  }, [date])

  useEffect(() => {
    const employeeOneDaySalary: any = salaryDetails.totalSalary / salaryDetails.totalWorkingDays
    setOneDaySalary(employeeOneDaySalary)
  }, [salaryDetails.totalSalary, salaryDetails.totalWorkingDays, salaryDetails.lossOfDays, oneDaySalary, payAbleDays, employeeInHandSalary])

  useEffect(() => {
    setEmployeeInHandSalary(payAbleDays * oneDaySalary)
  }, [salaryDetails.totalSalary, salaryDetails.totalWorkingDays, salaryDetails.lossOfDays])

  useEffect(() => {
    if (payAbleDays) {
      salaryDetails.payableDays = payAbleDays
      setSalaryDetails(salaryDetails)
    }
  }, [payAbleDays])

  useEffect(() => {
    if (employeeInHandSalary) {
      salaryDetails.inHandSalary = parseInt(employeeInHandSalary)
      setSalaryDetails(salaryDetails)
    }
  }, [employeeInHandSalary])

  useEffect(() => {
    if (salaryDetails.totalWorkingDays && salaryDetails.lossOfDays) {
      setPayAbleDays(parseInt(salaryDetails.totalWorkingDays) - parseInt(salaryDetails.lossOfDays))
    }
  }, [salaryDetails.totalWorkingDays, salaryDetails.lossOfDays])

  useEffect(() => {
    setPayAbleDays(parseInt(salaryDetails.totalWorkingDays) - parseInt(salaryDetails.lossOfDays))
  }, [salaryDetails.totalWorkingDays])

  useEffect(() => {
    setEmployeeInHandSalary(payAbleDays * oneDaySalary)
  }, [salaryDetails.totalSalary, salaryDetails.totalWorkingDays, salaryDetails.lossOfDays, oneDaySalary, payAbleDays, employeeInHandSalary])

  const handleChange = (e: any) => {
    setSalaryDetails((prve: any) => ({
      ...prve,
      [e.target.name]: e.target.value
    })
    )



  }

  const handleSalaryApi: any = () => {
    const customerId: any = user ? user.customerId : ""
    const organizationId: any = user ? user.organizationId : ""
    if (salaryDetails.totalSalary !== "" && salaryDetails.totalWorkingDays !== "" && salaryDetails.lossOfDays !== "" && salaryDetails.inHandSalary !== "" && salaryDetails.date) {
      createSalary(customerId, organizationId, employeeId, salaryDetails).then((res: any) => {
        if (res.statusCode == 200) {
          const data = {
            customerId: user.customerId,
            employeeId: employeeDetails.employeeId,
            organizationId: user.organizationId,
            employeeMail: employeeDetails.employeeEmail,
            organizationName: user.organizationName,
            currency: "Rs",
            employeeDesignation: employeeDetails.employeeEmail,
            paymentDate: salaryDetails.date,
            employeeName: `${employeeDetails.employeeFirstname} ${employeeDetails.employeeLastname}`,
            templateIndex: '1',
            supportEmail: user.organizationEmail,
            organizationLogo: organizationLogo,
            purpose: "generate"
          }
          genrateEmployeeSalaryPdf(data).then((res: any) => {
            return res
          })

          setApiCall(true)
          setOpen({ open: true, mssg: "Salary record is successfully added" })
          setSubmitted(false)
          setSalaryDetails({
            totalSalary: "",
            totalWorkingDays: "",
            payableDays: "",
            lossOfDays: "",
            inHandSalary: "",
            date: ""
          });
        }
        else {
          setOpen({ open: true, mssg: res.message })
        }
      })
    }
    else {
      setOpen({ open: true, mssg: "Fill all the required information" })
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Add Salary Record' />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={submitted ? salaryDetails.totalSalary ? false : true : false}
                      helperText={submitted && !salaryDetails.totalSalary ? 'Required,value must be a positive number' : ''}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,
                      }}
                      style={{
                        width: "100%"
                      }}
                      fullWidth onChange={handleChange} autoComplete='OFF' value={salaryDetails.totalSalary} name="totalSalary" label='Total salary' placeholder='Total salary' type='number' sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          display: 'none'
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield'
                        }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,
                      }}
                      style={{
                        width: "100%"
                      }} fullWidth onChange={handleChange}
                      value={salaryDetails.totalWorkingDays}
                      error={submitted ? salaryDetails.totalWorkingDays ? false : true : false}
                      helperText={submitted && !salaryDetails.totalWorkingDays ? 'Required,value must be a positive number' : ''}
                      autoComplete='OFF' name="totalWorkingDays" label='Total working days' type='number' placeholder='Total working days' sx={{
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
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,

                      }}
                      style={{
                        width: "100%"

                      }} fullWidth value={salaryDetails.lossOfDays} onChange={handleChange} autoComplete='OFF' name="lossOfDays"
                      error={submitted ? salaryDetails.lossOfDays ? false : true : false}
                      helperText={submitted && !salaryDetails.lossOfDays ? 'Required,value must be a positive number' : ''}
                      label='Loss of days' type='number' placeholder='Loss of days' sx={{
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
                    <TextField fullWidth onChange={handleChange} autoComplete='OFF' value={payAbleDays ? payAbleDays : ""} name='payableDays' type='number' label='Payable days' placeholder='Payable days' sx={{
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
                    <TextField fullWidth onChange={handleChange} autoComplete='OFF' value={employeeInHandSalary ? parseInt(employeeInHandSalary) : ""} name='inHandSalary' label='Inhand salary' placeholder='Inhand salary' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={date}
                        id='basic-input'
                        autoComplete='OFF'
                        popperPlacement={popperPlacement}
                        placeholderText='DD/MM/YYYY'
                        onChange={
                          (date: Date,) => {
                            setDate(date)

                          }
                        }
                        customInput={<CustomInput
                          error={submitted ? date ? false : true : false}
                          helperText={submitted && !date ? 'Salary date is required' : ''}
                          label='Salary date' />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          gap: 5,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Button type='submit' variant='contained' size='large' onClick={() => { handleSalaryApi(); setSubmitted(true) }}>
                          CREATE
                        </Button>

                      </Box>
                    </Grid>}
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} >

          <EmployeeSalaryListTable apiCall={apiCall} setApiCall={setApiCall} />

        </Grid>
      </Grid>
      <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
        <Alert variant='filled' elevation={3} onClose={handleClose} severity={open.mssg.includes("successfully") ? 'success' : 'error'}>
          {open.mssg}
        </Alert>
      </Snackbar>
    </>

  )
}

export default EmployeeSalaryView
