// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'
import RefreshIcon from '@mui/icons-material/Refresh';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import TablePagination from '@mui/material/TablePagination';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import "bootstrap/dist/css/bootstrap.css";
import { dummyData } from 'src/pages/user-management/roles/RolesCard'
import { Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form'
import { z, ZodType } from 'zod';
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import AddIcon from '@mui/icons-material/Add';

// router

import { DeleteOrgCourse, listOrganizationCourse, UpdateOrgCourse, createCourse } from 'src/store/APIs/Api'
import { InputLabel, MenuItem, Select } from '@mui/material'

import Router from 'next/router'


const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Courses" && (obj?.action?.includes("create") || obj?.action?.includes("read")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}


interface CardDataType {
  title: string
  totalUsers: number
  avatars: { src: string; name: string }[]
}

// const dummyData = [
//   {
//     name: 'lorem lorem',
//     role: 'role',
//     handleUser: 'yes/no'
//   },
//   {
//     name: 'lorem lorem',
//     role: 'role',
//     handleUser: 'yes/no'
//   },
//   {
//     name: 'lorem lorem',
//     role: 'role',
//     handleUser: 'yes/no'
//   },
//   {
//     name: 'lorem lorem',
//     role: 'role',
//     handleUser: 'yes/no'
//   }
// ]


const rolesArr: string[] = [
  'Dashboard',
  'Student Management',
  'Employee Management',
  'Entity Management',
]



const ListCourses = (props: any) => {
  // ** States
  const [status, setStatus] = useState('delete');
  const [value, setValue] = useState('InActive');
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<any>(false)
  const [selectedCourseId, setSelectedCourseId] = useState<any>()
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [updateCourseDetails, setUpdateCourseDetails] = useState({
    courseId: '',
    courseName: "",
    courseDescription: "",
    courseFee: null
    , courseFeeDescription: "",
    maxPaymentInstallment: 2,
    courseDuration: null

  });
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseDescription: "",
    courseFee: null,
    courseFeeDescription: "",
    maxPaymentInstallment: 2,
    courseDuration: null
  });

  //start CourseCard 
  const { setListApiStatus, listApiStatus, setEditBatch, setGetBatchId } = props


  const [user, setUser] = useState<any>()
  const [permission, setPermission] = useState<any>()
  const [courseList, setCourseList] = useState<any>([])
  const [disc, setDisc] = useState<any>()
  const [deleteBatchPopup, setDeleteBatchPopup] = useState<boolean>(false)
  const [batchStatus, setBatchStatus] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [open, setOpen] = useState<any>(false)
  const [page, setPage] = useState(0);
  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter()
  const dispatch = useDispatch();


  const tooltip = (
    <Tooltip title="Tooltip Title">
      {disc}
    </Tooltip>
  );
  const [loading, setLoading] = useState(true);

  // ## hover end



  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

  }, [])



  useEffect(() => {
    if (courseList || user) {
      listCourseApiCall(organizationId, customerId)
      // setListApiStatus(false)
    }
  }, [user])


  const listCourseApiCall = (organizationId: any, customerId: any) => {

    dispatch(listOrganizationCourse({ organizationId: organizationId, customerId: customerId })).then((res: { payload: { data: any } }) => {

      if (res?.payload?.data?.data.length >= 0) {
        setCourseList(res?.payload?.data?.data);
        setLoading(false)
      }
      else {
        setLoading(false)
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const organization = localStorage.getItem('organization');
    if (organization) {
      setCustomerId(JSON.parse(organization).customerId);
      setOrganizationId(JSON.parse(organization).organizationId);
      listCourseApiCall(JSON.parse(organization).organizationId, JSON.parse(organization).customerId)

    }

  }, [])



  // End CourseCard


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
  }, [user])




  // ** Hook
  const theme = useTheme()
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
    setCourseDetails({
      ...courseDetails, "courseDescription": '',
      "courseFee": null,
      "courseName": '',
      "courseFeeDescription": "",
      "maxPaymentInstallment": 2,
      "courseDuration": null
    });
  }

  const updatecall = (item: any) => {
    setUpdateCourseDetails({
      ...updateCourseDetails,
      "courseId": item.courseId,
      "courseDescription": item.courseDescription,
      "courseFee": item.courseFee,
      "courseName": item.courseName,
      "courseFeeDescription": item.courseFeeDescription,
      "maxPaymentInstallment": item.maxPaymentInstallment,
      "courseDuration": item.courseDuration
    });
  }

  const updateFormSubmit = () => {
    setFormUpdateButton(false)
    const organization = localStorage.getItem('organization');
    if (organization) {
      const object =
      {
        customerId: customerId,
        organizationId: organizationId,
        courseId: updateCourseDetails.courseId,
        course: {
          courseName: updateCourseDetails.courseName,
          courseDescription: updateCourseDetails.courseDescription,
          courseFee: updateCourseDetails.courseFee,
          courseFeeDescription: updateCourseDetails.courseFeeDescription,
          maxPaymentInstallment: updateCourseDetails.maxPaymentInstallment

        }
      }
      if (object.course.courseName !== '' && object.course.courseFee != null && object.course.courseFee > 0 && object.course.courseFeeDescription) {
        UpdateOrgCourse({ organizationId: organizationId, customerId: customerId, courseDetails: updateCourseDetails, courseId: updateCourseDetails.courseId, courseName: updateCourseDetails.courseName, courseDescription: updateCourseDetails.courseDescription, courseFee: updateCourseDetails.courseFee, courseFeeDescription: updateCourseDetails.courseFeeDescription, maxPaymentInstallment: updateCourseDetails.maxPaymentInstallment, courseDuration: updateCourseDetails.courseDuration }).then((res: any) => {
          bringCourseList(organizationId, customerId);
          setSnackbarColor(true)
          setSnackbaropen(true)
          setResponseMessage("Course is successfully updated")
          setSubmitted(false)
        }).catch((err: any) => console.log(err));
        setUpdateCourseDetails({
          ...updateCourseDetails,
          "courseId": '',
          "courseDescription": '',
          "courseFee": null,
          "courseName": '',
          "courseFeeDescription": "",
          "maxPaymentInstallment": 2,
          "courseDuration": null
        });
        handleClose();
      }

      else if (object.course.courseFee != null && object.course.courseFee < 0) {
        setSnackbarColor(false);
        setResponseMessage("Course fee must be a positive number");
        setSnackbaropen(true);
      }
      else {
        setSnackbarColor(false)
        setSnackbaropen(true)
        setResponseMessage("Fill all the required information")
      }
    }
  }
  const formSubmit = () => {

    const organization = localStorage.getItem('organization');
    if (organization) {
      if (courseDetails.courseName !== '' && courseDetails.courseFee != null && courseDetails.courseFee > 0 && courseDetails.courseFeeDescription) {
        const existingCourse = courseList.find((course: any) => course.courseName === courseDetails.courseName);

        if (existingCourse) {
          setSnackbarColor(false);
          setResponseMessage("A course with the same name already exists");
          setSnackbaropen(true);
        }

        else {
          createCourse({ id: organizationId, customerId: customerId, courseDetails: courseDetails }).then((res: any) => {
            bringCourseList(organizationId, customerId);
            setSnackbarColor(true)
            setSnackbaropen(true)
            setResponseMessage("New course added successfully")
            setSubmitted(false)
            setCourseDetails({
              ...courseDetails, "courseDescription": '',
              "courseFee": null,
              "courseName": '',
              "courseFeeDescription": "",
              "maxPaymentInstallment": 2,
              "courseDuration": null
            });

            handleClose();
          }).catch((err: any) => console.log(err));
        }
      }
      else if (courseDetails.courseFee != null && courseDetails.courseFee < 0) {
        setSnackbarColor(false);
        setResponseMessage("Course fee must be a positive number");
        setSnackbaropen(true);
      }
      else {
        setSnackbarColor(false)
        setResponseMessage("Fill all the required information")
        setSnackbaropen(true)

      }
    }
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const courseChangeHandler: any = (e: { target: { name: any; value: any; }; }) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value })
  }

  const courseUpdateChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setUpdateCourseDetails({ ...updateCourseDetails, [e.target.name]: e.target.value })
  }
  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
    }
  }

  const handleDelete = (courseId: any) => {
    dispatch(DeleteOrgCourse({ id: customerId, organizationId: organizationId, courseId: courseId, status: status })).then((res: any) => {
      bringCourseList(organizationId, customerId);
    }).catch((err: any) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const bringCourseList = (organizationId: any, customerId: any) => {

    dispatch(listOrganizationCourse({ organizationId: organizationId, customerId: customerId })).then((res: { payload: { data: any } }) => {

      if (res?.payload?.data?.data.length >= 0) {
        setCourseList(res?.payload?.data?.data);
        setLoading(false)
      }
      else {
        setLoading(false)
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const organization = localStorage.getItem('organization');
    if (organization) {
      setCustomerId(JSON.parse(organization).customerId);
      setOrganizationId(JSON.parse(organization).organizationId);
      bringCourseList(JSON.parse(organization).organizationId, JSON.parse(organization).customerId)

    }

  }, [])

  const handleDeleteDialogOpen = (courseId: any) => {
    setSuspendDialogOpen(true);
    setSelectedCourseId(courseId);
  };


  const renderCards = () =>
    courseList?.map((item: any, index: number) => (
      <Grid item sx={{ width: '300px' }} key={index}>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(5)} !important`, display: "flex", justifyContent: 'space-between' }}>
            <Box >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'text.secondary' }}>{`Fee ${parseFloat(item.courseFee).toLocaleString('en-UK')} `}</Typography>

              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  {item.courseName}
                </Typography>

              </Box>
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
              {permission?.some((obj: any) => obj?.title === "Courses" && obj?.action?.includes("update")) &&
                <Button
                  sx={{ padding: '0px !important', minWidth: '40px !important' }}
                  href='/'

                  component={Link}

                  onClick={e => {
                    e.preventDefault()
                    handleClickOpen()
                    updatecall(item)
                    setDialogTitle('Edit')
                  }}
                  className='edit'
                >
                  <Icon icon='bx:pencil' />
                </Button>}
              {permission?.some((obj: any) => obj?.title === "Courses" && obj?.action?.includes("delete")) &&
                <Button sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => handleDeleteDialogOpen(item.courseId)} className='delete'>
                  <Icon icon='ic:baseline-delete' />
                </Button>}
            </Box>

          </CardContent>
          <Dialog fullWidth open={suspendDialogOpen}
            onClose={() => setSuspendDialogOpen(false)}
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
          >
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
            </Grid>
            <DialogContent sx={{ pb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                  <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                  <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                    Are you sure?
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>You won't be able to revert course!</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'right' }}>
              {permission?.some((obj: any) => obj?.title === "Courses" && obj?.action?.includes("delete")) &&
                <Button variant='outlined' sx={{ mr: 1.5 }}
                  onClick={() => setSuspendDialogOpen(false)}
                >
                  Cancel
                </Button>}
              <Button variant='contained' sx={{ mr: 1.5 }}
                onClick={() => {
                  setSuspendDialogOpen(false);
                  handleDelete(selectedCourseId);
                  setSnackbarColor(true)
                  setResponseMessage("Course is deleted successfully")
                  setSnackbaropen(true)

                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid >
    ))

  return (

    <Grid container spacing={6} className='match-height'>

      <Error404Component permission={permission} />

      <Grid item xs={12} sx={{ display: 'flex' }} >

        <Card
          sx={{ width: '100%' }}

        >
          <Grid sx={{ height: '100%', paddingY: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <Button className='refresh' onClick={() => {
              setLoading(true)
              bringCourseList(organizationId, customerId)
            }}>
              <RefreshIcon />
            </Button>
            <Grid sx={{ paddingRight: '30px' }}>
              {permission?.some((obj: any) => obj?.title === "Courses" && obj?.action?.includes("create")) &&

                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add course <div style={{ paddingLeft: '5px', paddingTop: '2px' }}>
                      <Icon icon="bxs:book-bookmark" />
                    </div>

                  </Button>

                </Box>
              }
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <br />
      <Dialog fullWidth maxWidth='md' scroll='body' open={open}>
        {dialogTitle == 'Edit' ? <>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              <Typography variant='h5' component='span'>
                {`${dialogTitle} Course`}
              </Typography>
            </DialogTitle>
            <Icon
              className="iconContainer"
              onClick={() => {
                handleClose();
                setFormUpdateButton(false);
                setSubmitted(false)
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

          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <TableContainer>
              <Grid container spacing={5} mt={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label='Course name'
                    placeholder='HTML,CSS,back-end...'
                    value={updateCourseDetails.courseName}

                    name='courseName'
                    onChange={(event) => {
                      courseUpdateChangeHandler(event);
                      setFormUpdateButton(true);
                    }}
                    error={submitted ? updateCourseDetails.courseName ? false : true : false}
                    helperText={submitted && !updateCourseDetails.courseName ? 'Required,max 50 chars' : ''}
                    inputProps={{
                      maxLength: 50,
                    }}

                  />
                </Grid>
                {updateCourseDetails.courseDuration}
                <Grid item xs={12} sm={6}>

                  <FormControl fullWidth>
                    <InputLabel id='stepper-custom-vertical-personal-select-label'>Course duration  </InputLabel>
                    <Select
                      required
                      label='Max Installment'
                      value={updateCourseDetails.courseDuration}
                      name='courseDuration'
                      id='stepper-custom-vertical-personal-select'
                      onChange={(event) => {
                        courseUpdateChangeHandler(event);
                        setFormUpdateButton(true);
                      }}

                      labelId='stepper-custom-vertical-personal-select-label'
                    >
                      <MenuItem value={1}>1 months</MenuItem>
                      <MenuItem value={3}>3 months</MenuItem>
                      <MenuItem value={6}>6 months</MenuItem>
                      <MenuItem value={9}>9 months</MenuItem>
                      <MenuItem value={12}>1 year</MenuItem>
                      <MenuItem value={24}>2 year</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name='courseDescription'
                    label='Course description'
                    value={updateCourseDetails.courseDescription}
                    error={submitted ? updateCourseDetails.courseDescription ? false : true : false}
                    helperText={submitted && !updateCourseDetails.courseDescription ? 'Required,max 50 chars' : ''}
                    onChange={(event) => {
                      courseUpdateChangeHandler(event);
                      setFormUpdateButton(true);
                    }}

                    minRows={2}
                    inputProps={{
                      maxLength: 500,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        display: 'none'
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }}
                    required
                    fullWidth
                    type="number"
                    label='Course fee'
                    placeholder='20000...'
                    value={updateCourseDetails.courseFee}
                    name='courseFee'
                    error={submitted ? updateCourseDetails.courseFee ? false : true : false}
                    helperText={submitted && !updateCourseDetails.courseFee ? 'Required,value must be a positive number' : ''}
                    onChange={(event) => {
                      courseUpdateChangeHandler(event);
                      setFormUpdateButton(true);
                    }}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='stepper-custom-vertical-personal-select-label'>Max installments </InputLabel>
                    <Select
                      label='Max Installment'
                      value={updateCourseDetails.maxPaymentInstallment}
                      name='maxPaymentInstallment'
                      id='stepper-custom-vertical-personal-select'
                      onChange={(event) => {
                        courseUpdateChangeHandler(event);
                        setFormUpdateButton(true);
                      }}
                      labelId='stepper-custom-vertical-personal-select-label'
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={13}>13</MenuItem>
                      <MenuItem value={14}>14</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name='courseFeeDescription'
                    label='Course fee description'
                    value={updateCourseDetails.courseFeeDescription}
                    error={submitted ? updateCourseDetails.courseFeeDescription ? false : true : false}
                    helperText={submitted && !updateCourseDetails.courseFeeDescription ? 'Required,max 500 chars' : ''}
                    onChange={(event) => {
                      courseUpdateChangeHandler(event);
                      setFormUpdateButton(true);
                    }}
                    minRows={2}
                    inputProps={{
                      maxLength: 500
                    }}
                  />
                </Grid>
              </Grid>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
            <Box className='demo-space-x'>
              <Button size='large' color='secondary' variant='outlined' onClick={() => {
                handleClose();
                setFormUpdateButton(false);
                setSubmitted(false)
              }}>
                Cancel
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={() => { updateFormSubmit(); setSubmitted(true) }} disabled={!formUpdateButton} >
                Update
              </Button>

            </Box>
          </DialogActions>

        </>
          : <>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
              <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                <Typography variant='h5' component='span'>
                  {`${dialogTitle} Course`}
                </Typography>
              </DialogTitle>
              <Icon
                className="iconContainer"
                onClick={() => { handleClose(); setSubmitted(false) }}
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
                <Grid container spacing={5} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label='Course name '
                      placeholder='HTML,CSS,back-end...'
                      value={courseDetails.courseName}
                      name='courseName'
                      onChange={courseChangeHandler}
                      inputProps={{
                        maxLength: 50,
                      }}
                      error={submitted ? courseDetails.courseName ? false : true : false}
                      helperText={submitted && !courseDetails.courseName ? 'Required,max 50 chars' : ''}
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={submitted ? courseDetails.courseDuration ? false : true : false}>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Course duration </InputLabel>
                      <Select

                        // required
                        placeholder='Course duration'
                        label='Course duration '
                        value={courseDetails.courseDuration}
                        name='courseDuration'
                        id='stepper-custom-vertical-personal-select'
                        onChange={courseChangeHandler}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={1}>1 months</MenuItem>
                        <MenuItem value={3}>3 months</MenuItem>
                        <MenuItem value={6}>6 months</MenuItem>
                        <MenuItem value={9}>9 months</MenuItem>
                        <MenuItem value={12}>1 year</MenuItem>
                        <MenuItem value={24}>2 year</MenuItem>


                      </Select>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name='courseDescription'
                      label='Course description '
                      placeholder='Course description '
                      required
                      value={courseDetails.courseDescription}
                      onChange={courseChangeHandler}
                      minRows={2}
                      inputProps={{
                        maxLength: 500,
                      }}
                      error={submitted ? courseDetails.courseDescription ? false : true : false}
                      helperText={submitted && !courseDetails.courseDescription ? 'Required,max 500 chars' : ''}
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label='Course fee '
                      placeholder='20000...'
                      value={courseDetails.courseFee}
                      name='courseFee'
                      onChange={courseChangeHandler}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,
                      }}
                      error={submitted ? courseDetails.courseFee ? false : true : false}
                      helperText={submitted && !courseDetails.courseFee ? 'Course fee must be a positive number' : ''}
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Max Installments </InputLabel>
                      <Select
                        sx={{ height: '50%' }}
                        required
                        label='Max installment '
                        value={courseDetails.maxPaymentInstallment}
                        name='maxPaymentInstallment'
                        id='stepper-custom-vertical-personal-select'
                        onChange={courseChangeHandler}
                        labelId='stepper-custom-vertical-personal-select-label'

                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth

                      required
                      name='courseFeeDescription'
                      label='Course fee description '
                      placeholder='Course fee description '
                      value={courseDetails.courseFeeDescription}
                      onChange={courseChangeHandler}
                      minRows={2}
                      inputProps={{
                        maxLength: 500,
                      }}
                      error={submitted ? courseDetails.courseFeeDescription ? false : true : false}
                      helperText={submitted && !courseDetails.courseFeeDescription ? 'Required,max 500 chars' : ''}
                    />

                  </Grid>
                </Grid>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
              <Box className='demo-space-x'>
                <Button size='large' color='secondary' variant='outlined' onClick={() => { handleClose(); setSubmitted(false) }}>
                  Cancel
                </Button>
                <Button size='large' onClick={() => { formSubmit(); setSubmitted(true) }} variant='contained'>
                  Submit
                </Button>
              </Box>
            </DialogActions>
          </>
        }
      </Dialog>
      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
      <Grid item xs={12} sx={{ display: 'flex' }}>
        <TableContainer sx={{ pb: 3, background: "#fff" }}>

          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Fee</TableCell>
                <TableCell>Fee Description</TableCell>
                <TableCell>Course Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                loading ?
                  dummyData.map((val: any, index: number) => {


                    <TableRow
                      key={val.courseName}
                      sx={{
                        '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` },
                        cursor: 'pointer',
                        '&:hover': {
                          background: '#F5F5F9'
                        }
                      }}
                    >
                      <TableCell>
                        <OverlayTrigger placement="top" overlay={tooltip} >

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Skeleton>
                                <Typography noWrap sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </Box>
                        </OverlayTrigger>

                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex' }}>
                          <Skeleton>
                            <Typography variant='body2' sx={{ fontWeight: 500 }}>
                              Lorem, ipsum.
                            </Typography>
                          </Skeleton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex' }}>
                          <Skeleton>
                            <Typography variant='body2' sx={{ fontWeight: 500 }}>
                              Lorem, ipsum.
                            </Typography>
                          </Skeleton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Skeleton>
                          Lorem, ipsum.
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton>
                          Lorem, ipsum.
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                  })
                  :
                  courseList?.length ? courseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row: any) => {
                    return (

                      <TableRow

                        key={row.courseName}
                        sx={{
                          '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` },
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#F5F5F9'
                          }
                        }}
                      >
                        <TableCell>
                          <div className="custom-tooltip" title={row.courseName.charAt(0).toUpperCase() + row.courseName.slice(1)}>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {row.src ? (
                                <CustomAvatar src={row.src} alt={row.courseName} sx={{ width: 38, height: 38, mr: 3 }} />
                              ) : (
                                <CustomAvatar
                                  skin='light'
                                  color='primary'
                                  sx={{ mr: 3, width: 38, height: 38, fontWeight: 600, fontSize: '1rem' }}
                                >
                                  {getInitials(row.courseName.charAt(0).toUpperCase())}
                                </CustomAvatar>
                              )}
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography noWrap sx={{ fontWeight: 500 }}>
                                  {row.courseName.charAt(0).toUpperCase() + row.courseName.slice(1)}
                                </Typography>
                              </Box>
                            </Box>
                          </div>

                        </TableCell>
                        <TableCell>
                          <div className="custom-tooltip" title={row.courseFee}
                          >
                            <Box sx={{ display: 'flex' }}>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                {row.courseFee}
                              </Typography>
                            </Box>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="custom-tooltip" title={row.courseFeeDescription}
                          >
                            <Box sx={{ display: 'flex' }}>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                {row.courseFeeDescription}
                              </Typography>
                            </Box>
                          </div>
                        </TableCell>
                        <TableCell>

                          <div className="custom-tooltip" title={row.courseDescription}>
                            <Box sx={{ display: 'flex' }}>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                {row.courseDescription}
                              </Typography>
                            </Box>
                          </div>

                        </TableCell>

                        <TableCell>
                          {
                            row.courseStatus == 'active' ?
                              <CustomChip rounded size='small' skin='light' color='success' label={row.courseStatus} />
                              :
                              <CustomChip rounded size='small' skin='light' color='error' label={row.courseStatus} />
                          }
                        </TableCell>

                      </TableRow>
                    )
                  }) : <div style={{ width: "420%", display: "flex", justifyContent: "center", textAlign: "center", paddingTop: "20px" }}>
                    No data found</div>}
            </TableBody>
            <TablePagination
              sx={{ marginBottom: '0px' }}
              count={courseList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => {
                setPage(newPage);
              }}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Table>
        </TableContainer>
      </Grid>
    </Grid >
  )
}

export default ListCourses