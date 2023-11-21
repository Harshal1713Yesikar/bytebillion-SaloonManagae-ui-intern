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
import CustomAvatar from 'src/@core/components/mui/avatar'
import { chartApiData } from 'src/store/APIs/Api'
import CountUp from "react-countup"
import { TotalExpenses } from 'src/store/APIs/Api'
import PropTypes from "prop-types";
import OutlinedInput from '@mui/material/OutlinedInput'
import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material";
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { EmployeeInHandSalary } from 'src/store/APIs/Api'
import { ExpensesList } from 'src/store/APIs/Api'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { json } from 'stream/consumers'
import { number } from 'yup'

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

function Item(props: any) {
  const { sx, ...other } = props;

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
  );
}


Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};





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

const ExpensesListChart = ({ direction }: Props, props: CardStatsHorizontalProps) => {

  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [showData, setShowData] = useState<any>([])
  const [totalExpensesData, SetTotalExpensesData] = useState<any>(0)
  const dispatch = useDispatch()
  const [touched, setTouched] = useState(false)
  const [OutStanding, setOutStanding] = useState("");
  const [monthData, setMonthData] = useState<any>({})
  const [chartData, setChartData] = useState<any>([
    { month: "Jan", OutStanding: 0, },
    { month: "Feb", OutStanding: 0 },
    { month: "Mar", OutStanding: 0 },
    { month: "Apr", OutStanding: 0 },
    { month: "May", OutStanding: 0 },
    { month: "Jun", OutStanding: 0 },
    { month: "Jul", OutStanding: 0 },
    { month: "Aug", OutStanding: 0 },
    { month: "Sep", OutStanding: 0 },
    { month: "Oct", OutStanding: 0 },
    { month: "Nov", OutStanding: 0 },
    { month: "Dec", OutStanding: 0 },
  ])
  const date = new Date();
  const [yearlyExpense, setYearlyExpense] = useState<any>(0)
  const [dropDownValue, setDropDownValue] = useState<any>(date.getFullYear())
  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setCustomerId(JSON.parse(userDetails).customerId);
      setOrganizationId(JSON.parse(userDetails).organizationId);
      chartDataCall();
    }
  }, [])


  useEffect(() => {
    chartDataCall();
  }, [organizationId, customerId])

  const chartDataCall = () => {
    let dataInfo = 0

    TotalExpenses(
      customerId,
      organizationId
    ).then(res => {
      SetTotalExpensesData(parseInt(res?.data?.totalExpenses))
    })
      .catch((err) => {
        return err;
      })
    ExpensesList(
      customerId,
      organizationId
    ).then(res => {
      setShowData(res.data)
      const date = new Date();

      res.data.map((payments: any, index: any) => {
        dataInfo = dataInfo + Number(payments.inventoryAmount);
        if (date.getFullYear() == Number(payments.dateCreated.split('/')[2])) {
          chartData[parseInt(payments.dateCreated.split('/')[1]) - 1].OutStanding += parseInt(payments.inventoryAmount);
        }
      })
      SetTotalExpensesData(dataInfo)

    }).catch((err) => {
      console.log(err)
    }
    )

  }


  useEffect(() => {
    if (showData) {
      const data = [
        { month: "Jan", OutStanding: 0, },
        { month: "Feb", OutStanding: 0 },
        { month: "Mar", OutStanding: 0 },
        { month: "Apr", OutStanding: 0 },
        { month: "May", OutStanding: 0 },
        { month: "Jun", OutStanding: 0 },
        { month: "Jul", OutStanding: 0 },
        { month: "Aug", OutStanding: 0 },
        { month: "Sep", OutStanding: 0 },
        { month: "Oct", OutStanding: 0 },
        { month: "Nov", OutStanding: 0 },
        { month: "Dec", OutStanding: 0 },
      ]
      let amount = 0;
      showData?.map((val: any, e: number) => {
        if (Number(val.dateCreated.split("/")[2]) == dropDownValue) {
          data[Number(val.dateCreated.split("/")[1]) - 1].OutStanding += Number(val.inventoryAmount)
          amount += Number(val.inventoryAmount)
        }
      })
      setYearlyExpense(amount)
      setChartData(data)
    }
  }, [dropDownValue])

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', }}>
        <div>
          <Grid item xs={12} md={15} mb={6}  >
          </Grid>
        </div>
      </div >
      <Card>
        <CardHeader
          title='Expenses'
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <FormControl>
              <InputLabel id='demo-customized-select-label'>Year</InputLabel>
              <Select
                value={dropDownValue}
                onChange={(e) => {
                  setDropDownValue(e.target.value)
                  setTouched(true)
                }}
                sx={{ height: '5vh', width: '16vh' }}
                id='demo-customized-select'
                labelId='demo-customized-select-label'
                input={<OutlinedInput label='Year' />}
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
          <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: '#FFA500 ' } }}>
              <Icon icon='bxs:circle' fontSize='0.75rem' />
              <Item>
                <label>Total expenses : <span style={{ color: '#FFA500', marginLeft: '8px' }}>&#8377;</span></label>
                <CountUp
                  style={{ color: "#FFA500" }}
                  start={0.01}
                  end={totalExpensesData}
                  duration={2}
                  useEasing={true}
                  separator=","
                />
              </Item>
              {
                touched && <Item>
                  <label>{dropDownValue} Expenses : <span style={{ color: '#FFA500', marginLeft: '8px' }}>&#8377;</span></label>
                  <CountUp
                    style={{ color: "#FFA500" }}
                    start={0.01}
                    end={yearlyExpense}
                    duration={2}
                    useEasing={true}
                    separator=","
                  />
                </Item>
              }
            </Box>
          </Box>
          <Box sx={{ height: 425 }}>
            <ResponsiveContainer>
              <BarChart height={370} data={chartData} barSize={15} style={{ direction }} >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' reversed={direction === 'rtl'} />
                <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey='OutStanding' stackId='a' fill='#FFA500' radius={[15, 15, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ExpensesListChart
