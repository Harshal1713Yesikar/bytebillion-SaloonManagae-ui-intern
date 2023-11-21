// ** React Imports
import { forwardRef, useState, ChangeEvent, useEffect, SyntheticEvent } from 'react'



// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import Icon from 'src/@core/components/icon'
import InputAdornment from '@mui/material/InputAdornment';
import EventNoteIcon from '@mui/icons-material/EventNote';

// ** Custom Components


import CustomAvatar from 'src/@core/components/mui/avatar'
import InventorySuspendDialog from './InventorySuspendDialog'
import InventorySubscriptionDialog from './InventorySubscriptionDialog'
import { listAllInventoryCategoryApi, createInventoryCategory, updateInventory, listOneInventoryApi } from 'src/store/APIs/Api'


import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'


interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/10.png'
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const InventoryViewLeft = () => {
  // ** States
  const router = useRouter()
  const { inventoryId } = router.query
  const [user, setUser] = useState<any>()
  const [inData, setInData] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<any>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [inventoryData, setinventoryData] = useState<any>()
  const [maintainState, setMaintainState] = useState<any>()
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [openAlert, setOpenAlert] = useState<any>({ open: false, mssg: "" })
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [listinvetoryCategoryData, setListInventoryCategoryData] = useState<any>([])
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const handleCloseAlert = () => {
    setOpenAlert({ open: false })
  }
  useEffect(() => {
    if (inData) {
      if (inData.categoryName != "" && inventoryData) {
        if (inventoryData.inventoryCategory[0]) {
          inventoryData.inventoryCategory[0].categoryName = inData.categoryName
          const tempData = inventoryData
          setinventoryData(tempData)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inData])

  useEffect(() => {
    if (inventoryData) {
      const date = new Date(inventoryData.dateCreated);
      setStartDate(inventoryData.dateCreated)
    }

  }, [inventoryData])

  useEffect(() => {
    if (inventoryData) {
    }
  }, [inventoryData])

  const handleClickOpen = () => setOpen(true)

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setMaintainState(true)
      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setOpen(false)
  }



  useEffect(() => {
    if (maintainState == true) {
      if (user) {
        if (inventoryId) {
          listOneInventoryApi(user.customerId, user.organizationId, inventoryId)
            .then((res) => { setinventoryData(res.data); setLoading(false) })

          setMaintainState(false)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maintainState, inventoryId])


  const handleClick = () => {
    setOpenAlert({ open: false })
  }

  const handleChange = (e: any) => {
    setinventoryData({
      ...inventoryData, [e.target.name]: e.target.value
    })

  }

  const [inventoryCategoryData, setinventoryCategoryData] = useState<any>({
    customerId: "",
    categoryName: "",
    organizationId: "",
    categoryDescription: ""
  })

  const createInventoryCategoryApi: any = () => {

    // setConditionAlert(true)

    createInventoryCategory(inventoryCategoryData).then((res: any) => {
      if (res.data.statusCode == 200) {
        setOpenAlert({ open: true, mssg: res.data.message })
        callListAllInventoryCategoryApi();
      }
    })
    setOpen(false)

    // handleClick()
  }

  const callListAllInventoryCategoryApi = () => {
    listAllInventoryCategoryApi(user.customerId, user.organizationId).then((res) => {
      setListInventoryCategoryData(res.data.inventoryCategories)
    })
  }


  const [permission, setPermission] = useState<any>()
  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)

    }
  }, [user])



  useEffect(() => {

    if (user) {
      listAllInventoryCategoryApi(user.customerId, user.organizationId).then((res) => {
        setListInventoryCategoryData(res?.data?.inventoryCategories)
      })
    }

  }, [user])

  const handleDateChange = (date: DateType) => {
    if (date) {

      const timestamp = date.getTime(); // Convert date to timestamp
      setinventoryData({
        ...inventoryData, ["dateCreated"]: timestamp
      })
    }
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => {
    setOpenEdit(true)
    listOneInventoryApi(user.customerId, user.organizationId, inventoryId)
      .then((res) => {
        setinventoryData(res?.data)
        setLoading(false)
      })
  }
  const handleEditClose = () => {
    listOneInventoryApi(user.customerId, user.organizationId, inventoryId)
      .then((res) => { setinventoryData(res?.data) })
    setLoading(false)
    setOpenEdit(false)
  }

  const updateInventoryData = async () => {
    const form: any = new FormData()
    form.append("inventoryData", inventoryData)
    const res = await updateInventory(inventoryData)
    if (res.statusCode == 200) {
      setOpenEdit(false)
      setOpenAlert({ open: true, mssg: res.message })
    }
  }

  const handleCategoryChange = (e: any) => {
    setinventoryCategoryData((prevState: any) => ({
      ...prevState,

      customerId: user.customerId,
      organizationId: user.organizationId,

      [e.target.name]: e.target.value
    }))

  }


  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Button sx={{ mr: 2, mt: 3, mb: 3 }} onClick={() => { router.push('/inventory/createInventory/') }} variant='outlined' >
            &#8592; Expense List
          </Button>
          <Card>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar.length ? (
                <CustomAvatar
                  src={data.avatar}
                  sx={{ width: 110, height: 110, mb: 6 }}
                  variant='rounded'
                  alt={(inventoryData) ? inventoryData.inventoryName : "E"}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {getInitials(data.fullName)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                {
                  loading ? <Skeleton>
                    <Typography>abd efg hijkl</Typography>
                  </Skeleton> :
                    (inventoryData) ? inventoryData.inventoryName : ""}
              </Typography>

            </CardContent>



            <CardContent>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Details</Typography>

                <Grid>
                  {permission?.some((obj: any) => obj?.title === "Expenses" && obj?.action?.includes("update")) &&

                    <Button className='edit' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={handleEditClickOpen}>
                      <Icon
                        cursor="pointer"
                        icon='bx:pencil' />
                    </Button>}
                  {permission?.some((obj: any) => obj?.title === "Expenses" && obj?.action?.includes("delete")) &&

                    <Button className='delete' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => setSuspendDialogOpen(true)}>
                      <Icon cursor="pointer" icon='ic:baseline-delete' />
                    </Button>}
                </Grid>
              </Grid>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
              <Box sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Inventory id:</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem m</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary' }}>{(inventoryData) ? inventoryData?.inventoryId : ""}</Typography>

                  }

                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Inventory name</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem ipsum dol</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary' }}>{(inventoryData) ? inventoryData?.inventoryName : ""}</Typography>
                  }
                </Box>

                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Inventory amount:</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem ipsum</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(inventoryData) ? inventoryData?.inventoryAmount : ""}</Typography>
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Inventory description:</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem ipsum</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(inventoryData) ? inventoryData?.inventoryDescription : ""}</Typography>
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Inventory category:</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem ipsum</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(inventoryData?.inventoryCategory[0]) ? inventoryData.inventoryCategory[0].categoryName : ""}</Typography>
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Category description:</Typography>
                  {
                    loading ? <Skeleton>
                      <Typography sx={{ color: 'text.secondary' }}>lorem2</Typography>
                    </Skeleton> :
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{(inventoryData?.inventoryCategory[0]) ? inventoryData.inventoryCategory[0].categoryDescription : ""}</Typography>
                  }
                </Box>

              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

            </CardActions>

            <Dialog
              scroll='body'
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{
                '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
                '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
              }}
              aria-describedby='user-view-edit-description'
            >
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  Edit Inventory Information
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => {
                    handleEditClose()
                    setFormUpdateButton(false)
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                /></Grid>

              <DialogContent>

                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Name of entity' name="inventoryName" onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} value={inventoryData ? inventoryData.inventoryName : ""} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Description' name="inventoryDescription" value={inventoryData ? inventoryData.inventoryDescription : ""} onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Currency</InputLabel>
                        <Select
                          label='Currency'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                          name="currencyCode"
                          onChange={(event) => {
                            handleChange(event);
                            setFormUpdateButton(true);
                          }}
                          value={inventoryData ? inventoryData.currencyCode : ""}
                        >
                          <MenuItem value='RUPEES'>Rupees</MenuItem>
                          <MenuItem value='DOLLAR'>Dollar</MenuItem>
                          <MenuItem value='POUND'>Pound</MenuItem>

                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Amount' name="inventoryAmount" onChange={(event) => {
                        handleChange(event);
                        setFormUpdateButton(true);
                      }} value={inventoryData ? inventoryData.inventoryAmount : ""} />
                    </Grid>

                    <Grid item sm={6}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Grid item xs={12} sm={100}>
                          <FormControl fullWidth>
                            <InputLabel id='user-view-status-label'>Category</InputLabel>
                            <Select
                              label='Category'

                              defaultValue={data.status}
                              id='user-view-status'
                              labelId='user-view-status-label'
                              value={inData ? inData.categoryName : inventoryData && inventoryData.inventoryCategory[0] && inventoryData.inventoryCategory[0].categoryName}
                              name='categoryName'
                            >
                              {(listinvetoryCategoryData && listinvetoryCategoryData.length > 0) ? (
                                listinvetoryCategoryData.map((e: any, index: any) => (
                                  <MenuItem key={index} value={e.categoryName} onClick={() => { setInData(e); setFormUpdateButton(true) }}>
                                    {e.categoryName}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem disabled>
                                  No data found
                                </MenuItem>
                              )}

                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}  >
                          <AddCircleIcon style={{ cursor: "pointer" }} onClick={handleClickOpen} />
                        </Grid>

                      </div>
                      <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            id='basic-input'
                            name='dateCreated'
                            required

                            onChange={(event) => {
                              handleDateChange(event);
                              setFormUpdateButton(true);
                            }}
                            placeholderText='Expenditure date'

                            customInput={<CustomInput
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}
                              label='Expenditure date' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                                throw new Error('Function not implemented.');
                              }} />}
                          />
                        </DatePickerWrapper>
                      </Grid>

                    </Grid>
                  </Grid>
                </form>
              </DialogContent>

              <DialogActions sx={{ justifyContent: 'right', width: '100%', display: 'flex', justifyItems: 'center' }}>
                <Button variant='outlined' color='secondary' onClick={() => {
                  handleEditClose()
                  setFormUpdateButton(false)
                }}>
                  Cancel
                </Button>
                <Button variant='contained' sx={{ mr: 2 }}
                  onClick={() => {
                    updateInventoryData()
                    setFormUpdateButton(false)
                  }} disabled={!formUpdateButton}>
                  Update
                </Button>

              </DialogActions>
            </Dialog>

            <InventorySuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            {/* <InventorySubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} /> */}
          </Card>
        </Grid>

        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
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
            /></Grid>

          <DialogContent>
            <TextField id='name' autoFocus fullWidth label='Name' name='categoryName' value={inventoryCategoryData.categoryName} onChange={handleCategoryChange} />
            <br />
            <br />
            <TextField id='name' autoFocus fullWidth label='Discription' name='categoryDescription' value={inventoryCategoryData.categoryDescription} onChange={handleCategoryChange} />
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancle
            </Button>
            <Button variant='contained' onClick={() => {
              createInventoryCategoryApi()


            }} >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        {
          openAlert.open == true ? <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
            <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
              {openAlert.mssg}
            </Alert>
          </Snackbar> : ""
        }
      </Grid >
    )
  } else {
    return null
  }
}

export default InventoryViewLeft
