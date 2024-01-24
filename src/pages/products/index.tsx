import React , {useState}from 'react';
import { forwardRef,  ChangeEvent } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTable from './table';

import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'

// import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Card from '@mui/material/Card'

import { styled } from '@mui/material/styles'

// import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

// form data

import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import Radio from '@mui/material/Radio'

import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'

import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'

import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  dob: DateType
  email: string
  radio: string
  select: string
  lastName: string
  password: string
  textarea: string
  checkbox: boolean
  firstName: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  dob: null,
  email: '',
  radio: '',
  select: '',
  lastName: '',
  password: '',
  textarea: '',
  firstName: '',
  checkbox: false
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})


const Index = () => {
  const [age, setAge] = React.useState('');
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [open, setOpen] = useState(false)

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const showTable = (tableId: string) => {
    setActiveTable(tableId);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [checked, setChecked] = useState<number[]>([0])

  // const router = useRouter()


  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }


  // Form data

  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = () => toast.success('Form Submitted')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}  sx={{background:"blue"}}>
        <Box
          sx={{
            width: '100%',
            border: 2,
            margin: '2px',
            padding:"5px",
            borderBlockColor: 'lightGray',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField fullWidth label="Search" id="fullWidth" sx={{ minWidth: 300, width: '100%',background:"white" }} />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Products</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} sx={{background:"white"}}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="contained" disableElevation sx={{ height: 50, backgroundColor: 'black', width: '100%' }}>
                Search
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{padding:"10px"}}>

            <Grid item xs={12} md={10} sx={{display:"flex",justifyContent:"space-around"}}>

              <FormGroup sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row',color:"white" }}>
                <FormControlLabel  control={<Checkbox defaultChecked />} label="Zero quantity product only"  />
                <FormControlLabel required control={<Checkbox />} label="Low quantity product only" />
                <FormControlLabel required control={<Checkbox />} label="In stock product only" />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={2} sx={{marginTop:"10px"}}>
              <Button variant="contained" disableElevation onClick={() => showTable('table1')} sx={{ height: 50, background: 'black', width: '100%' }}>
                Advanced Filters
              </Button>
            </Grid>

          </Grid>

          {/* codition of filter */}


          <Grid container spacing={1} sx={{padding:"10px",display: activeTable === 'table1' ? 'block' : 'none'  }} >

            <Grid item xs={12} md={12} sx={{display:"flex",justifyContent:"center"}}>

            <FormControl fullWidth sx={{padding:"10px"}} >
                <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Brand" onChange={handleChange} sx={{background:"white"}}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{padding:"10px"}}>
                <InputLabel id="demo-simple-select-label">Select Product Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Product Type" onChange={handleChange} sx={{background:"white"}}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{padding:"10px"}}>
                <InputLabel id="demo-simple-select-label">Select Vender</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Select Vender" onChange={handleChange} sx={{background:"white"}}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

            </Grid>


          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Add product button */}
          <Grid item xs={12} md={2}>
            <Button variant="contained" onClick={handleClickOpen} disableElevation sx={{ height: 30, backgroundColor: 'black', width: '100%' }}>
              Add product
            </Button>
          </Grid>

          {/* Add btn POpop code */}

          <Card>
            <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
              <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                Modal title
              </DialogTitle>
              <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>

                <Card>
      <CardHeader title='Basic' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='ProductName'
                      onChange={onChange}
                      placeholder='Leonard'
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Barcode'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Price'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='In Stock Quantity'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Quantity Alert'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.select)}
                  htmlFor='validation-basic-select'
                >
                  Select Product
                </InputLabel>
                <Controller
                  name='select'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Product'
                      onChange={onChange}
                      error={Boolean(errors.select)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </Select>
                  )}
                />
                {errors.select && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.select)}
                  htmlFor='validation-basic-select'
                >
                  Select Product type
                </InputLabel>
                <Controller
                  name='select'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Product type'
                      onChange={onChange}
                      error={Boolean(errors.select)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </Select>
                  )}
                />
                {errors.select && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.select)}
                  htmlFor='validation-basic-select'
                >
                  Select Vendor
                </InputLabel>
                <Controller
                  name='select'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Vendor'
                      onChange={onChange}
                      error={Boolean(errors.select)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </Select>
                  )}
                />
                {errors.select && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='textarea'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      label='Bio'
                      error={Boolean(errors.textarea)}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
                {errors.textarea && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={Boolean(errors.radio)}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                      <FormControlLabel
                        value='female'
                        label='Female'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='male'
                        label='Male'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='other'
                        label='Other'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.radio && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='checkbox'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControlLabel
                      label='Agree to our terms and conditions'
                      sx={errors.checkbox ? { color: 'error.main' } : null}
                      control={
                        <Checkbox
                          {...field}
                          name='validation-basic-checkbox'
                          sx={errors.checkbox ? { color: 'error.main' } : null}
                        />
                      }
                    />
                  )}
                />
                {errors.checkbox && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
                </Card>

              </DialogContent>
              <DialogActions sx={{ height: '70px' }}>
                <Button variant='contained' autoFocus onClick={handleClose} sx={{ backgroundColor: 'black' }}>
                  Add
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Card>


          {/* Other form controls */}
          <Grid item xs={12} md={10} sx={{display:"flex",justifyContent:"end"}}>

            {/* Return Order */}
            <FormControl variant="standard" sx={{ minWidth: 120, margin: 3 }}>
              <InputLabel id="demo-simple-select-standard-label">Return Order</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Return Order"

              >
                <MenuItem value="">
                  <em>Return Order</em>
                </MenuItem>
                <MenuItem value={10}>Inventory Return</MenuItem>
                <MenuItem value={20}>Return Order</MenuItem>

              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ minWidth: 120, margin: 3 }}>
              <InputLabel id="demo-simple-select-standard-label">Product Order</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Product Order"
              >
                <MenuItem value="">
                  <em>Product Order</em>
                </MenuItem>
                <MenuItem value={10}>Create New</MenuItem>
                <MenuItem value={20}>View Orders</MenuItem>

              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ minWidth: 120, margin: 3 }}>
              <InputLabel id="demo-simple-select-standard-label">Assign Product</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Assign Product"
              >
                <MenuItem value="">
                  <em>Assign Product</em>
                </MenuItem>
                <MenuItem value={10}>Retail Products</MenuItem>
                <MenuItem value={20}>IN-House Products</MenuItem>

              </Select>
            </FormControl>
          </Grid>


        </Grid>
      </Grid>

      {/* Table */}

      <Grid item xs={12}>
        <EnhancedTable />
      </Grid>
    </Grid>
  );
};

export default Index;
