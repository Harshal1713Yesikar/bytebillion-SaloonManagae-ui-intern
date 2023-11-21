// ** React Imports
import { useEffect, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput/PickersCustomInput'
import { ReactDatePickerProps } from 'react-datepicker'
import { useTheme } from '@mui/material/styles'
import { customDateFormatDash } from 'src/@core/utils/format'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StudentSuspendDialog from './StudentSuspendDialog'
import CircularProgress from '@mui/material/CircularProgress'
import { listOneStudentDetailApi, updateStudentDetails, getStudentBasicInfo, deleteStudent, updateExistingStudentInBatch, updateExistingStudentInCourse } from 'src/store/APIs/Api'
import Icon from 'src/@core/components/icon'
import InputAdornment from '@mui/material/InputAdornment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Skeleton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/10.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.25rem',
  left: '-1rem',
  fontSize: '1.125rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  marginTop: '0.5rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

interface Props {
  updateCollegeState: any
  setUpdateCollegeState: any
}


const StudentViewLeft = (props: Props) => {
  // ** States

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 5);
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date(currentDate);
  maxDate.setMonth(11, 31);

  const { updateCollegeState, setUpdateCollegeState } = props
  const router = useRouter()
  const [openPopUp, setOpenPopUp] = useState<any>(false)


  const { studentId } = router.query
  const [studentData, setStudentData] = useState<any>([])
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [deletePopUp, setDeletePopUp] = useState<any>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [status, setStatus] = useState<any>()
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  const [studentDateOfBirth, setStudentDateOfBirth] = useState<any>()
  const [studentDataPersonalDetails, setStudentDataPersonalDetails] = useState<any>(
    {
      customerId: user ? user.customerId : "",
      rollNo: studentId,
      organizationId: user ? user.organizationId : "",
      "studentFirstName": "",
      "studentLastName": "",
      "studentEmail": "",
      "studentDateOfBirth": "",
      "studentCourse": "",
      "studentCollage": "",
      "studentSemester": "",
      "studentContact": "",
      "studentFatherName": "",
      "studentFatherContact": "",
      "studentAddress": "",
      "studentStatus": "",
      "studentDepartmentName": ""
    }
  )
  const handleCloseAlert = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }
  function convertDateFormat(inputDate: any) {

    const parts: any = inputDate?.split('-');
    if (parts?.length === 3) {
      const [day, month, year] = parts;

      return `${day}/${month}/${year}`;
    } else {

      return inputDate;
    }
  }


  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const theme = useTheme()

  const { direction } = theme


  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [date, setDate] = useState<any>(new Date())
  const [studentStatus, setStudentStatus] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingStudent, setIsLoadingStudent] = useState<boolean>(true)
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  async function getStudentBasicInfoApi() {

    if (localStorage.getItem('studentBasicInfo')) {
      if (user) {
        const response = await getStudentBasicInfo(user.customerId, user.organizationId)
        if (response?.statusCode == 200) {
          localStorage.setItem('studentBasicInfo', JSON.stringify(response?.data));
        } else {
          localStorage.setItem('studentBasicInfo', JSON.stringify([]));
        }
      }
    }
  }

  const handleConfirmation = (value: string) => {
    handleDeleteClose()

  }

  const studentSkeleton = [{

    "studentFirstName": "abc",
    "studentLastName": "def",
    "id": "ghi",
    "studentEnrollmentNumber": "jkl",
    "studentEmail": "sfhaj@gmail.com",
    "studentContact": "0784512054",
    "studentAddress": "rtyufgh",
    "studentStatus": "active"

  }]

  const handleDeleteClose = () => {
    setOpenPopUp(false)
  }

  const handleStudentStatusChange = (currentStatus: any) => {

    if (currentStatus && user) {
      setStudentDataPersonalDetails({ ...studentDataPersonalDetails, studentStatus: currentStatus });
      deleteStudent(user.customerId, studentId, user.organizationId, currentStatus)
        .then((response: any) => {
          setSuspendDialogOpen(false)
          setOpen(false);
          setOpenEdit(false)
          console.log(studentData, "studentDatastudentData")
          for (let singleObj of studentData.batch) {
            let updatedStudent = {
              "rollNo": studentId,
              "studentStatus": currentStatus
            }
            updateExistingStudentInBatch(user.customerId, user.organizationId, singleObj.batchId, updatedStudent)
          }

          for (let singleObj of studentData.courses) {
            let updatedStudent = {
              "rollNo": studentId,
              "studentStatus": currentStatus
            }
            updateExistingStudentInCourse(user.customerId, user.organizationId, singleObj.courseId, updatedStudent)
          }
          if (response.statuscode === 200) {
            handleEditClose()
            handleEditClickOpen()
            setStudentDataPersonalDetails(response.data);

          }
        })
        .catch((error: any) => {
          console.error("Error fetching student details:", error);
        });
    }
  }

  const updateStudentApi = () => {
    setFormUpdateButton(false)

    // const correctDateType: any = convertDateFormat(studentDataPersonalDetails.studentDateOfBirth);
    // studentDataPersonalDetails.studentDateOfBirth = correctDateType;
    // console.log("hello", studentDataPersonalDetails.studentDateOfBirth)
    if (studentDataPersonalDetails.studentFirstName && studentDataPersonalDetails.studentLastName && studentDataPersonalDetails.studentEmail && studentDataPersonalDetails.studentDateOfBirth && studentDataPersonalDetails.studentContact.length == 10 && studentDataPersonalDetails.studentFatherName && studentDataPersonalDetails.studentFatherContact.length == 10 && studentDataPersonalDetails.studentAddress) {

      updateStudentDetails(studentDataPersonalDetails).then(
        (res) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setSnackbaropen(true)
            setResponseMessage("Student information updated successfully ")
            setSubmitted(false)
            setUpdateCollegeState(true)
            listOneStudentDetailApi(user.customerId, user.organizationId, studentId)
            getStudentBasicInfoApi()
          }
        }
      )
      setOpenEdit(false)
    }
    else if (studentDataPersonalDetails.studentContact.length !== 10 && studentDataPersonalDetails.studentFatherContact.length !== 10) {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Phone number must contain only 10 digits ")
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill all the required information")
    }
  }

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (studentDataPersonalDetails) {
      setStudentStatus(studentDataPersonalDetails?.studentStatus)
    }

  }, [studentDataPersonalDetails])


  useEffect(() => {

    setStudentDataPersonalDetails({
      customerId: user ? user.customerId : "",
      rollNo: studentId,
      organizationId: user ? user.organizationId : "",
      "studentFirstName": (studentData) ? studentData.studentFirstName : "",
      "studentLastName": (studentData) ? studentData.studentLastName : "",
      "studentEnrollmentNumber": (studentData) ? studentData.studentEnrollmentNumber : "",
      "studentEmail": (studentData) ? studentData.studentEmail : "",
      "studentDateOfBirth": (studentData) ? studentData.studentDateOfBirth : "",
      "studentCourse": (studentData) ? studentData.studentCourse : "",
      "studentCollage": (studentData) ? studentData.studentCollage : "",
      "studentSemester": (studentData) ? studentData.studentSemester : "",
      "studentContact": (studentData) ? studentData.studentContact : "",
      "studentFatherName": (studentData) ? studentData.studentFatherName : "",
      "studentFatherContact": (studentData) ? studentData.studentFatherContact : "",
      "studentAddress": (studentData) ? studentData.studentAddress : "",
      "studentStatus": (studentData) ? studentData.studentStatus : "",
      "studentDepartmentName": (studentData) ? studentData.studentDepartmentName : ""
    })


  }, [studentId, studentData])


  const handleChange = (e: any) => {
    setStudentDataPersonalDetails({
      ...studentDataPersonalDetails,
      [e.target.name]: e.target.value
    })

  }

  const refreshData = async () => {

    setIsLoadingStudent(true);


    const timeoutId = setTimeout(async () => {
      try {
        if (user) {
          setPermission(user.role.permissions);
          const response = await listOneStudentDetailApi(user.customerId, user.organizationId, studentId);
          setStudentData(response.data);
          setIsLoadingStudent(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error setting up student data refresh:', error);
      }
    }, 2000);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          setPermission(user.role.permissions);
          const response = await listOneStudentDetailApi(user.customerId, user.organizationId, studentId);
          setStudentData(response.data);
          setIsLoadingStudent(false);
          setIsLoading(false);
        }
      } catch (error) {

        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [user, studentId]);


  // Handle Edit dialog
  const handleEditClickOpen = () => {
    setOpenEdit(true)
    if (user) {

      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
        let date = convertDateFormat(res.data.studentDateOfBirth)
        const parts = date.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        const parsedDate = new Date(`${month}/${day}/${year}`);
        const formattedDate = `${parsedDate.getMonth() + 1
          }/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
        setStudentDateOfBirth(formattedDate)
        setStudentData(res.data)

      })

    }

  }

  const handleEditClose = () => {
    setFormUpdateButton(false)
    setOpenEdit(false)
    if (user) {

      listOneStudentDetailApi(user.customerId, user.organizationId, studentId).then((res) => {
        setStudentData(res.data)

      })
    }
  }



  if (data) {
    return (

      <Grid container spacing={6}>
        <Grid item xs={12}>

          {
            isLoading ?
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box> :
              <>
                <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'left' }}>

                  <Button sx={{ mr: 2 }} onClick={() => { router.push('/student/studentList/') }} variant='outlined'>
                    &#8592; studentList
                  </Button>
                </Box>
                <Card>


                  <Button onClick={refreshData} className='refreshs' variant='outlined' size='small' sx={{ mt: 5, mb: 5, ml: 5, display: 'flex' }}><RefreshIcon className='refreshs' /></Button>
                  <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {data.avatar.length ? (
                      <CustomAvatar
                        src={data.avatar}
                        sx={{ width: 110, height: 110, mb: 6 }}
                        variant='rounded'
                        alt={(studentDataPersonalDetails) ? studentDataPersonalDetails.studentFirstName : ""}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        color={data.avatarColor as ThemeColor}
                        sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                      >
                        {getInitials(data.fullName)}
                      </CustomAvatar>
                    )}

                    {studentDataPersonalDetails.studentFirstName !== undefined && studentDataPersonalDetails.studentLastName !== undefined ? (
                      <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                        {(studentDataPersonalDetails) ? `${studentDataPersonalDetails.studentFirstName} ${studentDataPersonalDetails.studentLastName}` : " "}
                      </Typography>
                    ) : (
                      <Skeleton>
                        <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                      </Skeleton>
                    )}
                  </CardContent>



                  <CardContent>
                    <Grid sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                      <Typography variant='h6'>Student Details</Typography>
                      <Grid>
                        <Grid>

                          {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                            <Button className='edit' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={handleEditClickOpen}>
                              <Icon
                                cursor="pointer"
                                icon='bx:pencil' />
                            </Button>}

                          {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("delete")) &&
                            <Button className='delete' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => {
                              setDeleteDialogOpen(true);
                            }}>
                              <Icon cursor="pointer" icon='ic:baseline-delete' />
                            </Button>}

                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
                    {isLoadingStudent ? (studentSkeleton.map((student: any, index: number) => {
                      return (
                        <Box sx={{ pt: 4, pb: 2 }} key={index}>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Id :</Typography>
                            <Skeleton> <Typography sx={{ color: 'text.secondary' }}>lorem message</Typography></Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Name :</Typography>
                            <Skeleton>  <Typography sx={{ color: 'text.secondary' }}>lorem message</Typography>  </Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Enrollment :</Typography>
                            <Skeleton> <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>lorem message</Typography>  </Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Email :</Typography>
                            <Skeleton>   <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>lorem message</Typography>  </Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Contact :</Typography>
                            <Skeleton>  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>lorem message</Typography>  </Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Address :</Typography>
                            <Skeleton>  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>lorem message</Typography>  </Skeleton>
                          </Box>
                          <Box sx={{ display: 'flex', mb: 4 }}>
                            <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Status :</Typography>
                            <Skeleton>
                              <div>
                                <CustomChip
                                  style={{ height: "30px", margin: "5px", cursor: "pointer" }}
                                  rounded
                                  size='small'
                                  skin='light'
                                  color={studentStatus == 'active' ? 'success' : 'warning'}
                                  label="loremmm"
                                />
                              </div>
                            </Skeleton>
                          </Box>
                        </Box>
                      )
                    }
                    )
                    ) : (
                      <Box sx={{ pt: 4, pb: 2 }}>
                        <Box sx={{ display: 'flex', mb: 4 }}>

                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Id :</Typography>
                          {studentDataPersonalDetails.rollNo !== undefined ? (

                            <Typography sx={{ color: 'text.secondary' }}>{(studentDataPersonalDetails) ? studentDataPersonalDetails.rollNo : ""}</Typography>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Name:</Typography>
                          {studentDataPersonalDetails.studentFirstName !== undefined && studentDataPersonalDetails.studentLastName !== undefined ? (

                            <Typography sx={{ color: 'text.secondary' }}>{`${studentDataPersonalDetails.studentFirstName} ${studentDataPersonalDetails.studentLastName}`}</Typography>

                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Enrollment :</Typography>
                          {studentDataPersonalDetails.studentEnrollmentNumber !== undefined ? (
                            <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>{(studentDataPersonalDetails) ? studentDataPersonalDetails.studentEnrollmentNumber : ""}</Typography>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Email :</Typography>
                          {studentDataPersonalDetails.studentEmail !== undefined ? (
                            <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>{(studentDataPersonalDetails) ? studentDataPersonalDetails.studentEmail : ""}</Typography>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Contact :</Typography>
                          {studentDataPersonalDetails.studentContact !== undefined ? (
                            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(studentDataPersonalDetails) ? studentDataPersonalDetails.studentContact : ""}</Typography>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Address :</Typography>
                          {studentDataPersonalDetails.studentAddress !== undefined ? (
                            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(studentDataPersonalDetails) ? studentDataPersonalDetails.studentAddress : ""}</Typography>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', mb: 4 }}>
                          <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Status :</Typography>
                          {studentStatus !== undefined ? (
                            <div>
                              <CustomChip
                                style={{ height: "30px", margin: "5px", cursor: "pointer" }}
                                rounded size='small'
                                skin='light'
                                color={studentStatus == 'active' ? 'success' : 'warning'}
                                label={studentStatus}
                              />
                            </div>
                          ) : (
                            <Skeleton>
                              <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                            </Skeleton>
                          )}
                        </Box>
                      </Box>
                    )
                    }
                  </CardContent>
                  <Dialog

                    scroll='body'
                    open={openEdit}
                    aria-labelledby='user-view-edit'
                    aria-describedby='user-view-edit-description'
                  >
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                        <Typography variant='h5' component='span'>
                          {`Edit student's information`}
                        </Typography>
                      </DialogTitle>
                      <Icon
                        className="iconContainer"
                        onClick={() => { handleEditClose(); setSubmitted(false) }}
                        style={{
                          cursor: "pointer",
                          fontSize: "30px",
                          margin: "8px",
                          transition: "background-color 0.3s",
                        }}
                        icon='bx:x'
                      />
                    </Grid>

                    <DialogContent>

                      <form>
                        <Grid container spacing={5} sx={{ pt: 5 }}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                                min: 3,
                              }}
                              fullWidth label='First name' name="studentFirstName"
                              onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }}
                              error={submitted ? studentDataPersonalDetails.studentFirstName ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentFirstName ? 'Required,max 50 chars' : ''}
                              value={studentDataPersonalDetails ? studentDataPersonalDetails.studentFirstName : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              error={submitted ? studentDataPersonalDetails.studentLastName ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentLastName ? 'Required,max 50 chars' : ''}
                              fullWidth label='Last name' name="studentLastName" value={studentDataPersonalDetails ? studentDataPersonalDetails.studentLastName : ""}
                              onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} />
                          </Grid>


                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              error={submitted ? studentDataPersonalDetails.studentFatherName ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentFatherName ? 'Required,max 50 chars' : ''}
                              fullWidth label='Father name' name="studentFatherName" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentFatherName : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth
                              error={submitted ? studentDataPersonalDetails.studentContact ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentContact ? 'Required,max 50 chars' : ''}
                              label="Student's contact" name="studentContact" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentContact : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label=" Father's phone number" name="studentFatherContact" onChange={(event) => {
                              handleChange(event);
                              setFormUpdateButton(true);
                            }}
                              error={submitted ? studentDataPersonalDetails.studentFatherContact ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentFatherContact ? 'Required' : ''}
                              value={studentDataPersonalDetails ? studentDataPersonalDetails.studentFatherContact : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth
                              inputProps={{
                                maxLength: 100,
                              }}
                              error={submitted ? studentDataPersonalDetails.studentAddress ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentAddress ? 'Required,max 50 chars' : ''}
                              label="Student's address" name="inventoryAmount" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentAddress : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth
                              inputProps={{
                                maxLength: 50,
                              }}
                              error={submitted ? studentDataPersonalDetails.studentEmail ? false : true : false}
                              helperText={submitted && !studentDataPersonalDetails.studentEmail ? 'Required,max 50 chars' : ''}
                              label='Email' name="studentEmail"
                              onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentEmail : ""} />
                          </Grid>

                          <Grid item xs={12} sm={6}>

                            <DatePickerWrapper>

                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                showMonthDropdown
                                yearDropdownItemNumber={50}
                                minDate={minDate}
                                maxDate={maxDate}

                                selected={new Date(studentDateOfBirth)}

                                id='basic-input'
                                name="studentDateOfBirth"
                                value={convertDateFormat(studentDataPersonalDetails.studentDateOfBirth && studentDataPersonalDetails.studentDateOfBirth.slice(0, 10))}
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => {
                                  setStudentDataPersonalDetails({ ...studentDataPersonalDetails, studentDateOfBirth: customDateFormatDash(date) });
                                  setFormUpdateButton(true);
                                }}
                                placeholderText='Select a date'
                                customInput={<CustomInput
                                  error={submitted ? studentDataPersonalDetails.studentDateOfBirth ? false : true : false}
                                  helperText={submitted && !studentDataPersonalDetails.studentFirstName ? 'Required' : ''}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                  }}
                                  label='Date of birth'

                                />}
                              />
                            </DatePickerWrapper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              fullWidth label='Collage name ' name="studentCollage" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentCollage : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              fullWidth label='College course' name="studentCourse" value={studentDataPersonalDetails ? studentDataPersonalDetails.studentCourse : ""} onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              fullWidth label='Department name' name="studentDepartmentName" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentDepartmentName : ""} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              inputProps={{
                                maxLength: 50,
                              }}
                              fullWidth label='College semester' name="studentSemester" onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }} value={studentDataPersonalDetails ? studentDataPersonalDetails.studentSemester : ""} />
                          </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', pr: 12, mt: '15px' }}>
                          <Typography sx={{ mt: 2, ml: 12, color: 'text.secondary' }} >
                            Current status  {studentDataPersonalDetails?.studentStatus == 'active' ?
                              <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={studentDataPersonalDetails?.studentStatus} />
                              :
                              <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={studentDataPersonalDetails?.studentStatus} />
                            }
                          </Typography>
                          <Grid>
                            <Typography sx={{ mt: 2, color: 'text.secondary' }} >
                              Change status
                              {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) ?
                                studentDataPersonalDetails?.studentStatus == "active" ?
                                  <Button sx={{ margin: "5px", }} variant='contained'

                                    onClick={() => { setStatus('inActive'); setSuspendDialogOpen(true); setFormUpdateButton(true) }}
                                  >
                                    Inactive
                                  </Button> : <Button sx={{ margin: "5px", }} variant='contained'

                                    onClick={() => { setStatus('active'); setSuspendDialogOpen(true); setFormUpdateButton(true) }}
                                  >
                                    active
                                  </Button> : ''}

                            </Typography>
                          </Grid>

                        </Grid>
                      </form>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'right' }}>
                      <Button variant='outlined' color='secondary' onClick={() => { handleEditClose(); setSubmitted(false) }}>
                        Cancel
                      </Button>
                      <Button variant='contained' sx={{ mr: 2 }} onClick={() => { updateStudentApi(); setSubmitted(true) }}
                        disabled={!formUpdateButton}>
                        Update
                      </Button>

                    </DialogActions>
                  </Dialog>

                  {/* <StudentSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} studentStatus={studentStatus} setStudentStatus={setStudentStatus} /> */}

                </Card>

              </>

          }

        </Grid>
        <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
          <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
            Inventory  updated  successfully
          </Alert>
        </Snackbar>

        <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
          <Alert
            variant="filled"
            elevation={3}
            onClose={() => setSnackbaropen(false)}
            severity={snackbarColor === true ? 'success' : 'error'}
          >
            {responseMessage}
          </Alert>
        </Snackbar>
        {deleteDialogOpen == true ? (

          <Dialog fullWidth open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
            <Grid container justifyContent="flex-end">
              <Icon
                className="iconContainer"
                onClick={() => setDeleteDialogOpen(false)}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  margin: "8px",
                  transition: "background-color 0.3s",
                }}
                icon='bx:x'
              />
            </Grid >

            <DialogContent sx={{ pb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                  <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                  <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                    Are you sure?
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert student !</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'right', mt: 5 }}>
              <Button variant='outlined' color='secondary' onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>

              <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
                setStudentStatus('delete')
                handleStudentStatusChange("delete")
                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("student is deleted successfully")
                setDeleteDialogOpen(false)
              }}>
                Yes, Delete student !
              </Button>

            </DialogActions>
          </Dialog>

        )
          : ""
        }

        {suspendDialogOpen ? <Dialog fullWidth open={suspendDialogOpen} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
          <Grid container justifyContent="flex-end">
            <Icon
              className="iconContainer"
              onClick={() => { setSuspendDialogOpen(false) }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </Grid >
          <DialogContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                <Typography variant='h4' sx={{ color: 'text.secondary', mt: '7px' }}>
                  Are you sure?
                </Typography>
              </Box>
              {/* <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert student !</Typography> */}
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => { setSuspendDialogOpen(false) }}>
              Cancel
            </Button>

            <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
              setStudentStatus(status);
              handleStudentStatusChange(status)
              setFormUpdateButton(true)

            }}>
              Change the status to {status} !
            </Button>

          </DialogActions>
        </Dialog> : ""
        }
      </Grid>
    )
  } else {
    return null
  }
}

export default StudentViewLeft
