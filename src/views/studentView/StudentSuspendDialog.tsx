// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import CustomChip from 'src/@core/components/mui/chip'
import DialogActions from '@mui/material/DialogActions'
import { deleteStudent } from '../../store/APIs/Api'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { updateStudenPaymentDetails, createCoupon, updateStudenCourseCouponBatchDetails, listOneStudentDetailApi, couponCountCheck, getCouponList } from 'src/store/APIs/Api'
import Icon from 'src/@core/components/icon'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const StudentSuspendDialog = ({ studentStatus, setStudentStatus, setOpen, open }: any) => {
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const router = useRouter()
  const [studentDetails, setStudentDetails] = useState<any>()
  const { studentId } = router.query
  const handleClose = () => setOpen(false)
  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  useEffect(() => {
    if (user && studentId) {
      console.log("student", studentDetails, studentStatus)
      listApiCall();
      console.log("api called")
    }
  }, [user, studentId]);



  const listApiCall = () => {
    if (user && user.customerId && user.organizationId && studentId) {
      listOneStudentDetailApi(user.customerId, user.organizationId, studentId)
        .then((res) => {
          if (res.statuscode === 200) {

            setStudentDetails(res.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
        });
    }
  };


  const handleSave = () => {
    handleStudentStatusChange();
  }

  const handleStudentStatusChange = () => {
    console.log(studentStatus, "studentStatus")
    if (studentStatus && user) {
      setStudentDetails({ ...studentDetails, studentStatus: studentStatus });
      deleteStudent(user.customerId, studentId, user.organizationId, studentStatus)
        .then((response: any) => {
          setOpen(false);
          if (response.statuscode === 200) {
            setStudentDetails(response.data);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching student details:", error);
        });

    }

  }
  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
  }
  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  return (
    <>
      <Dialog fullWidth open={open} sx={{ '& .MuiPaper-root': { width: '100%' } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => handleConfirmation('cancel')}
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
              <Icon icon='bx:error-circle' fontSize='5.5rem' />
              <Typography sx={{ fontSize: '1.125rem' }}>
                Do you want to change the status ?
              </Typography>
              <Typography sx={{ fontSize: '1.125rem', mt: 5, textAlign: 'center' }}>
                Current status :
                {studentDetails?.studentStatus == 'active' ?
                  <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={"active"} />
                  :
                  <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={"inActive"} />
                }
              </Typography>
              <Grid item xs={100} sm={6} mt={8} ml={15}>
                <FormControl sx={{ width: '100%', textAlign: 'center' }}>
                  <InputLabel

                    id='validation-basic-select'
                    htmlFor='validation-basic-select'
                  >
                    Student's status
                  </InputLabel>
                  <Select
                    sx={{ textAlign: 'left' }}
                    value={studentStatus}
                    label='Student status'
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {studentDetails?.studentStatus == 'inActive' ?
                      <MenuItem value="active" onClick={() => setStudentStatus('active')}>Active</MenuItem>
                      :
                      <MenuItem value="inActive" onClick={() => setStudentStatus('inActive')}>InActive</MenuItem>


                    }
                    {/* <MenuItem value="delete" onClick={() => setStudentStatus('delete')}>Delete</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
          </Box>
        </DialogContent>

        <Box sx={{ display: 'flex', justifyContent: 'right', flexDirection: 'row', width: '100%' }}>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
              Cancel
            </Button>
          </DialogActions>
          <DialogActions sx={{ justifyContent: 'left', bg: 'blue', ml: '-25px' }}>
            <Button variant='contained' color='primary' onClick={() => { handleSave(); handleConfirmation('cancel') }}>
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog >


      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={handleSecondDialogClose}
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'bx:check-circle' : 'bx:x-circle'} />
            <Typography variant='h4' sx={{ mb: 8, color: 'text.secondary' }}>
              {userInput === 'yes' ? 'Suspended!' : 'Cancelled'}
            </Typography>
            <Typography sx={{ fontSize: '1.125rem' }}>
              {userInput === 'yes' ? 'User has been suspended.' : 'Cancelled Suspension :)'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>


      {/* <Dialog fullWidth open={open} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => handleConfirmation('cancel')}
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
              <Icon icon='bx:error-circle' fontSize='5.5rem' />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert student !</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right', mt: 5 }}>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
            setStudentStatus('delete')
            handleSave()

            // setSnackbarColor(true)
            // setSnackbaropen(true)
            // setResponseMessage("student is deleted successfully")
            // setDeleteDialogOpen(false)

          }}>
            Yes, Delete student!
          </Button>

        </DialogActions>
      </Dialog> */}

    </>
  )
}
export default StudentSuspendDialog;
