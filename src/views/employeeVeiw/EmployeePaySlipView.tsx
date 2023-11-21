import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { genrateEmployeeSalaryPdf, getEmployeeDetails, getEmployeeSalaryPdf } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { ReactDatePickerProps } from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CustomInput from './PickersCustomInput/PickersCustomInput'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import { styled, useTheme } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { setDate } from 'date-fns'
import Grid, { GridProps } from '@mui/material/Grid'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { customDateFormatDash } from 'src/@core/utils/format'
import InputAdornment from '@mui/material/InputAdornment'

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: 1,
    display: 'flex',
    justifyContent: 'centre'
  }
}))
const Img = styled('img')(({ theme }) => ({
  left: 10,
  bottom: 0,
  height: 173,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    position: 'static'
  }
}))

const EmployeePaySlipView = () => {
  const theme = useTheme()
  const { direction } = theme
  const router = useRouter()
  const { employeeId } = router.query
  const [user, setUser] = useState<any>()
  const [salaryData, setSalaryData] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [downloadButton, setDownloadButton] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<any>({ open: false, mssg: '' })
  const [singleEmployeeData, setSingleEmployeeData] = useState<any>()
  const [base64String, setBase64String] = useState<any>()
  const [salaryDate, setSalaryDate] = useState<any>(new Date())
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [permission, setPermission] = useState<any>()
  const [currency, setCurrency] = useState<any>('')
  const [salaryAmount, setSalaryAmount] = useState<any>('')
  const [allowance, setAllowance] = useState<any>('')
  const [totalDeduction, setTotalDeduction] = useState<any>('')
  const [netPayableAmount, setNetPayableAmount] = useState<any>('')
  const [generated, setGenerated] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSnackbarClose = () => {
    setSnackbarOpen({ open: false, mssg: '' })
  }

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

  useEffect(() => {
    const customerId = user ? user.customerId : ''
    const organizationId = user ? user.organizationId : ''
    if (customerId && organizationId && employeeId) {
      getEmployeeDetails(customerId, employeeId, organizationId).then(res => {
        setSingleEmployeeData(res.data)
        setSalaryData(res.data.salaryRecord[0])
      })
    }
  }, [employeeId, user])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
    setSalaryDate(null)
  }, [])

  const handleSalaryApi = () => {
    const customerId = user ? user.customerId : ''
    const organizationId = user ? user.organizationId : ''
    const data = {
      customerId: user.customerId,
      employeeId: singleEmployeeData.employeeId,
      organizationId: user.organizationId,
      employeeMail: singleEmployeeData.employeeEmail,
      organizationName: user.organizationName,
      currency: currency,
      employeeDesignation: singleEmployeeData.employeeEmail,
      paymentDate: `${salaryDate?.split("-")[2]}-${salaryDate?.split("-")[1]}-${salaryDate?.split("-")[0]}`,
      employeeName: `${singleEmployeeData.employeeFirstname} ${singleEmployeeData.employeeLastname}`,
      templateIndex: '1',
      supportEmail: user.organizationEmail,
      purpose: "mail"
    }

    if (salaryDate && currency) {
      genrateEmployeeSalaryPdf(data).then(res => {
        if (res.statusCode == 200) {
          setSnackbarOpen({ open: true, mssg: res.message })
          setSubmitted(false)
          setOpen(false)
        } else {
          setSnackbarOpen({ open: true, mssg: res.message })
        }
      })
      setCurrency('')
      setNetPayableAmount('')
      setSalaryAmount('')
      setAllowance('')
      setTotalDeduction('')
      setSubmitted(false)
      setSalaryDate(null)
    }
  }

  useEffect(() => {
    const customerId = user ? user.customerId : ''
    const organizationId = user ? user.organizationId : ''
    if (salaryDate && singleEmployeeData) {
      const data = {
        customerId: customerId,
        employeeId: employeeId,
        organizationId: organizationId,
        salaryDate: `${salaryDate?.split('-')[2]}-${salaryDate?.split('-')[1]}-${salaryDate?.split('-')[0]}`,
        employeeName: singleEmployeeData.employeeFirstname
      }
      getEmployeeSalaryPdf(data).then((res: any) => {
        setBase64String(res.data.pdfData)
      })
    }
  }, [salaryDate])

  const handleClose = () => {
    setDownloadButton(false)
    setSalaryDate(null)
    setOpen(false)
  }
  const handlePdf = () => {
    if (base64String != null) {
      const buffer = Buffer.from(base64String, 'base64')

      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a');
      link.href = url;
      link.download = "SalarySlip.pdf";
      link.click();
      URL.revokeObjectURL(url);
      setSnackbarOpen({ open: true, mssg: "success" })

    }
    else {

      setSnackbarOpen({ open: true, mssg: "No data found" })
    }
    setBase64String(null)
    setDownloadButton(false)
    setOpen(false)
    setSalaryDate(null)
  }

  useEffect(() => {
    setNetPayableAmount(Number(salaryAmount) + Number(allowance) - Number(totalDeduction))
  }, [salaryAmount, totalDeduction, allowance])

  return (
    <>
      {permission?.some((obj: any) => obj?.title === 'Employee' && obj?.action?.includes('update')) && (
        <Button
          onClick={() => {
            setOpen(true)
          }}
          variant='contained'
        >
          Generate receipt
        </Button>
      )}
      {permission?.some((obj: any) => obj?.title === 'Employee' && obj?.action?.includes('update')) && (
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            // setOpen(true)
            setDownloadButton(true)
          }}
          variant='contained'
        >
          download receipt
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'  >
        <Grid sx={{ height: '500px' }}>
          <Grid container justifyContent='space-between' alignItems='center' sx={{ mt: '-15px' }}>
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Please fill the required data !
            </DialogTitle>
            <Icon
              className='iconContainer'
              onClick={() => { handleClose(); setSubmitted(false) }}
              style={{
                cursor: 'pointer',
                fontSize: '30px',
                margin: '8px',
                transition: 'background-color 0.3s'
              }}
              icon='bx:x'
            />
          </Grid>
          <Grid sx={{ pt: 15 }}>
            <DialogContent>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    label='Employee name'
                    disabled
                    fullWidth
                    value={singleEmployeeData?.employeeFirstname ? singleEmployeeData?.employeeFirstname : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Employee surname'
                    disabled
                    fullWidth
                    value={singleEmployeeData?.employeeLastname ? singleEmployeeData?.employeeLastname : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    fullWidth
                    label='Employee email'
                    value={singleEmployeeData?.employeeEmail ? singleEmployeeData?.employeeEmail : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>To be filled</Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={submitted ? (currency ? false : true) : false}>
                    <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={currency}
                      label='Currency'
                      onChange={e => setCurrency(e.target.value)}
                    >
                      <MenuItem value={'INR'}>INR</MenuItem>
                      <MenuItem value={'USD'}>USD</MenuItem>
                      <MenuItem value={'YEN'}>YEN</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={6}>
            <TextField
              label='Course Name'
              fullWidth
              error={submitted ? courseName.length > 0 ? false : true : false}
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={paymentAmount}
              type='number'
              fullWidth
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none'
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }}
              label='Paid Amount'
              error={paymentAmount > studentData?.paymentDetails?.totalPayment || submitted ? paymentAmount > 0 ? false : true : false}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </Grid> */}
                <Grid item xs={6}>
                  <DatePickerWrapper>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      popperPlacement="top"
                      id='basic-input'
                      name='paymentDate'
                      value={salaryDate}
                      onChange={(date: Date) => setSalaryDate(customDateFormatDash(date))}
                      placeholderText='Select a date'
                      customInput={
                        <CustomInput
                          error={submitted ? (salaryDate ? false : true) : false}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                <Icon icon='bx:calendar-alt' />
                              </InputAdornment>
                            )
                          }}
                          label='Payment date'
                        />
                      }
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
              {/* <StyledGrid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
            <Img alt='Welcome back John' src={`/images/pages/illustration-john-${theme.palette.mode}.png`} />
          </StyledGrid> */}
              <Button variant='outlined' color='secondary' onClick={() => { handleClose(); setSubmitted(false) }}>
                Cancel
              </Button>
              <Button
                disabled={generated ? true : false}
                onClick={() => {
                  handleSalaryApi()
                  setSubmitted(true)
                }}
                variant='contained'
              >
                {generated ? 'Sent' : ' Generate'}
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
      {downloadButton ? <Button sx={{ ml: 5 }} variant='contained' onClick={handlePdf}  >
        download
      </Button> : ''}

      {snackbarOpen.open == true ? (
        <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={3000}>
          <Alert variant='filled' elevation={3} onClose={handleSnackbarClose} severity='success'>
            {snackbarOpen.mssg}
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
    </>
  )
}

export default EmployeePaySlipView
