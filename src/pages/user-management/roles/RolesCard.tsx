// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup';
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createRole, listAllRoles, updateUserRole } from '../../../store/APIs/Api'
import { DialogContent, Accordion, AccordionSummary, AccordionDetails, Radio, Skeleton } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { left } from '@popperjs/core'


export const dummyData = [
  {
    name: 'lorem lorem',
    role: 'role',
    handleUser: 'yes/no'
  },
  {
    name: 'lorem lorem',
    role: 'role',
    handleUser: 'yes/no'
  },
  {
    name: 'lorem lorem',
    role: 'role',
    handleUser: 'yes/no'
  },
  {
    name: 'lorem lorem',
    role: 'role',
    handleUser: 'yes/no'
  }
]



const rolesArr: string[] = [
  'Dashboard',
  'Student',
  'Employee',
  'Enquiry',
  'Expenses',
  'Courses',
  'Batch',
  'Coupons',
  'User & Permissions',
  'Forms'
]

const RolesCards = ({ apiCall }: any) => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [roleName, setRoleName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [manageUser, setManageUser] = useState(false)
  const [readArray, setReadArray] = useState<any>([])
  const [writeArray, setWriteArray] = useState<any>([])
  const [rolesArray, setRolesArray] = useState<any>([])
  const [userType, setUserType] = useState<any>('')
  const [userRole, setUserRole] = useState<string>('')
  const [updateMatrix, setUpdateMatrix] = useState<any>({})
  const [renderedRolesArray, serRenderedRolesArray] = useState<any>([])
  const [update, setUpdate] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const rows = 11;
  const cols = 4;

  // Initialize the matrix state with zeros
  const initialMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  const [matrix, setMatrix] = useState(initialMatrix);

  // Function to handle click events and update the matrix
  const handleClick = (rowIndex: any, colIndex: any, value: string, update: boolean) => {
    if (!update) {
      // Create a copy of the matrix to avoid mutating the state directly
      const updatedMatrix = [...matrix];

      if (matrix[rowIndex][colIndex] == 0) {
        // Assign the new value (for example, 1) to the clicked cell

        updatedMatrix[rowIndex][colIndex] = value;
        updatedMatrix[rowIndex][0] = 'read'

        // Update the state with the modified matrix
        setMatrix(updatedMatrix);
      }
      else {
        // Assign the new value (for example, 1) to the clicked cell
        updatedMatrix[rowIndex][colIndex] = 0;

        // Update the state with the modified matrix
        setMatrix(updatedMatrix);
      }
    }
    else {
      const updatedMatrix = [...matrix];
      if (updatedMatrix[rowIndex][colIndex] == 0) {
        updatedMatrix[rowIndex][colIndex] = value;
        setMatrix(updatedMatrix);
      }
      else {

        updatedMatrix[rowIndex][colIndex] = 0;
        setMatrix(updatedMatrix);

      }
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('organization')
    const userData = localStorage.getItem('userDetails')
    if (data) {
      setCustomerId(JSON.parse(data).customerId)
      setOrganizationId(JSON.parse(data).organizationId)

      setUserType(JSON.parse(data).role)
    }
    if (userData) {
      setUserId(JSON.parse(userData).payload.customerId)
      setUserName(JSON.parse(userData).payload.customerName)
    }
  }, [])

  useEffect(() => {
    listAllRoles({ customerId, organizationId }).then((res) => {
      setRolesArray(res.data.data)
      setLoading(false)
    })
  }, [customerId, organizationId])


  const createRoleCall = () => {

    if (customerId && organizationId && userId && roleName && userName) {

      const data = {
        "customerId": customerId,
        "organizationId": organizationId,
        "roleName": roleName,
        "roleStatus": "active",
        "roleInfo": [
          {
            "customerId": userId,
            "customerName": userName,
            "userType": userType.roleName,
            "actions": []
          }
        ],
        "permissions": [
          {
            "title": "Dashboard",
            "action": [...matrix[0]]
          },
          {
            "title": "Student",
            "action": [...matrix[1]]
          },
          {
            "title": "Employee",
            "action": [...matrix[2]]
          },
          {
            "title": "Enquiry",
            "action": [...matrix[3]]
          },
          {
            "title": "Expenses",
            "action": [...matrix[4]]
          },
          {
            "title": "Courses",
            "action": [...matrix[5]]
          },
          {
            "title": "Batch",
            "action": [...matrix[6]]
          },
          {
            "title": "Coupons",
            "action": [...matrix[7]]
          }, {
            "title": "User & Permissions",
            "action": [...matrix[8]]
          },
          {
            "title": "Forms",
            "action": [...matrix[9]]
          },
          {
            "title": "Settings",
            "action": ['read', 'create']
          },
          {
            "manageUser": manageUser
          }
        ]
      }

      setLoading(true)
      createRole(data).then((res: any) => {
        apiCall()
        listAllRoles({ customerId, organizationId }).then((response) => {
          setRolesArray(response.data.data)
          setLoading(false)
          setSubmitted(false)
        })

        return res;
      })
      setSubmitted(false)
      setMatrix(initialMatrix)
      setReadArray([]);
      setWriteArray([])
      setRoleName('')
      handleClose()
    }
  }

  // ** Hook
  const theme = useTheme()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setSubmitted(false)
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      if (arr.includes(`${id.split("-")[0]}-read`)) {
        setSelectedCheckbox([...arr])
      }
      else if (!update) {
        arr.push(`${id.split("-")[0]}-read`)
        setSelectedCheckbox([...arr])
      }
      else {
        setSelectedCheckbox([...arr])
      }
    }
  }



  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
      setMatrix([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ])
      setMatrix(initialMatrix)
    } else {
      rolesArr.forEach((row, index) => {
        const id = row
        setMatrix([
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
          ['read', 'create', 'update', 'delete'],
        ])
        togglePermission(`${id}-read`)
        togglePermission(`${id}-create`)
        togglePermission(`${id}-update`)
        togglePermission(`${id}-delete`)
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 5) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  useEffect(() => {

    if (updateMatrix?.permissions?.length > 0) {
      setRoleName(updateMatrix.roleName)
      setManageUser(updateMatrix?.permissions[updateMatrix.permissions.length - 1].manageUser)

      updateMatrix.permissions.map((per: any, index: number) => {
        if (per?.action?.length > 0) {
          per?.action?.map((act: any, i: number) => {

            handleClick(index, i, act, update);
            if (act) {
              togglePermission(`${per.title}-${act}`)
            }
          })
        }

      })
    }
  }, [updateMatrix])

  const handleUpdate = () => {
    const data = {
      "customerId": customerId,
      "organizationId": organizationId,
      "roleName": roleName,
      "roleStatus": "active",
      "roleInfo": [...updateMatrix.roleInfo],
      "permissions": [
        {
          "title": "Dashboard",
          "action": [...matrix[0]]
        },
        {
          "title": "Student",
          "action": [...matrix[1]]
        },
        {
          "title": "Employee",
          "action": [...matrix[2]]
        },
        {
          "title": "Enquiry",
          "action": [...matrix[3]]
        },
        {
          "title": "Expenses",
          "action": [...matrix[4]]
        },
        {
          "title": "Courses",
          "action": [...matrix[5]]
        },
        {
          "title": "Batch",
          "action": [...matrix[6]]
        },
        {
          "title": "Coupons",
          "action": [...matrix[7]]
        }, {
          "title": "User & Permissions",
          "action": [...matrix[8]]
        },
        {
          "title": "Forms",
          "action": [...matrix[9]]
        },
        {
          "title": "Settings",
          "action": ['read', 'create']
        },
        {
          "manageUser": manageUser
        }
      ]
    }
    const data2 = {
      "customerId": customerId,
      "organizationId": organizationId,
      "userId": "12345",
      "customerName": userName,
      "userType": userType.roleName,
      "role": {
        "roleId": updateMatrix.roleId,
        "roleName": roleName,
        "roleStatus": updateMatrix.roleStatus,
        "roleInfo": [...updateMatrix.roleInfo],
        "permissions": [
          {
            "title": "Dashboard",
            "action": [...matrix[0]]
          },
          {
            "title": "Student",
            "action": [...matrix[1]]
          },
          {
            "title": "Employee",
            "action": [...matrix[2]]
          },
          {
            "title": "Enquiry",
            "action": [...matrix[3]]
          },
          {
            "title": "Expenses",
            "action": [...matrix[4]]
          },
          {
            "title": "Courses",
            "action": [...matrix[5]]
          },
          {
            "title": "Batch",
            "action": [...matrix[6]]
          },
          {
            "title": "Coupons",
            "action": [...matrix[7]]
          }, {
            "title": "User & Permissions",
            "action": [...matrix[8]]
          },
          {
            "title": "Forms",
            "action": [...matrix[9]]
          },
          {
            "title": "Settings",
            "action": ['read', 'create']
          },
          {
            "manageUser": manageUser
          }
        ]
      }
    }

    listAllRoles({ customerId, organizationId }).then((res: any) => {
      setUpdateMatrix({})
      setSelectedCheckbox([])
    })
  }

  useEffect(() => {
    if (rolesArray.length > 0) {


      const data = rolesArray?.map((item: any, index: number) => {

        return (
          <Grid item xs={12} sm={6} lg={4} key={index} >
            <Card onClick={() => {
              setUpdateMatrix(item)
              handleClickOpen()
              setUpdate(true)
              setDialogTitle('Edit')
            }}>
              <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {/* <Typography sx={{ color: 'text.secondary' }}>{`Total ${item?.totalUsers} users`}</Typography> */}
                  <AvatarGroup
                    max={4}
                    className='pull-up'
                    sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.875rem' } }}
                  >
                  </AvatarGroup>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant='h5' sx={{ mb: 1 }}>
                      {item?.roleName}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'primary.main', textDecoration: 'none' }}>
                      {item.roleStatus}
                    </Typography>
                    <Typography>Manage User : {item.permissions[10].manageUser == true ? 'Yes' : 'No'}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid >
        )
      })
      serRenderedRolesArray(data)
    }
  }, [rolesArray])

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
            setManageUser(false)
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={4}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img
                  width={88}
                  height={105}
                  alt='add-role'
                  src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                      setUpdate(false)
                      setMatrix(initialMatrix)

                      // setSubmitted(false)
                    }}
                  >
                    Add Role
                  </Button>
                  {/* <Typography sx={{ fontSize: 13 }} >Add role, if it doesn't exist.</Typography> */}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {loading ? <>
        {
          dummyData.map((val: any, index: number) => {
            return (<Grid key={index} item xs={12} sm={6} lg={4}  >
              <Card >
                <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                      <Skeleton>
                        <Typography variant='h5' sx={{ mb: 1 }}>
                          Lorem, ipsum.
                        </Typography>
                      </Skeleton>
                      <Skeleton>
                        <Typography
                          variant='body2'
                          sx={{ color: 'primary.main', textDecoration: 'none' }}>
                          Lorem.
                        </Typography>
                      </Skeleton>
                      <Skeleton>
                        <Typography>Manage User : </Typography>
                      </Skeleton>
                    </Box>
                    <IconButton sx={{ color: 'text.primary' }}>
                      <Skeleton>
                        <Icon fontSize={20} icon='bx:pencil' />
                      </Skeleton>
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid >)
          })
        }
      </> : renderedRolesArray}
      <Dialog fullWidth maxWidth='md' scroll='body' open={open}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            <Typography variant='h5' component='span'>
              {`${dialogTitle} Role`}
            </Typography>
            {/* <Typography variant='body2' sx={{ ml: '30px' }}>Set Role Permissions</Typography> */}
          </DialogTitle>
          <Icon
            className="iconContainer"
            onClick={() => {
              handleClose()
              setSelectedCheckbox([])
              setIsIndeterminateCheckbox(false)
              setUpdateMatrix({})
              setMatrix(initialMatrix)
              setManageUser(false)
              setRoleName('')
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
        </Grid >

        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>

          <FormControl fullWidth>
            <TextField
              label='Role name'
              value={roleName}
              error={submitted ? !roleName ? true : false : false}
              helperText={submitted && !roleName ? 'Required,max 50 chars' : ''}
              onChange={(e) => { setRoleName(e.target.value) }}
              placeholder='Enter role name'
            />
          </FormControl>

          <Typography variant='h6'>Role Permissions</Typography>
          {
            update && <Typography textAlign='center' fontStyle='unset' variant='body2'>Make Sure to give Read permission if you give Create , Update or Delete</Typography>
          }

          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' }
                      }}
                    >
                      Administrator Access
                      <Tooltip placement='top' title='Allows a full access to the system'>
                        <Box sx={{ ml: 1, display: 'flex', color: 'text.secondary' }}>
                          <Icon icon='bx:info-circle' fontSize='1rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      control={
                        <Checkbox
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === rolesArr.length * 4}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                  <TableCell>Manage User Access</TableCell>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={false}
                      name="radio-buttons-group"
                      sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                      <FormControlLabel value="female" control={<Radio
                        checked={manageUser == false}
                        onClick={() => setManageUser(false)}
                      />} label="no" />
                      <FormControlLabel value="male" control={<Radio
                        checked={manageUser == true}
                        onClick={() => setManageUser(true)}
                      />} label="Yes" />
                    </RadioGroup>
                  </FormControl>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesArr.map((i: string, index: number) => {
                  const id = i

                  return (
                    <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: `${theme.palette.text.primary} !important`
                        }}
                      >
                        {i}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Read'
                          sx={{ my: -1 }}
                          control={
                            <Checkbox
                              id={`${id}-read`}
                              onChange={() => { togglePermission(`${id}-read`); handleClick(index, 0, 'read', update) }}
                              checked={selectedCheckbox.includes(`${id}-read`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Create'
                          sx={{ my: -1 }}
                          control={
                            <Checkbox
                              id={`${id}-create`}
                              onChange={() => { togglePermission(`${id}-create`); handleClick(index, 1, 'create', update); }}
                              checked={selectedCheckbox.includes(`${id}-create`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Update'
                          sx={{ my: -1 }}
                          control={
                            <Checkbox
                              id={`${id}-update`}
                              onChange={() => { togglePermission(`${id}-update`); handleClick(index, 2, 'update', update); }}
                              checked={selectedCheckbox.includes(`${id}-update`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='delete'
                          sx={{ my: -1 }}
                          control={
                            <Checkbox
                              id={`${id}-delete`}
                              onChange={() => { togglePermission(`${id}-delete`); handleClick(index, 3, 'delete', update); }}
                              checked={selectedCheckbox.includes(`${id}-delete`)}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
          <Box className='demo-space-x'>
            <Button size='large' color='secondary' variant='outlined' onClick={() => {
              setOpen(false)
              setSelectedCheckbox([])
              setIsIndeterminateCheckbox(false)
              setUpdateMatrix({})
              setMatrix(initialMatrix)
              setManageUser(false)
              setRoleName('')
              setSubmitted(false)
            }}>
              Cancel
            </Button>
            {
              update ?

                //  <Button size='large' type='submit' variant='contained' disabled={true} onClick={() => { handleClose(); handleUpdate(); }}>
                //   update
                // </Button>
                ''
                : <Button size='large' type='submit' variant='contained' onClick={() => { createRoleCall(); setSubmitted(true) }}>
                  Create
                </Button>
            }

          </Box>
        </DialogActions>
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
    </Grid >
  )
}

export default RolesCards
