// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import InputAdornment from '@mui/material/InputAdornment'
import { chartApiData } from 'src/store/APIs/Api'
import { receivedPaymentApi } from 'src/store/APIs/Api'
import { FormControl, InputLabel, Select, Grid, MenuItem } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import OutlinedInput from '@mui/material/OutlinedInput'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import CountUp from 'react-countup'
import PropTypes from 'prop-types'

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

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
        fontSize: '1.100rem',
        fontWeight: '700',
        ...sx
      }}
      {...other}
    />
  )
}
Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
}

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='bxs:circle' fontSize='0.6rem' />
                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const ReceivedPaymentChart = ({ direction }: Props, props: CardStatsHorizontalProps) => {

  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const dispatch = useDispatch()
  const [dropDownValue, setDropDownValue] = useState<any>(2023)
  const [showData, setShowData] = useState<any>([])
  const [totalReceivedPayment, setTotalReceivedPayment] = useState(0)
  const [yearReceivedAmount, setYearReceivedAmount] = useState(0);
  const [currentPayment, setCurrentPayment] = useState([
    { month: 'Jan.', Received_Payment: 0 },
    { month: 'Feb.', Received_Payment: 0 },
    { month: 'Mar.', Received_Payment: 0 },
    { month: 'Apr.', Received_Payment: 0 },
    { month: 'May.', Received_Payment: 0 },
    { month: 'Jun.', Received_Payment: 0 },
    { month: 'Jul.', Received_Payment: 0 },
    { month: 'Aug.', Received_Payment: 0 },
    { month: 'Sep.', Received_Payment: 0 },
    { month: 'Oct.', Received_Payment: 0 },
    { month: 'Nov.', Received_Payment: 0 },
    { month: 'Dec.', Received_Payment: 0 }
  ])
  const [touched, setTouched] = useState<any>(false)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const date = new Date();
    setDropDownValue(date.getFullYear());
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    const date = new Date()
    if (user) {
      let Received_Pay1 = 0
      dispatch(
        receivedPaymentApi({
          customerId: user.customerId,
          organizationId: user.organizationId
        })
      ).then((res: any) => {
        setShowData(res.payload.data)
        let amount = 0
        res?.payload.data?.map((payments: any, index: any) => {
          console.log(payments, '162')
          const date1 = new Date(payments.paymetReceiveDate)
          const month = Number(payments.paymetReceiveDate?.split("-")[1])
          const year = Number(payments.paymetReceiveDate?.split("-")[2])
          amount += year == date.getFullYear() ? Number(payments?.receivedPayment) : 0
          if (year == dropDownValue) {

            currentPayment[month - 1].Received_Payment += parseInt(payments?.receivedPayment)
          }

          Received_Pay1 += parseInt(payments.receivedPayment) ? parseInt(payments.receivedPayment) : 0;
        })
        setYearReceivedAmount(amount)
        setCurrentPayment(currentPayment)
        setTotalReceivedPayment(Received_Pay1)
      })
    }
  }, [user])

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

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

  useEffect(() => {
    if (showData) {
      const data = [
        { month: 'Jan.', Received_Payment: 0 },
        { month: 'Feb.', Received_Payment: 0 },
        { month: 'Mar.', Received_Payment: 0 },
        { month: 'Apr.', Received_Payment: 0 },
        { month: 'May.', Received_Payment: 0 },
        { month: 'Jun.', Received_Payment: 0 },
        { month: 'Jul.', Received_Payment: 0 },
        { month: 'Aug.', Received_Payment: 0 },
        { month: 'Sep.', Received_Payment: 0 },
        { month: 'Oct.', Received_Payment: 0 },
        { month: 'Nov.', Received_Payment: 0 },
        { month: 'Dec.', Received_Payment: 0 }
      ]
      let amount = 0
      showData?.map((val: any, index: number) => {
        console.log(Number(val.paymetReceiveDate.split("-")[2]), 'this is val')
        if (dropDownValue == Number(val.paymetReceiveDate.split("-")[2])) {
          data[Number(val.paymetReceiveDate.split("-")[1]) - 1].Received_Payment += Number(val.receivedPayment)
          amount += Number(val.receivedPayment)
        }
      })
      setYearReceivedAmount(amount)
      setCurrentPayment(data)
    }
  }, [dropDownValue])

  return (

    <Card sx={{ mt: 6 }} id='receivedPayment' >
      <CardHeader
        title='Received payment'
        action={
          <FormControl>
            <InputLabel id='demo-customized-select-label'>Year</InputLabel>
            <Select
              value={dropDownValue}
              onChange={(e) => {
                setDropDownValue(e.target.value);
                setTouched(true)
              }}
              sx={{ height: '5vh', width: '16vh' }}
              id='demo-customized-select'
              labelId='demo-customized-select-label'
              input={<OutlinedInput label='Month' />}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2017}>2017</MenuItem>
              <MenuItem value={2016}>2016</MenuItem>
              <MenuItem value={2015}>2015</MenuItem>
              <MenuItem value={2014}>2014</MenuItem>
              <MenuItem value={2013}>2013</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#00FFFF ' } }}>
            <Icon icon='bxs:circle' fontSize='0.75rem' />
            <Item>
              <label>Received payment : <span style={{ color: '#00FFFF', marginLeft: '8px' }}>&#8377;</span></label>
              <CountUp
                style={{ color: '#00FFFF' }}
                start={0.01}
                end={totalReceivedPayment}
                duration={2}
                useEasing={true}
                separator=','
              />
            </Item>
            {
              touched && <Item>
                <label>{dropDownValue} received payment : <span style={{ color: '#00FFFF', marginLeft: '8px' }}>&#8377;</span></label>
                <CountUp
                  style={{ color: '#00FFFF' }}
                  start={0.01}
                  end={yearReceivedAmount}
                  duration={2}
                  useEasing={true}
                  separator=','
                />
              </Item>
            }

          </Box>
        </Box>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer>
            <BarChart height={350} data={currentPayment} barSize={15} style={{ direction }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />

              <Bar dataKey='Received_Payment' stackId='a' fill='#00FFFF' radius={[15, 15, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>

  )
}

export default ReceivedPaymentChart
