import { useRouter } from 'next/router'
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
import { updateEnquiry, deleteSubUser, updateUserDetails, userDeleteMail, inviteUser } from 'src/store/APIs/Api';
import { Card, Grid, CardContent, Typography, Box, Button, CardActions, CardHeader, TextField, ListItem, Table, TableRow, TableCell } from '@mui/material'
import UserList from './UserTable';
import { AES, enc } from 'crypto-js';
import Icon from 'src/@core/components/icon'

interface ColorsType {
  [key: string]: ThemeColor
}


const statusColors: ColorsType = {
  accepted: 'success',
  pending: 'warning',
  inactive: 'secondary',
  deleted: 'error',
  invited: 'info'
}

const chipColor: ColorsType = {
  read: 'success',
  create: 'warning',
  update: 'secondary',
  delete: 'error',
  '0': 'error'
}

const SubUserProfile = () => {

  const router = useRouter()
  const id = router.query.id
  const [open, setOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updataionData, setUpdationData] = useState<any>({})
  const [subUserData, setSubUserData] = useState<any>({})
  const [user, setUser] = useState<any>()
  const [sent, setSent] = useState<any>(false)
  const [permission, setPermission] = useState<any>()
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [updateSubUserData, setUpdatedSubUser] = useState<any>({
    name: '',
    surName: '',
    designation: '',
    email: ''
  })
  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
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
    const data = localStorage.getItem('subUserDetails')
    if (data) {
      getUserDetails(data)
    }
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('subUserDetails')
    if (data) {
      getUserDetails(data)
    }
  }, [router.query])

  const getUserDetails = (data: any) => {
    setSubUserData(JSON.parse(data))
    setUpdatedSubUser({
      name: JSON.parse(data).userName,
      surName: JSON.parse(data).userSurname,
      designation: JSON.parse(data).designation,
      email: JSON.parse(data).userEmail,
      status: JSON.parse(data).userStatus
    })
  }

  const updateSubUser = () => {

    const data = {
      "customerId": subUserData.customerId,
      "organizationId": subUserData.organizationId,
      "userId": subUserData.userId,
      "userName": updateSubUserData.name,
      "userSurname": updateSubUserData.surName,
      "designation": updateSubUserData.designation,
      "userStatus": updateSubUserData.status
    }
    if (data.customerId && data.organizationId && data.userId && data.userName && data.userSurname && data.designation && data.userStatus) {
      updateUserDetails({ ...data }).then((res: any) => {
        setOpen(false)
        router.back()
        setSubmitted(false)
      })
    }
  }


  const deleteSubUserCall = () => {

    const data = {
      "customerId": subUserData.customerId,
      "organizationId": subUserData.organizationId,
      "userId": subUserData.userId,
      "customerName": `${subUserData.userName} ${subUserData.userSurname}`,
      "userType": subUserData.role.roleName
    }
    deleteSubUser({ ...data }).then((res: any) => {
      localStorage.removeItem('subUserDetails')
      if (res?.data?.message?.includes("Success")) {
        userDeleteMail({ organizationName: user.organizationName, organizationEmail: user.organizationEmail, userName: subUserData.userName, userEmail: subUserData.userEmail, userRole: subUserData.role.roleName, organizationLogo: organizationLogo })
        router.back()
      }
      else {

        return;
      }
    })
  }

  const handleUserReinvite = () => {


    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      uniqueID += chars[randomIndex];
    }

    const cipherText = AES.encrypt(`${user.customerId}/${user.organizationId}/${uniqueID}/${new Date().getTime()}`, `test key`).toString();

    const data = {
      "organizationId": user.organizationId,
      "userId": user.customerId,
      "receiverEmail": subUserData.userEmail,
      "organizationName": user.organizationName,
      "receiver": `${subUserData.userName} ${subUserData.userSurname}`,
      "key": cipherText,
      "role": subUserData.role.roleName
    }

    inviteUser({ ...data }).then(() => {
      setSent(true)
    })
  }

  return (
    <>
      <Button onClick={() => router.push('/user-management/')} sx={{ marginBottom: 2 }} variant='outlined'>&#8592; Users List</Button>
      <Grid container spacing={6} >
        <Grid item xs={12} md={12} lg={12} >
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={'primary' as ThemeColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {subUserData ? subUserData.userName?.charAt(0).toUpperCase() : ''}
                </CustomAvatar>
              </CardContent>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Details</Typography>
                  <Button variant='contained' onClick={() => { handleUserReinvite() }} disabled={sent ? true : false}>Re-Invite</Button>
                </Box>
                <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
                <Box sx={{ pt: 4, pb: 2 }}>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography
                      sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}
                    >
                      Username:
                    </Typography>
                    <Typography
                      sx={{ color: 'text.secondary' }}
                    >{subUserData ? subUserData.userName : ''} {subUserData ? subUserData.userSurname : ''}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{subUserData ? subUserData.userEmail : ''}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>User-Id:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{subUserData ? subUserData.userId : ''}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Designation :</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{subUserData ? subUserData.designation : ''}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={subUserData.userStatus}
                      sx={{ fontWeight: 500 }}
                      color={statusColors[subUserData.userStatus]}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 4 }}>
                    <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Role :</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{subUserData ? subUserData?.role?.roleName : ''}</Typography>
                  </Box>
                </Box>

              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("update")) &&
                  <Button variant='contained' onClick={() => setOpen(true)} >Update</Button>}
                {permission?.some((obj: any) => obj?.title === "Enquiry" && obj?.action?.includes("delete")) &&
                  <Button sx={{ color: 'red' }} variant='outlined' onClick={() => { setDeleteAlert(true); setUpdationData({ ...updataionData, status: "inActive" }) }}>Delete</Button>}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={5} >
          <UserList />
        </Grid> */}
      </Grid >
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>Update information</DialogTitle>
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
                  required
                  name="name"
                  onChange={(e) => {
                    setUpdatedSubUser({
                      ...updateSubUserData, name: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updateSubUserData.name}
                  label='Name'
                  error={submitted ? updateSubUserData.name ? false : true : false}
                  helperText={submitted && !updateSubUserData.name ? 'Required,max 50 chars' : ''}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  name="lastName"
                  required
                  onChange={(e) => {
                    setUpdatedSubUser({
                      ...updateSubUserData, surName: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updateSubUserData.surName}
                  error={submitted ? updateSubUserData.surName ? false : true : false}
                  helperText={submitted && !updateSubUserData.surName ? 'Required,max 50 chars' : ''}
                  label='Last name'
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1}  >
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                <TextField
                  fullWidth
                  required
                  value={updateSubUserData.designation}
                  onChange={(e) => {
                    setUpdatedSubUser({
                      ...updateSubUserData, designation: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  label='Designation'
                  error={submitted ? updateSubUserData.designation ? false : true : false}
                  helperText={submitted && !updateSubUserData.designation ? 'Required,max 500 chars' : ''}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </Grid>
              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  required inputProps={{
                    maxLength: 50,
                  }}
                  name="email"
                  onChange={(e) => {
                    setUpdatedSubUser({
                      ...updateSubUserData, email: e.target.value
                    }); setFormUpdateButton(true)
                  }}
                  value={updateSubUserData.email}
                  error={submitted ? updateSubUserData.email ? false : true : false}
                  helperText={submitted && !updateSubUserData.email ? 'Required,max 50 chars' : ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ marginTop: "20px", width: '100%', display: 'flex', justifyContent: 'right' }}>
          <Button variant='outlined' onClick={() => { setOpen(false); setFormUpdateButton(false); setSubmitted(false) }}>Discard</Button>
          <Button variant='contained' onClick={() => { updateSubUser();; setFormUpdateButton(false); setSubmitted(true) }} disabled={!formUpdateButton}>Update</Button>

        </DialogActions>
      </Dialog >
      <Dialog open={deleteAlert} onClose={() => setDeleteAlert(false)}>
        <Grid container justifyContent="flex-end" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>Are you sure you want to delete this User</DialogTitle>
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

        <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button variant='outlined' onClick={() => {
            setDeleteAlert(false)
            setUpdationData({
              ...updataionData, status: "active"
            })
          }} >No</Button>
          <Button color='warning' variant='contained' onClick={() => { deleteSubUserCall() }}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ marginTop: 6 }}>
        <CardHeader title={'Permissions'}></CardHeader>
        <Box sx={{ display: 'flex', mb: 4, overflowX: 'scroll' }}>
          <Table >
            {
              subUserData.role && subUserData.role.permissions.map((topic: any, index: number) => {
                return (
                  <TableRow key={index} >

                    <TableCell sx={{ fontWeight: 'bold' }}>{topic.title}</TableCell>
                    {
                      topic?.action?.map((act: any, ind: any) => {
                        if (topic.action[ind] != 0) {

                          return (

                            <TableCell key={ind} sx={{ textAlign: 'center' }}>
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={topic.action[ind] == 0 ? '-' : topic.action[ind]}
                                sx={{ fontWeight: 500 }}
                                color={chipColor[topic.action[ind]]}
                              />

                            </TableCell>
                          )
                        }
                        else {
                          return (
                            <TableCell key={ind} sx={{ textAlign: 'center' }}>
                              -
                            </TableCell>
                          );
                        }
                      })
                    }
                  </TableRow>
                )
              })
            }
          </Table>
        </Box>
      </Card>
    </>
  )
}

export default SubUserProfile
