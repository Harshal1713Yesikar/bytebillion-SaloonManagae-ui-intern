import { useRouter } from 'next/router'
// import ListEnquiry from './listEnquiry'
import StaffList from 'src/views/ManageStaffView/StaffList'
// import EnquiryTable from './EnquiryTable'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { useState, useEffect, use } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { ThemeColor } from 'src/@core/layouts/types'
import CustomChip from 'src/@core/components/mui/chip'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import DialogContentText from '@mui/material/DialogContentText'
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  TextField,
  Skeleton,
  TableContainer,
  CardHeader
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
// import EnquiryFeedback from './EnquiryFeedback';
import { getSingleEmployee, updateEmployeeApi } from 'src/store/APIs/Api'
import { get } from 'http'
import { sign } from 'crypto'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const ViewSingleManageStaff = () => {
  const router = useRouter()
  const id = router.query.id
  const [name, setName] = useState('')
  const [user, setUser] = useState<any>()
  const [value, setValue] = useState('1')
  const [lastName, setLastName] = useState('')
  const [permission, setPermission] = useState<any>()
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [staffData, setStaffData] = useState<any>({})
  const [updataionData, setUpdationData] = useState<any>({})
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [followUp, setFollowUp] = useState<any>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const employeeId = router.query.managesaff
  console.log('ABC', employeeId)
  const [deleteBatchPopup, setDeleteBatchPopup] = useState<boolean>(false)

  const [updateEmployeeData, setUpdateEmployeeData] = useState({
    customerId: '99f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'E7uqn',
    employeeId: employeeId,
    employeeName: '',
    employeePhone: '',
    employeeJoiningDate: '',
    employeeStatus: ''
  })

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpan = () => {
    handleClose()
  }

  const singleEmployeeeDetailsFunc = async () => {
    try {
      const res: any = await getSingleEmployee('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn', employeeId)

      setStaffData(res?.data?.data)
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    singleEmployeeeDetailsFunc()
  }, [])

  const UpdateEmployeeFunc = async () => {
    try {
      const response: any = await updateEmployeeApi(updateEmployeeData)
      console.log('Datas', response?.data)
      // Assuming response.data contains updated employee data
      setUpdationData(response?.data?.data)
      singleEmployeeeDetailsFunc()
    } catch (error) {
      console.error('Error updating employee:', error)
      // Handle error if needed
    }
  }
  // Assuming you want to load employee data when the component mounts
  // useEffect(() => {
  //   UpdateEmployeeFunc()
  //   // Call your function to fetch initial data, e.g., UpdateEmployeeFunc();
  // }, [])

  const handleUpdateEmployeeData = (e: { target: { name: any; value: any } }) => {
    setUpdateEmployeeData({ ...updateEmployeeData, [e.target.name]: e.target.value })
    console.log('AAA')
  }

  useEffect(() => {
    setUpdationData({ ...updataionData, followUp: followUp })
  }, [followUp])

  const enquiyStatusUpdation = (data: any) => {
    const updationVaue = {
      ...updataionData,
      followUp: data
    }
  }

  useEffect(() => {
    setUpdationData({
      ...updataionData,
      studentName: `${name} ${lastName}`
    })
  }, [name, lastName])

  return (
    <>
      <Grid container spacing={10} className='enquirylistpage'>
        <Grid item xs={4} className='enquirylistpagecard'>
        <Button onClick={() => router.push('/managesatff/')} sx={{ marginTop: 2, ml: 2 ,marginBottom:3}} variant='outlined'>
              &#8592; Staff List
            </Button>
          <Card>
           
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={'primary' as ThemeColor}
                sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
              >
                {staffData?.employeeName ? staffData.employeeName.charAt(0).toUpperCase() : 'J'}
              </CustomAvatar>
            </CardContent>

            <CardContent>
              {/*
                <Typography variant='h6' sx={{ pl: 7 }}>Details</Typography> */}

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                {/* {permissions?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("update")) */}
                <Button
                  className='edit'
                  sx={{ padding: '0px !important', minWidth: '40px !important' }}
                  onClick={() => setOpen(true)}
                >
                  <Icon cursor='pointer' icon='bx:pencil' />
                </Button>

                {/* {permissions?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("delete")) */}
                <Button
                  className='delete'
                  sx={{ padding: '0px !important', minWidth: '40px !important' }}
                  onClick={() => {
                    setDeleteAlert(true)
                    setUpdationData({ ...updataionData, status: 'inActive' })
                  }}
                >
                  {' '}
                  <Icon cursor='pointer' icon='ic:baseline-delete' />
                </Button>
              </div>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important`, pt: 3 }} />
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tab label='Personal Details' value='1' />
                </Box>
                <Box sx={{ pt: 5 }}>
                  <TabPanel value='1'>
                    <Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Name:</Typography>
                        {!loading ? (
                          <Skeleton>
                            <Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography>
                          </Skeleton>
                        ) : (
                          <Typography sx={{ color: 'text.secondary' }}>{staffData?.employeeName}</Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Joining Date:</Typography>
                        {!loading ? (
                          <Skeleton>
                            <Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography>
                          </Skeleton>
                        ) : (
                          <Typography sx={{ color: 'text.secondary' }}>
                            {staffData ? staffData?.employeeJoiningDate : ''}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>StaffId:</Typography>
                        {!loading ? (
                          <Skeleton>
                            <Typography sx={{ color: 'text.secondary' }}> lorem ipsum 9900909009</Typography>
                          </Skeleton>
                        ) : (
                          // : <Typography sx={{ color: 'text.secondary' }}>{staffData ? staffData.email : ''}</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {staffData ? staffData.employeeId : ''}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact No:</Typography>
                        {!loading ? (
                          <Skeleton>
                            <Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography>
                          </Skeleton>
                        ) : (
                          // : <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staffData?.mobileNumber ? staffData.mobileNumber : ''}</Typography>
                          <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {staffData?.employeePhone ? staffData.employeePhone : ''}
                          </Typography>
                        )}
                      </Box>
                      {/* 
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label={staffData?.employeeStatus ? staffData.employeeStatus : ''}
                          sx={{ fontWeight: 500 }}
                          color={statusColors[staffData?.employeeStatus]}
                        />
                      </Box> */}

                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Status :</Typography>
                        {staffData.employeeStatus ? (
                          <div>
                            <CustomChip
                              style={{ height: '30px', margin: '5px', cursor: 'pointer' }}
                              rounded
                              size='small'
                              skin='light'
                              color={staffData.employeeStatus == 'active' ? 'success' : 'warning'}
                              label={staffData.employeeStatus}
                            />
                          </div>
                        ) : (
                          <Skeleton>
                            <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                          </Skeleton>
                        )}
                      </Box>
                    </Box>
                  </TabPanel>
                </Box>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
              </TabContext>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {permission?.some((obj: any) => obj?.title === 'Enquiry' && obj?.action?.includes('update')) && (
                <Button variant='contained' onClick={() => setOpen(true)}>
                  Edit
                </Button>
              )}
              {permission?.some((obj: any) => obj?.title === 'Enquiry' && obj?.action?.includes('delete')) && (
                <Button
                  sx={{ color: 'red' }}
                  variant='outlined'
                  onClick={() => {
                    setDeleteAlert(true)
                    setUpdationData({ ...updataionData, status: 'inActive' })
                  }}
                >
                  Delete
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
        {/* {
          staffData?.followUp &&
          <Grid item xs={8} className='enquirylistpagecard'>
            <EnquiryFeedback followUp={staffData.followUp} setFollowUp={setFollowUp} updationCall={enquiyStatusUpdation} />
          </Grid>
        } */}

        <Grid item xs={staffData?.followUp ? 12 : 8} className='enquirylistpagecard'>
          {/* <StaffList/> */}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ textAlign: 'center' }}
      >
        {/*   */}

        {/* Edit Form Filled */}

        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Employee Name'
                  name='employeeName'
                  required
                  inputProps={{
                    maxLength: 50
                  }}
                  onChange={handleUpdateEmployeeData}
                  value={updateEmployeeData.employeeName}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Mobile Number'
                  name='employeePhone'
                  type='number'
                  required
                  error={updateEmployeeData?.employeePhone?.length > 13}
                  onChange={handleUpdateEmployeeData}
                  value={updateEmployeeData?.employeePhone}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Employee Joining Date'
                  name='employeeJoiningDate'
                  type='date'
                  required
                  onChange={handleUpdateEmployeeData}
                  value={updateEmployeeData?.employeeJoiningDate}
                />
              </Grid>
            </Grid>

            {/* <Grid sx={{ marginBottom: 3, marginTop: 2 }}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={updateEmployeeData?.employeeStatus}
                  label='Status'
                  onChange={handleUpdateEmployeeData}
                >
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'in active'}>In active</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            
         
          </Box>
        </DialogContent>

        <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
          <Box className='demo-space-x'>
            <Button
              size='large'
              color='secondary'
              variant='outlined'
              onClick={() => {
                handleClose()
                setFormUpdateButton(false)
                setSubmitted(false)
              }}
            >
              Cancel
            </Button>
            <Button
              size='large'
              type='submit'
              variant='contained'
              onClick={() => {
                UpdateEmployeeFunc()
                singleEmployeeeDetailsFunc()
                handleOpan()
              }}
            >
              Update
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteAlert} onClose={() => setDeleteAlert(false)}>
        <Grid container justifyContent='flex-end'>
          <Icon
            className='iconContainer'
            onClick={() => {
              setDeleteAlert(false)
              setUpdationData({
                ...updataionData,
                status: 'active'
              })
            }}
            style={{
              cursor: 'pointer',
              fontSize: '30px',
              margin: '8px',
              transition: 'background-color 0.3s'
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
            <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>Are you sure you want to delete this Staff!</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' color='secondary' onClick={() => setDeleteBatchPopup(false)}>
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{ mr: 1.5 }}
            onClick={() => {
              //   deleteApiCall('delete');
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewSingleManageStaff
