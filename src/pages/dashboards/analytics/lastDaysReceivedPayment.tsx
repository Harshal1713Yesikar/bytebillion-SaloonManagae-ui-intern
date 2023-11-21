// ** MUI Import
import moment from 'moment'
import Box from '@mui/material/Box'
import format from 'date-fns/format'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import DatePicker from 'react-datepicker'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { makeStyles } from '@material-ui/core'

import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import { forwardRef, useEffect, useState } from 'react'
import { paidStudentPaymentApi } from 'src/store/APIs/Api'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { getDateRange } from 'src/@core/utils/get-daterange'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useRouter } from 'next/router'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

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
  paid: <CustomChip rounded size='small' skin='light' color='success' label='Paid' sx={{ fontWeight: 500 }} />
}
const useStyles = makeStyles({
  customTableContainer: {
    overflowX: 'initial'
  }
})

const LastDaysReceivedPayment = () => {
  // ** Hooks & Var
  const theme = useTheme()
  const dispatch = useDispatch()
  const { settings } = useSettings()
  const { direction } = settings
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [showData, setShowData] = useState<any>()
  const [user, setUser] = useState<any>()
  const [lenghtData, SetLenghtData] = useState<any>()
  const [rowsPerPage, setRowsPerPage] = useState(4)
  const [page, setPage] = useState(0)
  const router = useRouter()

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'yyyy-MM-dd') : ''
    const endDate = props.end !== null ? `- ${format(props.end, 'yyyy-MM-dd')}` : null

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

  useEffect(() => {
    if (user) {
      let DateStart = ''
      let DateEnd = ''
      if (startDate && endDate) {
        if (startDate && endDate) {
          const monthData = `${startDate?.getMonth() + 1}`
          const monthEndData = `${endDate?.getMonth() + 1}`
          const finalMonth = monthData.length == 1 ? `0${monthData}` : monthData
          const finalmonthEndData = monthEndData.length == 1 ? `0${monthEndData}` : monthEndData
          const dayData = `${startDate?.getDate()}`
          const dayEndData = `${endDate?.getDate()}`
          const finalDate = dayData.length == 1 ? `0${dayData}` : dayData
          const finalEndDate = dayEndData.length == 1 ? `0${dayEndData}` : dayEndData
          const yearData = startDate?.getFullYear()

          DateStart = `${finalDate}-${finalMonth}-${startDate?.getFullYear()}`
          DateEnd = `${finalEndDate}-${finalmonthEndData}-${endDate?.getFullYear()}`
        }
      }
      const customerId = user ? user.customerId : ''
      const organizationId = user ? user.organizationId : ''

      paidStudentPaymentApi(customerId, organizationId, DateStart, DateEnd)
        .then((res: any) => {
          setShowData(res.data)
        })
        .catch((err: any) => console.log(err, 'error'))
    }
  }, [user, startDate, endDate])

  const dueDays = lenghtData ? lenghtData : 5
  const classes = useStyles()

  return (
    <Card sx={{ height: 610, overflowY: 'auto', overflowX: 'scroll' }}>
      <DatePickerWrapper>
        <CardHeader
          title={` Last ${dueDays} days received payment`}
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
              maxDate={new Date()}
              placeholderText='Select a date'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          }
        />
      </DatePickerWrapper>
      <TableContainer classes={{ root: classes.customTableContainer }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  py: 3,
                  lineHeight: 1.1,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  top: 0,

                }}
              >
                rollNo
              </TableCell>
              <TableCell
                sx={{
                  py: 3,
                  lineHeight: 1.1,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  top: 0,

                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  py: 5,
                  lineHeight: 1.1,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  top: 0,

                }}
              >
                Due Amount{' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData ? (
              showData.length > 0 ? (
                <>
                  {showData.map((e: any, index: number) => {
                    {
                      if (e.rollNo > 1) {
                      }
                    }

                    return (
                      <TableRow
                        key={e.rollNo}
                        sx={{
                          '& .MuiTableCell-root': { py: theme => `${theme.spacing(2)} !important` },
                          cursor: 'pointer'
                        }}
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
                              <Typography noWrap sx={{ fontWeight: 500 }}>
                                {e.studentFirstName.charAt(0).toUpperCase() + e.studentFirstName.slice(1)}{' '}
                                {e.studentLastName.charAt(0).toUpperCase() + e.studentLastName.slice(1)}
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
                                        {i.Details.receivedPayment}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{statusObj.paid}</TableCell>
                                    <TableCell>
                                      <Typography noWrap sx={{ fontWeight: 500 }}>
                                        {i.Details.paymetReceiveDate.split('-')[2] +
                                          '-' +
                                          i.Details.paymetReceiveDate.split('-')[1] +
                                          '-' +
                                          i.Details.paymetReceiveDate.split('-')[0]}
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
              ) : (
                <Stack sx={{ width: '50%', mt: '140px', ml: '200px' }} spacing={2}>
                  <Alert severity='error' sx={{ pt: '10px' }}>
                    <AlertTitle> No data found</AlertTitle>
                  </Alert>
                </Stack>
              )
            ) : (
              ''
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default LastDaysReceivedPayment
