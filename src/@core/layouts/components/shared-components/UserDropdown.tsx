import { useState, SyntheticEvent, Fragment } from 'react'
import { useEffect } from 'react'

import Router from 'next/router'
import { useRouter } from 'next/router'
import { useMsal } from '@azure/msal-react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Confetti from 'react-confetti';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import { Skeleton } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import Table from '@mui/material/Table'
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Icon from 'src/@core/components/icon'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Settings } from 'src/@core/context/settingsContext'
import { birthdayReminder, getNotificationDetails, updateNotificationHub } from 'src/store/APIs/Api'
import { InputLabel, Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Collapse from '@mui/material/Collapse';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton'
import { use } from 'i18next'



interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: any) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchornotificationEl, setAnchornotificationEl] = useState<Element | null>(null)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [user, setUser] = useState<any>({})
  const [customer, setCustomer] = useState<any>({})

  const [openNotifiaction, setOpenNotification] = useState(false)
  const [isPartyBoom, setIsPartyBoom] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState<boolean>(false)
  const [birthdaysReminder, setBirthdaysReminder] = useState<any>({
    student: [],
    employee: []
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [todayBirthday, setTodayBirthday] = useState<boolean>(true)
  const [upcomingBirthday, setUpcomingBirthday] = useState<boolean>(true)
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(true)
  const [role, setRole] = useState<any>()
  const [notificationIcon, setNotificationIcon] = useState<any>()

  // ** Hooks
  const router = useRouter()

  const { instance } = useMsal()

  // ** Vars
  const { direction } = settings
  const [drop, setDrop] = useState(false);
  const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalNotification, setTotalNotification] = useState<number>(0)

  const [totalBirthdayNotification, setTotalBirthdayNotification] = useState<any>([])
  const [openPopup, setOpenPopup] = useState<any>()
  const [totalDueNotification, setTotalDueNotification] = useState<any>([])
  const [totalOverDueNotification, setTotalOverDueNotification] = useState<any>([])
  const [totalForecastNotification, setTotalForecastNotification] = useState<any>([])

  const orgDetails: any = localStorage.getItem('organization')
  const organizationValues = JSON.parse(orgDetails)
  const [studentCount, setStudentCount] = useState<number>(0)
  const [employeeCount, setEmployeeCount] = useState<number>(0)
  const [duePayment, setDuePayment] = useState<number>(0)
  const [overDuePayment, setOverDuePayment] = useState<number>(0)
  const [forecast, setForecast] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [notificationType, setNotificationType] = useState<any>()
  let [sCount, setSCount] = useState<any>(0)
  let [eCount, setECount] = useState<number>(0)
  let [due, setDue] = useState<any>(0)
  let [overDue, setOverDue] = useState<any>(0)
  let [fore, setFore] = useState<any>(0)


  const handleNotificationDropdownOpen = (event: SyntheticEvent) => {
    setAnchornotificationEl(event.currentTarget)
  }

  const handleNotificationDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchornotificationEl(null)
  }
  const handleCellClick = (row: any) => {

    router.push(`/student/studentDetails/${row}`)
    setOpenNotification(false)
    setPaymentPopup(false)
    setDrop(false)
  }
  const handleEmployeeClick = (row: any) => {

    router.push(`/employee/employeeSalary${row}`)
    setOpenNotification(false)
    setDrop(false)
  }
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  const toggleDrop = () => {
    if (drop == true) {
      setDrop(false);

    }
    else {
      setDrop(true);

    }

  };

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      setCustomer(JSON.parse(userDetails).payload)
    }
  }, [])

  useEffect(() => {
    const organization = localStorage.getItem('organization')

    if (organization) {
      setRole(JSON.parse(organization))

    }

  }, [])

  // useEffect(() => {
  //   birthdayApiCall();
  // }, [notificationIcon])

  useEffect(() => {

    if (totalBirthdayNotification?.student?.length == 0 && totalBirthdayNotification?.employee?.length == 0) {

      setTodayBirthday(true)
      setUpcomingBirthday(true)
    } else {
      if (totalBirthdayNotification?.student?.length >= 0 && totalBirthdayNotification?.employee?.length >= 0) {

        for (const singleObj of totalBirthdayNotification?.student) {
          if (singleObj?.studentDateOfBirth?.slice(0, 5) ==
            `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
          ) {
            setTodayBirthday(false)
          } else {
            setUpcomingBirthday(false)

          }
        }

        for (const singleObj of totalBirthdayNotification?.employee) {

          if (singleObj?.employeeDateOfBirth?.slice(0, 5) ==
            `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
          ) {
            setTodayBirthday(false)
          } else {
            setUpcomingBirthday(false)
          }
        }
      }

    }
  }, [totalBirthdayNotification])




  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.secondary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.25rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    router.push('/')
    instance.logoutRedirect()
    handleDropdownClose()
    localStorage.clear()
  }

  const birthdayReminderSkeleton = {
    "student": [
      {
        "studentFirstName": "abc",
        "studentLastName": "def",
        "rollNo": "ghi",
        "studentEnrollmentNumber": "jkl",
        "studentEmail": "sfhaj@gmail.com",
        "studentContact": "0784512054",
        "studentDateOfBirth": "15-09-2018",
        "studentStatus": "active",
        "type": "student"
      }
    ],
    "employee": [

      {
        "employeeFirstname": "abc",
        "employeeLastname": "def",
        "employeeId": "YO-01",
        "employeeEmail": "saf@gmail.com",
        "employeePhoneNumber": "7400862689",
        "employeeDateOfBirth": "14-09-2023",
        "employeeDesignation": "Team Lead",
        "type": "employee"
      }
    ]
  }

  const paymentReminderSkeleton = {
    "student": [
      {
        "studentFirstName": "abc",
        "studentLastName": "def",
        "rollNo": "ghi",
        "studentEnrollmentNumber": "jkl",
        "studentEmail": "sfhaj@gmail.com",
        "studentContact": "0784512054",
        "studentDateOfBirth": "15-09-2018",
        "studentStatus": "active",
        "type": "student"
      }
    ],
  }
  const overDueReminderSkeleton = {
    "student": [
      {
        "studentFirstName": "abc",
        "studentLastName": "def",
        "rollNo": "ghi",
        "studentEnrollmentNumber": "jkl",
        "studentEmail": "sfhaj@gmail.com",
        "studentContact": "0784512054",
        "studentDateOfBirth": "15-09-2018",
        "studentStatus": "active",
        "type": "student"
      }
    ],
  }

  useEffect(() => {
    if (user.customerId && user.organizationId) {
      notification();
    }
  }, [user])

  const [stateCheck, setStateCheck] = useState(false)


  const notification = async () => {
    try {
      const res = await getNotificationDetails(organizationValues.customerId, organizationValues.organizationId);
      if (res?.data?.data) {
        setTotalBirthdayNotification(res?.data?.data?.birthdays);
        setTotalDueNotification(res?.data.data.due);
        setTotalOverDueNotification(res?.data.data.overDue);
        setTotalForecastNotification(res?.data.data.upcomingForecast)
        setStateCheck(true)

        setIsLoading(false);
        setIsLoadingPayment(false);



      }
    }
    catch (error) {
      console.error(error);
      // setIsLoading(false);
      // setIsLoadingPayment(false);
    }
  }
  const groupDataDue = (data: any) => {
    return data?.reduce((acc: any, current: any) => {
      const existingEntryDue = acc.find((entry: any) => entry.studentEnrollmentNumber === current.studentEnrollmentNumber);

      if (existingEntryDue) {
        existingEntryDue.nextPaymentDates.push(current.nextpaymetDate);
        existingEntryDue.duePayments.push(current.duePayment);
      } else {
        acc.push({
          studentName: current.studentName,
          studentEnrollmentNumber: current.studentEnrollmentNumber,
          rollNo: current.rollNo,
          nextPaymentDates: [current.nextpaymetDate],
          duePayments: [current.duePayment],
          isClicked: current.isClicked
        });
      }

      return acc;
    }, []);
  };
  const groupedData: any = groupDataDue(totalDueNotification);
  const groupDataOverDue = (data: any) => {
    return data?.reduce((acc: any, current: any) => {
      const existingEntryOverDue = acc.find((entry: any) => entry.studentEnrollmentNumber === current.studentEnrollmentNumber);

      if (existingEntryOverDue) {
        existingEntryOverDue?.nextPaymentDates?.push(current.overDue);

      } else {
        acc.push({
          studentName: current.studentName,
          studentEnrollmentNumber: current.studentEnrollmentNumber,
          rollNo: current.rollNo,
          studentContact: current.studentContact,
          overDue: [current.overDue],
          isClicked: current.isClicked
        });
      }

      return acc;
    }, []);
  };
  const groupedDataOverDue: any = groupDataOverDue(totalOverDueNotification);
  const groupDataForecast = (data: any) => {
    return data?.reduce((acc: any, current: any) => {
      const existingEntryForecast = acc.find((entry: any) => entry.studentEnrollmentNumber === current.studentEnrollmentNumber);

      if (existingEntryForecast) {
        existingEntryForecast.nextPaymentDates.push(current.upcomingForecast);

      } else {
        acc.push({
          studentName: current.studentName,
          studentEnrollmentNumber: current.studentEnrollmentNumber,
          rollNo: current.rollNo,
          upcomingForecast: [current.upcomingForecast],

          isClicked: current.isClicked
        });
      }

      return acc;
    }, []);
  };
  const groupedDataForecast: any = groupDataForecast(totalForecastNotification);


  const updateNotification = (roll: any) => {


    if (openPopup === 'Birthdays') {
      const studentData = totalBirthdayNotification.student;
      if (typeof studentData === 'object' && studentData !== null) {
        for (const key in studentData) {
          if (studentData.hasOwnProperty(key) && studentData[key].rollNo === roll) {
            studentData[key].isClicked = true;
          }
        }
        setTotalBirthdayNotification({
          ...totalBirthdayNotification,
          student: studentData,
        });
      }
      const emplayeeData = totalBirthdayNotification.employee;
      if (typeof emplayeeData === 'object' && emplayeeData !== null) {
        for (const key in emplayeeData) {
          if (emplayeeData.hasOwnProperty(key) && emplayeeData[key].employeeId === roll) {

            emplayeeData[key].isClicked = true;
          }
        }
        setTotalBirthdayNotification({
          ...totalBirthdayNotification,
          employee: emplayeeData,
        });
      }

    }
    else if (openPopup == 'Due payment') {
      const dueNotificationData = totalDueNotification;
      if (typeof dueNotificationData === 'object' && dueNotificationData !== null) {
        for (const key in dueNotificationData) {
          if (dueNotificationData.hasOwnProperty(key) && dueNotificationData[key].rollNo === roll) {
            dueNotificationData[key].isClicked = true;
          }
        }
        setTotalDueNotification([
          ...dueNotificationData,
        ]);
      }
    }
    else if (openPopup == 'overDue payment') {
      const overdueNotificationData = totalOverDueNotification;
      if (typeof overdueNotificationData === 'object' && overdueNotificationData !== null) {
        for (const key in overdueNotificationData) {
          if (overdueNotificationData.hasOwnProperty(key) && overdueNotificationData[key].rollNo === roll) {
            overdueNotificationData[key].isClicked = true;
          }
        }
        setTotalOverDueNotification([

          ...overdueNotificationData,
        ]);
      }

    }
    else if (openPopup == 'days forecast') {
      const forecastNotificationData = totalForecastNotification;
      if (typeof forecastNotificationData === 'object' && forecastNotificationData !== null) {
        for (const key in forecastNotificationData) {
          if (forecastNotificationData.hasOwnProperty(key) && forecastNotificationData[key].rollNo === roll) {
            forecastNotificationData[key].isClicked = true;
          }
        }
        setTotalForecastNotification([

          ...forecastNotificationData,
        ]);
      }
    }

    updateNotificationHub(organizationValues.customerId, organizationValues.organizationId, totalBirthdayNotification, totalDueNotification, totalOverDueNotification, totalForecastNotification).then((res: any) => {
      console.log(res, "response")

    })
    clickedCount();
  }


  useEffect(() => {
    if (stateCheck) {
      clickedCount();
    }
  }, [stateCheck])

  const clickedCount = () => {

    if (isLoading == false) {
      const studentArray: any = totalBirthdayNotification?.student;
      let tempstudent = 0
      if (Array.isArray(studentArray)) {
        studentArray.forEach((student) => {
          if (student.isClicked === false) {
            tempstudent++;
          }

        });
        setStudentCount(tempstudent);
      }


      const employeeArray: any = totalBirthdayNotification?.employee;
      let tempEmp = 0
      if (Array.isArray(employeeArray)) {
        employeeArray.forEach((employee) => {
          if (employee.isClicked === false) {
            tempEmp++;
          }
        });
        setEmployeeCount(tempEmp)
      }

      const dueNotificationArray: any = totalDueNotification;
      let tempDue = 0
      if (Array.isArray(dueNotificationArray)) {
        dueNotificationArray.forEach((dueNotification) => {
          if (dueNotification.isClicked === false) {
            tempDue++;
          }

        });
        setDuePayment(tempDue)
      }


      const overdueNotificationArray: any = totalOverDueNotification;
      let tempOverDue = 0
      if (Array.isArray(overdueNotificationArray)) {
        overdueNotificationArray.forEach((overdueNotification) => {
          if (overdueNotification.isClicked === false) {
            tempOverDue++;

          }
        });
        setOverDuePayment(tempOverDue)
      }


      const forecastNotificationArray: any = totalForecastNotification;
      let forecasttemp = 0
      if (Array.isArray(forecastNotificationArray)) {
        forecastNotificationArray.forEach((forecastNotification) => {
          if (forecastNotification.isClicked === false) {
            forecasttemp++;

          }
        });
        setForecast(forecasttemp)
      }

    }
  }
  useEffect(() => {
    let total = employeeCount + studentCount + forecast + overDuePayment + duePayment
    setTotalNotification(total);
  }, [employeeCount, studentCount, forecast, overDuePayment, duePayment])


  return (
    <>
      <Fragment >

        <Box sx={{ display: 'flex', alignItems: 'center', pr: 3 }}
          onClick={(event) => {
            setAnchornotificationEl(event.currentTarget);
            setDrop(!drop);
            notification()

          }}>

          <IconButton aria-label='Notifications'>

            {totalNotification > 0 ? (

              <Badge badgeContent={totalNotification}
                color='error'

                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                style={{ boxShadow: '0 0 0 2px white' }}>
                <Icon icon='mingcute:notification-line' height={26} width={26} />
              </Badge>) : (
              <Icon icon='mingcute:notification-line' height={26} width={26} />
            )
            }
          </IconButton>

        </Box>



        {drop ?
          <Menu
            anchorEl={anchornotificationEl}
            open={Boolean(anchornotificationEl)}
            onClose={() => {
              setDrop(false);
              setAnchornotificationEl(null);

            }}
            PaperProps={{
              sx: {
                width: 230,
                mt: 4,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',

              },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          >
            <Box >

              <MenuItem onClick={() => {
                setNotificationType("Birthdays")
                setSCount(true)
                handleDropdownClose()
                setOpenNotification(true)
                setOpenPopup("Birthdays")
                setIsPartyBoom(true)
                setTimeout(() => {
                  setIsPartyBoom(false);
                }, 5000)
              }} sx={{ display: 'flex', gap: '10px' }}>
                <IconButton sx={{ paddingLeft: '0px !important' }} aria-label='Notifications'>
                  <Badge badgeContent={studentCount + employeeCount} color='error'>
                    <Icon icon='ph:cake-fill' height={22} width={22} />
                  </Badge>
                </IconButton>
                <Typography>Birthdays</Typography>
              </MenuItem>
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              <MenuItem sx={{ display: 'flex', gap: '20px' }}
                onClick={() => {

                  setIsLoadingPayment(false)
                  setNotificationType("Due payment")
                  setDue(true)
                  handleDropdownClose()
                  setPaymentPopup(true)
                  setOpenPopup("Due payment")
                  setPaymentPopup(true)
                }}
              ><Typography>
                  <Badge badgeContent={duePayment} color='error'>
                    <Icon icon="heroicons-outline:currency-rupee" height={25} width={25} />
                  </Badge>
                </Typography>  <Typography>Due payments</Typography></MenuItem>
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              <MenuItem sx={{ display: 'flex', gap: '20px' }}
                onClick={() => {

                  setOverDue(true)
                  setNotificationType("overDue payment")
                  setIsLoadingPayment(false)
                  handleDropdownClose()
                  setPaymentPopup(true)
                  setOpenPopup("overDue payment")
                  setPaymentPopup(true)
                }}
              ><Typography>
                  <Badge badgeContent={overDuePayment} color='error'>
                    <Icon icon="heroicons-outline:currency-rupee" height={25} width={25} />
                  </Badge>
                </Typography>  <Typography>overDue payments</Typography></MenuItem>
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              <MenuItem sx={{ display: 'flex', gap: '20px' }}
                onClick={() => {

                  setFore(true)
                  setNotificationType("days forecast")
                  setIsLoadingPayment(false)
                  handleDropdownClose()
                  setPaymentPopup(true)
                  setOpenPopup("days forecast")
                  // setOpenNotification(true)
                  setPaymentPopup(true)
                }}
              ><Typography>
                  <Badge badgeContent={forecast} color='error'>
                    <Icon icon="heroicons-outline:currency-rupee" height={25} width={25} />
                  </Badge>
                </Typography>  <Typography>5 days forecast</Typography></MenuItem>
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

            </Box>
          </Menu >
          : ""}

        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >

          <CustomAvatar
            alt={customer ? customer.customerName : 'user'}
            src={customer.avatar}
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
          >
            {customer?.customerName ? getInitials(customer?.customerName) : ''}
          </CustomAvatar>
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => { handleDropdownClose(); setDrop(false) }}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ py: 2, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <CustomAvatar alt='' src={customer.avatar} sx={{ width: '2.5rem', height: '2.5rem' }}>
                  {customer.customerName ? getInitials(customer?.customerName.toUpperCase()) : ''}
                </CustomAvatar>
              </Badge>
              <Box sx={{ ml: 3, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500 }}>{customer ? `${customer?.customerName?.charAt(0).toUpperCase()}${customer.customerName?.slice(1)}` : 'user'}</Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {role ? role?.role?.roleName : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItem
            sx={{ p: 0 }}
            onClick={() => {
              handleDropdownClose()
              router.push('/settings')
            }}
          >
            <Box sx={styles}>
              <Icon icon='bx:cog' />
              Settings
            </Box>
          </MenuItem>


          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 2,
              px: 4,
              color: 'text.secondary',
              '& svg': { mr: 2, fontSize: '1.25rem', color: 'text.secondary' }
            }}
          >
            <Icon icon='bx:power-off' />
            Sign Out
          </MenuItem>
        </Menu>
      </Fragment >

      {openNotifiaction == true ?
        <Dialog
          fullWidth
          open={openNotifiaction}
          maxWidth='md'
          scroll='body'
        >
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Grid sx={{ padding: "10px" }}>
              <Icon
                className='iconContainer'
                onClick={() => {
                  setDrop(false)

                  // clickedCount();
                  // setIsLoading(true)
                  // setIsLoadingPayment(true)
                  setOpenNotification(false)
                  setBirthdaysReminder({
                    student: [],
                    employee: []
                  })

                  setTodayBirthday(true)
                  setUpcomingBirthday(true)
                }}
                style={{
                  cursor: 'pointer',
                  fontSize: '30px',
                  margin: '8px',
                  transition: 'background-color 0.3s',

                }}

                icon='bx:x'
              />
            </Grid>
          </Grid>
          <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem !important', fontWeight: 600 }}> Today's birthday🎉</Typography>
          {(totalBirthdayNotification?.student?.length > 0 || totalBirthdayNotification?.employee?.length > 0) && isPartyBoom && (

            <div className="confetti-container">
              <Confetti style={{ width: '100%', height: '100%' }} />
            </div>
          )}
          <DialogContent sx={{ px: [8, 15], pt: [8, 12.5], position: 'relative' }}>
            <Card>

              <CardContent>
                <TableContainer sx={{ pb: 3 }}>
                  <Table>
                    <TableHead >

                      <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
                        <TableCell >Type</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell>Mobile no.</TableCell>
                        <TableCell>Email ID</TableCell>

                      </TableRow>
                    </TableHead>
                    {isLoading ?

                      <TableBody>

                        {birthdayReminderSkeleton?.student?.length > 0 && birthdayReminderSkeleton?.student?.map((row: any) => {
                          return (

                            <TableRow
                              key={row?.type}
                              sx={{
                                '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw'
                              }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lo
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                            </TableRow>

                          )
                        })}

                        {birthdayReminderSkeleton?.employee?.length > 0 && birthdayReminderSkeleton?.employee?.map((row: any) => {
                          return (

                            <TableRow
                              key={row?.type}
                              sx={{
                                '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw'
                              }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lo
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                            </TableRow>

                          )
                        })}

                      </TableBody>

                      :
                      <TableBody>

                        {
                          todayBirthday ?
                            <TableRow sx={{
                              '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
                            }} >
                              <TableCell align='center' colSpan={9} rowSpan={10}>
                                No birthdays today
                              </TableCell>

                            </TableRow> :
                            <>

                              {
                                totalBirthdayNotification?.student?.length > 0 && totalBirthdayNotification?.student?.map((row: any) => {
                                  return (
                                    <>

                                      <TableRow
                                        key={row?.type}
                                        sx={{
                                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw',

                                        }}
                                        className='hover'
                                        onClick={() => { updateNotification(row.rollNo); handleCellClick(row.rollNo) }}

                                      >

                                        {true &&
                                          row?.studentDateOfBirth?.slice(0, 5) ==
                                          `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}` &&
                                          <>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  Student
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.studentFirstName} {row.studentLastName}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.studentContact}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.studentEmail}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  <Icon icon="mdi:email" />
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell >
                                              {row.isClicked ? null : (
                                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                  <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }} />
                                                </div>
                                              )}
                                            </TableCell>
                                          </>
                                        }
                                      </TableRow>
                                    </>
                                  )
                                })
                              }

                              {
                                totalBirthdayNotification?.employee?.length >= 0 && totalBirthdayNotification?.employee?.map((row: any) => {
                                  return (
                                    <>
                                      <TableRow
                                        key={row?.type}
                                        sx={{
                                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw',

                                        }}
                                        className='hover'
                                        onClick={() => { updateNotification(row.employeeId); handleEmployeeClick(row.employeeId) }}
                                      >

                                        {true &&
                                          row?.employeeDateOfBirth.slice(0, 5) ==
                                          `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}` &&
                                          <>
                                            <TableCell>
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  Employee
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.employeeFirstname} {row.employeeLastname}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.employeePhoneNumber}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  {row.employeeEmail}
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell  >
                                              <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                                  <Icon icon="mdi:email" />
                                                </Typography>
                                              </Box>
                                            </TableCell>
                                            <TableCell >
                                              {row.isClicked ? null : (
                                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                  <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }} />
                                                </div>
                                              )}
                                            </TableCell>
                                          </>
                                        }
                                      </TableRow>
                                    </>
                                  )
                                })
                              }
                            </>
                        }
                      </TableBody>
                    }
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </DialogContent>

        </Dialog >
        : ''}
      {paymentPopup ?
        <Dialog
          fullWidth
          open={paymentPopup}
          onClose={() => { setPaymentPopup(false) }}
          maxWidth='md'
          scroll='body'
        >
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Grid sx={{ padding: "10px" }}>
              <Icon
                className='iconContainer'
                onClick={() => {
                  setDrop(false)
                  setPaymentPopup(false)
                  setBirthdaysReminder({
                    student: [],
                    employee: []
                  })

                }}
                style={{
                  cursor: 'pointer',
                  fontSize: '30px',
                  margin: '8px',
                  transition: 'background-color 0.3s',

                }}

                icon='bx:x'
              />
            </Grid>
          </Grid>
          {openPopup == 'Due payment' ?
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem !important', fontWeight: 600 }}>Due  payment notifications</Typography>
            : ''}
          {openPopup == 'overDue payment' ?
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem !important', fontWeight: 600 }}>OverDue  payment notifications</Typography>
            : ''}
          {openPopup == 'days forecast' ?
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem !important', fontWeight: 600 }}>5 days forecast  payment notifications</Typography>
            : ''}
          <DialogContent sx={{ pt: [8, 12.5], position: 'relative' }}>
            <Card sx={{ width: '850px' }}>

              <CardContent>
                <TableContainer sx={{ pb: 3 }}>
                  <Table>
                    {openPopup == 'Due payment' ?
                      <TableHead >

                        <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>


                          <TableCell>Enrollment </TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell>Due payment</TableCell>
                          <TableCell>Next payment date</TableCell>

                        </TableRow>
                      </TableHead>
                      : ""}
                    {openPopup == 'overDue payment' ?
                      <TableHead >

                        <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
                          <TableCell>Enrollment </TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell>Contact no.</TableCell>
                          <TableCell>Overdue</TableCell>

                        </TableRow>
                      </TableHead>
                      : ""}
                    {openPopup == 'days forecast' ?
                      <TableHead >

                        <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
                          <TableCell>Enrollment </TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell>Contact no.</TableCell>
                          <TableCell>UpcomingForecast</TableCell>

                        </TableRow>
                      </TableHead>
                      : ""}
                    {isLoadingPayment && openPopup == 'Due payment' ?

                      <TableBody>

                        {paymentReminderSkeleton?.student?.length > 0 && paymentReminderSkeleton?.student?.map((row: any) => {
                          return (

                            <TableRow
                              key={row?.type}
                              sx={{
                                '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw'
                              }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Loremvv,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lore
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lodfd
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>



                            </TableRow>

                          )
                        })}



                      </TableBody>
                      : ""}
                    {isLoadingPayment && openPopup == 'overDue payment' ?

                      <TableBody>

                        {overDueReminderSkeleton?.student?.length > 0 && overDueReminderSkeleton?.student?.map((row: any) => {
                          return (

                            <TableRow
                              key={row?.type}
                              sx={{
                                '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw'
                              }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Loremvv,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lore
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lodfd
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>

                            </TableRow>

                          )
                        })}
                      </TableBody>
                      : ""}
                    {isLoadingPayment && openPopup == 'days forecast' ?

                      <TableBody>

                        {overDueReminderSkeleton?.student?.length > 0 && overDueReminderSkeleton?.student?.map((row: any) => {
                          return (

                            <TableRow
                              key={row?.type}
                              sx={{
                                '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }, width: '200vw'
                              }}
                            >

                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lodfd
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                  <Skeleton>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      Lorem,
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </TableCell>

                            </TableRow>

                          )
                        })}



                      </TableBody>
                      : ""}
                    <TableBody>
                      {totalDueNotification?.length == 0 && openPopup == 'Due payment' ?
                        <TableRow sx={{
                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
                        }} >
                          <TableCell align='center' colSpan={9} rowSpan={10}>
                            No notifications today
                          </TableCell>

                        </TableRow>
                        : ''}
                     
                      {totalOverDueNotification?.length == 0 && openPopup == 'overDue payment' ?
                        <TableRow sx={{
                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
                        }} >
                          <TableCell align='center' colSpan={9} rowSpan={10}>
                            No notifications today
                          </TableCell>

                        </TableRow>
                        : ''}
                      {totalForecastNotification?.length == 0 && openPopup == 'days forecast' ?
                        <TableRow sx={{
                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
                        }} >
                          <TableCell align='center' colSpan={9} rowSpan={10}>
                            No notifications today
                          </TableCell>

                        </TableRow>
                        : ''}

                      {
                        isLoadingPayment == false && openPopup == 'Due payment' && groupedData?.length > 0 && groupedData?.map((row: any) => {
                          return (
                            <>
                              <TableRow className='hover' onClick={() => { updateNotification(row.rollNo); handleCellClick(row.rollNo) }}
                              // sx={{ backgroundColor: row.isClicked ? "white" : "rgb(228, 228, 249)" }}
                              >
                                <TableCell >
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentEnrollmentNumber}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell >
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentName}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell >
                                  {row.duePayments.map((duePayment: any, i: number) => (
                                    <div key={i} style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                        <TableRow sx={{ height: '25px', mt: '5px' }}>
                                          <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                            {duePayment}
                                          </Typography>
                                        </TableRow>
                                      </Box>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell >
                                  {row.nextPaymentDates.map((nextPaymentDate: any, i: number) => (
                                    <div key={i} style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                        <TableRow sx={{ height: '25px', mt: '5px' }}>
                                          <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                            {nextPaymentDate}
                                          </Typography>
                                        </TableRow>
                                      </Box>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell >
                                  {row.isClicked ? null : (
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                      <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>)
                        })
                      }
                      {
                        isLoadingPayment == false && openPopup == 'overDue payment' && groupedDataOverDue?.length > 0 && groupedDataOverDue?.map((row: any) => {
                          return (
                            <>
                              <TableRow sx={{ height: '50px' }} className='hover' onClick={() => { updateNotification(row.rollNo); handleCellClick(row.rollNo) }}>
                                <TableCell >
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentEnrollmentNumber}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell >
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentName}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell >
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentContact}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell >
                                  {row.overDue.map((overDue: any, i: number) => (
                                    <div key={i}>

                                      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                        <TableRow sx={{ height: '25px', mt: '5px' }}>
                                          <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                            {overDue}
                                          </Typography>
                                        </TableRow>
                                      </Box>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell >
                                  {row.isClicked ? null : (
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                      <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>)
                        })
                      }
                      {
                        isLoadingPayment == false && openPopup == 'days forecast' && groupedDataForecast?.length > 0 && groupedDataForecast?.map((row: any) => {
                          return (
                            <>
                              <TableRow sx={{ height: '50px' }} className='hover' onClick={() => { updateNotification(row.rollNo); }}>
                                <TableCell onClick={() => handleCellClick(row.rollNo)}>
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>

                                      {row.studentEnrollmentNumber}
                                    </Typography>
                                  </Box>
                                </TableCell >
                                <TableCell onClick={() => handleCellClick(row.rollNo)}>
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                      {row.studentName}

                                    </Typography>
                                  </Box>
                                </TableCell>


                                <TableCell onClick={() => handleCellClick(row.rollNo)}>
                                  <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>

                                      {row.studentContact}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell onClick={() => handleCellClick(row.rollNo)}>
                                  {row.upcomingForecast.map((upcomingForecast: any, i: number) => (
                                    <div key={i}>

                                      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                        <TableRow sx={{ height: '25px', mt: '5px' }}>
                                          <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                            {upcomingForecast}
                                          </Typography>
                                        </TableRow>
                                      </Box>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell >
                                  {row.isClicked ? null : (
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                      <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>)
                        })
                      }
                    </TableBody>

                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
        : ''}
    </>
  )
}

export default UserDropdown
