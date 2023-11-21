import { useRouter } from 'next/router'
import ListEnquiry from './listEnquiry'
import EnquiryTable from './EnquiryTable'
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider'
import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeColor } from 'src/@core/layouts/types';
import CustomChip from 'src/@core/components/mui/chip';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getInitials } from 'src/@core/utils/get-initials';
import CustomAvatar from 'src/@core/components/mui/avatar';
import DialogContentText from '@mui/material/DialogContentText';
import { updateEnquiry, getSingleEnquiry } from 'src/store/APIs/Api';
import { Card, Grid, CardContent, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, CardActions, TextField, Skeleton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EnquiryFeedback from './EnquiryFeedback';


interface ColorsType {
  [key: string]: ThemeColor
}


const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const ViewSingleEnquiry = () => {
  const router = useRouter()
  const id = router.query.id
  const [name, setName] = useState('')
  const [user, setUser] = useState<any>()
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [lastName, setLastName] = useState('')
  const [permission, setPermission] = useState<any>()
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [studentData, setStudentData] = useState<any>({})
  const [updataionData, setUpdationData] = useState<any>({})
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [followUp, setFollowUp] = useState<any>([])
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

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
    setUpdationData({ ...updataionData, followUp: followUp })

  }, [followUp])


  const deleteEnquiry = () => {

    updateEnquiry(updataionData).then((res) => {
      router.back()
    })
  }

  const updationCall = () => {
    setFormUpdateButton(false)
    setLoading(true)
    // if (name && lastName && updataionData?.mobileNumber && updataionData?.email && updataionData?.enquiryCourse && updataionData?.courseDescription) {
    updateEnquiry(updataionData).then((res: any) => {
      getSingleEnquiry({ id: router.query.id }).then((res: any) => {
        setName(res?.data?.dataArray?.studentName?.split(" ")[0]); setLastName(res?.data?.dataArray?.studentName?.split(" ")[res?.data?.dataArray?.studentName?.split(" ").length - 1]); setStudentData(res.data.dataArray); setFollowUp(res.data.dataArray.followUp); setUpdationData(res.data.dataArray)
        setLoading(false)
      })
      if (!updataionData.hasOwnProperty('studentName')) {
        updataionData.studentName = studentData?.studentName;
        setStudentData(studentData);
      }
    })
  }

  const enquiyStatusUpdation = (data: any) => {

    const updationVaue = {
      ...updataionData,
      "followUp": data
    }

    updateEnquiry(updationVaue).then((res: any) => {
      getSingleEnquiry({ id: router.query.id }).then((res: any) => {
        setName(res?.data?.dataArray?.studentName?.split(" ")[0]); setLastName(res?.data?.dataArray?.studentName?.split(" ")[res?.data?.dataArray?.studentName?.split(" ").length - 1]); setStudentData(res.data.dataArray); setFollowUp(res.data.dataArray.followUp); setUpdationData(res.data.dataArray)
        setLoading(false)
      })
      if (!updataionData.hasOwnProperty('studentName')) {
        updataionData.studentName = studentData?.studentName;
        setStudentData(studentData);
      }
    })
  }


  useEffect(() => {
    setUpdationData({
      ...updataionData, studentName: `${name} ${lastName}`
    })
  }, [name, lastName])



  useEffect(() => {
    getSingleEnquiry({ id: router.query.id }).then((res: any) => {
      setName(res?.data?.dataArray?.studentName?.split(" ")[0]); setLastName(res?.data?.dataArray?.studentName?.split(" ")[res?.data?.dataArray?.studentName?.split(" ").length - 1]); setStudentData(res.data.dataArray); setUpdationData(res.data.dataArray); setLoading(false)
    })
  }, [router.query])


  return (
    <>
      <Grid container spacing={10} className='enquirylistpage'>
        <Grid item xs={4} className='enquirylistpagecard'>
          <Card>
            <Button onClick={() => router.push('/enquiry/listEnquiry/')} sx={{ marginTop: 2, ml: 2 }} variant='outlined'>&#8592; Enquiry List</Button>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={'primary' as ThemeColor}
                sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
              >
                {studentData?.studentName ? studentData.studentName.charAt(0).toUpperCase() : 'J'}
              </CustomAvatar>
            </CardContent>
            {
              !loading &&
              <>
                <Box onClick={() => { localStorage.setItem('enquiryStudent', JSON.stringify(studentData)); router.push('/student/studentAdmission/') }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                  <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
                    <Button variant='contained'>
                      Set as Student
                    </Button>
                  </Typography>
                </Box>
              </>
            }

            <CardContent >
              {/*
                <Typography variant='h6' sx={{ pl: 7 }}>Details</Typography> */}
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("update")) &&
                  <Button className='edit' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => setOpen(true)} ><Icon
                    cursor="pointer"
                    icon='bx:pencil' /></Button>
                }
                {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("delete")) &&
                  <Button className='delete' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => { setDeleteAlert(true); setUpdationData({ ...updataionData, status: "inActive" }) }}>   <Icon cursor="pointer" icon='ic:baseline-delete' />
                  </Button>

                }
              </div>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important`, pt: 3 }} />
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Personal Details" value="1" />
                    <Tab label="College Details" value="2" />
                    {/* <Tab label="Item Three" value="3" /> */}
                  </TabList>
                </Box>
                <Box sx={{ pt: 5 }}>
                  <TabPanel value="1" >
                    <Box >
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Student:</Typography>
                        {
                          loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                            : <Typography sx={{ color: 'text.secondary' }}>{updataionData?.studentName || studentData?.studentName}</Typography>
                        }
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                        {
                          loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum 9900909009</Typography></Skeleton>
                            : <Typography sx={{ color: 'text.secondary' }}>{studentData ? studentData.email : ''}</Typography>
                        }
                      </Box>

                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Enquiry course:</Typography>
                        {
                          loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                            : <Typography sx={{ color: 'text.secondary' }}>{studentData ? studentData.enquiryCourse : ''}</Typography>
                        }
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label={studentData?.status ? studentData.status : 'null'}
                          sx={{ fontWeight: 500 }}
                          color={statusColors[studentData?.status]}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact No:</Typography>
                        {
                          loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                            : <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{studentData?.mobileNumber ? studentData.mobileNumber : ''}</Typography>
                        }
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>College:</Typography>
                      {
                        loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                          : <Typography sx={{ color: 'text.secondary' }}>{studentData?.college ? studentData.college : ''}</Typography>
                      }
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Semester:</Typography>
                      {
                        loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                          : <Typography sx={{ color: 'text.secondary' }}>{studentData?.semester ? studentData.semester : ''}</Typography>
                      }
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>College Department:</Typography>
                      {
                        loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                          : <Typography sx={{ color: 'text.secondary' }}>{studentData?.collegeDepartment ? studentData.collegeDepartment : ''}</Typography>
                      }
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>College Course:</Typography>
                      {
                        loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                          : <Typography sx={{ color: 'text.secondary' }}>{studentData?.collegeCourse ? studentData.collegeCourse : ''}</Typography>
                      }
                    </Box>
                  </TabPanel>
                </Box>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
              </TabContext>

            </CardContent>
            {/* <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("update")) &&
                <Button variant='contained' onClick={() => setOpen(true)} >Edit</Button>}
              {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("delete")) &&
                <Button sx={{ color: 'red' }} variant='outlined' onClick={() => { setDeleteAlert(true); setUpdationData({ ...updataionData, status: "inActive" }) }}>Delete</Button>}
            </CardActions> */}
          </Card>
        </Grid>
        {
          studentData?.followUp &&
          <Grid item xs={8} className='enquirylistpagecard'>
            <EnquiryFeedback followUp={studentData.followUp} setFollowUp={setFollowUp} updationCall={enquiyStatusUpdation} />
          </Grid>
        }

        <Grid item xs={studentData?.followUp ? 12 : 8} className='enquirylistpagecard'>

          <ListEnquiry />
        </Grid>
      </Grid >
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: 'center' }}
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>Update Enquiry</DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => { setOpen(false); setFormUpdateButton(false) }}
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
          <Box>
            <Grid container spacing={1}  >
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                <TextField
                  fullWidth
                  name="name"
                  required
                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => { setName(e.target.value); setFormUpdateButton(true) }}
                  value={name}
                  label='Name'
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updataionData.status}
                    label="Status"
                    onChange={(e: any) => {
                      setFormUpdateButton(true)
                      setUpdationData({
                        ...updataionData, "status": e.target.value
                      })
                    }}
                  >
                    <MenuItem value={"active"}>Active</MenuItem>
                    <MenuItem value={"in active"}>In active</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  name="lastName"
                  required
                  onChange={(e) => { setLastName(e.target.value); setFormUpdateButton(true) }}
                  value={lastName}
                  label='Last name'
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  sx={{
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      display: 'none'
                    },
                    '& input[type=number]': {
                      MozAppearance: 'textfield'
                    }
                  }}
                  type='number'
                  label='Mobile number'
                  name="mobileNumber"
                  required
                  error={updataionData?.mobileNumber?.length > 13}

                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, mobileNumber: e.target.value

                    }); setFormUpdateButton(true)
                  }}
                  value={updataionData?.mobileNumber}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  required
                  name="email"
                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, email: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updataionData?.email}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  type='string'
                  label="Parent/Guardian's name"
                  name="parentName"

                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, parentName: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updataionData?.parentName}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  sx={{
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      display: 'none'
                    },
                    '& input[type=number]': {
                      MozAppearance: 'textfield'
                    }
                  }}
                  fullWidth
                  type='number'
                  label="Parent/Guardian's contact"
                  name="parentContact"

                  error={studentData?.mobileNumber?.length > 13}
                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, parentContact: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updataionData?.parentContact}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1}  >
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                <TextField
                  fullWidth
                  name='college'
                  value={updataionData?.college}

                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, college: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  label='College name'
                  inputProps={{
                    maxLength: 100,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  label='College department'
                  name='collegeDepartment'
                  value={updataionData?.collegeDepartment}

                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, collegeDepartment: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  label='Semester'
                  name='semester'
                  value={updataionData?.semester}

                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, semester: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    max: 50,
                    min: 0
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  label='College course'
                  name='collegeCourse'
                  value={updataionData?.collegeCourse}

                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, collegeCourse: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  label='Enquiry course'
                  name='collegeCourse'
                  value={updataionData?.enquiryCourse}
                  required
                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, enquiryCourse: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid><Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  label='Enquiry course description'
                  name='collegeCourse'
                  value={updataionData?.courseDescription}
                  required
                  onChange={(e) => {
                    setUpdationData({
                      ...updataionData, courseDescription: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ textAlign: 'center', alignItems: 'right', justifyContent: 'right' }}>
          {
            loading ? <>
              <Button disabled={true} variant='outlined' onClick={() => { setOpen(false); setFormUpdateButton(false) }}>Discard</Button>
              <Button variant='contained' onClick={() => { updationCall(); setOpen(false) }} disabled={!formUpdateButton}>Update</Button>

            </> :
              <>
                <Button variant='outlined' onClick={() => { setOpen(false); setFormUpdateButton(false); setUpdationData(studentData) }}>Discard</Button>
                <Button variant='contained' onClick={() => { updationCall(); setOpen(false) }} disabled={!formUpdateButton}>Update</Button>


              </>
          }

        </DialogActions>
      </Dialog >
      <Dialog open={deleteAlert} onClose={() => setDeleteAlert(false)}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => {
              setDeleteAlert(false)
              setUpdationData({
                ...updataionData, status: "active"
              })
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
        <DialogTitle>Are you sure you want to delete this enquiry</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button variant='outlined' onClick={() => {
            setDeleteAlert(false)
            setUpdationData({
              ...updataionData, status: "active"
            })
          }} >No</Button>
          <Button color='warning' variant='contained' onClick={() => { deleteEnquiry() }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewSingleEnquiry
