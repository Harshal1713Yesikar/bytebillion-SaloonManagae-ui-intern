import React from 'react'
import CountUp from "react-countup"
import { useRouter } from 'next/router';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PropTypes from "prop-types";
import Box from '@mui/material/Box'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import { chartApiData, getAllEmployeeCount, getAllStudentCount, receivedPaymentApi } from 'src/store/APIs/Api';
import Link from 'next/link'






interface Props {
  direction: 'ltr' | 'rtl'
}

function Item(props: any) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        p: 2,
        m: 1,

        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.300",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
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
const CounterBox = ({ direction }: any, props: CardStatsHorizontalProps) => {
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



  const router = useRouter()
  const [studentCount, setStudentCount] = useState<any>();
  const [user, setUser] = useState<any>()
  const [employeeCount, setEmployeeCount] = useState<any>()
  const [upcomingPayment, setUpcomingPayment] = useState(0)
  const [receivedPayment, setReceivedPayment] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {

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
          organizationId: user.organizationId,
        })
      )
        .then((res: any) => {
          setEmployeeCount(res.payload.data.totalEmployees.employeeDataCount);
        })
        .catch((err: any) => console.log(err, "error"));

      dispatch(
        chartApiData({
          customerId: user.customerId,
          organizationId: user.organizationId
        })
      )
        .then((res: any) => {
          let amount = 0
          res?.payload?.data?.map((e: any, index: number) => {
            amount += Number(e.duePayment)
          })
          setUpcomingPayment(amount)
        })

      dispatch(
        receivedPaymentApi({
          customerId: user.customerId,
          organizationId: user.organizationId
        })).then((res: any) => {
          let amount = 0
          res?.payload?.data?.map((e: any, index: number) => {
            amount += Number(e.receivedPayment)
          })
          setReceivedPayment(amount)
        }).catch((err: any) => console.log(err))

      dispatch(
        getAllStudentCount({
          customerId: user.customerId,
          organizationId: user.organizationId,
        })
      )
        .then((res: any) => {
          setStudentCount(res.payload.data.totalStudents.studentDataCount);
        })
        .catch((err: any) => console.log(err, "error"));
    }
  }, [user])

  return (
    <>

      <Box className='newCard' >
        <Card className='card'>
          <Box className='innerCard'>
            <Box >
              <Typography fontWeight={'70px'} color='success'>Total Students</Typography>
              <CardContent>
                <Typography>
                  <Item>
                    <label style={{ padding: '10px' }}>Student :</label>
                    <CountUp
                      className="account-balance"
                      start={0.01}
                      end={studentCount}
                      duration={2}
                      useEasing={true}
                      separator=","
                    />
                  </Item>
                </Typography>
              </CardContent>

            </Box>
            <CustomAvatar onClick={() => router.push('/student/studentAdmission/')} skin='light' variant='rounded' color={'primary'} sx={{ width: 42, height: 42, cursor: 'pointer' }}>
              <Icon icon={avatarIcon} {...avatarIconProps} />
              <PersonAddAltIcon />
            </CustomAvatar>
          </Box >
        </Card>
        <Card className='card'>
          <Box className='innerCard'>
            <Box>
              <Typography fontWeight={'70px'} color='success'> Total Employee</Typography>
              <CardContent>
                <Typography>
                  <Item >
                    <label style={{ padding: '10px' }}>Employee :</label>
                    <CountUp
                      className="account-balance"
                      start={0.01}
                      end={employeeCount}
                      duration={2}
                      useEasing={false}
                      separator=","
                    />
                  </Item>
                </Typography>
              </CardContent>
            </Box>
            <CustomAvatar onClick={() => { router.push('/employee/employeeRegistration/') }} skin='light' variant='rounded' color={'primary'} sx={{ cursor: 'pointer' }}>
              <PersonAddAltIcon />
            </CustomAvatar>
          </Box>
        </Card>
        <Card className='card'>
          <Box className='innerCard'>
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontWeight={'70px'} color='success'>Upcoming Payment</Typography>
              <CardContent>
                <Typography sx={{ mb: 2, color: '#00FF00' }}>
                  <Item >
                    <label style={{ padding: '10px' }}>Amount :</label>
                    &#8377;
                    <CountUp
                      className="account-balance"
                      start={1}
                      end={upcomingPayment}
                      duration={2}
                      useEasing={true}
                      separator=","
                    />
                  </Item>
                </Typography>
              </CardContent>
            </Box>

          </Box>
        </Card >
        <Card className='card'>

          <Link href="#receivedPayment" style={{ textDecoration: 'none' }}>
            <Box className='innerCard'>
              <Box sx={{ textAlign: 'center' }}>

                <Typography fontWeight={'70px'} color='success'  >Received Payment</Typography>
                <CardContent>
                  <Typography sx={{ mb: 2, color: '#00FFFF' }}>
                    <Item >
                      <label style={{ padding: '10px' }}>Amount :</label>
                      &#8377;
                      <CountUp
                        className="account-balance"
                        start={1}
                        end={receivedPayment}
                        duration={2}
                        useEasing={true}
                        separator=","
                      />
                    </Item>
                  </Typography>
                </CardContent>

              </Box>

            </Box>
          </Link>

        </Card>
      </Box >

    </>
  )
}
export default CounterBox
