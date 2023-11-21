import { useEffect, useState } from 'react'
import BatchWelcome from './batchWelcome'
import BatchCard from './batchCard'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Router, { useRouter } from 'next/router'


const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Batch" && (obj?.action?.includes("create") || obj?.action?.includes("read")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}



const Index = () => {

  const [openSnackBar, setOpenSnackBar] = useState<any>({ open: false, mssg: "" })
  const [listApiStatus, setListApiStatus] = useState<any>()
  const [batchListApiCall, setBatchListApiCall] = useState<boolean>(false)
  const [editBatch, setEditBatch] = useState<any>()
  const [getBatchId, setGetBatchId] = useState<any>()
  const [user, setUser] = useState<any>()
  const [permission, setPermission] = useState<any>()

  useEffect(() => {
   
  }, [batchListApiCall])

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
  }, [user])

  const handleSnackBarClose = () => {
    if (openSnackBar.open == true) {
      setOpenSnackBar({ open: false, mssg: "" })
    }
  }
  const router = useRouter()

  return (
    <>
      <Grid container spacing={6}>

        {permission?.some((obj: any) => obj?.title === "Batch" && obj?.action?.includes("create")) &&
          <Grid item xs={12} sm={12} sx={{ textAlign: ['center', 'start'] }}>
            <BatchWelcome
              setBatchListApiCall={setBatchListApiCall}
              setOpenSnackBar={setOpenSnackBar}
              openSnackBar={openSnackBar}
              handleSnackBarClose={handleSnackBarClose}
              setListApiStatus={setListApiStatus}
              editBatch={editBatch}
              setEditBatch={setEditBatch}
              getBatchId={getBatchId}
              setGetBatchId={setGetBatchId}
            />
          </Grid>}
        {permission?.some((obj: any) => obj?.title === "Batch" && obj?.action?.includes("read")) &&
          <Grid item xs={12} sm={12} sx={{ textAlign: ['center', 'start'] }}>
            <BatchCard
              setBatchListApiCall={setBatchListApiCall}
              listApiStatus={listApiStatus}
              setListApiStatus={setListApiStatus}
              setEditBatch={setEditBatch}
              setGetBatchId={setGetBatchId}
              batchListApiCall={batchListApiCall}
            />
          </Grid>}

      </Grid>


      {/* Snackbar */}
      {openSnackBar.open == true && <Snackbar open={openSnackBar.open} onClose={handleSnackBarClose} autoHideDuration={3000}>
        <Alert variant='filled' elevation={3} onClose={handleSnackBarClose} severity='success'>
          {openSnackBar.mssg}
        </Alert>
      </Snackbar>}

      <Error404Component permission={permission} />
    </>
  )
}

export default Index
