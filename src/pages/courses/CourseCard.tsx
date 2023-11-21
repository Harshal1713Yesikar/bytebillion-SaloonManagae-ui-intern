import { useEffect, useState } from 'react'

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
import { listOrganizationCourse } from 'src/store/APIs/Api'
import TablePagination from '@mui/material/TablePagination';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import "bootstrap/dist/css/bootstrap.css";
import { dummyData } from 'src/pages/user-management/roles/RolesCard'
import { Skeleton } from '@mui/material'


const CourseCard = (props: any) => {

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
    <Tooltip>
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
    console.log(courseList, "courseList")
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




  return (
    <Card>
      <div style={{ display: 'flex' }}>
        <CardHeader
          sx={{ pb: 0 }}
          title='Course Details'
        />
        <Button className='refresh' variant='outlined' style={{ width: '50px' }} sx={{ mt: 10, mb: 4, height: 30 }} onClick={() => {
          listCourseApiCall(customerId, organizationId);
          setLoading(true)
        }}><RefreshIcon className='refresh' />
        </Button>
      </div>
      <TableContainer sx={{ pb: 3 }}>

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
                      '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2)} !important` }
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
                          background: 'rgba(50, 71, 92, 0.04)'
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
    </Card >
  )
}

export default CourseCard;