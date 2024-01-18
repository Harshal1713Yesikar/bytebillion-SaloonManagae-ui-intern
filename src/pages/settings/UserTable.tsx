// import React, { useState, useEffect } from 'react'
// import {
//   Button, Box, Dialog, DialogTitle, DialogActions, Typography, DialogContent,
//   FormControl, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody,
//   Checkbox, FormControlLabel, Tooltip, Icon, Card, Grid
// } from '@mui/material';
// import ListItemText from '@mui/material/ListItemText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

// import { createRole } from 'src/store/APIs/Api';



// const users = [
//   {
//     id: 1,
//     name: 'user 1',
//     email: 'user1@biz.com',
//     role: 'Admin'
//   },
//   {
//     id: 2,
//     name: 'user 2',
//     email: 'user2@org.com',
//     role: 'sub-Admin'
//   },
//   {
//     id: 3,
//     name: 'user 3',
//     email: 'user3@gmail.com',
//     role: 'jr dev'
//   },
//   {
//     id: 4,
//     name: 'user 4',
//     email: 'user4@gmail.com',
//     role: 'Hr'
//   }
// ];

// const UserTable = () => {
//   const theme = useTheme();
//   const [open, setOpen] = useState<boolean>(false)
//   const [customerId, setCustomerId] = useState('')
//   const [organizationId, setOrganizationId] = useState('')
//   const [organizationName, setOrganizationName] = useState('')
//   const [dialogTitle, setDialogTitle] = useState<'Add' | 'User'>('Add')
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     role: '',
//     email: '',
//   })

//   useEffect(() => {
//     const organizationData = localStorage.getItem('organization')
//     if (organizationData) {
//       setOrganizationId(JSON.parse(organizationData).organizationId)
//       setCustomerId(JSON.parse(organizationData).customerId)
//       setOrganizationName(JSON.parse(organizationData).organizationName)
//     }
//   }, [])

//   const handleClose = () => {
//     setUserDetails({

//       'name': '',
//       'role': '',
//       'email': '',
//     }

//     )
//     setOpen(false)
//   }

//   const handleClickOpen = () => setOpen(true)

//   return (
//     <>
//       <Card>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>emp_id</TableCell>
//               <TableCell>name</TableCell>
//               <TableCell>email</TableCell>
//               <TableCell>role</TableCell>
//               <TableCell> <Button
//                 variant='contained'
//                 sx={{ mb: 3, whiteSpace: 'nowrap' }}
//                 onClick={() => {
//                   handleClickOpen()
//                   setDialogTitle('User')
//                 }}
//               >
//                 Add User
//               </Button>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users ? users.map((user: any, index: number) => {

//               return (
//                 <TableRow key={index}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                 </TableRow>
//               );
//             }) : ''}
//           </TableBody>
//         </Table>

//       </Card >
//     </>
//   )
// }
// export default UserTable
