import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { listOneStudentDetailApi, studentFeeSlipMail } from 'src/store/APIs/Api';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput/PickersCustomInput'
import { customDateFormatDash } from 'src/@core/utils/format'
import InputAdornment from '@mui/material/InputAdornment';
import Icon from 'src/@core/components/icon'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StudentGenerateFeeReceipt = () => {

  const templateIndex = useSelector((state: any) => state.feeReceiptDesignReducer.value)
  const router = useRouter();
  const { studentId } = router.query
  const [studentData, setStudentData] = useState<any>({})
  const [user, setUser] = useState<any>({})
  const [paymentDate, setPaymentDate] = useState<any>('')
  const [paymentAmount, setPaymentAmount] = useState<any>('')
  const [courseName, setCourseName] = useState<any>('')
  const [modeOfPayment, setModeOfPayment] = useState<any>('')
  const [authority, setAuthority] = useState<string>('')
  const [totalFee, setTotalFee] = useState<any>('');
  const [receivedBy, setReceivedBy] = useState<any>('')
  const [dueAmount, setDueAmount] = useState<any>('')
  const [receiptNumber, setReceiptNumber] = useState<any>('')
  const [generated, setGenerated] = useState<any>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)


  useEffect(() => {
    const userData = localStorage.getItem('organization');
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])



  const generateStudentFeeSlip = () => {
    const data = {
      "studentMail": studentData.studentEmail,
      "organizationName": user.organizationName,
      "organizationEmail": user.organizationEmail,
      "templateIndex": templateIndex,
      "studentName": `${studentData.studentFirstName} ${studentData.studentLastName}`,
      "studentMobileNumber": studentData.studentContact,
      "courseName": courseName,
      "paymentDate": paymentDate,
      "paymentAmount": paymentAmount,
      "organizationAddress": user.organizationAddress,
      "organizationPhoneNumber": user.organizationPhoneNumber,
      "modeOfPayment": modeOfPayment,
      "receivedBy": receivedBy,
      "totalFee": studentData?.paymentDetails?.totalPayment,
      "dueAmount": dueAmount,
      "authority": authority,
      "serialNumber": receiptNumber
    }

    if (studentData && user && courseName && paymentDate && paymentAmount && modeOfPayment && authority && receiptNumber) {

      studentFeeSlipMail(data).then((res: any) => {
        return res;
      })
      setGenerated(true)
    } else {
      setGenerated(false)
    }
  }

  useEffect(() => {
    if (studentData?.paymentDetails?.totalPayment && paymentAmount) {
      setDueAmount(studentData?.paymentDetails?.totalPayment - paymentAmount)
    }
  }, [paymentAmount, studentData?.paymentDetails?.totalPayment])

  useEffect(() => {
    if (user) {
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res: any) => {
        setStudentData(res?.data)
      })
    }
  }, [user])

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >Generate Fee Receipt <ReceiptLongIcon />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label='Student Name'
              disabled
              fullWidth
              value={studentData?.studentFirstName ? studentData?.studentFirstName : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Student Surname'
              disabled
              fullWidth
              value={studentData?.studentLastName ? studentData?.studentLastName : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              fullWidth
              label='Student Email'
              value={studentData?.studentEmail ? studentData?.studentEmail : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Total Payment'
              disabled
              fullWidth
              value={studentData?.paymentDetails?.totalPayment ? studentData?.paymentDetails?.totalPayment : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Due Amount'
              disabled
              fullWidth
              error={(Number(studentData?.paymentDetails?.totalPayment) - Number(paymentAmount)) < 0}
              value={Number(studentData?.paymentDetails?.totalPayment) - Number(paymentAmount)}
            />
          </Grid>
          <Grid item xs={12}>

            <Typography>To be filled</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={receiptNumber}
              label='Receipt no.'
              error={submitted ? receiptNumber.length > 0 ? false : true : false}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={authority}
              label='Authorized by-'
              error={submitted ? authority.length > 0 ? false : true : false}
              onChange={(e) => setAuthority(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Payment received by'
              value={receivedBy}
              fullWidth
              error={submitted ? receivedBy.length > 0 ? false : true : false}
              onChange={(e) => setReceivedBy(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <DatePickerWrapper>
              <DatePicker
               dateFormat="dd/MM/yyyy"
                id='basic-input'
                name="paymentDate"
                value={paymentDate}
                onChange={(date: Date) => setPaymentDate(customDateFormatDash(date))}
                placeholderText='Select a date'
                customInput={<CustomInput error={submitted ? paymentDate ? false : true : false} InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='bx:calendar-alt' />
                    </InputAdornment>
                  ),
                }} label='Payment Date'
                />}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12}>
            <FormControl error={submitted ? modeOfPayment ? false : true : false}>
              <FormLabel id="demo-radio-buttons-group-label">Mode of payment</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="null"
                name="radio-buttons-group"

              >
                <FormControlLabel value="online" onClick={() => setModeOfPayment("online")} control={<Radio />} label="Online" />
                <FormControlLabel value="offline" onClick={() => setModeOfPayment("offline")} control={<Radio />} label="Offline" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <AccordionActions>
          <Button disabled={generated ? true : false} onClick={() => { generateStudentFeeSlip(); setSubmitted(true) }} variant='contained'>
            {generated ? 'Sent' : ' Generate'}
          </Button>
        </AccordionActions>
      </AccordionDetails>
    </Accordion >
  )
}

export default StudentGenerateFeeReceipt;
