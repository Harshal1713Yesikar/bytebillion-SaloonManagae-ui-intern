// ** MUI Import
import moment from 'moment';
import format from 'date-fns/format';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import { forwardRef, useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import { getDateRange } from 'src/@core/utils/get-daterange';
import MailIcon from '@mui/icons-material/Mail';
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { StudentUpcomingPaymentList, studentUpcomingFeeMail } from 'src/store/APIs/Api'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { colors } from '@mui/material'
import CountUp from 'react-countup'

interface TableData {
  email: string
  amount: number
  avatarSrc?: string
  customerName: string
  status: 'paid' | 'failed' | 'pending'

}
interface PickerProps {
  start: Date | number
  end: Date | number
}




const statusObj = {
  paid: <CustomChip rounded size='small' skin='light' label='Due' sx={{ fontWeight: 500 }} style={{ color: 'steelBlue' }} />,

}

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial"
  }
});


const CrmTable = () => {
  // ** Hooks & Var
  const theme = useTheme()
  const dispatch = useDispatch()
  const { settings } = useSettings()
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [showData, setShowData] = useState<any>()
  const [user, setUser] = useState<any>()
  const [sent, setSent] = useState<boolean>(false)
  const [lenghtData, SetLenghtData] = useState<any>()
  const [page, setPage] = useState(0);
  const [nextPaymentAmount, setNextPaymentAmount] = useState(0);
  const [previousPaymentAmount, setPreviousPaymentAmount] = useState(0);
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])
  useEffect(() => {
    setPreviousPaymentAmount(nextPaymentAmount)
  }, [nextPaymentAmount])

  function Item(props: any) {
    const { sx, ...other } = props

    return (
      <Box
        sx={{
          p: 3,
          m: 1,

          bgcolor: theme => (theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100'),
          color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          borderColor: theme => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '1.10rem',
          fontWeight: '1000',
          ...sx
        }}
        {...other}
      />
    )
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'yyyy-MM-dd') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'yyyy-MM-dd')}` : null




    const value = `${startDate}${endDate !== null ? endDate : ''}`
    const x1 = moment()

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='bx:calendar-alt' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='bx:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {

    const [start, end] = dates

    setStartDate(start)

    setEndDate(end)

  }


  useEffect(() => {
    if (startDate && endDate) {
      getDateRange(startDate, endDate)

      SetLenghtData(getDateRange(startDate, endDate).length)

    }
  }, [startDate, endDate])


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])
  const upcomingMailCall = () => {
    if (showData.length > 0) {
      for (let i = 0; i < showData.length; i++) {
        if (showData[i].paymentForecast.length > 0) {
          for (let j = 0; j < showData[i].paymentForecast.length; j++) {
            if (!sent) {
              studentUpcomingFeeMail({
                organizationName: user.organizationName,
                studentEmail: showData[i].studentEmail,
                studentName: `${showData[i].studentFirstName} ${showData[i].studentLastName}`,
                courseName: '',
                feeAmount: showData[i].paymentForecast[j].Details.duePayment,
                paymentDate: showData[i].paymentForecast[j].Details.nextpaymetDate,
                organizationMail: user.organizationEmail,
                organizationLogo: organizationLogo
              })
              setSent(true);
              setOpen(true)
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      const DateStart = '';
      const DateEnd = '';

      dispatch(
        StudentUpcomingPaymentList({
          customerId: user.customerId,
          organizationId: user.organizationId,
          startDate: DateStart,
          endDate: DateEnd

        })
      )
        .then((res: any) => {
          setShowData(res.payload.data)
        })
        .catch((err: any) => console.log(err, 'error'))
    }
  }, [user])
  useEffect(() => {
    if (nextPaymentAmount == 0 || nextPaymentAmount == previousPaymentAmount) {
      if (showData) {
        let money = 0;
        for (let i = 0; i < showData.length; i++) {
          for (let j = 0; j < showData[i].paymentForecast.length; j++) {
            money = Number(showData[i].paymentForecast[j].Details.duePayment) + money;
          }
        }
        setNextPaymentAmount(money)
      }
    }
  }, [showData])

  useEffect(() => {
    let DateStart = '';
    let DateEnd = '';
    if (startDate && endDate) {
      if (startDate && endDate) {
        const monthData = startDate?.getMonth() + 1
        DateStart = `${startDate?.getDate() > 9 ? startDate?.getDate() : '0' + startDate?.getDate()}-${monthData > 9 ? monthData : '0' + monthData}-${startDate?.getFullYear()}`
        DateEnd = `${endDate?.getDate() > 9 ? endDate?.getDate() : '0' + endDate?.getDate()}-${endDate?.getMonth() + 1 > 9 ? endDate?.getMonth() + 1 : '0' + (endDate?.getMonth() + 1)}-${endDate?.getFullYear()}`

      }
      dispatch(
        StudentUpcomingPaymentList({
          customerId: user.customerId,
          organizationId: user.organizationId,
          startDate: DateStart,
          endDate: DateEnd

        })
      )
        .then((res: any) => {
          if (res.payload.statusCode === 200) {
            setShowData(res.payload.data)
          } else {
            setShowData([])
          }

        })

        .catch((err: any) => console.log(err, 'error'))


    }
  }, [startDate, endDate])

  const dueDays = lenghtData ? lenghtData : 5

  const classes = useStyles();

  return (


    <Card sx={{ height: 610, overflowY: 'auto', overflowX: 'auto' }}>
      <DatePickerWrapper>
        <CardHeader
          title={` Next ${dueDays} days due payment forecast `}

          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selectsRange
              id='recharts-bar'
              endDate={endDate}
              selected={startDate}
              startDate={startDate}
              onChange={handleOnChange}
              minDate={new Date()}
              placeholderText='Select a date'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          }
        />
      </DatePickerWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ marginLeft: '25px', display: 'flex', color: '#00FF00', alignItems: 'center' }} sx={{ '& svg': { mr: 1, color: '00FF00 ' } }}>
          <Icon icon='bxs:circle' fontSize='0.75rem' />
          <Item>
            <label>Due payment forecast :<span style={{ color: '#00FF00', marginLeft: '8px' }}>&#8377;</span></label>
            <CountUp
              style={{ color: '#00FF00' }}
              start={0.01}
              end={nextPaymentAmount}
              duration={1}
              useEasing={true}
              separator=','
            />
          </Item>
        </Box>
        {
          showData?.length > 0 ?
            <Button
              onClick={() => upcomingMailCall()}
              sx={{ marginRight: 4, height: 35 }}
              variant='contained'
              color='primary'
              disabled={sent ? true : false}

            >Notify <MailIcon /></Button>
            : null
        }

      </Box>
      <TableContainer classes={{ root: classes.customTableContainer }} >
        <Table sx={{
          height: "max-content",
          paddingTop: '10px'
        }}
          stickyHeader aria-label='sticky table'
        >
          <TableHead  >
            <TableRow  >

              <TableCell sx={{
                py: 3, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap', position: 'sticky',
                top: 0,
              }}>rollNo</TableCell>
              <TableCell sx={{
                py: 3, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap', position: 'sticky',
                top: 0,
              }}>Name</TableCell>

              <TableCell sx={{
                py: 5, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap', position: 'sticky',
                top: 0,
              }}>Due Amount</TableCell>

              {/* <TableCell sx={{ py: 3, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap' }}>Status</TableCell>
              <TableCell sx={{ py: 3, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap' }}>Date</TableCell> */}
              {/* <TableCell sx={{ py: 3, lineHeight: 1.1, fontWeight: 600, whiteSpace: 'nowrap' }}>Paid By</TableCell> */}

            </TableRow>
          </TableHead>

          <TableBody className="hoverable-row" >

            {showData ? showData.length > 0 ?

              <>
                {showData.map((e: any, index: number) => {
                  // const {email, amount, status, avatarSrc, customerName} = item

                  {
                    if (e.rollNo > 1) {

                    }
                  }

                  return (
                    <TableRow
                      key={e.rollNo}
                      sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2)} !important` } }}
                      onClick={() => router.push(`student/studentDetails/${e.rollNo}/`)}
                    >
                      <TableCell style={{ borderRight: '1px solid ', borderColor: "rgb(196 206 215 / 60%)" }}>
                        <Typography noWrap sx={{ fontWeight: 500 }}>
                          {e.rollNo}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ borderRight: '1px solid ', borderColor: "rgb(196 206 215 / 60%)" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ fontWeight: 500 }} >
                              {e.studentFirstName.charAt(0).toUpperCase() + e.studentFirstName.slice(1)} {e.studentLastName.charAt(0).toUpperCase() + e.studentLastName.slice(1)}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {e.studentEmail}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {e.studentContact}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableRow>
                            <TableCell>Amount </TableCell>

                            <TableCell>Status </TableCell>
                            <TableCell>Date </TableCell>

                          </TableRow>
                          {e.paymentForecast.map((i: any, index: number, array: any) => {
                            return (

                              <>
                                <TableRow>
                                  <TableCell>
                                    <Typography noWrap sx={{ fontWeight: 500 }}>
                                      {parseInt(i.Details.duePayment)}
                                    </Typography>
                                  </TableCell>

                                  {/* <Typography noWrap sx={{ fontWeight: 500, color: 'Green' }}>
                                {i.Details.paymentStatus.charAt(0).toUpperCase() + i.Details.paymentStatus.slice(1)}
                              </Typography> */}
                                  <TableCell>
                                    {statusObj.paid}</TableCell>

                                  <TableCell>
                                    <Typography noWrap sx={{ fontWeight: 500 }}>
                                      {
                                        `${i.Details.nextpaymetDate.split('-')[2]}-${i.Details.nextpaymetDate.split('-')[1]}-${i.Details.nextpaymetDate.split('-')[0]}`
                                      }
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </>


                            )
                          })}
                          {/* <TableCell>{paidByObj[paidBy]}</TableCell> */}
                        </Table>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </>
              :

              <Stack sx={{
                width: '50%', mt: '140px', ml: '200px',
              }} spacing={2}>
                <Alert severity="error" sx={{ pt: '10px' }}>
                  <AlertTitle> No data found</AlertTitle>
                </Alert>
              </Stack >
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Mail sent Successfully!
        </Alert>
      </Snackbar>

    </Card>
  )
}

export default CrmTable
