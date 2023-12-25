// import { useEffect, useState } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Table from '@mui/material/Table'
// import Button from '@mui/material/Button'
// import TableRow from '@mui/material/TableRow'
// import TableBody from '@mui/material/TableBody'
// import TableHead from '@mui/material/TableHead'
// import TableCell from '@mui/material/TableCell'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import TableContainer from '@mui/material/TableContainer'
// import RefreshIcon from '@mui/icons-material/Refresh';
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import Grid, { GridProps } from '@mui/material/Grid'
// import DialogTitle from '@mui/material/DialogTitle'
// import Dialog from '@mui/material/Dialog'
// import { deleteBatch } from 'src/store/APIs/Api'
// import Snackbar from '@mui/material/Snackbar'
// import Alert from '@mui/material/Alert'

// // ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import { useRouter } from 'next/router'

// // ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'
// import { getAllBatchList } from 'src/store/APIs/Api'
// import TablePagination from '@mui/material/TablePagination';
// import Tooltip from '@mui/material/Tooltip';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import "bootstrap/dist/css/bootstrap.css";
// import IconButton from '@mui/material/IconButton'
// import Icon from 'src/@core/components/icon'
// import { dummyData } from 'src/pages/user-management/roles/RolesCard'
// import { Skeleton } from '@mui/material'
// import { lightBlue } from '@mui/material/colors'


// const BatchCard = (props: any) => {

//   const { setListApiStatus, listApiStatus, setEditBatch, setGetBatchId, setBatchListApiCall, batchListApiCall } = props

//   const [user, setUser] = useState<any>()
//   const [permission, setPermission] = useState<any>()
//   const [listBatch, setListBatch] = useState<any>([])
//   const [disc, setDisc] = useState<any>()
//   const [deleteBatchPopup, setDeleteBatchPopup] = useState<boolean>(false)
//   const [batchStatus, setBatchStatus] = useState<any>()
//   const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
//   const [snackbaropen, setSnackbaropen] = useState<any>(false)
//   const [responseMessage, setResponseMessage] = useState<string>("")
//   const [open, setOpen] = useState<any>(false)
//   const [page, setPage] = useState(0);
//   const [batchId, setBatchId] = useState<any>()
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const router = useRouter()

//   // const tooltip = (
//   //   <Tooltip>
//   //     {disc}
//   //   </Tooltip>
//   // );
//   const [loading, setLoading] = useState(true);

//   // ## hover end
//   useEffect(() => {
//     if (batchListApiCall) {
//       listBatchApiCall();
//       setBatchListApiCall(false)
//     }
//   }, [batchListApiCall])
//   const deleteApiCall = (batchStatus: any) => {

//     if (user) {
//       const customerId = user.customerId
//       const organizationId = user.organizationId
//       if (batchId && batchStatus) {
//         deleteBatch(customerId, organizationId, batchId, batchStatus).then((res: any) => {
//           if (res.statusCode == 200) {
//             setSnackbarColor(true)
//             setSnackbaropen(true)
//             setResponseMessage("Batch deleted successfully ")
//             setDeleteBatchPopup(false)

//             // handleClose();
//             setListApiStatus(true)
//             setBatchStatus('')
//             setGetBatchId('')
//           }
//           else {
//             setOpen({ open: true, mssg: res.message })

//             // handleClose();
//           }
//         }).catch((err: any) => {
//           console.log(err)
//         })

//       }
//     }
//   }


//   useEffect(() => {
//     const userDetails = localStorage.getItem('organization')
//     if (userDetails) {
//       setUser(JSON.parse(userDetails))
//     }

//   }, [])



//   useEffect(() => {
//     if (listBatch || user) {
//       listBatchApiCall()
//       setListApiStatus(false)
//     }
//   }, [user])


//   const listBatchApiCall = () => {
//     if (user) {
//       const customerId = user.customerId
//       const organizationId = user.organizationId

//       getAllBatchList(customerId, organizationId).then((res: any) => {
//         setListBatch(res?.data)
//         setLoading(false)
//       }).catch((err: any) => {
//         console.log(err)
//       })
//     }
//   }



//   return (
//     <Card>
//       <div style={{ display: 'flex' }}>
//         <CardHeader
//           sx={{ pb: 0 }}
//           title='Batch Details'
//         />
//         <Button className='refresh' variant='outlined' style={{ width: '50px' }} sx={{ mt: 10, mb: 4, height: 30 }} onClick={() => {
//           listBatchApiCall();
//           setLoading(true)
//         }}><RefreshIcon className='refresh' />
//         </Button>
//       </div>
//       <TableContainer sx={{ pb: 3 }}>

//         <Table>
//           <TableHead>
//             <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
//               <TableCell>Name</TableCell>
//               <TableCell>Interval</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Mode</TableCell>

//               {/* {permission?.some((obj: any) => obj?.title === "Batch" && obj?.action?.includes("update")) &&
//                 <TableCell>Action</TableCell>
//               } */}


//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               loading ?
//                 dummyData.map((val: any, index: number) => {


//                   <TableRow
//                     key={val.batchName}
//                     sx={{
//                       '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
//                     }}
//                   >
//                     <TableCell>
//                       {/* <OverlayTrigger placement="top" overlay={tooltip} > */}

//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>

//                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                           <Skeleton>
//                             <Typography noWrap sx={{ fontWeight: 500 }}>
//                               Lorem, ipsum.
//                             </Typography>
//                           </Skeleton>
//                         </Box>
//                       </Box>
//                       {/* </OverlayTrigger> */}

//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex' }}>
//                         <Skeleton>
//                           <Typography variant='body2' sx={{ fontWeight: 500 }}>
//                             Lorem, ipsum.
//                           </Typography>
//                         </Skeleton>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex' }}>
//                         <Skeleton>
//                           <Typography variant='body2' sx={{ fontWeight: 500 }}>
//                             Lorem, ipsum.
//                           </Typography>
//                         </Skeleton>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton>
//                         Lorem, ipsum.
//                       </Skeleton>
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton>
//                         Lorem, ipsum.
//                       </Skeleton>
//                     </TableCell>
//                   </TableRow>
//                 })
//                 :
//                 listBatch?.length ? listBatch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row: any) => {
//                   return (

//                     <TableRow
//                       key={row.batchName}
//                       sx={{
//                         '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` },
//                         cursor: 'pointer',
//                         '&:hover': {
//                           background: 'rgba(50, 71, 92, 0.04)'
//                         }
//                       }}
//                     >
//                       <TableCell>
//                         <div className="custom-tooltip" title={row.batchName.charAt(0).toUpperCase() + row.batchName.slice(1)}>

//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             {row.src ? (
//                               <CustomAvatar src={row.src} alt={row.batchName} sx={{ width: 38, height: 38, mr: 3 }} />
//                             ) : (
//                               <CustomAvatar
//                                 skin='light'
//                                 color='primary'
//                                 sx={{ mr: 3, width: 38, height: 38, fontWeight: 600, fontSize: '1rem' }}
//                               >
//                                 {getInitials(row.batchName.charAt(0).toUpperCase())}
//                               </CustomAvatar>
//                             )}
//                             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                               <Tooltip title={row.batchName} componentsProps={{
//                                 tooltip: {
//                                   sx: {
//                                     bgcolor: "black",
//                                     textTransform: "capitalize",
//                                     "& .MuiTooltip-arrow": {
//                                       color: "black"
//                                     }
//                                   }
//                                 }
//                               }}>
//                                 <Typography noWrap sx={{ fontWeight: 500 }}>
//                                   {row.batchName.charAt(0).toUpperCase() + row.batchName.slice(1)}
//                                 </Typography>
//                               </Tooltip>
//                             </Box>
//                           </Box>
//                         </div>

//                       </TableCell>
//                       <TableCell>
//                         <div
//                         >
//                           <Box sx={{ display: 'flex' }}>
//                             <Tooltip title={row.batchStartDate + " - " + row.batchEndDate} componentsProps={{
//                               tooltip: {
//                                 sx: {
//                                   bgcolor: "black",
//                                   textTransform: "capitalize",
//                                   "& .MuiTooltip-arrow": {
//                                     color: "black"
//                                   }
//                                 }
//                               }
//                             }}>
//                               <Typography variant='body2' sx={{ fontWeight: 500 }}>
//                                 {row.batchStartDate} - {row.batchEndDate}
//                               </Typography>
//                             </Tooltip>
//                           </Box>
//                         </div>
//                       </TableCell>
//                       <TableCell>

//                         <div className="custom-tooltip" title={row.batchClassStartTime + " - " + row.batchClassEndTime}>
//                           <Box sx={{ display: 'flex' }}>
//                             <Tooltip title={row.batchClassStartTime + " - " + row.batchClassEndTime}
//                               componentsProps={{
//                                 tooltip: {
//                                   sx: {
//                                     bgcolor: "black",
//                                     textTransform: "capitalize",
//                                     "& .MuiTooltip-arrow": {
//                                       color: "black"
//                                     }
//                                   }
//                                 }
//                               }}>
//                               <Typography variant='body2' sx={{ fontWeight: 500 }}>
//                                 {row.batchClassStartTime} - {row.batchClassEndTime}
//                               </Typography>
//                             </Tooltip>
//                           </Box>
//                         </div>

//                       </TableCell>

//                       <TableCell>
//                         {
//                           row.batchStatus == 'active' ?
//                             <CustomChip rounded size='small' skin='light' color='success' label={row.batchStatus} />
//                             :
//                             <CustomChip rounded size='small' skin='light' color='error' label={row.batchStatus} />
//                         }
//                       </TableCell>
//                       <TableCell>
//                         {
//                           row.batchMode == 'online' ?
//                             <CustomChip rounded size='small' skin='light' color='primary' label={row.batchMode} />
//                             :
//                             <CustomChip rounded size='small' skin='light' color='warning' label={row.batchMode} />
//                         }
//                       </TableCell>

//                       {/* {
//                         permission?.some((obj: any) => obj?.title === "Batch" && obj?.action?.includes("update")) &&
//                         <TableCell>
//                           <IconButton onClick={() => {
//                             setGetBatchId(row.batchId)
//                             setEditBatch(true)
//                           }}>
//                             <Icon style={{ cursor: "pointer" }} icon='bx:pencil' />
//                           </IconButton>
//                         </TableCell>
//                       }
//                       {
//                         permission?.some((obj: any) => obj?.action?.includes("delete")) &&
//                         <TableCell>
//                           <IconButton onClick={() => {
//                             setBatchId(row.batchId)
//                             setEditBatch(false);
//                             setDeleteBatchPopup(true)
//                           }}>
//                             <Icon style={{ cursor: "pointer" }} icon='ic:baseline-delete' />
//                           </IconButton>
//                         </TableCell>
//                       } */}

//                     </TableRow>
//                   )
//                 }) : <div style={{ width: "420%", display: "flex", justifyContent: "center", textAlign: "center", paddingTop: "20px" }}>
//                   No data found</div>}
//           </TableBody>
//           <TablePagination
//             sx={{ marginBottom: '0px' }}
//             count={listBatch?.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(event, newPage) => {
//               setPage(newPage);
//             }}
//             onRowsPerPageChange={(event) => {
//               setRowsPerPage(parseInt(event.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 15]}
//           />
//         </Table>
//       </TableContainer>
//       {
//         deleteBatchPopup == true ? <Dialog fullWidth open={deleteBatchPopup} onClose={() => setDeleteBatchPopup(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
//           <Grid container justifyContent="flex-end">
//             <Icon
//               className="iconContainer"
//               onClick={() => setDeleteBatchPopup(false)}
//               style={{
//                 cursor: "pointer",
//                 fontSize: "30px",
//                 margin: "8px",
//                 transition: "background-color 0.3s",
//               }}
//               icon='bx:x'
//             />
//           </Grid>
//           <DialogContent sx={{ pb: 4 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//               <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
//                 <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
//                 <Typography variant='h4' sx={{ color: 'text.secondary' }}>
//                   Are you sure?
//                 </Typography>
//               </Box>
//               <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>You won't be able to revert batch !</Typography>
//             </Box>
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: 'right' }}>
//             <Button variant='outlined' color='secondary' onClick={() => setDeleteBatchPopup(false)}>
//               Cancel
//             </Button>
//             <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {

//               deleteApiCall('delete');
//             }}>
//               Delete
//             </Button>

//           </DialogActions>
//         </Dialog> : ""
//       }
//       <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
//         <Alert
//           variant="filled"
//           elevation={3}
//           onClose={() => setSnackbaropen(false)}
//           severity={snackbarColor === true ? 'success' : 'error'}
//         >
//           {responseMessage}
//         </Alert>
//       </Snackbar>
//     </Card >
//   )
// }

// export default BatchCard;