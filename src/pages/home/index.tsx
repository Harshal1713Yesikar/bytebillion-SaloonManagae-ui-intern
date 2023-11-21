import { Ref, useState, useRef, forwardRef, ReactElement, MouseEvent, Fragment, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { useMsal } from '@azure/msal-react'
import { GridCloseIcon } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent'
import { getAllStudentCount } from 'src/store/APIs/Api'
import { useSettings } from 'src/@core/hooks/useSettings'
import CounterBox from '../dashboards/analytics/CounterBox'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import CrmTable from '../dashboards/analytics/DuePaymentTable'
import { Fade, FadeProps, Icon, IconButton } from '@mui/material'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DuePaymentTable from '../dashboards/analytics/DuePaymentTable'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ComperisionChart from '../dashboards/analytics/ComperisionChart'
import ExpensesListChart from '../dashboards/analytics/ExpensesListChart'
import OverDuePaymentChart from '../dashboards/analytics/OverDuePaymentChart'
import OverDuePaymentTable from '../dashboards/analytics/OverDuePaymentTable'
import ReceivedPaymentChart from '../dashboards/analytics/ReceivedPaymentChart'
import AnalyticsTotalRevenue from '../dashboards/analytics/AnalyticsTotalRevenue'
import EmployeeInHandChart from '../dashboards/analytics/EmployeeInHandSalaryChart'
import AnalyticsTabsWithChart from '../dashboards/analytics/AnalyticsTabsWithChart'
import LastDaysReceivedPayment from '../dashboards/analytics/lastDaysReceivedPayment'


const RechartsBarChart = dynamic(() => import('src/pages/dashboards/analytics/DuePaymentChart'), { ssr: false })


const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})



const DashboardLayout = () => {

  const { settings } = useSettings()
  const [show, setShow] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expand, setExpand] = useState<any>(false)
  const { instance } = useMsal()

  const [user, setUser] = useState<any>()
  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (permission) {
      if (permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read"))) {
        setShow(false)
      }

    }
  }, [])


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

  }, [])

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  useEffect(() => {
    setTimeout(() => {
      // validationCall()
    }, 3000);
  }, [])

  const validationCall = () => {

    const organizationDetail = localStorage.getItem('organization');
    const userDetails = localStorage.getItem('userDetails')


    if (organizationDetail && userDetails) {
      if (JSON.parse(organizationDetail).customerId == JSON.parse(userDetails).payload.customerId) {
      }
      else {
        instance.logoutRedirect();
        localStorage.clear();
      }
    }
    else {
      instance.logoutRedirect();
      localStorage.clear();
    }

  }

  return (
    <>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <CloseIcon />
          </IconButton>
          <OverDuePaymentTable />
        </DialogContent>
      </Dialog>
      <RechartsWrapper>

        <DatePickerWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={16} >
              <CounterBox direction={settings.direction} />
            </Grid>
          </Grid>

        </DatePickerWrapper>

        <DatePickerWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12} >
              <RechartsBarChart direction={settings.direction} />
            </Grid>
            <Grid item xs={12} md={!expand ? 6 : 12} mt={6} >
              <OverDuePaymentChart expand={expand} setExpand={setExpand} />
            </Grid>
            <Grid item xs={12} md={6}  >
              <ReceivedPaymentChart direction={settings.direction} />
            </Grid>
            {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) &&

              <Grid item xs={12} md={6} mt={6} >
                <CrmTable />
              </Grid>}
            <Grid item xs={12} md={6} >
              <EmployeeInHandChart direction={settings.direction} />
            </Grid>
            {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) &&

              <Grid item xs={12} md={6} mt={6} >

                <LastDaysReceivedPayment />
              </Grid>}
            <Grid item xs={12} md={6} >
              <ComperisionChart direction={settings.direction} />
            </Grid>

            {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) &&

              <Grid item xs={12} md={6} mt={6} >
                <OverDuePaymentTable />
              </Grid>}
            <Grid item xs={12} md={6} >
              <ExpensesListChart direction={settings.direction} />
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </RechartsWrapper>
    </>
  )
}

export default DashboardLayout
