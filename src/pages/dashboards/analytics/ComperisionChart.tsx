import React from 'react'
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
import { ExpensesList, chartApiData } from 'src/store/APIs/Api'
import { receivedPaymentApi } from 'src/store/APIs/Api'
import { FormControl, InputLabel, Select, Grid, MenuItem } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { EmployeeInHandSalary } from 'src/store/APIs/Api'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { PieChart, Pie, Sector, Cell } from "recharts";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import CountUp from 'react-countup'
import PropTypes from 'prop-types'
import { inherits } from 'util'



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
        fontSize: '1.10rem',
        fontWeight: '1000',
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

const ComperisionChart = ({ direction }: Props, props: CardStatsHorizontalProps) => {

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

  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const dispatch = useDispatch()
  const [inHandSalary, setInHandSalary] = useState(0);

  const [value, setValue] = useState<string>('income')

  // Received Payment
  const [totalReceivedPayment, setTotalReceivedPayment] = useState(0)
  const [currentPayment, setCurrentPayment] = useState([
    { month: 'Jan.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Feb.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Mar.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Apr.', Received_Payment: 0, OutStanding: 0 },
    { month: 'May.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Jun.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Jul.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Aug.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Sep.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Oct.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Nov.', Received_Payment: 0, OutStanding: 0 },
    { month: 'Dec.', Received_Payment: 0, OutStanding: 0 }
  ])
  const [data, setData] = useState<any>([
    { name: "Total Received", value: 0 },
    { name: "Employee Salary", value: 0 },
    { name: "Expenditure", value: 0 }
  ])
  const [showData, setShowData] = useState()
  const [employeeSalary, setEmployeeSalary] = useState<any>()
  const [totalEaringPay, setTotalEaringPay] = useState<any>()

  const [user, setUser] = useState<any>()

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        let Received_Pay1 = 0
        let outstanding = 0
        dispatch(
          receivedPaymentApi({
            customerId: user.customerId,
            organizationId: user.organizationId
          })
        ).then((res: any) => {
          res?.payload.data?.map((payments: any, index: any) => {

            const month = Number(payments.paymetReceiveDate?.split("-")[1]);
            currentPayment[month - 1].Received_Payment += Number(payments.receivedPayment ? payments.receivedPayment : 0)
            Received_Pay1 += Number(payments.receivedPayment ? payments.receivedPayment : 0)
            setData([...data, data[0].value += Number(payments.receivedPayment)])
          })
          setCurrentPayment(currentPayment)
          setTotalReceivedPayment(Received_Pay1)
        })


        dispatch(
          EmployeeInHandSalary({
            customerId: user.customerId,
            organizationId: user.organizationId,
          })
        ).then((res: any) => {
          setShowData(res.payload.data)
          res?.payload.data?.map((payments: any, index: any) => {

            const month = Number(payments.salaryDate.split("-")[1]);
            outstanding += parseInt(payments.inhandSalary);
            currentPayment[month - 1].OutStanding += parseInt(payments.inhandSalary);

          });
          setData([...data, data[1].value += outstanding])
          setInHandSalary(outstanding)
        }).catch((err: any) => {
          console.log(err)
        })
        let inventoryMoney = 0;
        ExpensesList(
          user.customerId,
          user.organizationId,
        ).then((res: any) => {
          res.data.map((value: any, index: number) => {
            inventoryMoney += parseInt(value.inventoryAmount)
            currentPayment[Number(value.dateCreated.split("/")[1]) - 1].OutStanding += parseInt(value.inventoryAmount)

            setData([...data, data[2].value += parseInt(value.inventoryAmount)])
          })
          const money = inHandSalary + inventoryMoney;
          setInHandSalary(outstanding)

        }).catch((err) => {
          return err
        })
        const TotalEarning = Number(data[0].value) - (Number(data[1].value) + Number(data[2].value))

        setTotalEaringPay(TotalEarning)


      }
    }, 1000);

  }, [user])



  useEffect(() => {
    const TotalEarning = totalReceivedPayment - inHandSalary
    setTotalEaringPay(TotalEarning)
  }, [inHandSalary, totalReceivedPayment])

  const COLORS = ["#00FF7F", "#0088FE", "#FFBB28"];

  return (
    <>
      <Card sx={{ mt: 6, height: 610 }}>
        <CardHeader title=' Total insights'>

        </CardHeader>
        <CardContent>
          <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#00FF7F ', } }}>
              <Icon icon='bxs:circle' fontSize='0.75rem' />
              {/* <Typography variant='body2'>Received Payment</Typography> */}
              <Item>
                <label>Total earning : <span style={{ color: '#00FF7F', marginLeft: '8px' }}> &#8377;</span></label>
                <CountUp
                  style={{ color: '#00FF7F' }}
                  start={0.01}
                  end={Number(data[0].value) - (Number(data[1].value) + Number(data[2].value))}
                  duration={3}
                  useEasing={true}
                  separator=','
                />
              </Item>
              <Icon icon='bxs:circle' color='#0088FE' fontSize='0.75rem' style={{ marginLeft: "30px" }} />
              <Item>
                <label>Over all expenditure : <span style={{ color: '#0088FE', marginLeft: "px" }}>&#8377;</span></label>
                <CountUp
                  style={{ color: '#0088FE' }}
                  start={0.01}
                  end={(Number(data[1].value) + Number(data[2].value))}
                  duration={3}
                  useEasing={true}
                  separator=','
                />
              </Item>
            </Box>
          </Box>
          <Box sx={{ height: 350 }}>

            <ResponsiveContainer className="Pie" >
              <div style={{ background: 'transparent' }} >
                <PieChart width={500} height={400} >

                  <Pie
                    data={data}
                    cx={240}
                    cy={200}
                    innerRadius={100}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"

                    label
                  >
                    {data.map((entry: any, index: number) => (
                      <Cell radius={15} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                </PieChart>
              </div>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}




export default ComperisionChart



{/* <ResponsiveContainer>
              <BarChart height={350} data={currentPayment} barSize={15} style={{ direction }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' reversed={direction === 'rtl'} />
                <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                <Tooltip content={CustomTooltip} />

                <Bar dataKey='Received_Payment' stackId='a' fill='#00FFFF ' />
                <Bar dataKey='OutStanding' stackId='a' fill='Orange' radius={[15, 15, 0, 0]} />
              </BarChart>
            </ResponsiveContainer> */}
