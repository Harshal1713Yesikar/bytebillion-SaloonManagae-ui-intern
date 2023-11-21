// ** React Imports
import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// ** MUI Imports

import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'


import { listOneInventoryApi, updateInventory } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'






const InvoiceListTable = () => {
  // ** State

  const [user, setUser] = useState<any>()
  const [error, setError] = useState<any>(null);
  const [base64String, setBase64String] = useState<any>("");
  const [image, setImage] = useState<any>()
  const [inventoryData, setinventoryData] = useState<any>()
  const [categoryData, setCategoryData] = useState<any>()
  const [openAlert, setOpenAlert] = useState<any>({ open: false, mssg: "" })
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const { inventoryId } = router.query
  const handleCloseAlert = () => {

    setOpenAlert({ open: false })
  }
  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      console.log(userDetails, "userDetailsfor")

      setUser(JSON.parse(userDetails))
    }

    console.log(inventoryId, "inventoryids")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClose = () => {
    setOpen(false)
    setError(null);
  }


  useEffect(() => {
    console.log(categoryData, "categorydata")
  }, [categoryData, inventoryId])

  useEffect(() => {
    if (user && inventoryId) {

      console.log("kjdjdjdj")
      listOneInventoryApi(user.customerId, user.organizationId, inventoryId)
        .then((res) => { setinventoryData(res.data), setCategoryData(res.data.inventoryCategory[0]) })

    }
  }, [user, inventoryId])


  const updateInventoryData = async () => {
    console.log(inventoryData, image, categoryData, "updateInventoryData")
    console.log(base64String, "Dnmndmn")

    const form: any = new FormData()
    form.append("customerId", user.customerId)
    form.append("organizationId", user.organizationId)
    form.append("file", base64String)
    form.append("inventoryId", inventoryId)
    form.append("inventoryCategory", JSON.stringify(categoryData))
    console.log(form, "finalData")
    if (error == 'File size exceeds 2MB limit') {
      setError('File size exceeds 2MB limit')
    }
    else {
      const res = await updateInventory(form)
      if (res.statusCode == 200) {
        console.log("djdjjdnmjnfjfb")
        listOneInventoryApi(user.customerId, user.organizationId, inventoryId)
          .then((res) => { setinventoryData(res.data), setCategoryData(res.data.inventoryCategory[0]) })

        setOpenAlert({ open: true, mssg: res.message })
        setError(null);
      }
      setOpen(false)
      console.log(res, "updateInventoryData")
    }

  }

  const img = new Image();
  img.src = inventoryData ? inventoryData.file : "";

  const handleChange = (e: any) => {

    setError(null);
    const selectedFile = e.target.files[0];


    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit');
    } else {
      // setFile(selectedFile);
    }
    setImage(e.target.files[0])
  }
  useEffect(() => {
    const image = inventoryData?.file
    if (image) {
      setBase64String(image)
    }

  }, [inventoryData])


  useEffect(() => {
    const reader = new FileReader();
    if (image) {
      console.log(image, "imagendn")

      reader.readAsDataURL(image);
    }
    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64String(base64String)
      console.log(base64String);

      // Use the base64String as needed
    };

  }, [image])

  const [permission, setPermission] = useState<any>()


  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)

    }
  }, [user])



  const handleDownload = () => {


    console.log(base64String, "snsn")
    const base64Image = base64String; // Replace with your Base64 string


    const link = document.createElement('a');
    link.href = base64Image;
    link.download = 'image.png';
    link.click();
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {base64String ? <img src={img.src} alt="image" width="350vh" height="350vh" /> : ''}

        </Grid>

      </Grid>
      {permission?.some((obj: any) => obj?.title === "Expenses" && obj?.action?.includes("update")) &&
        <Button onClick={() => {
          setOpen(true)
        }} variant='contained' >{base64String ? 'Edit Image ' : 'Upload Image'}
        </Button>}
      {
        base64String ? <Button onClick={handleDownload}>
          <Icon icon="zondicons:download" />
        </Button> : ''
      }



      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <Grid container justifyContent="flex-end" alignItems="center" sx={{ mt: '-15px' }}>
          <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>Category</DialogTitle>
          <Icon
            className="iconContainer"
            onClick={handleClose}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid >

        <DialogContent>
          <TextField id='name' type='file' onChange={handleChange} autoFocus fullWidth />
          {error && <div style={{ color: 'red' }}>{error}</div>}

        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancle
          </Button>
          <Button variant='contained' onClick={() => {

            updateInventoryData()

          }} >
            update
          </Button>
        </DialogActions>
      </Dialog>

      {openAlert.open == true ? <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
        <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
          {openAlert.mssg}
        </Alert>
      </Snackbar> : ""}
    </>
  )
}

export default InvoiceListTable
