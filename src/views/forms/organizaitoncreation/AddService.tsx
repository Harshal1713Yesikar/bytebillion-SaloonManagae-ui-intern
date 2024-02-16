// // ** React Imports
// import React, { forwardRef, useState, ChangeEvent, useEffect } from 'react'

// // ** MUI Imports
// // demo
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Radio from '@mui/material/Radio'
// import Select from '@mui/material/Select'
// import Button from '@mui/material/Button'
// import MenuItem from '@mui/material/MenuItem'
// import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
// import FormLabel from '@mui/material/FormLabel'
// import CardHeader from '@mui/material/CardHeader'
// import InputLabel from '@mui/material/InputLabel'
// import IconButton from '@mui/material/IconButton'
// import RadioGroup from '@mui/material/RadioGroup'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import FormHelperText from '@mui/material/FormHelperText'
// import InputAdornment from '@mui/material/InputAdornment'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormGroup from '@mui/material/FormGroup'
// import { createNewCategory, getAllCategoryList } from 'src/store/APIs/Api';
// import { AddServicesApi } from 'src/store/APIs/Api'

// // ** Third Party Imports
// import toast from 'react-hot-toast'
// import DatePicker from 'react-datepicker'
// import { useForm, Controller } from 'react-hook-form'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Types
// import { DateType } from 'src/types/forms/reactDatepickerTypes'

// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import { MemoryRouter, Route, Routes, Link, matchPath, useLocation } from 'react-router-dom'
// import { StaticRouter } from 'react-router-dom/server'
// import { Box, Typography } from '@mui/material'
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// import { Console } from 'console'
// import { listAllEmployeeApi } from 'src/store/APIs/Api'
// interface State {
//   password: string
//   showPassword: boolean
// }

// interface FormInputs {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   dob: DateType
//   doJ: DateType
//   mobileNo: string
//   hourlyRate: string
//   fixedSalary: string
//   workingDay: string
//   staffpermission: string
//   designation: string
//   category: string
//   staffPermission: string
// }
// interface FormInputs {
//   customerId: ''
//   salonId: ''
//   serviceCategoryId: ''
//   serviceName: ''
//   serviceDescription: ''
//   serviceTime: ''
//   selectEmployee: ''
//   amountHistory: {
//     serviceAmount: ''
//   }
// }
// interface Data {
//   serviceId: number
//   serviceName: string
//   serviceStatus: number
//   currentServiceAmount: number
// }

// const AddStaffSchema = yup.object().shape({
//   firstName: yup
//     .string()
//     .matches(/^[A-Z a-z]+$/)
//     .max(25)
//     .required(),
//   lastName: yup
//     .string()
//     .matches(/^[A-Z a-z]+$/)
//     .max(25)
//     .required(),
//   // email: yup.string().email().required(),
//   email: yup
//     .string()
//     .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
//     .email()
//     .required(),
//   // password: yup.string().min(8).required(),
//   password: yup.string().min(8, 'Requied ,Minimum 8 characters').required('Password is required'),
//   dob: yup.date().required(),
//   doJ: yup.date().required(),
//   mobileNo: yup
//     .string()
//     .min(10)
//     .matches(/^[0-9]+$/)
//     .max(10)
//     .required(),
//   hourlyRate: yup
//     .string()
//     .max(20, 'Fixed salary must be at most 20 characters')
//     .matches(/^\d+$/, 'Fixed salary must contain only numbers')
//     .required('Fixed salary is required'),
//   fixedSalary: yup
//     .string()
//     .max(20, 'Fixed salary must be at most 20 characters')
//     .matches(/^\d+$/, 'Fixed salary must contain only numbers')
//     .required('Fixed salary is required'),
//   workingDay: yup
//     .string()
//     .max(2, 'Fixed Day must be at most 2 characters')
//     .matches(/^\d+$/, 'This field is required')
//     .required('Fixed salary is required'),
//   staffpermission: yup.string(),
//   designation: yup.string().required().max(100),
//   category: yup.string().required('category Permission is required'),
//   // gender: yup.string().required('Gender Permission is required'),
//   staffPermission: yup.string().required('Staff Permission is required')
// })

// const createData = (
//   serviceName: string,
//   serviceId: number,
//   serviceStatus: number,
//   currentServiceAmount: number
// ): Data => {
//   return { serviceName, serviceId, serviceStatus, currentServiceAmount }
// }

// interface CustomInputProps {
//   value: DateType
//   label: string
//   error: boolean
//   onChange: (event: ChangeEvent) => void

// }
// const defaultValues = {
//   // dob: null,
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   dob: '',
//   doJ: '',
//   mobileNo: '',
//   hourlyRate: '',
//   fixedSalary: '',
//   workingDay: '',
//   staffpermission: '',
//   designation: '',
//   category: '',
//   staffPermission: ''
// }

// const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
//   return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
// })

// function Router(props: { children?: React.ReactNode }) {
//   const { children } = props
//   if (typeof window === 'undefined') {
//     return <StaticRouter location='/drafts'>{children}</StaticRouter>
//   }

//   return (
//     <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
//       {children}
//     </MemoryRouter>
//   )
// }

// function useRouteMatch(patterns: readonly string[]) {
//   const { pathname } = useLocation()

//   for (let i = 0; i < patterns.length; i += 1) {
//     const pattern = patterns[i]
//     const possibleMatch = matchPath(pattern, pathname)
//     if (possibleMatch !== null) {
//       return possibleMatch
//     }
//   }

//   return null
// }

// function MyTabs() {
//   const routeMatch = useRouteMatch(['/staffList', '/addStaff', '/staffSchedule', '/updateAttendanes', '/inactiveStaff'])
//   const currentTab = routeMatch?.pattern?.path
// }
// const orgSelected = (organization: any) => {
//   getAllCategoryList("099f9bf2-8ac2-4f84-8286-83bb46595fde", "jkmli").then((res: any) => {
//     // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
//     // setLoading(false)
//   })
// }
// const empSelected = (organization: any) => {
//   listAllEmployeeApi("099f9bf2-8ac2-4f84-8286-83bb46595fde", "jkmli").then((res: any) => {
//     // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
//     // setLoading(false)
//   })
// }

// const AddService = () => {

//   const [allCategoryList, setAllCategoryList] = useState([])
//   useEffect(() => {
//     const getData = async () => {
//       const res = await getAllCategoryList("099f9bf2-8ac2-4f84-8286-83bb46595fde", "dqXUs")
//       console.log("skdfjklsjfksjdflkjds", res.data.data)
//       setAllCategoryList(res?.data?.data)
//       // setLoading(false)

//       // console.log(res,"res")
//       // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))

//     }
//     getData()

//   }, [])
//   const [allEmpList, setAllEmpList] = useState([])
//   useEffect(() => {
//     const getEmpData = async () => {
//       const response: any = await listAllEmployeeApi("099f9bf2-8ac2-4f84-8286-83bb46595fde", "dqXUs")
//       console.log("skdfjklsjfksjdflkjds", response.data.data)
//       setAllEmpList(response?.data?.data)

//     }
//     getEmpData()

//   }, [])



//   const [defaultStudentValues, setDefaultStudentValues] = useState<any>({
//     customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
//     salonId: 'jkmli',
//     serviceCategoryId: 'HFm4p',
//     serviceName: '',
//     serviceDescription: '',
//     serviceTime: '',
//     selectStaff: '',
//     amountHistory: {
//       serviceAmount: ''
//     }
//   })

//   // console.log(defaultStudentValues)


//   const [checkbox, setCheckbox] = React.useState({
//     gilad: true,
//     jason: false,
//     antoine: false
//   })

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.checked
//     })
//   }

//   const { gilad, jason, antoine } = checkbox
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2

//   // ** States
//   const [state, setState] = useState<State>({
//     password: '',
//     showPassword: false
//   })

//   const handleClickShowPassword = () => {
//     setState({ ...state, showPassword: !state.showPassword })
//   }

//   // const onSubmit = () => toast.success('Form Submitted')
//   // const onSubmit = (data: any, event: any) => {
//   //   event.preventDefault()
//   //   console.log('ABC', data)
//   //   // toast.success('Form Submitted')
//   //   // AddServicesApi(data)
//   //   // setDefaultStudentValues(data)
//   //   // console.log("adssaas", data)
//   // }

//   // const onSubmit = (data: any) => {
//   //   AddServicesApi(data)
//   //   setDefaultStudentValues(data)

//   //   console.log('kvjvbbb', data)
//   // }

//   const onSubmit = (data: any) => {
//     console.log('Form Data', data);
//     toast.success('Form Submitted');
//   }

//   // const handleSubmit = async (data: any) => {
//   //   try {
//   //     // await createNewCategory(categoryData)
//   //     // console.log(categoryData, "categoryData")

//   //     AddServicesApi(data)
//   //     setDefaultStudentValues(data)

//   //     console.log('kvjvbbbb', data)
//   //   }
//   //   catch (err) {
//   //     console.log("error", err)
//   //   }
//   // }

//   const renderedOrganizations = allCategoryList.map((organization: any, index: number) => {
//     return (
//       <MenuItem onClick={() => orgSelected(organization)} key={index} value={organization.serviceCategoryName}>
//         <Typography> {organization.serviceCategoryName}</Typography>
//       </MenuItem>
//     )
//   })
//   const addStaff = allEmpList.map((organization: any, index: number) => {
//     return (
//       <MenuItem onClick={() => empSelected(organization)} key={index} value={organization.employeeName}>
//         <Typography> {organization.employeeName}</Typography>
//       </MenuItem>
//     )
//   })

//   // const [checked, setChecked] = useState(true)

//   const {
//     reset: studentReset,
//     control,
//     getValues: studentValues,
//     handleSubmit: handleStaffSubmit,
//     setValue,
//     formState: { errors: StaffErrors }
//   } = useForm<FormInputs>({
//     defaultValues: defaultStudentValues,
//     resolver: yupResolver(AddStaffSchema)
//   })

//   const handleSubmit = async (data: any) => {
//     try {
//       // await createNewCategory(categoryData)
//       // console.log(categoryData, "categoryData")

//       AddServicesApi(data)
//       setDefaultStudentValues(data)

//       console.log('kvjvbbbb', data)
//     }
//     catch (err) {
//       console.log("error", err)
//     }
//   }
//   return (
//     <Grid>
//       <Grid>
//         <Card>
//           <CardHeader title='Add Service' />
//           <Router>
//             <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
//           </Router>
//           <CardContent>
//             <form onSubmit={handleStaffSubmit(onSubmit)}>
//               <Grid>
//                 <Grid sx={{ marginBottom: 5 }}>
//                   <FormControl fullWidth>
//                     <InputLabel
//                       id='validation-basic-select'
//                       error={Boolean(StaffErrors.staffPermission)}
//                       htmlFor='validation-basic-select'
//                     >
//                       Select Category
//                     </InputLabel>
//                     <Controller
//                       name='category'
//                       control={control}
//                       rules={{ required: true }}
//                       render={({ field: { value, onChange } }) => (
//                         <Select
//                           value={value}
//                           label=' Select Category'
//                           onChange={onChange}
//                           error={Boolean(StaffErrors.category)}
//                           labelId='validation-basic-select'
//                           aria-describedby='validation-basic-select'
//                         >
//                           {renderedOrganizations}
//                         </Select>
//                       )}
//                     />
//                     {StaffErrors.category && (
//                       <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
//                         {StaffErrors.category.message}
//                       </FormHelperText>
//                     )}
//                   </FormControl>
//                 </Grid>
//                 <Grid container spacing={5}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <Controller
//                         name='serviceName'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange } }) => (
//                           <TextField
//                             value={value}
//                             label='Name'
//                             onChange={onChange}
//                             placeholder='Name'
//                             error={Boolean(StaffErrors.serviceName)}
//                             aria-describedby='validation-basic-first-name'
//                           />
//                         )}
//                       />
//                       {StaffErrors.serviceName && (
//                         <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
//                           This field is required
//                         </FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <Controller
//                         control={control}
//                         name='mobileNo'
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange } }) => (
//                           <TextField
//                             type='MobileNo'
//                             value={value}
//                             onChange={onChange}
//                             label='Amount'
//                             placeholder='Type Here '
//                             error={Boolean(StaffErrors.mobileNo)}
//                           />
//                         )}
//                       />
//                       {StaffErrors.mobileNo && (
//                         <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid>

//                   {/* <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <Controller
//                         name='lastName'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange } }) => (
//                           <TextField
//                             value={value}
//                             label='Service Time'
//                             onChange={onChange}
//                             placeholder='Service Time'
//                             error={Boolean(StaffErrors.lastName)}
//                             aria-describedby='validation-basic-last-name'
//                           />
//                         )}
//                       />
//                       {StaffErrors.lastName && (
//                         <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
//                           This field is required
//                         </FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid> */}

//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel
//                         id='validation-basic-select'
//                         error={Boolean(StaffErrors.selectEmployee)}
//                         htmlFor='validation-basic-select'
//                       >
//                         Select Staff*
//                       </InputLabel>
//                       <Controller
//                         name='selectEmployee'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange } }) => (
//                           <Select
//                             value={value}
//                             label='selectEmployee '
//                             onChange={onChange}
//                             error={Boolean(StaffErrors.selectEmployee)}
//                             labelId='validation-basic-select'
//                             aria-describedby='validation-basic-select'
//                           >
//                             {addStaff}
//                             {/* <MenuItem value=''>Select</MenuItem>
//                             <MenuItem value='Manager'>Manager</MenuItem>
//                             <MenuItem value='Subadmin'>Subadmin</MenuItem>
//                             <MenuItem value='Staff'>Staff</MenuItem> */}
//                           </Select>
//                         )}
//                       />
//                       {StaffErrors.selectEmployee && (
//                         <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
//                           {StaffErrors.selectEmployee.message}
//                         </FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} sm={16}>
//                     <FormControl fullWidth>
//                       <Controller
//                         name='serviceDescription'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field }) => (
//                           <TextField
//                             rows={4}

//                             multiline
//                             {...field}
//                             label='serviceDescription'
//                             placeholder='Type Here'
//                             error={Boolean(StaffErrors.serviceDescription)}
//                             aria-describedby='validation-basic-textarea'
//                           />
//                         )}
//                       />
//                       {StaffErrors.serviceDescription && (
//                         <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
//                           This field is required
//                         </FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid>


//                 </Grid>
//               </Grid>

//               {/* <Button
//                 size='large'
//                 type='submit'
//                 variant='contained'
//                 color='primary'
//                 onSubmit={onSubmit}
//               >
//                 Submit
//               </Button> */}
//             </form>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Button variant='contained' size='large' color='primary' onClick={handleSubmit}>submit</Button>
//     </Grid>

//   )

// }

// export default AddService;

// import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { MouseEvent } from 'react'
// import Dashboard from '../dashboard'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import SearchIcon from '@mui/icons-material/Search'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'

// ** MUI Imports
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'

import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import OutlinedInput from '@mui/material/OutlinedInput'
import {
  AddServicesApi,
  ListAllServiceApi,
  getAllCategoryList,
  listAllEmployeeApi,
  createNewCategory
} from 'src/store/APIs/Api'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
// import { rows } from 'src/@fake-db/table/static-data'
import ListItemText from '@mui/material/ListItemText'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Router } from 'react-router-dom'

type Order = 'asc' | 'desc'

interface FormInputs {
  customerId: ''
  salonId: ''
  serviceCategoryId: ''
  selectCategory: '',
  serviceName: ''
  serviceDescription: ''
  serviceTime: ''
  selectStaff: [
    {
      employeeId: ''
    }
  ],
  amountHistory: {
    serviceAmount: ''
  }
}
interface FormInput {
  customerId: string
  salonId: string
  serviceCategoryName: string
}

interface Data {
  serviceId: number
  serviceName: string
  serviceStatus: number
  currentServiceAmount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}
const ServiceSchema = yup.object().shape({
  serviceName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),

  serviceTime: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(50)
    .required(),
  amountHistory: yup.string().min(30).max(30).required(),
  serviceDescription: yup.string().required().max(100),
  selectStaff: yup.string().required(),
  selectCategory: yup.string().required()
})

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

const createData = (
  serviceName: string,
  serviceId: number,
  serviceStatus: number,
  currentServiceAmount: number
): Data => {
  return { serviceName, serviceId, serviceStatus, currentServiceAmount }
}

const rows = [createData('No data Found ', 305, 3.7, 67)]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row?.avatar?.length) {
    return <CustomAvatar src={`/images/avatars/${row?.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.serviceName ? row.serviceName.toUpperCase() : '')}
      </CustomAvatar>
    )
  }
}

const orgSelected = (organization: any) => {
  listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs').then((res: any) => {
    // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
    // setLoading(false)
  })
}

const CategorySelected = async (organization: any) => {
  await getAllCategoryList('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs').then((res: any) => {
    // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
    // setLoading(false)
  })
}
export const AddService = () => {

  const [option, setOption] = useState<null | HTMLElement>(null)
  const [add, setAdd] = useState<null | HTMLElement>(null)
  const [serviceData, setServiceData] = useState<any>([])
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [categoryList, setCategoryList] = useState([])


  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    const fatchData = async () => {
      try {
        const response: any = await listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
        setEmployeeList(response?.data?.data)
        console.log('aaa', response?.data?.data)
      } catch (err) {
        return err
      }
    }
    fatchData()
  }, [])
  const data = async () => {
    try {
      const response: any = await getAllCategoryList('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs')
      setCategoryList(response?.data.data)
      console.log('formData', response?.data?.data)
    } catch (err) {
      console.log('ABC', err)
    }
  }
  useEffect(() => {
    data()
  }, [])

  const [defaultStudentValues, setDefaultStudentValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'E7uqn',
    serviceCategoryId: 'HFm4p',
    serviceName: '',
    serviceDescription: '',
    serviceTime: '',
    selectStaff: [
      {
        employeeId: ''
      }
    ],
    amountHistory: {
      serviceAmount: ''
    }
  })

  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    console.log(event.target.value)
  }

  const renderedOrganizations = employeeList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => orgSelected(organization)} key={index} value={organization.employeeName}>
        <Typography> {organization.employeeName}</Typography>
      </MenuItem>
    )
  })

  const renderedCategory = categoryList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => CategorySelected(organization)} key={index} value={organization.serviceCategoryName}>
        <Typography> {organization.serviceCategoryName}</Typography>
      </MenuItem>
    )
  })

  const [categoryData, setCategoryData] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'dqXUs',
    serviceCategoryName: ''
  })

  const onSubmitButtom = () => {
    console.log(categoryData)
  }

  const onSubmit = (data: any) => {
    // AddServicesApi(data)
    // setDefaultStudentValues(data)

    console.log('kvjvb', data)
  }
  const serviceSubmit = async (data: any) => {
    try {
      const res = await AddServicesApi(ServiceValues())
      console.log(res, "res")
      setDefaultStudentValues(data)
      console.log(ServiceValues(), "serviceValues")
    } catch (err) {
      console.log('error', err)
    }
  }
  const handleSubmit = async () => {
    try {
      await createNewCategory(categoryData)
      await data()
      console.log(categoryData, 'categoryData')
    } catch (err) {
      console.log('error', err)
    }
  }
  const handleInputChange = (key: any, value: any) => {
    setCategoryData({ ...categoryData, [key]: value })
  }
  const {
    reset: serviceReset,
    control,
    getValues: ServiceValues,
    handleSubmit: handleServiceSubmit,
    setValue,
    formState: { errors: ServiceErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultStudentValues
  })
  // const {
  //   reset: serviceReset,
  //   control,
  //   getValues: serviceValues,
  //   handleSubmit: handleServiceSubmit,
  //   setValue,
  //   formState: { errors: ServiceErrors }
  // } = useForm<FormInputs>({
  //   defaultValues: defaultStudentValues
  // })
  const {
    reset: CategoryReset,
    control: Category,
    getValues: serviceValue,
    handleSubmit: handleCategorySubmit,
    formState: { errors: CategroyErrors }
  } = useForm<FormInput>({
    defaultValues: categoryData
  })
  return (
    <>
      <CardContent sx={{ width: '100%' }}>
        <form onSubmit={handleServiceSubmit(onSubmit)}>
          <Grid item xs={12} sm={6} sx={{ margin: 1, display: 'flex', justifyContent: 'end', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(ServiceErrors.selectCategory)}
                htmlFor='validation-basic-select'
              >
                Select Categary*
              </InputLabel>
              <Controller
                name='selectCategory'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label='Select Categary '
                    onChange={onChange}
                    error={Boolean(ServiceErrors.selectCategory)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {renderedCategory}
                  </Select>
                )}
              />
              {ServiceErrors.selectCategory && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  {ServiceErrors.selectCategory.message}
                </FormHelperText>
              )}
            </FormControl>


          </Grid>
          <Grid>
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
                        label='Service Name'
                        onChange={onChange}
                        placeholder='Type Here'
                        error={Boolean(ServiceErrors.serviceName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {ServiceErrors.serviceName && (
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
                    name='amountHistory.serviceAmount'
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='amountHistory'
                        value={value}
                        onChange={onChange}
                        label='Amount'
                        placeholder='Type Here '
                        error={Boolean(ServiceErrors.amountHistory)}
                      />
                    )}
                  />
                  {ServiceErrors.amountHistory && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      required,10-digit phone number
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='serviceTime'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Service Time'
                        onChange={onChange}
                        // value = "time"
                        placeholder='Service Time'
                        error={Boolean(ServiceErrors.serviceTime)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {ServiceErrors.serviceTime && (
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
                    error={Boolean(ServiceErrors.selectStaff)}
                    htmlFor='validation-basic-select'
                  >
                    Select Employee*
                  </InputLabel>
                  <Controller
                    name='selectStaff'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Select Employee '
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        onChange={onChange}
                        error={Boolean(ServiceErrors.selectStaff)}
                        // labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        {renderedOrganizations}
                      </Select>
                    )}
                  />
                  {ServiceErrors.selectStaff && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      {ServiceErrors.selectStaff.message}
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
                        label='Designation'
                        placeholder='Type Here'
                        error={Boolean(ServiceErrors.serviceDescription)}
                        aria-describedby='validation-basic-textarea'
                      />
                    )}
                  />
                  {ServiceErrors.serviceDescription && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {/* <Button onClick={handleCloseAddServiceDialog} color='primary'>
                        Cancel
                      </Button> */}
        </form>
        <Button
          // onClick={handleCloseAddServiceDialog}
          size='large'
          // type='submit'
          variant='contained'
          color='primary'

          onClick={serviceSubmit}
        >
          Submit
        </Button>
      </CardContent></>
  )
}
