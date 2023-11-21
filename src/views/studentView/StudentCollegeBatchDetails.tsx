// ** React Imports
import { forwardRef, useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import CustomChip from 'src/@core/components/mui/chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import EventNoteIcon from '@mui/icons-material/EventNote';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip';
import Icon from 'src/@core/components/icon'
import { listOneStudentDetailApi, listOrganizationCourse, updateStudentInBatch, updateBatchInCourse, updateStudenCourseCouponBatchDetails, getAllBatchList, createBatch } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { useDispatch } from 'react-redux'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { SelectChangeEvent } from '@mui/material/Select';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { styled, useTheme } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { customDateFormat, customTimeFormat } from 'src/@core/utils/format'
import { InputAdornment } from '@mui/material';

// ** Third Party Imports

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'

interface CellType {
  row: ProjectListDataType
}
const Img = styled('img')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  marginRight: theme.spacing(3)
}))

const columns = [
  {
    flex: 0.3,
    minWidth: 230,
    field: 'projectTitle',
    headerName: 'Project',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Img src={row.img} alt={`project-${row.projectTitle}`} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{row.projectTitle}</Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {row.projectType}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'totalTask',
    headerName: 'Total Tasks',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.totalTask}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 200,
    headerName: 'Progress',
    field: 'progressValue',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ width: '100%' }}>
        <Typography variant='body2'>{row.progressValue}%</Typography>
        <LinearProgress
          variant='determinate'
          value={row.progressValue}
          color={row.progressColor}
          sx={{ height: 6, mt: 1 }}
        />
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'hours',
    headerName: 'Hours',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.hours}</Typography>
  }
]
interface Props {
  updateCollegeState: any
  setUpdateCollegeState: any
}

const InvoiceListTable = (props: Props) => {

  const { updateCollegeState, setUpdateCollegeState } = props
  const [studentDetails, setStudentDetails] = useState<any>()
  const [batchDetails, setBatchDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>()
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [createBatchDialog, setCreateBatchDialog] = useState<boolean>(false)
  const [batchId, setBatchId] = useState<any>()
  const [listBatch, setListBatch] = useState<any>([])
  const [batchName, setBatchName] = useState<string[]>([]);
  const [openBatchDialog, setOpenBatchDialog] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<any>(null)
  const [endTime, setEndTime] = useState<any>(null)
  const [batchTime, setBatchTime] = useState<any>(false)

  const [startDate, setStartDate] = useState<DateType>()
  const [endDate, setEndDate] = useState<DateType>()
  const [open, setOpen] = useState<any>({ open: false, mssg: '' })
  const [snackbarColor, setSnackbarColor] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [batchData, setBatchData] = useState<any>({
    batchName: "",
    batchDescription: "",
    batchClassStartTime: "",
    batchClassEndTime: "",
    batchStartDate: "",
    batchEndDate: "",
    batchMode: ""
  })
  const [permission, setPermission] = useState<any>()
  const [toSetTime, setToSetTime] = useState<any>('yes')
  const [toSetDate, setToSetDate] = useState<any>('yes')
  const [activeStep, setActiveStep] = useState<any>(0)
  const [courseListData, setCourseListData] = useState<any>([])
  const [studentExistingCourse, setStudentExistingCourse] = useState<any>([])
  const [courseName, setCourseName] = useState<any>([]);

  const router = useRouter()
  const dispatch = useDispatch()

  const { studentId } = router.query

  const listCourse = () => {

    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      if (customerId && organizationId) {
        dispatch(listOrganizationCourse({ organizationId, customerId })).then((res: any) => {
          setCourseListData(res.payload.data.data)
        })
      }

    }

  }

  const listBatchApiCall = () => {
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      getAllBatchList(customerId, organizationId).then((res: any) => {
        setListBatch(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (startDate) {
      batchData.batchStartDate = customDateFormat(startDate);
      setBatchData(batchData)
    }

    if (endDate) {
      batchData.batchEndDate = customDateFormat(endDate);
      setBatchData(batchData)
    }


    if (endTime) {
      batchData.batchClassEndTime = customTimeFormat(endTime);
      setBatchData(batchData)
    }

    if (startTime) {
      batchData.batchClassStartTime = customTimeFormat(startTime);
      setBatchData(batchData)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, startDate, endDate])

  useEffect(() => {

    if (user) {
      setPermission(user.role.permissions)
      listApiCall()
      listBatchApiCall()
      listCourse()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, studentId])

  useEffect(() => {

    if (updateCollegeState == true) {
      listApiCall()
      setUpdateCollegeState(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCollegeState])

  const batchDeleteFunction = () => {
    const filteredBatch = batchDetails.filter((obj: any) => obj.batchId != batchId)
    let newStuDetails = { ...studentDetails, batch: filteredBatch }
    delete newStuDetails.coupon
    updateStudenCourseCouponBatchDetails(newStuDetails).then((res: any) => {
      setStudentDetails(res.data)
      setBatchDetails(res.data.batch)
    }).catch((err) => {
      console.log(err)
    })
  }

  const listApiCall = () => {
    listOneStudentDetailApi(user?.customerId, user?.organizationId, studentId).then((res) => {
      setStudentDetails(res.data)
      setBatchDetails(res.data.batch)
      if (res.statuscode == 200) {
        setIsLoading(false)
      }

    })
  }

  function findCommonCourseObjects(array1: any, array2: any) {
    let newFinalArray: any = []
    for (let singleObj of array1) {
      const findoutput = array2.find((obj2: any) => obj2.courseId === singleObj.courseId);
      if (findoutput && !newFinalArray.find((obj2: any) => obj2.courseId === singleObj.courseId)) {
        newFinalArray.push(findoutput)
      }
    }
    return newFinalArray
  }

  useEffect(() => {

    if (studentDetails?.courses.length > 0 && courseListData.length > 0) {
      const commonObjects = findCommonCourseObjects(studentDetails?.courses, courseListData);
      setStudentExistingCourse(commonObjects)
    }

  }, [studentDetails, courseListData])

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const createBatchSubmit = () => {
    if (batchTime == false) {
      const data: any = []
      if (user) {
        const customerId = user.customerId
        const organizationId = user.organizationId
        data.push(batchData)
        if (data.length > 0) {
          if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })
                setSubmitted(false)
                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })
                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })
                setSubmitted(false)
                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {

                setSnackbarColor(true)
                setOpen({ open: true, mssg: "New batch created successfully" })
                setSubmitted(false)
                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setOpen({ open: true, mssg: "created successfully" })
                setSubmitted(false)
                getAllBatchList(customerId, organizationId).then((res: any) => {
                  setListBatch(res.data)
                })

                handleBatchDialogClose()
                setBatchData({
                  ...batchData,
                  batchName: "",
                  batchDescription: "",
                  batchClassStartTime: "",
                  batchClassEndTime: "",
                  batchStartDate: "",
                  batchEndDate: "",
                  batchMode: ""
                })
                setStartTime(null)
                setEndTime(null)
                setStartDate(null)
                setEndDate(null)

              }
              else {
                setSnackbarColor(false)
                setOpen({ open: true, mssg: "Fill all the required information" })
                handleBatchDialogClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }

          else {
            setSnackbarColor(false)
            setOpen({ open: true, mssg: "Fill all the required information" })

          }
        }
      }
    }
    else {
      setBatchTime(true)
      setSnackbarColor(false)
      setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time " })
    }
  }

  const handleBatchSelectChange: any = (event: SelectChangeEvent<typeof batchName>) => {
    // const { target: { value }, } = event.target.value;
    setBatchName(

      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };

  const handleClickBatchDialogOpen = () => setOpenBatchDialog(true)
  const handleBatchDialogClose = () => setOpenBatchDialog(false)
  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value })
  }


  const handleClose = () => {
    if (open.open == true) {
      setOpen({ open: false, mssg: "" })
    }
  }

  const updateBatchApi: any = (customerId: any, organizationId: any, batch: any) => {
    let newStudent = {
      "rollNo": studentId,
      "studentStatus": studentDetails.studentStatus
    }

    let singleCourse = courseListData.find((obj: any) => obj.courseName == courseName[0])

    let newCourse = {
      "courseId": singleCourse.courseId,
      "courseStatus": singleCourse.courseStatus
    }

    updateStudentInBatch(customerId, organizationId, batch.batchId, newStudent, newCourse)

    let newBatch = {
      "batchId": batch.batchId,
      "batchStatus": batch.batchStatus
    }

    updateBatchInCourse(customerId, organizationId, singleCourse.courseId, newBatch, newStudent)

  }

  const handleAddBatch = () => {
    const batch: any = []

    if (batchName.length > 0) {
      for (const singleBatch of listBatch) {
        for (const singleBatchName of batchName) {
          if (singleBatch.batchName == singleBatchName) {
            delete singleBatch.batchDescription
            delete singleBatch.dateCreated
            batch.push(singleBatch)
          }
        }
      }
    }


    // const uniqueIds = new Set();
    // const result: any = [];

    // // Process batchTwo array
    // batchDetails.forEach((item: any) => {
    //   if (!uniqueIds.has(item.batchName)) {
    //     uniqueIds.add(item.batchName);
    //     result.push(item);
    //   }
    // });


    // // Process batch array 
    // batch.forEach((item: any) => {
    //   if (!uniqueIds.has(item.batchName)) {
    //     uniqueIds.add(item.batchName);
    //     let toPushBatch = {
    //       batchId: item.batchId
    //     }
    //     result.push(toPushBatch);
    //   }
    // });

    let finalBatch: any = []

    for (let singleObj of batchDetails) {
      if (!finalBatch.find((obj: any) => obj.batchId == singleObj.batchId)) {
        finalBatch.push(singleObj)
      }
    }

    for (let singleObj of batch) {
      if (!finalBatch.find((obj: any) => obj.batchId == singleObj.batchId)) {
        let toPushBatch = {
          batchId: batch[0].batchId
        }
        finalBatch.push(toPushBatch)
      }
    }

    let newStudentDetails = { ...studentDetails, batch: finalBatch }
    delete newStudentDetails.coupon
    updateStudenCourseCouponBatchDetails(newStudentDetails).then((res: any) => {
      setBatchDetails(res?.data?.batch)
      setStudentDetails(res.data)
      if (finalBatch.length > batchDetails.length) {
        updateBatchApi(user.customerId, user.organizationId, batch[0])

      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })
  const handleStartTimeChange = (date: any) => {
    setStartTime(date);

    if (endTime && date) {
      const timeDiffInMinutes = Math.round((endTime - date) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time " })
      }
      else {
        setBatchTime(false)
      }
    }
  };

  const handleEndTimeChange = (date: any) => {
    setEndTime(date);
    if (startTime && date) {
      const timeDiffInMinutes = Math.round((date - startTime) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setOpen({ open: true, mssg: "Batch end time must be at least 30 minutes after start time" })
      }
      else {
        setBatchTime(false)
      }
    }
  };

  const handleSelectChange: any = (event: SelectChangeEvent<typeof courseName>) => {
    setCourseName(
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };

  function findCommonBatchObjects(array1: any, array2: any) {
    let newFinalArray = []
    for (let singleObj of array1) {
      const findoutput = array2.find((obj2: any) => obj2.batchId === singleObj.batchId);
      if (findoutput) {
        newFinalArray.push(findoutput)
      }
    }
    return newFinalArray
  }

  function findDifferentBatchObjects(array1: any, array2: any) {
    let newFinalArray = []
    if (array1.length != 0) {
      for (let singleObj of array2) {
        if (singleObj.batchStatus == "active") {
          if (!array1.find((obj2: any) => obj2.batchId == singleObj.batchId)) {
            newFinalArray.push(singleObj)
          }
        }
      }
    }
    else {
      let filteredActiveBatch = array2.filter((obj: any) => obj.batchStatus == "active")
      newFinalArray = filteredActiveBatch
    }
    return newFinalArray
  }
  const [filteredBatchForStudent, setFilteredBatchForStudent] = useState<any>([])
  const [filteredNewBatchForStudent, setFilteredNewBatchForStudent] = useState<any>([])

  useEffect(() => {
    if (batchDetails && batchDetails.length >= 0 && listBatch && listBatch.length > 0) {
      const commonObjects = findCommonBatchObjects(batchDetails, listBatch);
      const differentObjects = findDifferentBatchObjects(batchDetails, listBatch);
      setFilteredBatchForStudent(commonObjects)
      setFilteredNewBatchForStudent(differentObjects)
    }
  }, [listBatch, batchDetails])
  const handleCellClick = (row: any) => {
    router.push(`/batch/batchDetails/${row}`)
  }
  return (
    <>
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={16}>
            <Card>
              <CardHeader title="College Details" />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell> Name</TableCell>
                      <TableCell align='center'> Semester</TableCell>
                      <TableCell align='center'> Department Name</TableCell>
                      <TableCell align='center'> Course</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {isLoading ? (
                      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Loading...</Typography>
                      </Box>
                    ) :
                      <TableRow
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row' align='center'>
                          <Tooltip title={studentDetails && studentDetails.studentCollage ? studentDetails.studentCollage : '-'} componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "black",
                                textTransform: "capitalize",
                                "& .MuiTooltip-arrow": {
                                  color: "black"
                                }
                              }
                            }
                          }}>
                            {studentDetails && studentDetails.studentCollage ? studentDetails.studentCollage : '-'}</Tooltip></TableCell>
                        <TableCell align='center'>
                          <Tooltip title={studentDetails && studentDetails.studentSemester ? studentDetails.studentSemester : '-'} componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "black",
                                textTransform: "capitalize",
                                "& .MuiTooltip-arrow": {
                                  color: "black"
                                }
                              }
                            }
                          }}>
                            {studentDetails && studentDetails.studentSemester ? studentDetails.studentSemester : '-'}</Tooltip></TableCell>
                        <TableCell align='center'>
                          <Tooltip title={studentDetails && studentDetails.studentDepartmentName ? studentDetails.studentDepartmentName : '-'} componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "black",
                                textTransform: "capitalize",
                                "& .MuiTooltip-arrow": {
                                  color: "black"
                                }
                              }
                            }
                          }}>
                            {studentDetails && studentDetails.studentDepartmentName ? studentDetails.studentDepartmentName : '-'}</Tooltip></TableCell>
                        <TableCell align='center'>
                          <Tooltip title={studentDetails && studentDetails.studentCourse ? studentDetails.studentCourse : '-'} componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "black",
                                textTransform: "capitalize",
                                "& .MuiTooltip-arrow": {
                                  color: "black"
                                }
                              }
                            }
                          }}>
                            {studentDetails && studentDetails.studentCourse ? studentDetails.studentCourse : '-'}</Tooltip></TableCell>
                      </TableRow>
                    }

                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          <Grid item xs={16} sx={{ width: '100%' }} >
            <Card>
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid >   <CardHeader title="Batch Details" /> </Grid>

                <Grid sx={{ marginTop: '10px', mr: '30px' }}>
                  {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("update")) &&

                    <Box sx={{ textAlign: 'right' }}>
                      <Button
                        variant='contained'
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => {
                          setCreateBatchDialog(true)
                        }}
                      >
                        Add batch <div style={{ paddingLeft: '5px', paddingTop: '2px' }}>
                          <Icon icon="material-symbols:group" />
                        </div>

                      </Button>

                    </Box>
                  }
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell> Name</TableCell>
                      <TableCell align='center'> Interval</TableCell>
                      <TableCell align='center'>Class Time</TableCell>
                      <TableCell align='center'> Status</TableCell>
                      <TableCell align='center'>Mode</TableCell>
                      {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("update")) &&
                        <TableCell align='center'>Remove</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {isLoading ? (
                      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Loading...</Typography>
                      </Box>
                    ) :
                      filteredBatchForStudent?.length > 0 && filteredBatchForStudent?.map((e: any) => (
                        <TableRow
                          key={e?.batchId}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            },
                            '&:hover': {
                              background: "#F5F5F9",
                              cursor: "pointer"
                            },
                          }}
                          onClick={() => { handleCellClick(e.batchId) }}
                        >
                          <TableCell component='th' scope='row' align='center'>
                            <Tooltip title={e.batchName} componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: "black",
                                  textTransform: "capitalize",
                                  "& .MuiTooltip-arrow": {
                                    color: "black"
                                  }
                                }
                              }
                            }}>
                              {e.batchName ? e.batchName : '-'}
                            </Tooltip>
                          </TableCell>
                          <TableCell align='center'>

                            {e?.batchStartDate && e?.batchEndDate ? `${e.batchStartDate} - ${e.batchEndDate}` : '-'} </TableCell>
                          <TableCell align='center'>

                            {e?.batchClassStartTime && e?.batchClassEndTime ? `${e.batchClassStartTime} - ${e.batchClassEndTime}` : '-'} </TableCell>
                          <TableCell align='center'>
                            {e?.batchStatus === 'active' ? (
                              <CustomChip rounded size='small' skin='light' color='success' label={e?.batchStatus} />
                            ) : (
                              <CustomChip rounded size='small' skin='light' color='error' label={e?.batchStatus} />
                            )}
                          </TableCell>
                          <TableCell align='center'>
                            <Tooltip title={e.batchMode} componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: "black",
                                  textTransform: "capitalize",
                                  "& .MuiTooltip-arrow": {
                                    color: "black"
                                  }
                                }
                              }
                            }}>
                              {e?.batchMode ? e.batchMode : '-'}
                            </Tooltip></TableCell>
                          {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("update")) &&
                            <TableCell align='center'> <IconButton onClick={() => {
                              setSuspendDialogOpen(true)
                              setBatchId(e?.batchId)
                            }}>
                              <Icon style={{ cursor: "pointer" }} icon="material-symbols:delete-outline" />
                            </IconButton></TableCell>}

                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* dialog for delete batch*/}
            <Dialog fullWidth open={suspendDialogOpen} onClose={() => setSuspendDialogOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
              <Grid container justifyContent="flex-end">
                <Icon
                  className="iconContainer"
                  onClick={() => setSuspendDialogOpen(false)}
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
                </Box>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'right' }}>
                <Button variant='outlined' color='secondary'
                  onClick={() => setSuspendDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant='contained' sx={{ mr: 1.5 }}
                  onClick={() => {
                    setSuspendDialogOpen(false)
                    batchDeleteFunction()
                  }}
                >
                  Delete
                </Button>

              </DialogActions>
            </Dialog>
            {/* dialog for delete batch*/}

            {/* dialog for create new batch*/}
            <Dialog fullWidth open={createBatchDialog} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  <Typography variant='h5' component='span'>
                    Select a new batch !
                  </Typography>
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => {
                    setBatchName([])
                    setCourseName([])
                    setCreateBatchDialog(false)
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid>

              <DialogContent sx={{ pb: 8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Grid container spacing={6}>

                    {activeStep == 0 ? <>
                      <Grid item xs={12} sm={10}>
                        <FormControl fullWidth sx={{ marginLeft: 5 }} >
                          <InputLabel id="demo-multiple-checkbox-label" style={{ width: '350px' }}>Batch name</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            required
                            value={batchName}
                            onChange={handleBatchSelectChange}
                            input={<OutlinedInput label="Batch name" />}
                            renderValue={(selected: any) => selected.join(', ')}

                            MenuProps={MenuProps}
                            style={{ width: '350px' }}
                          >

                            {filteredNewBatchForStudent && filteredNewBatchForStudent.length > 0 ? (
                              filteredNewBatchForStudent.map((name: any) => (
                                <MenuItem key={name.batchId} value={name.batchName} style={{ width: '350px' }} >
                                  <Checkbox checked={batchName?.indexOf(name.batchName) > -1} />
                                  <ListItemText primary={name.batchName} />
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled style={{ width: '350px' }}>
                                No data found
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <AddCircleIcon color='primary' style={{ marginTop: "14px", cursor: "pointer" }} onClick={() => {
                          handleClickBatchDialogOpen()
                        }} />
                      </Grid>
                    </> : <>
                      <Grid item xs={12} sm={10} ml={4}>
                        <FormControl fullWidth required>
                          <InputLabel id="demo-multiple-checkbox-label" style={{ width: '350px' }}>Assign Course</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={courseName}
                            onChange={handleSelectChange}
                            input={<OutlinedInput label="Assign Course" />}
                            renderValue={(selected: any) => selected.join(', ')}
                            MenuProps={MenuProps}
                          >
                            {studentExistingCourse && studentExistingCourse.length > 0 ? (
                              studentExistingCourse.map((name: any) => (
                                <MenuItem key={name.courseId} value={name.courseName} style={{ width: '350px' }}>
                                  <Checkbox checked={courseName?.indexOf(name.courseName) > -1} />
                                  <ListItemText primary={name.courseName} />
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled style={{ width: '350px' }}>
                                <ListItemText primary="No data found" />
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Grid></>
                    }

                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'right' }}>
                <Button variant='outlined' sx={{ mr: 1.5 }}
                  onClick={() => {
                    setActiveStep(0)
                    setCourseName([])
                  }}
                  disabled={activeStep == 0 ? true : false}
                >
                  Back
                </Button>
                <Button variant='contained' sx={{ mr: 1.5 }}
                  onClick={() => {
                    if (activeStep == 0) {
                      setActiveStep(activeStep + 1)
                    } else if (activeStep) {
                      handleAddBatch()
                      setCreateBatchDialog(false)
                      setBatchName([])
                      setCourseName([])
                      setActiveStep(0)
                    }
                  }}
                  disabled={activeStep == 0 ?
                    batchName.length > 0 ? false : true
                    : activeStep == 1 && courseName.length > 0 ? false : true}
                >
                  {activeStep == 0 ? 'Next' : 'Add batch'}
                </Button>


              </DialogActions>
            </Dialog>

            {/* dialog for batch */}
            <Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '600px' } }} open={openBatchDialog}>
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  <Typography variant='h5' component='span'>
                    Add Batch
                  </Typography>
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => { handleBatchDialogClose(); setSubmitted(false) }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid>

              <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>

                <TableContainer>
                  <Grid container spacing={5} mt={1}>
                    <Grid item xs={12} sm={6} >
                      <TextField
                        fullWidth
                        label='Batch name '
                        required
                        placeholder='Morning / Evening Batch'
                        name='batchName'
                        value={batchData.batchName}
                        onChange={changeHandler}
                        autoComplete='OFF'
                        error={submitted ? batchData.batchName ? false : true : false}
                        helperText={submitted && !batchData.batchName ? 'Required,max 50 chars' : ''}
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='batchDescription'
                        required
                        label='Batch description '
                        minRows={2}
                        value={batchData.batchDescription}
                        onChange={changeHandler}
                        autoComplete='OFF'
                        error={submitted ? batchData.batchDescription ? false : true : false}
                        helperText={submitted && !batchData.batchDescription ? 'Required,max 500 chars' : ''}
                        inputProps={{
                          maxLength: 500,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch duration</InputLabel>
                        <Select
                          required
                          label='Do You Want To Set batch duration'
                          name='Do You Want To Set batch duration'
                          id='stepper-custom-vertical-personal-select'
                          value={toSetTime}
                          onChange={(e: any) => { setToSetTime(e.target.value) }}
                          labelId='stepper-custom-vertical-personal-select-label'
                        >
                          <MenuItem value={'yes'}>Yes</MenuItem>
                          <MenuItem value={'no'}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch date</InputLabel>
                        <Select
                          required
                          label='Do you want to set batch date '
                          name='Do You Want To Set  batch Date '
                          id='stepper-custom-vertical-personal-select'
                          value={toSetDate}
                          onChange={(e: any) => { setToSetDate(e.target.value) }}
                          labelId='stepper-custom-vertical-personal-select-label'
                        >
                          <MenuItem value={'yes'}>Yes</MenuItem>
                          <MenuItem value={'no'}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {toSetTime == 'yes' &&
                      <>
                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              showTimeSelect
                              required
                              selected={startTime}
                              timeIntervals={15}
                              showTimeSelectOnly
                              popperPlacement={popperPlacement}
                              name='batchClassStartTime'
                              placeholderText='4:00 PM'
                              dateFormat='h:mm aa'
                              id='time-only-picker'
                              onChange={(date: Date) => handleStartTimeChange(date)}
                              customInput={<CustomInput
                                error={submitted ? startTime ? false : true : false}
                                helperText={submitted && !startTime ? 'Batch class start time is required' : ''}
                                label='Batch class start time' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.');
                                }} />}
                            />
                          </DatePickerWrapper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              showTimeSelect
                              required
                              selected={endTime}
                              timeIntervals={15}
                              showTimeSelectOnly
                              popperPlacement={popperPlacement}
                              name='batchClassEndTime'
                              placeholderText='8:00 PM'
                              dateFormat='h:mm aa'
                              id='time-only-picker'
                              onChange={(date: Date) => handleEndTimeChange(date)}
                              customInput={<CustomInput
                                error={submitted ? endTime ? false : true : false}
                                helperText={submitted && !endTime ? 'Batch class end time is required' : ''}
                                label='Batch class end time' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.');
                                }} />}
                            />
                          </DatePickerWrapper>
                        </Grid>

                      </>}

                    {toSetDate == 'yes' &&
                      <>
                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              selected={startDate}
                              id='basic-input'
                              required
                              popperPlacement={popperPlacement}
                              onChange={(date: Date) => setStartDate(date)}
                              maxDate={endDate || null}
                              placeholderText='Batch Start Date'
                              customInput={<CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                error={submitted ? startDate ? false : true : false}
                                helperText={submitted && !startDate ? 'Batch start date is required' : ''}
                                label='Batch start date ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.');
                                }} />}
                            />
                          </DatePickerWrapper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              selected={endDate}
                              id='basic-input'
                              required
                              popperPlacement={popperPlacement}
                              onChange={(date: Date) => setEndDate(date)}
                              minDate={startDate || null}
                              placeholderText='Batch End Date'

                              customInput={<CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                error={submitted ? endDate ? false : true : false}
                                helperText={submitted && !endDate ? 'Batch end date is required' : ''}
                                label='Batch end date ' value={undefined} onChange={function (event: ChangeEvent<Element>): void {
                                  throw new Error('Function not implemented.');
                                }} />}
                            />
                          </DatePickerWrapper>
                        </Grid>
                      </>}

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={submitted ? batchData.batchMode ? false : true : false}
                      >
                        <InputLabel id='stepper-custom-vertical-personal-select-label'>Batch mode  </InputLabel>
                        <Select
                          label='Batch Mode '
                          name='batchMode'
                          id='stepper-custom-vertical-personal-select'
                          value={batchData.batchMode}
                          onChange={changeHandler}
                          required

                          labelId='stepper-custom-vertical-personal-select-label'
                        >
                          <MenuItem value={'online'}>Online</MenuItem>
                          <MenuItem value={'offline'}>Offline</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </TableContainer>

              </DialogContent>
              <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
                <Box className='demo-space-x'>
                  <Button size='large' color='secondary' variant='outlined' onClick={() => { handleBatchDialogClose(); setSubmitted(false) }}>
                    Cancel
                  </Button>
                  <Button size='large' type='submit' variant='contained' onClick={() => { createBatchSubmit(); setSubmitted(true) }}  >
                    Submit
                  </Button>

                </Box>
              </DialogActions>
            </Dialog>
            {/* dialog for create new batch*/}
          </Grid>
        </Grid>
      </Box >

      {/* Snackbar */}
      {
        open.open && (
          <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
            <Alert
              variant="filled"
              elevation={3}
              onClose={handleClose}
              severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
            >
              {open.mssg}
            </Alert>
          </Snackbar>
        )
      }

    </>
  )

}
export default InvoiceListTable
