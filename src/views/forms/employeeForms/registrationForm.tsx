// ** React Imports
import { forwardRef, Fragment, useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** file imports
import EmployeeReviewPage from 'src/views/apps/review/EmployeeReview/employeeReviewPage'
import PreviewActions from 'src/views/apps/review/EmployeeReview/AddActions'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Api Imports
import { employeeRegistartionApi, employeeWelcomeMail } from 'src/store/APIs/Api'
import { checkEmployeeId } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { customDateFormat } from 'src/@core/utils/format'
import Router from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@material-ui/core'
import EventNoteIcon from '@mui/icons-material/EventNote';

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === 'Employee' && obj?.action?.includes('create'))) {
        Router.push('/404')
      }
    }
  }, [permission])

  return <></>
}
interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}
interface FormInputs {
  dateOfBirth: DateType
  email: string
  phoneNumber: string
  employeeId: string
  password: string
  fatherName: string
  fatherPhoneNumber: string
  address: string
  department: string
  designation: string

  lastName: string

  firstName: string

  employeeCode: string
  employeeSkills: string
}
interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}
const CustomInput = forwardRef(({ ...props }: any, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})
const steps = [
  {
    icon: 'bx:user',
    title: 'Personal info',
    subtitle: 'Setup information'
  },
  {
    icon: 'zondicons:education',
    title: 'Education details',
    subtitle: 'Enter your education details'
  },

  {
    icon: 'zondicons:education',
    title: 'Education details',
    subtitle: 'Enter your education details'
  },

  {
    icon: 'ph:bank-fill',
    title: 'Bank details',
    subtitle: 'Enter your bank details'
  },
  {
    icon: 'material-symbols:rate-review-outline-rounded',
    title: 'Review details',
    subtitle: 'Check your filled details'
  }
]

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const defaultEmployeePersonalDetailsValues = {
  email: '',
  firstName: '',
  employeeId: '',
  lastName: '',
  phoneNumber: '',
  dateOfBirth: null,
  fatherName: '',
  fatherPhoneNumber: '',
  department: '',
  address: '',
  designation: '',
  empolyeeCode: '',
  employeeSkills: ''

  // password: '',
  // 'confirm-password': ''
}
const defaultEmployeeEducationDetailsValues = {
  employeeEducationDetails: ''
}
const defaultEmployeeHighSchoolValues = {
  highSchoolName: '',
  highSchoolPercentage: '',
  highSchoolBoard: '',
  highSchoolAddress: ''
}
const defaultEmployeeHigherSecondarySchoolDetailsValues = {
  highSchoolName: '',
  highSchoolPercentage: '',
  highSchoolBoard: '',
  highSchoolAddress: '',
  higherSecondarySchoolName: '',
  higherSecondarySchoolPercentage: '',
  higherSecondarySchoolBoard: '',
  higherSecondarySchoolAddress: ''
}
const defaultEmployeeUnderGraduationValues = {
  highSchoolName: '',
  highSchoolPercentage: '',
  highSchoolBoard: '',
  highSchoolAddress: '',
  higherSecondarySchoolName: '',
  higherSecondarySchoolPercentage: '',
  higherSecondarySchoolBoard: '',
  higherSecondarySchoolAddress: '',
  underGraduationCollegeName: '',
  underGraduationCollegePercentage: '',
  underGraduationCollegeCourse: '',
  underGraduationCollegeAddress: ''
}
const defaultEmployeePostGraduationResetValues = {
  highSchoolName: '',
  highSchoolPercentage: '',
  highSchoolBoard: '',
  highSchoolAddress: '',
  higherSecondarySchoolName: '',
  higherSecondarySchoolPercentage: '',
  higherSecondarySchoolBoard: '',
  higherSecondarySchoolAddress: '',
  underGraduationCollegeName: '',
  underGraduationCollegePercentage: '',
  underGraduationCollegeCourse: '',
  underGraduationCollegeAddress: '',
  postGraduationCollegeName: '',
  postGraduationCollegePercentage: '',
  postGraduationCollegeCourse: '',
  postGraduationCollegeAddress: ''
}
const defaultEmployeeBankDetailsValues = {
  bankName: '',
  accountNumber: '',
  bankIfsceCode: ''
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
const employeePersonalDetailsSchema = yup.object().shape({
  firstName: yup.string().matches(/^[A-Z a-z]+$/).required(),
  lastName: yup.string().matches(/^[A-Z a-z]+$/).required(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10, 'please Enter a valid phone number')
    .min(10, 'phone number should be of 10 digit'),
  dateOfBirth: yup.string().required(),
  fatherName: yup.string().matches(/^[A-Z a-z]+$/).required(),
  email: yup.string().email().required(),
  fatherPhoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(13, 'please Enter a valid phone number')
    .min(10, 'phone number should be of 10 digit'),
  department: yup.string().required(),
  address: yup.string().required(),
  designation: yup.string().matches(/^[A-Z a-z]+$/).required(),
  employeeCode: yup.string().required(),
  employeeSkills: yup.string().required(),
})
const employeeEducationSchema = yup.object().shape({
  employeeEducationDetails: yup.string().required()
})
const employeeHighSchoolSchema = yup.object().shape({
  highSchoolName: yup.string().required(),
  highSchoolPercentage: yup.string().required(),
  highSchoolBoard: yup.string().required(),
  highSchoolAddress: yup.string().required()
})
const employeeHigherSecondarySchoolDetailsSchema = yup.object().shape({
  highSchoolName: yup.string().required(),
  highSchoolPercentage: yup.string().required(),
  highSchoolBoard: yup.string().required(),
  highSchoolAddress: yup.string().required(),

  higherSecondarySchoolName: yup.string().required(),
  higherSecondarySchoolPercentage: yup.string().required(),
  higherSecondarySchoolBoard: yup.string().required(),
  higherSecondarySchoolAddress: yup.string().required()
})
const employeeUnderGraduationSchema = yup.object().shape({
  highSchoolName: yup.string().required(),
  highSchoolPercentage: yup.string().required(),
  highSchoolBoard: yup.string().required(),
  highSchoolAddress: yup.string().required(),

  higherSecondarySchoolName: yup.string().required(),
  higherSecondarySchoolPercentage: yup.string().required(),
  higherSecondarySchoolBoard: yup.string().required(),
  higherSecondarySchoolAddress: yup.string().required(),

  underGraduationCollegeName: yup.string().required(),
  underGraduationCollegePercentage: yup.string().required(),
  underGraduationCollegeCourse: yup.string().required(),
  underGraduationCollegeAddress: yup.string().required()
})
const employeePostGraduationResetSchema = yup.object().shape({
  highSchoolName: yup.string().required(),
  highSchoolPercentage: yup.string().required(),
  highSchoolBoard: yup.string().required(),
  highSchoolAddress: yup.string().required(),

  higherSecondarySchoolName: yup.string().required(),
  higherSecondarySchoolPercentage: yup.string().required(),
  higherSecondarySchoolBoard: yup.string().required(),
  higherSecondarySchoolAddress: yup.string().required(),

  underGraduationCollegeName: yup.string().required(),
  underGraduationCollegePercentage: yup.string().required(),
  underGraduationCollegeCourse: yup.string().required(),
  underGraduationCollegeAddress: yup.string().required(),

  postGraduationCollegeName: yup.string().required(),
  postGraduationCollegePercentage: yup.string().required(),
  postGraduationCollegeCourse: yup.string().required(),
  postGraduationCollegeAddress: yup.string().required()
})
const employeeBankDetailsSchema = yup.object().shape({
  bankName: yup.string().required(),
  accountNumber: yup.string().required(),
  bankIfsceCode: yup.string().required()
})

const EmployeeRegistration = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 15);
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date(currentDate);
  maxDate.setMonth(11, 31);

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // const [employeeId, setEmployeeId] = useState<any>()
  const [open, setOpen] = useState<any>({ open: false, mssg: '' })
  const [empid, setEmpId] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])

  useEffect(() => {
    if (snackbaropen === true) {
      const timeoutId = setTimeout(() => {
        setSnackbaropen(true);
      }, 4000);
    }
  });

  const handleClose = () => {
    if (open.open == true) {
      setOpen({ open: false, mssg: '' })
    }
  }

  const router = useRouter()
  const [employeeEducationDetails, setEmployeeEducationDetails] = useState<any>()
  const [user, setUser] = useState<any>()
  const dispatch = useDispatch()

  // ** Hooks
  const {
    reset: employeePersonalDetailsReset,
    control: employeePersonalDetailsControl,
    handleSubmit: handleEmployeePersonalDetailsSubmit,
    formState: { errors: employeePersonalDetailsErrors },
    getValues: employeePersonalDetails
  } = useForm<FormInputs>({
    defaultValues: defaultEmployeePersonalDetailsValues,
    resolver: yupResolver(employeePersonalDetailsSchema)
  })
  const {
    reset: employeeEducationDetailsReset,
    control: personalControl,
    handleSubmit: handleEmployeeEducationDetailsSubmit,
    formState: { errors: employeeEducationDetailsErrors },
    getValues: getEmployeeEducationDetails
  } = useForm({
    defaultValues: defaultEmployeeEducationDetailsValues,
    resolver: yupResolver(employeeEducationSchema)
  })
  const {
    reset: employeeHighSchoolReset,
    control: employeeHighSchoolControl,
    handleSubmit: handleEmployeeHighSchoolSubmit,
    formState: { errors: employeeHighSchoolErrors },
    getValues: employeeHighSchoolDetails
  } = useForm({
    defaultValues: defaultEmployeeHighSchoolValues,
    resolver: yupResolver(employeeHighSchoolSchema)
  })
  const {
    reset: employeeHigherSecondarySchoolDetailsReset,
    control: employeeHigherSecondarySchoolDetailsControl,
    handleSubmit: employeeHigherSecondarySchoolDetailsSubmit,
    formState: { errors: employeeHigherSecondarySchoolDetailsErrors },
    getValues: employeeHigherSecondarySchoolDetails
  } = useForm({
    defaultValues: defaultEmployeeHigherSecondarySchoolDetailsValues,
    resolver: yupResolver(employeeHigherSecondarySchoolDetailsSchema)
  })
  const {
    reset: employeeUnderGraduationReset,
    control: employeeUnderGraduationControl,
    handleSubmit: employeeUnderGraduationSubmit,
    formState: { errors: employeeUnderGraduationErrors },
    getValues: employeeUnderGraduationDetails
  } = useForm({
    defaultValues: defaultEmployeeUnderGraduationValues,
    resolver: yupResolver(employeeUnderGraduationSchema)
  })
  const {
    reset: employeePostGraduationReset,
    control: employeePostGraduationResetControl,
    handleSubmit: employeePostGraduationResetSubmit,
    formState: { errors: employeePostGraduationResetErrors },
    getValues: employeePostGraduationDetails
  } = useForm({
    defaultValues: defaultEmployeePostGraduationResetValues,
    resolver: yupResolver(employeePostGraduationResetSchema)
  })

  const {
    reset: employeeBankDetailsReset,
    control: employeeBankDetailsControl,
    handleSubmit: employeeBankDetailsSubmit,
    formState: { errors: employeeBankDetailsErrors },
    getValues: employeeBankDetails
  } = useForm({
    defaultValues: defaultEmployeeBankDetailsValues,
    resolver: yupResolver(employeeBankDetailsSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

  useEffect(() => {
    const organizationId = user ? user.organizationId : ''
    const employeeAdorment = organizationId.split('-')
    setEmpId(employeeAdorment[0] + '-')
  }, [user])


  // Api Call


  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (!isFormComplete && !isNavigating) {
        if (employeePersonalDetails().firstName || employeePersonalDetails().phoneNumber ||
          employeePersonalDetails().lastName || employeePersonalDetails().email || employeePersonalDetails().lastName || employeePersonalDetails().fatherName
          || employeePersonalDetails().dateOfBirth || employeePersonalDetails().fatherPhoneNumber) {
          if (confirm('You have an incomplete form. Are you sure you want to leave?')) {
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

  useEffect(() => {
    setIsFormComplete(false)
  }, [employeePersonalDetails().firstName, employeePersonalDetails().phoneNumber])

  const handleApi = () => {

    let dateOfBirtFormated: any = employeePersonalDetails().dateOfBirth
    dateOfBirtFormated = customDateFormat(dateOfBirtFormated)

    const employeeDetailsforApi: any = {

      customerId: user.customerId,
      employeeId: `${empid}${uuidv4().slice(0, 5)}`,
      organizationId: user.organizationId,
      employeeFirstname: employeePersonalDetails().firstName,
      employeeLastname: employeePersonalDetails().lastName,
      employeeEmail: employeePersonalDetails().email,
      employeePhoneNumber: employeePersonalDetails().phoneNumber,
      employeeCode: employeePersonalDetails().employeeCode,
      employeeSkills: employeePersonalDetails().employeeSkills,
      employeeGurdianName: employeePersonalDetails().fatherName,
      employeeGurdianContactNumber: employeePersonalDetails().fatherPhoneNumber,
      employeeAddress: employeePersonalDetails().address,
      employeeDateOfBirth: employeePersonalDetails().dateOfBirth,
      employeeDepartment: employeePersonalDetails().department,
      employeeDesignation: employeePersonalDetails().designation,
      employeeEducationDetails: getEmployeeEducationDetails().employeeEducationDetails,
      employeeHighSchoolName:
        getEmployeeEducationDetails().employeeEducationDetails == 'HighSchool'
          ? employeeHighSchoolDetails().highSchoolName
          : getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
            ? employeeHigherSecondarySchoolDetails().highSchoolName
            : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
              ? employeeUnderGraduationDetails().highSchoolName
              : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
                ? employeePostGraduationDetails().highSchoolName
                : '',
      employeeHighSchoolPercentage:
        getEmployeeEducationDetails().employeeEducationDetails == 'HighSchool'
          ? employeeHighSchoolDetails().highSchoolPercentage
          : getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
            ? employeeHigherSecondarySchoolDetails().highSchoolPercentage
            : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
              ? employeeUnderGraduationDetails().highSchoolPercentage
              : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
                ? employeePostGraduationDetails().highSchoolPercentage
                : '',
      employeeHighSchoolBoard:
        getEmployeeEducationDetails().employeeEducationDetails == 'HighSchool'
          ? employeeHighSchoolDetails().highSchoolBoard
          : getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
            ? employeeHigherSecondarySchoolDetails().highSchoolBoard
            : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
              ? employeeUnderGraduationDetails().highSchoolBoard
              : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
                ? employeePostGraduationDetails().highSchoolBoard
                : '',
      employeeHighSchoolAddress:
        getEmployeeEducationDetails().employeeEducationDetails == 'HighSchool'
          ? employeeHighSchoolDetails().highSchoolAddress
          : getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
            ? employeeHigherSecondarySchoolDetails().highSchoolAddress
            : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
              ? employeeUnderGraduationDetails().highSchoolAddress
              : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
                ? employeePostGraduationDetails().highSchoolAddress
                : '',

      employeeHigherSecondarySchoolName:
        getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
          ? employeeHigherSecondarySchoolDetails().higherSecondarySchoolName
          : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
            ? employeeUnderGraduationDetails().higherSecondarySchoolName
            : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
              ? employeePostGraduationDetails().higherSecondarySchoolName
              : '',
      employeeHigherSecondarySchoolPercentage:
        getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
          ? employeeHigherSecondarySchoolDetails().higherSecondarySchoolPercentage
          : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
            ? employeeUnderGraduationDetails().higherSecondarySchoolPercentage
            : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
              ? employeePostGraduationDetails().higherSecondarySchoolPercentage
              : '',
      employeeHigherSecondarySchoolBoard:
        getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
          ? employeeHigherSecondarySchoolDetails().higherSecondarySchoolBoard
          : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
            ? employeeUnderGraduationDetails().higherSecondarySchoolBoard
            : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
              ? employeePostGraduationDetails().higherSecondarySchoolBoard
              : '',
      employeeHigherSecondarySchoolAddress:
        getEmployeeEducationDetails().employeeEducationDetails == 'HigherSecondarySchool'
          ? employeeHigherSecondarySchoolDetails().higherSecondarySchoolAddress
          : getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
            ? employeeUnderGraduationDetails().higherSecondarySchoolAddress
            : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
              ? employeePostGraduationDetails().higherSecondarySchoolAddress
              : '',

      employeeUnderGraduationCollegeName:
        getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
          ? employeeUnderGraduationDetails().underGraduationCollegeName
          : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
            ? employeePostGraduationDetails().underGraduationCollegeName
            : '',
      employeeUnderGraduationCollegeCourseName:
        getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
          ? employeeUnderGraduationDetails().underGraduationCollegeCourse
          : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
            ? employeePostGraduationDetails().underGraduationCollegeCourse
            : '',
      employeeUnderGraduationCollegeAddress:
        getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
          ? employeeUnderGraduationDetails().underGraduationCollegeAddress
          : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
            ? employeePostGraduationDetails().underGraduationCollegeAddress
            : '',
      employeeUnderGraduationCollegePercentage:
        getEmployeeEducationDetails().employeeEducationDetails == 'UnderGraduation'
          ? employeeUnderGraduationDetails().underGraduationCollegePercentage
          : getEmployeeEducationDetails().employeeEducationDetails == 'PostGraduation'
            ? employeePostGraduationDetails().underGraduationCollegePercentage
            : '',

      employeePostGraduationCollegeName: employeePostGraduationDetails().postGraduationCollegeName,
      employeePostGraduationCollegeCourseName: employeePostGraduationDetails().postGraduationCollegeCourse,
      employeePostGraduationCollegeAddress: employeePostGraduationDetails().postGraduationCollegeAddress,
      employeePostGraduationCollegePercentage: employeePostGraduationDetails().postGraduationCollegePercentage,

      employeeBankName: employeeBankDetails().bankName,
      employeeAccountNo: employeeBankDetails().accountNumber,
      employeeIfsceCode: employeeBankDetails().bankIfsceCode

    }
  
    dispatch(employeeRegistartionApi(employeeDetailsforApi)).then((res: any) => {
      if (res.payload.statusCode == 200) {

        employeeWelcomeMail({
          organizationName: user.organizationName,
          employeeEmail: employeePersonalDetails().email,
          employeeName: `${employeePersonalDetails().firstName} ${employeePersonalDetails().lastName}`,
          organizationLogo: organizationLogo
        })
        setSnackbarColor(true)
        setSnackbaropen(true)
        setResponseMessage("New employee is registered successfully")
        router.push('/employee/employeeList/')
      } else {
        setOpen({ open: true, mssg: res.payload.message })
      }
    })
  }



  const handleReset = () => {
    setActiveStep(0)
    employeeEducationDetailsReset({ employeeEducationDetails: '' })
    employeeHighSchoolReset({
      highSchoolName: '',
      highSchoolPercentage: '',
      highSchoolBoard: '',
      highSchoolAddress: ''
    })
    employeeHigherSecondarySchoolDetailsReset({
      highSchoolName: '',
      highSchoolPercentage: '',
      highSchoolBoard: '',
      highSchoolAddress: '',
      higherSecondarySchoolName: '',
      higherSecondarySchoolPercentage: '',
      higherSecondarySchoolBoard: '',
      higherSecondarySchoolAddress: ''
    })
    employeeUnderGraduationReset({
      highSchoolName: '',
      highSchoolPercentage: '',
      highSchoolBoard: '',
      highSchoolAddress: '',
      higherSecondarySchoolName: '',
      higherSecondarySchoolPercentage: '',
      higherSecondarySchoolBoard: '',
      higherSecondarySchoolAddress: '',
      underGraduationCollegeName: '',
      underGraduationCollegePercentage: '',
      underGraduationCollegeCourse: '',
      underGraduationCollegeAddress: ''
    })
    employeePostGraduationReset({
      highSchoolName: '',
      highSchoolPercentage: '',
      highSchoolBoard: '',
      highSchoolAddress: '',
      higherSecondarySchoolName: '',
      higherSecondarySchoolPercentage: '',
      higherSecondarySchoolBoard: '',
      higherSecondarySchoolAddress: '',
      underGraduationCollegeName: '',
      underGraduationCollegePercentage: '',
      underGraduationCollegeCourse: '',
      underGraduationCollegeAddress: '',
      postGraduationCollegeName: '',
      postGraduationCollegePercentage: '',
      postGraduationCollegeCourse: '',
      postGraduationCollegeAddress: ''
    })
    employeePersonalDetailsReset({
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      fatherName: '',
      fatherPhoneNumber: '',
      address: '',
      department: '',
      designation: '',
      employeeId: '',
      employeeCode: '',
      employeeSkills: ''
    })
    employeeBankDetailsReset({ bankName: '', accountNumber: '', bankIfsceCode: '' })
  }
  const onSubmit = () => {
    setEmployeeEducationDetails(getEmployeeEducationDetails())

    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      setSnackbarColor(true)
      setSnackbaropen(true)
      setResponseMessage("Form submitted successfully")
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleEmployeePersonalDetailsSubmit(onSubmit)}>
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
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='First name'
                        onChange={onChange}
                        placeholder='First name'
                        error={Boolean(employeePersonalDetailsErrors.firstName)}
                        aria-describedby='stepper-linear-account-firstName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.firstName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='Last name'
                        onChange={onChange}
                        placeholder='Last name'
                        error={Boolean(employeePersonalDetailsErrors.lastName)}
                        aria-describedby='stepper-linear-account-lastName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />

                  {employeePersonalDetailsErrors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-lastName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>



              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='employeeCode'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        value={value}
                        label='Employee code'
                        onChange={onChange}
                        placeholder='Employee code'
                        error={Boolean(employeePersonalDetailsErrors.employeeCode)}
                        aria-describedby='stepper-linear-account-firstName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.employeeCode && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='employeeSkills'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        value={value}
                        label='Employee skills'
                        onChange={onChange}
                        placeholder='Employee skills'
                        error={Boolean(employeePersonalDetailsErrors.employeeSkills)}
                        aria-describedby='stepper-linear-account-firstName'
                        autoComplete='OFF'
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.employeeSkills && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller

                    name='phoneNumber'
                    control={employeePersonalDetailsControl}
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

                        value={value}
                        label='Phone number'
                        type='number'
                        onChange={onChange}
                        placeholder='Phone number'
                        error={Boolean(employeePersonalDetailsErrors.phoneNumber)}
                        aria-describedby='stepper-linear-account-phoneNumber'
                        autoComplete='OFF'

                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.phoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-phoneNumber'>
                      {employeePersonalDetailsErrors.phoneNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='dateOfBirth'
                  control={employeePersonalDetailsControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={value}
                        showYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={50}
                        autoComplete='OFF'
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={(date: any) => {
                          const dateInUTC = new Date(
                            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
                          );
                          onChange(dateInUTC);
                        }}

                        placeholderText='DD/MM/YYYY'
                        customInput={
                          <CustomInput
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                            value={value}
                            onChange={onChange}
                            label='Date of birth'
                            error={Boolean(employeePersonalDetailsErrors.dateOfBirth)}
                            aria-describedby='validation-basic-dateOfBirth'
                          />
                        }
                      />
                    </DatePickerWrapper>
                  )}
                />
                {employeePersonalDetailsErrors.dateOfBirth && (
                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dateOfBirth'>
                    This field is required
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'

                        value={value}
                        label='Email'
                        onChange={onChange}
                        autoComplete='OFF'
                        error={Boolean(employeePersonalDetailsErrors.email)}
                        placeholder='carterleonard@gmail.com'
                        aria-describedby='stepper-linear-account-email'

                        inputProps={{
                          maxLength: 50,
                        }}

                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.email && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                      {employeePersonalDetailsErrors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='fatherName'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label="Father/Guardian name"
                        onChange={onChange}
                        autoComplete='OFF'
                        placeholder='Father/Guardian name'
                        error={Boolean(employeePersonalDetailsErrors.fatherName)}
                        aria-describedby='stepper-linear-account-fatherName'

                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.fatherName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-fatherName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='fatherPhoneNumber'
                    control={employeePersonalDetailsControl}
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
                        value={value}
                        type='number'
                        label='Father/Guardian phone number'
                        onChange={onChange}
                        autoComplete='OFF'
                        placeholder='Father/Guardian phone number'
                        error={Boolean(employeePersonalDetailsErrors.fatherPhoneNumber)}
                        aria-describedby='stepper-linear-account-fatherPhoneNumber'
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.fatherPhoneNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-fatherPhoneNumber'>
                      {employeePersonalDetailsErrors.fatherPhoneNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='Address'
                        onChange={onChange}
                        autoComplete='OFF'
                        placeholder='Address'
                        error={Boolean(employeePersonalDetailsErrors.address)}
                        aria-describedby='stepper-linear-account-address'
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.address && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-address'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='department'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='Department'
                        autoComplete='OFF'
                        onChange={onChange}
                        placeholder='Department'
                        error={Boolean(employeePersonalDetailsErrors.department)}
                        aria-describedby='stepper-linear-account-department'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.department && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-department'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='designation'
                    control={employeePersonalDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='Designation'
                        onChange={onChange}
                        autoComplete='OFF'
                        placeholder='Designation'
                        error={Boolean(employeePersonalDetailsErrors.designation)}
                        aria-describedby='stepper-linear-account-designation'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeePersonalDetailsErrors.designation && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-designation'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained' >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handleEmployeeEducationDetailsSubmit(onSubmit)}>
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
                  <InputLabel
                    id='stepper-linear-personal-employeeEducationDetails'
                    error={Boolean(employeeEducationDetailsErrors.employeeEducationDetails)}
                    htmlFor='stepper-linear-personal-employeeEducationDetails'
                  >
                    Education details
                  </InputLabel>
                  <Controller
                    name='employeeEducationDetails'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Education Details'
                        onChange={onChange}
                        error={Boolean(employeeEducationDetailsErrors.employeeEducationDetails)}
                        labelId='stepper-linear-personal-employeeEducationDetails'
                        aria-describedby='stepper-linear-personal-employeeEducationDetails-helper'
                      >
                        <MenuItem value='HighSchool'>High school</MenuItem>
                        <MenuItem value='HigherSecondarySchool'>Higher secondary school</MenuItem>
                        <MenuItem value='UnderGraduation'>Under graduation</MenuItem>
                        <MenuItem value='PostGraduation'>Post graduation</MenuItem>
                      </Select>
                    )}
                  />
                  {employeeEducationDetailsErrors.employeeEducationDetails && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='stepper-linear-personal-employeeEducationDetails-helper'
                    >
                      This field is required
                    </FormHelperText>
                  )}
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
      case 2:
        if (employeeEducationDetails.employeeEducationDetails == 'HighSchool') {
          return (
            <form key={2} onSubmit={handleEmployeeHighSchoolSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[2].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[2].subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolName'
                      control={employeeHighSchoolControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField

                          value={value}
                          label='High school name'
                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeHighSchoolErrors.highSchoolName)}
                          placeholder='High school name'
                          aria-describedby='stepper-linear-social-highSchoolName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeHighSchoolErrors.highSchoolName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolPercentage'
                      control={employeeHighSchoolControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                              display: 'none'
                            },
                            '& input[type=number]': {
                              MozAppearance: 'textfield'
                            }
                          }}
                          label='High school percentage'
                          type='number'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeHighSchoolErrors.highSchoolPercentage)}
                          placeholder='High school percentage'
                          aria-describedby='stepper-linear-social-highSchoolPercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                          style={{
                            width: '100%'
                          }}

                        />
                      )}
                    />
                    {employeeHighSchoolErrors.highSchoolPercentage && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolPercentage'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolBoard'
                      control={employeeHighSchoolControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school board'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeHighSchoolErrors.highSchoolBoard)}
                          aria-describedby='stepper-linear-social-highSchoolBoard'
                          placeholder='High school board'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeHighSchoolErrors.highSchoolBoard && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolBoard'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolAddress'
                      control={employeeHighSchoolControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school address'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeHighSchoolErrors.highSchoolAddress)}
                          placeholder='High school address'
                          aria-describedby='stepper-linear-social-highSchoolAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeeHighSchoolErrors.highSchoolAddress && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolAddress'>
                        This field is required
                      </FormHelperText>
                    )}
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
        } else if (employeeEducationDetails.employeeEducationDetails == 'HigherSecondarySchool') {
          return (
            <>
              <form key={2} onSubmit={employeeHigherSecondarySchoolDetailsSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {steps[2].title}
                    </Typography>
                    <Typography variant='caption' component='p'>
                      {steps[2].subtitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='highSchoolName'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='High school name'

                            onChange={onChange}
                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.highSchoolName)}
                            placeholder='High school name'
                            aria-describedby='stepper-linear-social-highSchoolName'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.highSchoolName && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolName'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='highSchoolPercentage'
                        control={employeeHigherSecondarySchoolDetailsControl}
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
                            value={value}
                            label='High school percentage'
                            onChange={onChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  %
                                </InputAdornment>
                              )
                            }}
                            type='number'
                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.highSchoolPercentage)}
                            placeholder='High school percentage'
                            aria-describedby='stepper-linear-social-highSchoolPercentage'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              min: 0,
                              max: 99,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.highSchoolPercentage && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolPercentage'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='highSchoolBoard'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='High school board'
                            onChange={onChange}

                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.highSchoolBoard)}
                            aria-describedby='stepper-linear-social-highSchoolBoard'
                            placeholder='High school board'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.highSchoolBoard && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolBoard'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='highSchoolAddress'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='High school address'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  {/* <Icon icon='bx:home' /> */}
                                </InputAdornment>
                              )
                            }}
                            onChange={onChange}
                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.highSchoolAddress)}
                            placeholder='High school address'
                            aria-describedby='stepper-linear-social-highSchoolAddress'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.highSchoolAddress && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolAddress'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='higherSecondarySchoolName'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Higher secondary school name'
                            onChange={onChange}

                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolName)}
                            placeholder='Higher secondary school name'
                            aria-describedby='stepper-linear-social-higherSecondarySchoolName'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolName && (
                        <FormHelperText
                          sx={{ color: 'error.main' }}
                          id='stepper-linear-social-higherSecondarySchoolName'
                        >
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='higherSecondarySchoolPercentage'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Higher secondary school percentage'
                            onChange={onChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  %
                                </InputAdornment>
                              )
                            }}
                            type='number'
                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolPercentage)}
                            placeholder='Higher secondary school percentage'
                            aria-describedby='stepper-linear-social-higherSecondarySchoolPercentage'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              min: 0,
                              max: 99,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolPercentage && (
                        <FormHelperText
                          sx={{ color: 'error.main' }}
                          id='stepper-linear-social-higherSecondarySchoolPercentage'
                        >
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='higherSecondarySchoolBoard'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Higher secondary school board'
                            onChange={onChange}
                            autoComplete='OFF'

                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolBoard)}
                            aria-describedby='stepper-linear-social-higherSecondarySchoolBoard'
                            placeholder='Higher secondary school board'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolBoard && (
                        <FormHelperText
                          sx={{ color: 'error.main' }}
                          id='stepper-linear-social-higherSecondarySchoolBoard'
                        >
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='higherSecondarySchoolAddress'
                        control={employeeHigherSecondarySchoolDetailsControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='High secondary school address'
                            onChange={onChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  {/* <Icon icon='bx:home' /> */}
                                </InputAdornment>
                              )
                            }}
                            autoComplete='OFF'
                            error={Boolean(employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolAddress)}
                            placeholder='High secondary school address'
                            aria-describedby='stepper-linear-social-higherSecondarySchoolAddress'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        )}
                      />
                      {employeeHigherSecondarySchoolDetailsErrors.higherSecondarySchoolAddress && (
                        <FormHelperText
                          sx={{ color: 'error.main' }}
                          id='stepper-linear-social-higherSecondarySchoolAddress'
                        >
                          This field is required
                        </FormHelperText>
                      )}
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
            </>
          )
        } else if (employeeEducationDetails.employeeEducationDetails == 'UnderGraduation') {
          return (
            <form key={2} onSubmit={employeeUnderGraduationSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[2].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[2].subtitle}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolName'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school name'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.highSchoolName)}
                          placeholder='High school name'
                          aria-describedby='stepper-linear-social-highSchoolName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.highSchoolName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolPercentage'
                      control={employeeUnderGraduationControl}
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
                          value={value}
                          type='number'
                          label='High school percentage'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.highSchoolPercentage)}
                          placeholder='High school percentage'
                          aria-describedby='stepper-linear-social-highSchoolPercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.highSchoolPercentage && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolPercentage'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolBoard'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school board'

                          onChange={onChange}
                          error={Boolean(employeeUnderGraduationErrors.highSchoolBoard)}
                          aria-describedby='stepper-linear-social-highSchoolBoard'
                          placeholder='High school board'
                          autoComplete='OFF'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.highSchoolBoard && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolBoard'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolAddress'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school address'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.highSchoolAddress)}
                          placeholder='High school address'
                          aria-describedby='stepper-linear-social-highSchoolAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.highSchoolAddress && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolAddress'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolName'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school name'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.higherSecondarySchoolName)}
                          placeholder='Higher secondary school name'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.higherSecondarySchoolName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-higherSecondarySchoolName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolPercentage'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school percentage'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          type='number'
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.higherSecondarySchoolPercentage)}
                          placeholder='Higher secondary school percentage'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolPercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.higherSecondarySchoolPercentage && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolPercentage'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolBoard'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school board'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.higherSecondarySchoolBoard)}
                          aria-describedby='stepper-linear-social-higherSecondarySchoolBoard'
                          placeholder='Higher secondary school board'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.higherSecondarySchoolBoard && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolBoard'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolAddress'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High secondary school address'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.higherSecondarySchoolAddress)}
                          placeholder='High secondary school address'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.higherSecondarySchoolAddress && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolAddress'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeName'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college name'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.underGraduationCollegeName)}
                          placeholder='Under graduation college name'
                          aria-describedby='stepper-linear-social-underGraduationCollegeName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.underGraduationCollegeName && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeName'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegePercentage'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college percentage'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          onChange={onChange}
                          type='number'
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.underGraduationCollegePercentage)}
                          placeholder='Under graduation college percentage'
                          aria-describedby='stepper-linear-social-underGraduationCollegePercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.underGraduationCollegePercentage && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegePercentage'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeCourse'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college course'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.underGraduationCollegeCourse)}
                          aria-describedby='stepper-linear-social-underGraduationCollegeCourse'
                          placeholder='Under graduation college course'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.underGraduationCollegeCourse && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeCourse'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeAddress'
                      control={employeeUnderGraduationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college address'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeeUnderGraduationErrors.underGraduationCollegeAddress)}
                          placeholder='Under graduation college address'
                          aria-describedby='stepper-linear-social-underGraduationCollegeAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeeUnderGraduationErrors.underGraduationCollegeAddress && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeAddress'
                      >
                        This field is required
                      </FormHelperText>
                    )}
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
        } else if (employeeEducationDetails.employeeEducationDetails == 'PostGraduation') {
          return (
            <form key={2} onSubmit={employeePostGraduationResetSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[2].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[2].subtitle}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolName'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school name'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.highSchoolName)}
                          placeholder='High school name'
                          aria-describedby='stepper-linear-social-highSchoolName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.highSchoolName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolPercentage'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          type='number'
                          label='High school percentage'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.highSchoolPercentage)}
                          placeholder='High school percentage'
                          aria-describedby='stepper-linear-social-highSchoolPercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.highSchoolPercentage && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolPercentage'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolBoard'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school board'

                          onChange={onChange}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.highSchoolBoard)}
                          aria-describedby='stepper-linear-social-highSchoolBoard'
                          placeholder='High school board'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.highSchoolBoard && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolBoard'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='highSchoolAddress'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High school address'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.highSchoolAddress)}
                          placeholder='High school address'
                          aria-describedby='stepper-linear-social-highSchoolAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.highSchoolAddress && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-highSchoolAddress'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolName'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school name'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.higherSecondarySchoolName)}
                          placeholder='Higher secondary school name'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.higherSecondarySchoolName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-higherSecondarySchoolName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolPercentage'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school percentage'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          type='number'
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.higherSecondarySchoolPercentage)}
                          placeholder='Higher secondary school percentage'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolPercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.higherSecondarySchoolPercentage && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolPercentage'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolBoard'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Higher secondary school board'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.higherSecondarySchoolBoard)}
                          aria-describedby='stepper-linear-social-higherSecondarySchoolBoard'
                          placeholder='Higher secondary school board'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.higherSecondarySchoolBoard && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolBoard'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='higherSecondarySchoolAddress'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='High secondary school address'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.higherSecondarySchoolAddress)}
                          placeholder='High secondary school address'
                          aria-describedby='stepper-linear-social-higherSecondarySchoolAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.higherSecondarySchoolAddress && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-higherSecondarySchoolAddress'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeName'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college name'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.underGraduationCollegeName)}
                          placeholder='Under graduation college name'
                          aria-describedby='stepper-linear-social-underGraduationCollegeName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.underGraduationCollegeName && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeName'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegePercentage'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college percentage'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          type='number'
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.underGraduationCollegePercentage)}
                          placeholder='Under graduation college percentage'
                          aria-describedby='stepper-linear-social-underGraduationCollegePercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.underGraduationCollegePercentage && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegePercentage'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeCourse'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college course'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.underGraduationCollegeCourse)}
                          aria-describedby='stepper-linear-social-underGraduationCollegeCourse'
                          placeholder='Under graduation college course'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.underGraduationCollegeCourse && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeCourse'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='underGraduationCollegeAddress'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Under graduation college address'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.underGraduationCollegeAddress)}
                          placeholder='Under graduation college address'
                          aria-describedby='stepper-linear-social-underGraduationCollegeAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.underGraduationCollegeAddress && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-underGraduationCollegeAddress'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='postGraduationCollegeName'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Post graduation college name'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.postGraduationCollegeName)}
                          placeholder='Post graduation college name'
                          aria-describedby='stepper-linear-social-postGraduationCollegeName'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.postGraduationCollegeName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-postGraduationCollegeName'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='postGraduationCollegePercentage'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Post graduation college percentage'
                          onChange={onChange}
                          type='number'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                %
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.postGraduationCollegePercentage)}
                          placeholder='Post graduation college percentage'
                          aria-describedby='stepper-linear-social-postGraduationCollegePercentage'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 99,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.postGraduationCollegePercentage && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-postGraduationCollegePercentage'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='postGraduationCollegeCourse'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Post graduation college course'
                          onChange={onChange}

                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.postGraduationCollegeCourse)}
                          aria-describedby='stepper-linear-social-postGraduationCollegeCourse'
                          placeholder='Post graduation college course'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.postGraduationCollegeCourse && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-postGraduationCollegeCourse'
                      >
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='postGraduationCollegeAddress'
                      control={employeePostGraduationResetControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Post graduation college address'
                          onChange={onChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {/* <Icon icon='bx:home' /> */}
                              </InputAdornment>
                            )
                          }}
                          autoComplete='OFF'
                          error={Boolean(employeePostGraduationResetErrors.postGraduationCollegeAddress)}
                          placeholder='Post graduation college address'
                          aria-describedby='stepper-linear-social-postGraduationCollegeAddress'
                          inputProps={{
                            maxLength: 100,
                          }}
                        />
                      )}
                    />
                    {employeePostGraduationResetErrors.postGraduationCollegeAddress && (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        id='stepper-linear-social-postGraduationCollegeAddress'
                      >
                        This field is required
                      </FormHelperText>
                    )}
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
      case 3:
        return (
          <form key={3} onSubmit={employeeBankDetailsSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[3].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[3].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='bankName'
                    control={employeeBankDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        label='Bank name'
                        onChange={onChange}
                        autoComplete='OFF'
                        error={Boolean(employeeBankDetailsErrors.bankName)}
                        placeholder='Bank name'
                        aria-describedby='stepper-linear-social-bankName'
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    )}
                  />
                  {employeeBankDetailsErrors.bankName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-bankName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='accountNumber'
                    control={employeeBankDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        type='text'
                        label='Account number'
                        onChange={onChange}
                        autoComplete='OFF'
                        error={Boolean(employeeBankDetailsErrors.accountNumber)}
                        placeholder='Account number'
                        aria-describedby='stepper-linear-social-accountNumber'
                        inputProps={{
                          maxLength: 25,
                          minLength: 5,

                        }}
                      />
                    )}
                  />
                  {employeeBankDetailsErrors.accountNumber && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-accountNumber'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='bankIfsceCode'
                    control={employeeBankDetailsControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}

                        type='text'
                        label='IFSC code'
                        onChange={onChange}
                        autoComplete='OFF'
                        error={Boolean(employeeBankDetailsErrors.bankIfsceCode)}
                        aria-describedby='stepper-linear-social-bankIfsceCode'
                        placeholder='IFSC code'
                        inputProps={{
                          maxLength: 15,
                        }}
                      />
                    )}
                  />
                  {employeeBankDetailsErrors.bankIfsceCode && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-bankIfsceCode'>
                      This field is required
                    </FormHelperText>
                  )}
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
      case 4: {
        return (
          <Grid container spacing={2}>
            <Grid item xl={9} md={8} xs={12}>
              <EmployeeReviewPage
                employeePersonalDetails={employeePersonalDetails}
                getEmployeeEducationDetails={getEmployeeEducationDetails}
                employeeHighSchoolDetails={employeeHighSchoolDetails}
                employeeHigherSecondarySchoolDetails={employeeHigherSecondarySchoolDetails}
                employeeUnderGraduationDetails={employeeUnderGraduationDetails}
                employeePostGraduationDetails={employeePostGraduationDetails}
                employeeBankDetails={employeeBankDetails}
              />
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <PreviewActions />
            </Grid>
            <Grid item xs={8.7} sx={{ display: 'flex', justifyContent: 'space-between', pt: 5 }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack} sx={{ ml: 8 }} >
                Back
              </Button>
              <Button
                size='large'
                type='submit'
                variant='contained'

                onClick={() => {
                  handleApi(), setIsFormComplete(true)
                }}
              >
                Submit
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

  return (
    <>
      {permission?.some((obj: any) => obj?.title === 'Employee' && obj?.action?.includes('create')) && (
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
                    return (
                      <Step key={index}>
                        <StepLabel StepIconComponent={StepperCustomDot}>
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
            <CardContent sx={{ width: '100%' }}>{renderContent()}</CardContent>
          </Card>
          {/* Snackbar */}
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
      )}

      <Error404Component permission={permission} />
    </>
  )
}

export default EmployeeRegistration
