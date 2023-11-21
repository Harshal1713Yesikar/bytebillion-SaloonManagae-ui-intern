// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//api imports
import { deleteEmployee } from 'src/store/APIs/Api'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  user: any
  employeeId: any
}

const UserSuspendDialog = (props: Props) => {
  // ** Props
  console.log("first")
  const { open, setOpen, user, employeeId } = props
  const router = useRouter()

  // ** States
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)


  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }
  const handleEmployeeDeleteApi = () => {
    const customerId = user ? user.customerId : ""

    const employeeData = {
      customerId: customerId,
      employeeId: employeeId,
      employeeStatus: "delete"
    }
    deleteEmployee(employeeData).then((res: any) => {
      if (res.statusCode == 204) {

        router.push('/employee/employeeList')
        setSnackbarColor(true)
        setSnackbaropen(true)
        setResponseMessage("Employee is deleted successfully")
      }
    })
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
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
              <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert Employee !</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right', mt: 5 }}>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
            handleConfirmation('yes'),
              setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Employee is deleted successfully")
            handleEmployeeDeleteApi()
          }}>
            Yes, Delete Employee!
          </Button>

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
    </>
  )
}

export default UserSuspendDialog
