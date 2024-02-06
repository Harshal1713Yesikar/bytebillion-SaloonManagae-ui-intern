import { forwardRef, useState, ChangeEvent, useEffect, SyntheticEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import ClearIcon from '@mui/icons-material/Clear';
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Icon from 'src/@core/components/icon'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
// import debounce from 'lodash.debounce'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import Router from 'next/router'
import InputAdornment from '@mui/material/InputAdornment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { updateServicesApi } from 'src/store/APIs/Api'


interface FormInputs {
  expenseDescription: string
  currencyCode: string
  expenseAmount: string
  categoryName: string
  expenseName: string
}
const defaultValues = {
  email: '',
  radio: '',
  select: '',
  expenseDescription: '',
  currencyCode: '',
  expenseAmount: '',
  categoryName: '',
  expenseName: ''
}

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
const UpdateServices = () => {

  const [updateServiceDialogBox, setUpdateServiceDialogBox] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<any>(null);
  const [conditonAlert, setConditionAlert] = useState(false)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [handleTableReload, setHandleTableReload] = useState<any>(false)
  const [submit, setSubmit] = useState<boolean>(false)



  const {
    reset: serviceReset,
    control,
    handleSubmit,
    getValues: entityDetails,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })


  const handleReset = () => {
    serviceReset({
      categoryName: "",
      currencyCode: "",
      expenseAmount: "",
      expenseDescription: "",
      expenseName: "",
    })
    setError('')

  }
  const onSubmit = () => {
    return 0;
  }

  const [updateServiceData, setUpdateServiceData] = useState({
    customerId: "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    salonId: "",
    serviceCategoryId: "",
    serviceName: "",
    serviceDescription: "",
    serviceTime: "",
    selectStaff: [
      {
        employeeId: ""
      }
    ],
    amountHistory: {
      serviceAmount: ''
    }
  })
  const updateServicesApiFunc = () => {
    {

      setConditionAlert(true)

      // if (customerId && salonId) {

      updateServicesApi(salonId).then((res: any) => {

        if (res.data.statusCode == 200) {
          setSnackbarColor(true)
          setSnackbarOpen(true)
          setResponseMessage("Category is created successfully")


        }
        else {
          setSnackbarColor(false)
          setSnackbarOpen(true)
          setResponseMessage("Fill all the required information")
        }

      })
      setOpen(false)
      // }
      // else {
      //   setSnackbarColor(false)
      //   setSnackbarOpen(true)
      //   setResponseMessage("Fill all the required information")
      // }


    }
    const handleCancel = () => {

    }
    const handleClose = () => { }




    return (
      <>

        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Button sx={{ mb: 5 }} size='small' variant='contained' onClick={() => { setUpdateServiceDialogBox(true); }}>Add Expense   <Icon
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
        <Dialog open={updateServiceDialogBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-15px' }}>
            <CardHeader title='Create Expense' />
            <Icon
              className="iconContainer"
              onClick={() => { handleCancel(), setUpdateServiceDialogBox(false) }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </div>
          <CardContent  >
            <form onSubmit={(event: any) => { handleSubmit(onSubmit); event.preventDefault() }}>
              <Grid spacing={10} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }} >
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='expenseName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Name of expenses '
                          onChange={onChange}
                          placeholder='Name of expenses '
                          error={submit ? entityDetails().expenseName ? false : true : false}
                          helperText={submit && !entityDetails().expenseName ? 'Required,max 50 chars' : ''}
                          aria-describedby='validation-basic-first-name'
                          autoComplete='OFF'
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      )}
                    />
                    {errors.expenseName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='expenseDescription'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Description '
                          onChange={onChange}
                          placeholder='Description '
                          error={submit ? entityDetails().expenseDescription ? false : true : false}
                          helperText={submit && !entityDetails().expenseDescription ? 'Required,max 500 chars' : ''}
                          aria-describedby='validation-basic-last-name'
                          autoComplete='OFF'
                          inputProps={{
                            maxLength: 500,
                          }}
                        />
                      )}
                    />
                    {errors.expenseDescription && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='expenseAmount'
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
                          error={submit ? entityDetails().expenseAmount ? false : true : false}
                          helperText={submit && !entityDetails().expenseAmount ? 'Required,value must be positive' : ''}
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
                    {errors.expenseAmount && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button size='large' color='secondary' type='submit' variant='outlined' sx={{ mr: 4 }} onClick={() => { handleCancel(), setUpdateServiceDialogBox(false) }}>
                    Cancel
                  </Button>
                  <Button size='large' type='submit' variant='contained' onClick={() => {
                    //  setSubmit(false)

                  }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <Dialog open={open} aria-labelledby='form-dialog-title' PaperProps={{
                style: {
                  width: '500px',
                  maxHeight: '500px',
                },
              }} >
                {/* <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
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
                  value={}
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
                  value={expenseCategoryData.categoryDescription}
                  onChange={handleCategoryChange}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </DialogContent> */}
                <DialogActions style={{ display: 'flex', justifyContent: 'right' }}>
                  <Button variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => {
                      updateServicesApiFunc();
                    }}
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          </CardContent>
        </Dialog>
      </>





    )
  }
  export default UpdateServices

