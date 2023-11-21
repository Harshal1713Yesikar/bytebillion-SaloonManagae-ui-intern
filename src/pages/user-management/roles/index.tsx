import UserList from './UserTable'
import Grid from '@mui/material/Grid'
import RolesCards from './RolesCard'
import { AES, enc } from 'crypto-js';
import Alert from '@mui/material/Alert'
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import Icon from 'src/@core/components/icon'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import SyncIcon from '@mui/icons-material/Sync';
import React, { useEffect, useState } from 'react'
import PageHeader from "src/@core/components/page-header"
import { addUser, createRole, inviteUser, listAllEmployeeApi, listAllRoles } from 'src/store/APIs/Api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, CardContent, Checkbox, Dialog, DialogContent, DialogTitle, InputLabel, FormControl, ListItemText, MenuItem, Select, TextField, DialogActions, Box, OutlinedInput, SelectChangeEvent, Divider } from '@mui/material'
import MailLockIcon from '@mui/icons-material/MailLock';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const RolesComponent = () => {

  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [organizationName, setOrganizationName] = useState('')
  const [roleName, setRoleName] = useState('')
  const [encryptedKey, setEncriptedKey] = useState('')
  const [reload, setReload] = useState(false)
  const [userListReload, setUserListReload] = useState<any>(false)
  const [rolesArray, setRolesArray] = useState<any>([])
  const [organizationDetails, setOrganizationDetails] = useState<any>({})
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackBarOpen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [wait, setWait] = useState<any>(false)
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    userSurname: '',
    designation: ''
  })
  const [renderedRolesArray, setRenderedRolesArray] = useState<any>()
  const [rolesDetails, setRolesDetails] = useState<any>({})
  const [userReload, setUserReload] = useState<any>(true)
  const theme = useTheme()
  const [employeeList, setEmployeeList] = useState<any>([])
  const [expanded, setExpanded] = useState<any>("")
  const [inviteEmployeeTrue, setInviteEmployeeTrue] = useState<boolean>(false)
  const [inviteChecker, setInviteChecker] = useState<any>('')
  const [invited, setInvited] = useState<boolean>(false)


  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const organizationData = localStorage.getItem('organization')
    if (organizationData) {
      setOrganizationId(JSON.parse(organizationData).organizationId)
      setCustomerId(JSON.parse(organizationData).customerId)
      setOrganizationName(JSON.parse(organizationData).organizationName)
      setOrganizationDetails(JSON.parse(organizationData))
      bringEmployeeList(JSON.parse(organizationData).customerId, JSON.parse(organizationData).organizationId)
    }
  }, [])

  const bringEmployeeList = (customerId: any, organizationId: any) => {
    listAllEmployeeApi(customerId, organizationId).then((res: any) => {
      setEmployeeList(res?.data)
    })
  }

  useEffect(() => {
    listAllRolesApi()
  }, [customerId, organizationId])

  const listAllRolesApi = () => {
    listAllRoles({ customerId, organizationId }).then((res: any) => {

      if (res.data.data.length > 0) {
        setRenderedRolesArray(res.data.data)
        const data = res.data?.data?.map((v: any, index: number) => {
          return (
            <MenuItem
              key={index}
              value={v.roleName}
            >
              {v.roleName}
            </MenuItem>
          )
        })
        setRolesArray(data)
      }

    })
  }

  const handleClose = () => {
    setUserDetails({
      'name': '',
      'email': '',
      'userSurname': '',
      'designation': ''
    })
    setRoleName("")
    setOpen(false)
    setInviteChecker(false)
    setInviteEmployeeTrue(false)
    setInvited(false)
  }


  useEffect(() => {
    if (renderedRolesArray) {
      if (renderedRolesArray.length > 0) {
        const rolesData = renderedRolesArray.filter((role: any) => role.roleName == roleName)
        setRolesDetails(rolesData[0])
      }
    }
  }, [renderedRolesArray, roleName])

  // for creation of role
  const handleInvite = () => {
    if (!roleName || !userDetails.name || !userDetails.email || !userDetails.userSurname || !userDetails.designation) {
      setWait(false)
      setSnackBarOpen(true)
      setSnackbarColor(false)
      setResponseMessage("Fill all the required information")
    }
    else {
      setWait(true)
      setInviteEmployeeTrue(false)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let uniqueID = '';

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uniqueID += chars[randomIndex];
      }

      const cipherText = AES.encrypt(`${customerId}/${organizationId}/${uniqueID}/${new Date().getTime()}`, `test key`).toString();

      // const doubleEncription = AES.encrypt(cipherText, `test key`).toString()
      // const bytes = AES.decrypt(cipherText.toString(), `test key`).toString(enc.Utf8)


      const invitationData = {
        "customerId": customerId,
        "organizationId": organizationId,
        "organizationName": organizationName,
        "organizationDetails": organizationDetails.organizationDetails,
        "organizationCategoryId": organizationDetails.organizationCategoryId,
        "organizationCategoryName": organizationDetails.organizationCategoryName,
        "organizationPhoneNumber": organizationDetails.organizationPhoneNumber,
        "organizationEmail": organizationDetails.organizationEmail,
        "organizationAddress": organizationDetails.organizationAddress,
        "userId": uniqueID,
        "userName": userDetails.name,
        "userEmail": userDetails.email,
        "userSurname": userDetails.userSurname,
        "designation": userDetails.designation,
        "userStatus": "invited",
        "role": {
          "roleId": rolesDetails.roleId,
          "roleName": rolesDetails.roleName,
          "roleStatus": rolesDetails.roleStatus,
          "roleCreatedDate": rolesDetails.roleCreatedDate,
          "roleUpdatedDate": rolesDetails.roleUpdatedDate,
          "roleInfo": [
            {
              "customerId": rolesDetails.roleInfo[0].customerId,
              "customerName": rolesDetails.roleInfo[0].customerName,
              "userType": rolesDetails.roleInfo[0].userType,
              "action": [...rolesDetails.roleInfo[0].actions],
              "date": rolesDetails.roleInfo[0].date
            }
          ],
          "permissions": [...rolesDetails.permissions]
        }
      }

      addUser({ ...invitationData }).then((res: any) => {
        setUserReload(!userReload)
        if (res?.data.message == "User Created Successfully") {
          const data = {
            "organizationId": organizationId,
            "userId": customerId,
            "receiverEmail": userDetails.email,
            "organizationName": organizationName,
            "receiver": userDetails.name,
            "key": cipherText,
            "role": roleName
          }
          inviteUser({ ...data }).then((r: any) => {
            handleClose();
            setSnackbarColor(true)
            setSnackBarOpen(true)
            setResponseMessage("Check your mail for invite message")
            setRoleName('')
            setWait(false)
            setInviteEmployeeTrue(false)
            setInvited(false)
          })
        }
        else {
          setSnackbarColor(false)
          setSnackBarOpen(true)
          setResponseMessage("User already exists")
          setInvited(false)

          // handleClose();
          // setRoleName('')
          setWait(false)
        }
      })
    }
  }

  useEffect(() => {
    setUserDetails({
      'name': '',
      'email': '',
      'userSurname': '',
      'designation': ''
    })
    setRoleName("")
    setInvited(false)
  }, [inviteChecker])

  useEffect(() => {
    bringEmployeeList(customerId, organizationId)
  }, [userListReload, customerId, organizationId])

  useEffect(() => {
    listAllRolesApi()
  }, [reload])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Card sx={{ height: '15vh', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button className='refresh' onClick={() => setUserListReload(!userListReload)}>
              <SyncIcon />
            </Button>
            <Button sx={{ mr: 10 }} variant='contained' onClick={() => setOpen(true)}>Invite User&nbsp;<MailLockIcon /></Button>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <RolesCards apiCall={listAllRolesApi} />
        </Grid>
        <Grid item xs={12}>
          <UserList userReload={userReload} userListReload={userListReload} rolesArray={renderedRolesArray} />
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <Grid container justifyContent="space-between" alignItems="center" >
          <Grid sx={{ display: 'flex' }}>
            <Icon
              className="iconContainer"
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                marginTop: '20px',
                transition: "background-color 0.3s",
              }}
              icon="mdi:account-multiple-plus"
            />
            <DialogTitle sx={{ textAlign: 'left', alignItems: 'left', mt: '-5px' }}>
              Invite User
            </DialogTitle>
          </Grid>
          <Icon
            className="iconContainer"
            onClick={() => { handleClose(); setWait(false); setInviteEmployeeTrue(false); setInviteChecker("") }}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              marginTop: '-15px',
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />

        </Grid>
        <FormControl sx={{ ml: 10 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="null"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="employee" onClick={() => { setInviteChecker("employee"); setInviteEmployeeTrue(false) }} control={<Radio />} label="Invite employee" />
            <FormControlLabel value="user" onClick={() => {
              setInviteChecker("user"); setUserDetails({
                'name': '',
                'email': '',
                'userSurname': '',
                'designation': ''
              })
              setRoleName("")
            }} control={<Radio />} label="Invite new user" />
          </RadioGroup>
        </FormControl>
        {
          inviteChecker ?
            inviteChecker == "employee" ?
              inviteEmployeeTrue ?
                <Grid container spacing={1}  >
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <FormControl error={invited ? !roleName ? true : false : false} sx={{ width: '100%' }}>
                      <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={roleName}
                        label="Role"
                        onChange={(e) => setRoleName(e.target.value)}
                      >
                        {rolesArray.length > 0 ? rolesArray : <MenuItem disabled={true}>No roles found</MenuItem>}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      value={userDetails.designation}
                      name="designation"
                      error={invited ? !userDetails.designation ? true : false : false}
                      helperText={invited && !userDetails.designation ? 'Required,max 500 chars' : ''}
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      label='Designation'
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      value={userDetails.name}
                      name="name"
                      error={invited ? !userDetails.name ? true : false : false}
                      helperText={invited && !userDetails.name ? 'Required,max 50 chars' : ''}
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      label='User name'
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="userSurname"
                      value={userDetails.userSurname}
                      error={invited ? !userDetails.userSurname ? true : false : false}
                      helperText={invited && !userDetails.userSurname ? 'Required,max 50 chars' : ''}
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      label='User surname'
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="email"
                      value={userDetails.email}
                      error={invited ? !userDetails.email ? true : false : false}
                      helperText={invited && !userDetails.email ? 'Required,max 50 chars' : ''}
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      label='Email'
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}>
                    <Box className='demo-space-x'>
                      <Button size='large' color='secondary' variant='outlined' onClick={() => { setInviteEmployeeTrue(false); setRoleName(''); setInvited(false) }}>
                        Cancel
                      </Button>
                      <Button size='large' type='submit' variant='contained' onClick={() => { handleInvite(); setInvited(true); }}>
                        {wait ? 'Inviting...' : 'Invite'}&nbsp;<MailLockIcon />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid md={12} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}></Grid>
                </Grid>
                :
                <Table >
                  <TableHead>
                    <TableCell sx={{ textAlign: 'center' }}>Select</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Designation</TableCell>

                  </TableHead>
                  <TableBody sx={{ overflowY: 'scroll', height: 5 }}>
                    {employeeList ? employeeList?.map((employee: any, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ textAlign: 'center' }}><Checkbox onClick={() => {
                            setUserDetails({
                              'name': employee.employeeFirstname,
                              'email': employee.employeeEmail,
                              'userSurname': employee.employeeLastname,
                              'designation': employee.employeeDesignation ? employee.employeeDesignation : 'none'
                            }); setInviteEmployeeTrue(true);
                            setRoleName('')
                          }} /></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{employee.employeeFirstname} {employee.employeeLastname}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{employee.employeeEmail}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }} >{employee.employeeDesignation ? employee.employeeDesignation : '-'}</TableCell>
                        </TableRow>
                      )
                    }) : <TableRow sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>data not found or click <Button onClick={() => bringEmployeeList(customerId, organizationId)}>re-fresh</Button></TableRow>}
                  </TableBody>
                </Table>
              : inviteChecker == "user" ?
                <Grid container spacing={1}  >
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <FormControl error={invited ? !roleName ? true : false : false} sx={{ width: '100%' }}

                    >
                      <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={roleName}
                        label="Role"
                        onChange={(e) => setRoleName(e.target.value)}
                      >
                        {rolesArray.length > 0 ? rolesArray : <MenuItem disabled={true}>No roles found</MenuItem>}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="designation"
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      error={invited ? !userDetails.designation ? true : false : false}
                      helperText={invited && !userDetails.designation ? 'Required,max 500 chars' : ''}
                      value={userDetails.designation}
                      label='Designation'
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="name"
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      label='User name'
                      error={invited ? !userDetails.name ? true : false : false}
                      helperText={invited && !userDetails.name ? 'Required,max 50 chars' : ''}
                      value={userDetails.name}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="userSurname"
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      error={invited ? !userDetails.userSurname ? true : false : false}
                      helperText={invited && !userDetails.userSurname ? 'Required,max 50 chars' : ''}
                      label='User surname'
                      value={userDetails.userSurname}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}>
                    <TextField
                      fullWidth
                      required
                      name="email"
                      onChange={(e) => changeHandler(e)}
                      autoComplete='OFF'
                      error={invited ? !userDetails.email ? true : false : false}
                      helperText={invited && !userDetails.email ? 'Required,max 50 chars' : ''}
                      value={userDetails.email}
                      label='Email'
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid md={5} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}>
                    <Box className='demo-space-x' sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
                      <Button size='large' color='secondary' variant='outlined' onClick={() => { setInviteEmployeeTrue(false); setRoleName(''); handleClose() }}>
                        Cancel
                      </Button>
                      <Button size='large' type='submit' variant='contained' onClick={() => { handleInvite(); setInvited(true); }}>
                        {wait ? 'Inviting...' : 'Invite'}&nbsp;<MailLockIcon />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid md={12} sm={3} sx={{ marginLeft: 10, marginBottom: 3, marginTop: 5 }}></Grid>
                </Grid>
                : ''
            : ''
        }
      </Dialog >
      <Snackbar open={snackbaropen} onClose={() => setSnackBarOpen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackBarOpen(false)}
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default RolesComponent
