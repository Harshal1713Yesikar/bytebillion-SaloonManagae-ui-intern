// ** React Imports
import { useState, useEffect, forwardRef, ChangeEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grid from '@mui/material/Grid'
import DialogActions from '@mui/material/DialogActions'
import CustomChip from 'src/@core/components/mui/chip'
import { customDateFormat, customTimeFormat } from 'src/@core/utils/format'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Icon from 'src/@core/components/icon'
import { listOneStudentDetailApi, listOrganizationCourse, createCourse, getCouponList, createCoupon, getAllBatchList, updateStudenCourseCouponBatchDetails, createBatch, updateCourseInBatch, updateBatchInCourse } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio'

import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { DateType } from 'src/types/forms/reactDatepickerTypes'

import { useTheme } from '@mui/material/styles'

import StepperWrapper from 'src/@core/styles/mui/stepper'
import Stepper from '@mui/material/Stepper'
import StepperCustomDot from './StepperCustomDot'
import StepLabel from '@mui/material/StepLabel'
import Step from '@mui/material/Step'
import * as yup from 'yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { customDateFormatDash } from 'src/@core/utils/format'
import { TableCellBaseProps } from '@mui/material/TableCell'
import toast from 'react-hot-toast'

// ** Third Party Imports
import axios from 'axios'

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'

interface CellType {
  row: ProjectListDataType
}
const Img = styled('img')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  marginRight: theme.spacing(3)
}))

const columns = [
  {
    flex: 0.3,
    minWidth: 230,
    field: 'projectTitle',
    headerName: 'Project',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Img src={row.img} alt={`project-${row.projectTitle}`} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{row.projectTitle}</Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {row.projectType}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'totalTask',
    headerName: 'Total Tasks',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.totalTask}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 200,
    headerName: 'Progress',
    field: 'progressValue',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ width: '100%' }}>
        <Typography variant='body2'>{row.progressValue}%</Typography>
        <LinearProgress
          variant='determinate'
          value={row.progressValue}
          color={row.progressColor}
          sx={{ height: 6, mt: 1 }}
        />
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'hours',
    headerName: 'Hours',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.hours}</Typography>
  }
]

const NewInstallmentComponent = (props: any) => {
  const [snackbarColor, setSnackbarColor] = useState<boolean>()

  const [open, setOpen] = useState<any>({ open: false, mssg: "" })
  const { setNextInstallment, couponApplied,
    receivedPayment, setReceivedPayment,
    arrayForInstallmentdetails, setArrayForInstallmentdetails,
    dividedAmountAfterFirstPayment, setDividedAmountAfterFirstPayment,
    numberOfInstallment, buttonShow, setButtonShow,
    nextButtonShow, setNextButtonShow
  } = props


  interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
  }

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

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
    installmentPaymentDescription: yup.string().required(),
    installmentReceivedDate: yup.date().required(),
    installmentReceivedPayment: yup.number().required(),
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
      addItem({ index: props.index, status: true });
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
        arrayForInstallmentdetails[i].installmentReceivedPayment = (parseInt(couponApplied) - parseInt(receivedPayment)) / (numberOfInstallment - 1)
        setArrayForInstallmentdetails(arrayForInstallmentdetails)
      }
    }


  }, [numberOfInstallment])


  async function onSubmitData(data2: any, e: any) {
    if (receivedPayment <= couponApplied) {
      e.preventDefault()

      setSnackbarColor(true)
      setOpen({ open: true, mssg: `Installment ${props.index + 1} Saved` })

      handleNextChange()
      buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)].color = "#54B435"
      setButtonShow(buttonShow)
      const data: any = installmentPartPaymentYesValues()
      const dummyArrayOfData = [...arrayForInstallmentdetails]
      if (props.index == 0) {
        dummyArrayOfData[props.index] = {
          "installmentPaymentDescription": data.installmentPaymentDescription,
          "installmentReceivedDate": data.installmentReceivedDate,
          "installmentReceivedPayment": receivedPayment,
        }

        for (let i = 0; i < dummyArrayOfData.length; i++) {
          if (i != 0 && dummyArrayOfData[i]) {
            dummyArrayOfData[i].installmentReceivedPayment = dividedAmountAfterFirstPayment
          }
        }
      } else {
        dummyArrayOfData[props.index] = {
          "installmentPaymentDescription": data.installmentPaymentDescription,
          "installmentReceivedDate": data.installmentReceivedDate,
          "installmentReceivedPayment": dividedAmountAfterFirstPayment,
        }
      }
      setArrayForInstallmentdetails([...dummyArrayOfData])
      setNextInstallment(true)
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: `Amount should be less then total fee` })
    }
  }


  useEffect(() => {
    if (couponApplied && numberOfInstallment && props.index == 0) {
      let couponAppliedValue: any = Math.ceil(parseInt(couponApplied) / numberOfInstallment);
      couponAppliedValue = parseInt(couponAppliedValue)
      setReceivedPayment(couponAppliedValue)
    }
  }, [])

  useEffect(() => {

    if (receivedPayment || numberOfInstallment) {
      setDividedAmountAfterFirstPayment(Math.ceil(parseInt(couponApplied) - parseInt(receivedPayment)) / (numberOfInstallment - 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedPayment, numberOfInstallment])



  const addItem = (newItem: any) => {
    const isDuplicate = nextButtonShow.some(
      (item: any) => item.index === newItem.index && item.status === newItem.status
    )
    if (!isDuplicate) {
      setNextButtonShow([...nextButtonShow, { index: props.index, status: true }])
    }
  }


  const addSaveItem = (newItem: any) => {
    const isDuplicate = buttonShow.some(
      (item: any) => item.index === newItem.index && item.status === newItem.status
    )
    if (!isDuplicate) {
      setButtonShow([...buttonShow, { index: props.index, status: true, color: "#3C79F5" }])
    } else {
      if (buttonShow.findIndex((o: any) => o.index == props.index) >= 0) {
        buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)].color = "#3C79F5"
        setButtonShow([...buttonShow])

        if (nextButtonShow.findIndex((o: any) => o.index == props.index) >= 0) {
          const nextButtonNewArray = nextButtonShow.filter((o: any) => o.index != props.index)
          setNextButtonShow(nextButtonNewArray)
        }
      }
    }
  }
  const handleClose = () => {

    if (open.open == true) {
      setOpen({ open: false, mssg: "" })
    }

  }


  return (
    <form >
      <Grid container spacing={5} ml={5} mt={2}>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Installment {props.index + 1} :
          </Typography>
        </Grid>

        <Grid item xs={8} sm={3} >
          <DatePickerWrapper>
            <Controller
              name='installmentReceivedDate'
              control={installmentPartPaymentYesControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={value}
                  showYearDropdown
                  showMonthDropdown
                  onChange={e => onChange(e)}
                  placeholderText='DD/MM/YYYY'
                  onCalendarOpen={() => addSaveItem({ index: props.index, status: true, color: "#3C79F5" })}
                  customInput={
                    <CustomInput

                      InputProps={{
                        endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                      }}
                      value={value}
                      onChange={onChange}
                      label='Installment date'
                      error={Boolean(installmentPartPaymentYesErrors.installmentReceivedDate)}
                      aria-describedby='validation-basic-installmentReceivedDate'
                    />
                  }
                />
              )}
            />

          </DatePickerWrapper>
          {installmentPartPaymentYesErrors.installmentReceivedDate && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-installmentReceivedDate'>
              This field is required
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={8} sm={3}>
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
                  onClickCapture={() => {
                    addSaveItem({ index: props.index, status: true, color: "#3C79F5" })
                  }}
                  inputProps={{
                    maxLength: 500,
                  }}
                  placeholder='Payment description'
                  error={Boolean(installmentPartPaymentYesErrors.installmentPaymentDescription)}
                  aria-describedby='stepper-linear-account-installmentPaymentDescription'
                />
              )}
            />
            {installmentPartPaymentYesErrors.installmentPaymentDescription && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-installmentPaymentDescription'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        {numberOfInstallment == 1 ?
          <Grid item xs={8} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='installmentReceivedPayment'
                control={installmentPartPaymentYesControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={props.index == 0 ? receivedPayment ? receivedPayment : dividedAmountAfterFirstPayment : value}
                    label='Received payment'
                    onChange={props.index == 0 ? (e: any) => { setReceivedPayment(e.target.value) } : onChange}
                    onClickCapture={props.index == 0 ? () => { addSaveItem({ index: props.index, status: true, color: "#3C79F5" }) } : undefined}
                    placeholder='Received payment'
                    disabled
                    error={Boolean(installmentPartPaymentYesErrors.installmentReceivedPayment)}
                    aria-describedby='stepper-linear-account-installmentReceivedPayment'
                  />
                )}
              />
              {installmentPartPaymentYesErrors.installmentReceivedPayment && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-installmentReceivedPayment'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid> :
          <Grid item xs={8} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='installmentReceivedPayment'
                control={installmentPartPaymentYesControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='number'
                    value={props.index == 0 ? receivedPayment ? receivedPayment : value : dividedAmountAfterFirstPayment}
                    label='Received payment'
                    onChange={props.index == 0 ? (e: any) => { setReceivedPayment(e.target.value ? e.target.value : 0) } : onChange}
                    onClickCapture={props.index == 0 ? () => { addSaveItem({ index: props.index, status: true, color: "#3C79F5" }) } : undefined}
                    placeholder='Received payment'
                    disabled={props.index != 0 ? true : false}
                    error={Boolean(installmentPartPaymentYesErrors.installmentReceivedPayment)}
                    aria-describedby='stepper-linear-account-installmentReceivedPayment'
                  />
                )}
              />
              {installmentPartPaymentYesErrors.installmentReceivedPayment && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-installmentReceivedPayment'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>}


        <Grid item xs={8} sm={2}>
          <Button
            size='large'
            onClick={
              handleInstallmentPartPaymentYesSubmit(onSubmitData)
            }
            variant='contained'
            style={{
              color: "white",
              backgroundColor: props.index == buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.index && buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.color
            }}
            disabled={(buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.index == props.index && buttonShow[buttonShow.findIndex((o: any) => o.index == props.index)]?.status == true) ? false : true}
          >
            Save
          </Button>

        </Grid>

      </Grid>
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
    </form >
  )
}


const InvoiceListTable = () => {

  const router = useRouter()
  const { studentId } = router.query
  const dispatch = useDispatch()

  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [studentData, setStudentData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>()
  const [createCourseDialog, setCreateCourseDialog] = useState<boolean>(false)
  const [courseListData, setCourseListData] = useState<any>([])
  const [courseName, setCourseName] = useState<any>([]);
  const [openCourseDialog, setOpenCourseDialog] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [popUp, setPopUp] = useState<boolean>(false)
  const [newCourseDetail, setNewCourseDetail] = useState<any>()
  const [selectPartPayment, setSelectPartPayment] = useState<any>(false)
  const [couponListData, setCouponListData] = useState<any>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [singleStudentData, setSingleStudentData] = useState<any>()
  const [openCouponDialog, setOpenCouponDialog] = useState<boolean>(false)
  const handleClickCouponDialogOpen = () => setOpenCouponDialog(true)
  const handleCouponDialogClose = () => { setOpenCouponDialog(false) }
  const [couponType, setCouponType] = useState<any>()
  const [couponDate, setCouponDate] = useState<any>("None")
  const [snackbarColor, setSnackbarColor] = useState<boolean>(true)
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [couponData, setCouponData] = useState<any>({
    couponDescription: "",
    couponName: "",
    couponValue: "",
    couponCount: ""
  })
  const [startDate, setStartDate] = useState<DateType>()
  const [permission, setPermission] = useState<any>()




  useEffect(() => {
    if (!popUp) {
      setCourseName([])
    } else {
      if (courseListData) {
        setNewCourseDetail(courseListData.find((obj: any) => obj.courseName == courseName[0]))
      }
    }
  }, [popUp])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {

      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    if (user) {
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
        setStudentData(res.data.courses)
        setBatchDetails(res.data.batch)
        setSingleStudentData(res.data)
        if (res.statuscode == 200) {
          setIsLoading(false)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, studentId])

  const onCouponChange = (e: any) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (event: any) => {
    setCouponDate(event.target.value);
  };


  const handleRadioChange = (event: any) => {
    setCouponType(event.target.value);
  };


  const createCouponApi = (e: any) => {
    e.preventDefault()
    const useCouponCount = 0

    const couponApiData: any = {
      customerId: user ? user.customerId : "",
      organizationId: user ? user.organizationId : "",
      coupons: [{
        couponName: couponData.couponName,
        couponValue: couponData.couponValue,
        couponCount: couponData.couponCount,
        couponType: couponType,
        useCouponCount: useCouponCount,
        couponLimit: couponDate,
        couponDescription: couponData.couponDescription,
        couponExpiryDate: startDate ? `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}` : ""
      }]
    }

    if (couponData.couponName == "" && couponType == "" && couponData.couponValue == "" && couponData.couponCount == "") {

    }
    else {
      createCoupon(couponApiData).then((res: any) => {
        setOpen({ open: true, mssg: "Coupon created successfully" })
        setCouponData(res.data.data)
        setSubmitted(false)
        setCouponData({
          couponDescription: "",
          couponName: "",
          couponValue: "",
          couponCount: "",

        })
        setCouponType("")
        setCouponDate('None')
        listCouponApiCall()
        handleCouponDialogClose()

      })
    }

  }

  const [couponApplied, setCouponApplied] = useState<any>()



  const listCourse = () => {

    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      if (customerId && organizationId) {
        dispatch(listOrganizationCourse({ organizationId, customerId })).then((res: any) => {
          setCourseListData(res.payload.data.data)
        })
      }

    }

  }

  const listCouponApiCall = () => {
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      getCouponList(customerId, organizationId).then((res: any) => {
        setCouponListData(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    }

  }

  const [coupon, setCoupon] = useState<any>()
  const [couponValueData, setCouponValueData] = useState<any>()

  useEffect(() => {

    if (couponValueData && newCourseDetail?.courseFee) {
      if (couponValueData.couponType == 'Percentage') {
        setCouponApplied(Math.ceil((parseInt(newCourseDetail?.courseFee)) - (parseInt(newCourseDetail?.courseFee) * parseInt(couponValueData.couponValue)) / 100))
      } else {
        setCouponApplied(Math.ceil(parseInt(newCourseDetail?.courseFee) - parseInt(couponValueData.couponValue)))
      }
    }
    else {
      setCouponApplied(newCourseDetail?.courseFee)
    }

  }, [newCourseDetail, couponValueData])

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)

      listCourse()
      listCouponApiCall()
      listBatchApiCall()

    }
  }, [user])

  const handleChange = (e: any) => {
    setStudentData({
      ...studentData, [e.target.name]: e.target.value
    })

  }

  const handleEditClose = () => {

    setOpenEdit(false)
  }

  const handleEditClickOpen = () => {
    setOpenEdit(true)

  }

  interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
  }

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'top' : 'top'
  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350
      }
    }
  }


  const handleSelectChange: any = (event: SelectChangeEvent<typeof courseName>) => {
    setCourseName(

      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };

  const handleClickOpen = () => setOpenCourseDialog(true)
  const handleCourseDialogClose = () => {
    setOpenCourseDialog(false)
    setCourseDetails({
      ...courseDetails, "courseDescription": '',
      "courseFee": 0,
      "courseName": '',
      "courseFeeDescription": "",
      "maxPaymentInstallment": 0,
    });
  }

  const [courseDetails, setCourseDetails] = useState<any>({
    courseName: "",
    courseDescription: "",
    courseFee: null
    , courseFeeDescription: "",
    maxPaymentInstallment: 2
  });


  const [open, setOpen] = useState<any>({ open: false, mssg: "" })

  const formCourseSubmit = () => {

    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId


      if (courseDetails.courseName !== '' && courseDetails.courseFee && courseDetails.courseDescription && courseDetails.courseFeeDescription) {
        if (courseDetails.courseFee > 0) {
          createCourse({ id: organizationId, customerId: customerId, courseDetails: courseDetails }).then((res: any) => {
            if (res.data.statusCode == 200) {
              setSnackbarColor(true)
              setOpen({ open: true, mssg: "New course created successfully" })
              setSubmitted(false)
              listCourse();
            }
            else {

              setOpen({ open: true, mssg: res.data.message })
            }

          }).catch((err: any) => console.log(err));
          setCourseDetails({
            ...courseDetails, "courseDescription": '',
            "courseFee": 0,
            "courseName": '',
            "courseFeeDescription": "",
            "maxPaymentInstallment": 0,
          });
          handleCourseDialogClose();

        }
        else {
          setSnackbarColor(false)
          setOpen({ open: true, mssg: "Course fee must be a positive number" })
        }
      }

      else {
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Fill all the required information" })
      }
    }
  }

  const courseChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value })
  }

  const handleClose = () => {

    if (open.open == true) {
      setOpen({ open: false, mssg: "" })
    }

  }

  const [coupounApply, setCoupounApply] = useState<any>('No')

  const handleCouponApplyChange = (e: any) => {
    if (e.target.value == "Yes") {
      setCoupounApply(e.target.value)
    }
    else {
      setCouponApplied(newCourseDetail?.courseFee)
      setCoupon("")
      setCoupounApply("No")
    }


  }

  const steps = [
    {
      title: 'Assign a batch'
    },
    {
      title: 'Payment Plan'
    },
    {
      title: 'Payment Details'
    },
    {
      title: 'Rivew Details'
    }
  ]

  const [openPopPop, setOpenPopPop] = useState<any>(false)

  const handleConfirmation = () => {
    if (activeStep == 3) {
      setActiveStep(prevActiveStep => prevActiveStep - 2)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    const emptyArray: any = []
    setArrayForInstallmentdetails(emptyArray)
    setNextButtonShow(emptyArray)
    setNextInstallment(false)
    setFirstPaymentStatus('payed')
    setNumberOfInstallment(-1)
    setOpenPopPop(false)
    setButtonShow(emptyArray)
    setPaymentDescription(emptyArray)
    setStartDate(null)
    setSelectPartPayment(null)
  }

  const handleConfirmationCancel = () => {
    setOpenPopPop(false)
  }

  const handleBack = () => {
    if (activeStep == 3 || activeStep == 2) {
      setOpenPopPop(true)
      setCouponApplied(newCourseDetail?.courseFee)
      setCoupon("")
      setCoupounApply("No")
    } else {
      setCouponApplied(newCourseDetail?.courseFee)
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
  }


  const handleNext = () => {

    if (activeStep === 2 && paymentDescription != "" && startDate) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    else if (activeStep === 1 && (selectPartPayment == true || selectPartPayment == false) && coupounApply != "" && ((coupounApply == 'Yes' && coupon) || coupounApply == 'No')) {
      if (couponApplied == 0 && selectPartPayment == true) {
        setSnackbarColor(false)
        setOpen({ open: true, mssg: 'Unable to create installments' })
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      }
    }
    else if (activeStep === 2 && numberOfInstallment > 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    else if (activeStep === steps.length - 1) {
      setSnackbarColor(true)
      setOpen({ open: true, mssg: 'Form submitted' })
    } else if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: 'Fill all the required fields' })
    }

  }
  function checkPaymentStatus(arr: any) {
    const allPaid: any = arr.every(function (value: any) {
      return value.paymentStatus === 'payed';
    });
    const paymentStatus = allPaid ? 'payed' : 'due';

    return paymentStatus;
  }

  const updateCourseApi: any = (customerId: any, organizationId: any, newCourseDetail: any) => {
    const batch: any = []

    if (batchName.length > 0) {
      for (const singleBatch of listBatch) {
        for (const singleBatchName of batchName) {
          if (singleBatch.batchName == singleBatchName) {
            delete singleBatch.batchDescription
            delete singleBatch.dateCreated
            batch.push(singleBatch)
          }
        }
      }
    }

    let newBatch = {
      "batchId": batch[0].batchId,
      "batchStatus": batch[0].batchStatus
    }

    let newStudent = {
      "rollNo": studentId,
      "studentStatus": singleStudentData.studentStatus
    }

    updateBatchInCourse(customerId, organizationId, newCourseDetail.courseId, newBatch, newStudent)

  }

  const updateBatchApi: any = (customerId: any, organizationId: any, newCourseDetail: any) => {
    let newCourse = {
      "courseId": newCourseDetail.courseId,
      "courseStatus": newCourseDetail.courseStatus
    }

    let newStudent = {
      "rollNo": studentId,
      "studentStatus": singleStudentData.studentStatus
    }

    const batch: any = []

    if (batchName.length > 0) {
      for (const singleBatch of listBatch) {
        for (const singleBatchName of batchName) {
          if (singleBatch.batchName == singleBatchName) {
            delete singleBatch.batchDescription
            delete singleBatch.dateCreated
            batch.push(singleBatch)
          }
        }
      }
    }

    updateCourseInBatch(customerId, organizationId, batch[0].batchId, newCourse, newStudent)
  }

  const [batchDetails, setBatchDetails] = useState<any>()

  const handleApiCall = () => {

    const batch: any = []
    if (batchName.length > 0) {
      for (const singleBatch of listBatch) {
        for (const singleBatchName of batchName) {
          if (singleBatch.batchName == singleBatchName) {
            delete singleBatch.batchDescription
            delete singleBatch.dateCreated
            batch.push(singleBatch)
          }
        }
      }
    }

    // const uniqueIds = new Set();
    // const result: any = [];
    // // Process batchTwo array
    // batchDetails.forEach((item: any) => {
    //   if (!uniqueIds.has(item.batchName)) {
    //     uniqueIds.add(item.batchName);
    //     result.push(item);
    //   }
    // });
    // // Process batch array 
    // batch.forEach((item: any) => {
    //   if (!uniqueIds.has(item.batchName)) {
    //     uniqueIds.add(item.batchName);
    //     let toPushBatch = {
    //       batchId: item.batchId
    //     }
    //     result.push(toPushBatch);
    //   }
    // });

    let result: any = []

    for (let singleObj of batchDetails) {
      if (!result.find((obj: any) => obj.batchId == singleObj.batchId)) {
        result.push(singleObj)
      }
    }

    for (let singleObj of batch) {
      if (!result.find((obj: any) => obj.batchId == singleObj.batchId)) {
        let toPushBatch = {
          batchId: batch[0].batchId
        }
        result.push(toPushBatch)
      }
    }

    if (singleStudentData?.paymentDetails?.isPartPayment == true) {
      if (selectPartPayment) {
        const newArray = []
        const newCoupon = []
        const newCourse = []
        for (const singleObj of singleStudentData?.paymentDetails?.installmentDetails) {
          newArray.push(singleObj)
        }
        let count = singleStudentData?.paymentDetails?.installmentDetails.length
        for (const singleObj of installmentDetailsArray) {
          count++
          singleObj.installmentNumber = count;
          newArray.push(singleObj)
        }


        for (const singleObj of singleStudentData?.courses) {
          newCourse.push(singleObj)
        }
        if (newCourseDetail) {
          let newCourseIdObj = {
            courseId: newCourseDetail.courseId
          }
          newCourse.push(newCourseIdObj)
        }
        for (const singleObj of singleStudentData?.coupon) {
          newCoupon.push(singleObj)
        }
        if (couponValueData) {
          newCoupon.push(couponValueData)
        }

        let totalDuePayment = 0;
        let totalReceivedPayment = 0;

        for (const singleObj of newArray) {
          if (singleObj.paymentStatus == 'payed') {
            totalReceivedPayment += parseInt(singleObj.receivedPayment)
          } else {
            totalDuePayment += parseInt(singleObj.duePayment)
          }
        }

        newArray.sort((a: any, b: any) => {
          if (a.paymentStatus === "payed" && b.paymentStatus === "due") {
            return -1;
          } else if (a.paymentStatus === "due" && b.paymentStatus === "payed") {
            return 1;
          } else {
            return 0;
          }
        });

        let counter = 1;
        for (const singleObj of newArray) {
          singleObj.installmentNumber = counter;
          counter++
        }

        const studentData = {
          customerId: user.customerId,
          organizationId: user.organizationId,
          rollNo: studentId,
          courses: newCourse,
          coupon: newCoupon,
          batch: result,
          paymentDetails: {
            isPartPayment: true,
            grandTotalPaymentAmount: parseInt(singleStudentData?.paymentDetails?.grandTotalPaymentAmount) + parseInt(newCourseDetail?.courseFee),
            totalPayment: parseInt(singleStudentData?.paymentDetails?.totalPayment) + parseInt(couponApplied),
            discountedPaymentAmount: parseInt(singleStudentData?.paymentDetails?.discountedPaymentAmount) + parseInt(newCourseDetail?.courseFee) - parseInt(couponApplied),
            totalDuePayment: totalDuePayment,
            totalReceivedPayment: totalReceivedPayment,
            allPaymentStatus: checkPaymentStatus(newArray),
            installmentDetails: newArray,
          },
        }

        updateStudenCourseCouponBatchDetails(studentData).then((res) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setOpen({ open: true, mssg: "New course added sucessfully" })
            setPopUp(false)
            updateBatchApi(user.customerId, user.organizationId, newCourseDetail)
            updateCourseApi(user.customerId, user.organizationId, newCourseDetail)
            router.push(`/student/studentDetails/${studentId}`)
            listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
              setStudentData(res.data.courses)
              setActiveStep(0)
              setCouponApplied(newCourseDetail?.courseFee)
              setSelectPartPayment(null)
              setBatchDetails(res.data.batch)
              setCoupon(null)
              setBatchName([])
              setCouponValueData(null)
              setSingleStudentData(res.data)
              if (res.statuscode == 200) {
                setIsLoading(false)
              }
            })
          } else {
            setOpen({ open: true, mssg: res.message })
          }

        })
      } else {

        const newArray = []
        const newCoupon = []
        const newCourse = []
        let count = singleStudentData?.paymentDetails?.installmentDetails.length
        for (const singleObj of singleStudentData?.paymentDetails?.installmentDetails) {
          newArray.push(singleObj)
        }

        let newInstallmentObj

        if (firstPaymentStatus == "payed") {
          newInstallmentObj = {
            installmentNumber: count++,
            paymentStatus: firstPaymentStatus,
            paymetReceiveDate: startDate && `${("0" + (startDate.getDate())).slice(-2)}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${startDate.getFullYear()}`,
            receivedPayment: parseInt(couponApplied),
            paymentNotes: paymentDescription
          }
        } else {
          newInstallmentObj = {
            installmentNumber: count++,
            paymentStatus: firstPaymentStatus,
            nextpaymetDate: startDate && `${("0" + (startDate.getDate())).slice(-2)}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${startDate.getFullYear()}`,
            duePayment: parseInt(couponApplied),
            paymentNotes: paymentDescription
          }
        }

        newArray.push(newInstallmentObj)


        for (const singleObj of singleStudentData?.courses) {
          newCourse.push(singleObj)
        }
        if (newCourseDetail) {
          let newCourseIdObj = {
            courseId: newCourseDetail.courseId
          }
          newCourse.push(newCourseIdObj)
        }

        for (const singleObj of singleStudentData?.coupon) {
          newCoupon.push(singleObj)
        }
        if (couponValueData) {
          newCoupon.push(couponValueData)
        }

        let totalDuePayment = 0;
        let totalReceivedPayment = 0;

        for (const singleObj of newArray) {
          if (singleObj.paymentStatus == 'payed') {
            totalReceivedPayment += parseInt(singleObj.receivedPayment)
          } else {
            totalDuePayment += parseInt(singleObj.duePayment)
          }
        }

        newArray.sort((a: any, b: any) => {
          if (a.paymentStatus === "payed" && b.paymentStatus === "due") {
            return -1;
          } else if (a.paymentStatus === "due" && b.paymentStatus === "payed") {
            return 1;
          } else {
            return 0;
          }
        });

        let counter = 1;
        for (const singleObj of newArray) {
          singleObj.installmentNumber = counter;
          counter++
        }

        const studentData = {
          customerId: user.customerId,
          organizationId: user.organizationId,
          rollNo: studentId,
          courses: newCourse,
          coupon: newCoupon,
          batch: result,
          paymentDetails: {
            isPartPayment: true,
            grandTotalPaymentAmount: parseInt(singleStudentData?.paymentDetails?.grandTotalPaymentAmount) + parseInt(newCourseDetail?.courseFee),
            totalPayment: parseInt(singleStudentData?.paymentDetails?.totalPayment) + parseInt(couponApplied),
            discountedPaymentAmount: parseInt(singleStudentData?.paymentDetails?.discountedPaymentAmount) + parseInt(newCourseDetail?.courseFee) - parseInt(couponApplied),
            totalDuePayment: totalDuePayment,
            totalReceivedPayment: totalReceivedPayment,
            allPaymentStatus: checkPaymentStatus(newArray),
            installmentDetails: newArray,
          },
        }

        updateStudenCourseCouponBatchDetails(studentData).then((res) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setOpen({ open: true, mssg: "New course added sucessfully " })
            setPopUp(false)
            updateBatchApi(user.customerId, user.organizationId, newCourseDetail)
            updateCourseApi(user.customerId, user.organizationId, newCourseDetail)
            router.push(`/student/studentDetails/${studentId}`)
            listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
              setStudentData(res.data.courses)
              setActiveStep(0)
              setBatchDetails(res.data.batch)
              setCoupon(null)
              setBatchName([])
              setSelectPartPayment(null)
              setCouponValueData(null)
              setCouponApplied(newCourseDetail?.courseFee)
              setSingleStudentData(res.data)
              if (res.statuscode == 200) {
                setIsLoading(false)
              }
            })
          } else {
            setOpen({ open: true, mssg: res.message })
          }

        })
      }

    } else {
      if (selectPartPayment) {
        const newArray = []
        const newCoupon = []
        const newCourse = []

        if (singleStudentData?.paymentDetails?.allPaymentStatus == "payed") {

          const firstObj = {
            installmentNumber: 1,
            paymentStatus: singleStudentData?.paymentDetails?.allPaymentStatus,
            paymetReceiveDate: singleStudentData?.paymentDetails?.paymetReceiveDate,
            receivedPayment: parseInt(singleStudentData?.paymentDetails?.totalReceivedPayment),
            paymentNotes: singleStudentData?.paymentDetails?.paymentNotes
          }

          newArray.push(firstObj)



        } else if (singleStudentData?.paymentDetails?.allPaymentStatus == "due") {

          const firstObj = {
            installmentNumber: 1,
            paymentStatus: singleStudentData?.paymentDetails?.allPaymentStatus,
            nextpaymetDate: singleStudentData?.paymentDetails?.nextPaymetReceiveDate,
            duePayment: parseInt(singleStudentData?.paymentDetails?.nextReceivedPayment),
            paymentNotes: singleStudentData?.paymentDetails?.paymentNotes
          }

          newArray.push(firstObj)
        }

        let count = 1;
        for (const singleObj of installmentDetailsArray) {
          count++
          singleObj.installmentNumber = count;
          newArray.push(singleObj)
        }


        for (const singleObj of singleStudentData?.courses) {
          newCourse.push(singleObj)
        }
        if (newCourseDetail) {
          let newCourseIdObj = {
            courseId: newCourseDetail.courseId
          }
          newCourse.push(newCourseIdObj)
        }

        for (const singleObj of singleStudentData?.coupon) {
          newCoupon.push(singleObj)
        }
        if (couponValueData) {
          newCoupon.push(couponValueData)
        }

        let totalDuePayment = 0;
        let totalReceivedPayment = 0;

        for (const singleObj of newArray) {
          if (singleObj.paymentStatus == 'payed') {
            totalReceivedPayment += parseInt(singleObj.receivedPayment)
          } else {
            totalDuePayment += parseInt(singleObj.duePayment)
          }
        }

        newArray.sort((a: any, b: any) => {
          if (a.paymentStatus === "payed" && b.paymentStatus === "due") {
            return -1;
          } else if (a.paymentStatus === "due" && b.paymentStatus === "payed") {
            return 1;
          } else {
            return 0;
          }
        });

        let counter = 1;
        for (const singleObj of newArray) {
          singleObj.installmentNumber = counter;
          counter++
        }

        const studentData = {
          customerId: user.customerId,
          organizationId: user.organizationId,
          rollNo: studentId,
          courses: newCourse,
          coupon: newCoupon,
          batch: result,
          paymentDetails: {
            isPartPayment: true,
            grandTotalPaymentAmount: parseInt(singleStudentData?.paymentDetails?.grandTotalPaymentAmount) + parseInt(newCourseDetail?.courseFee),
            totalPayment: parseInt(singleStudentData?.paymentDetails?.totalPayment) + parseInt(couponApplied),
            discountedPaymentAmount: parseInt(singleStudentData?.paymentDetails?.discountedPaymentAmount) + parseInt(newCourseDetail?.courseFee) - parseInt(couponApplied),
            totalDuePayment: totalDuePayment,
            totalReceivedPayment: totalReceivedPayment,
            allPaymentStatus: checkPaymentStatus(newArray),
            installmentDetails: newArray,
          },
        }

        updateStudenCourseCouponBatchDetails(studentData).then((res) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setOpen({ open: true, mssg: "New course added sucessfully " })
            setPopUp(false)
            updateBatchApi(user.customerId, user.organizationId, newCourseDetail)
            updateCourseApi(user.customerId, user.organizationId, newCourseDetail)
            router.push(`/student/studentDetails/${studentId}`)
            listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
              setStudentData(res.data.courses)
              setBatchDetails(res.data.batch)
              setSingleStudentData(res.data)
              if (res.statuscode == 200) {
                setIsLoading(false)
              }
            })
          } else {
            setOpen({ open: true, mssg: res.message })
          }

        })

      } else {

        const newArray: any = []
        const newCoupon = []
        const newCourse = []

        if (singleStudentData?.paymentDetails?.allPaymentStatus == "payed") {

          const firstObj = {
            installmentNumber: 1,
            paymentStatus: singleStudentData?.paymentDetails?.allPaymentStatus,
            paymetReceiveDate: singleStudentData?.paymentDetails?.paymetReceiveDate,
            receivedPayment: singleStudentData?.paymentDetails?.totalReceivedPayment,
            paymentNotes: singleStudentData?.paymentDetails?.paymentNotes
          }

          newArray.push(firstObj)



        } else if (singleStudentData?.paymentDetails?.allPaymentStatus == "due") {

          const firstObj = {
            installmentNumber: 1,
            paymentStatus: singleStudentData?.paymentDetails?.allPaymentStatus,
            nextpaymetDate: singleStudentData?.paymentDetails?.nextPaymetReceiveDate,
            duePayment: singleStudentData?.paymentDetails?.nextReceivedPayment,
            paymentNotes: singleStudentData?.paymentDetails?.paymentNotes
          }

          newArray.push(firstObj)

        }

        let newInstallmentObj

        if (firstPaymentStatus == "payed") {
          newInstallmentObj = {
            installmentNumber: 2,
            paymentStatus: firstPaymentStatus,
            paymetReceiveDate: startDate && `${("0" + (startDate.getDate())).slice(-2)}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${startDate.getFullYear()}`,
            receivedPayment: couponApplied,
            paymentNotes: paymentDescription
          }
        } else {
          newInstallmentObj = {
            installmentNumber: 2,
            paymentStatus: firstPaymentStatus,
            nextpaymetDate: startDate && `${("0" + (startDate.getDate())).slice(-2)}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${startDate.getFullYear()}`,
            duePayment: couponApplied,
            paymentNotes: paymentDescription
          }
        }

        newArray.push(newInstallmentObj)

        for (const singleObj of singleStudentData?.courses) {
          newCourse.push(singleObj)
        }
        if (newCourseDetail) {
          let newCourseIdObj = {
            courseId: newCourseDetail.courseId
          }
          newCourse.push(newCourseIdObj)
        }
        for (const singleObj of singleStudentData?.coupon) {
          newCoupon.push(singleObj)
        }
        if (couponValueData) {
          newCoupon.push(couponValueData)
        }

        let totalDuePayment = 0;
        let totalReceivedPayment = 0;


        for (const singleObj of newArray) {
          if (singleObj.paymentStatus == 'payed') {
            totalReceivedPayment += parseInt(singleObj.receivedPayment)
          } else {
            totalDuePayment += parseInt(singleObj.duePayment)
          }
        }

        newArray.sort((a: any, b: any) => {
          if (a.paymentStatus === "payed" && b.paymentStatus === "due") {
            return -1;
          } else if (a.paymentStatus === "due" && b.paymentStatus === "payed") {
            return 1;
          } else {
            return 0;
          }
        });

        let counter = 1;
        for (const singleObj of newArray) {
          singleObj.installmentNumber = counter;
          counter++
        }

        const studentData = {
          customerId: user.customerId,
          organizationId: user.organizationId,
          rollNo: studentId,
          courses: newCourse,
          coupon: newCoupon,
          batch: result,
          paymentDetails: {
            isPartPayment: true,
            grandTotalPaymentAmount: parseInt(singleStudentData?.paymentDetails?.grandTotalPaymentAmount) + parseInt(newCourseDetail?.courseFee),
            totalPayment: parseInt(singleStudentData?.paymentDetails?.totalPayment) + parseInt(couponApplied),
            discountedPaymentAmount: parseInt(singleStudentData?.paymentDetails?.discountedPaymentAmount) + parseInt(newCourseDetail?.courseFee) - parseInt(couponApplied),
            totalDuePayment: totalDuePayment,
            totalReceivedPayment: totalReceivedPayment,
            allPaymentStatus: checkPaymentStatus(newArray),
            installmentDetails: newArray,
          },
        }

        updateStudenCourseCouponBatchDetails(studentData).then((res) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setOpen({ open: true, mssg: "New course added sucessfully " })
            setPopUp(false)
            updateBatchApi(user.customerId, user.organizationId, newCourseDetail)
            updateCourseApi(user.customerId, user.organizationId, newCourseDetail)
            router.push(`/student/studentDetails/${studentId}`)
            listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
              setStudentData(res.data.courses)
              setBatchDetails(res.data.batch)
              setSingleStudentData(res.data)
              if (res.statuscode == 200) {
                setIsLoading(false)
              }
            })
          } else {
            setOpen({ open: true, mssg: res.message })
          }

        })
      }
    }
  }

  const [maxInstallmentArray, setMaxInstallmentArray] = useState<any>()
  useEffect(() => {
    const array: any = []
    if (newCourseDetail?.maxPaymentInstallment) {
      for (let i = 1; i < newCourseDetail?.maxPaymentInstallment; i++) {
        array.push(i + 1);
      }
    }
    setMaxInstallmentArray(array)
  }, [newCourseDetail])

  const [numberOfInstallment, setNumberOfInstallment] = useState<number>(-1)
  const [firstPaymentStatus, setFirstPaymentStatus] = useState<any>('payed')
  const [numberOfInstallmentArray, setNumberOfInstallmentArray] = useState<any>([])
  const installmentArray: any = []
  useEffect(() => {

    for (let i = 0; i < numberOfInstallment; i++) {
      const singleObj = {
        installmentReceivedDate: null,
        installmentPaymentDescription: '',
        installmentReceivedPayment: 0
      }
      installmentArray.push(singleObj)
    }
    setNumberOfInstallmentArray(installmentArray)

  }, [numberOfInstallment])

  const [dividedAmountAfterFirstPayment, setDividedAmountAfterFirstPayment] = useState<number>(0)
  const [nextInstallment, setNextInstallment] = useState<any>()
  const [buttonShow, setButtonShow] = useState([])
  const [nextButtonShow, setNextButtonShow] = useState([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [arrayForInstallmentdetails, setArrayForInstallmentdetails] = useState<any>([])
  const [receivedPayment, setReceivedPayment] = useState<any>()
  const [installmentDetailsArray, setInstallmentDetailsArray] = useState<any>([])
  const MUITableCell: any = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
    borderBottom: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: `${theme.spacing(1)} !important`,
    paddingBottom: `${theme.spacing(1)} !important`
  }))

  const [paymentDescription, setPaymentDescription] = useState<any>('')
  const [batchName, setBatchName] = useState<string[]>([]);
  const [listBatch, setListBatch] = useState<any>([])
  const [openBatchDialog, setOpenBatchDialog] = useState<boolean>(false)
  const [batchData, setBatchData] = useState<any>({
    batchName: "",
    batchDescription: "",
    batchClassStartTime: "",
    batchClassEndTime: "",
    batchStartDate: "",
    batchEndDate: "",
    batchMode: ""
  })

  const [toSetTime, setToSetTime] = useState<any>('yes')
  const [toSetDate, setToSetDate] = useState<any>('yes')
  const [startTime, setStartTime] = useState<any>(null)
  const [endTime, setEndTime] = useState<any>(null)
  const [startBatchDate, setStartBatchDate] = useState<DateType>()
  const [endDate, setEndDate] = useState<DateType>()
  const [batchTime, setBatchTime] = useState<any>(false)

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
                setStartBatchDate(null)
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
                setStartBatchDate(null)
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
                setStartBatchDate(null)
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
                setOpen({ open: true, mssg: "created successfully" })
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
                setStartBatchDate(null)
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
      setBatchTime(true)
      setSnackbarColor(false)
      setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time " })
    }
  }

  const listBatchApiCall = () => {
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      getAllBatchList(customerId, organizationId).then((res: any) => {
        setListBatch(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    }
  }

  const handleClickBatchDialogOpen = () => { setOpenBatchDialog(true) }
  const handleBatchDialogClose = () => setOpenBatchDialog(false)
  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value })
  }

  const handleStartTimeChange = (date: any) => {
    setStartTime(date);
    if (endTime && date) {
      const timeDiffInMinutes = Math.round((endTime - date) / (1000 * 60));
      console.log(timeDiffInMinutes)
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
      console.log(timeDiffInMinutes)
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

  useEffect(() => {
    if (startBatchDate) {
      batchData.batchStartDate = customDateFormat(startBatchDate);
      setBatchData(batchData)
    }
    if (endDate) {
      batchData.batchEndDate = customDateFormat(endDate);
      setBatchData(batchData)
    }
    if (endTime) {
      batchData.batchClassEndTime = customTimeFormat(endTime);
      setBatchData(batchData)
    }
    if (startTime) {
      batchData.batchClassStartTime = customTimeFormat(startTime);
      setBatchData(batchData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, startBatchDate, endDate])

  const handleBatchSelectChange: any = (event: SelectChangeEvent<typeof batchName>) => {
    // const { target: { value }, } = event.target.value;
    setBatchName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };

  function findDifferentBatchObjects(array1: any, array2: any) {
    let newFinalArray = []
    if (array1.length != 0) {
      for (let singleObj of array2) {
        if (singleObj.batchStatus == "active") {
          if (!array1.find((obj2: any) => obj2.batchId == singleObj.batchId)) {
            newFinalArray.push(singleObj)
          }
        }
      }
    }
    else {
      let filteredActiveBatch = array2.filter((obj: any) => obj.batchStatus == "active")
      newFinalArray = filteredActiveBatch
    }
    return newFinalArray
  }

  const [filteredNewBatchForStudent, setFilteredNewBatchForStudent] = useState<any>([])

  useEffect(() => {
    if (batchDetails && batchDetails.length >= 0 && listBatch && listBatch.length > 0) {
      const differentObjects = findDifferentBatchObjects(batchDetails, listBatch);
      setFilteredNewBatchForStudent(differentObjects)
    }
  }, [listBatch, batchDetails])


  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>

            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

              <Grid item xs={12} sm={6} mt={2} >
                <FormControl fullWidth sx={{ marginLeft: 5 }} >
                  <InputLabel id="demo-multiple-checkbox-label" style={{ width: '350px' }}>Batch name</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    required
                    value={batchName}
                    onChange={handleBatchSelectChange}
                    input={<OutlinedInput label="Batch name" />}
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{ width: '350px' }}
                  >

                    {filteredNewBatchForStudent && filteredNewBatchForStudent.length > 0 ? (
                      filteredNewBatchForStudent.map((name: any) => (
                        <MenuItem key={name.batchId} value={name.batchName} style={{ width: '350px' }} >
                          <Checkbox checked={batchName?.indexOf(name.batchName) > -1} />
                          <ListItemText primary={name.batchName} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled style={{ width: '350px' }}>
                        No data found
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={1} sm={0} component={"div"} onClick={() => {
                handleClickBatchDialogOpen()
              }}>
                <Button>
                  <AddCircleIcon color='primary' />
                </Button>
              </Grid>

            </Grid>


          </>
        )
      case 1:
        return (

          <Fragment>
            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <TableContainer>
                <Grid container spacing={10}>
                  <Grid item xs={12} sm={6} mt={2}>
                    <FormControl fullWidth>
                      <TextField
                        value={newCourseDetail?.courseFee}
                        label='Total course amount'
                        disabled
                        placeholder='Total course amount'
                        aria-describedby='stepper-linear-totalPaymentAmount'
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} mt={2}>
                    <FormControl fullWidth >
                      <InputLabel
                        id='validation-basic-select'
                        htmlFor='validation-basic-select'
                      >
                        Part payment
                      </InputLabel>
                      <Select
                        defaultValue="false"
                        value={selectPartPayment}
                        label='Part payment'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        <MenuItem value="true" onClick={() => setSelectPartPayment(true)}>Yes</MenuItem>
                        <MenuItem value="false" onClick={() => setSelectPartPayment(false)}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={7}>
                    <FormControl >
                      <FormLabel>Do you want to apply coupon ?</FormLabel>
                      <RadioGroup
                        row
                        defaultValue={coupounApply}
                        aria-label='address type'
                        name='form-layouts-collapsible-address-radio'
                      >
                        <FormControlLabel value='Yes' onChange={handleCouponApplyChange} control={<Radio />} label='Yes' />
                        <FormControlLabel value='No' onChange={handleCouponApplyChange} control={<Radio />} label='No' />
                      </RadioGroup>
                    </FormControl>
                  </Grid>


                  {
                    coupounApply === "Yes" &&
                    <>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                          <InputLabel
                            id='validation-basic-select'
                            htmlFor='validation-basic-select'
                          >
                            Coupon list
                          </InputLabel>

                          <Select
                            value={coupon ? coupon : ""}
                            label='Coupon list'
                            labelId='validation-basic-select'
                            aria-describedby='validation-basic-select'
                            style={{ maxHeight: '100px', overflowY: 'hidden' }}
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
                                No coupons available
                              </MenuItem>
                            )}

                          </Select>

                        </FormControl>


                      </Grid>
                      <Grid item xs={1} sm={0}>
                        <AddCircleIcon onClick={() => {
                          handleClickCouponDialogOpen()
                          setDialogTitle('Add')
                        }} color='primary' style={{ marginTop: "12px", cursor: "pointer" }} />

                      </Grid>
                    </>
                  }

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={couponApplied ? couponApplied : couponApplied == 0 ? 0 : ""}
                      label='Discounted course fee amount'
                      fullWidth
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}

                      aria-describedby='stepper-linear-totalPaymentAmount'
                    />
                  </Grid>

                </Grid>
              </TableContainer>
            </DialogContent>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <TableContainer sx={{ overflow: "hidden" }}>
                <Grid container spacing={5}>

                  {singleStudentData?.paymentDetails?.isPartPayment == true ?
                    <>
                      {selectPartPayment == true ?
                        <>
                          <Grid item xs={12} sm={6} mt={2}>

                            <TextField
                              value={couponApplied ? couponApplied : ""}
                              label='Discounted course fee amount'
                              fullWidth
                              disabled
                              InputLabelProps={{
                                shrink: true,
                              }}
                              aria-describedby='stepper-linear-totalPaymentAmount'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                              <InputLabel
                                id='validation-basic-select'
                                htmlFor='validation-basic-select'
                              >
                                Number of installments
                              </InputLabel>

                              <Select
                                value={numberOfInstallment}
                                label='Number of installments'
                                onChange={(e: any) => setNumberOfInstallment(e.target.value)}
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                                MenuProps={MenuProps}
                              >
                                {maxInstallmentArray.length === 0 ? (
                                  <MenuItem value="" disabled>
                                    No data found
                                  </MenuItem>
                                ) : (
                                  maxInstallmentArray.map((e: any, index: any) => (
                                    <MenuItem key={index} value={e}>
                                      {e}
                                    </MenuItem>
                                  ))
                                )}


                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                              <InputLabel
                                id='validation-basic-select'
                                htmlFor='validation-basic-select'
                              >
                                Are you paying first installment right now ?
                              </InputLabel>

                              <Select
                                value={firstPaymentStatus}
                                label=' Are you paying first installment right now ?'
                                onChange={(e: any) => { setFirstPaymentStatus(e.target.value) }}
                                required
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                              >
                                <MenuItem value="payed" selected>Pay</MenuItem>
                                <MenuItem value='due'>Due</MenuItem>
                              </Select>

                            </FormControl>
                          </Grid>

                          {(firstPaymentStatus == 'payed' || firstPaymentStatus == 'due') && numberOfInstallmentArray.map((e: any, index: any) => {
                            return (
                              <NewInstallmentComponent
                                index={index}
                                key={index}
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
                        </> : <>

                          <Grid item xs={12}>


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
                                label=' Are you paying first installment right now ?'
                                onChange={(e: any) => { setFirstPaymentStatus(e.target.value) }}
                                required
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                              >
                                <MenuItem value="payed" selected>Pay</MenuItem>
                                <MenuItem value='due'>Due</MenuItem>
                              </Select>

                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>

                              <TextField
                                value={paymentDescription}
                                required
                                label='Payment description'
                                onChange={(e) => setPaymentDescription(e.target.value)}
                                placeholder='Payment description'
                                inputProps={{
                                  maxLength: 500,
                                }}
                                aria-describedby='stepper-linear-paymentDescription'

                              />
                            </FormControl>
                          </Grid>


                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                required
                                showYearDropdown
                                showMonthDropdown
                                id='basic-input'
                                popperPlacement="top"
                                onChange={(date: Date) => setStartDate(date)}
                                placeholderText='payment Received Date'
                                customInput={<CustomInput
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                  }}
                                  label='Payment received date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                    throw new Error('Function not implemented.');
                                  }} />}
                              />
                            </DatePickerWrapper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <TextField
                                value={couponApplied}
                                disabled
                                label='Total received payment'
                                placeholder='Total received payment'
                                aria-describedby='stepper-linear-totalReceivedPayment'
                              />
                            </FormControl>
                          </Grid>
                        </>}

                    </> :
                    <>
                      {selectPartPayment == true ?
                        <>
                          <Grid item xs={12} sm={6} mt={2}>
                            <TextField
                              value={couponApplied ? couponApplied : ""}
                              label='Discounted course fee amount'
                              fullWidth
                              disabled
                              InputLabelProps={{
                                shrink: true,
                              }}
                              aria-describedby='stepper-linear-totalPaymentAmount'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                              <InputLabel
                                id='validation-basic-select'
                                htmlFor='validation-basic-select'
                              >
                                Number Of Installments
                              </InputLabel>

                              <Select
                                value={numberOfInstallment}
                                label='Number Of Installments'
                                onChange={(e: any) => setNumberOfInstallment(e.target.value)}
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                                MenuProps={MenuProps}
                              >
                                {maxInstallmentArray.map((e: any, i: number) => {
                                  return (
                                    <MenuItem key={i} value={e}>{e}</MenuItem>
                                  )
                                })}


                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                              <InputLabel
                                id='validation-basic-select'
                                htmlFor='validation-basic-select'
                              >
                                Are you paying First Installment right now ?
                              </InputLabel>

                              <Select
                                value={firstPaymentStatus}
                                label=' Are you paying First Installment right now ?'
                                onChange={(e: any) => { setFirstPaymentStatus(e.target.value) }}
                                required
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                              >
                                <MenuItem value="payed" selected>Pay</MenuItem>
                                <MenuItem value='due'>Due</MenuItem>
                              </Select>

                            </FormControl>
                          </Grid>

                          {(firstPaymentStatus == 'payed' || firstPaymentStatus == 'due') && numberOfInstallmentArray.map((e: any, index: any) => {
                            return (
                              <NewInstallmentComponent
                                index={index}
                                key={index}
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
                        </> :
                        <>

                          <Grid item xs={12}>


                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel
                                id='validation-basic-select'
                                htmlFor='validation-basic-select'
                              >
                                Are you paying right now ?
                              </InputLabel>

                              <Select
                                value={firstPaymentStatus}
                                label='  Are you paying right now ?'
                                onChange={(e: any) => { setFirstPaymentStatus(e.target.value) }}
                                required
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                              >
                                <MenuItem value="payed" selected>Pay</MenuItem>
                                <MenuItem value='due'>Due</MenuItem>
                              </Select>

                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>

                              <TextField
                                value={paymentDescription}
                                label='Payment description'
                                onChange={(e) => setPaymentDescription(e.target.value)}
                                placeholder='Payment description'
                                inputProps={{
                                  maxLength: 500,
                                }}
                                aria-describedby='stepper-linear-paymentDescription'
                              />

                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                required
                                showYearDropdown
                                showMonthDropdown
                                id='basic-input'
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => setStartDate(date)}
                                placeholderText='Payment Received Date'
                                customInput={<CustomInput
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                  }}
                                  label='Payment received date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                    throw new Error('Function not implemented.');
                                  }} />}
                              />
                            </DatePickerWrapper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <TextField
                                value={couponApplied}
                                disabled
                                label='Total received payment'
                                placeholder='Total received payment'
                                aria-describedby='stepper-linear-totalReceivedPayment'
                              />
                            </FormControl>
                          </Grid>
                        </>}
                    </>}


                </Grid>
              </TableContainer>
            </DialogContent>
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <>
              <CardContent sx={{ width: 350 }}>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                  <Grid item xl={12} xs={12} mt={2} sx={{ mb: { xl: 0, xs: 6 } }}>
                    <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Payment Details :</Typography>
                    <Box mt={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow sx={{ height: 35 }}>
                              <MUITableCell sx={{ pb: '0 !important' }}>Grand Total Payment Amount:</MUITableCell>
                              <MUITableCell sx={{ pb: '0 !important' }}>{newCourseDetail.courseFee ? newCourseDetail.courseFee : "-"}</MUITableCell>
                            </TableRow>

                            <TableRow sx={{ height: 35 }}>
                              <MUITableCell sx={{ pb: '0 !important' }}>Applied Coupon Name :</MUITableCell>
                              <MUITableCell sx={{ pb: '0 !important' }}>{coupon ? coupon : "-"}</MUITableCell>
                            </TableRow>
                            <TableRow sx={{ height: 35 }}>
                              <MUITableCell sx={{ pb: '0 !important' }}>Discounted Payment Amount:</MUITableCell>
                              <MUITableCell sx={{ pb: '0 !important' }}>{newCourseDetail?.courseFee - couponApplied}</MUITableCell>
                            </TableRow>
                            <TableRow sx={{ height: 35 }}>
                              <MUITableCell sx={{ pb: '0 !important' }}>Total Payment Amount:</MUITableCell>
                              <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied ? couponApplied : "0"}</MUITableCell>
                            </TableRow>

                            <TableRow sx={{ height: 35 }}>
                              <MUITableCell sx={{ pb: '0 !important' }}>Part Payment:</MUITableCell>
                              <MUITableCell sx={{ pb: '0 !important' }}>{selectPartPayment == true ? "Yes" : "No"}</MUITableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>

                  </Grid>
                </Grid>
              </CardContent>

              {singleStudentData?.paymentDetails?.isPartPayment == true ? <>
                <CardContent sx={{ mt: 5, width: "370px" }}>
                  <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    {selectPartPayment == true ? <>
                      <Grid item xl={12} xs={12} mt={2} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Typography mt={2} sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Installment Details :</Typography>

                        {installmentDetailsArray.map((installmentDetailsData: any) => {
                          if (installmentDetailsData?.installmentNumber == 1) {
                            return (
                              <>
                                <Typography mt={5} sx={{ color: 'text.secondary', fontWeight: 500 }}>Installment {installmentDetailsData?.installmentNumber} :</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>

                                        {firstPaymentStatus == "payed" ?
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.receivedPayment}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymetReceiveDate}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                            </TableRow>

                                          </>
                                          :
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.duePayment}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.nextpaymetDate}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                            </TableRow>

                                          </>
                                        }


                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </>
                            )
                          } else {
                            return (
                              <>
                                <Typography sx={{ mt: 4, color: 'text.secondary', fontWeight: 500 }}>Installment {installmentDetailsData?.installmentNumber} :</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.duePayment}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.nextpaymetDate}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                        </TableRow>

                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>

                              </>
                            )
                          }
                        })}

                      </Grid>
                    </> : <>
                      <Grid item xl={12} xs={12} mt={8} sx={{ mb: { xl: 0, xs: 6 } }}>

                        <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Full Setelment Details :</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <TableContainer>
                            <Table>
                              <TableBody>

                                {firstPaymentStatus == "payed" ?
                                  <>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied ? couponApplied : "-"}</MUITableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{startDate && `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}` ? startDate && `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}` : "-"}</MUITableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentDescription ? paymentDescription : "-"}</MUITableCell>
                                    </TableRow>

                                  </>
                                  :
                                  <>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied}</MUITableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentDescription}</MUITableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: 35 }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{startDate && `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}`}</MUITableCell>
                                    </TableRow>
                                  </>
                                }


                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Grid>
                    </>}

                  </Grid>
                </CardContent>
              </> : <>
                <CardContent sx={{ width: 370 }}>
                  <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }} mt={2}>
                    {selectPartPayment == true ? <>
                      <Grid item xl={12} xs={12} mt={2} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Typography mt={5} sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Installment Details :</Typography>

                        {installmentDetailsArray.map((installmentDetailsData: any) => {
                          if (installmentDetailsData?.installmentNumber == 1) {
                            return (
                              <>
                                <Typography mt={5} sx={{ color: 'text.secondary', fontWeight: 500 }}>Installment {installmentDetailsData?.installmentNumber} :</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>

                                        {firstPaymentStatus == "payed" ?
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.receivedPayment}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymetReceiveDate}</MUITableCell>
                                            </TableRow>
                                          </>
                                          :
                                          <>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.duePayment}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                              <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                              <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.nextpaymetDate}</MUITableCell>
                                            </TableRow>
                                          </>
                                        }


                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </>
                            )
                          } else {
                            return (
                              <>
                                <Typography sx={{ mt: 5, color: 'text.secondary', fontWeight: 500 }}>Installment {installmentDetailsData?.installmentNumber} :</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.duePayment}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.paymentNotes}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                          <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                          <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData?.nextpaymetDate}</MUITableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>

                              </>
                            )
                          }
                        })}

                      </Grid>
                    </> : <>
                      <Grid item xl={12} xs={12} mt={8} sx={{ mb: { xl: 0, xs: 6 } }}>

                        <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Full Setelment Details :</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <TableContainer>
                            <Table>
                              <TableBody>

                                {firstPaymentStatus == "payed" ?
                                  <>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied}</MUITableCell>
                                    </TableRow>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentDescription}</MUITableCell>
                                    </TableRow>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{startDate && `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}`}</MUITableCell>
                                    </TableRow>
                                  </>
                                  :
                                  <>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Amount:</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied}</MUITableCell>
                                    </TableRow>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentDescription}</MUITableCell>
                                    </TableRow>
                                    <TableRow>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Next Payment Date :</MUITableCell>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{startDate && `${("0" + (startDate.getDate())).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}`}</MUITableCell>
                                    </TableRow>
                                  </>
                                }


                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Grid>
                    </>}

                  </Grid>
                </CardContent></>}
            </>
          </Fragment>
        )

      default:
        return 'Unknown Step'
    }
  }

  useEffect(() => {
    if (activeStep == 3) {
      if (singleStudentData?.paymentDetails?.isPartPayment == true) {
        let count = 0;
        const installmentDetailsArray = []
        for (const singleObj of arrayForInstallmentdetails) {
          const obj: any = {}
          if (count == 0 && firstPaymentStatus == "payed") {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "payed";
            obj.paymetReceiveDate = customDateFormatDash(singleObj.installmentReceivedDate)
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.receivedPayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
          } else {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "due"
            obj.nextpaymetDate = customDateFormatDash(singleObj.installmentReceivedDate)
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.duePayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
          }
        }
        setInstallmentDetailsArray([...installmentDetailsArray])
      } else {
        let count = 0;
        const installmentDetailsArray = []
        for (const singleObj of arrayForInstallmentdetails) {
          const obj: any = {}
          if (count == 0 && firstPaymentStatus == "payed") {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "payed";
            obj.paymetReceiveDate = customDateFormatDash(singleObj.installmentReceivedDate)
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.receivedPayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
          } else {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "due"
            obj.nextpaymetDate = customDateFormatDash(singleObj.installmentReceivedDate)
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.duePayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
          }
        }
        setInstallmentDetailsArray([...installmentDetailsArray])
      }
    }
  }, [activeStep])

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              {/* <Button
                size='large'
                variant='outlined'
                color='secondary'
                onClick={() => {
                  setPopUp(false)
                  setActiveStep(0)
                  setSelectPartPayment(null)
                  setCouponApplied(newCourseDetail?.courseFee)
                  setCoupounApply("No")
                  const emptyArray: any = []
                  setArrayForInstallmentdetails(emptyArray)
                  setNextButtonShow(emptyArray)
                  setNextInstallment(false)
                  setFirstPaymentStatus('payed')
                  setNumberOfInstallment(-1)
                  setOpenPopPop(false)
                  setButtonShow(emptyArray)
                  setPaymentDescription(emptyArray)
                  setStartDate(null)
                  setCoupon(null)
                  setCouponValueData("")
                  setSubmitted(false)
                }
                }
              >
                Cancel
              </Button> */}

              {activeStep == 0 && <Button size='large'
                disabled={batchName.length > 0 ? false : true}
                variant='contained' onClick={() => { handleNext(); setSubmitted(true) }} > {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>}

              {selectPartPayment == true ? <>
                {activeStep == 2 ?
                  <Button size='large' variant='contained' onClick={handleNext} disabled={nextButtonShow.length == numberOfInstallment ? false : true}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button> :

                  activeStep == 1 &&
                  <Button size='large' variant='contained' onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                }
              </> : <>

                {(activeStep == 1 || activeStep == 2) && <Button size='large' variant='contained' onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>}</>}


              {activeStep == 3 && <Button size='large' variant='contained' onClick={handleApiCall} >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}

              </Button>}
            </Grid>
          </Grid>
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
        </form >

      )
    }
  }

  function findCommonCourseObjects(array1: any, array2: any) {
    let newFinalArray = []
    for (let singleObj of array1) {
      const findoutput = array2.find((obj2: any) => obj2.courseId === singleObj.courseId);
      if (findoutput) {
        newFinalArray.push(findoutput)
      }
    }
    return newFinalArray
  }

  function findDifferentCourseObjects(array1: any, array2: any) {
    let newFinalArray = []
    for (let singleObj of array2) {
      if (!array1.find((obj2: any) => obj2.courseId == singleObj.courseId)) {
        newFinalArray.push(singleObj)
      }
    }
    return newFinalArray
  }
  const handleCellClick = (row: any) => {
    router.push(`/courses/courseDetails/${row}`)
  }

  const [filteredCourseForStudent, setFilteredCourseForStudent] = useState<any>([])
  const [filteredNewCourseForStudent, setFilteredNewCourseForStudent] = useState<any>([])
  useEffect(() => {
    if (studentData && studentData.length > 0 && courseListData.length > 0) {
      let output = findCommonCourseObjects(studentData, courseListData)
      let outputDifferent = findDifferentCourseObjects(studentData, courseListData)
      setFilteredNewCourseForStudent(outputDifferent)
      setFilteredCourseForStudent(output)
    }

  }, [studentData, courseListData])

  return (
    <Card>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid >
          <CardHeader title="Course Details" />
        </Grid>
        <Grid sx={{ margin: '10px' }} >
          {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("update")) &&

            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant='contained'
                sx={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                  setCreateCourseDialog(true)
                }}
              >
                Add course <div style={{ paddingLeft: '5px', paddingTop: '2px' }}>
                  <Icon icon="bxs:book-bookmark" />
                </div>

              </Button>

            </Box>
          }
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell align='center'>Cours Fees</TableCell>
              <TableCell align='center'>Max Payment Installment</TableCell>
              <TableCell align='center'>Course Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) :
              filteredCourseForStudent && filteredCourseForStudent.map((e: any) => (
                <TableRow
                  key={e.courseId}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0,
                    },
                    '&:hover': {
                      background: "#F5F5F9",
                      cursor: "pointer"
                    },
                  }}
                  onClick={() => { handleCellClick(e.courseId) }}
                >
                  <TableCell component='th' scope='row'>
                    <Tooltip title={e.courseName} componentsProps={{
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
                      {e.courseName ? e.courseName : ""}
                    </Tooltip>
                  </TableCell>
                  <TableCell align='center'>
                    <Tooltip title={e.courseFee} componentsProps={{
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
                      {e.courseFee}
                    </Tooltip></TableCell>
                  <TableCell align='center'>
                    <Tooltip title={e.maxPaymentInstallment} componentsProps={{
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
                      {e.maxPaymentInstallment}
                    </Tooltip></TableCell>
                  <TableCell align='center'>

                    {e.courseStatus == 'active' ? <CustomChip rounded size='small' skin='light' color='success' label={e.courseStatus} /> : <CustomChip rounded size='small' skin='light' color='error' label={e.courseStatus} />}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        scroll='body'
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
          '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
        }}
        aria-describedby='user-view-edit-description'
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Student Information
          </DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => { handleEditClose(); setFormUpdateButton(false); }}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid >

        <DialogContent>

          <form >
            {
              studentData ?

                <Grid container spacing={5} sx={{ padding: 5 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        maxLength: 50,
                      }}
                      fullWidth label='Collage name ' required name="studentCollage" onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} value={studentData ? studentData.studentCollage : ""} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        maxLength: 50,
                      }}
                      fullWidth label='College course' required name="studentCourse" value={studentData ? studentData.studentCourse : ""} onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        maxLength: 50,
                      }}
                      fullWidth label='Department name' required name="studentDepartmentName" onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} value={studentData ? studentData.studentDepartmentName : ""} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        maxLength: 50,
                      }}
                      fullWidth label='College semester' required name="studentSemester" onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} value={studentData ? studentData.studentSemester : ""} />
                  </Grid>
                </Grid>
                : ""}

          </form>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' color='secondary' onClick={() => { handleEditClose(); setFormUpdateButton(false); }}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 2 }} disabled={!formUpdateButton} onClick={() => setFormUpdateButton(false)} >
            Update
          </Button>

        </DialogActions>
      </Dialog>

      {/* dialog for create new Course*/}
      <Dialog fullWidth open={createCourseDialog} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            <Typography variant='h5' component='span'>
              Select a new course !
            </Typography>
          </DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => {
              setCreateCourseDialog(false)
              setCourseName([])
            }}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid>

        <DialogContent sx={{ pb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Grid container spacing={6}>

              <Grid item xs={12} sm={10} ml={4}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-multiple-checkbox-label" style={{ width: '350px' }}>Course name</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={courseName}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="course Name" />}
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {filteredNewCourseForStudent && filteredNewCourseForStudent.length > 0 ? (
                      filteredNewCourseForStudent.map((name: any) => (
                        <MenuItem key={name.courseId} value={name.courseName} style={{ width: '350px' }}>
                          <Checkbox checked={courseName?.indexOf(name.courseName) > -1} />
                          <ListItemText primary={name.courseName} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled style={{ width: '350px' }}>
                        <ListItemText primary="No data found" />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} sm={0}>
                < AddCircleIcon style={{ marginTop: "12px", cursor: "pointer" }} onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Add')
                }} color='primary' />

              </Grid>
            </Grid>

          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' sx={{ mr: 1.5 }}
            onClick={() => {
              setCreateCourseDialog(false)
              setCourseName([])
            }}

          >
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }}
            onClick={() => {
              setCreateCourseDialog(false)
              setPopUp(true)
            }}
            disabled={courseName.length > 0 ? false : true}
          >
            Add Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for Course */}

      {/* create new course*/}

      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleCourseDialogClose} open={openCourseDialog}>
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

        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
          <TableContainer>
            <Grid container spacing={5} mt={0.5}>
              <Grid item xs={12} sm={6}>

                <TextField
                  fullWidth
                  required
                  label='Course name'
                  placeholder='HTML,CSS,back-end...'
                  value={courseDetails.courseName}
                  name='courseName'
                  onChange={courseChangeHandler}
                  error={submitted ? courseDetails.courseName ? false : true : false}
                  helperText={submitted && !courseDetails.courseName ? 'Required,max 50 chars' : ''}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name='courseDescription'
                  placeholder='Course description'
                  label='Course description'
                  value={courseDetails.courseDescription}
                  onChange={courseChangeHandler}
                  minRows={2}
                  error={submitted ? courseDetails.courseDescription ? false : true : false}
                  helperText={submitted && !courseDetails.courseDescription ? 'Required,max 500 chars' : ''}
                  inputProps={{
                    maxLength: 500,
                  }}
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
                  required
                  type='number'
                  label='Course fee'
                  placeholder='20000...'
                  value={courseDetails.courseFee}
                  name='courseFee'
                  onChange={courseChangeHandler}
                  error={submitted ? courseDetails.courseFee ? false : true : false}
                  helperText={submitted && !courseDetails.courseFee ? 'Required,value must be a positive number  ' : ''}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0,
                  }}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={submitted ? courseDetails.maxPaymentInstallment ? false : true : false}
                >
                  <InputLabel id='stepper-custom-vertical-personal-select-label'>Max installments  </InputLabel>
                  <Select
                    sx={{ height: '50%' }}
                    label='Max Installment'
                    value={courseDetails.maxPaymentInstallment}
                    name='maxPaymentInstallment'
                    id='stepper-custom-vertical-personal-select'
                    onChange={courseChangeHandler}
                    labelId='stepper-custom-vertical-personal-select-label'
                    MenuProps={MenuProps}
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
                  label='Course fee description'
                  placeholder='Course fee description'
                  value={courseDetails.courseFeeDescription}
                  onChange={courseChangeHandler}
                  error={submitted ? courseDetails.courseFeeDescription ? false : true : false}
                  helperText={submitted && !courseDetails.courseFeeDescription ? 'Required,max 500 chars' : ''}
                  minRows={2}
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
            <Button size='large' type='submit' variant='contained' onClick={() => { formCourseSubmit(); setSubmitted(true) }} >
              Submit
            </Button>

          </Box>
        </DialogActions>
      </Dialog>
      {/* create new course*/}


      {/* create new course*/}

      <Dialog fullWidth maxWidth='md' scroll='body' open={popUp}  >

        <Grid container justifyContent="space-between" alignItems="center" >
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            <Typography sx={{ marginBottom: '30px' }} variant='h5'>Fill these necessary details to add new course!</Typography>
          </DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => {
              setPopUp(false)
              setActiveStep(0)
              setSelectPartPayment(null)
              setCouponApplied(newCourseDetail?.courseFee)
              setCoupounApply("No")
              const emptyArray: any = []
              setArrayForInstallmentdetails(emptyArray)
              setNextButtonShow(emptyArray)
              setNextInstallment(false)
              setFirstPaymentStatus('payed')
              setNumberOfInstallment(-1)
              setOpenPopPop(false)
              setButtonShow(emptyArray)
              setPaymentDescription(emptyArray)
              setStartDate(null)
              setCoupon(null)
              setBatchName([])
              setCouponValueData("")
              setSubmitted(false)
              setBatchName([])
              setOpenBatchDialog(false)
            }
            }
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid>
        <>
          <StepperWrapper sx={{ marginTop: '25px' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step: any, index: any) => {
                return (
                  <Step key={index} sx={{ marginTop: '10px' }}>
                    <StepLabel StepIconComponent={StepperCustomDot}>
                      <div className='step-label'>
                        <div>
                          <Typography className='step-title'>{step.title}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
          <Card sx={{ mt: 4 }}>
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </>
      </Dialog>
      {/* create new course*/}


      {/* dialog for Coupon */}
      < Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '500px' } }} onClose={handleCouponDialogClose} open={openCouponDialog} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='span'>
              {`${dialogTitle} Coupon `}
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
        <form >

          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>

            <TableContainer>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} mt={2}>
                  <TextField
                    fullWidth
                    name='couponName'

                    // value={value}
                    label='Coupon name'
                    onChange={onCouponChange}
                    placeholder='Coupon name'
                    aria-describedby='validation-basic-first-name'
                    error={submitted ? couponData.couponName ? false : true : false}
                    helperText={submitted && !couponData.couponName ? 'Required,max 50 chars' : ''}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} mt={2}>
                  <TextField
                    fullWidth
                    name='couponDescription'

                    // value={value}
                    label='Coupon description'
                    onChange={onCouponChange}
                    placeholder='Coupon description'
                    aria-describedby='validation-basic-last-name'
                    error={submitted ? couponData.couponDescription ? false : true : false}
                    helperText={submitted && !couponData.couponDescription ? 'Required,max 500 chars' : ''}

                    inputProps={{
                      maxLength: 500,
                    }}
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
                      <FormControlLabel value='Flat' onChange={handleRadioChange} control={<Radio required />} label='Flat' />
                      <FormControlLabel value='Percentage' onChange={handleRadioChange} control={<Radio required />} label='Percentage' />

                    </RadioGroup>
                  </FormControl>
                </Grid>
                {
                  couponType == 'Flat' ?
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type='number'
                        name='couponValue'
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          min: 0,
                          max: 10000,
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">/-</InputAdornment>,
                        }}
                        label='Coupon value'
                        onChange={onCouponChange}
                        placeholder='Coupon count'
                        error={submitted ? couponData.couponValue ? false : true : false}
                        helperText={submitted && !couponData.couponValue ? 'Required,value must be a positive number' : ''}

                        aria-describedby='validation-basic-first-name'
                      /></Grid> :

                    couponType == 'Percentage' ?
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>

                            <TextField
                              name='couponValue'

                              label='Percentage'
                              onChange={onCouponChange}
                              placeholder='Percentage'
                              type='number'
                              aria-describedby='validation-basic-first-name'
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0,
                                max: 99,
                              }}
                              style={{
                                width: '100%'
                              }}
                              error={submitted ? couponData.couponValue ? false : true : false}
                              helperText={submitted && !couponData.couponValue ? 'Required,value must be between 0-99' : ''}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              }}
                            />

                            <Typography variant='body2'>(for Example : 10 % of 1000  = 900)</Typography>
                          </FormControl>

                        </Grid>


                      </>
                      : ""}

                <Grid item xs={12}>

                  <FormControl >
                    <FormLabel>Coupon limit</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='None'
                      aria-label='address type'
                      name='form-layouts-collapsible-address-radio'
                    >

                      <FormControlLabel value='Date' name="Date" onChange={handleDateChange} control={<Radio />} label='Date' />
                      <FormControlLabel value='couponCount' name="couponCount" onChange={handleDateChange} control={<Radio />} label='Coupon count' />
                      <FormControlLabel value='Both' name="couponCount" onChange={handleDateChange} control={<Radio />} label='Both' />
                      <FormControlLabel value='None' name="couponCount" onChange={handleDateChange} control={<Radio />} label='None' />

                    </RadioGroup>
                  </FormControl>
                </Grid>

                {


                  couponDate == "Date" ?
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          id='basic-input'

                          popperPlacement={popperPlacement}
                          onChange={(date: Date) => setStartDate(date)}
                          placeholderText='Coupon expiry date'
                          customInput={<CustomInput
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                            error={submitted ? startDate ? false : true : false}
                            helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''}
                            label='Coupon expiry date'
                            value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                              throw new Error('Function not implemented.');
                            }} />}
                        />
                      </DatePickerWrapper>
                    </Grid> : ""
                }
                {
                  couponDate == "couponCount" ?
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>

                        <TextField
                          type='number'
                          name="couponCount"

                          label='Coupon count'
                          onChange={onCouponChange}
                          placeholder='Coupon count'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 10000,
                          }}
                          error={submitted ? couponData.couponCount ? false : true : false}
                          helperText={submitted && !couponData.couponCount ? 'Required,value mustbe a positive number' : ''}
                          aria-describedby='validation-basic-first-name'
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
                            type='number'
                            name='couponCount'
                            label='Coupon count'

                            onChange={onCouponChange}
                            placeholder='Coupon count'
                            aria-describedby='validation-basic-first-name'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              min: 0,
                              max: 10000,

                            }}
                            error={submitted ? couponData.couponCount ? false : true : false}
                            helperText={submitted && !couponData.couponCount ? 'Required,value mustbe a positive number' : ''}
                          />


                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}

                            id='basic-input'
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => setStartDate(date)}
                            placeholderText='Coupon Expiry Date'
                            customInput={<CustomInput
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}
                              error={submitted ? startDate ? false : true : false}
                              helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''}
                              label='Coupon expiry date' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
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
                onClick={(e) => { setSubmitted(true); createCouponApi(e) }} >
                Submit
              </Button>

            </Box>
          </DialogActions>
        </form>
      </Dialog>
      {/* dialog for Coupon */}

      {/* handle Back dialog */}

      <Dialog fullWidth open={openPopPop} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
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
        </Grid>
        <DialogContent sx={{ pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
              <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.125rem', mb: 5 }}>You have to fill the payment details again</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' color='secondary'
            onClick={() => handleConfirmationCancel()}
          >
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }}
            onClick={() => handleConfirmation()}
          >
            Yes, I am Sure!
          </Button>

        </DialogActions>
      </Dialog>
      {/* handle Back dialog */}


      {/* dialog for batch */}
      <Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '600px' } }} open={openBatchDialog}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            <Typography variant='h5' component='span'>
              Add Batch
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
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} >
                <TextField
                  fullWidth
                  label='Batch name '
                  required
                  placeholder='Morning / Evening Batch'
                  name='batchName'
                  value={batchData.batchName}
                  onChange={changeHandler}
                  autoComplete='OFF'
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
                  autoComplete='OFF'
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
                    required
                    label='Do You Want To Set batch duration'
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
                    required
                    label='Do you want to set batch date '
                    name='Do You Want To Set  batch Date '
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
              {toSetTime == 'yes' &&
                <>
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
                          label='Batch class start time' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                            throw new Error('Function not implemented.');
                          }} />}
                      />
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        showTimeSelect
                        required
                        selected={endTime}
                        timeIntervals={15}
                        showTimeSelectOnly
                        popperPlacement={popperPlacement}
                        name='batchClassEndTime'
                        placeholderText='8:00 PM'
                        dateFormat='h:mm aa'
                        id='time-only-picker'
                        onChange={(date: Date) => handleEndTimeChange(date)}
                        customInput={<CustomInput
                          error={submitted ? endTime ? false : true : false}
                          helperText={submitted && !endTime ? 'Batch class end time is required' : ''}
                          label='Batch class end time' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                            throw new Error('Function not implemented.');
                          }} />}
                      />
                    </DatePickerWrapper>
                  </Grid>

                </>}

              {toSetDate == 'yes' &&
                <>
                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startBatchDate}
                        id='basic-input'
                        required
                        popperPlacement={popperPlacement}
                        onChange={(date: Date) => setStartBatchDate(date)}
                        maxDate={endDate || null}
                        placeholderText='Batch Start Date'
                        customInput={<CustomInput
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                          }}
                          error={submitted ? startBatchDate ? false : true : false}
                          helperText={submitted && !startBatchDate ? 'Batch start date is required' : ''}
                          label='Batch start date ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                            throw new Error('Function not implemented.');
                          }} />}
                      />
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={endDate}
                        id='basic-input'
                        required
                        popperPlacement={popperPlacement}
                        onChange={(date: Date) => setEndDate(date)}
                        minDate={startBatchDate || null}
                        placeholderText='Batch End Date'

                        customInput={<CustomInput
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                          }}
                          error={submitted ? endDate ? false : true : false}
                          helperText={submitted && !endDate ? 'Batch end date is required' : ''}
                          label='Batch end date ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                            throw new Error('Function not implemented.');
                          }} />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                </>}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={submitted ? batchData.batchMode ? false : true : false}
                >
                  <InputLabel id='stepper-custom-vertical-personal-select-label'>Batch mode  </InputLabel>
                  <Select
                    label='Batch Mode '
                    name='batchMode'
                    id='stepper-custom-vertical-personal-select'
                    value={batchData.batchMode}
                    onChange={changeHandler}
                    required

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
            <Button size='large' type='submit' variant='contained' onClick={() => { createBatchSubmit(); setSubmitted(true) }}  >
              Submit
            </Button>

          </Box>
        </DialogActions>
      </Dialog>
      {/* dialog for create new batch*/}




      {/* Snackbar */}
      {
        open.open && (
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
        )
      }
    </Card >
  )
}

export default InvoiceListTable
