// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'
import { chartApiData } from 'src/store/APIs/Api'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useDispatch } from 'react-redux'
import { string } from 'yup'
import { log } from 'console'
import { TupleKeys } from 'react-hook-form/dist/types/path/common'

interface DataType {
  stats: string
  title: string
  avatarSrc: string
  difference: number
  trendNumber: number
  progressValue: number
  trend?: 'positive' | 'negative'
  series: { name: string; data: any[] }[]

}

// Styled TabList component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  minHeight: 40,
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTab-root': {
    minHeight: 40,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  }
}))

const AnalyticsTabsWithChart: any = () => {
  const [showData, setShowData] = useState()
  const [totalDuePayment, setTotalDuePayment] = useState(0);
  const [OutStanding, setOutStanding] = useState("");
  const [monthData, setMonthData] = useState<any>({})
  const [chartData, setChartData] = useState([]);
  const [value, setValue] = useState<string>('income')
  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')

  //Hooks
  const dispatch = useDispatch()
  const theme = useTheme()

  const Months: any = [
    { month: "Jan", OutStanding: 0 },
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
  ];

  useEffect(() => {
    const customerInfo = localStorage.getItem('organization');
    if (customerInfo) {
      setCustomerId(JSON.parse(customerInfo).customerId);
      setOrganizationId(JSON.parse(customerInfo).organizationId);
    }
  }, [])

  const ChartDataApis = (() => {


    let dataInfo = 0;
    dispatch(
      chartApiData({
        customerId: customerId,
        organizationId: organizationId
      })
    ).then((res: any) => {
      setShowData(res.payload.data)

      res?.payload.data?.map((payments: any, index: any) => {
        const date: any = new Date(payments.nextpaymetDate);
        const month = date.getMonth() + 1;

        dataInfo = dataInfo + payments.duePayment;

        Months[month].OutStanding = payments.duePayment;
      });

    }).catch((err: any) => {
      console.log(err)
    })

    setChartData(Months);

  })

  useEffect(() => {
    ChartDataApis()
  }, [])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  // chart Data
  const series = [{ data: [24, 21, 30, 22, 42, 26, 35, 29] }]



  // income Expenses and Profit logic
  const data: { [key: string]: DataType } = {
    income: {
      difference: 39,
      title: 'DuePayment',
      stats: '345k',
      trendNumber: 42.9,
      progressValue: 6.5,
      avatarSrc: '/images/cards/wallet-with-bg.png',
      series: [{ name: 'Income', data: [24, 21, 30, 22, 42, 26, 35, 29] }]
    },
    expenses: {
      difference: 16,
      stats: '$316.5k',
      title: 'Expenses',
      trend: 'negative',
      trendNumber: 27.8,
      progressValue: 7.2,
      avatarSrc: '/images/cards/paypal.png',
      series: [{ name: 'Expenses', data: [24, 21, 30, 22, 42, 26, 35, 29] }]
    },
    profit: {
      difference: 28,
      title: 'Profit',
      stats: '$147.9k',
      trendNumber: 35.1,
      progressValue: 4.2,
      avatarSrc: '/images/cards/chart.png',
      series: [{ name: 'Profit', data: [24, 21, 30, 22, 42, 26, 35, 29] }]
    }
  }

  const options: ApexOptions = {

    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor: theme.palette.divider,
      padding: {
        left: 0,
        top: -18,
        right: 11,
        bottom: 7
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.25,
        opacityFrom: 0.5,
        stops: [0, 95, 100],
        shadeIntensity: 0.6,
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.4,
              color: theme.palette.primary.main
            },
            {
              offset: 100,
              opacity: 0.2,
              color: theme.palette.background.paper
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.primary.main
      }
    },
    xaxis: {

      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshairs: {
        stroke: { color: `rgba(${theme.palette.customColors.main}, 0.2)` }
      },
      labels: {
        style: {
          fontSize: '13px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      hover: { size: 8 },
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 8,
          seriesIndex: 0,
          fillColor: theme.palette.common.white,
          strokeColor: theme.palette.primary.main,
          dataPointIndex: series[0].data.length - 1
        }
      ]
    }
  }

  return (
    <Card>
      <TabContext value={value}>
        <CardContent sx={{ p: `${theme.spacing(5)} !important`, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange} aria-label='tab widget card'>
            <Tab value='income' label='Income' />
            <Tab value='expenses' label='Expenses' />
            <Tab value='profit' label='Profit' />
          </TabList>
        </CardContent>
        <TabPanel value={value} sx={{ border: 0, boxShadow: 0, p: '0 !important', backgroundColor: 'transparent' }}>
          <ReactApexcharts type='area' height={222} options={options} series={series} />
          <Box sx={{ p: 5, pt: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ mr: 4, position: 'relative' }}>
              <CircularProgress
                size={50}
                value={100}
                thickness={2}
                variant='determinate'
                sx={{
                  position: 'absolute',
                  color: 'customColors.trackBg',
                  '& .MuiCircularProgress-circle': { strokeWidth: 2 }
                }}
              />
              <CircularProgress
                size={50}
                thickness={4}
                color='primary'
                variant='determinate'
                value={data[value].progressValue * 10}
                sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
              />
              <Box sx={{ mt: -1, top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {`${data[value].progressValue}k`}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`${data[value].title} this week`}</Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                {`$${data[value].difference}k less than last week`}
              </Typography>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AnalyticsTabsWithChart
