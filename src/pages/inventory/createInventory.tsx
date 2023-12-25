// ** React Imports
import { forwardRef, useState, ChangeEvent, useEffect, SyntheticEvent } from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from '@mui/material/Dialog'
import Icon from 'src/@core/components/icon'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { createInventory, listAllInventoryCategoryApi, createInventoryCategory } from 'src/store/APIs/Api';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import InventoryTable from "src/views/tabel/inventoryTabel/inventoryTabel";
import Router from 'next/router'
import InputAdornment from '@mui/material/InputAdornment';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  inventoryDescription: string
  currencyCode: string
  inventoryAmount: string
  categoryName: string
  inventoryName: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  email: '',
  radio: '',
  select: '',
  inventoryDescription: '',
  currencyCode: '',
  inventoryAmount: '',
  categoryName: '',
  inventoryName: ''
}

// const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
//   return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
// })
const CustomInput = forwardRef(({ ...props }: any, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Expenses" && (obj?.action?.includes("create") || obj?.action?.includes("read")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}



const FormValidationBasic = () => {
  const [permission, setPermission] = useState<any>()
  const [user, setUser] = useState<any>()
  const router = useRouter()
  const [listInventoryCategoryData, setListInventoryCategoryData] = useState<any>([])
  const [inData, setInData] = useState<any>({
    "organizationId": "bB-234",
    "categoryName": "",
    "categoryDescription": "this is bike"
  })
  const [inventoryCategoryData, setinventoryCategoryData] = useState<any>({
    customerId: "",
    categoryName: "",
    organizationId: "",
    categoryDescription: ""
  })
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<any>(null);
  const [conditonAlert, setConditionAlert] = useState(false)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [handleTableReload, setHandleTableReload] = useState<any>(false)
  const [submit, setSubmit] = useState<boolean>(false)
  const [expenseDialogBox, setExpenseDialogBox] = useState<any>(false);

  // const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const [openAlert, setOpenAlert] = useState<boolean>(false)

  // ** Hooks
  const {
    reset: inventoryReset,
    control,
    handleSubmit,
    getValues: entityDetails,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const handleReset = () => {
    inventoryReset({
      categoryName: "",
      currencyCode: "",
      inventoryAmount: "",
      inventoryDescription: "",
      inventoryName: "",
    })
    setBase64String("")
    setImage('')
    setError('')

  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {

    if (user) {
      setPermission(user.role.permissions)
      listAllInventoryCategoryApi(user.customerId, user.organizationId).then((res) => {
        setListInventoryCategoryData(res?.data?.inventoryCategories)
        setInData(res?.data?.inventoryCategories)
      })
    }

  }, [user])


  const onSubmit = () => {
    // toast.success('Form Submitted')
    return 0;
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCategoryChange = (e: any) => {
    setinventoryCategoryData((prevState: any) => ({
      ...prevState,

      customerId: user.customerId,
      organizationId: user.organizationId,

      [e.target.name]: e.target.value
    }))

  }

  const handleClick = () => {
    setOpenAlert(true)
  }

  const handleClickOpen = () => setOpen(true)

  const createInventoryApi: any = () => {
    const form = new FormData()
    form.append("file", base64String)
    form.append("customerId", user.customerId)
    form.append("organizationId", user.organizationId)
    form.append("inventoryName", entityDetails().inventoryName)
    form.append("inventoryDescription", entityDetails().inventoryDescription)
    form.append("inventoryAmount", entityDetails().inventoryAmount)
    form.append("categoryName", entityDetails().categoryName)
    form.append("inventoryCategory", JSON.stringify(inData))
    form.append("currencyCode", entityDetails().currencyCode)
    form.append("dateCreated", String(startDate))
    form.append("inventoryStatus", "active")

    setConditionAlert(false)
    setOpenAlert(false)
    if (entityDetails().inventoryName == '' && entityDetails().inventoryDescription == '' && entityDetails().currencyCode == '' && entityDetails().inventoryAmount == '' && entityDetails().categoryName == '') {
    }
    else {

      if (error == 'File size exceeds 2MB limit') {
        setError('File size exceeds 2MB limit')
      } else {

        createInventory(form).then((res: any) => {
          if (res.data.statusCode == 200) {
            handleClick()
            handleReset()
            setExpenseDialogBox(false)
            setHandleTableReload(!handleTableReload)
            setSubmit(false)
            setSnackbarColor(true)
            setOpenAlert(true)
            setResponseMessage("Expense added")
          }
        })
      }
    }
  }

  const handleCloseAlert = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const createInventoryCategoryApi: any = () => {

    setConditionAlert(true)

    if (inventoryCategoryData.categoryName && inventoryCategoryData.categoryDescription) {

      createInventoryCategory(inventoryCategoryData).then((res: any) => {
        if (res.data.statusCode == 200 && inventoryCategoryData.categoryName && inventoryCategoryData.categoryDescription) {
          callListAllInventoryCategoryApi();
          setSnackbarColor(true)
          setSnackbarOpen(true)
          setinventoryCategoryData({
            customerId: "",
            categoryName: "",
            organizationId: "",
            categoryDescription: ""
          })
          setResponseMessage("Category is created successfully")

        }
        else {
          setSnackbarColor(false)
          setSnackbarOpen(true)
          setResponseMessage("Fill all the required information")
        }

      })
      setOpen(false)
      handleClick()
    }
    else {
      setSnackbarColor(false)
      setSnackbarOpen(true)
      setResponseMessage("Fill all the required information")
    }

  }

  const callListAllInventoryCategoryApi = () => {
    listAllInventoryCategoryApi(user.customerId, user.organizationId).then((res) => {
      setListInventoryCategoryData(res?.data?.inventoryCategories)
    })
  }
  const [image, setImage] = useState<any>()
  const [base64String, setBase64String] = useState<any>("");
  useEffect(() => {

    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64String(base64String)

      // Use the base64String as needed
    };

  }, [image])

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
    setError(null);
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit');
    } else {
      // setFile(selectedFile);
    }
  }



  return (
    <>
      <Error404Component permission={permission} />

      {permission?.some((obj: any) => obj?.title === "Expenses" && (obj?.action?.includes("create"))) &&
        <>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button sx={{ mb: 5 }} variant='contained' onClick={() => { setExpenseDialogBox(true); setSubmit(false) }}>Add Expense   <Icon
              className="iconContainer"
              style={{
                cursor: "pointer",
                fontSize: "20px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:book'
            />
            </Button>
          </div>
          <Dialog open={expenseDialogBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-15px' }}>
              <CardHeader title='Create Expense' />
              <Icon
                className="iconContainer"
                onClick={() => { setExpenseDialogBox(false), setSubmit(false) }}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  margin: "8px",
                  transition: "background-color 0.3s",
                }}
                icon='bx:x'
              />
            </div>
            <CardContent>
              <form onSubmit={(event: any) => { handleSubmit(onSubmit); event.preventDefault() }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='inventoryName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Name of expenses '
                            onChange={onChange}
                            placeholder='Name of expenses '
                            error={submit ? entityDetails().inventoryName ? false : true : false}
                            helperText={submit && !entityDetails().inventoryName ? 'Required,max 50 chars' : ''}
                            aria-describedby='validation-basic-first-name'
                            autoComplete='OFF'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />
                      {errors.inventoryName && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='inventoryDescription'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Description '
                            onChange={onChange}

                            placeholder='Description '
                            error={submit ? entityDetails().inventoryDescription ? false : true : false}
                            helperText={submit && !entityDetails().inventoryDescription ? 'Required,max 500 chars' : ''}
                            aria-describedby='validation-basic-last-name'
                            autoComplete='OFF'
                            inputProps={{
                              maxLength: 500,
                            }}
                          />

                        )}
                      />
                      {errors.inventoryDescription && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='inventoryAmount'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            sx={{
                              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none'
                              },
                              '& input[type=number]': {
                                MozAppearance: 'textfield'
                              }
                            }}
                            value={value}
                            label='Amount '

                            type='number'
                            onChange={onChange}
                            placeholder='Amount '
                            error={submit ? entityDetails().inventoryAmount ? false : true : false}
                            helperText={submit && !entityDetails().inventoryAmount ? 'Required,value must be positive' : ''}
                            aria-describedby='validation-basic-first-name'
                            autoComplete='OFF'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              min: 0
                            }}
                          />
                        )}
                      />
                      {errors.inventoryAmount && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                          <InputLabel
                            id='validation-basic-select'
                            error={Boolean(errors.categoryName)}
                            htmlFor='validation-basic-select'
                          >
                            Category
                          </InputLabel>
                          <Controller
                            name='categoryName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <Select
                                value={value}
                                label='Category'
                                onChange={onChange}
                                error={Boolean(errors.categoryName)}
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'

                              >

                                {
                                  listInventoryCategoryData && listInventoryCategoryData?.length > 0 ?
                                    listInventoryCategoryData?.map((e: any, index: any) => {

                                      return (
                                        <MenuItem key={index} value={e.categoryName} onClick={() => { setInData(e) }}>
                                          {e.categoryName}
                                        </MenuItem>
                                      )
                                    }) : <MenuItem value="No data" disabled={true} >No category found</MenuItem>
                                }
                              </Select>
                            )}
                          />
                          {errors.categoryName && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} >
                        <AddCircleIcon style={{ cursor: "pointer" }} onClick={handleClickOpen} />
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField name="inventoryImage" onChange={handleImageChange} type='file' />
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        id='basic-input'
                        autoComplete='OFF'
                        onChange={(date: Date) => setStartDate(date)}
                        placeholderText='Expenditure Date'
                        required
                        customInput={<CustomInput
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                          }}
                          label='Expenditure date ' value={undefined} error={false} onChange={function (event: ChangeEvent<Element>): void {
                            throw new Error('Function not implemented.');
                          }} />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button size='large' color='secondary' type='submit' variant='outlined' sx={{ mr: 4 }} onClick={() => { setExpenseDialogBox(false) }}>
                      Cancel
                    </Button>
                    <Button size='large' type='submit' variant='contained' onClick={() => { createInventoryApi(); setSubmit(true) }}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' PaperProps={{
                  style: {
                    width: '500px',
                    maxHeight: '500px',
                  },
                }} >
                  <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                    <DialogTitle id='form-dialog-title' sx={{ textAlign: 'center' }} >Category</DialogTitle>
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
                    <TextField
                      id='name'
                      autoFocus
                      autoComplete='OFF'
                      fullWidth label='Name'
                      name='categoryName'
                      value={inventoryCategoryData.categoryName}
                      onChange={handleCategoryChange}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                    <br />
                    <br />
                    <TextField
                      id='name'
                      autoComplete='OFF'
                      fullWidth
                      label='Description'

                      name='categoryDescription'
                      value={inventoryCategoryData.categoryDescription}
                      onChange={handleCategoryChange}
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </DialogContent>
                  <DialogActions style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => {
                        createInventoryCategoryApi();
                      }}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>

                {

                  (conditonAlert == false) ? <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
                    <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
                      Expense Added
                    </Alert>
                  </Snackbar> : <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
                    <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
                      Expense Added
                    </Alert>
                  </Snackbar>
                }
              </form>
            </CardContent>
          </Dialog>
        </>
      }

      {
        permission?.some((obj: any) => obj?.title === "Expenses" && (obj?.action?.includes("read"))) &&
        <InventoryTable reload={handleTableReload} ></InventoryTable>
      }
    </>
  )
}

export default FormValidationBasic
