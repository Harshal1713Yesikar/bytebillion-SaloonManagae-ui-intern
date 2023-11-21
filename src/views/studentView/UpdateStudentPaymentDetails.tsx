import { forwardRef, ChangeEvent, Fragment, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { useTheme } from '@mui/material/styles'
import { customDateFormatDash } from 'src/@core/utils/format'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography';
import { updateStudenPaymentDetails, createCoupon, updateStudenCourseCouponBatchDetails, listOneStudentDetailApi, couponCountCheck, getCouponList, studentFeeSlipMail } from 'src/store/APIs/Api'
import Radio from '@mui/material/Radio';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TableContainer from '@mui/material/TableContainer'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from '@mui/material/InputLabel'
import Router from 'next/router'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { NumberLocale } from 'yup/lib/locale'
import InputAdornment from '@mui/material/InputAdornment'
import EventNoteIcon from '@mui/icons-material/EventNote';

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const steps = [

  {
    title: 'Payment Info',
    subtitle: 'Payment Information'
  }
]

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})


const UpdateStudentPaymentDetails = (props: any) => {

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const router = useRouter()
  const { studentId } = router.query
  const [paymentDetails, setPaymentDetails] = useState<any>()
  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [dateTodayBtn, setDateTodayBtn] = useState<DateType>()
  const [updateStudentPayment, setUpdateStudentPayment] = useState<any>({
    "customerId": "",
    "rollNo": "",
    "organizationId": "",
    "paymentDetails": {}
  })
  const [open, setOpen] = useState<any>({ open: false, msg: "" })
  const [statusCheck, setStatusCheck] = useState<any>({ payedCount: 0, dueCount: 0 })
  const [totalReceivedPayment, setTotalReceivedPayment] = useState<any>()
  const [remainingAmount, setRemainingAmount] = useState<number>()
  const [onlyOneTime, setOnlyOneTime] = useState<any>(true)
  const [selectedRadioValue, setSelectedRadioValue] = useState('payed');
  const [payStatusState, setPayStatusState] = useState(true);
  const [saveButton, setSaveButton] = useState<any>([])
  const [submitButton, setSubmitButton] = useState<any>([])
  const [openCouponDialog, setOpenCouponDialog] = useState<boolean>(false)
  const [couponData, setCouponData] = useState<any>({
    couponDescription: "",
    couponName: "",
    couponValue: "",
    couponCount: ""
  })
  const [couponType, setCouponType] = useState<any>()
  const [couponDate, setCouponDate] = useState<any>("None")
  const [startDate, setStartDate] = useState<any>()
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [couponResponse, setCouponResponse] = useState<any>()
  const [studentDetails, setStudentDetails] = useState<any>()
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false)
  const [couponListPopup, setCouponListPopup] = useState<boolean>(false)
  const [newStudentDetails, setNewStudentDetails] = useState<any>()
  const [reviewState, setReviewState] = useState<boolean>(false)
  const [couponApplied, setCouponApplied] = useState<any>(0)
  const [stateManage, setStateManage] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [suspendBackDialogOpen, setSuspendBackDialogOpen] = useState<boolean>(false)
  const [installmentIndex, setInstallmentIndex] = useState<any>()
  const [deleteAddInstallment, setDeleteAddInstallment] = useState<any>()
  const [payStatusUpdate, setPayStatusUpdate] = useState<boolean>(true)
  const [couponListData, setCouponListData] = useState<any>()
  const [coupon, setCoupon] = useState<any>()
  const [submitCoupon, setSubmitCoupon] = useState<any>(false)
  const [permission, setPermission] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })
  useEffect(() => {
    if (paymentDetails?.totalPayment < 0) {
      setSnackbarColor(false)
      setOpen({ open: true, msg: "Coupon amount must be non-negative" })
    }
  }, [paymentDetails])



  const listCouponApiCall = () => {
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      getCouponList(customerId, organizationId).then((res: any) => {
        if (res.statusCode == 200) {
          setCouponListData(res.data)
        }

      }).catch((err: any) => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    if (showDetailsPopup) {
      console.log(studentDetails, "studentDetails")
      setNewStudentDetails({ ...studentDetails })
      setReviewState(true)
    }
  }, [showDetailsPopup])

  useEffect(() => {
    if (user) {

      setPermission(user.role.permissions)
      listCouponApiCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  useEffect(() => {
    if (reviewState) {
      if (newStudentDetails) {
        setNewStudentDetails({ ...newStudentDetails, coupon: [...newStudentDetails?.coupon, couponResponse] })
        if (couponResponse && newStudentDetails?.paymentDetails?.isPartPayment == false) {
          if (couponResponse.couponType == 'Percentage') {
            const coupon = parseInt(newStudentDetails?.paymentDetails?.totalPayment) - (parseInt(newStudentDetails?.paymentDetails?.totalPayment) * parseInt(couponResponse.couponValue)) / 100
            setCouponApplied(coupon)

          } else {
            const coupon = (newStudentDetails?.paymentDetails?.totalPayment) - parseInt(couponResponse.couponValue)
            setCouponApplied(coupon)

          }
        } else if (couponResponse && newStudentDetails?.paymentDetails?.isPartPayment == true) {
          if (couponResponse.couponType == 'Percentage') {
            const coupon = parseInt(newStudentDetails?.paymentDetails?.totalDuePayment) - (parseInt(newStudentDetails?.paymentDetails?.totalDuePayment) * parseInt(couponResponse.couponValue)) / 100
            setCouponApplied(coupon)

          } else {
            const coupon = parseInt(newStudentDetails?.paymentDetails?.totalDuePayment) - parseInt(couponResponse.couponValue)
            setCouponApplied(coupon)
          }
        }
      }
    }
  }, [reviewState])

  useEffect(() => {
    if (couponApplied && newStudentDetails?.paymentDetails?.isPartPayment == false) {
      paymentDetails.totalPayment = parseInt(couponApplied)
      setPaymentDetails({ ...paymentDetails })
      setNewStudentDetails({ ...newStudentDetails, paymentDetails: { ...newStudentDetails?.paymentDetails, totalPayment: parseInt(couponApplied) } })
    }

    if (couponApplied && newStudentDetails?.paymentDetails?.isPartPayment == true) {
      const valueEquallyDivided: any = parseInt(couponApplied) / parseInt(statusCheck.dueCount)
      const installmentArrayUpdate = paymentDetails?.installmentDetails
      for (const singleDueObj of installmentArrayUpdate) {
        if (singleDueObj.paymentStatus == "due") {
          singleDueObj.duePayment = valueEquallyDivided
        }
      }
      let totalPaymentValue = parseInt(paymentDetails?.totalPayment)
      totalPaymentValue = parseInt(couponApplied)
      paymentDetails.totalPayment = parseInt(couponApplied)
      setPaymentDetails({ ...paymentDetails, installmentDetails: installmentArrayUpdate })
      setNewStudentDetails({ ...newStudentDetails, paymentDetails: paymentDetails })
    }

  }, [couponApplied])



  useEffect(() => {
    if (newStudentDetails) {
      if (couponApplied && newStudentDetails?.paymentDetails?.isPartPayment == false) {
        setStateManage(true)
      } else if (couponApplied && newStudentDetails?.paymentDetails?.isPartPayment == true) {
        setStateManage(true)
      }
    }

  }, [newStudentDetails])

  useEffect(() => {
    if (submitCoupon) {
      apiCallForStudentCourseCouponBatchDetails()
      setSubmitCoupon(false)
    }
  }, [submitCoupon])




  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (onlyOneTime) {
      if (updateStudentPayment.paymentDetails?.isPartPayment == true) {
        let payedCount = 0;
        let dueCount = 0;
        for (let index = 0; index < updateStudentPayment.paymentDetails?.installmentDetails.length; index++) {
          const payment = updateStudentPayment.paymentDetails?.installmentDetails[index];
          if (payment.paymentStatus == "payed") {
            payedCount++
          } else if (payment.paymentStatus == "due") {
            dueCount++
          }
        }
        setStatusCheck({ payedCount: payedCount, dueCount: dueCount })
        setOnlyOneTime(false)
      }
    }
  }, [updateStudentPayment])

  useEffect(() => {
    if (onlyOneTime) {
      if (updateStudentPayment.paymentDetails?.isPartPayment == true) {
        let payedCount = 0;
        let dueCount = 0;
        for (let index = 0; index < updateStudentPayment.paymentDetails?.installmentDetails.length; index++) {
          const payment = updateStudentPayment.paymentDetails?.installmentDetails[index];
          if (payment.paymentStatus == "payed") {
            payedCount++
          } else if (payment.paymentStatus == "due") {
            dueCount++
          }
        }
        setStatusCheck({ payedCount: payedCount, dueCount: dueCount })
        setOnlyOneTime(false)
      }
    }
  }, [onlyOneTime])


  const listApiCall = () => {

    listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
      if (res.statuscode == 200) {
        setPaymentDetails(res.data.paymentDetails)
        setStudentDetails(res.data)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {

    const handleRouteChangeStart = (url: string) => {

      if (!isFormComplete && !isNavigating) {

        if (coupon) {
          if (confirm('You have an incomplete form. Are you sure you want to leave?')) {
            setIsNavigating(true);
            router.push(url);
          }
          else {
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
  }, [isFormComplete, isNavigating, router, coupon]);

  useEffect(() => {
    if (paymentDetails) {
      if (paymentDetails?.isPartPayment == false) {
        if (selectedRadioValue == "payed") {
          setUpdateStudentPayment({
            ...updateStudentPayment,
            paymentDetails: {
              isPartPayment: paymentDetails?.isPartPayment,
              allPaymentStatus: selectedRadioValue,
              totalReceivedPayment: paymentDetails?.nextReceivedPayment,
              paymetReceiveDate: paymentDetails?.nextPaymetReceiveDate,
              paymentNotes: paymentDetails?.paymentNotes
            }
          })
        } else if (selectedRadioValue == "due") {
          setUpdateStudentPayment({
            ...updateStudentPayment,
            paymentDetails: {
              isPartPayment: paymentDetails?.isPartPayment,
              allPaymentStatus: selectedRadioValue,
              nextReceivedPayment: paymentDetails?.nextReceivedPayment,
              nextPaymetReceiveDate: paymentDetails?.nextPaymetReceiveDate,
              paymentNotes: paymentDetails?.paymentNotes
            }
          })
        }
      } else {
        setUpdateStudentPayment({
          ...updateStudentPayment,
          paymentDetails: paymentDetails
        })
      }
    }

    if (dateTodayBtn) {
      if (selectedRadioValue == "payed") {
        setUpdateStudentPayment({
          ...updateStudentPayment,
          paymentDetails: {
            ...updateStudentPayment.paymentDetails,
            paymetReceiveDate: customDateFormatDash(dateTodayBtn)
          }
        })
      } else if (selectedRadioValue == "due") {
        setUpdateStudentPayment({
          ...updateStudentPayment,
          paymentDetails: {
            ...updateStudentPayment.paymentDetails,
            nextPaymetReceiveDate: customDateFormatDash(dateTodayBtn)
          }
        })
      }

    }
  }, [paymentDetails, dateTodayBtn, selectedRadioValue])

  useEffect(() => {
    if (user && !showDetailsPopup) {
 
      listApiCall()
      setUpdateStudentPayment({
        ...updateStudentPayment,
        customerId: user.customerId,
        organizationId: user.organizationId,
        rollNo: studentId
      });
    }
  }, [user, studentId])

  useEffect(() => {
    if (totalReceivedPayment) {
      let remainingPaymentAmount: any = (parseInt(updateStudentPayment.paymentDetails?.totalDuePayment) - parseInt(totalReceivedPayment)) / (parseInt(updateStudentPayment.paymentDetails?.installmentDetails.length) - parseInt((statusCheck.payedCount + 1)))
      if (remainingPaymentAmount !== null && typeof remainingPaymentAmount !== "undefined") {
        remainingPaymentAmount = Math.ceil(remainingPaymentAmount)
        setRemainingAmount(parseInt(remainingPaymentAmount))
      }
    }
    else {
      if (updateStudentPayment.paymentDetails?.installmentDetails) {
        let remainingPaymentAmount: any = ((parseInt(updateStudentPayment.paymentDetails?.totalDuePayment) - 0) / (parseInt(updateStudentPayment.paymentDetails?.installmentDetails.length) - parseInt(statusCheck.payedCount + 1)))
        if (remainingPaymentAmount !== null && typeof remainingPaymentAmount !== "undefined") {
          remainingPaymentAmount = Math.ceil(remainingPaymentAmount)
          setRemainingAmount(parseInt(remainingPaymentAmount))
        }
      }
    }
  }, [totalReceivedPayment])

  const apiCallForStudentCourseCouponBatchDetails = () => {

    if (stateManage) {
      updateStudenCourseCouponBatchDetails(newStudentDetails).then((res) => {
        if (res.statusCode == 200) {
          setPaymentDetails(res.data.paymentDetails)
          setStudentDetails(res.data)
        
          setStateManage(false)
          setStartDate(null)
          setReviewState(false)
          listApiCall()
          setCoupon(null)
        }

      }).catch((err) => {
        console.log(err)
      }
      )
    }

  }

  const handleCouponDialogClose = () => { setOpenCouponDialog(false) }

  const handleCouponDialogOpen = () => setCouponListPopup(true)

  const onCouponChange = (e: any) => {

    if (e.target.name == "couponValue") {

      Number(e.target.value)
    }
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value
    })
  }

  const createCouponApi = (e: any) => {

    e.preventDefault()
    const useCouponCount = 0

    const couponApiData: any = {
      customerId: user ? user.customerId : "",
      organizationId: user ? user.organizationId : "",
      coupons: [{
        couponName: couponData.couponName,
        couponValue: parseInt(couponData.couponValue),
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

        if (res.data.statusCode == 200) {

          setSnackbarColor(true)
          setOpen({ open: true, msg: "Special coupon added succesfully !" })
          setSubmitted(false)
          listCouponApiCall()
        } else {
          setSnackbarColor(false)
          setOpen({ open: true, msg: res.data.message })
        }
        setCouponData(res.data.data)
        setCouponData({
          couponDescription: "",
          couponName: "",
          couponValue: "",
          couponCount: ""
        })
        setCouponType("")
        setCouponDate("None")
        handleCouponDialogClose()
      })
    }

  }

  const handleRadioChangeForCoupon = (event: any) => {
    setCouponType(event.target.value);

  };

  const handleChangeCouponRadio = (event: any) => {
    setCouponDate(event.target.value);
  };

  const handleChange = (e: any) => {
    setUpdateStudentPayment({
      ...updateStudentPayment,
      paymentDetails: {
        ...updateStudentPayment.paymentDetails,
        allPaymentStatus: selectedRadioValue,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleNext = () => {
    // setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      if (updateStudentPayment.paymentDetails?.isPartPayment == false) {
        updateStudenPaymentDetails(updateStudentPayment).then((res: any) => {
          if (res.statusCode == 200) {
            // if (selectedRadioValue == "payed") {
            //   studentFeeSlipMail({ organizationName: user.organizationName, studentEmail: studentDetails?.studentEmail, studentName: `${studentDetails?.studentFirstName} ${studentDetails?.studentLastName}`, courseName: studentDetails.studentCourse })
            // }
            props.setUpdatePaymentDetails(false)
            setSnackbarColor(true)
            setOpen({ open: true, msg: "Student payment details updated successfully" })
            if (couponResponse && (couponResponse.couponLimit == "Both" || couponResponse.couponLimit == "couponCount")) {
              couponCountCheck(user.customerId, user.organizationId, couponResponse.couponId).then((res) => {
                return res;
              }).catch((err) => { console.log(err) })
            }
          } else {
            setSnackbarColor(false)
            setOpen({ open: true, msg: res.message })
          }
        }).catch((err: any) => {
          console.log(err)
        })
      } else if (updateStudentPayment.paymentDetails?.isPartPayment == true) {
        const installmentArray = []
        let count = 0;
        for (let index = 0; index < updateStudentPayment.paymentDetails?.installmentDetails.length; index++) {
          const payment = updateStudentPayment.paymentDetails?.installmentDetails[index];
          if (payment.paymentStatus == "payed") {
            const singlePayedObj = {
              "installmentNumber": index + 1,
              "paymentStatus": "payed",
              "paymetReceiveDate": payment.paymetReceiveDate,
              "receivedPayment": parseInt(payment.receivedPayment),
              "paymentNotes": payment.paymentNotes
            }
            installmentArray.push(singlePayedObj)
          } else if (payment.paymentStatus == "due") {
            if (count == 0) {

              if (selectedRadioValue == "payed") {
                const singlePayedObj = {
                  "installmentNumber": index + 1,
                  "paymentStatus": "payed",
                  "paymetReceiveDate": payment.paymetRecieveDate ? payment.paymetRecieveDate : payment.nextpaymetDate,
                  "receivedPayment": totalReceivedPayment ? parseInt(totalReceivedPayment) : parseInt(payment.duePayment),
                  "paymentNotes": payment.paymentNotes
                }
                installmentArray.push(singlePayedObj)
              } else {
                const singleDueObj = {
                  "installmentNumber": index + 1,
                  "paymentStatus": "due",
                  "nextpaymetDate": payment.paymetRecieveDate ? payment.paymetRecieveDate : payment.nextpaymetDate,
                  "duePayment": totalReceivedPayment ? parseInt(totalReceivedPayment) : parseInt(payment.duePayment),
                  "paymentNotes": payment.paymentNotes
                }
                installmentArray.push(singleDueObj)
              }

              count++
              continue;
            } else {
              const singleDueObj = {
                "installmentNumber": index + 1,
                "paymentStatus": "due",
                "nextpaymetDate": payment.nextpaymetDate,
                "duePayment": remainingAmount ? remainingAmount : remainingAmount == 0 ? 0 : parseInt(payment.duePayment),
                "paymentNotes": payment.paymentNotes
              }
              installmentArray.push(singleDueObj)
            }
          }
        }

        updateStudenPaymentDetails({ ...updateStudentPayment, paymentDetails: { ...updateStudentPayment.paymentDetails, installmentDetails: installmentArray } }).then((res: any) => {
          if (res.statusCode == 200) {
            // if (selectedRadioValue == "payed") {
            //   studentFeeSlipMail({ organizationName: user.organizationName, studentEmail: studentDetails?.studentEmail, studentName: `${studentDetails?.studentFirstName} ${studentDetails?.studentLastName}`, courseName: studentDetails.studentCourse })
            // }
            props.setUpdatePaymentDetails(false)
            setSnackbarColor(true)
            setOpen({ open: true, msg: "student payment details updated successfully" })
            if (couponResponse && (couponResponse.couponLimit == "Both" || couponResponse.couponLimit == "couponCount")) {
              couponCountCheck(user.customerId, user.organizationId, couponResponse.couponId).then((res) => {
                return res;
              }).catch((err) => { console.log(err) })
            }
          } else {
            setSnackbarColor(false)
            setOpen({ open: true, msg: res.message })
          }
        }).catch((err: any) => {
          console.log(err)
        })
      }
      setSnackbarColor(true)
      setOpen({ open: true, msg: "Form submitted" })
    }
  }

  const handleClose = () => {
    if (open.open == true) {
      setOpen({ open: false, msg: "" })
    }
  }

  const handleDateChange = (date: any, index: any) => {


    const updatedData = [...updateStudentPayment.paymentDetails?.installmentDetails];
    const installmentIndex = updatedData.findIndex(
      payment => payment.installmentNumber === index + 1
    );

    if (installmentIndex !== -1) {
      if (index == count) {
        updatedData[installmentIndex].paymetRecieveDate = customDateFormatDash(date);
      } else {
        updatedData[installmentIndex].nextpaymetDate = customDateFormatDash(date);
      }
      setUpdateStudentPayment({ ...updateStudentPayment });
    }
  }

  const handleDetailsChange = (e: any, index: any) => {
    const updatedData = [...updateStudentPayment.paymentDetails?.installmentDetails];
    const installmentIndex = updatedData.findIndex(
      payment => payment.installmentNumber === index + 1
    );

    if (installmentIndex !== -1) {
      if (index == count && (e.target.name == "receivedPayment") || (e.target.name == "duePayment")) {
        updatedData[installmentIndex][e.target.name] = e.target.value
        setTotalReceivedPayment(parseInt(e.target.value))
        setPayStatusState(false)
        setPayStatusUpdate(true)
      } else {
        updatedData[installmentIndex][e.target.name] = e.target.value
      }
      setUpdateStudentPayment({ ...updateStudentPayment });
    }
  }

  let count = 0

  const handleRadioChange = (event: any) => {
    setSelectedRadioValue(event.target.value);
  };

  const handleSubmit = (index: any, e: any) => {
    if ((totalReceivedPayment ? totalReceivedPayment : e.duePayment) <= (paymentDetails?.totalPayment - paymentDetails?.totalReceivedPayment)) {
      if (e.paymentStatus == "due" && index == count && (typeof totalReceivedPayment !== 'undefined' && totalReceivedPayment.toString() != '')) {
        setSnackbarColor(true)
        setOpen({ open: true, msg: `Installment ${index + 1} Saved` })
        handleSubmitChange(index)
        saveButton[saveButton.findIndex((o: any) => o.index == index)].color = "#54B435"
        setSaveButton([...saveButton])
      }
      else if (e.paymentStatus == "due" && index == count && e.duePayment != "") {
        if (!(e.paymentStatus == "due" && index == count && (typeof totalReceivedPayment === 'undefined'))) {
          setSnackbarColor(false)
          setOpen({ open: true, msg: "Next payment amount is required" })
        } else {
          setSnackbarColor(true)
          setOpen({ open: true, msg: `Installment ${index + 1} Saved` })
          handleSubmitChange(index)
          saveButton[saveButton.findIndex((o: any) => o.index == index)].color = "#54B435"
          setSaveButton([...saveButton])
        }

      }
      else if (e.paymentStatus == "due" && index != count) {
        setSnackbarColor(true)
        setOpen({ open: true, msg: `Installment ${index + 1} Saved` })
        handleSubmitChange(index)
        saveButton[saveButton.findIndex((o: any) => o.index == index)].color = "#54B435"
        setSaveButton([...saveButton])
      }
      else {
        setSnackbarColor(false)
        setOpen({ open: true, msg: "Next payment amount is required" })
      }
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, msg: `Amount should be less then total fee` })
    }
  }

  const handleSubmitChange = (index: any) => {

    if (submitButton.length > 0) {
      addItem({ index: index, status: true }, index);
    } else {
      submitButton.push({ index: index, status: true })
      setSubmitButton([...submitButton])
    }

  }

  const addItem = (newItem: any, innerIndex: any) => {
    const isDuplicate = submitButton.some(
      (item: any) => item.index === newItem.index && item.status === newItem.status
    )
    if (!isDuplicate) {
      submitButton.push({ index: innerIndex, status: true })
      setSubmitButton([...submitButton])
    }
  }


  const addSaveItem = (newItem: any, innerIndex: any) => {

    const isDuplicate = saveButton.some(
      (item: any) => item.index === newItem.index && item.status === newItem.status
    )

    if (!isDuplicate) {
      setSaveButton([...saveButton, { index: innerIndex, status: true, color: "#3C79F5" }])
    } else {
      if (saveButton.findIndex((o: any) => o.index == innerIndex) >= 0) {
        saveButton[saveButton.findIndex((o: any) => o.index == innerIndex)].color = "#3C79F5"
        setSaveButton([...saveButton])
        if (submitButton.findIndex((o: any) => o.index == innerIndex) >= 0) {
          const submitButtonNewArray = submitButton.filter((o: any) => o.index != innerIndex)
          setSubmitButton(submitButtonNewArray)
        }
      }
    }
  }

  const installmentAddFunction = () => {
    const alternateArray = paymentDetails?.installmentDetails
    const singleDueObj = {
      "installmentNumber": installmentIndex + 1,
      "paymentStatus": "due",
      "nextpaymetDate": customDateFormatDash(new Date()),
      "duePayment": "",
      "paymentNotes": "newInstallment"
    }

    alternateArray.push(singleDueObj)

    let countDueElements = 0;

    for (const single of alternateArray) {
      if (single.paymentStatus == "due") {
        countDueElements++
      }
    }

    let calculatedValue = paymentDetails?.totalDuePayment / countDueElements
    calculatedValue = Math.ceil(calculatedValue)

    let count = 1
    for (const singleObj of alternateArray) {
      if (singleObj.paymentStatus == "due") {
        singleObj.duePayment = calculatedValue
      }
      count++
    }

    setPaymentDetails({ ...paymentDetails, installmentDetails: alternateArray })

    updateStudenPaymentDetails({ ...updateStudentPayment, paymentDetails: { ...paymentDetails, installmentDetails: alternateArray } }).then((res: any) => {

      if (res.statusCode == 200) {
        setSnackbarColor(true)
        setOpen({ open: true, msg: "New installment added successfully !" })
        setOnlyOneTime(true)
        setPaymentDetails(res.data.paymentDetails)
        setStudentDetails(res.data)
        setPayStatusState(true)
        setTotalReceivedPayment(0)
        setPayStatusUpdate(false)
        setSaveButton([])
        setSubmitButton([])
      } else {
        setSnackbarColor(false)
        setOpen({ open: true, msg: res.message })
      }
    }).catch((err: any) => {
      console.log(err)
    })

  }

  const installmentDeleteFunction = () => {
    const tempArray = paymentDetails?.installmentDetails

    const arr = tempArray.filter((obj: any) => obj.installmentNumber != installmentIndex)

    let countDueElements = 0;

    for (const single of arr) {
      if (single.paymentStatus == "due") {
        countDueElements++
      }
    }

    let calculatedValue = paymentDetails?.totalDuePayment / countDueElements
    calculatedValue = Math.ceil(calculatedValue)

    let count = 1

    for (const singleObj of arr) {
      singleObj.installmentNumber = count
      if (singleObj.paymentStatus == "due") {
        singleObj.duePayment = calculatedValue
      }
      count++
    }

    setPaymentDetails({ ...paymentDetails, installmentDetails: arr })

    const newSubmitButton = submitButton.filter((obj: any) => obj.index != installmentIndex - 1)
    for (const obj of newSubmitButton) {
      if (obj.index > installmentIndex - 1) {
        obj.index = obj.index - 1
      }
    }
    setSubmitButton([...newSubmitButton])

    const newSaveButton = saveButton.filter((obj: any) => obj.index != installmentIndex - 1)
    for (const obj of newSaveButton) {
      if (obj.index > installmentIndex - 1) {
        obj.index = obj.index - 1
      }
    }
    setSaveButton([...newSaveButton])

    updateStudenPaymentDetails({ ...updateStudentPayment, paymentDetails: { ...paymentDetails, installmentDetails: arr } }).then((res: any) => {
      if (res.statusCode == 200) {
        setSnackbarColor(false)
        setOpen({ open: true, msg: "Installment deleted successfully !" })
        setOnlyOneTime(true)
        setPaymentDetails(res.data.paymentDetails)
        setStudentDetails(res.data)
        setPayStatusState(true)
        setTotalReceivedPayment(0)
        setPayStatusUpdate(false)
        setSaveButton([])
        setSubmitButton([])
      } else {
        setSnackbarColor(false)
        setOpen({ open: true, msg: res.message })
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }


  const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
    borderBottom: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: `${theme.spacing(1)} !important`,
    paddingBottom: `${theme.spacing(1)} !important`
  }))

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 260
      }
    }
  }



  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (


          <Fragment key={step} >
            {paymentDetails?.isPartPayment == false ?

              paymentDetails?.allPaymentStatus == "payed" ?
                <>
                  <Grid item xs={12} sm={6}>

                    <TextField
                      fullWidth
                      required
                      name="totalReceivedPayment"
                      label='Total received payment'
                      value={paymentDetails?.totalReceivedPayment}
                      placeholder='Leonard'
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name="paymetReceiveDate"
                      label='Payment received date'
                      value={paymentDetails?.paymetReceiveDate}
                      InputLabelProps={{ shrink: true }}
                      placeholder='Leonard'
                      disabled
                      InputProps={{
                        endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name="paymentNotes"
                      label='Payment discription'
                      value={paymentDetails?.paymentNotes}
                      InputLabelProps={{ shrink: true }}
                      placeholder='Leonard'
                      disabled
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                </>
                : paymentDetails?.allPaymentStatus == "due" &&
                <>
                  <Grid item xs={12} mt={3} style={{ display: "flex" }}>
                    <Grid item xs={6} sm={6}>
                      <Typography>Do you want to add a special coupon ? </Typography>
                    </Grid>

                    <Grid item xs={6} sm={2}>
                      <Button
                        size='large'
                        variant='contained'
                        onClick={handleCouponDialogOpen}
                      >
                        Coupon  <LocalOfferIcon />
                      </Button>
                    </Grid>

                  </Grid>

                  {selectedRadioValue == "payed" ?
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="totalReceivedPayment"
                          label='Total received payment'
                          value={paymentDetails?.nextReceivedPayment}
                          placeholder='Leonard'
                          disabled

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            id='basic-input'
                            todayButton='Today'
                            selected={dateTodayBtn}
                            name="paymentRecieveDate"
                            value={dateTodayBtn ? dateTodayBtn : paymentDetails?.nextPaymetReceiveDate}
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => {
                              setDateTodayBtn(date)
                            }
                            }
                            placeholderText='Payment Received Date'
                            customInput={<CustomInput label='Payment Received Date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                              throw new Error('Function not implemented.')
                            }} />}
                          />
                        </DatePickerWrapper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="paymentNotes"
                          label='Payment discription'
                          required
                          value={updateStudentPayment.paymentDetails?.paymentNotes}
                          placeholder='Payment Discription'
                          onChange={handleChange}
                          inputProps={{
                            maxLength: 500,
                          }}
                        />
                      </Grid>
                    </>
                    :
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="nextReceivedPayment"
                          label='Next Received Payment'
                          value={paymentDetails?.nextReceivedPayment}
                          placeholder='Next Received Payment'
                          disabled

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            id='basic-input'
                            todayButton='Today'
                            selected={dateTodayBtn}
                            name="nextPaymetReceiveDate"
                            value={dateTodayBtn ? dateTodayBtn : paymentDetails?.nextPaymetReceiveDate}
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => {
                              setDateTodayBtn(date)
                            }
                            }
                            placeholderText='Next Payment Date'
                            customInput={<CustomInput

                              label='Next Payment Date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                throw new Error('Function not implemented.')
                              }} />}
                          />
                        </DatePickerWrapper>

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="paymentNotes"
                          label='Payment discription'
                          value={updateStudentPayment.paymentDetails?.paymentNotes}
                          placeholder='Payment Discription'
                          onChange={handleChange}
                          inputProps={{
                            maxLength: 500,
                          }}
                        />
                      </Grid>
                    </>
                  }


                  <Grid item xs={6} mt={3} style={{ display: "flex" }}>
                    <Grid item xs={8} sm={6}>
                      <Typography>Do you want to </Typography>
                    </Grid>

                    <Grid item xs={8} sm={6}>
                      <Typography>Pay ?</Typography>
                      <Radio
                        checked={selectedRadioValue === 'payed'}
                        onChange={handleRadioChange}
                        value="payed"
                        name="radio-buttons"
                      />
                    </Grid>

                    <Grid item xs={8} sm={6}>
                      <Typography>Due ?</Typography>
                      <Radio
                        checked={selectedRadioValue === 'due'}
                        onChange={handleRadioChange}
                        value="due"
                        name="radio-buttons"
                      />

                    </Grid>

                  </Grid>
                </>
              : paymentDetails?.isPartPayment == true &&
              <>

                {updateStudentPayment.paymentDetails?.allPaymentStatus == "due" &&
                  <Grid item xs={12} mt={3} style={{ display: "flex" }}>
                    <Grid item xs={6} sm={6}>
                      <Typography>Do you want to add a special coupon ? </Typography>
                    </Grid>

                    <Grid item xs={6} sm={2}>
                      <Button
                        size='large'
                        variant='contained'
                        onClick={handleCouponDialogOpen}
                      >
                        Coupon  <LocalOfferIcon />
                      </Button>
                    </Grid>

                  </Grid>
                }




                {updateStudentPayment?.paymentDetails?.installmentDetails?.map((e: any, index: any) => {
                  if (e.paymentStatus == "payed") {
                    count++

                    return (
                      <>
                        <Grid item xs={8} sm={3}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            name="paymetReceiveDate"
                            label='Payment received date'
                            value={e.paymetReceiveDate}
                            placeholder='Payment received date'
                            disabled
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            name="paymentNotes"
                            label='Payment discription'
                            value={e.paymentNotes}
                            placeholder='Payment discription'
                            disabled
                          />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            name="totalReceivedPayment"
                            label='Total received payment'
                            value={e.receivedPayment}
                            placeholder='Total received payment'
                            disabled

                          />
                        </Grid>

                        <Grid item xs={8} sm={3}>
                          <Button
                            size='large'
                            variant='contained'
                            disabled
                          >
                            Paid
                          </Button>
                        </Grid>
                      </>
                    )
                  }
                })}

                {updateStudentPayment.paymentDetails?.installmentDetails?.map((e: any, index: any) => {
                  if (e.paymentStatus == "due" && index == count) {
                    return (
                      <>

                        <Grid item xs={12} mt={3} style={{ display: "flex" }}>
                          <Grid item xs={6} sm={6}>
                            <Typography>Do you want to Pay/Due the Installment {index + 1} </Typography>
                          </Grid>


                          <Grid item xs={6} sm={2}>
                            <Typography>Pay ?</Typography>
                            <Radio
                              checked={selectedRadioValue === 'payed'}
                              onChange={handleRadioChange}
                              value="payed"
                              name="radio-buttons"
                            />
                          </Grid>

                          <Grid item xs={6} sm={2}>
                            <Typography>Due ?</Typography>
                            <Radio
                              checked={selectedRadioValue === 'due'}
                              onChange={handleRadioChange}
                              value="due"
                              name="radio-buttons"
                            />

                          </Grid>

                        </Grid>

                        {selectedRadioValue == "payed" ?
                          <>

                            <Grid item xs={8} sm={3}>
                              <DatePickerWrapper>
                                <DatePicker
                                  dateFormat="dd/MM/yyyy"
                                  id='basic-input'
                                  todayButton='Today'
                                  selected={dateTodayBtn}
                                  name="paymetRecieveDate"
                                  value={e.paymetRecieveDate ? e.paymetRecieveDate : e.nextpaymetDate}
                                  popperPlacement={popperPlacement}
                                  onChange={(date: Date) => {
                                    handleDateChange(date, index)
                                  }}
                                  onCalendarOpen={() => {
                                    addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                                  }}
                                  placeholderText='Payment received date'
                                  customInput={
                                    <CustomInput
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                      }}
                                      label='Payment received date' value={undefined} error={false} onChange={
                                        function (event: ChangeEvent<Element>): void {
                                          throw new Error('Function not implemented.')
                                        }} />}
                                />
                              </DatePickerWrapper>
                            </Grid>
                            <Grid item xs={8} sm={3}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                name="paymentNotes"
                                label='Payment discription'
                                onChange={(e: any) => { handleDetailsChange(e, index) }}
                                onClickCapture={() => {
                                  addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                                }}
                                value={e.paymentNotes}
                                inputProps={{
                                  maxLength: 500,
                                }}
                                placeholder='Payment discription'

                              />
                            </Grid>
                            <Grid item xs={8} sm={3}>

                              <TextField

                                InputLabelProps={{ shrink: true }}
                                name="receivedPayment"
                                label='Total received payment'
                                value={totalReceivedPayment ? totalReceivedPayment : payStatusState ? e.duePayment : ""}
                                placeholder='Total received payment'
                                onChange={(e: any) => { handleDetailsChange(e, index) }}
                                onClickCapture={() => {
                                  addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                                }}
                                disabled={updateStudentPayment.paymentDetails?.installmentDetails.length == count + 1 ? true : false}
                              />
                            </Grid>
                          </>
                          :
                          <>
                            <Grid item xs={8} sm={3}>
                              <DatePickerWrapper>
                                <DatePicker
                                  dateFormat="dd/MM/yyyy"
                                  id='basic-input'
                                  todayButton='Today'
                                  selected={dateTodayBtn}
                                  name="nextpaymetDate"
                                  value={e.paymetRecieveDate ? e.paymetRecieveDate : e.nextpaymetDate}
                                  popperPlacement={popperPlacement}
                                  onChange={(date: Date) => {
                                    handleDateChange(date, index)
                                  }
                                  }
                                  onCalendarOpen={() => addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)}
                                  placeholderText='Next payment date'
                                  customInput={<CustomInput
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                    }}
                                    label='Next payment date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                      throw new Error('Function not implemented.')
                                    }} />}
                                />
                              </DatePickerWrapper>
                            </Grid>
                            <Grid item xs={8} sm={3}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                name="paymentNotes"
                                label='Payment discription'
                                onChange={(e: any) => { handleDetailsChange(e, index) }}
                                onClickCapture={() => {
                                  addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                                }}
                                value={e.paymentNotes}
                                placeholder='Payment discription'
                                inputProps={{
                                  maxLength: 500,
                                }}

                              />
                            </Grid>
                            <Grid item xs={8} sm={3}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                name="duePayment"
                                label='Next payment'
                                value={totalReceivedPayment ? totalReceivedPayment : payStatusState ? e.duePayment : ""}
                                placeholder='Next payment'
                                onChange={(e: any) => { handleDetailsChange(e, index) }}
                                onClickCapture={() => {
                                  addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                                }}
                                disabled={updateStudentPayment.paymentDetails?.installmentDetails.length == count + 1 ? true : false}
                              />
                            </Grid>
                          </>

                        }

                        <Grid container item xs={8} sm={3}>

                          <Grid>
                            <Button
                              size='large'
                              variant='contained'
                              onClick={() => { handleSubmit(index, e) }}
                              style={{
                                color: "white",
                                backgroundColor: index == saveButton[saveButton.findIndex((o: any) => o.index == index)]?.index && saveButton[saveButton.findIndex((o: any) => o.index == index)]?.color

                              }}
                              disabled={(saveButton[saveButton.findIndex((o: any) => o.index == index)]?.index == index && saveButton[saveButton.findIndex((o: any) => o.index == index)]?.status == true) ? false : true}
                            >
                              Save
                            </Button>
                          </Grid>
                          {updateStudentPayment.paymentDetails?.installmentDetails.length - 1 != index ?
                            <Grid >
                              <IconButton onClick={() => {
                                setInstallmentIndex(index + 1)
                                setSuspendDialogOpen(true)
                                setDeleteAddInstallment('delete')
                              }}>
                                <Icon icon="bx:minus-circle" color="red" width="30" height="30" />
                              </IconButton>
                            </Grid> :
                            <Grid >
                              <IconButton onClick={() => {
                                setInstallmentIndex(index + 1)
                                setSuspendDialogOpen(true)
                                setDeleteAddInstallment('add')
                              }}>
                                <Icon icon="bx:plus-circle" color="#54B435" width="30" height="30" />
                              </IconButton>
                            </Grid>

                          }

                        </Grid>
                      </>
                    )
                  } else if (e.paymentStatus == "due") {
                    return (
                      <>

                        <Grid item xs={8} sm={3}>
                          <DatePickerWrapper>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              id='basic-input'
                              todayButton='Today'
                              selected={dateTodayBtn}
                              name="nextpaymetDate"
                              value={dateTodayBtn ? dateTodayBtn : e.nextpaymetDate}
                              popperPlacement={popperPlacement}
                              onChange={(date: Date) => {
                                handleDateChange(date, index)
                              }
                              }
                              onCalendarOpen={() => addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)}
                              placeholderText='Payment received date'
                              customInput={<CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                label='Next payment date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.')
                                }} />}
                            />
                          </DatePickerWrapper>
                        </Grid>

                        <Grid item xs={8} sm={3}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            name="paymentNotes"
                            label='Payment discription'
                            onChange={(e: any) => { handleDetailsChange(e, index) }}
                            onClickCapture={() => {
                              addSaveItem({ index: index, status: true, color: "#3C79F5" }, index)
                            }}
                            value={e.paymentNotes}
                            placeholder='Payment discription'
                            inputProps={{
                              maxLength: 500,
                            }}
                          />
                        </Grid>
                        <Grid item xs={8} sm={3}>

                          <TextField
                            InputLabelProps={{ shrink: true }}
                            name="totalReceivedPayment"
                            label='Next payment'
                            onChange={(e: any) => { handleDetailsChange(e, index) }}
                            value={payStatusUpdate ? remainingAmount ? remainingAmount : remainingAmount == 0 ? 0 : e.duePayment : e.duePayment}
                            placeholder='Total payment'
                            disabled
                          />
                        </Grid>
                        <Grid container item xs={8} sm={3}>
                          <Grid>
                            <Button
                              size='large'
                              variant='contained'
                              onClick={() => { handleSubmit(index, e) }}
                              style={{
                                color: "white",
                                backgroundColor: index == saveButton[saveButton.findIndex((o: any) => o.index == index)]?.index && saveButton[saveButton.findIndex((o: any) => o.index == index)]?.color
                              }}
                              disabled={(saveButton[saveButton.findIndex((o: any) => o.index == index)]?.index == index && saveButton[saveButton.findIndex((o: any) => o.index == index)]?.status == true) ? false : true}
                            >
                              Save
                            </Button>
                          </Grid>
                          {updateStudentPayment.paymentDetails?.installmentDetails.length - 1 != index ?
                            <Grid >
                              <IconButton onClick={() => {
                                setInstallmentIndex(index + 1)
                                setSuspendDialogOpen(true)
                                setDeleteAddInstallment('delete')
                              }}>
                                <Icon icon="bx:minus-circle" color="red" width="30" height="30" />
                              </IconButton>
                            </Grid> :
                            <Grid >
                              <IconButton onClick={() => {
                                setInstallmentIndex(index + 1)
                                setSuspendDialogOpen(true)
                                setDeleteAddInstallment('add')
                              }}>
                                <Icon icon="bx:plus-circle" color="#54B435" width="30" height="30" />
                              </IconButton>
                            </Grid>

                          }
                        </Grid >
                      </>
                    )
                  }
                })}
              </>
            }
          </Fragment >
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      "yashBais"
    } else {
      return (

        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5} >
            <Grid container sx={{ display: "flex", flexDirection: "column", pt: 5, pl: 5 }}>
              <Grid item xs={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[activeStep].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[activeStep].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Button
                  variant='outlined'
                  color={"primary"}
                  onClick={() => {
                    props.setUpdatePaymentDetails(false)
                  }}
                > &#8592; Back</Button>
              </Grid>
            </Grid>
            {
              isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) :
                <>
                  {getStepContent(activeStep)}
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      size='large'
                      variant='outlined'
                      color='secondary'
                      disabled={activeStep === 0}
                      onClick={() => {
                        setSuspendBackDialogOpen(true)
                      }}>
                      Back
                    </Button>
                    {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("update")) && updateStudentPayment.paymentDetails?.allPaymentStatus != 'refund' &&
                      updateStudentPayment.paymentDetails?.allPaymentStatus != 'defaulter' &&
                      <>
                        {
                          updateStudentPayment.paymentDetails?.isPartPayment == false ?
                            <>
                              <Button size='large'
                                variant='contained'
                                onClick={handleNext}
                                disabled={activeStep === steps.length - 1 && paymentDetails?.allPaymentStatus == "payed" ? true : false}>
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </>
                            :
                            <>
                              {
                                submitButton.length > 0 && submitButton.length == statusCheck.dueCount && updateStudentPayment.paymentDetails?.isPartPayment == true ?
                                  <>
                                    <Button size='large'
                                      variant='contained'
                                      onClick={handleNext}
                                      disabled={activeStep === steps.length - 1 && paymentDetails?.allPaymentStatus == "payed" ? true : false}>
                                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                  </>
                                  :
                                  <>
                                    <Button size='large'
                                      variant='contained'
                                      onClick={handleNext}
                                      disabled={activeStep !== steps.length - 1 ? false : true}
                                    >
                                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                  </>
                              }

                            </>
                        }
                      </>
                    }
                  </Grid>
                </>
            }
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment
    >

      {/* dialog for Coupon */}
      < Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '500px' } }} onClose={handleCouponDialogClose} open={openCouponDialog} >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='span'>
              {`${dialogTitle} Special Coupon `}
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
              <Grid container spacing={5} mt={2}>
                <Grid item xs={12} sm={6}>

                  <TextField
                    fullWidth
                    name='couponName'
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
                <Grid item xs={12} sm={6}>
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
                  <FormControl error={submitted ? couponData.couponType ? false : true : false}
                  >
                    <FormLabel>Coupon type</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='home'
                      aria-label='address type'
                      name='form-layouts-collapsible-address-radio'
                    >
                      <FormControlLabel value='Flat' onChange={handleRadioChangeForCoupon} control={<Radio required />} label='Flat' />
                      <FormControlLabel value='Percentage' onChange={handleRadioChangeForCoupon} control={<Radio required />} label='Percentage' />

                    </RadioGroup>
                  </FormControl>
                </Grid>
                {
                  couponType == 'Flat' ?
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='couponValue'
                        type='number'
                        label='Coupon value'
                        onChange={onCouponChange}
                        placeholder='Coupon value'

                        aria-describedby='validation-basic-first-name'
                        error={submitted ? couponData.couponValue ? false : true : false}
                        helperText={submitted && !couponData.couponValue ? 'Required,value must be a positive number' : ''}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          min: 0,
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">/-</InputAdornment>,
                        }}
                      /></Grid> :

                    couponType == 'Percentage' ?
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>

                            <TextField
                              name='couponValue'

                              type='number'
                              label='Percentage'
                              onChange={onCouponChange}
                              placeholder='Percentage'
                              aria-describedby='validation-basic-first-name'
                              error={submitted ? couponData.couponValue ? false : true : false}
                              helperText={submitted && !couponData.couponValue ? 'Required,value must be between 0-99' : ''}
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0,
                                max: 99,
                              }}
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
                  <FormControl error={submitted ? couponData.couponLimit ? false : true : false}
                  >
                    <FormLabel>Coupon limit</FormLabel>
                    <RadioGroup
                      row
                      defaultValue='None'
                      aria-label='address type'
                      name='form-layouts-collapsible-address-radio'
                    >
                      <FormControlLabel value='Date' name="Date" onChange={handleChangeCouponRadio} control={<Radio />} label='Date' />
                      <FormControlLabel value='couponCount' name="couponCount" onChange={handleChangeCouponRadio} control={<Radio />} label='Coupon count' />
                      <FormControlLabel value='Both' name="couponCount" onChange={handleChangeCouponRadio} control={<Radio />} label='Both' />
                      <FormControlLabel value='None' name="couponCount" onChange={handleChangeCouponRadio} control={<Radio />} label='None' />

                    </RadioGroup>
                  </FormControl>
                </Grid>

                {


                  couponDate == "Date" ?
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <DatePicker
                          selected={startDate}
                          id='basic-input'
                          dateFormat="dd/MM/yyyy"
                          popperPlacement={popperPlacement}
                          onChange={(date: Date) => setStartDate(date)}
                          placeholderText='Coupon Expiry Date'
                          customInput={<CustomInput
                            error={submitted ? startDate ? false : true : false}
                            helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''}
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                            }}
                            label='Coupon expiry date'
                            value={undefined}


                            onChange={function (event: ChangeEvent<Element>): void {
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
                          placeholder='coupon Count'
                          error={submitted ? couponData.couponCount ? false : true : false}
                          helperText={submitted && !couponData.couponCount ? 'Required,value must be a positive number' : ''}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 10000,
                          }}
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
                            name='couponCount'
                            label='Coupon count'

                            onChange={onCouponChange}
                            placeholder='Coupon count'
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
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            id='basic-input'
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => setStartDate(date)}
                            placeholderText='Coupon Expiry Date'
                            customInput={<CustomInput
                              error={submitted ? startDate ? false : true : false}
                              helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''}
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}
                              label='Coupon expiry date'
                              value={undefined}
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
                  e.preventDefault();
                  setSubmitted(true);
                  createCouponApi(e);
                }}
              >
                Submit
              </Button>

            </Box>
          </DialogActions>
        </form>
      </Dialog >
      {/* dialog for Coupon */}

      {/* dialog for details*/}

      <Dialog
        fullWidth
        open={showDetailsPopup}
        maxWidth='sm'
        scroll='body'
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>

          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>Hurray ! Special coupon applied Successfully 🎉</Typography>
            <Typography variant='body2'>
              Payment Details
            </Typography>
            <Divider sx={{ m: '0 !important' }} />
          </Box>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='body2'>
              Payment details after coupon applied
            </Typography>
          </Box>
          <CardContent>
            <Grid container sm={8}>

              {paymentDetails && paymentDetails?.isPartPayment == true ?
                <>
                  <TableContainer >
                    <Table>
                      <TableBody>
                        <Grid >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '3px !important' }}>Part Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '3px !important' }}>YES</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '3px !important' }}>All Payment Status :</MUITableCell>
                            <MUITableCell sx={{ p: '3px !important' }}>{paymentDetails && paymentDetails?.allPaymentStatus}</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid  >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Grand Total Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.grandTotalPaymentAmount}</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid  >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Discounted Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.discountedPaymentAmount}</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid  >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Total Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && parseInt(paymentDetails?.totalPayment) + parseInt(paymentDetails?.totalReceivedPayment)}</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid  >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Total Due Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.totalPayment}</MUITableCell>
                          </TableRow>
                        </Grid>
                        <Grid  >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Total Recieved Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.totalReceivedPayment}</MUITableCell>
                          </TableRow>
                        </Grid>

                        <Grid >
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>

                            <MUITableCell sx={{ p: '2px !important' }}>Number Of Installments :</MUITableCell>
                            <MUITableCell sx={{ p: '5px !important' }}>{paymentDetails?.installmentDetails && paymentDetails?.installmentDetails.length}</MUITableCell>
                          </TableRow>
                        </Grid>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {
                    paymentDetails ? paymentDetails?.installmentDetails.map((e: any) => {
                      return (
                        <>
                          <Grid container style={{ marginTop: "10px" }} >
                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Installment {e.installmentNumber} :</Typography>
                            <Grid style={{ marginTop: "20px" }}>
                              <Box >
                                <TableContainer>
                                  <Table>
                                    <TableBody>
                                      <Grid  >
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between', gap: '120px' }}>
                                          <MUITableCell sx={{ p: '2px !important' }}>Payment Status:</MUITableCell>
                                          <MUITableCell sx={{ p: '5px !important' }}>{e.paymentStatus}</MUITableCell>
                                        </TableRow>
                                      </Grid>
                                      <Grid >
                                        {e.paymentStatus == "payed" ?
                                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <MUITableCell sx={{ p: '2px !important' }}>Payment Received Date :</MUITableCell>
                                            <MUITableCell sx={{ p: '5px !important' }}>{e.paymetReceiveDate && e.paymetReceiveDate}</MUITableCell>
                                          </TableRow>
                                          : e.paymentStatus == "due" &&
                                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <MUITableCell sx={{ p: '2px !important' }}>Next Payment Date :</MUITableCell>
                                            <MUITableCell sx={{ p: '5px !important' }}>{e.nextpaymetDate && e.nextpaymetDate}</MUITableCell>
                                          </TableRow>
                                        }
                                      </Grid>
                                      <Grid>
                                        {e.paymentStatus == "payed" ?
                                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <MUITableCell sx={{ p: '2px !important' }}>Received Payment :</MUITableCell>
                                            <MUITableCell sx={{ p: '5px !important' }}>{e.receivedPayment && e.receivedPayment}</MUITableCell>
                                          </TableRow>
                                          : e.paymentStatus == "due" &&
                                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                            <MUITableCell sx={{ p: '2px !important' }}>Due Payment :</MUITableCell>
                                            <MUITableCell sx={{ p: '5px !important' }}>{e.duePayment && e.duePayment}</MUITableCell>
                                          </TableRow>
                                        }
                                      </Grid>
                                      <Grid>
                                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                          <MUITableCell sx={{ p: '2px !important' }}>Payment Notes :</MUITableCell>
                                          <MUITableCell sx={{ p: '5px !important' }}>{e.paymentNotes && e.paymentNotes}</MUITableCell>
                                        </TableRow>
                                      </Grid>

                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Grid>
                          </Grid >
                        </>
                      )

                    }) : ""

                  }
                </>
                :

                <TableContainer >
                  <Table>
                    <TableBody>
                      <Grid >
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '3px !important' }}>Part Payment :</MUITableCell>
                          <MUITableCell sx={{ p: '3px !important' }}>NO</MUITableCell>
                        </TableRow>
                      </Grid>
                      <Grid >
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '3px !important' }}>All Payment Status :</MUITableCell>
                          <MUITableCell sx={{ p: '3px !important' }}>{paymentDetails && paymentDetails?.allPaymentStatus}</MUITableCell>
                        </TableRow>
                      </Grid>
                      <Grid  >
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '2px !important' }}>Grand Total Payment :</MUITableCell>
                          <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.grandTotalPaymentAmount}</MUITableCell>
                        </TableRow>
                      </Grid>
                      <Grid  >

                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '2px !important' }}>Discounted Paym :</MUITableCell>
                          <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && (paymentDetails?.grandTotalPaymentAmount - paymentDetails?.totalPayment)}</MUITableCell>
                        </TableRow>
                      </Grid>
                      <Grid  >
                        {paymentDetails && paymentDetails?.allPaymentStatus == "payed" ?
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Total Payment :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.totalPayment}</MUITableCell>
                          </TableRow >
                          : paymentDetails && paymentDetails?.allPaymentStatus == "due" && <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Next Payment Amount :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.totalPayment}</MUITableCell>
                          </TableRow>}
                      </Grid>
                      <Grid  >
                        {paymentDetails && paymentDetails?.allPaymentStatus == "payed" ?
                          <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Payment Recieved Date:</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.paymetReceiveDate}</MUITableCell>
                          </TableRow>
                          : paymentDetails?.allPaymentStatus == "due" && <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                            <MUITableCell sx={{ p: '2px !important' }}>Next Payment Date :</MUITableCell>
                            <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.nextPaymetReceiveDate}</MUITableCell>
                          </TableRow>}
                      </Grid>
                      <Grid  >
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '2px !important' }}>Total Due Payment :</MUITableCell>
                          <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.totalPayment}</MUITableCell>
                        </TableRow>
                      </Grid>
                      <Grid  >
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <MUITableCell sx={{ p: '2px !important' }}>Payment Notes :</MUITableCell>
                          <MUITableCell sx={{ p: '2px !important' }}>{paymentDetails && paymentDetails?.paymentNotes}</MUITableCell>
                        </TableRow>
                      </Grid>
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </Grid>
          </CardContent>

        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'right' }}>
          <Button
            variant='outlined'
            disabled={0 > couponApplied ? true : false}
            onClick={() => {
              setShowDetailsPopup(false)
              setSubmitCoupon(true)
            }}>
            OK
          </Button>
          <Button variant='outlined' onClick={() => {
            setShowDetailsPopup(false)
            setStateManage(false)
            setStartDate(null)
            setReviewState(false)
            listApiCall()
            setCoupon(null)
            setCouponApplied(0)

            // setIsFormComplete(true)
          }}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
      {/* dialog for details*/}

      {/* dialog for delete installment*/}
      <Dialog fullWidth open={suspendDialogOpen} onClose={() => setSuspendDialogOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => setSuspendDialogOpen(false)}
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
            {deleteAddInstallment == "delete" ?
              <Typography sx={{ fontSize: '1.125rem', mb: 4 }}>You won't be able to revert installment!</Typography>
              : deleteAddInstallment == "add" &&
              <Typography sx={{ fontSize: '1.125rem' }}>A new installment will be added!</Typography>}

          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' color='secondary'
            onClick={() => setSuspendDialogOpen(false)}
          >
            Cancel
          </Button>
          {deleteAddInstallment == "delete" ?
            <Button variant='contained' sx={{ mr: 1.5 }}
              onClick={() => {
                setSuspendDialogOpen(false)
                installmentDeleteFunction()
              }}
            >
              Delete
            </Button> : deleteAddInstallment == "add" && <Button variant='contained' sx={{ mr: 1.5 }}
              onClick={() => {
                setSuspendDialogOpen(false)
                installmentAddFunction()
              }}
            >
              Yes, Add!
            </Button>}

        </DialogActions>
      </Dialog>
      {/* dialog for delete installment*/}

      {/*dialog for back button */}

      <Dialog fullWidth open={suspendBackDialogOpen} onClose={() => setSuspendBackDialogOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => {
              setSuspendBackDialogOpen(false)
              listApiCall()
              setActiveStep(activeStep - 1)
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
        <DialogContent sx={{ pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 5, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
              <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>

            <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>Do you want to save the changes</Typography>


          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right', display: 'flex', gap: 5 }}>

          <Button variant='outlined' color='secondary'
            onClick={() => {
              setSuspendBackDialogOpen(false)
              listApiCall()
              setActiveStep(activeStep - 1)
            }
            }
          >
            Back
          </Button>
          <Button variant='outlined' color='secondary'
            onClick={() => setSuspendBackDialogOpen(false)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/*dialog for back button */}

      {/*dialog for coupon list*/}
      <Dialog
        fullWidth
        open={couponListPopup}
        maxWidth='sm'
        scroll='body'
      >
        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5' sx={{ m: 5 }} > Select a special coupon to add !</Typography>
          <Grid sx={{ display: 'flex', m: 5 }} >
            <Icon
              className="iconContainer"
              onClick={() => {
                setCoupon('')
                setCouponListPopup(false)
              }}
              style={{
                cursor: "pointer",
                fontSize: "30px",

                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </Grid>
        </Grid>

        <DialogContent sx={{ pb: 4, px: { xs: 8, sm: 8 }, position: 'relative' }}>

          <Box sx={{ mb: 4, textAlign: 'center' }}>


            <Divider sx={{ m: '0 !important' }} />
          </Box>

          <Box sx={{ mb: 4 }}>


            <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }} >
              <Grid item xs={12} sm={6} >
                <FormControl fullWidth >
                  <InputLabel
                    id='validation-basic-select'
                    htmlFor='validation-basic-select'
                  >
                    Coupon list
                  </InputLabel>

                  <Select
                    value={coupon ? coupon : ""}
                    label='Coupon List'
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                    required
                    MenuProps={MenuProps}
                  >
                    {couponListData && couponListData?.length > 0 ? (
                      couponListData?.filter((couponData: any) => !studentDetails?.coupon?.some((studentCoupon: any) => studentCoupon.couponId === couponData.couponId))
                        .map((filteredCoupon: any, index: any) => (
                          <MenuItem
                            key={index}
                            value={filteredCoupon.couponName}
                            onClick={() => {
                              setCoupon(filteredCoupon.couponName);
                              setCouponResponse(filteredCoupon);
                            }}
                          >
                            {filteredCoupon.couponName}
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
              <Grid item xs={1} sm={0} marginLeft={"10px"}>
                <AddCircleIcon onClick={() => {
                  setOpenCouponDialog(true)
                  setDialogTitle('Add')
                }} color='primary' style={{ marginTop: "12px", cursor: "pointer" }} />

              </Grid>
            </Grid>
          </Box>


        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'right' }}>
          <Button variant='outlined' onClick={() => {
            setCoupon('')
            setCouponListPopup(false)
          }}>
            cancel
          </Button>
          <Button variant='contained'
            disabled={coupon != null && coupon != "" ? false : true}
            onClick={() => {
              setShowDetailsPopup(true)
              setCouponListPopup(false)

              // setIsFormComplete(false)
            }}>
            Apply
          </Button>

        </DialogActions>
      </Dialog>
      {/* dialog for coupon list*/}

      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
      {
        open.open && (
          <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
            <Alert
              variant="filled"
              elevation={3}
              onClose={handleClose}
              severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
            >
              {open.msg}
            </Alert>
          </Snackbar>
        )
      }

    </Fragment >
  )
}
export default UpdateStudentPaymentDetails
