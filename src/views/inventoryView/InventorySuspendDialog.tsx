// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { deleteInventory } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Grid from '@mui/material/Grid'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const InventorySuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props

  // ** States
  const router = useRouter()

  const [inventoryCategoryData, setinventoryCategoryData] = useState<any>({
    customerId: "",
    categoryName: "",
    organizationId: "",
    categoryDescription: ""
  })

  const handleCategoryChange = (e: any) => {
    setinventoryCategoryData((prevState: any) => ({
      ...prevState,

      customerId: user.customerId,
      organizationId: user.organizationId,

      [e.target.name]: e.target.value
    }))

  }

  const { inventoryId } = router.query

  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const handleConfirmation = (value: string) => {

    deleteInventoryData()

    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleConfirmationCancel = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const [user, setUser] = useState<any>()


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      console.log(userDetails, "userDetails")

      // setMaintainState(true)

      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(user, "userData")

  const inventoryData = {
    customerId: user ? user.customerId : "",
    organizationId: user ? user.organizationId : "",
    inventoryId
  }

  console.log(inventoryData, "this is inventoryData")

  const deleteInventoryData = async () => {

    const res = await deleteInventory(inventoryData)
    if (res.statuscode == 204) {

      router.push('/inventory/createInventory/')
    }
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => handleConfirmationCancel('cancel')}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          /></Grid>
        <DialogContent sx={{ pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
              <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.125rem', mb: 5 }}>You won't be able to revert Inventory!</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right' }}>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmationCancel('cancel')}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => handleConfirmation('yes')}>
            Yes, I am Sure!
          </Button>

        </DialogActions>
      </Dialog>
      {/* <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
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
              {userInput === 'yes' ? 'User has been suspended.' : 'Cancelled  :)'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  )
}

export default InventorySuspendDialog
