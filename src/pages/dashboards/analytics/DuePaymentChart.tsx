// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import InputAdornment from '@mui/material/InputAdornment'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { chartApiData } from 'src/store/APIs/Api'
import CountUp from 'react-countup'
import PropTypes from 'prop-types'
import OutlinedInput from '@mui/material/OutlinedInput'

import moment from 'moment'
import { receivedPaymentApi } from 'src/store/APIs/Api'
import { getAllStudentCount, getAllEmployeeCount } from 'src/store/APIs/Api'
import { FormControl, InputLabel, Select, Grid, MenuItem, TableCell, TableRow, Button } from '@mui/material'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { getDateRange } from 'src/@core/utils/get-daterange'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, LineChart, TooltipProps, Cell, Rectangle, Customized, Line, AreaChart } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { json } from 'stream/consumers'
import { FontLoaderManifestPlugin } from 'next/dist/build/webpack/plugins/font-loader-manifest-plugin'
import { ChartData } from 'src/store/APIs/dashboardReducer/chartApiReducer'

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
const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx="5" ry="5" />
  );
};

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">

        <p>{`${label}`}</p>
        <p>{`Outstanding: ${parseInt(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];



const RechartsBarChart = ({ direction }: Props, props: CardStatsHorizontalProps) => {
  const {
    title,
    stats,
    subtitle,
    avatarIcon,
    trendNumber,
    avatarIconProps,
    trend = 'positive',
    avatarColor = 'primary'
  } = props


  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [showData, setShowData] = useState<any>([])
  const [totalDuePayment, setTotalDuePayment] = useState(0)
  const dispatch = useDispatch()
  const [upcomingPaymentData, setUpcomingPaymentData] = useState<any>([])
  const [chartData, setChartData] = useState<any>([
    { month: 'Jan', OutStanding: 0, color: '#00FF7F' },
    { month: 'Feb', OutStanding: 0, color: '#00FF7F' },
    { month: 'Mar', OutStanding: 0, color: '#00FF7F' },
    { month: 'Apr', OutStanding: 0, color: '#00FF7F' },
    { month: 'May', OutStanding: 0, color: '#00FF7F' },
    { month: 'Jun', OutStanding: 0, color: '#00FF7F' },
    { month: 'Jul', OutStanding: 0, color: '#00FF7F' },
    { month: 'Aug', OutStanding: 0, color: '#00FF7F' },
    { month: 'Sep', OutStanding: 0, color: '#00FF7F' },
    { month: 'Oct', OutStanding: 0, color: '#00FF7F' },
    { month: 'Nov', OutStanding: 0, color: '#00FF7F' },
    { month: 'Dec', OutStanding: 0, color: '#00FF7F' }
  ])
  const [chartDataForYear, setChartDataForYear] = useState<any>([
    { month: 'Jan', OutStanding: 0, color: '#00FF7F' },
    { month: 'Feb', OutStanding: 0, color: '#00FF7F' },
    { month: 'Mar', OutStanding: 0, color: '#00FF7F' },
    { month: 'Apr', OutStanding: 0, color: '#00FF7F' },
    { month: 'May', OutStanding: 0, color: '#00FF7F' },
    { month: 'Jun', OutStanding: 0, color: '#00FF7F' },
    { month: 'Jul', OutStanding: 0, color: '#00FF7F' },
    { month: 'Aug', OutStanding: 0, color: '#00FF7F' },
    { month: 'Sep', OutStanding: 0, color: '#00FF7F' },
    { month: 'Oct', OutStanding: 0, color: '#00FF7F' },
    { month: 'Nov', OutStanding: 0, color: '#00FF7F' },
    { month: 'Dec', OutStanding: 0, color: '#00FF7F' }
  ])

  const [chartDataPerDay, setChartDataPerDay] = useState<any>([
    { month: '01', OutStanding: 0, color: '#00FF7F' },
    { month: '02', OutStanding: 0, color: '#00FF7F' },
    { month: '03', OutStanding: 0, color: '#00FF7F' },
    { month: '04', OutStanding: 0, color: '#00FF7F' },
    { month: '05', OutStanding: 0, color: '#00FF7F' },
    { month: '06', OutStanding: 0, color: '#00FF7F' },
    { month: '07', OutStanding: 0, color: '#00FF7F' },
    { month: '08', OutStanding: 0, color: '#00FF7F' },
    { month: '09', OutStanding: 0, color: '#00FF7F' },
    { month: '10', OutStanding: 0, color: '#00FF7F' },
    { month: '11', OutStanding: 0, color: '#00FF7F' },
    { month: '12', OutStanding: 0, color: '#00FF7F' },
    { month: '13', OutStanding: 0, color: '#00FF7F' },
    { month: '14', OutStanding: 0, color: '#00FF7F' },
    { month: '15', OutStanding: 0, color: '#00FF7F' },
    { month: '16', OutStanding: 0, color: '#00FF7F' },
    { month: '17', OutStanding: 0, color: '#00FF7F' },
    { month: '18', OutStanding: 0, color: '#00FF7F' },
    { month: '19', OutStanding: 0, color: '#00FF7F' },
    { month: '20', OutStanding: 0, color: '#00FF7F' },
    { month: '21', OutStanding: 0, color: '#00FF7F' },
    { month: '22', OutStanding: 0, color: '#00FF7F' },
    { month: '23', OutStanding: 0, color: '#00FF7F' },
    { month: '24', OutStanding: 0, color: '#00FF7F' },
    { month: '25', OutStanding: 0, color: '#00FF7F' },
    { month: '26', OutStanding: 0, color: '#00FF7F' },
    { month: '27', OutStanding: 0, color: '#00FF7F' },
    { month: '28', OutStanding: 0, color: '#00FF7F' },
    { month: '29', OutStanding: 0, color: '#00FF7F' },
    { month: '30', OutStanding: 0, color: '#00FF7F' },
    { month: '31', OutStanding: 0, color: '#00FF7F' },
  ])
  const [value, setValue] = useState<string>('income')
  const [currentMonth, setCurrentMonth] = useState(0)
  const [currentDate, setCurrentDate] = useState(0)
  const [studentCount, setStudentCount] = useState<any>()
  const [user, setUser] = useState<any>()
  const [employeeCount, setEmployeeCount] = useState<any>()
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [dropDownValue, setDropDownValue] = useState<any>(null)
  const date = new Date()
  const [yearDownValue, setYearDownValue] = useState<any>(date.getFullYear())
  const [yearUpcomingPayment, setYearUpcomingPayment] = useState<any>(0)
  const [monthUpcomingPayment, setMonthUpcomingPayment] = useState<any>(0)


  useEffect(() => {
    if (startDate && endDate) {
      getDateRange(startDate, endDate)
    }
  }, [startDate, endDate])


  useEffect(() => {
    const date = new Date;
    setCurrentDate(date.getDate());
    setCurrentMonth(date.getMonth());
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(
        getAllEmployeeCount({
          customerId: user.customerId,
          organizationId: user.organizationId
        })
      )
        .then((res: any) => {
          setEmployeeCount(res.payload.data.totalEmployees.employeeDataCount)
        })
        .catch((err: any) => { return err; })

      dispatch(
        getAllStudentCount({
          customerId: user.customerId,
          organizationId: user.organizationId
        })
      )
        .then((res: any) => {
          setStudentCount(res.payload.data.totalStudents.studentDataCount)
        })
        .catch((err: any) => { return err })

      chartDataCall();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (showData) {
      setDropDownValue(null)
      setChartDataForYear([
        { month: 'Jan', OutStanding: 0, color: '#00FF7F' },
        { month: 'Feb', OutStanding: 0, color: '#00FF7F' },
        { month: 'Mar', OutStanding: 0, color: '#00FF7F' },
        { month: 'Apr', OutStanding: 0, color: '#00FF7F' },
        { month: 'May', OutStanding: 0, color: '#00FF7F' },
        { month: 'Jun', OutStanding: 0, color: '#00FF7F' },
        { month: 'Jul', OutStanding: 0, color: '#00FF7F' },
        { month: 'Aug', OutStanding: 0, color: '#00FF7F' },
        { month: 'Sep', OutStanding: 0, color: '#00FF7F' },
        { month: 'Oct', OutStanding: 0, color: '#00FF7F' },
        { month: 'Nov', OutStanding: 0, color: '#00FF7F' },
        { month: 'Dec', OutStanding: 0, color: '#00FF7F' }
      ])
      let amount = 0
      showData.map((installment: any, index: number) => {
        const year = Number(installment.nextpaymetDate.split("-")[2])
        const month = Number(installment.nextpaymetDate.split("-")[1])
        if (year == yearDownValue) {
          amount += Number(installment.duePayment)
          chartDataForYear[month - 1].OutStanding += Number(installment.duePayment)
        }

      })
      setYearUpcomingPayment(amount)
      setTimeout(() => {
        setChartData(chartDataForYear)
      }, 1000);

    }
  }, [yearDownValue])

  const chartDataCall = () => {
    let dataInfo = 0
    setChartDataForYear([
      { month: 'Jan', OutStanding: 0, color: '#00FF7F' },
      { month: 'Feb', OutStanding: 0, color: '#00FF7F' },
      { month: 'Mar', OutStanding: 0, color: '#00FF7F' },
      { month: 'Apr', OutStanding: 0, color: '#00FF7F' },
      { month: 'May', OutStanding: 0, color: '#00FF7F' },
      { month: 'Jun', OutStanding: 0, color: '#00FF7F' },
      { month: 'Jul', OutStanding: 0, color: '#00FF7F' },
      { month: 'Aug', OutStanding: 0, color: '#00FF7F' },
      { month: 'Sep', OutStanding: 0, color: '#00FF7F' },
      { month: 'Oct', OutStanding: 0, color: '#00FF7F' },
      { month: 'Nov', OutStanding: 0, color: '#00FF7F' },
      { month: 'Dec', OutStanding: 0, color: '#00FF7F' }
    ])
    setDropDownValue(null)
    dispatch(
      chartApiData({
        customerId: user.customerId,
        organizationId: user.organizationId
      })
    )
      .then((res: any) => {
        setShowData(res.payload.data)

        let amount = 0
        res?.payload.data?.map((payments: any, index: any) => {
          const date = new Date();
          const date2 = Number(payments.nextpaymetDate.split("-")[0]);
          const month = Number(payments.nextpaymetDate.split("-")[1]);
          const year = Number(payments.nextpaymetDate.split("-")[2]);
          dataInfo = dataInfo + Number(payments.duePayment)
          setTotalDuePayment(dataInfo)
          if (date.getFullYear() == year) {
            amount += Number(payments.duePayment)
            if (Number(month) < (currentMonth + 1)) {
              chartDataForYear[month - 1].color = 'red';
            }
            chartDataForYear[month - 1].OutStanding += Number(payments.duePayment);
            setTimeout(() => {

              setChartData(chartDataForYear);
            }, 800);
          }
          setYearUpcomingPayment(amount)
        })
      })
      .catch((err: any) => {
        return err;
      })
  }

  useEffect(() => {
    if (dropDownValue) {
      setChartData([
        { month: 'Jan', OutStanding: 0, color: '#00FF7F' },
        { month: 'Feb', OutStanding: 0, color: '#00FF7F' },
        { month: 'Mar', OutStanding: 0, color: '#00FF7F' },
        { month: 'Apr', OutStanding: 0, color: '#00FF7F' },
        { month: 'May', OutStanding: 0, color: '#00FF7F' },
        { month: 'Jun', OutStanding: 0, color: '#00FF7F' },
        { month: 'Jul', OutStanding: 0, color: '#00FF7F' },
        { month: 'Aug', OutStanding: 0, color: '#00FF7F' },
        { month: 'Sep', OutStanding: 0, color: '#00FF7F' },
        { month: 'Oct', OutStanding: 0, color: '#00FF7F' },
        { month: 'Nov', OutStanding: 0, color: '#00FF7F' },
        { month: 'Dec', OutStanding: 0, color: '#00FF7F' }
      ])
      setChartDataPerDay([
        { month: '01', OutStanding: 0, color: '#00FF7F' },
        { month: '02', OutStanding: 0, color: '#00FF7F' },
        { month: '03', OutStanding: 0, color: '#00FF7F' },
        { month: '04', OutStanding: 0, color: '#00FF7F' },
        { month: '05', OutStanding: 0, color: '#00FF7F' },
        { month: '06', OutStanding: 0, color: '#00FF7F' },
        { month: '07', OutStanding: 0, color: '#00FF7F' },
        { month: '08', OutStanding: 0, color: '#00FF7F' },
        { month: '09', OutStanding: 0, color: '#00FF7F' },
        { month: '10', OutStanding: 0, color: '#00FF7F' },
        { month: '11', OutStanding: 0, color: '#00FF7F' },
        { month: '12', OutStanding: 0, color: '#00FF7F' },
        { month: '13', OutStanding: 0, color: '#00FF7F' },
        { month: '14', OutStanding: 0, color: '#00FF7F' },
        { month: '15', OutStanding: 0, color: '#00FF7F' },
        { month: '16', OutStanding: 0, color: '#00FF7F' },
        { month: '17', OutStanding: 0, color: '#00FF7F' },
        { month: '18', OutStanding: 0, color: '#00FF7F' },
        { month: '19', OutStanding: 0, color: '#00FF7F' },
        { month: '20', OutStanding: 0, color: '#00FF7F' },
        { month: '21', OutStanding: 0, color: '#00FF7F' },
        { month: '22', OutStanding: 0, color: '#00FF7F' },
        { month: '23', OutStanding: 0, color: '#00FF7F' },
        { month: '24', OutStanding: 0, color: '#00FF7F' },
        { month: '25', OutStanding: 0, color: '#00FF7F' },
        { month: '26', OutStanding: 0, color: '#00FF7F' },
        { month: '27', OutStanding: 0, color: '#00FF7F' },
        { month: '28', OutStanding: 0, color: '#00FF7F' },
        { month: '29', OutStanding: 0, color: '#00FF7F' },
        { month: '30', OutStanding: 0, color: '#00FF7F' },
        { month: '31', OutStanding: 0, color: '#00FF7F' },
      ])


      let x: any;
      let m: any;
      switch (dropDownValue) {
        case 1:
          x = 31;
          m = '01';
          break;
        case 2:
          const year = new Date().getFullYear();
          if (year % 4 == 0) {
            x = 29;
            m = '02';
          }
          else {
            x = 28;
            m = '02';
          }
          break;
        case 3:
          x = 31;
          m = '03';
          break;
        case 4:
          x = 30;
          m = '04';
          break;
        case 5:
          x = 31;
          m = '05';
          break;
        case 6:
          x = 30;
          m = '06';
          break;
        case 7:
          x = 31;
          m = '07'
          break;
        case 8:
          x = 31;
          m = '08'
          break;
        case 9:
          x = 30;
          m = '09';
          break;
        case 10:
          x = 31;
          m = '10';
          break;
        case 11:
          x = 30;
          m = '11';
          break;
        case 12:
          x = 31;
          m = '12';
          break;
        case 13:
          x = 0;
          break;
      }

      // const x: any = 31;


      if (x == 0) {
        chartDataCall();
      }
      else {
        dispatch(
          chartApiData({
            customerId: user.customerId,
            organizationId: user.organizationId
          })
        )
          .then((res: any) => {
            setShowData(res.payload.data)
            let total = 0;
            let amount = 0;
            const date = new Date();
            res?.payload?.data.map((payments: any, index: any) => {
              const date2 = Number(payments.nextpaymetDate.split('-')[0])
              const month = Number(payments.nextpaymetDate.split('-')[1])
              const year = Number(payments.nextpaymetDate.split('-')[2])
              if (year == yearDownValue) {
                if (month == dropDownValue) {
                  amount += Number(payments.duePayment)
                  chartDataPerDay[date2 - 1].OutStanding += Number(payments.duePayment)
                  total += Number(payments.duePayment)
                  if (Number(month) == (currentMonth + 1)) {
                    if (Number(date2) < (currentDate + 1)) {
                      chartDataPerDay[date2].color = 'red'
                    }
                  }
                  else if (Number(month) < (currentMonth + 1)) {
                    chartDataPerDay[date2].color = 'red'
                  }
                }
              }
            })
            setMonthUpcomingPayment(amount)
          })
          .catch((err: any) => {
            return err;
          })
        setTimeout(() => {
          setChartData(chartDataPerDay);
        }, 1000);


      }
    }
  }, [dropDownValue])



  return (
    <>

      <Card>

        <CardHeader
          title='Payment forcast'
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [3, 0] }
          }}
          action={
            <>

              <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10, flexWrap: 'nowrap' }} >
                <Grid sm={5} sx={{ marginRight: 2 }} >
                  <FormControl>
                    <InputLabel id='demo-customized-select-label'>Year</InputLabel>
                    <Select
                      value={yearDownValue}
                      sx={{ height: '5vh', width: '16vh' }}
                      onChange={(e) => {
                        setYearDownValue(e.target.value)
                      }}
                      id='demo-customized-select'
                      labelId='demo-customized-select-label'
                      input={<OutlinedInput label='Year' />}
                    >
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                      <MenuItem value={2026}>2026</MenuItem>
                      <MenuItem value={2027}>2027</MenuItem>
                      <MenuItem value={2028}>2028</MenuItem>
                      <MenuItem value={2029}>2029</MenuItem>
                      <MenuItem value={2030}>2030</MenuItem>
                      <MenuItem value={2031}>2031</MenuItem>
                      <MenuItem value={2032}>2032</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sm={1}>

                </Grid>
                <Grid sm={1}>
                  <FormControl>
                    <InputLabel style={{ marginTop: '-8px' }} id='demo-customized-select-label'>Month</InputLabel>
                    <Select
                      value={dropDownValue}
                      onChange={(e) => {
                        setDropDownValue(e.target.value)
                      }}
                      sx={{ height: '5vh', width: '16vh' }}
                      id='demo-customized-select'
                      labelId='demo-customized-select-label'
                      input={<OutlinedInput label='Month' />}
                    >
                      <MenuItem value={1}>January</MenuItem>
                      <MenuItem value={2}>February</MenuItem>
                      <MenuItem value={3}>March</MenuItem>
                      <MenuItem value={4}>April</MenuItem>
                      <MenuItem value={5}>May</MenuItem>
                      <MenuItem value={6}>June</MenuItem>
                      <MenuItem value={7}>July</MenuItem>
                      <MenuItem value={8}>August</MenuItem>
                      <MenuItem value={9}>September</MenuItem>
                      <MenuItem value={10}>October</MenuItem>
                      <MenuItem value={11}>November</MenuItem>
                      <MenuItem value={12}>December</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
            </>
          }
        />

        <CardContent>
          <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#00FF00 ' } }}>
              <Icon icon='bxs:circle' fontSize='0.75rem' />
              <Item>
                <label>Upcoming payment : <span style={{ color: '#00FF00', marginLeft: '8px' }}>&#8377;</span></label>
                <CountUp
                  style={{ color: '#00FF00', paddingTop: "10px" }}
                  start={0.01}
                  end={totalDuePayment}
                  duration={3}
                  useEasing={true}
                  separator=','
                />
              </Item>
            </Box>
            {
              yearDownValue ?
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#00FF00 ' } }}>
                  <Item>
                    <label>{yearDownValue} Upcoming payment : <span style={{ color: '#00FF00', marginLeft: '8px' }}>&#8377;</span></label>
                    <CountUp
                      style={{ color: '#00FF00', paddingTop: "10px" }}
                      start={0.01}
                      end={yearUpcomingPayment}
                      duration={3}
                      useEasing={true}
                      separator=','
                    />
                  </Item>
                </Box> : null
            }
            {
              dropDownValue ? <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#00FF00 ' } }}>
                <Item>
                  <label>{months[dropDownValue - 1]} upcoming payment : <span style={{ color: '#00FF00', marginLeft: '8px' }}>&#8377;</span></label>
                  <CountUp
                    style={{ color: '#00FF00', paddingTop: "10px" }}
                    start={0.01}
                    end={monthUpcomingPayment}
                    duration={3}
                    useEasing={true}
                    separator=','
                  />
                </Item>
              </Box> : null
            }

          </Box>
          <Box sx={{ height: 350 }}>
            <UpcomingAreaChart chartData={chartData} dropDownValue={dropDownValue} currentMonth={currentMonth} direction={direction} />
          </Box>
        </CardContent>
      </Card >
    </>
  )
}

export default RechartsBarChart


const UpcomingAreaChart = ({ chartData, dropDownValue, currentMonth, direction }: any) => {
  return (
    <ResponsiveContainer>
      <AreaChart width={730} height={250} data={chartData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF7F" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00FF7F" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip content={CustomTooltip} />
        <CartesianGrid strokeDasharray='3 3' />
        <YAxis />
        <XAxis dataKey='month' reversed={direction === 'rtl'} />
        {
          dropDownValue ?
            dropDownValue < (currentMonth + 1) ?
              <Area dataKey='OutStanding' stroke='#00FF7F' fillOpacity={1} fill="url(#colorUv)" />
              :
              <Area dataKey='OutStanding' stroke='#00FF7F' fillOpacity={1} fill="url(#colorUv)" />
            :
            currentMonth > parseInt(chartData.month)
              ? <Area dataKey='OutStanding' stroke='#00FF7F' fillOpacity={1} fill="url(#colorUv)" />
              :
              <Area dataKey='OutStanding' stroke='#00FF7F' fillOpacity={1} fill="url(#colorUv)" />
        }
        {/* <Area dataKey='OutStanding' stroke='#00FF7F' fillOpacity={1} fill="url(#colorUv)" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
