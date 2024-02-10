// ** React Imports
import React, { forwardRef, useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
// demo
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
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { createNewCategory, getAllCategoryList } from 'src/store/APIs/Api';
import { AddServicesApi } from 'src/store/APIs/Api'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { MemoryRouter, Route, Routes, Link, matchPath, useLocation } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Box, Typography } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Console } from 'console'
import { listAllEmployeeApi } from 'src/store/APIs/Api'
interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  firstName: string
  lastName: string
  email: string
  password: string
  dob: DateType
  doJ: DateType
  mobileNo: string
  hourlyRate: string
  fixedSalary: string
  workingDay: string
  staffpermission: string
  designation: string
  category: string
  staffPermission: string
}
interface FormInputs {
  customerId: ''
  salonId: ''
  serviceCategoryId: ''
  serviceName: ''
  serviceDescription: ''
  serviceTime: ''
  selectEmployee: ''
  amountHistory: {
    serviceAmount: ''
  }
}
interface Data {
  serviceId: number
  serviceName: string
  serviceStatus: number
  currentServiceAmount: number
}

const AddStaffSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  // email: yup.string().email().required(),
  email: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
    .email()
    .required(),
  // password: yup.string().min(8).required(),
  password: yup.string().min(8, 'Requied ,Minimum 8 characters').required('Password is required'),
  dob: yup.date().required(),
  doJ: yup.date().required(),
  mobileNo: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required(),
  hourlyRate: yup
    .string()
    .max(20, 'Fixed salary must be at most 20 characters')
    .matches(/^\d+$/, 'Fixed salary must contain only numbers')
    .required('Fixed salary is required'),
  fixedSalary: yup
    .string()
    .max(20, 'Fixed salary must be at most 20 characters')
    .matches(/^\d+$/, 'Fixed salary must contain only numbers')
    .required('Fixed salary is required'),
  workingDay: yup
    .string()
    .max(2, 'Fixed Day must be at most 2 characters')
    .matches(/^\d+$/, 'This field is required')
    .required('Fixed salary is required'),
  staffpermission: yup.string(),
  designation: yup.string().required().max(100),
  category: yup.string().required('category Permission is required'),
  // gender: yup.string().required('Gender Permission is required'),
  staffPermission: yup.string().required('Staff Permission is required')
})

const createData = (
  serviceName: string,
  serviceId: number,
  serviceStatus: number,
  currentServiceAmount: number
): Data => {
  return { serviceName, serviceId, serviceStatus, currentServiceAmount }
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void

}
const defaultValues = {
  // dob: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dob: '',
  doJ: '',
  mobileNo: '',
  hourlyRate: '',
  fixedSalary: '',
  workingDay: '',
  staffpermission: '',
  designation: '',
  category: '',
  staffPermission: ''
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

function Router(props: { children?: React.ReactNode }) {
  const { children } = props
  if (typeof window === 'undefined') {
    return <StaticRouter location='/drafts'>{children}</StaticRouter>
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  )
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

function MyTabs() {
  const routeMatch = useRouteMatch(['/staffList', '/addStaff', '/staffSchedule', '/updateAttendanes', '/inactiveStaff'])
  const currentTab = routeMatch?.pattern?.path
}
const orgSelected = (organization: any) => {
  getAllCategoryList("099f9bf2-8ac2-4f84-8286-83bb46595fde", "jkmli").then((res: any) => {
    // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
    // setLoading(false)
  })
}
const empSelected = (organization: any) => {
  listAllEmployeeApi("099f9bf2-8ac2-4f84-8286-83bb46595fde", "jkmli").then((res: any) => {
    // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
    // setLoading(false)
  })
}

const AddService = () => {

  const [allCategoryList, setAllCategoryList] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await getAllCategoryList("099f9bf2-8ac2-4f84-8286-83bb46595fde", "dqXUs")
      console.log("skdfjklsjfksjdflkjds", res.data.data)
      setAllCategoryList(res?.data?.data)
      // setLoading(false)

      // console.log(res,"res")
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))

    }
    getData()

  }, [])
  const [allEmpList, setAllEmpList] = useState([])
  useEffect(() => {
    const getEmpData = async () => {
      const response:any  = await listAllEmployeeApi("099f9bf2-8ac2-4f84-8286-83bb46595fde", "dqXUs")
      console.log("skdfjklsjfksjdflkjds", response.data.data)
      setAllEmpList(response?.data?.data)

    }
    getEmpData()

  }, [])



  const [defaultStudentValues, setDefaultStudentValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'jkmli',
    serviceCategoryId: 'HFm4p',
    serviceName: '',
    serviceDescription: '',
    serviceTime: '',
    selectStaff: '',
    amountHistory: {
      serviceAmount: ''
    }
  })

  // console.log(defaultStudentValues)


  const [checkbox, setCheckbox] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { gilad, jason, antoine } = checkbox
  const error = [gilad, jason, antoine].filter(v => v).length !== 2

  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // const onSubmit = () => toast.success('Form Submitted')
  const onSubmit = (data: any, event: any) => {
    event.preventDefault()
    console.log('ABC', data)
    // toast.success('Form Submitted')
    // AddServicesApi(data)
    // setDefaultStudentValues(data)
    // console.log("adssaas", data)
  }

  const renderedOrganizations = allCategoryList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => orgSelected(organization)} key={index} value={organization.serviceCategoryName}>
        <Typography> {organization.serviceCategoryName}</Typography>
      </MenuItem>
    )
  })
  const addStaff = allEmpList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => empSelected(organization)} key={index} value={organization.employeeName}>
        <Typography> {organization.employeeName}</Typography>
      </MenuItem>
    )
  })

  // const [checked, setChecked] = useState(true)

  const {
    reset: studentReset,
    control,
    getValues: studentValues,
    handleSubmit: handleStaffSubmit,
    setValue,
    formState: { errors: StaffErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultStudentValues,
    resolver: yupResolver(AddStaffSchema)
  })
  return (
    <Grid>
      <Grid>
        <Card>
          <CardHeader title='Add Service' />
          <Router>
            <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
          </Router>
          <CardContent>
            <form onSubmit={handleStaffSubmit(onSubmit)}>
              <Grid>
                <Grid sx={{ marginBottom: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      error={Boolean(StaffErrors.staffPermission)}
                      htmlFor='validation-basic-select'
                    >
                      Select Category
                    </InputLabel>
                    <Controller
                      name='category'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label=' Select Category'
                          onChange={onChange}
                          error={Boolean(StaffErrors.category)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          {renderedOrganizations}
                        </Select>
                      )}
                    />
                    {StaffErrors.category && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {StaffErrors.category.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> 
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='serviceName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Name'
                            onChange={onChange}
                            placeholder='Name'
                            error={Boolean(StaffErrors.serviceName)}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                      {StaffErrors.serviceName && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name='mobileNo'
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            type='MobileNo'
                            value={value}
                            onChange={onChange}
                            label='Amount'
                            placeholder='Type Here '
                            error={Boolean(StaffErrors.mobileNo)}
                          />
                        )}
                      />
                      {StaffErrors.mobileNo && (
                        <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='lastName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Service Time'
                            onChange={onChange}
                            placeholder='Service Time'
                            error={Boolean(StaffErrors.lastName)}
                            aria-describedby='validation-basic-last-name'
                          />
                        )}
                      />
                      {StaffErrors.lastName && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id='validation-basic-select'
                        error={Boolean(StaffErrors.selectEmployee)}
                        htmlFor='validation-basic-select'
                      >
                        Select Staff*
                      </InputLabel>
                      <Controller
                        name='selectEmployee'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            label='selectEmployee '
                            onChange={onChange}
                            error={Boolean(StaffErrors.selectEmployee)}
                            labelId='validation-basic-select'
                            aria-describedby='validation-basic-select'
                          >
                            {addStaff}
                            {/* <MenuItem value=''>Select</MenuItem>
                            <MenuItem value='Manager'>Manager</MenuItem>
                            <MenuItem value='Subadmin'>Subadmin</MenuItem>
                            <MenuItem value='Staff'>Staff</MenuItem> */}
                          </Select>
                        )}
                      />
                      {StaffErrors.selectEmployee && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                          {StaffErrors.selectEmployee.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={16}>
                    <FormControl fullWidth>
                      <Controller
                        name='serviceDescription'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            rows={4}
                            multiline
                            {...field}
                            label='serviceDescription'
                            placeholder='Type Here'
                            error={Boolean(StaffErrors.serviceDescription)}
                            aria-describedby='validation-basic-textarea'
                          />
                        )}
                      />
                      {StaffErrors.serviceDescription && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>


                </Grid>
              </Grid>

              <Button
                size='large'
                type='submit'
                variant='contained'
                color='primary'
                onSubmit={onSubmit}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  )

}

export default AddService;
