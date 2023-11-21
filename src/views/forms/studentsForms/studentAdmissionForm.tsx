import { forwardRef, Fragment, useState, ChangeEvent, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Router from 'next/router'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText'
import { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import Icon from 'src/@core/components/icon'
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import StudentReviewPage from 'src/views/apps/review/StudentReview/studentReviewPage'
import PreviewActions from 'src/views/apps/review/StudentReview/AddActions'
import { customDateFormat, customTimeFormat, customDateFormatDash } from 'src/@core/utils/format'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CardHeader from '@mui/material/CardHeader'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import {
  checkStudentEnrollmentNumber,
  createStudentAdmission,
  getCouponList,
  listOrganizationCourse,
  createCourse,
  getAllBatchList,
  createBatch,
  createCoupon,
  couponCountCheck,
  studentWelcomeMail,
  studentFeeSlipMail,
  updateEnquiry
} from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import debounce from 'lodash.debounce'
import EventNoteIcon from '@mui/icons-material/EventNote';

interface PaymentState {
  totalPaymentAmount: number
  partPayment: string
}
interface InstallmentPartPaymentNoState {
  totalReceivedPayment: string
  paymentDescription: string
  paymentReceivedDate: DateType
}
interface InstallmentPartPaymentYesState {
  installmentReceivedDate: DateType
  installmentPaymentDescription: string
  installmentReceivedPayment: number
}
interface StudentInputs {
  dob: DateType
  email: string
  radio: string
  select: string
  lastName: string
  password: string
  textarea: string
  checkbox: boolean
  firstName: string
  fathersName: string
  enrollmentNumber: string
  phoneNumber: string
  fathersPhoneNumber: string
  address: string
}
interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const steps = [
  {
    icon: 'mdi:account-student-outline',
    title: 'Student Details',
    subtitle: 'Enter Student Information'
  },
  {
    icon: 'maki:college',
    title: 'College Details',
    subtitle: 'Enter College Information'
  },
  {
    icon: 'mdi:college',
    title: 'Coaching Details',
    subtitle: 'Enter Coaching Information'
  },
  {
    icon: 'mdi:college',
    title: 'Batch Details',
    subtitle: 'Enter Batch Information'
  },

  {
    icon: 'mdi:account-payment',
    title: 'Payment Details',
    subtitle: 'Enter Payment Information'
  },
  {
    icon: 'material-symbols:attach-money',
    title: 'Installment Details',
    subtitle: 'Enter Installment Information'
  },
  {
    icon: 'material-symbols:rate-review-outline-rounded',
    title: 'Review Details',
    subtitle: 'Check your Filled Details'
  }
]

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))


const defaultCollegeValues = {
  collegeName: '',
  departmentName: '',
  collegeCourse: '',
  collegeSemester: ''
}
const defaultCoachingValues = {
  courseName: '',
  courseDuration: '',
  modeOfClass: '',
  rollNumber: ''
}
const defaultPaymentValues = {
  totalPaymentAmount: 0,
  partPayment: 'false'
}
const defaultInstallmentValuesPartPaymentNo = {
  paymentReceivedDate: null,
  paymentDescription: '',
  totalReceivedPayment: ''
}
const defaultInstallmentValuesPartPaymentYes = {
  installmentReceivedDate: null,
  installmentPaymentDescription: '',
  installmentReceivedPayment: 0
}
const defaultNumberOfInstallmentValues = {
  numberOfInstallments: ''
}

const studentSchema = yup.object().shape({
  firstName: yup.string().matches(/^[A-Z a-z]+$/).max(25).required(),
  email: yup.string().email().required(),
  lastName: yup.string().matches(/^[A-Z a-z]+$/).max(25).required(),
  enrollmentNumber: yup.string().max(10).required(),
  phoneNumber: yup.string().min(10).max(10).required(),
  dob: yup.date().required(),
  fathersName: yup.string().matches(/^[A-Z a-z]+$/).max(50).required(),
  fathersPhoneNumber: yup.string().min(10).max(10).required(),
  address: yup.string().required().max(100)
})
const collegeSchema = yup.object().shape({
  collegeName: yup.string().matches(/^[A-Z a-z]+$/).max(50).required(),
  departmentName: yup.string().matches(/^[A-Z a-z]+$/).max(50).required(),
  collegeCourse: yup.string().matches(/^[A-Z a-z]+$/).max(50).required(),
  collegeSemester: yup.string().max(2).required()
})
const paymentSchema = yup.object().shape({
  totalPaymentAmount: yup.number().required(),
  partPayment: yup.string().required()
})
const InstallmentPartPaymentNoSchema = yup.object().shape({
  paymentDescription: yup.string().max(500).required(),
  paymentReceivedDate: yup.date().required()
})

// no use
const coachingSchema = yup.object().shape({
  // courseName: yup.string().required(),
  // courseDuration: yup.string().required(),
  // modeOfClass: yup.string().required(),
})
const InstallmentPartPaymentYesSchema = yup.object().shape({
  // installmentPaymentDescription: yup.string().required(),
  // installmentReceivedDate: yup.date().required(),
  // installmentReceivedPayment: yup.number().required(),
})
const numberOfInstallmentSchema = yup.object().shape({
  // numberOfInstallments: yup.string().required()
})



const NewInstallmentComponent = (props: any) => {
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const {
    setNextInstallment,
    couponApplied,
    receivedPayment,
    setReceivedPayment,
    arrayForInstallmentdetails,
    setArrayForInstallmentdetails,
    dividedAmountAfterFirstPayment,
    setDividedAmountAfterFirstPayment,
    numberOfInstallment,
    buttonShow,
    setButtonShow,
    nextButtonShow,
    setNextButtonShow
  } = props

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])

  interface InstallmentPartPaymentYesState {
    installmentReceivedDate: DateType
    installmentPaymentDescription: string
    installmentReceivedPayment: number
  }

  const defaultInstallmentValuesPartPaymentYes = {
    installmentReceivedDate: null,
    installmentPaymentDescription: '',
    installmentReceivedPayment: 0
  }

  const InstallmentPartPaymentYesSchema = yup.object().shape({
    installmentPaymentDescription: yup.string().max(500).required(),
    installmentReceivedDate: yup.date().required(),
    installmentReceivedPayment: yup.number().required()
  })

  const {
    control: installmentPartPaymentYesControl,
    getValues: installmentPartPaymentYesValues,
    handleSubmit: handleInstallmentPartPaymentYesSubmit,
    formState: { errors: installmentPartPaymentYesErrors }
  } = useForm<InstallmentPartPaymentYesState>({
    defaultValues: defaultInstallmentValuesPartPaymentYes,
    resolver: yupResolver(InstallmentPartPaymentYesSchema)
  })

  const handleNextChange = () => {
    if (nextButtonShow.length > 0) {
      addItem({ index: props.index, status: true })
    } else {
      setNextButtonShow([...nextButtonShow, { index: props.index, status: true }])
    }
  }

  useEffect(() => {
    if (nextButtonShow.length > numberOfInstallment) {
      if (buttonShow.length > numberOfInstallment) {
        buttonShow.pop()
        setButtonShow(buttonShow)
      }
      for (let i = numberOfInstallment; i < nextButtonShow.length; i++) {
        if (arrayForInstallmentdetails.length > numberOfInstallment) {
          arrayForInstallmentdetails.pop()
          setArrayForInstallmentdetails(arrayForInstallmentdetails)
          nextButtonShow.pop()
          setNextButtonShow(nextButtonShow)
        }
      }
    }

    for (let i = 0; i < arrayForInstallmentdetails.length; i++) {
      if (i > 0 && arrayForInstallmentdetails[i]) {
        arrayForInstallmentdetails[i].installmentReceivedPayment =
          (parseInt(couponApplied) - parseInt(receivedPayment)) / (numberOfInstallment - 1)
        setArrayForInstallmentdetails(arrayForInstallmentdetails)
      }
    }
  }, [numberOfInstallment])

  const onSubmit = () => {
    if (receivedPayment < couponApplied) {
      setSnackbarColor(true)
      setSnackbaropen(true)
      setResponseMessage(`Installment ${props.index + 1} Saved`)
      handleNextChange()
      buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)].color = '#54B435'
      setButtonShow(buttonShow)
      let data: any = installmentPartPaymentYesValues()
      let dummyArrayOfData: any = arrayForInstallmentdetails
      if (props.index == 0) {
        dummyArrayOfData[props.index] = {
          installmentPaymentDescription: data.installmentPaymentDescription,
          installmentReceivedDate: data.installmentReceivedDate,
          installmentReceivedPayment: parseInt(receivedPayment),

        }

        for (let i = 0; i < dummyArrayOfData.length; i++) {
          if (i != 0 && dummyArrayOfData[i]) {
            dummyArrayOfData[i].installmentReceivedPayment = parseInt(dividedAmountAfterFirstPayment)
          }
        }
      }
      else {
        dummyArrayOfData[props.index] = {
          installmentPaymentDescription: data.installmentPaymentDescription,
          installmentReceivedDate: data.installmentReceivedDate,
          installmentReceivedPayment: parseInt(dividedAmountAfterFirstPayment)
        }
      }

      setArrayForInstallmentdetails(dummyArrayOfData)

      setNextInstallment(true)
    }

    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage(`Amount should be less then total fee`)
    }
  }

  useEffect(() => {
    if (couponApplied && numberOfInstallment && props.index == 0) {
      let couponAppliedValue: any = Math.ceil(parseInt(couponApplied) / parseInt(numberOfInstallment))
      couponAppliedValue = parseInt(couponAppliedValue)
      setReceivedPayment(couponAppliedValue)
    }
  }, [])


  useEffect(() => {
    if (receivedPayment || numberOfInstallment) {
      setDividedAmountAfterFirstPayment(Math.ceil(parseInt(couponApplied) - parseInt(receivedPayment)) / (numberOfInstallment - 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedPayment, dividedAmountAfterFirstPayment, numberOfInstallment])

  const addItem = (newItem: any) => {
    const isDuplicate = nextButtonShow.some(
      (item: any) => item.index === newItem.index && item.status === newItem.status
    )
    if (!isDuplicate) {
      setNextButtonShow([...nextButtonShow, { index: props.index, status: true }])
    }
  }



  const addSaveItem = (newItem: any) => {
    const isDuplicate = buttonShow.some((item: any) => item.index === newItem.index && item.status === newItem.status)
    if (!isDuplicate) {
      setButtonShow([...buttonShow, { index: props.index, status: true, color: '#3C79F5' }])
    } else {
      if (buttonShow.findIndex((o: any) => o.index == props.index) >= 0) {
        buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)].color = '#3C79F5'
        setButtonShow([...buttonShow])

        if (nextButtonShow.findIndex((o: any) => o.index == props.index) >= 0) {
          const nextButtonNewArray = nextButtonShow.filter((o: any) => o.index != props.index)
          setNextButtonShow(nextButtonNewArray)
        }
      }
    }
  }

  return (
    <form onSubmit={handleInstallmentPartPaymentYesSubmit(onSubmit)}>
      <Grid container spacing={5} mt={1}>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Installment {props.index + 1} :
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <DatePickerWrapper>
            <Controller
              name='installmentReceivedDate'
              control={installmentPartPaymentYesControl}
              rules={{ required: true }}

              render={({ field: { value, onChange } }) => (
                <>
                  <DatePicker
                    {...props}
                    dateFormat="dd/MM/yyyy"
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    autoComplete='OFF'
                    placeholderText='MM/DD/YYYY'
                    onCalendarOpen={() => addSaveItem({ index: props.index, status: true, color: '#3C79F5' })}
                    // minDate={new Date()}
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Installment date'
                        error={Boolean(installmentPartPaymentYesErrors.installmentReceivedDate)}
                        aria-describedby='validation-basic-installmentReceivedDate'
                        InputProps={{
                          endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                        }}
                      />

                    }
                  />

                </>
              )}
            />
          </DatePickerWrapper>
          {installmentPartPaymentYesErrors.installmentReceivedDate && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-installmentReceivedDate'>
              Required, installment date
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <Controller
              name='installmentPaymentDescription'
              control={installmentPartPaymentYesControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Payment description'
                  onChange={onChange}

                  autoComplete='OFF'
                  onClickCapture={() => {
                    addSaveItem({ index: props.index, status: true, color: '#3C79F5' })
                  }}
                  placeholder='Payment description'
                  inputProps={{
                    maxLength: 500,
                  }}
                  error={Boolean(installmentPartPaymentYesErrors.installmentPaymentDescription)}
                  aria-describedby='stepper-linear-account-installmentPaymentDescription'
                />
              )}
            />
            {installmentPartPaymentYesErrors.installmentPaymentDescription && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-installmentPaymentDescription'>
                Required, max 500 chars
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <Controller
              name='installmentReceivedPayment'
              control={installmentPartPaymentYesControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={props.index == 0 ? receivedPayment ? receivedPayment : value : dividedAmountAfterFirstPayment}
                  label='Received payment'
                  required
                  onChange={props.index == 0 ? (e: any) => { setReceivedPayment(e.target.value) } : onChange}
                  onClickCapture={props.index == 0 ? () => { addSaveItem({ index: props.index, status: true, color: "#3C79F5" }) } : undefined}
                  placeholder='Received payment'
                  disabled={props.index != 0 ? true : false}
                  error={Boolean(installmentPartPaymentYesErrors.installmentReceivedPayment)}
                  aria-describedby='stepper-linear-account-installmentReceivedPayment'
                  autoComplete='OFF'
                />
              )}
            />
            {installmentPartPaymentYesErrors.installmentReceivedPayment && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-installmentReceivedPayment'>
                Required, payment cannot be negative
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button
            size='large'
            type='submit'
            variant='contained'
            style={{
              color: 'white',
              backgroundColor:
                props.index == buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.index &&
                buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.color
            }}
            disabled={
              buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.index == props.index &&
                buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.status == true
                ? false
                : true
            }
          >
            Save
          </Button>
        </Grid>
      </Grid>
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
    </form>
  )
}

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === 'Student' && obj?.action?.includes('create'))) {
        Router.push('/404')
      }
    }
  }, [permission])
  return <></>
}

const studentAdmissionForm = () => {

  const [defaultStudentValues, setDefaultStudentValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: null,
    fathersName: '',
    fathersPhoneNumber: '',
    address: ''
  });

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 5);
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date(currentDate);
  maxDate.setMonth(11, 31);

  const randomID = uuidv4().slice(0, 5)
  const [courseName, setCourseName] = useState<string[]>([])
  const [batchName, setBatchName] = useState<string[]>([])
  const [courseValueFee, setCourseValueFee] = useState<any>()
  const [courseListData, setCourseListData] = useState<any>([])
  const [couponListData, setCouponListData] = useState<any>()
  const [coupon, setCoupon] = useState<any>()
  const [couponType, setCouponType] = useState<any>()
  const [firstPaymentStatus, setFirstPaymentStatus] = useState<any>('payed')
  const [maxInstallment, setMaxInstallment] = useState<any>()
  const [maxInstallmentArray, setMaxInstallmentArray] = useState<any>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [paymentInfo, setPaymentInfo] = useState<PaymentState>({
    totalPaymentAmount: 0,
    partPayment: 'false'
  })
  const [numberOfInstallment, setNumberOfInstallment] = useState<number>(-1)
  const [numberOfInstallmentArray, setNumberOfInstallmentArray] = useState<any>([])
  const [firstPayment, setFirstPayment] = useState<any>()
  const [dividedAmount, setDividedAmount] = useState<number>(0)
  const [dividedAmountAfterFirstPayment, setDividedAmountAfterFirstPayment] = useState<number>(0)
  const [nextInstallment, setNextInstallment] = useState<any>()
  const [arrayForInstallmentdetails, setArrayForInstallmentdetails] = useState<any>([])
  const [receivedPayment, setReceivedPayment] = useState<any>()
  const [user, setUser] = useState<any>()
  const [rollNumberFirstPart, setRollNumberFirstPart] = useState<any>()
  const [rollNumberLastPart, setRollNumberLastPart] = useState<any>()
  const [fullRollNumber, setFullRollNumber] = useState<any>()
  const [open, setOpen] = useState<any>({ open: false, mssg: '' })
  const [buttonShow, setButtonShow] = useState([])
  const [nextButtonShow, setNextButtonShow] = useState([])
  const [openCourseDialog, setOpenCourseDialog] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [updationData, setUpdationData] = useState<any>({})
  const [couponValueData, setCouponValueData] = useState<any>()
  const [couponApplied, setCouponApplied] = useState<any>()
  // const [startTime, setStartTime] = useState<DateType>(new Date())
  // const [endTime, setEndTime] = useState<DateType>(new Date())
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [batchData, setBatchData] = useState<any>({
    batchName: '',
    batchDescription: '',
    batchClassStartTime: '',
    batchClassEndTime: '',
    batchStartDate: '',
    batchEndDate: '',
    batchMode: ''
  })
  const [listBatch, setListBatch] = useState<any>([])
  const [openBatchDialog, setOpenBatchDialog] = useState<boolean>(false)
  const [openCouponDialog, setOpenCouponDialog] = useState<boolean>(false)
  const [couponDate, setCouponDate] = useState<any>('None')
  const [couponData, setCouponData] = useState<any>({
    couponDescription: '',
    couponName: '',
    couponValue: '',
    couponCount: ''
  })
  const [coupounApply, setCoupounApply] = useState<any>('No')
  const [openPopPop, setOpenPopPop] = useState<any>(false)
  const [submit, setSubmit] = useState<boolean>(false)
  const [coupounDataFormat, setCoupounDataFormat] = useState<any>([])
  const [courseDataFormat, setCourseDataFormat] = useState<any>([])
  const [batchDataFormat, setBatchDataFormat] = useState<any>([])
  const router = useRouter()
  const [permission, setPermission] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [toSetTime, setToSetTime] = useState<any>('yes')
  const [toSetDate, setToSetDate] = useState<any>('yes')
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [emptyField, setEmptyField] = useState<any>(false)
  const [studentEnrollmentNumber, setStudentEnrollmentNumber] = useState('');
  const [startTime, setStartTime] = useState<any>(null)
  const [endTime, setEndTime] = useState<any>(null)
  const [batchTime, setBatchTime] = useState<any>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const handleSelectChange: any = (event: SelectChangeEvent<typeof courseName>) => {
    setCourseName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }

  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const data = localStorage.getItem("organizationLogo")
    if (data) {
      setOrganizationLogo(JSON.parse(data).logo)
    }
  }, [])

  const handleBatchSelectChange: any = (event: SelectChangeEvent<typeof batchName>) => {
    setBatchName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }
  const [createCourseError, setCreateCourseError] = useState<any>({
    courseName: false,
    courseDescription: false,
    courseFee: false,
    courseFeeDescription: false
  })

  const handleButtonClick = () => {
    setSubmit(true)
    handleApi()
  }

  useEffect(() => {
    if (courseName) {
      let valueFee = 0
      for (let singleObject of courseListData) {
        for (let singleCourse of courseName) {
          if (singleObject.courseName == singleCourse) {
            valueFee += parseInt(singleObject.courseFee)
          }
        }
      }
      setCourseValueFee(valueFee)
    }
  }, [batchName, courseName])

  useEffect(() => {
    const localStorageDataString = localStorage.getItem('enquiryStudent');
    if (localStorageDataString) {
      const localStorageData = JSON.parse(localStorageDataString)
      setUpdationData({ ...localStorageData, status: "inActive" })

      Object.keys(localStorageData).forEach((key) => {
        switch (key) {
          case "studentName":

            setValue("firstName", localStorageData[key].split(" ")[0]);
            setValue("lastName", localStorageData[key].split(" ")[localStorageData[key].split(" ").length - 1]);
            break;
          case "parentName":
            setValue("fathersName", localStorageData[key]);
            break;
          case "parentContact":
            setValue("fathersPhoneNumber", localStorageData[key]);
            break;
          case "email":
            setValue("email", localStorageData[key]);
            break;
          case "mobileNumber":
            setValue("phoneNumber", localStorageData[key]);
            break;

          default:
            // setValue(key, localStorageData[key]);
            break;
        }
      });
    }
  }, []);

  useEffect(() => {
    let maxInstallment: any = 0
    if (courseName) {
      for (let singleObject of courseListData) {
        for (let singleCourse of courseName) {
          if (singleObject.courseName == singleCourse) {
            if (singleObject.maxPaymentInstallment > maxInstallment) {
              maxInstallment = singleObject.maxPaymentInstallment
            }
          }
        }
      }
    }

    setMaxInstallment(maxInstallment)
  }, [courseName])

  useEffect(() => {
    let array: any = []
    if (maxInstallment) {
      for (let i = 0; i < maxInstallment; i++) {
        array.push(i + 1)
      }
    }
    setMaxInstallmentArray(array)
  }, [maxInstallment])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450
      }
    }
  }

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (!isFormComplete && !isNavigating) {
        if (studentValues().firstName || studentValues().enrollmentNumber ||
          studentValues().lastName || studentValues().email || studentValues().phoneNumber || studentValues().fathersName
          || studentValues().address || studentValues().fathersPhoneNumber) {
          if (confirm('You have an incomplete form. Are you sure you want to leave?')) {
            localStorage.removeItem("enquiryStudent")
            setIsNavigating(true);
            router.push(url);
          }
          else {
            // Prevent navigation
            router.events.emit('routeChangeError');
            throw 'routeChange aborted';
          }
        }
        else {
          setIsNavigating(true);
          router.push(url);
        }

      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [isFormComplete, isNavigating, router]);

  // ** Variables

  const installmentArray: any = []

  const dispatch = useDispatch()

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  useEffect(() => {
    if (couponValueData && courseValueFee) {
      if (couponValueData.couponType == 'Percentage') {
        setCouponApplied(
          Math.ceil(
            parseInt(courseValueFee) - (parseInt(courseValueFee) * parseInt(couponValueData.couponValue)) / 100
          )
        )
      } else {
        setCouponApplied(Math.ceil(parseInt(courseValueFee) - parseInt(couponValueData.couponValue)))
      }
    } else {
      setCouponApplied(parseInt(courseValueFee))
    }
  }, [courseValueFee, couponValueData])

  const [courseDetails, setCourseDetails] = useState<any>({
    courseName: '',
    courseDescription: '',
    courseFee: null,
    courseFeeDescription: '',
    maxPaymentInstallment: 2
  })

  // ** functions
  const handleCouponApplyChange = (e: any) => {
    if (e.target.value == 'Yes') {
      setCoupounApply(e.target.value)
    } else {
      setCouponApplied(courseValueFee)
      setCoupon('')
      setCouponValueData("")
      setCoupounApply('No')
    }
  }

  const onCouponChange = (e: any) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value
    })
  }

  const handleRadioChange = (event: any) => {
    setCouponType(event.target.value)
  }

  const handleDateChange = (event: any) => {
    setCouponDate(event.target.value)
  }

  const createBatchSubmit = () => {
    if (batchTime == false) {
      const data: any = []
      if (user) {
        const customerId = user.customerId
        const organizationId = user.organizationId
        data.push(batchData)

        if (data.length > 0) {

          if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })
                setSubmitted(false)
                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })

                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {

                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })

                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })

                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }

          else {
            setSnackbarColor(false)
            setOpen({ open: true, mssg: "Fill all the required information" })

          }
        }
      }
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time" })
    }
  }


  const listBatchApiCall = () => {
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId

      getAllBatchList(customerId, organizationId)
        .then((res: any) => {
          setListBatch(res.data)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  const listCouponApiCall = () => {


    if (user) {


      const customerId = user.customerId
      const organizationId = user.organizationId
      getCouponList(customerId, organizationId)
        .then((res: any) => {

          setCouponListData(res.data)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  const createCouponApi = (e: any) => {
    e.preventDefault()
    couponData.couponValue = parseInt(couponData.couponValue)
    const useCouponCount = 0
    const couponApiData: any = {
      customerId: user ? user.customerId : '',
      organizationId: user ? user.organizationId : '',
      coupons: [
        {
          couponName: couponData.couponName,
          couponValue: couponData.couponValue,
          couponCount: couponData.couponCount,
          couponType: couponType,
          useCouponCount: useCouponCount,
          couponLimit: couponDate,
          couponDescription: couponData.couponDescription,
          couponExpiryDate: startDate
            ? `${('0' + startDate.getDate()).slice(-2)}/${('0' + (startDate.getMonth() + 1)).slice(
              -2
            )}/${startDate.getFullYear()}`
            : ''
        }
      ]
    }

    if (
      couponData.couponName == '' ||
      couponType == '' ||
      couponData.couponDescription == '' ||
      couponData.couponValue == '' ||
      couponDate == ''
    ) {
      setSnackbarColor(false)

      setOpen({ open: true, mssg: "Fill  all the required information" })
    }

    if (couponType == 'Flat' && parseInt(couponData.couponValue) > 0) {
      createCoupon(couponApiData).then((res: any) => {
        setSnackbarColor(true)
        setOpen({ open: true, mssg: "Coupon created successfully" })
        setSubmitted(false)
        setCouponData(res.data.data)
        setCouponData({
          couponDescription: '',
          couponName: '',
          couponValue: '',
          couponCount: ''
        })
        setCouponType('')
        setCouponDate('None')
        listCouponApiCall()
        handleCouponDialogClose()
      })
    }
    else if (couponType == 'Percentage' && parseInt(couponData.couponValue) > 0 && parseInt(couponData.couponValue) <= 100) {
      createCoupon(couponApiData).then((res: any) => {
        setSnackbarColor(true)
        setOpen({ open: true, mssg: "Coupon created successfully" })
        setSubmitted(false)
        setCouponData(res.data.data)
        setCouponData({
          couponDescription: '',
          couponName: '',
          couponValue: '',
          couponCount: ''
        })
        setCouponType('')
        setCouponDate('None')
        listCouponApiCall()
        handleCouponDialogClose()
      })
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: "Coupon value must be greater than 0 and less than 100" })
    }
  }

  const handleClickBatchDialogOpen = () => setOpenBatchDialog(true)
  const handleClickCouponDialogOpen = () => setOpenCouponDialog(true)
  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value })
  }
  const handleBatchDialogClose = () => {
    setBatchData({
      ...batchData,
      batchName: '',
      batchDescription: '',
      batchClassStartTime: '',
      batchClassEndTime: '',
      batchStartDate: '',
      batchEndDate: '',
      batchMode: ''
    })
    setStartTime(null)
    setEndTime(null)
    setStartDate(null)
    setEndDate(null)

    setOpenBatchDialog(false)
  }
  const handleCouponDialogClose = () => {
    setOpenCouponDialog(false)
  }

  const handleClickOpen = () => setOpenCourseDialog(true)

  const handleCourseDialogClose = () => {
    setCourseDetails({
      ...courseDetails,
      courseDescription: '',
      courseFee: null,
      courseName: '',
      courseFeeDescription: '',
      maxPaymentInstallment: 2
    })
    setOpenCourseDialog(false)
  }


  const courseChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value })

  }

  const formCourseSubmit = () => {

    if (user) {
      let customerId = user.customerId
      let organizationId = user.organizationId

      if (courseDetails.courseName !== '' && !isNaN(courseDetails.courseFee) && courseDetails.courseFee > 0 && courseDetails.courseFeeDescription) {
        createCourse({ id: organizationId, customerId: customerId, courseDetails: courseDetails })
          .then((res: any) => {
            if (res.data.statusCode == 200) {
              setSubmitted(false)
              setSnackbarColor(true)
              setOpen({ open: true, mssg: "Course added successfully" })
              listCourse()
            } else {

              setSnackbarColor(false)
              setOpen({ open: true, mssg: "Fill all the required information" })
            }
          })
          .catch((err: any) => console.log(err))
        setCourseDetails({
          ...courseDetails,
          courseDescription: '',
          courseFee: null,
          courseName: '',
          courseFeeDescription: '',
          maxPaymentInstallment: 2
        })
        handleCourseDialogClose()
      }
      else if (!isNaN(courseDetails.courseFee) && courseDetails.courseFee < 0) {
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Course fee must be a positive number" })
      }
      else {

        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Fill all the required information" })
      }
    }
  }

  // **Effects

  useEffect(() => {
    listBatchApiCall()
    listCouponApiCall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    setStartTime(null)
    setEndTime(null)
    setStartDate(null)
    setEndDate(null)
    setBatchData({
      batchName: '',
      batchDescription: '',
      batchClassStartTime: '',
      batchClassEndTime: '',
      batchStartDate: '',
      batchEndDate: '',
      batchMode: ''
    })
  }, [])

  useEffect(() => {
    if (startDate) {
      batchData.batchStartDate = customDateFormat(startDate)
      setBatchData(batchData)
    }

    if (endDate) {
      batchData.batchEndDate = customDateFormat(endDate)
      setBatchData(batchData)
    }

    if (endTime) {
      batchData.batchClassEndTime = customTimeFormat(endTime)
      setBatchData(batchData)
    }

    if (startTime) {
      batchData.batchClassStartTime = customTimeFormat(startTime)
      setBatchData(batchData)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, startDate, endDate])

  const listCourse = () => {
    if (user) {
      let customerId = user.customerId
      let organizationId = user.organizationId
      if (customerId && organizationId) {
        dispatch(listOrganizationCourse({ organizationId, customerId })).then((res: any) => {
          if (res?.payload?.data?.data.length > 0) {
            setCourseListData(res.payload.data.data)
          }
        })
      }
    }
  }

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
      listCourse()
    }
  }, [user])

  useEffect(() => {
    if (rollNumberLastPart) {
      let finalRollNumber = rollNumberFirstPart + rollNumberLastPart
      setFullRollNumber(finalRollNumber)
    } else {
      let finalRollNumber = rollNumberFirstPart + rollNumberLastPart
      setFullRollNumber(finalRollNumber)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollNumberLastPart])

  useEffect(() => {
    for (let i = 0; i < numberOfInstallment; i++) {
      installmentArray.push(defaultInstallmentValuesPartPaymentYes)
    }
    setNumberOfInstallmentArray(installmentArray)

    let amount: any = Math.ceil(courseValueFee / numberOfInstallment)
    amount = parseInt(amount)

    setDividedAmount(amount)

    setFirstPayment(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfInstallment])

  useEffect(() => {
    if (courseValueFee > 0) {
      setDividedAmountAfterFirstPayment(Math.ceil((parseInt(courseValueFee) - parseInt(firstPayment)) / (numberOfInstallment - 1)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPayment])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    const organizationId = user ? user.organizationId : ''
    let studentAdorment = organizationId.split('-')
    setRollNumberFirstPart(studentAdorment[0] + '-')
  }, [user])

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  // ** Hooks

  const {
    reset: studentReset,
    control,
    getValues: studentValues,
    handleSubmit: handleStudentSubmit,
    setValue,
    formState: { errors: studentErrors }
  } = useForm<StudentInputs>({
    defaultValues: defaultStudentValues,
    resolver: yupResolver(studentSchema)
  })
  const {
    reset: collegeReset,
    control: collegeControl,
    getValues: collegeValues,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: collegeErrors }
  } = useForm({
    defaultValues: defaultCollegeValues,
    resolver: yupResolver(collegeSchema)
  })
  const {
    reset: coachingReset,
    control: coachingControl,
    getValues: coachingValues,
    handleSubmit: handleCoachingSubmit,
    formState: { errors: coachingErrors }
  } = useForm({
    defaultValues: defaultCoachingValues,
    resolver: yupResolver(coachingSchema)
  })
  const {
    reset: paymentReset,
    control: paymentControl,
    getValues: paymentValues,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors }
  } = useForm({
    defaultValues: defaultPaymentValues,
    resolver: yupResolver(paymentSchema)
  })
  const {
    reset: installmentPartPaymentNoReset,
    control: installmentPartPaymentNoControl,
    getValues: installmentPartPaymentNoValues,
    handleSubmit: handleInstallmentPartPaymentNoSubmit,
    formState: { errors: installmentPartPaymentNoErrors }
  } = useForm<InstallmentPartPaymentNoState>({
    defaultValues: defaultInstallmentValuesPartPaymentNo,
    resolver: yupResolver(InstallmentPartPaymentNoSchema)
  })
  const {
    reset: numberOfInstallmentReset,
    control: numberOfInstallmentControl,
    getValues: numberOfInstallmentValues,
    handleSubmit: handleNumberOfInstallmentSubmit,
    formState: { errors: numberOfInstallmentErros }
  } = useForm({
    defaultValues: defaultNumberOfInstallmentValues,
    resolver: yupResolver(numberOfInstallmentSchema)
  })

  const {
    reset: installmentPartPaymentYesReset,
    control: installmentPartPaymentYesControl,
    getValues: installmentPartPaymentYesValues,
    handleSubmit: handleInstallmentPartPaymentYesSubmit,
    formState: { errors: installmentPartPaymentYesErrors }
  } = useForm<InstallmentPartPaymentYesState>({
    defaultValues: defaultInstallmentValuesPartPaymentYes,
    resolver: yupResolver(InstallmentPartPaymentYesSchema)
  })



  const handleConfirmation = () => {
    if (activeStep == 5) {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    } else if (activeStep == 6) {
      setActiveStep(prevActiveStep => prevActiveStep - 2)
    }
    let emptyArray: any = []
    setArrayForInstallmentdetails(emptyArray)
    setNextButtonShow(emptyArray)
    setNextInstallment(false)
    setFirstPaymentStatus('payed')
    setNumberOfInstallment(-1)
    setOpenPopPop(false)
    setButtonShow(emptyArray)
  }

  const handleConfirmationCancel = () => {
    setOpenPopPop(false)
  }

  // Handle Stepper
  const handleBack = () => {
    if (activeStep == 5 || activeStep == 6) {
      setOpenPopPop(true)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
  }
  const handleReset = () => {
    
    setActiveStep(0)
    coachingReset({ courseName: '', courseDuration: '', modeOfClass: '', rollNumber: '' })
    studentReset({
      email: '',
      firstName: '',
      lastName: '',
      enrollmentNumber: '',
      dob: null,
      fathersName: '',
      phoneNumber: '',
      fathersPhoneNumber: '',
      address: ''
    })
    collegeReset({ collegeName: '', departmentName: '', collegeCourse: '', collegeSemester: '' })
    paymentReset({ totalPaymentAmount: 0, partPayment: 'false' })
    installmentPartPaymentNoReset({ paymentDescription: '', totalReceivedPayment: '', paymentReceivedDate: null })
    installmentPartPaymentYesReset({
      installmentPaymentDescription: '',
      installmentReceivedPayment: 0,
      installmentReceivedDate: null
    })
    numberOfInstallmentReset({ numberOfInstallments: '' })
  }

  const apiCallCreateStudent = debounce(() => {
    let count = 0
    let installmentDetailsArray = []
    let batchIds = []
    let coursesIds = []

    for (let singleObj of batchDataFormat) {
      let newObj = {
        batchId: singleObj.batchId,
        batchStatus: singleObj.batchStatus
      }
      batchIds.push(newObj)
    }

    for (let singleObj of courseDataFormat) {
      let newObj = {
        courseId: singleObj.courseId,
        courseStatus: singleObj.courseStatus
      }
      coursesIds.push(newObj)
    }

    for (let singleObj of arrayForInstallmentdetails) {
      let obj: any = {}
      if (count == 0 && firstPaymentStatus == 'payed') {
        count++
        obj.installmentNumber = count
        obj.paymentStatus = 'payed'
        obj.paymetReceiveDate = customDateFormatDash(singleObj.installmentReceivedDate)
        obj.paymentNotes = singleObj.installmentPaymentDescription
        obj.receivedPayment = parseInt(singleObj.installmentReceivedPayment)
        installmentDetailsArray.push(obj)
      } else {
        count++
        obj.installmentNumber = count
        obj.paymentStatus = 'due'
        obj.nextpaymetDate = customDateFormatDash(singleObj.installmentReceivedDate)
        obj.paymentNotes = singleObj.installmentPaymentDescription
        obj.duePayment = parseInt(singleObj.installmentReceivedPayment)
        installmentDetailsArray.push(obj)
      }
    }

    let dateOfBirth: any = studentValues().dob
    dateOfBirth = customDateFormatDash(dateOfBirth)

    if (paymentValues().partPayment == 'true') {
      let studentData = {
        customerId: user.customerId,
        organizationId: user.organizationId,
        studentFirstName: studentValues().firstName,
        studentLastName: studentValues().lastName,
        studentEmail: studentValues().email,
        studentEnrollmentNumber: studentValues().enrollmentNumber,
        studentDateOfBirth: dateOfBirth,
        studentContact: studentValues().phoneNumber,
        studentFatherName: studentValues().fathersName,
        studentFatherContact: studentValues().fathersPhoneNumber,
        studentAddress: studentValues().address,
        studentDepartmentName: collegeValues().departmentName,
        studentCourse: collegeValues().collegeCourse,
        studentCollage: collegeValues().collegeName,
        studentSemester: collegeValues().collegeSemester,
        rollNo: rollNumberFirstPart + randomID,
        coachingCourseName: coachingValues().courseName,
        courseDuration: coachingValues().courseDuration,
        modeOfClass: coachingValues().modeOfClass,
        courses: coursesIds,
        batch: batchIds,
        coupon: coupounDataFormat,
        paymentDetails: {
          isPartPayment: Boolean(paymentValues().partPayment),
          totalPayment: parseInt(courseValueFee),
          allPaymentStatus: firstPaymentStatus,
          paymetReceiveDate: installmentPartPaymentNoValues().paymentReceivedDate,
          discountedPaymentAmount: parseInt(couponApplied),
          paymentNotes: installmentPartPaymentNoValues().paymentDescription,
          installmentDetails: installmentDetailsArray
        }
      }

      createStudentAdmission(studentData)
        .then((res: any) => {
          if (res.data.statusCode == 200) {
            if (updationData) {
              let newData = {
                status: "Student",
                ...updationData
              }
              updateEnquiry(newData)
            }
            if (

              coupounDataFormat[0] &&
              (coupounDataFormat[0].couponLimit == 'Both' || coupounDataFormat[0].couponLimit == 'couponCount')
            ) {
              couponCountCheck(user.customerId, user.organizationId, coupounDataFormat[0].couponId)

            }
            setOpen({ open: true, mssg: res.data.message })
            studentWelcomeMail({
              organizationName: user.organizationName,
              studentEmail: studentValues().email,
              studentName: `${studentValues().firstName} ${studentValues().lastName}`,
              courseName: coachingValues().courseName,
              courseTiming: '',
              courseStartDate: '',
              organizationMail: user.organizationEmail,
              organizationLogo: organizationLogo
            })
            router.push('/student/studentList/')
          } else {
            setOpen({ open: true, mssg: res.data.message })
          }
          setSnackbarColor(true)
          setOpen({ open: true, mssg: "Form submitted successfully" })
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      let date: any = installmentPartPaymentNoValues().paymentReceivedDate
      date = customDateFormatDash(date)

      let studentData = {
        customerId: user.customerId,
        organizationId: user.organizationId,
        studentFirstName: studentValues().firstName,
        studentLastName: studentValues().lastName,
        studentEmail: studentValues().email,
        studentEnrollmentNumber: studentValues().enrollmentNumber,
        studentDateOfBirth: dateOfBirth,
        studentContact: studentValues().phoneNumber,
        studentFatherName: studentValues().fathersName,
        studentFatherContact: studentValues().fathersPhoneNumber,
        studentAddress: studentValues().address,
        studentDepartmentName: collegeValues().departmentName,
        studentCourse: collegeValues().collegeCourse,
        studentCollage: collegeValues().collegeName,
        studentSemester: collegeValues().collegeSemester,
        rollNo: rollNumberFirstPart + randomID,
        courses: coursesIds,
        batch: batchIds,
        coupon: coupounDataFormat,
        coachingCourseName: coachingValues().courseName,
        courseDuration: coachingValues().courseDuration,
        modeOfClass: coachingValues().modeOfClass,
        paymentDetails: {
          isPartPayment: Boolean(paymentValues().partPayment) ? false : '',
          totalPayment: parseInt(courseValueFee),
          allPaymentStatus: firstPaymentStatus,
          discountedPaymentAmount: parseInt(couponApplied),
          totalReceivedPayment: parseInt(couponApplied),
          paymetReceiveDate: date,
          paymentNotes: installmentPartPaymentNoValues().paymentDescription,
          installmentDetails: []
        }
      }
      createStudentAdmission(studentData)
        .then((res: any) => {
          if (res.data.statusCode == 200) {
            if (updationData) {
              let newData = {
                status: "Student",
                ...updationData
              }
              updateEnquiry(newData)
            }
            studentWelcomeMail({
              organizationName: user.organizationName,
              studentEmail: studentValues().email,
              studentName: `${studentValues().firstName} ${studentValues().lastName}`,
              courseName: coachingValues().courseName,
              courseTiming: '',
              courseStartDate: '',
              organizationLogo: organizationLogo
            })
            if (
              coupounDataFormat[0] &&
              (coupounDataFormat[0].couponLimit == 'Both' || coupounDataFormat[0].couponLimit == 'couponCount')
            ) {
              couponCountCheck(user.customerId, user.organizationId, coupounDataFormat[0].couponId)

            }
            setOpen({ open: true, mssg: res.data.message })
            router.push('/student/studentList/')
          } else {
            setOpen({ open: true, mssg: res.data.message })
          }
          setSnackbarColor(true)
          setOpen({ open: true, mssg: "Form submitted successfully" })
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }, 300)

  const handleApi = () => {
    if (!loading) {
      setLoading(true)
      // Call the debounced API function
      apiCallCreateStudent()
    }
  }




  const onSubmit: any = () => {

    let customerId = user.customerId
    let organizationId = user.organizationId
    if (activeStep == 0) {
      checkStudentEnrollmentNumber({ customerId: customerId, studentEnrollmentNumber: studentValues().enrollmentNumber, organizationId: organizationId })

        .then((res: any): any => {
          if (res.data.statuscode == 200) {
            setActiveStep(activeStep + 1)

            if (activeStep === steps.length - 1) {
              setSnackbarColor(true)
              setOpen({ open: true, mssg: "Form submitted successfully" })
            }
          }
          else if (res.data.statusCode == 409) {
            setSnackbarColor(false)
            setOpen({ open: true, mssg: res.data.message })
          }
        })
        .catch((err: any) => console.log(err))
    }
    else {
      if (activeStep == 5) {
        if (paymentValues().partPayment == 'false') {
          let installmentArray: any = []
          setArrayForInstallmentdetails(installmentArray)
        }

        let course = []

        for (let singleobj of courseListData) {
          for (let singleCourse of courseName) {
            if (singleobj.courseName == singleCourse) {
              singleobj.isFirstEntry = true
              delete singleobj.dateCreated
              delete singleobj.courseDescription
              delete singleobj.courseFeeDescription
              course.push(singleobj)
            }
          }
        }

        setCourseDataFormat(course)

        let batch = []

        if (batchName.length > 0) {
          for (let singleBatch of listBatch) {
            for (let singleBatchName of batchName) {
              if (singleBatch.batchName == singleBatchName) {
                delete singleBatch.batchDescription
                delete singleBatch.dateCreated
                batch.push(singleBatch)
              }
            }
          }
        }

        setBatchDataFormat(batch)

        let coupon = []

        if (couponValueData && coupounApply == 'Yes') {
          coupon.push(couponValueData)
        }

        setCoupounDataFormat(coupon)
      }
      if (activeStep == 4) {
        if (couponApplied == 0 && paymentValues().partPayment == "true") {
          setSnackbarColor(false)
          setOpen({ open: true, mssg: "Unable to create installments switch to part payment no" })
        } else {
          setActiveStep(activeStep + 1)
        }
      }
      setPaymentInfo(paymentValues())
      if (activeStep != 4) {
        setActiveStep(activeStep + 1)
      }
      if (activeStep === steps.length - 1) {
        setSnackbarColor(true)
        setOpen({ open: true, mssg: "Form submitted successfully" })
      }
    }
  }
  useEffect(() => {
    setIsFormComplete(false)
  }, [studentValues().firstName, studentValues().enrollmentNumber])

  const handleStartTimeChange = (date: any) => {
    setStartTime(date);

    if (endTime && date) {
      const timeDiffInMinutes = Math.round((endTime - date) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time " })

      }
      else {
        setBatchTime(false)
      }
    }
  };

  const handleEndTimeChange = (date: any) => {
    setEndTime(date);
    if (startTime && date) {
      const timeDiffInMinutes = Math.round((date - startTime) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time" })
      }
      else {
        setBatchTime(false)
      }
    }
  };
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleStudentSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='First name '

                        onChange={onChange}
                        placeholder='First name '
                        error={Boolean(studentErrors.firstName)}
                        aria-describedby='stepper-linear-account-firstName'
                        autoComplete='new-firstName'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {studentErrors.firstName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                      Required, max 25 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Last name '
                        onChange={onChange}

                        placeholder='Last name '
                        error={Boolean(studentErrors.lastName)}
                        aria-describedby='stepper-linear-account-lastName'
                        autoComplete='new-lastname'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {studentErrors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-lastName'>
                      Required, max 25 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='Email '

                        onChange={onChange}
                        error={Boolean(studentErrors.email)}
                        placeholder='email@gmail.com'
                        aria-describedby='stepper-linear-account-email'
                        autoComplete=' new-email'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {studentErrors.email && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                      Required, a vaild email address
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='dob'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={value}
                        showYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={50}

                        onChange={e => onChange(e)}
                        autoComplete='new-dob'
                        placeholderText='DD/MM/YYYY'
                        minDate={minDate}
                        maxDate={maxDate}
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={(e: any) => onChange(e)}
                            label='Date of birth '
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                            error={Boolean(studentErrors.dob)}
                            aria-describedby='validation-basic-dob'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
                {studentErrors.dob && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                    Required date of birth
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='enrollmentNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Enrollment number'

                        onChange={onChange}
                        placeholder='Enrollment number '
                        error={Boolean(studentErrors.enrollmentNumber)}
                        aria-describedby='stepper-linear-account-enrollmentNumber'
                        autoComplete='new-enrollmentNumber'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {studentErrors.enrollmentNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-enrollmentNumber'>
                      Required, max 10 chars, alphanumeric allowed
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none'
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield'
                          }
                        }}
                        fullWidth
                        type='number'

                        label='Phone number '
                        onChange={onChange}
                        value={value}
                        placeholder='+91-123-456-8790'
                        error={Boolean(studentErrors.phoneNumber)}
                        autoComplete='new-phonenumber'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='bx:phone' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {studentErrors.phoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-phoneNumber'>
                      Required, 10-digit phone number
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='fathersName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Father's name "

                        onChange={onChange}
                        placeholder="Father's name "
                        error={Boolean(studentErrors.fathersName)}
                        aria-describedby='stepper-linear-account-fathersName'
                        autoComplete='new-fathername'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {studentErrors.fathersName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-fathersName'>
                      Required, max 50 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='fathersPhoneNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none'
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield'
                          }
                        }}
                        fullWidth
                        type='number'

                        label="Father's phone number "
                        value={value}
                        onChange={onChange}
                        placeholder='+91-123-456-8790'
                        error={Boolean(studentErrors.fathersPhoneNumber)}
                        autoComplete='new-fathersPhoneNumber'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='bx:phone' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {studentErrors.fathersPhoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-fathersPhoneNumber'>
                      Required, 10-digit phone number
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='string'
                        value={value}
                        label='Address '
                        onChange={onChange}

                        placeholder='Address '
                        error={Boolean(studentErrors.address)}
                        aria-describedby='stepper-linear-account-address'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    )}
                  />
                  {studentErrors.address && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-address'>
                      Required, max 100 chars, alphanumeric allowed.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='collegeName'
                    control={collegeControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='College name '
                        onChange={onChange}
                        placeholder='College name '
                        error={Boolean(collegeErrors.collegeName)}
                        aria-describedby='stepper-linear-personal-collegeName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {collegeErrors.collegeName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-collegeName'>
                      Required, max 50 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='departmentName'
                    control={collegeControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Department name '
                        onChange={onChange}

                        placeholder='Department name '
                        error={Boolean(collegeErrors.departmentName)}
                        aria-describedby='stepper-linear-personal-departmentName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {collegeErrors.departmentName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-departmentName'>
                      Required, max 50 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='collegeCourse'
                    control={collegeControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='College course '
                        onChange={onChange}

                        placeholder='College course '
                        error={Boolean(collegeErrors.collegeCourse)}
                        aria-describedby='stepper-linear-personal-collegeCourse'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {collegeErrors.collegeCourse && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-collegeCourse'>
                      Required, max 50 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='collegeSemester'
                    control={collegeControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none'
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield'
                          }
                        }}
                        type='number'
                        value={value}
                        label='College semester '
                        onChange={onChange}

                        placeholder='College semester '
                        error={Boolean(collegeErrors.collegeSemester)}
                        inputProps={{
                          maxLength: 2,
                        }}
                        autoComplete='OFF'
                        aria-describedby='stepper-linear-personal-collegeSemester'
                      />
                    )}
                  />
                  {collegeErrors.collegeSemester && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-collegeSemester'>
                      Required, max 2 chars
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                    size='large'
                    type='submit'
                    variant='contained'
                    onClick={() => {
                      setActiveStep(activeStep + 1)
                      collegeReset({ collegeName: '', departmentName: '', collegeCourse: '', collegeSemester: '' })
                    }}
                  >
                    skip
                  </Button>
                  <Button size='large' type='submit' variant='contained'>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleCoachingSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-multiple-checkbox-label">Course name</InputLabel>
                  <Select
                    labelId='demo-multiple-checkbox-label'
                    id='demo-multiple-checkbox'
                    value={courseName}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label='Course name ' />}
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {courseListData && courseListData.length > 0 ? (
                      courseListData.map((name: any) => (
                        <MenuItem key={name.courseId} value={name.courseName}>
                          <Checkbox checked={courseName?.indexOf(name.courseName) > -1} />
                          <ListItemText primary={name.courseName} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        <ListItemText primary="No data found" />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} sm={0}>
                {permission?.some((obj: any) => obj?.title === 'Courses' && obj?.action?.includes('create')) && (
                  <AddCircleIcon
                    style={{ marginTop: '12px', cursor: 'pointer' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                    color='primary'
                  />
                )}
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )

      case 3:
        return (
          <form key={3} onSubmit={handlePaymentSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[3].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[3].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>


                <FormControl fullWidth >
                  <InputLabel id="demo-multiple-checkbox-label">Batch name</InputLabel>
                  <Select
                    labelId='demo-multiple-checkbox-label'
                    id='demo-multiple-checkbox'
                    value={batchName}
                    onChange={handleBatchSelectChange}
                    input={<OutlinedInput label='Batch name' />}
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {listBatch && listBatch.length > 0 ? (
                      listBatch?.map((name: any) => (
                        <MenuItem key={name.batchId} value={name.batchName}>
                          <Checkbox checked={batchName?.indexOf(name.batchName) > -1} />
                          <ListItemText primary={name.batchName} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        <ListItemText primary="No data found" />
                      </MenuItem>
                    )}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} sm={0}>
                {permission?.some((obj: any) => obj?.title === 'Batch' && obj?.action?.includes('create')) && (
                  <AddCircleIcon
                    color='primary'
                    style={{ marginTop: '12px', cursor: 'pointer' }}
                    onClick={() => {
                      handleClickBatchDialogOpen()
                      setDialogTitle('Add')
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>

                {/* <Button
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                    size='large'
                    type='submit'
                    variant='contained'
                    onClick={() => {
                      setActiveStep(activeStep + 1)
                      setBatchName([])
                    }}
                  >
                    skip
                  </Button> */}
                <Button size='large' type='submit' variant='contained' disabled={batchName.length > 0 ? false : true}>
                  Next
                </Button>

              </Grid>
            </Grid>
          </form>
        )
      case 4:
        return (
          <form key={4} onSubmit={handlePaymentSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[4].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[4].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='totalPaymentAmount'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={courseValueFee}
                        label='Total payment amount '

                        disabled
                        error={Boolean(paymentErrors.totalPaymentAmount)}
                        placeholder='Total payment amount '
                        aria-describedby='stepper-linear-totalPaymentAmount'
                        autoComplete='OFF'
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          min: 0,

                        }}
                      />
                    )}
                  />
                  {paymentErrors.totalPaymentAmount && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-courseName'>
                      Required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(paymentErrors.partPayment)}
                    htmlFor='validation-basic-select'
                  >
                    Part payment
                  </InputLabel>
                  <Controller
                    name='partPayment'
                    control={paymentControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}

                        label='Part payment'
                        onChange={onChange}
                        error={Boolean(paymentErrors.partPayment)}
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        <MenuItem value='true'>Yes</MenuItem>
                        <MenuItem value='false'>No</MenuItem>
                      </Select>
                    )}
                  />
                  {paymentErrors.partPayment && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-partPayment'>
                      Required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={7}>
                <FormControl>
                  <FormLabel>Do you want to apply coupon ?</FormLabel>
                  <RadioGroup
                    row
                    aria-label='address type'
                    defaultValue={coupounApply}
                    name='form-layouts-collapsible-address-radio'
                  >
                    <FormControlLabel value='Yes' onChange={handleCouponApplyChange} control={<Radio />} label='Yes' />
                    <FormControlLabel value='No' onChange={handleCouponApplyChange} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {
                coupounApply === "Yes" ?
                  <>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='validation-basic-select'
                        >
                          Coupon list
                        </InputLabel>

                        <Select
                          labelId='validation-basic-select'
                          id='demo-multiple-checkbox'
                          value={coupon ? coupon : ''}
                          label='Coupon List'
                          required
                          aria-describedby='validation-basic-select'
                          input={<OutlinedInput label='Coupon name' />}
                          MenuProps={MenuProps}
                        >
                          {couponListData.length > 0 ? (
                            couponListData.map((e: any) => (
                              <MenuItem
                                value={e.couponName}
                                onClick={() => {
                                  setCoupon(e.couponName);
                                  setCouponValueData(e);
                                }}
                                key={e.couponName}
                              >
                                {e.couponName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>
                              No data found
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} sm={0}>
                      {permission?.some((obj: any) => obj?.title === 'Coupons' && obj?.action?.includes('create')) && (
                        <AddCircleIcon
                          onClick={() => {
                            handleClickCouponDialogOpen()
                            setDialogTitle('Add')
                          }}
                          color='primary' style={{ marginTop: "12px", cursor: "pointer" }} />
                      )}

                    </Grid>
                  </> : ""
              }
              <Grid item xs={12} sm={6}>
                <TextField
                  value={couponApplied ? couponApplied : couponApplied == 0 ? 0 : ""}
                  label='Discounted payment amount'
                  fullWidth
                  disabled
                  error={couponApplied ? (parseInt(couponApplied) < 0 ? true : false) : false}
                  InputLabelProps={{
                    shrink: true
                  }}
                  aria-describedby='stepper-linear-totalPaymentAmount'
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  disabled={parseInt(couponApplied) < 0 ? true : false}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 5:
        if (paymentInfo.partPayment == 'true') {
          return (
            <>
              <form key={5} onSubmit={handleNumberOfInstallmentSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {steps[4].title}
                    </Typography>
                    <Typography variant='caption' component='p'>
                      {steps[4].subtitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={couponApplied ? couponApplied : ""}
                      label='Discounted payment amount'
                      // onChange={onChange}

                      autoComplete="OFF"
                      fullWidth
                      disabled
                      InputLabelProps={{
                        shrink: true
                      }}
                      aria-describedby='stepper-linear-totalPaymentAmount'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id='validation-basic-select'

                        error={Boolean(numberOfInstallmentErros.numberOfInstallments)}
                        htmlFor='validation-basic-select'
                      >
                        Number of installments
                      </InputLabel>
                      <Controller
                        name='numberOfInstallments'
                        control={numberOfInstallmentControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={numberOfInstallment}
                            label='Number Of Installments'
                            onChange={(e: any) => setNumberOfInstallment(e.target.value)}
                            error={Boolean(numberOfInstallmentErros.numberOfInstallments)}
                            labelId='validation-basic-select'
                            aria-describedby='validation-basic-select'
                          >
                            {maxInstallmentArray.map((e: any) => {
                              if (e != 1) {
                                return <MenuItem value={e}>{e}</MenuItem>
                              }
                            })}
                          </Select>
                        )}
                      />
                      {numberOfInstallmentErros.numberOfInstallments && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-numberOfInstallments'>
                          Required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id='validation-basic-select'
                        htmlFor='validation-basic-select'
                      >
                        Are you paying first installment right now ?
                      </InputLabel>

                      <Select
                        value={firstPaymentStatus}
                        label=' Are you paying First Installment right now ?'
                        onChange={(e: any) => {
                          setFirstPaymentStatus(e.target.value)
                        }}

                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        <MenuItem value='payed' selected>
                          Pay
                        </MenuItem>
                        <MenuItem value='due'>Due</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>

              {(firstPaymentStatus == 'payed' || firstPaymentStatus == 'due') &&
                numberOfInstallmentArray.map((e: any, index: any) => {
                  return (
                    <NewInstallmentComponent
                      index={index}
                      setNextInstallment={setNextInstallment}
                      nextButtonShow={nextButtonShow}
                      setButtonShow={setButtonShow}
                      buttonShow={buttonShow}
                      numberOfInstallment={numberOfInstallment}
                      dividedAmountAfterFirstPayment={dividedAmountAfterFirstPayment}
                      setDividedAmountAfterFirstPayment={setDividedAmountAfterFirstPayment}
                      setArrayForInstallmentdetails={setArrayForInstallmentdetails}
                      arrayForInstallmentdetails={arrayForInstallmentdetails}
                      setReceivedPayment={setReceivedPayment}
                      receivedPayment={receivedPayment}
                      setNextButtonShow={setNextButtonShow}
                      couponApplied={couponApplied}
                    />
                  )
                })}

              <form key={4} onSubmit={handleNumberOfInstallmentSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    style={{ marginTop: '30px' }}
                  >
                    <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      size='large'
                      type='submit'
                      variant='contained'
                      disabled={nextButtonShow.length == numberOfInstallment ? false : true}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          )
        } else {
          return (
            <form key={5} onSubmit={handleInstallmentPartPaymentNoSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[5].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[5].subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      htmlFor='validation-basic-select'
                    >
                      Are you paying first installment right now ?
                    </InputLabel>

                    <Select
                      value={firstPaymentStatus}
                      label=' Are you paying First Installment right now ?'
                      onChange={(e: any) => {
                        setFirstPaymentStatus(e.target.value)
                      }}

                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value='payed' selected>
                        Pay
                      </MenuItem>
                      <MenuItem value='due'>Due</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='paymentDescription'
                      control={installmentPartPaymentNoControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Payment description'
                          onChange={onChange}

                          error={Boolean(installmentPartPaymentNoErrors.paymentDescription)}
                          placeholder='paymentDescription'
                          aria-describedby='stepper-linear-paymentDescription'
                          autoComplete='OFF'
                          inputProps={{
                            maxLength: 500,
                          }}
                        />
                      )}
                    />
                    {installmentPartPaymentNoErrors.paymentDescription && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-paymentDescription'>
                        Required, max 500 chars
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePickerWrapper>
                    <Controller
                      name='paymentReceivedDate'
                      control={installmentPartPaymentNoControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={value}
                          showYearDropdown
                          showMonthDropdown

                          onChange={e => onChange(e)}
                          placeholderText='MM/DD/YYYY'
                          autoComplete='OFF'
                          customInput={
                            <CustomInput
                              value={value}
                              onChange={onChange}
                              label='Payment received date'
                              error={Boolean(installmentPartPaymentNoErrors.paymentReceivedDate)}
                              aria-describedby='validation-basic-paymentReceivedDate'
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}

                            />
                          }
                        />
                      )}
                    />
                  </DatePickerWrapper>
                  {installmentPartPaymentNoErrors.paymentReceivedDate && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-paymentReceivedDate'>
                      Required, payment date
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='totalReceivedPayment'
                      control={installmentPartPaymentNoControl}
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                        <TextField
                          value={couponApplied}
                          disabled
                          label='Total received payment'
                          onChange={onChange}
                          placeholder='totalReceivedPayment'
                          aria-describedby='stepper-linear-totalReceivedPayment'
                          autoComplete='OFF'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                    Back
                  </Button>
                  <Button size='large' type='submit' variant='contained'>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          )
        }
      case 6: {
        return (
          <Grid container spacing={2}>
            <Grid item xl={9} md={8} xs={12}>
              <StudentReviewPage
                studentValues={studentValues}
                toggleAddCustomerDrawer={() => { }}
                collegeValues={collegeValues}
                paymentValues={paymentValues}
                installmentPartPaymentNoValues={installmentPartPaymentNoValues}
                fullRollNumber={fullRollNumber}
                arrayForInstallmentdetails={arrayForInstallmentdetails}
                courseDataFormat={courseDataFormat}
                batchDataFormat={batchDataFormat}
                coupounDataFormat={coupounDataFormat}
                couponApplied={couponApplied}
                courseValueFee={courseValueFee}
                firstPaymentStatus={firstPaymentStatus}
              />
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <PreviewActions
                orgName={user.organizationName}
                studentEmail={studentValues().email}
                studentName={`${studentValues().firstName} ${studentValues().lastName}`}
                courseName={coachingValues().courseName}
              />
            </Grid>

            <Grid item xs={8.7} sx={{ display: 'flex', justifyContent: 'space-between', pt: 5 }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack} sx={{ ml: 8 }}>
                Back
              </Button>
              <Button
                size='large'
                type='submit'
                variant='contained'
                onClick={() => {
                  handleButtonClick();
                  setIsFormComplete(true)
                }}
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        )
      }
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  const handleClose = () => {
    if (open.open == true) {
      setOpen({ open: false, mssg: '' })
    }
  }

  return (
    <>
      {permission?.some((obj: any) => obj?.title === 'Student' && obj?.action?.includes('create')) && (
        <>
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                >
                  {steps.map((step, index) => {
                    const labelProps: {
                      error?: boolean
                    } = {}
                    if (index === activeStep) {
                      labelProps.error = false
                      if (
                        (studentErrors.email ||
                          studentErrors.firstName ||
                          studentErrors.lastName ||
                          studentErrors.dob ||
                          studentErrors.phoneNumber ||
                          studentErrors.enrollmentNumber ||
                          studentErrors.fathersName ||
                          studentErrors.fathersPhoneNumber) &&
                        activeStep === 0
                      ) {
                        labelProps.error = true
                      } else if (
                        (collegeErrors.collegeName ||
                          collegeErrors.departmentName ||
                          collegeErrors.collegeCourse ||
                          collegeErrors.collegeSemester) &&
                        activeStep === 1
                      ) {
                        labelProps.error = true
                      } else if (
                        (coachingErrors.courseName ||
                          coachingErrors.courseDuration ||
                          coachingErrors.modeOfClass ||
                          coachingErrors.rollNumber) &&
                        activeStep === 2
                      ) {
                        labelProps.error = true
                      } else if ((paymentErrors.totalPaymentAmount || paymentErrors.partPayment) && activeStep === 3) {
                        labelProps.error = true
                      } else if (
                        installmentPartPaymentNoErrors.paymentDescription ||
                        installmentPartPaymentNoErrors.paymentReceivedDate ||
                        (numberOfInstallmentErros.numberOfInstallments && activeStep === 4)
                      ) {
                        labelProps.error = true
                      } else {
                        labelProps.error = false
                      }
                    }

                    return (
                      <Step key={index}>
                        <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <CustomAvatar
                              variant='rounded'
                              skin={activeStep === index ? 'filled' : 'light'}
                              color={activeStep >= index ? 'primary' : 'secondary'}
                              sx={{
                                mr: 2.5,
                                borderRadius: 1,
                                ...(activeStep === index && {
                                  boxShadow: theme =>
                                    `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                                })
                              }}
                            >
                              <Icon icon={step.icon} />
                            </CustomAvatar>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
            </StepperHeaderContainer>

            <Divider sx={{ m: '0 !important' }} />

            <CardContent>{renderContent()}</CardContent>
          </Card>

          <Dialog fullWidth maxWidth='md' scroll='body' open={openCourseDialog}>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
              <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                <Typography variant='h5' component='span'>
                  {`${dialogTitle} Course`}
                </Typography>
              </DialogTitle>
              <Icon
                className="iconContainer"
                onClick={() => { handleCourseDialogClose(); setSubmitted(false) }}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  margin: "8px",
                  transition: "background-color 0.3s",
                }}
                icon='bx:x'
              />

            </Grid>
            {/* <Grid sx={{ display: 'flex', justifyContent: 'left' }}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                  <Typography variant='h4' component='span'>
                    {`${dialogTitle} Course`}
                  </Typography>
                </DialogTitle>
              </Grid> */}

            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <TableContainer>
                <Grid container spacing={5} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label='Course name '
                      placeholder='HTML,CSS,back-end...'
                      value={courseDetails.courseName}
                      autoComplete='OFF'
                      name='courseName'
                      inputProps={{
                        maxLength: 50,
                      }}
                      error={submitted ? courseDetails.courseName ? false : true : false}
                      helperText={submitted && !courseDetails.courseName ? 'Required,max 50 chars' : ''}
                      onChange={courseChangeHandler}


                    />
                    {createCourseError.courseName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-fathersName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name='courseDescription'
                      label='Course description '
                      placeholder='Course description '
                      required
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 500,
                      }}
                      value={courseDetails.courseDescription}
                      onChange={courseChangeHandler}
                      error={submitted ? courseDetails.courseDescription ? false : true : false}
                      helperText={submitted && !courseDetails.courseDescription ? 'Required,max 500 chars' : ''}
                      minRows={2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          display: 'none'
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield'
                        }
                      }}
                      type='number'
                      label='Course fee '
                      required
                      placeholder='20000...'
                      value={courseDetails.courseFee}
                      name='courseFee'
                      autoComplete='OFF'
                      onChange={courseChangeHandler}
                      InputProps={{
                        inputProps: {
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          min: 0,
                        }
                      }}
                      error={submitted ? courseDetails.courseFee ? false : true : false}
                      helperText={submitted && (!courseDetails.courseFee || courseDetails.courseFee < 0) ? 'Required,value must be a positive number' : ''}
                      InputLabelProps={{
                        shrink: true
                      }}

                    // helperText={
                    //   !isNaN(courseDetails.courseFee) && courseDetails.courseFee > 0
                    //     ? null
                    //     : 'Please enter a valid positive number'
                    // }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth >
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Max installments  </InputLabel>
                      <Select
                        required
                        sx={{ height: '50%' }}
                        label='Max Installment'
                        value={courseDetails.maxPaymentInstallment}
                        name='maxPaymentInstallment'
                        id='stepper-custom-vertical-personal-select'
                        onChange={courseChangeHandler}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name='courseFeeDescription'
                      label='Course fee description '
                      placeholder='Course fee description '
                      value={courseDetails.courseFeeDescription}
                      onChange={courseChangeHandler}
                      error={submitted ? courseDetails.courseFeeDescription ? false : true : false}
                      helperText={submitted && !courseDetails.courseFeeDescription ? 'Required,max 500 chars' : ''}
                      minRows={2}
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                </Grid>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
              <Box className='demo-space-x'>
                <Button size='large' color='secondary' variant='outlined' onClick={() => { handleCourseDialogClose(); setSubmitted(false) }}>
                  Cancel
                </Button>

                <Button size='large' type='submit' variant='contained' onClick={() => { formCourseSubmit(); setSubmitted(true) }}>
                  Submit
                </Button>

              </Box>
            </DialogActions>
          </Dialog>

          {/* dialog for batch */}
          <Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '600px' } }} open={openBatchDialog}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
              <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                <Typography variant='h5' component='span'>
                  {`${dialogTitle} Batch`}
                </Typography>
              </DialogTitle>
              <Icon
                className="iconContainer"
                onClick={() => { handleBatchDialogClose(); setSubmitted(false) }}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  margin: "8px",
                  transition: "background-color 0.3s",
                }}
                icon='bx:x'
              />
            </Grid>

            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <TableContainer>
                <Grid container spacing={5} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Batch name '
                      required
                      placeholder='Morning / Evening Batch'
                      name='batchName'
                      value={batchData.batchName}
                      onChange={changeHandler}
                      error={submitted ? batchData.batchName ? false : true : false}
                      helperText={submitted && !batchData.batchName ? 'Required,max 50 chars' : ''}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name='batchDescription'
                      required
                      label='Batch description '
                      minRows={2}
                      value={batchData.batchDescription}
                      onChange={changeHandler}
                      error={submitted ? batchData.batchDescription ? false : true : false}
                      helperText={submitted && !batchData.batchDescription ? 'Required,max 500 chars' : ''}
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch duration</InputLabel>
                      <Select
                        label='Do you want to set batch duration'
                        name='Do You Want To Set batch duration'
                        id='stepper-custom-vertical-personal-select'
                        value={toSetTime}
                        onChange={(e: any) => { setToSetTime(e.target.value) }}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'yes'}>Yes</MenuItem>
                        <MenuItem value={'no'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch date</InputLabel>
                      <Select
                        label='Do you want to set batch date '
                        name='Do You Want To Set batch Date '
                        id='stepper-custom-vertical-personal-select'
                        value={toSetDate}
                        onChange={(e: any) => { setToSetDate(e.target.value) }}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'yes'}>Yes</MenuItem>
                        <MenuItem value={'no'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {toSetTime == 'yes' && <>
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker

                          showTimeSelect
                          required
                          selected={startTime}
                          timeIntervals={15}
                          showTimeSelectOnly
                          popperPlacement={popperPlacement}
                          name='batchClassStartTime'
                          placeholderText='4:00 PM'
                          dateFormat='h:mm aa'
                          id='time-only-picker'
                          onChange={(date: Date) => handleStartTimeChange(date)}
                          customInput={<CustomInput
                            error={submitted ? startTime ? false : true : false}
                            helperText={submitted && !startTime ? 'Batch class start time is required' : ''}
                            label='Batch class start time ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                              throw new Error('Function not implemented.');
                            }} />}
                        />
                      </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker
                          showTimeSelect
                          selected={endTime}
                          timeIntervals={15}
                          showTimeSelectOnly
                          required
                          popperPlacement={popperPlacement}
                          name='batchClassEndTime'
                          placeholderText='8:00 PM'
                          dateFormat='h:mm aa'
                          id='time-only-picker'
                          onChange={(date: Date) => handleEndTimeChange(date)}
                          customInput={<CustomInput
                            error={submitted ? endTime ? false : true : false}
                            helperText={submitted && !endTime ? 'Batch class end time is required' : ''}
                            label='Batch class end time ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                              throw new Error('Function not implemented.');
                            }} />}
                        />
                      </DatePickerWrapper>
                    </Grid></>}

                  {toSetDate == 'yes' && <>
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker

                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          id='basic-input'
                          popperPlacement={popperPlacement}
                          onChange={(date: Date) => setStartDate(date)}
                          maxDate={endDate || null}
                          placeholderText='Batch Start Date '
                          required
                          customInput={
                            <CustomInput
                              label='Batch start date '
                              value={undefined}
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}

                              error={submitted ? startDate ? false : true : false}
                              helperText={submitted && !startDate ? 'Batch start date is required' : ''}
                              onChange={function (event: ChangeEvent<Element>): void {
                                throw new Error('Function not implemented.');
                              }}

                            />
                          }
                        />
                      </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker

                          dateFormat="dd/MM/yyyy"
                          selected={endDate}
                          id='basic-input'
                          popperPlacement={popperPlacement}
                          onChange={(date: Date) => setEndDate(date)}
                          minDate={startDate || null}
                          placeholderText='Batch End Date '
                          required
                          customInput={<CustomInput label='Batch end date '
                            value={undefined}

                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                            error={submitted ? endDate ? false : true : false}
                            helperText={submitted && !endDate ? 'Batch end date is required' : ''}
                            onChange={function (event: ChangeEvent<Element>): void {
                              throw new Error('Function not implemented.');
                            }} />}
                        />
                      </DatePickerWrapper>
                    </Grid></>}


                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={submitted ? batchData.batchMode ? false : true : false}
                    >
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Batch mode  </InputLabel>
                      <Select
                        label='Batch mode'
                        required
                        name='batchMode'
                        id='stepper-custom-vertical-personal-select'
                        value={batchData.batchMode}
                        onChange={changeHandler}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'online'}>Online</MenuItem>
                        <MenuItem value={'offline'}>Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
              <Box className='demo-space-x'>
                <Button size='large' color='secondary' variant='outlined' onClick={() => { handleBatchDialogClose(); setSubmitted(false) }}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained' onClick={() => { createBatchSubmit(); setSubmitted(true) }}>
                  Submit
                </Button>
              </Box>
            </DialogActions>
          </Dialog>

          {/* dialog for Coupon */}
          <Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '500px' } }} open={openCouponDialog}>
            <form >
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  <Typography variant='h5' component='span'>
                    {`${dialogTitle} Coupon`}
                  </Typography>
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => { handleCouponDialogClose(); setSubmitted(false) }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid>

              <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
                <TableContainer>
                  <Grid container spacing={5} mt={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='couponName'
                        label='Coupon name'
                        onChange={onCouponChange}
                        placeholder='Coupon name'
                        autoComplete='OFF'
                        aria-describedby='validation-basic-first-name'
                        error={submitted ? couponData.couponName ? false : true : false}
                        helperText={submitted && !couponData.couponName ? 'Required,max 50 chars' : ''}
                        required
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='couponDescription'
                        // value={value}
                        label='Coupon description'
                        onChange={onCouponChange}
                        placeholder='Coupon description'
                        aria-describedby='validation-basic-last-name'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 500,
                        }}
                        error={submitted ? couponData.couponDescription ? false : true : false}
                        helperText={submitted && !couponData.couponDescription ? 'Required,max 500 chars' : ''}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl error={submitted ? couponData.couponType ? false : true : false}>
                        <FormLabel>Coupon type</FormLabel>
                        <RadioGroup
                          row
                          defaultValue='home'
                          aria-label='address type'
                          name='form-layouts-collapsible-address-radio'
                        >
                          <FormControlLabel
                            value='Flat'
                            onChange={handleRadioChange}
                            control={<Radio required />}
                            label='Flat'
                          />
                          <FormControlLabel
                            value='Percentage'
                            onChange={handleRadioChange}
                            control={<Radio required />}
                            label='Percentage'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {couponType == 'Flat' ? (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name='couponValue'
                          type='number'
                          sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                              display: 'none'
                            },
                            '& input[type=number]': {
                              MozAppearance: 'textfield'
                            }
                          }}
                          label='Coupon value'
                          onChange={onCouponChange}
                          placeholder='Coupon value'
                          required
                          error={submitted ? couponData.couponValue ? false : true : false}
                          helperText={submitted && !couponData.couponValue ? 'Required,value must be a positive number' : ''}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">/-</InputAdornment>,
                          }}
                          aria-describedby='validation-basic-first-name'
                          autoComplete='OFF'

                        />
                      </Grid>
                    ) : couponType == 'Percentage' ?
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>

                            <TextField
                              name='couponValue'
                              required
                              type='number'
                              sx={{
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                  display: 'none'
                                },
                                '& input[type=number]': {
                                  MozAppearance: 'textfield'
                                }
                              }}
                              label='Percentage'
                              onChange={onCouponChange}
                              placeholder='Percentage'
                              autoComplete='OFF'
                              aria-describedby='validation-basic-first-name'
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0,

                              }}
                              error={submitted ? couponData.couponValue ? false : true : false}
                              helperText={submitted && !couponData.couponValue ? 'Required,value must be between 0-99' : ''}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              }}
                              style={{
                                width: '100%'
                              }}
                            />

                            <Typography variant='body2'>(for Example : 10 % of 1000  = 900)</Typography>
                          </FormControl>

                        </Grid>


                      </>
                      : ""}

                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel>Coupon limit</FormLabel>
                        <RadioGroup
                          row
                          defaultValue='None'
                          aria-label='address type'
                          name='form-layouts-collapsible-address-radio'
                        >
                          <FormControlLabel
                            value='Date'
                            name='Date'
                            onChange={handleDateChange}
                            control={<Radio />}
                            label='Date'
                          />
                          <FormControlLabel
                            value='couponCount'
                            name='couponCount'
                            onChange={handleDateChange}
                            control={<Radio />}
                            label='Coupon count'
                          />
                          <FormControlLabel
                            value='Both'
                            name='couponCount'
                            onChange={handleDateChange}
                            control={<Radio />}
                            label='Both'
                          />
                          <FormControlLabel
                            value='None'
                            name='couponCount'
                            onChange={handleDateChange}
                            control={<Radio />}
                            label='None'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {couponDate == 'Date' ? (
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            id='basic-input'
                            autoComplete='OFF'
                            required
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => setStartDate(date)}
                            placeholderText='Coupon expiry date'
                            customInput={
                              <CustomInput
                                label='Coupon expiry date'
                                value={undefined}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                error={submitted ? couponData.couponLimit ? false : true : false}
                                helperText={submitted && !couponData.couponLimit ? 'Coupon expiry date is required' : ''}

                                onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.')
                                }}
                              />
                            }
                          />
                        </DatePickerWrapper>
                      </Grid>
                    ) : (
                      ''
                    )}

                    {
                      couponDate == "couponCount" ?
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>

                            <TextField

                              name="couponCount"
                              required
                              type='number'
                              sx={{
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                  display: 'none'
                                },
                                '& input[type=number]': {
                                  MozAppearance: 'textfield'
                                }
                              }}
                              label='Coupon count'
                              onChange={onCouponChange}
                              placeholder='Coupon count'
                              autoComplete='OFF'
                              error={submitted ? couponData.couponCount ? false : true : false}
                              helperText={submitted && !couponData.couponCount ? 'Required,value must be a positive number' : ''}
                              aria-describedby='validation-basic-first-name'
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0
                              }}
                            />


                          </FormControl>
                        </Grid>
                        : ""
                    }
                    {
                      couponDate == "Both" ?
                        <>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>

                              <TextField

                                name='couponCount'
                                label='Coupon count'
                                required
                                onChange={onCouponChange}
                                placeholder='Coupon count'
                                autoComplete='OFF'
                                aria-describedby='validation-basic-first-name'
                                error={submitted ? couponData.couponCount ? false : true : false}
                                helperText={submitted && !couponData.couponCount ? 'Required,value must be a positive number' : ''}
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  min: 0,
                                  max: 10000,
                                }}
                              />


                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <DatePicker
                                // {...props}
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                required
                                id='basic-input'
                                autoComplete='OFF'
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => setStartDate(date)}
                                placeholderText='Coupon expiry date'
                                customInput={<CustomInput label='Coupon expiry date'
                                  value={undefined}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                  }}
                                  error={submitted ? startDate ? false : true : false}
                                  helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''}

                                  onChange={function (event: ChangeEvent<Element>): void {
                                    throw new Error('Function not implemented.');
                                  }} />}
                              />
                            </DatePickerWrapper>
                          </Grid>
                        </>
                        : ""
                    }
                  </Grid>
                </TableContainer>
              </DialogContent>
              <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
                <Box className='demo-space-x'>
                  <Button size='large' color='secondary' variant='outlined' onClick={() => { handleCouponDialogClose(); setSubmitted(false) }}>
                    Cancel
                  </Button>
                  <Button size='large' variant='contained'
                    onClick={(e) => {
                      setSubmitted(true);
                      e.preventDefault()
                      createCouponApi(e)
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </DialogActions>
            </form>
          </Dialog>
          {/* dialog for Coupon */}

          <Dialog
            fullWidth
            open={openPopPop}
            onClose={() => {
              setOpenPopPop(false)
            }}
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
          >
            <Grid container justifyContent="flex-end">
              <Icon
                className="iconContainer"
                onClick={() => handleConfirmationCancel()}
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
                <Box sx={{ mb: 7, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                  <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                  <Typography variant='h5' sx={{ color: 'text.secondary' }}>
                    Are you sure?
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '1.125rem' }}>You have to fill the payment details again</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'right', mt: 5 }}>
              <Button variant='outlined' color='secondary' onClick={() => handleConfirmationCancel()}>
                Cancel
              </Button>
              <Button variant='contained' sx={{ mr: 1.5 }}
                onClick={() => handleConfirmation()}
              >
                Yes, I am Sure!
              </Button>

            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          {open.open && (
            <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
              <Alert
                variant="filled"
                elevation={3}
                onClose={handleClose}
                severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
              >
                {open.mssg}
              </Alert>
            </Snackbar>
          )}
        </>
      )}
      <Error404Component permission={permission} />
    </>
  )
}

export default studentAdmissionForm
