// ** React Imports
import { forwardRef, ChangeEvent, Fragment, useState, useEffect } from 'react'
import CustomInput from '../../views/form-elements/picker/PickersCustomInput'

// ./../../../views/form-elements/picker/PickersCustomInput
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import MuiStep, { StepProps } from '@mui/material/Step'
import { DialogActions, DialogTitle, Skeleton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import {
  listOneStudentDetailApi,
  studentPaymentOverDueMail,
  studentFeeSlipMail,
  studentUpcomingFeeMail,
  getStudentFeeReceipt
} from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import Tooltip from '@mui/material/Tooltip'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardHeader from '@mui/material/CardHeader'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import EmailIcon from '@mui/icons-material/Email'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import VisibilityIcon from '@mui/icons-material/Visibility'
import * as yup from 'yup'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

import TableHead from '@mui/material/TableHead'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import {
  updateStudentPaymentStatus,
  updateExistingStudentInBatch,
  updateExistingStudentInCourse
} from 'src/store/APIs/Api'
import { useSelector } from 'react-redux'
import { customDateFormatDash } from 'src/@core/utils/format'
import RefreshIcon from '@mui/icons-material/Refresh'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Import
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomChip from 'src/@core/components/mui/chip'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import UpdateStudentPaymentDetails from './UpdateStudentPaymentDetails'
import InputAdornment from '@mui/material/InputAdornment'
import EventNoteIcon from '@mui/icons-material/EventNote'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const StepperCustomVertical = () => {
  const theme = useTheme()
  const templateIndex = useSelector((state: any) => state.feeReceiptDesignReducer.value)

  // ** States
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false)
  const { value } = useSelector((state: any) => state.feeReceiptDesignReducer)
  const [isPartPaymentState, setIsPartPaymentState] = useState<any>()
  const [studentData, setStudentData] = useState<any>()
  const [user, setUser] = useState<any>()
  const [installment, setInstallment] = useState<any>()
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [permission, setPermission] = useState<any>()
  const [resMessage, setResMessage] = useState<any>()
  const [studentEmail, setStudentEmail] = useState('')
  const [studentInfo, setStudentInfo] = useState<any>()
  const [refundIndex, setRefundIndex] = useState<any>()
  const [generated, setGenerated] = useState<any>(false)
  const [refundAmount, setRefundAmount] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [formattedDate, setFormattedDate] = useState<any>()
  const [clickedArray, setClickedArray] = useState<any>([])
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [refundDialog, setRefundDialog] = useState<any>(false)
  const [refundVisible, setRefundVisible] = useState<any>(false)
  const [newUpdatedStatus, setNewUpdatedStatus] = useState<any>()
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  const [responseMessage, setResponseMessage] = useState<string>('')
  const [finalPaymentStatus, setFinalPaymentStatus] = useState<any>()
  const [paymentStatusDetails, setPaymentStatusDetails] = useState<any>()
  const [reviewDialogBox, setReviewDialogBox] = useState<boolean>(false)
  const [restInstallmentStatus, setReinstallmentStatus] = useState<any>()
  const [updatePaymentDetails, setUpdatePaymentDetails] = useState<any>(false)
  const [courseName, setCourseName] = useState<any>('')
  const [slipNumber, setSlipNumber] = useState<any>('')
  const [organizationLogo, setOrganizationLogo] = useState<any>('')
  const [receivedBy, setReceivedBy] = useState<any>('')
  const [singleStudentData, setSingleStudentData] = useState<any>({})
  const [modeOfPayment, setModeOfPayment] = useState<any>('')
  const [purpose, setPurpose] = useState<any>('')
  const [base64String, setBase64String] = useState<any>('')
  const [view, setView] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isLoadingBase64, setIsLoadingBase64] = useState<boolean>(true)
  const date = new Date()

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    const logo = localStorage.getItem('organizationLogo')
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = localStorage.getItem('organization')
      if (userDetails) {
        try {
          await listOneStudentDetailApi(
            JSON.parse(userDetails).customerId,
            JSON.parse(userDetails).organizationId,
            router.query
          )
          setUser(JSON.parse(userDetails))
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()
  }, [])

  const router = useRouter()

  const { studentId } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    if (user) {
      setIsLoadingData(true)
      setPermission(user.role.permissions)
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then(res => {
        setSingleStudentData(res?.data)
        setStudentData(res?.data?.paymentDetails)
        setStudentName(`${res?.data?.studentFirstName} ${res?.data?.studentLastName}`)
        setStudentEmail(res?.data?.studentEmail)
        setStudentInfo(res?.data)
        getStudentFeeReceiptData(
          user.customerId,
          user.organizationId,
          res.data.rollNo,
          `${res.data.studentFirstName} ${res.data.studentLastName}`
        )
        setIsLoadingData(false)
        setIsLoading(false)
      })
    }
  }, [user, studentId])
  const refreshData = () => {

    setIsLoadingData(true)
    const timeoutId = setTimeout(async () => {
      if (user) {
        setIsLoadingData(true)
        setPermission(user.role.permissions)
        listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then(res => {
          setSingleStudentData(res?.data)
          setStudentData(res?.data?.paymentDetails)
          setStudentName(`${res?.data?.studentFirstName} ${res?.data?.studentLastName}`)
          setStudentEmail(res?.data?.studentEmail)
          setStudentInfo(res?.data)
          setIsLoadingData(false)
          setIsLoading(false)
        })
      }
    }, 2000)
  }
  const updateCall = (data: any) => {

    updateStudentPaymentStatus(data).then(res => {
      setResMessage(res.data.message)
      if (data.studentStatus == 'defaulter' || restInstallmentStatus == 'defaulter') {
        for (let singleObj of singleStudentData.batch) {
          let updatedStudent = {
            rollNo: studentId,
            studentStatus: 'defaulter'
          }
          updateExistingStudentInBatch(user.customerId, user.organizationId, singleObj.batchId, updatedStudent)
        }
        for (let singleObj of singleStudentData.courses) {
          let updatedStudent = {
            rollNo: studentId,
            studentStatus: 'defaulter'
          }
          updateExistingStudentInCourse(user.customerId, user.organizationId, singleObj.courseId, updatedStudent)
        }
      }
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then(res => {
        setStudentData(res.data.paymentDetails)
        setSingleStudentData(res?.data)
        setStudentInfo(res.data)
        setIsLoading(false)
        setShowDetailsPopup(false)
        setUpdatedDate(null)
        setNewUpdatedStatus(null)
      })
    })
  }

  useEffect(() => {
    if (user) {
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then(res => {
        setStudentData(res?.data?.paymentDetails)
        setSingleStudentData(res?.data)
        setStudentName(`${res?.data?.studentFirstName} ${res?.data?.studentLastName}`)
        setStudentEmail(res?.data?.studentEmail)
        setStudentInfo(res?.data)
        setIsLoading(false)
      })
    }
  }, [updatePaymentDetails, user])

  useEffect(() => {
    const date = new Date()
    setFormattedDate(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

  const handleFeeSlipMail = () => {
    let courses = studentInfo.courses.map((course: any) => {
      return `${course.courseName}`
    })
    let courseList = ``
    for (let i = 0; i < courses.length; i++) {
      courseList += courses[i]
    }

    if (!studentInfo.paymentDetails.isPartPayment) {
      const data = {
        purpose: purpose,
        courseName: courseList,
        receivedBy: receivedBy,
        serialNumber: slipNumber,
        studentName: studentName,
        studentMail: studentEmail,
        rollNo: studentInfo.rollNo,
        modeOfPayment: modeOfPayment,
        customerId: user.customerId,
        authority: user.organizationName,
        templateIndex: templateIndex - 1,
        organizationId: user.organizationId,
        organizationName: user.organizationName,
        organizationEmail: user.organizationEmail,
        organizationAddress: user.organizationAddress,
        totalFee: studentData?.grandTotalPaymentAmount,
        studentMobileNumber: studentInfo.studentContact,
        organizationPhoneNumber: user.organizationPhoneNumber,
        paymentAmount: studentInfo.paymentDetails.totalReceivedPayment,
        paymentDate: studentInfo.paymentDetails.formatedPaymetReceiveDate,
        organizationLogo: organizationLogo ? organizationLogo : '',
        dueAmount: studentData?.totalDuePayment ? studentData?.totalDuePayment : '0',
        discountedAmount: studentData.discountedPaymentAmount ? studentData.discountedPaymentAmount : '0',
        installmentsArray: [
          {
            paymetReceiveDate: studentInfo.paymentDetails.formatedPaymetReceiveDate,
            paymentNotes: studentInfo.paymentDetails.paymentNotes,
            receivedPayment: studentInfo.paymentDetails.totalReceivedPayment
          }
        ]
      }
      if (purpose == 'mail') {
        studentFeeSlipMail(data).then((res: any) => {
          setSubmitted(false)
          setPurpose('')
          setReviewDialogBox(false)
          return res
        })
      } else if (modeOfPayment && receivedBy && slipNumber) {
        studentFeeSlipMail(data).then((res: any) => {
          setReviewDialogBox(false)
          if (purpose == 'generate') {
            getStudentFeeReceiptData(
              user.customerId,
              user.organizationId,
              studentInfo.rollNo,
              `${studentInfo.studentFirstName} ${studentInfo.studentLastName}`
            )
          }
          setSubmitted(false)
          setReceivedBy('')
          setSlipNumber('')
          setModeOfPayment('')
          setCourseName('')
          setReviewDialogBox(false)
          setPurpose('')
          return res
        })
      }
    } else {
      const data = {
        purpose: purpose,
        templateIndex: 0,
        courseName: courseList,
        receivedBy: receivedBy,
        serialNumber: slipNumber,
        studentName: studentName,
        studentMail: studentEmail,
        rollNo: studentInfo.rollNo,
        customerId: user.customerId,
        modeOfPayment: modeOfPayment,
        authority: user.organizationName,
        organizationId: user.organizationId,
        organizationName: user.organizationName,
        organizationEmail: user.organizationEmail,
        organizationAddress: user.organizationAddress,
        totalFee: studentData?.grandTotalPaymentAmount,
        studentMobileNumber: studentInfo.studentContact,
        organizationPhoneNumber: user.organizationPhoneNumber,
        paymentAmount: studentInfo.paymentDetails.totalReceivedPayment,
        paymentDate: studentInfo.paymentDetails.formatedPaymetReceiveDate,
        organizationLogo: organizationLogo ? organizationLogo : '',
        dueAmount: studentData?.totalDuePayment ? studentData?.totalDuePayment : '0',
        discountedAmount: studentData.discountedPaymentAmount ? studentData.discountedPaymentAmount : '0',
        installmentsArray: studentData.installmentDetails.filter((data: any) => data.paymentStatus == 'payed')
      }

      if (purpose == 'generate') {
        if (modeOfPayment && receivedBy && slipNumber) {
          studentFeeSlipMail(data).then((res: any) => {
            if (purpose == 'generate') {
              getStudentFeeReceiptData(
                user.customerId,
                user.organizationId,
                studentInfo.rollNo,
                `${studentInfo.studentFirstName} ${studentInfo.studentLastName}`
              )
            }

            setSubmitted(false)
            setPurpose('')
            setReceivedBy('')
            setSlipNumber('')
            setCourseName('')
            setModeOfPayment('')
            setReviewDialogBox(false)
            return res
          })
        }
      } else {
        studentFeeSlipMail(data).then((res: any) => {
          setSubmitted(false)
          setPurpose('')
          setReviewDialogBox(false)
          return res
        })
      }
      setGenerated(true)
    }
  }

  const handleSendInvoice = (installment: any) => {
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      const presentDate = new Date()
      if (Number(installment.nextpaymetDate.split('-')[1]) < presentDate.getMonth()) {
        if (sent == false) {
          studentPaymentOverDueMail({
            courseName: '',
            studentName: studentName,
            studentEmail: studentEmail,
            installmentsArray: [
              {
                overDueDate: installment.nextpaymetDate,
                overDueAmount: installment.duePayment
              }
            ],
            organizationName: JSON.parse(orgData).organizationName,
            organizationEmail: JSON.parse(orgData).organizationEmail,
            organizationLogo: organizationLogo
          })
        }
      } else if (Number(installment.nextpaymetDate.split('-')[1]) + 1 >= presentDate.getMonth()) {
        if (sent == false) {
          if (Number(installment.nextpaymetDate.split('-')[0]) >= presentDate.getDate()) {
            studentUpcomingFeeMail({
              organizationName: user.organizationName,
              studentEmail: studentEmail,
              studentName: studentName,
              courseName: '',
              feeAmount: installment.duePayment,
              paymentDate: installment.nextpaymetDate,
              organizationMail: user.organizationEmail,
              organizationLogo: organizationLogo
            })
          } else {
            studentPaymentOverDueMail({
              courseName: '',
              studentName: studentName,
              studentEmail: studentEmail,
              installmentsArray: [
                {
                  overDueDate: installment.nextpaymetDate,
                  overDueAmount: installment.duePayment
                }
              ],
              organizationName: JSON.parse(orgData).organizationName,
              organizationEmail: JSON.parse(orgData).organizationEmail,
              organizationLogo: organizationLogo
            })
          }
        }
      }
    }
  }

  const handlePaymentEvent = () => {
    // studentFeeSlipMail({ organizationName: user.organizationName, studentEmail: studentEmail, studentName: studentName, courseName: '' })
  }

  const handleSingleInstallmentNotification = () => {
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      const presentDate = new Date()
      if (Number(studentData.nextPaymetReceiveDate.split('-')[1]) < presentDate.getMonth()) {
        if (sent == false) {
          studentPaymentOverDueMail({
            courseName: '',
            studentName: studentName,
            studentEmail: studentEmail,
            installmentsArray: [
              {
                overDueDate: studentData.nextPaymetReceiveDate,
                overDueAmount: studentData.totalDuePayment
              }
            ],
            organizationName: JSON.parse(orgData).organizationName,
            organizationEmail: JSON.parse(orgData).organizationEmail,
            organizationLogo: organizationLogo
          })
        }
      } else if (Number(studentData.nextPaymetReceiveDate.split('-')[1]) + 1 >= presentDate.getMonth()) {
        if (sent == false) {
          if (Number(studentData.nextPaymetReceiveDate.split('-')[0]) >= presentDate.getDate()) {
            studentUpcomingFeeMail({
              organizationName: user.organizationName,
              studentEmail: studentEmail,
              studentName: studentName,
              courseName: '',
              feeAmount: studentData.totalDuePayment,
              paymentDate: studentData.nextPaymetReceiveDate,
              organizationMail: user.organizationEmail,
              organizationLogo: organizationLogo
            })
          } else {
            studentPaymentOverDueMail({
              courseName: '',
              studentName: studentName,
              studentEmail: studentEmail,
              installmentsArray: [
                {
                  overDueDate: studentData.nextPaymetReceiveDate,
                  overDueAmount: studentData.totalDuePayment
                }
              ],
              organizationName: JSON.parse(orgData).organizationName,
              organizationEmail: JSON.parse(orgData).organizationEmail,
              organizationLogo: organizationLogo
            })
          }
        }
      }
    }
  }

  const handleDownload = () => {
    const buffer = Buffer.from(base64String, 'base64')

    // const buffer = res.data
    const blob = new Blob([buffer], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${studentInfo.studentFirstName}-fee-slip.pdf`
    link.click()
    URL.revokeObjectURL(url)
    setSnackbarColor(true)
  }

  useEffect(() => {
    if (studentData) {
      studentData?.installmentDetails.map((e: any, index: number) => {
        if (e.paymentStatus == 'payed') {
          setRefundIndex(index + 1)
        }
      })

      const value: any = studentData?.isPartPayment.toString()
      setIsPartPaymentState(value)

      const installment: any = studentData?.installmentDetails.length
      setInstallment(installment)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData])

  const getStudentFeeReceiptData = (customerId: any, organizationId: any, rollNo: any, studentName: any) => {
    getStudentFeeReceipt(customerId, organizationId, rollNo, studentName).then((res: any) => {
      if (res?.data?.statusCode == 200) {
        setBase64String(JSON.parse(res.data.data).pdfData)
        setIsLoadingBase64(false)
      } else {
        setIsLoadingBase64(false)
      }
    })
  }

  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'top-start' : 'top-end'
  const [updatedDate, setUpdatedDate] = useState<any>()

  return isLoading ? (
    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>Loading...</Typography>
    </Box>
  ) : (
    <>
      {updatePaymentDetails === true && (
        <UpdateStudentPaymentDetails setUpdatePaymentDetails={setUpdatePaymentDetails} />
      )}
      {updatePaymentDetails == false && (
        <>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CardHeader title='Payment Details' sx={{ ml: 5 }} />
              {studentData?.isPartPayment
                ? studentData?.allPaymentStatus != 'refund' &&
                studentData?.allPaymentStatus != 'defaulter' && (
                  <CardHeader
                    title={
                      permission?.some((obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')) && (
                        <>
                          <Grid sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 10 }}>
                            <Grid>
                              <Button
                                onClick={refreshData}
                                className='refreshs'
                                variant='outlined'
                                size='small'
                                sx={{ ml: 5, display: 'flex' }}
                              >
                                <RefreshIcon className='refreshs' />
                              </Button>
                            </Grid>

                            <Grid>
                              <Button
                                variant='outlined'
                                color={'primary'}
                                onClick={() => {
                                  setUpdatePaymentDetails(true)
                                }}
                              >
                                Update Payment Details &#8594;
                              </Button>
                            </Grid>
                            <Icon
                              onClick={() => {
                                setShowDetailsPopup(true)
                                setPaymentStatusDetails('')
                              }}
                              style={{ cursor: 'pointer', marginTop: '8px' }}
                              icon='bx:pencil'
                            />
                          </Grid>
                        </>
                      )
                    }
                  />
                )
                : studentData?.allPaymentStatus != 'refund' &&
                studentData?.allPaymentStatus != 'defaulter' && (
                  <CardHeader
                    title={
                      permission?.some((obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')) && (
                        <>
                          <Grid sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 10 }}>
                            <Button
                              variant='outlined'
                              color={'primary'}
                              onClick={() => {
                                setUpdatePaymentDetails(true)
                              }}
                            >
                              Update Payment Details &#8594;
                            </Button>

                            <Icon
                              onClick={() => {
                                setShowDetailsPopup(true)
                                setPaymentStatusDetails(studentData)
                              }}
                              style={{ cursor: 'pointer' }}
                              icon='bx:pencil'
                            />
                          </Grid>
                        </>
                      )
                    }
                  />
                )}
            </div>

            <CardContent>
              {studentData && studentData?.isPartPayment == true ? (
                <>
                  <Card
                    sx={{
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <CardContent
                      sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: '20px', overflowX: 'scroll' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <Typography variant='h6' sx={{ mt: '-18px', mb: '20px' }}>
                              {formattedDate}
                            </Typography>
                            <Typography variant='body2' sx={{ mb: '10px' }}>
                              Part Payment : Yes
                            </Typography>
                          </div>
                          <div>
                            {studentData && studentData?.allPaymentStatus == 'due' ? (
                              <Typography sx={{ mb: 0.5, fontSize: 15 }}>
                                Rs. {studentData && studentData?.totalDuePayment}{' '}
                                <CustomChip rounded size='small' skin='light' color='warning' label='Pending' />
                              </Typography>
                            ) : studentData?.allPaymentStatus == 'payed' ? (
                              <Typography variant='h5' sx={{ mb: 0.5 }}>
                                Rs. {studentData && studentData?.totalPayment}{' '}
                                <CustomChip rounded size='small' skin='light' color='success' label='Paid' />
                              </Typography>
                            ) : studentData?.allPaymentStatus == 'refund' ? (
                              <Typography variant='h5' sx={{ mb: 0.5 }}>
                                Rs. {studentData && studentData?.refundAmount}{' '}
                                <CustomChip rounded size='small' skin='light' color='secondary' label='Refund' />
                              </Typography>
                            ) : (
                              studentData?.allPaymentStatus == 'defaulter' && (
                                <Typography variant='h5' sx={{ mb: 0.5 }}>
                                  Rs. {studentData && studentData?.totalDuePayment}{' '}
                                  <CustomChip rounded size='small' skin='light' color='error' label='Defaulter' />
                                </Typography>
                              )
                            )}
                          </div>
                          <CardContent
                            sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: '20px', width: '160%' }}
                            className='paymentDetails'
                          >
                            <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                              <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              {' '}
                                              All Payment Status :{' '}
                                            </Typography>
                                          </MUITableCell>

                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              {studentData && studentData.allPaymentStatus === 'payed' ? (
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='success'
                                                  label='PAID'
                                                />
                                              ) : studentData && studentData.allPaymentStatus === 'due' ? (
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='error'
                                                  label='DUE'
                                                />
                                              ) : studentData && studentData.allPaymentStatus === 'defaulter' ? (
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='secondary'
                                                  label='DEFAULTER'
                                                />
                                              ) : studentData && studentData.allPaymentStatus === 'refund' ? (
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='error'
                                                  label='REFUND'
                                                />
                                              ) : null}
                                            </MUITableCell>
                                          )}
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Grand Total Payment :
                                            </Typography>
                                          </MUITableCell>

                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='warning'
                                                  label={`Rs. ${studentData && studentData?.grandTotalPaymentAmount}`}
                                                />
                                              </Typography>
                                            </MUITableCell>
                                          )}
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Discounted Payment :
                                            </Typography>
                                          </MUITableCell>
                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='primary'
                                                  label={`Rs. ${studentData && studentData?.discountedPaymentAmount}`}
                                                />
                                              </Typography>
                                            </MUITableCell>
                                          )}
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Total Payment :
                                            </Typography>
                                          </MUITableCell>
                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                <CustomChip
                                                  rounded
                                                  size='small'
                                                  skin='light'
                                                  color='info'
                                                  label={`Rs. ${studentData && studentData?.totalPayment}`}
                                                />
                                              </Typography>
                                            </MUITableCell>
                                          )}
                                        </TableRow>
                                        {studentData && studentData?.allPaymentStatus == 'refund' && (
                                          <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              {' '}
                                              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                Payment Refunded Date:
                                              </Typography>
                                            </MUITableCell>
                                            {isLoadingData ? (
                                              <Skeleton>
                                                <MUITableCell>loremm messag</MUITableCell>
                                              </Skeleton>
                                            ) : (
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '12px' }}>
                                                  <CustomChip
                                                    rounded
                                                    size='small'
                                                    skin='light'
                                                    color='secondary'
                                                    label={studentData && studentData?.refundedPaymentDate}
                                                  />
                                                </Typography>
                                              </MUITableCell>
                                            )}
                                          </TableRow>
                                        )}

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Total Due Payment :
                                            </Typography>
                                          </MUITableCell>
                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='error'
                                                label={`Rs. ${studentData && studentData?.totalDuePayment}`}
                                              />
                                            </MUITableCell>
                                          )}
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Total Received Payment :
                                            </Typography>
                                          </MUITableCell>
                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='success'
                                                label={`Rs. ${studentData && studentData?.totalReceivedPayment}`}
                                              />
                                            </MUITableCell>
                                          )}
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Number Of Installments :
                                            </Typography>
                                          </MUITableCell>
                                          {isLoadingData ? (
                                            <Skeleton>
                                              <MUITableCell>loremm messag</MUITableCell>
                                            </Skeleton>
                                          ) : (
                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='secondary'
                                                label={
                                                  studentData?.installmentDetails &&
                                                  studentData?.installmentDetails.length
                                                }
                                              />
                                            </MUITableCell>
                                          )}
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Fee receipt :
                                            </Typography>
                                          </MUITableCell>
                                          <MUITableCell
                                            sx={{ pb: '0 !important', display: 'flex', flexDirection: 'row' }}
                                          >
                                            {isLoadingBase64 ? (
                                              <Skeleton>
                                                <Button size='small' variant='contained'>
                                                  {base64String ? 'Re-generate' : 'Generate'}
                                                </Button>
                                              </Skeleton>
                                            ) : (
                                              <Button
                                                size='small'
                                                onClick={() => {
                                                  setReviewDialogBox(true)
                                                  setPurpose('generate')
                                                }}
                                                variant='contained'
                                              >
                                                {base64String ? 'Re-generate' : 'Generate'}
                                              </Button>
                                            )}
                                            {base64String && (
                                              <div style={{ marginLeft: '20px' }} onClick={() => setView(!view)}>
                                                <VisibilityIcon />
                                              </div>
                                            )}
                                          </MUITableCell>
                                        </TableRow>

                                        {base64String && (
                                          <TableRow>
                                            <MUITableCell>
                                              <Typography
                                                variant='body2'
                                                sx={{
                                                  mb: 0.5,
                                                  fontSize: '16px',
                                                  display: 'flex',
                                                  alignItems: 'center'
                                                }}
                                              >
                                                Send fee slip Invoice <EmailIcon />
                                              </Typography>
                                            </MUITableCell>
                                            {/* <MUITableCell>
                                              <div onClick={() => { handleDownload() }}>
                                                <DownloadIcon />
                                              </div>
                                            </MUITableCell> */}
                                            <MUITableCell
                                              onClick={() => {
                                                setPurpose('mail')
                                                setReviewDialogBox(true)
                                              }}
                                            >
                                              <Button variant='contained'>Mail</Button>
                                            </MUITableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  {view && (
                                    <iframe
                                      title='PDF Viewer'
                                      width='100%'
                                      allow='payment'
                                      height='500px' // Adjust the height as needed
                                      src={`data:application/pdf;base64,${base64String}`}
                                    />
                                  )}
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Table for all  */}
                    {/* <CardContent sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: "20px", width: "100%", overflowX: "scroll", marginTop: "10px" }}>
                    <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                          <Grid item>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <TableContainer >
                                <Table >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell >No.</TableCell>
                                      <TableCell >Payment Date</TableCell>
                                      <TableCell >Upcoming Date </TableCell>
                                      <TableCell >Received Payment </TableCell>
                                      <TableCell >Due Payment </TableCell>
                                      <TableCell >Notes </TableCell>
                                      <TableCell >Status</TableCell>
                                      {(studentData?.allPaymentStatus != "refund" && studentData?.allPaymentStatus != "defaulter") && <TableCell>Edit</TableCell>}

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {
                                      studentData ? studentData?.installmentDetails.map((e: any, index: number) => {
                                        return (
                                          <>
                                            <TableRow >
                                              <TableCell align='center'>
                                                <MUITableCell sx={{ pb: '0 !important' }}>
                                                  <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                    {e.installmentNumber}
                                                  </Typography>
                                                </MUITableCell>
                                              </TableCell>


                                              {e.paymentStatus == "payed" ?
                                                <>
                                                  <TableCell align='center'>


                                                    <MUITableCell sx={{ p: '0px !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                        {e.paymetReceiveDate && e.paymetReceiveDate}
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableCell>
                                                  <TableCell align='center'>

                                                    <MUITableCell sx={{ p: '0px !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                        -
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableCell>

                                                  <TableCell align='center'>

                                                    <MUITableCell sx={{ p: '0px !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                        {e.receivedPayment && e.receivedPayment}                                             </Typography>
                                                    </MUITableCell>
                                                  </TableCell>
                                                  <TableCell align='center'>

                                                    <MUITableCell sx={{ p: '0px !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                        -
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableCell>
                                                </>
                                                : e.paymentStatus == "due" ?
                                                  <>
                                                    <TableCell align='center'>
                                                      <MUITableCell sx={{ p: '0px !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                          -
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableCell>
                                                    <TableCell align='center'>


                                                      <MUITableCell sx={{ p: '0px !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                          {e.nextpaymetDate && e.nextpaymetDate}
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableCell>

                                                    <TableCell align='center'>


                                                      <MUITableCell sx={{ p: '0px !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                          -
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                      <MUITableCell sx={{ p: '0px !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                          {e.duePayment && e.duePayment}
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableCell>
                                                  </>
                                                  : e.paymentStatus == "refund" ?
                                                    <>
                                                      <TableCell align='center'>


                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                            {e.paymetReceiveDate && e.paymetReceiveDate}
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>
                                                      <TableCell align='center'>

                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                            -
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      <TableCell align='center'>

                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                            {e.receivedPayment && e.receivedPayment}                                             </Typography>
                                                        </MUITableCell>
                                                      </TableCell>
                                                      <TableCell align='center'>

                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                            -
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>
                                                    </> : e.paymentStatus == "defaulter" &&
                                                      e.paymetReceiveDate ?
                                                      <>
                                                        <TableCell align='center'>


                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              {e.paymetReceiveDate && e.paymetReceiveDate}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        <TableCell align='center'>

                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              -
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>

                                                        <TableCell align='center'>

                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              {e.receivedPayment && e.receivedPayment}                                             </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        <TableCell align='center'>

                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              -
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                      </> :
                                                      <>
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              -
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        <TableCell align='center'>


                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              {e.nextpaymetDate && e.nextpaymetDate}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>

                                                        <TableCell align='center'>


                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              -
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                              {e.duePayment && e.duePayment}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                      </>
                                              }


                                              <TableCell align='center'>
                                                <MUITableCell sx={{ p: '0px !important' }}>
                                                  <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>
                                                    {e.paymentNotes && e.paymentNotes}
                                                  </Typography>
                                                </MUITableCell>
                                              </TableCell>


                                              <TableCell align='center'>
                                                <MUITableCell sx={{ pb: '0px !important' }}>
                                                  <Typography variant='body2' sx={{ mb: 0.5, fontSize: "15px" }}>

                                                    {e.paymentStatus == "payed" ?
                                                      <CustomChip rounded size='small' skin='light' color='success' label={e.paymentStatus}
                                                      /> : e.paymentStatus == "due" ?
                                                        <CustomChip rounded size='small' skin='light' color='warning' label={e.paymentStatus} /> :
                                                        e.paymentStatus == "refund" ?
                                                          <CustomChip rounded size='small' skin='light' color='secondary' label={e.paymentStatus} /> :
                                                          e.paymentStatus == "defaulter" &&
                                                          <CustomChip rounded size='small' skin='light' color='error' label={e.paymentStatus} />

                                                    }
                                                  </Typography>
                                                </MUITableCell>
                                              </TableCell>


                                              {(studentData?.allPaymentStatus != "refund" && studentData?.allPaymentStatus != "defaulter") &&
                                                <TableCell>
                                                  <MUITableCell sx={{ pb: '0px !important' }}>
                                                    <IconButton onClick={() => {
                                                      setShowDetailsPopup(true)
                                                      setPaymentStatusDetails(e)
                                                    }}>
                                                      <Icon style={{ cursor: "pointer" }} icon='bx:pencil' />
                                                    </IconButton>
                                                  </MUITableCell>
                                                </TableCell>}

                                            </TableRow>

                                            <Divider sx={{ my: '0 !important' }} />
                                          </>
                                        )
                                      }) : ""}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>

                        </Grid>
                      </Box>
                    </Box>
                  </CardContent> */}
                    {studentData?.installmentDetails[0].paymentStatus == 'payed' && (
                      <CardContent
                        sx={{
                          p: `${theme.spacing(4, 5)} !important`,
                          borderRadius: '20px',
                          width: '100%',
                          overflowX: 'scroll',
                          marginTop: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <CardHeader title='Installment Payed Details' />
                        </div>
                        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                              <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Installment No.</TableCell>
                                          <TableCell>Payment Date</TableCell>
                                          <TableCell>Received Amount </TableCell>
                                          <TableCell>Status</TableCell>
                                          {/* <TableCell >Generate </TableCell> */}
                                          <TableCell>Status</TableCell>
                                          {permission?.some(
                                            (obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')
                                          ) &&
                                            studentData?.allPaymentStatus != 'refund' &&
                                            studentData?.allPaymentStatus != 'defaulter' && <TableCell>Edit</TableCell>}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {studentData
                                          ? studentData?.installmentDetails.map((e: any, index: number) => {
                                            return (
                                              <>
                                                {e.paymentStatus == 'payed' && (
                                                  <>
                                                    <TableRow>
                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ pb: '0 !important' }}>
                                                          <Tooltip title={e.installmentNumber} componentsProps={{
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
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.installmentNumber}
                                                            </Typography>
                                                          </Tooltip>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      {e.paymentStatus == 'payed' && (
                                                        <>
                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Tooltip title={e.paymetReceiveDate && e.paymetReceiveDate} componentsProps={{
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
                                                                <Typography
                                                                  variant='body2'
                                                                  sx={{ mb: 0.5, fontSize: '15px' }}
                                                                >
                                                                  {e.paymetReceiveDate && e.paymetReceiveDate}
                                                                </Typography>
                                                              </Tooltip>
                                                            </MUITableCell>
                                                          </TableCell>
                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Tooltip title={e.receivedPayment && e.receivedPayment} componentsProps={{
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
                                                                <Typography
                                                                  variant='body2'
                                                                  sx={{ mb: 0.5, fontSize: '15px' }}
                                                                >
                                                                  {e.receivedPayment && e.receivedPayment}{' '}
                                                                </Typography>
                                                              </Tooltip>
                                                            </MUITableCell>
                                                          </TableCell>
                                                        </>
                                                      )}
                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Tooltip title={e.paymentNotes && e.paymentNotes} componentsProps={{
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
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.paymentNotes && e.paymentNotes}
                                                            </Typography>
                                                          </Tooltip>
                                                        </MUITableCell>
                                                      </TableCell>
                                                      {/* <TableCell align='center' onClick={() => { setReviewDialogBox(true) }}>
                                                      <EmailIcon />
                                                    </TableCell> */}
                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ pb: '0px !important' }}>
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '15px' }}
                                                          >
                                                            {e.paymentStatus == 'payed' && (
                                                              <CustomChip
                                                                rounded
                                                                size='small'
                                                                skin='light'
                                                                color='success'
                                                                label='PAID'
                                                              />
                                                            )}
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      {permission?.some(
                                                        (obj: any) =>
                                                          obj?.title === 'Student' && obj?.action?.includes('update')
                                                      ) &&
                                                        studentData?.allPaymentStatus != 'refund' &&
                                                        studentData?.allPaymentStatus != 'defaulter' && (
                                                          <TableCell>
                                                            <MUITableCell sx={{ pb: '0px !important' }}>
                                                              <Tooltip title={"edit"} componentsProps={{
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
                                                                <IconButton
                                                                  onClick={() => {
                                                                    setShowDetailsPopup(true)
                                                                    setPaymentStatusDetails(e)
                                                                  }}
                                                                >
                                                                  <Icon
                                                                    style={{ cursor: 'pointer' }}
                                                                    icon='bx:pencil'
                                                                  />
                                                                </IconButton>
                                                              </Tooltip>
                                                            </MUITableCell>
                                                          </TableCell>
                                                        )}
                                                    </TableRow>

                                                    <Divider sx={{ my: '0 !important' }} />
                                                  </>
                                                )}
                                              </>
                                            )
                                          })
                                          : ''}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </CardContent>
                    )}

                    {/* Table for Paid  */}

                    {/* Table for Refund  */}
                    {(studentData?.allPaymentStatus == 'refund' ||
                      (studentData?.allPaymentStatus == 'defaulter' && studentData?.refundAmount >= 0)) && (
                        <CardContent
                          sx={{
                            p: `${theme.spacing(4, 5)} !important`,
                            borderRadius: '20px',
                            width: '100%',
                            overflowX: 'scroll',
                            marginTop: '10px'
                          }}
                        >
                          <CardHeader title=' Installment Refund Details' />
                          <Typography variant='h5' sx={{ mb: 0.5 }} ml={6}>
                            Rs. {studentData && studentData?.refundAmount}{' '}
                            <CustomChip rounded size='small' skin='light' color='secondary' label='Refunded' />
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                                <Grid item>
                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TableContainer>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Installment No.</TableCell>
                                            <TableCell>Payment Date</TableCell>
                                            <TableCell>Received Amount </TableCell>
                                            <TableCell>Notes </TableCell>
                                            <TableCell>Status</TableCell>
                                            {permission?.some(
                                              (obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')
                                            ) &&
                                              studentData?.allPaymentStatus != 'refund' &&
                                              studentData?.allPaymentStatus != 'defaulter' && <TableCell>Edit</TableCell>}
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {studentData
                                            ? studentData?.installmentDetails.map((e: any, index: number) => {
                                              return (
                                                <>
                                                  {e.paymentStatus == 'refund' && (
                                                    <>
                                                      <TableRow>
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.installmentNumber}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>

                                                        {e.paymentStatus == 'refund' && (
                                                          <>
                                                            <TableCell align='center'>
                                                              <MUITableCell sx={{ p: '0px !important' }}>
                                                                <Typography
                                                                  variant='body2'
                                                                  sx={{ mb: 0.5, fontSize: '15px' }}
                                                                >
                                                                  {e.paymetReceiveDate && e.paymetReceiveDate}
                                                                </Typography>
                                                              </MUITableCell>
                                                            </TableCell>

                                                            <TableCell align='center'>
                                                              <MUITableCell sx={{ p: '0px !important' }}>
                                                                <Typography
                                                                  variant='body2'
                                                                  sx={{ mb: 0.5, fontSize: '15px' }}
                                                                >
                                                                  {e.receivedPayment && e.receivedPayment}{' '}
                                                                </Typography>
                                                              </MUITableCell>
                                                            </TableCell>
                                                          </>
                                                        )}

                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.paymentNotes && e.paymentNotes}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>

                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ pb: '0px !important' }}>
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.paymentStatus == 'refund' && (
                                                                <CustomChip
                                                                  rounded
                                                                  size='small'
                                                                  skin='light'
                                                                  color='secondary'
                                                                  label={e.paymentStatus}
                                                                />
                                                              )}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>

                                                        {permission?.some(
                                                          (obj: any) =>
                                                            obj?.title === 'Student' && obj?.action?.includes('update')
                                                        ) &&
                                                          studentData?.allPaymentStatus != 'refund' &&
                                                          studentData?.allPaymentStatus != 'defaulter' && (
                                                            <TableCell>
                                                              <MUITableCell sx={{ pb: '0px !important' }}>
                                                                <IconButton
                                                                  onClick={() => {
                                                                    setShowDetailsPopup(true)
                                                                    setPaymentStatusDetails(e)
                                                                  }}
                                                                >
                                                                  <Icon
                                                                    style={{ cursor: 'pointer' }}
                                                                    icon='bx:pencil'
                                                                  />
                                                                </IconButton>
                                                              </MUITableCell>
                                                            </TableCell>
                                                          )}
                                                      </TableRow>

                                                      <Divider sx={{ my: '0 !important' }} />
                                                    </>
                                                  )}
                                                </>
                                              )
                                            })
                                            : ''}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </CardContent>
                      )}

                    {/* Table for Refund  */}

                    {/* Table for due  */}
                    {studentData?.installmentDetails[studentData?.installmentDetails.length - 1].paymentStatus ==
                      'due' && (
                        <CardContent
                          sx={{
                            p: `${theme.spacing(4, 5)} !important`,
                            borderRadius: '20px',
                            width: '100%',
                            overflowX: 'scroll',
                            marginTop: '10px'
                          }}
                        >
                          <CardHeader title=' Installment Due Details' />

                          <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                                <Grid item>
                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TableContainer>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Installment No.</TableCell>
                                            <TableCell>Upcoming Date </TableCell>
                                            <TableCell>Due Payment </TableCell>
                                            <TableCell>Notes </TableCell>
                                            <TableCell>Status</TableCell>
                                            {permission?.some(
                                              (obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')
                                            ) &&
                                              studentData?.allPaymentStatus != 'refund' &&
                                              studentData?.allPaymentStatus != 'defaulter' && <TableCell>Edit</TableCell>}
                                            <TableCell>Reminder</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {studentData
                                            ? studentData?.installmentDetails.map((e: any, index: number) => {
                                              return (
                                                <>
                                                  {e.paymentStatus == 'due' && (
                                                    <>
                                                      <TableRow>
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                                            <Tooltip title={e.installmentNumber} componentsProps={{
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
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.installmentNumber}
                                                              </Typography>
                                                            </Tooltip>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        {e.paymentStatus == 'due' && (
                                                          <>
                                                            <TableCell align='center'>
                                                              <MUITableCell sx={{ p: '0px !important' }}>
                                                                <Tooltip title={e.nextpaymetDate && e.nextpaymetDate} componentsProps={{
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
                                                                  <Typography
                                                                    variant='body2'
                                                                    sx={{ mb: 0.5, fontSize: '15px' }}
                                                                  >
                                                                    {e.nextpaymetDate && e.nextpaymetDate}
                                                                  </Typography>
                                                                </Tooltip>
                                                              </MUITableCell>
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                              <MUITableCell sx={{ p: '0px !important' }}>
                                                                <Tooltip title={e.duePayment && e.duePayment} componentsProps={{
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
                                                                  <Typography
                                                                    variant='body2'
                                                                    sx={{ mb: 0.5, fontSize: '15px' }}
                                                                  >
                                                                    {e.duePayment && e.duePayment}
                                                                  </Typography>
                                                                </Tooltip>
                                                              </MUITableCell>
                                                            </TableCell>
                                                          </>
                                                        )}
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ p: '0px !important' }}>
                                                            <Tooltip title={e.paymentNotes && e.paymentNotes} componentsProps={{
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
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.paymentNotes && e.paymentNotes}
                                                              </Typography>
                                                            </Tooltip>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ pb: '0px !important' }}>
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '15px' }}
                                                            >
                                                              {e.paymentStatus === 'due' && (
                                                                <>
                                                                  {parseInt(
                                                                    e.nextpaymetDate.split('-')[1] +
                                                                    e.nextpaymetDate.split('-')[0]
                                                                  ) <=
                                                                    parseInt(
                                                                      date.getMonth() +
                                                                      1 +
                                                                      (date.getDate() < 10
                                                                        ? `0${date.getDate()}`
                                                                        : date.getDate()
                                                                      ).toString()
                                                                    ) ? (
                                                                    <CustomChip
                                                                      rounded
                                                                      size='small'
                                                                      skin='light'
                                                                      color='error'
                                                                      label='Over Due'
                                                                    />
                                                                  ) : (
                                                                    <CustomChip
                                                                      rounded
                                                                      size='small'
                                                                      skin='light'
                                                                      color='warning'
                                                                      label='Due'
                                                                    />
                                                                  )}
                                                                </>
                                                              )}
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                        {permission?.some(
                                                          (obj: any) =>
                                                            obj?.title === 'Student' && obj?.action?.includes('update')
                                                        ) &&
                                                          studentData?.allPaymentStatus != 'refund' &&
                                                          studentData?.allPaymentStatus != 'defaulter' && (
                                                            <TableCell>
                                                              <MUITableCell sx={{ pb: '0px !important' }}>
                                                                <Tooltip title={"edit"} componentsProps={{
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
                                                                  <IconButton
                                                                    onClick={() => {
                                                                      setShowDetailsPopup(true)
                                                                      setPaymentStatusDetails(e)
                                                                    }}
                                                                  >
                                                                    <Icon
                                                                      style={{ cursor: 'pointer' }}
                                                                      icon='bx:pencil'
                                                                    />
                                                                  </IconButton>
                                                                </Tooltip>
                                                              </MUITableCell>
                                                            </TableCell>
                                                          )}
                                                        <TableCell align='center'>
                                                          <MUITableCell sx={{ pb: '0px !important' }}>
                                                            <Typography
                                                              variant='body2'
                                                              sx={{ mb: 0.5, fontSize: '10px' }}
                                                            >
                                                              <Button
                                                                variant='contained'
                                                                disabled={clickedArray.includes(index)}
                                                                color={'primary'}
                                                                onClick={() => {
                                                                  handleSendInvoice(e),
                                                                    setClickedArray([...clickedArray, index])
                                                                }}
                                                                sx={{ width: '100px', height: '50px' }}
                                                              >
                                                                Send Reminder
                                                              </Button>
                                                            </Typography>
                                                          </MUITableCell>
                                                        </TableCell>
                                                      </TableRow>

                                                      <Divider sx={{ my: '0 !important' }} />
                                                    </>
                                                  )}
                                                </>
                                              )
                                            })
                                            : ''}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </CardContent>
                      )}
                    {/* Table for due  */}

                    {/* Table for defaulter  */}
                    {studentData?.allPaymentStatus == 'defaulter' && (
                      <CardContent
                        sx={{
                          p: `${theme.spacing(4, 5)} !important`,
                          borderRadius: '20px',
                          width: '100%',
                          overflowX: 'scroll',
                          marginTop: '10px'
                        }}
                      >
                        <CardHeader title=' Installment defaulter Details' />
                        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                              <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Installment No.</TableCell>
                                          <TableCell>Upcoming Date </TableCell>
                                          <TableCell>Due Payment </TableCell>
                                          <TableCell>Notes </TableCell>
                                          <TableCell>Status</TableCell>
                                          {permission?.some(
                                            (obj: any) => obj?.title === 'Student' && obj?.action?.includes('update')
                                          ) &&
                                            studentData?.allPaymentStatus != 'refund' &&
                                            studentData?.allPaymentStatus != 'defaulter' && <TableCell>Edit</TableCell>}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {studentData
                                          ? studentData?.installmentDetails.map((e: any, index: number) => {
                                            return (
                                              <>
                                                {e.paymentStatus == 'defaulter' && (
                                                  <>
                                                    <TableRow>
                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ pb: '0 !important' }}>
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '15px' }}
                                                          >
                                                            {e.installmentNumber}
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      {e.paymentStatus == 'defaulter' && e.paymetReceiveDate ? (
                                                        <>
                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.paymetReceiveDate && e.paymetReceiveDate}
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableCell>

                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.receivedPayment && e.receivedPayment}{' '}
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableCell>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.nextpaymetDate && e.nextpaymetDate}
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableCell>

                                                          <TableCell align='center'>
                                                            <MUITableCell sx={{ p: '0px !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '15px' }}
                                                              >
                                                                {e.duePayment && e.duePayment}
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableCell>
                                                        </>
                                                      )}

                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ p: '0px !important' }}>
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '15px' }}
                                                          >
                                                            {e.paymentNotes && e.paymentNotes}
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      <TableCell align='center'>
                                                        <MUITableCell sx={{ pb: '0px !important' }}>
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '15px' }}
                                                          >
                                                            {e.paymentStatus == 'defaulter' && (
                                                              <CustomChip
                                                                rounded
                                                                size='small'
                                                                skin='light'
                                                                color='error'
                                                                label={e.paymentStatus}
                                                              />
                                                            )}
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableCell>

                                                      {permission?.some(
                                                        (obj: any) =>
                                                          obj?.title === 'Student' && obj?.action?.includes('update')
                                                      ) &&
                                                        studentData?.allPaymentStatus != 'refund' &&
                                                        studentData?.allPaymentStatus != 'defaulter' && (
                                                          <TableCell>
                                                            <MUITableCell sx={{ pb: '0px !important' }}>
                                                              <IconButton
                                                                onClick={() => {
                                                                  setShowDetailsPopup(true)
                                                                  setPaymentStatusDetails(e)
                                                                }}
                                                              >
                                                                <Icon
                                                                  style={{ cursor: 'pointer' }}
                                                                  icon='bx:pencil'
                                                                />
                                                              </IconButton>
                                                            </MUITableCell>
                                                          </TableCell>
                                                        )}
                                                    </TableRow>

                                                    <Divider sx={{ my: '0 !important' }} />
                                                  </>
                                                )}
                                              </>
                                            )
                                          })
                                          : ''}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </CardContent>
                    )}
                    {/* Table for defaulter  */}
                  </Card>
                </>
              ) : (
                <>
                  <Card
                    sx={{
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <CardContent
                      sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: '20px', overflowX: 'scroll' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <Typography variant='h6' sx={{ mt: '-18px', mb: '20px' }}>
                              {formattedDate}
                            </Typography>
                            <Typography variant='body2' sx={{ mb: '10px' }}>
                              Part Payment : No
                            </Typography>
                          </div>
                          <div>
                            {studentData && studentData?.allPaymentStatus == 'due' ? (
                              <Typography sx={{ mb: 0.5, fontSize: 15 }}>
                                Rs. {studentData && studentData?.nextReceivedPayment}{' '}
                                <CustomChip rounded size='small' skin='light' color='warning' label='Pending' />
                              </Typography>
                            ) : studentData?.allPaymentStatus == 'payed' ? (
                              <Typography sx={{ mb: 0.5, fontSize: 15 }}>
                                Rs. {studentData && studentData?.totalPayment}{' '}
                                <CustomChip rounded size='small' skin='light' color='success' label='PAID' />
                              </Typography>
                            ) : studentData?.allPaymentStatus == 'refund' ? (
                              <Typography variant='h5' sx={{ mb: 0.5 }}>
                                Rs. {studentData && studentData?.totalDuePayment}{' '}
                                <CustomChip rounded size='small' skin='light' color='secondary' label='Refund' />
                              </Typography>
                            ) : (
                              studentData?.allPaymentStatus == 'defaulter' && (
                                <Typography sx={{ mb: 0.5, fontSize: 15 }}>
                                  Rs.{' '}
                                  {(studentData && studentData?.nextReceivedPayment) || studentData?.totalDuePayment}{' '}
                                  <CustomChip rounded size='small' skin='light' color='error' label='Defaulter' />
                                </Typography>
                              )
                            )}
                          </div>

                          <CardContent
                            sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: '20px', width: '160%' }}
                            className='paymentDetails'
                          >
                            <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                              <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              {' '}
                                              All Payment Status :{' '}
                                            </Typography>
                                          </MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {studentData && studentData?.allPaymentStatus == 'payed' ? (
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='success'
                                                label='PAID'
                                              />
                                            ) : studentData && studentData?.allPaymentStatus == 'due' ? (
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='error'
                                                label={studentData && studentData?.allPaymentStatus}
                                              />
                                            ) : studentData && studentData?.allPaymentStatus == 'defaulter' ? (
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='error'
                                                label={studentData && studentData?.allPaymentStatus}
                                              />
                                            ) : studentData && studentData?.allPaymentStatus == 'refund' ? (
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='secondary'
                                                label={studentData && studentData?.allPaymentStatus}
                                              />
                                            ) : null}
                                          </MUITableCell>
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Grand Total Payment :
                                            </Typography>
                                          </MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='warning'
                                                label={`Rs. ${studentData && studentData?.grandTotalPaymentAmount}`}
                                              />
                                            </Typography>
                                          </MUITableCell>
                                        </TableRow>

                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Discounted Payment :
                                            </Typography>
                                          </MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='primary'
                                                label={`Rs. ${studentData && studentData?.discountedPaymentAmount}`}
                                              />
                                            </Typography>
                                          </MUITableCell>
                                        </TableRow>

                                        {(studentData && studentData?.allPaymentStatus == 'payed') ||
                                          studentData?.allPaymentStatus == 'refund' ? (
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                {' '}
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  Total Received Payment :
                                                </Typography>
                                              </MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  <CustomChip
                                                    rounded
                                                    size='small'
                                                    skin='light'
                                                    color='success'
                                                    label={`Rs. ${studentData && studentData?.totalReceivedPayment}`}
                                                  />
                                                </Typography>
                                              </MUITableCell>
                                            </TableRow>

                                            {studentData?.allPaymentStatus == 'refund' && (
                                              <>
                                                {' '}
                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      Total Due Payment :
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='warning'
                                                        label={`Rs. ${studentData && studentData?.totalDuePayment}`}
                                                      />
                                                    </Typography>
                                                  </MUITableCell>
                                                </TableRow>
                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      Payment Refunded Date:
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='secondary'
                                                        label={studentData && studentData?.refundedPaymentDate}
                                                      />
                                                    </Typography>
                                                  </MUITableCell>
                                                </TableRow>
                                              </>
                                            )}
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                {' '}
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  Payment Received Date:
                                                </Typography>
                                              </MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  <CustomChip
                                                    rounded
                                                    size='small'
                                                    skin='light'
                                                    color='info'
                                                    label={studentData && studentData?.paymetReceiveDate}
                                                  />
                                                </Typography>
                                              </MUITableCell>
                                            </TableRow>
                                          </>
                                        ) : studentData && studentData?.allPaymentStatus == 'due' ? (
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                {' '}
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  Next Payment Amount :
                                                </Typography>
                                              </MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  <CustomChip
                                                    rounded
                                                    size='small'
                                                    skin='light'
                                                    color='info'
                                                    label={`Rs. ${studentData && studentData?.nextReceivedPayment}`}
                                                  />
                                                </Typography>
                                              </MUITableCell>
                                            </TableRow>

                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                {' '}
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  Next Payment Date :
                                                </Typography>
                                              </MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  <CustomChip
                                                    rounded
                                                    size='small'
                                                    skin='light'
                                                    color='secondary'
                                                    label={studentData && studentData?.nextPaymetReceiveDate}
                                                  />
                                                </Typography>
                                              </MUITableCell>
                                            </TableRow>
                                          </>
                                        ) : (
                                          studentData &&
                                          studentData?.allPaymentStatus == 'defaulter' && (
                                            <>
                                              {studentData && studentData?.nextReceivedPayment ? (
                                                <>
                                                  {' '}
                                                  <TableRow>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      {' '}
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        Next Payment Amount :
                                                      </Typography>
                                                    </MUITableCell>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        <CustomChip
                                                          rounded
                                                          size='small'
                                                          skin='light'
                                                          color='info'
                                                          label={`Rs. ${studentData && studentData?.nextReceivedPayment
                                                            }`}
                                                        />
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      {' '}
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        Next Payment Date :
                                                      </Typography>
                                                    </MUITableCell>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        <CustomChip
                                                          rounded
                                                          size='small'
                                                          skin='light'
                                                          color='secondary'
                                                          label={studentData && studentData?.nextPaymetReceiveDate}
                                                        />
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableRow>{' '}
                                                </>
                                              ) : (
                                                <>
                                                  <TableRow>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      {' '}
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        Total Received Payment :
                                                      </Typography>
                                                    </MUITableCell>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        <CustomChip
                                                          rounded
                                                          size='small'
                                                          skin='light'
                                                          color='success'
                                                          label={`Rs. ${studentData && studentData?.totalReceivedPayment
                                                            }`}
                                                        />
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      {' '}
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        Payment Received Date:
                                                      </Typography>
                                                    </MUITableCell>
                                                    <MUITableCell sx={{ pb: '0 !important' }}>
                                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                        <CustomChip
                                                          rounded
                                                          size='small'
                                                          skin='light'
                                                          color='info'
                                                          label={studentData && studentData?.paymetReceiveDate}
                                                        />
                                                      </Typography>
                                                    </MUITableCell>
                                                  </TableRow>
                                                </>
                                              )}
                                            </>
                                          )
                                        )}
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            {' '}
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              Payment Notes :
                                            </Typography>
                                          </MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>
                                            <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                              <CustomChip
                                                rounded
                                                size='small'
                                                skin='light'
                                                color='error'
                                                label={studentData && studentData?.paymentNotes}
                                              />
                                            </Typography>
                                          </MUITableCell>
                                        </TableRow>
                                        {studentData && studentData?.allPaymentStatus == 'payed' ? (
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>
                                                <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                  Fee receipt :
                                                </Typography>
                                              </MUITableCell>
                                              <MUITableCell
                                                sx={{
                                                  pb: '0 !important',
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                                  alignItems: 'center'
                                                }}
                                              >
                                                {isLoadingBase64 ? (
                                                  <Skeleton>
                                                    <Button size='small' variant='contained'>
                                                      {base64String ? 'Re-generate' : 'Generate'}
                                                    </Button>
                                                  </Skeleton>
                                                ) : (
                                                  <Button
                                                    size='small'
                                                    onClick={() => {
                                                      setReviewDialogBox(true)
                                                      setPurpose('generate')
                                                    }}
                                                    variant='contained'
                                                  >
                                                    {base64String ? 'Re-generate' : 'Generate'}
                                                  </Button>
                                                )}
                                                {base64String && (
                                                  <div style={{ marginLeft: '20px' }} onClick={() => setView(!view)}>
                                                    <VisibilityIcon />
                                                  </div>
                                                )}
                                              </MUITableCell>
                                            </TableRow>

                                            {base64String && (
                                              <TableRow>
                                                <MUITableCell sx={{ pb: '0 !important' }}>
                                                  <Typography
                                                    variant='body2'
                                                    sx={{
                                                      mb: 0.5,
                                                      fontSize: '16px',
                                                      display: 'flex',
                                                      alignItems: 'center'
                                                    }}
                                                  >
                                                    Send fee slip Invoice <EmailIcon />
                                                  </Typography>
                                                </MUITableCell>
                                                <MUITableCell
                                                  onClick={() => {
                                                    setPurpose('mail')
                                                    setReviewDialogBox(true)
                                                  }}
                                                >
                                                  <Typography
                                                    variant='body2'
                                                    sx={{
                                                      mb: 0.5,
                                                      fontSize: '16px',
                                                      display: 'flex',
                                                      alignItems: 'center'
                                                    }}
                                                  >
                                                    <Button variant='contained'>Mail</Button>
                                                  </Typography>
                                                </MUITableCell>
                                              </TableRow>
                                            )}
                                          </>
                                        ) : null}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  {view && (
                                    <iframe
                                      allow='payment'
                                      title='PDF Viewer'
                                      width='100%'
                                      height='500px' // Adjust the height as needed
                                      src={`data:application/pdf;base64,${base64String}`}
                                    />
                                  )}
                                </Box>
                              </Grid>
                            </Grid>
                            {studentData && studentData?.allPaymentStatus == 'due' ? (
                              <Typography variant='h3' sx={{ mb: 0.5, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                  onClick={() => {
                                    handleSingleInstallmentNotification(), setClickedArray([...clickedArray, 0])
                                  }}
                                  variant='contained'
                                  disabled={clickedArray.includes(0)}
                                >
                                  Send Reminder
                                </Button>
                              </Typography>
                            ) : null}
                          </CardContent>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </>
              )}
            </CardContent>
          </Card>

          {/* dialog for details*/}
          {paymentStatusDetails ? (
            <Dialog fullWidth open={showDetailsPopup} maxWidth='sm' scroll='body' sx={{ textAlign: 'center' }}>
              <DialogContent sx={{ pb: 8, position: 'relative' }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardHeader title='Update Payment Status' />
                    <CardHeader
                      title={
                        <Icon
                          onClick={() => {
                            setShowDetailsPopup(false)
                            setUpdatedDate(null)
                            setNewUpdatedStatus(null)
                          }}
                          style={{ cursor: 'pointer' }}
                          icon='bx:x'
                        />
                      }
                    />
                  </div>
                  <Typography variant='body2'>Current Payment Details</Typography>
                  <Divider sx={{ m: '0 !important' }} />
                </Box>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell align='center'>
                            <MUITableCell sx={{ pb: '0 !important' }}>
                              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                {paymentStatusDetails.installmentNumber}
                              </Typography>
                            </MUITableCell>
                          </TableCell>

                          {paymentStatusDetails?.isPartPayment == 'false' ? (
                            <></>
                          ) : (
                            <>
                              {paymentStatusDetails.paymentStatus == 'payed' ? (
                                <>
                                  <TableCell align='center'>
                                    <MUITableCell sx={{ p: '0px !important' }}>
                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                        {paymentStatusDetails.paymetReceiveDate &&
                                          paymentStatusDetails.paymetReceiveDate}
                                      </Typography>
                                    </MUITableCell>
                                  </TableCell>
                                </>
                              ) : (
                                paymentStatusDetails.paymentStatus == 'due' && (
                                  <>
                                    <TableCell align='center'>
                                      <MUITableCell sx={{ p: '0px !important' }}>
                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                          {paymentStatusDetails.nextpaymetDate && paymentStatusDetails.nextpaymetDate}
                                        </Typography>
                                      </MUITableCell>
                                    </TableCell>
                                  </>
                                )
                              )}

                              {paymentStatusDetails.paymentStatus == 'payed' ? (
                                <>
                                  <TableCell align='center'>
                                    <MUITableCell sx={{ p: '0px !important' }}>
                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                        Rs.{' '}
                                        {paymentStatusDetails.receivedPayment && paymentStatusDetails.receivedPayment}
                                      </Typography>
                                    </MUITableCell>
                                  </TableCell>
                                  <TableCell align='center'>
                                    <MUITableCell sx={{ p: '0px !important' }}>
                                      <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                        <CustomChip
                                          rounded
                                          size='small'
                                          skin='light'
                                          color={paymentStatusDetails.paymentStatus != 'payed' ? 'warning' : 'success'}
                                          label={paymentStatusDetails.paymentStatus == 'payed' ? 'paid' : 'due'}
                                        />
                                      </Typography>
                                    </MUITableCell>
                                  </TableCell>
                                </>
                              ) : (
                                paymentStatusDetails.paymentStatus == 'due' && (
                                  <>
                                    <TableCell align='center'>
                                      <MUITableCell sx={{ p: '0px !important' }}>
                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                          Rs. {paymentStatusDetails.duePayment && paymentStatusDetails.duePayment}
                                        </Typography>
                                      </MUITableCell>
                                    </TableCell>

                                    <TableCell align='center'>
                                      <MUITableCell sx={{ p: '0px !important' }}>
                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '15px' }}>
                                          <CustomChip
                                            rounded
                                            size='small'
                                            skin='light'
                                            color={
                                              paymentStatusDetails.paymentStatus != 'payed'
                                                ? Number(paymentStatusDetails.nextpaymetDate.split('-')[1]) <=
                                                  date.getMonth() + 1 &&
                                                  Number(paymentStatusDetails.nextpaymetDate.split('-')[0]) <
                                                  date.getDate()
                                                  ? 'error'
                                                  : 'warning'
                                                : 'success'
                                            }
                                            label={
                                              paymentStatusDetails.paymentStatus == 'payed'
                                                ? 'paid'
                                                : Number(paymentStatusDetails.nextpaymetDate.split('-')[1]) <=
                                                  date.getMonth() + 1 &&
                                                  Number(paymentStatusDetails.nextpaymetDate.split('-')[0]) <
                                                  date.getDate()
                                                  ? 'Over due'
                                                  : ' due'
                                            }
                                          />
                                        </Typography>
                                      </MUITableCell>
                                    </TableCell>
                                  </>
                                )
                              )}
                              {paymentStatusDetails.isPartPayment == false && (
                                <Box sx={{}}>
                                  <CardContent
                                    sx={{ p: `${theme.spacing(4, 5)} !important`, borderRadius: '20px', width: '100%' }}
                                  >
                                    <Grid container sx={{ p: { sm: 6, xs: 0 }, pb: '1 !important' }}>
                                      <Grid item xl={12} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <TableContainer>
                                            <Table>
                                              <TableBody>
                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      {' '}
                                                      All Payment Status :{' '}
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {studentData && studentData?.allPaymentStatus == 'payed' ? (
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='success'
                                                        label={studentData && studentData?.allPaymentStatus}
                                                      />
                                                    ) : studentData && studentData?.allPaymentStatus == 'due' ? (
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='error'
                                                        label={studentData && studentData?.allPaymentStatus}
                                                      />
                                                    ) : studentData && studentData?.allPaymentStatus == 'defaulter' ? (
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='error'
                                                        label={studentData && studentData?.allPaymentStatus}
                                                      />
                                                    ) : studentData && studentData?.allPaymentStatus == 'refund' ? (
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='error'
                                                        label={studentData && studentData?.allPaymentStatus}
                                                      />
                                                    ) : null}
                                                  </MUITableCell>
                                                </TableRow>

                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      Grand Total Payment :
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='warning'
                                                        label={`Rs. ${studentData && studentData?.grandTotalPaymentAmount
                                                          }`}
                                                      />
                                                    </Typography>
                                                  </MUITableCell>
                                                </TableRow>

                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      Discounted Payment :
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='primary'
                                                        label={`Rs. ${studentData && studentData?.discountedPaymentAmount
                                                          }`}
                                                      />
                                                    </Typography>
                                                  </MUITableCell>
                                                </TableRow>

                                                {(studentData && studentData?.allPaymentStatus == 'payed') ||
                                                  studentData?.allPaymentStatus == 'refund' ? (
                                                  <>
                                                    <TableRow>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {' '}
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          Total Received Payment :
                                                        </Typography>
                                                      </MUITableCell>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          <CustomChip
                                                            rounded
                                                            size='small'
                                                            skin='light'
                                                            color='success'
                                                            label={`Rs. ${studentData && studentData?.totalReceivedPayment
                                                              }`}
                                                          />
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableRow>
                                                    {studentData?.allPaymentStatus == 'refund' && (
                                                      <TableRow>
                                                        <MUITableCell sx={{ pb: '0 !important' }}>
                                                          {' '}
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '16px' }}
                                                          >
                                                            Total Due Payment :
                                                          </Typography>
                                                        </MUITableCell>
                                                        <MUITableCell sx={{ pb: '0 !important' }}>
                                                          <Typography
                                                            variant='body2'
                                                            sx={{ mb: 0.5, fontSize: '16px' }}
                                                          >
                                                            <CustomChip
                                                              rounded
                                                              size='small'
                                                              skin='light'
                                                              color='warning'
                                                              label={`Rs. ${studentData && studentData?.totalDuePayment
                                                                }`}
                                                            />
                                                          </Typography>
                                                        </MUITableCell>
                                                      </TableRow>
                                                    )}

                                                    <TableRow>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {' '}
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          Payment Received Date:
                                                        </Typography>
                                                      </MUITableCell>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          <CustomChip
                                                            rounded
                                                            size='small'
                                                            skin='light'
                                                            color='info'
                                                            label={studentData && studentData?.paymetReceiveDate}
                                                          />
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableRow>
                                                  </>
                                                ) : studentData && studentData?.allPaymentStatus == 'due' ? (
                                                  <>
                                                    <TableRow>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {' '}
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          Next Payment Amount :
                                                        </Typography>
                                                      </MUITableCell>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          <CustomChip
                                                            rounded
                                                            size='small'
                                                            skin='light'
                                                            color='info'
                                                            label={`Rs. ${studentData && studentData?.nextReceivedPayment
                                                              }`}
                                                          />
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        {' '}
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          Next Payment Date :
                                                        </Typography>
                                                      </MUITableCell>
                                                      <MUITableCell sx={{ pb: '0 !important' }}>
                                                        <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                          <CustomChip
                                                            rounded
                                                            size='small'
                                                            skin='light'
                                                            color='secondary'
                                                            label={studentData && studentData?.nextPaymetReceiveDate}
                                                          />
                                                        </Typography>
                                                      </MUITableCell>
                                                    </TableRow>
                                                  </>
                                                ) : (
                                                  studentData &&
                                                  studentData?.allPaymentStatus == 'defaulter' && (
                                                    <>
                                                      {studentData && studentData?.nextReceivedPayment ? (
                                                        <>
                                                          {' '}
                                                          <TableRow>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              {' '}
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                Next Payment Amount :
                                                              </Typography>
                                                            </MUITableCell>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                <CustomChip
                                                                  rounded
                                                                  size='small'
                                                                  skin='light'
                                                                  color='info'
                                                                  label={`Rs. ${studentData && studentData?.nextReceivedPayment
                                                                    }`}
                                                                />
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableRow>
                                                          <TableRow>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              {' '}
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                Next Payment Date :
                                                              </Typography>
                                                            </MUITableCell>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                <CustomChip
                                                                  rounded
                                                                  size='small'
                                                                  skin='light'
                                                                  color='secondary'
                                                                  label={
                                                                    studentData && studentData?.nextPaymetReceiveDate
                                                                  }
                                                                />
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableRow>{' '}
                                                        </>
                                                      ) : (
                                                        <>
                                                          <TableRow>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              {' '}
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                Total Received Payment :
                                                              </Typography>
                                                            </MUITableCell>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                <CustomChip
                                                                  rounded
                                                                  size='small'
                                                                  skin='light'
                                                                  color='success'
                                                                  label={`Rs. ${studentData && studentData?.totalReceivedPayment
                                                                    }`}
                                                                />
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableRow>
                                                          <TableRow>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              {' '}
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                Payment Received Date:
                                                              </Typography>
                                                            </MUITableCell>
                                                            <MUITableCell sx={{ pb: '0 !important' }}>
                                                              <Typography
                                                                variant='body2'
                                                                sx={{ mb: 0.5, fontSize: '16px' }}
                                                              >
                                                                <CustomChip
                                                                  rounded
                                                                  size='small'
                                                                  skin='light'
                                                                  color='info'
                                                                  label={studentData && studentData?.paymetReceiveDate}
                                                                />
                                                              </Typography>
                                                            </MUITableCell>
                                                          </TableRow>
                                                        </>
                                                      )}
                                                    </>
                                                  )
                                                )}
                                                <TableRow>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    {' '}
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      Payment Notes :
                                                    </Typography>
                                                  </MUITableCell>
                                                  <MUITableCell sx={{ pb: '0 !important' }}>
                                                    <Typography variant='body2' sx={{ mb: 0.5, fontSize: '16px' }}>
                                                      <CustomChip
                                                        rounded
                                                        size='small'
                                                        skin='light'
                                                        color='error'
                                                        label={studentData && studentData?.paymentNotes}
                                                      />
                                                    </Typography>
                                                  </MUITableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Box>
                              )}
                            </>
                          )}
                        </TableRow>
                      </TableBody>
                    </Table>

                    {paymentStatusDetails?.isPartPayment == false ? (
                      <Box sx={{ minWidth: 120, justifyContent: 'space-between', alignItems: 'center' }}>
                        <TableCell>
                          <FormControl sx={{ width: '100%', marginBottom: 5 }}>
                            <InputLabel id='demo-simple-select-label'> Status</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={newUpdatedStatus}
                              label=' Status'
                              onChange={e => setNewUpdatedStatus(e.target.value)}
                            >
                              <MenuItem value={'defaulter'} onClick={() => setRefundVisible(false)}>
                                DEFAULTER
                              </MenuItem>
                              <MenuItem
                                value={'refund'}
                                onClick={() => setRefundVisible(true)}
                                disabled={paymentStatusDetails.allPaymentStatus == 'due' ? true : false}
                              >
                                REFUND
                              </MenuItem>
                              <MenuItem
                                value={'due'}
                                onClick={() => setRefundVisible(false)}
                                disabled={paymentStatusDetails.allPaymentStatus == 'due' ? true : false}
                              >
                                DUE
                              </MenuItem>
                              <MenuItem
                                value={'payed'}
                                onClick={() => setRefundVisible(false)}
                                disabled={paymentStatusDetails.allPaymentStatus == 'payed' ? true : false}
                              >
                                PAID
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {newUpdatedStatus != 'defaulter' && newUpdatedStatus != 'refund' && (
                          <TableCell>
                            <DatePickerWrapper>
                              <DatePicker
                                dateFormat='dd/MM/yyyy'
                                value={updatedDate}
                                id='basic-input'
                                popperPlacement={popperPlacement}
                                autoComplete='OFF'
                                onChange={(date: Date) => {
                                  const newDate: any = customDateFormatDash(date)
                                  setUpdatedDate(newDate)
                                }}
                                placeholderText='updated Date'
                                customInput={
                                  <CustomInput
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position='end'>
                                          <EventNoteIcon />
                                        </InputAdornment>
                                      )
                                    }}
                                    label='Updated date'
                                  />
                                }
                              />
                            </DatePickerWrapper>
                          </TableCell>
                        )}
                        {newUpdatedStatus != 'refund' && (
                          <TableCell >
                            <Button
                              sx={{ marginTop: "20px" }}
                              variant='contained'
                              onClick={() => {
                                if (newUpdatedStatus != null && newUpdatedStatus == 'defaulter') {
                                  updateCall({
                                    customerId: user.customerId,
                                    organizationId: user.organizationId,
                                    rollNo: studentInfo.rollNo,
                                    updatedPaymentStatus: 'defaulter',
                                    studentStatus: 'defaulter',
                                    updatedDate: updatedDate
                                  })
                                  setRefundVisible(false)
                                  handleClick()
                                } else if (updatedDate != null && newUpdatedStatus != null) {
                                  if (newUpdatedStatus == 'payed' || newUpdatedStatus == 'due') {
                                    updateCall({
                                      customerId: user.customerId,
                                      organizationId: user.organizationId,
                                      rollNo: studentInfo.rollNo,
                                      updatedPaymentStatus:
                                        paymentStatusDetails.allPaymentStatus == 'due' ? 'payed' : 'due',
                                      studentStatus: studentInfo.studentStatus,
                                      updatedDate: updatedDate
                                    })
                                    setRefundVisible(false)
                                    handleClick()
                                    handlePaymentEvent()
                                  }
                                } else {
                                  setSnackbarColor(false)
                                  setSnackbaropen(true)
                                  setResponseMessage('Fill all the required information')
                                }
                              }}
                            >
                              save
                            </Button>
                          </TableCell>
                        )}
                      </Box>
                    ) : (
                      <>
                        <div style={{ paddingTop: '50px' }}>
                          Click to set status and update the Date
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TableCell>
                              <FormControl fullWidth>
                                <InputLabel id='stepper-custom-vertical-personal-select-label'>Status</InputLabel>
                                <Select
                                  label='Status'
                                  name='Status'
                                  id='stepper-custom-vertical-personal-select'
                                  value={newUpdatedStatus}
                                  labelId='stepper-custom-vertical-personal-select-label'
                                >
                                  <MenuItem
                                    value={'payed'}
                                    disabled={paymentStatusDetails.paymentStatus == 'payed' ? true : false}
                                    onClick={() => {
                                      setNewUpdatedStatus('payed')
                                    }}
                                  >
                                    PAID
                                  </MenuItem>
                                  <MenuItem
                                    value={'due'}
                                    disabled={paymentStatusDetails.paymentStatus == 'due' ? true : false}
                                    onClick={() => {
                                      setNewUpdatedStatus('due')
                                    }}
                                  >
                                    DUE
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <DatePickerWrapper>
                                <DatePicker
                                  dateFormat='dd/MM/yyyy'
                                  value={updatedDate}
                                  id='basic-input'
                                  popperPlacement={popperPlacement}
                                  autoComplete='OFF'
                                  onChange={(date: Date) => {
                                    const newDate: any = customDateFormatDash(date)
                                    setUpdatedDate(newDate)
                                  }}
                                  placeholderText='updated Date'
                                  customInput={
                                    <CustomInput
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position='end'>
                                            <EventNoteIcon />
                                          </InputAdornment>
                                        )
                                      }}
                                      label='Updated date'
                                    />
                                  }
                                />
                              </DatePickerWrapper>
                            </TableCell>

                            <TableCell>
                              <Button
                                variant='contained'
                                onClick={() => {
                                  if (updatedDate != null && newUpdatedStatus != null) {
                                    updateCall({
                                      customerId: user.customerId,
                                      organizationId: user.organizationId,
                                      rollNo: studentInfo.rollNo,
                                      updatedPaymentStatus:
                                        paymentStatusDetails.paymentStatus == 'due' ? 'payed' : 'due',
                                      installmentNumber: paymentStatusDetails.installmentNumber,
                                      studentStatus: studentInfo.studentStatus,
                                      updatedDate: updatedDate
                                    })
                                    setRefundVisible(false)
                                    handleClick()
                                  } else {
                                    setSnackbarColor(false)
                                    setSnackbaropen(true)
                                    setResponseMessage('Fill all the required information')
                                  }
                                }}
                              >
                                save
                              </Button>
                            </TableCell>
                          </Box>
                        </div>
                      </>
                    )}
                  </TableContainer>
                  {refundVisible ? (
                    <div>
                      Make sure that Refunding amount should not exceed{' '}
                      <CustomChip
                        rounded
                        size='small'
                        skin='light'
                        color='error'
                        label={paymentStatusDetails.totalReceivedPayment}
                      />
                      <TableCell>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat='dd/MM/yyyy'
                            value={updatedDate}
                            id='basic-input'
                            popperPlacement={popperPlacement}
                            autoComplete='OFF'
                            onChange={(date: Date) => {
                              const newDate: any = customDateFormatDash(date)
                              setUpdatedDate(newDate)
                            }}
                            placeholderText='updated Date'
                            customInput={
                              <CustomInput
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <EventNoteIcon />
                                    </InputAdornment>
                                  )
                                }}
                                label='Updated date'
                              />
                            }
                          />
                        </DatePickerWrapper>
                      </TableCell>
                      <TableCell>
                        <TextField type='number' onChange={e => setRefundAmount(e.target.value)} />
                      </TableCell>
                      {refundAmount <= paymentStatusDetails?.totalReceivedPayment && updatedDate != null && (
                        <Button
                          variant='contained'
                          onClick={() => {
                            updateCall({
                              customerId: user.customerId,
                              organizationId: user.organizationId,
                              rollNo: studentInfo.rollNo,
                              updatedPaymentStatus: 'refund',
                              installmentNumber: paymentStatusDetails.installmentNumber,
                              studentStatus: studentInfo.studentStatus,
                              refundAmount: refundAmount,
                              updatedDate: updatedDate
                            })
                            setRefundVisible(false)
                            handleClick()
                          }}
                        >
                          save
                        </Button>
                      )}
                    </div>
                  ) : null}
                </Box>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog fullWidth open={showDetailsPopup} maxWidth='sm' scroll='body' sx={{ textAlign: 'center' }}>
              <Card sx={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <CardHeader title='Change Student Status' />
                  <CardHeader
                    title={
                      <Icon
                        onClick={() => {
                          setShowDetailsPopup(false)
                          setPaymentStatusDetails('')
                          setRefundVisible(false)
                          setReinstallmentStatus('')
                        }}
                        style={{ cursor: 'pointer' }}
                        icon='bx:x'
                      />
                    }
                  />
                </div>
                <CardContent>
                  From here you can change student status from{' '}
                  {studentData && (
                    <CustomChip
                      rounded
                      size='small'
                      skin='light'
                      color={studentData?.allPaymentStatus == 'payed' ? 'success' : 'warning'}
                      label={studentData?.allPaymentStatus}
                    />
                  )}{' '}
                  to <hr />
                  {refundVisible && studentData.isPartPayment == false ? (
                    <div>
                      <div>
                        Make sure that Refunding amount should not exceed{' '}
                        <CustomChip
                          rounded
                          size='small'
                          skin='light'
                          color='error'
                          label={studentData && studentData?.totalReceivedPayment}
                        />
                        <TextField type='number' value={refundAmount} onChange={e => setRefundAmount(e.target.value)} />
                        {refundAmount <= studentData?.totalReceivedPayment ? (
                          <Button
                            variant='contained'
                            onClick={() => {
                              setRefundDialog(true)
                              updateCall({
                                customerId: user.customerId,
                                organizationId: user.organizationId,
                                rollNo: studentInfo.rollNo,
                                updatedPaymentStatus: 'refund',
                                installmentNumber: refundIndex,
                                studentStatus: studentInfo.studentStatus,
                                refundAmount: refundAmount,
                                restInstallmentStatus: 'defaulter'
                              })
                              setRefundVisible(false)
                              handleClick()
                            }}
                          >
                            save
                          </Button>
                        ) : (
                          <Button variant='contained' disabled>
                            save
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <Box
                          sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 3, marginBottom: 3 }}
                        ></Box>
                        <Box sx={{ minWidth: 120, marginBottom: 5 }}>
                          <FormControl sx={{ width: '60%' }}>
                            <InputLabel id='demo-simple-select-label'>Update Student Payment Status</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={finalPaymentStatus}
                              label='Update Student Payment Status'
                              onChange={e => setFinalPaymentStatus(e.target.value)}
                            >
                              <MenuItem
                                onClick={() => {
                                  setRefundVisible(true)
                                }}
                                value={'refund'}
                              >
                                Refund
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setRefundVisible(false)
                                }}
                                value={'defaulter'}
                              >
                                Defaulter
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        {refundVisible && (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ width: '60%', marginBottom: 5 }}>
                              <InputLabel id='demo-simple-select-label'>
                                Refund status for remaining installments
                              </InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={restInstallmentStatus}
                                label='Refund status for remaining installments'
                                onChange={e => setReinstallmentStatus(e.target.value)}
                              >
                                <MenuItem value={'due'}>Due</MenuItem>
                                <MenuItem value={'defaulter'}>Defaulter</MenuItem>
                              </Select>
                            </FormControl>
                            <br />
                            Make sure that Refunding amount should not exceed{' '}
                            <CustomChip
                              rounded
                              size='small'
                              skin='light'
                              color='error'
                              label={studentData && studentData?.totalReceivedPayment}
                            />
                            <TableCell>
                              <DatePickerWrapper>
                                <DatePicker
                                  dateFormat='dd/MM/yyyy'
                                  value={updatedDate}
                                  id='basic-input'
                                  popperPlacement={popperPlacement}
                                  autoComplete='OFF'
                                  onChange={(date: Date) => {
                                    const newDate: any = customDateFormatDash(date)
                                    setUpdatedDate(newDate)
                                  }}
                                  placeholderText='updated Date'
                                  customInput={
                                    <CustomInput
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position='end'>
                                            <EventNoteIcon />
                                          </InputAdornment>
                                        )
                                      }}
                                      label='Updated date'
                                    />
                                  }
                                />
                              </DatePickerWrapper>
                            </TableCell>
                            <TableCell>
                              <TextField
                                label='Amount to be Re-funded'
                                sx={{ marginBottom: 5 }}
                                type='number'
                                value={refundAmount}
                                onChange={e => setRefundAmount(e.target.value)}
                              />
                            </TableCell>
                          </Box>
                        )}
                        {finalPaymentStatus == 'defaulter' ? (
                          <Button
                            onClick={() => {
                              updateCall({
                                customerId: user.customerId,
                                organizationId: user.organizationId,
                                rollNo: studentInfo.rollNo,
                                updatedPaymentStatus: 'defaulter',
                                installmentNumber: refundIndex,
                                studentStatus: 'defaulter',
                                refundAmount: refundAmount,
                                restInstallmentStatus: restInstallmentStatus
                              })
                            }}
                            variant='contained'
                          >
                            save
                          </Button>
                        ) : refundAmount <= studentData?.totalReceivedPayment &&
                          restInstallmentStatus &&
                          updatedDate != null ? (
                          <Button
                            variant='contained'
                            onClick={() => {
                              setRefundDialog(true)
                              updateCall({
                                customerId: user.customerId,
                                organizationId: user.organizationId,
                                rollNo: studentInfo.rollNo,
                                updatedPaymentStatus: 'refund',
                                installmentNumber: refundIndex,
                                studentStatus: studentInfo.studentStatus,
                                refundAmount: refundAmount,
                                restInstallmentStatus: restInstallmentStatus,
                                updatedDate: updatedDate
                              })

                              setRefundVisible(false)
                              handleClick()
                            }}
                          >
                            save
                          </Button>
                        ) : (
                          <Button variant='contained' disabled>
                            save
                          </Button>
                        )}
                      </div>
                      <hr />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Dialog>
          )}
        </>
      )}

      <Dialog open={reviewDialogBox}>
        {purpose == 'generate' ? (
          <>
            <DialogTitle>Fill the required information</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    value={slipNumber}
                    required
                    error={submitted ? (slipNumber ? false : true) : false}
                    label='receipt no.'
                    onChange={e => setSlipNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={submitted ? (receivedBy ? false : true) : false}
                    value={receivedBy}
                    required
                    label='received by'
                    onChange={e => setReceivedBy(e.target.value)}
                  />
                </Grid>
                <Grid item xs={8}>
                  <FormControl error={submitted ? (modeOfPayment ? false : true) : false}>
                    <FormLabel id='demo-row-radio-buttons-group-label'>Mode of payment *</FormLabel>
                    <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                      <FormControlLabel
                        onClick={() => setModeOfPayment('Online')}
                        value='Online'
                        control={<Radio />}
                        label='Online'
                      />
                      <FormControlLabel
                        onClick={() => setModeOfPayment('Offline')}
                        value='Offline'
                        control={<Radio />}
                        label='Offline'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant='outlined'
                onClick={() => {
                  setReviewDialogBox(false)
                  setPurpose('')
                  setSubmitted(false)
                  setModeOfPayment('')
                  setSlipNumber('')
                  setReceivedBy('')
                }}
              >
                close
              </Button>
              <Button
                sx={{ ml: 5 }}
                variant='contained'
                onClick={() => {
                  handleFeeSlipMail()
                  setSubmitted(true)
                }}
              >
                Generate
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Are you sure to send mail</DialogTitle>
            <DialogActions>
              <Button
                variant='outlined'
                onClick={() => {
                  setReviewDialogBox(false)
                  setPurpose('')
                }}
              >
                no
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  handleFeeSlipMail()
                }}
              >
                yes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {
        // <Dialog open={view} sx={{ width: '50%' }}>
        //   <DialogContent >
        //     <iframe
        //       title="PDF Viewer"
        //       width="100%"
        //       allow="payment"
        //       height="500px" // Adjust the height as needed
        //       src={`data:application/pdf;base64,${base64String}`}
        //     />
        //   </DialogContent>
        //   <DialogActions>
        //     <Button onClick={() => { setView(false) }}>Close</Button>
        //   </DialogActions>
        // </Dialog>
      }

      {/* dialog for details*/}
      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant='filled'
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

export default StepperCustomVertical
