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
import Dashboard from '../dashboard'
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
  createNewCategory,
  getSingleServiceApi,
  deleteServiceApi

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
import { useRouter } from 'next/router';
type Order = 'asc' | 'desc'

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
  selectEmployee: yup.string().required()
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





function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  // ** Prop
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        px: theme => `${theme.spacing(6)} !important`,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='bx:trash-alt' />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  )
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const names = ['Oliver Hansen', ,]

const orgSelected = (organization: any) => {
  listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli').then((res: any) => {
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

const Service = () => {
  const [option, setOption] = useState<null | HTMLElement>(null)
  const [add, setAdd] = useState<null | HTMLElement>(null)
  const [serviceData, setServiceData] = useState<any>([])
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [serviceIdForDelete, setServiceIdForDelete] = useState('')

  const router = useRouter();

  const handleCellClick = (row: any) => {
    console.log("row", row)
    router.push(`/service/serviceDetails/${row}`)
  }


  const serviceId = router.query.serviceId;
  const columns: GridColDef[] = [
    {
      flex: 0.75,
      minWidth: 160,
      field: 'serviceName',
      headerName: 'Service Name',
      // hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row?.serviceName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Service Time',
      field: 'serviceTime',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.serviceTime}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'selectStaff ',
      headerName: 'Staff Name',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.selectStaff?.charAt(0).toUpperCase() + params?.row?.selectStaff.slice(1)}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'employeeId',
      minWidth: 80,
      headerName: 'Staff ID',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.serviceCategoryId}
        </Typography>
      )
    },

    {
      flex: 0.175,
      minWidth: 150,
      field: 'serviceStatus',
      headerName: 'Service Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.serviceStatus == 'active' ? (
            <CustomChip rounded size='small' skin='light' color='success' label={params.row.serviceStatus} />
          ) : (
            <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.serviceStatus} />
          )}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'editService ',
      headerName: 'Edit',
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleCellClick(params.row.serviceId)}>
          <Icon style={{ cursor: "pointer" }} icon='bx:pencil' />
        </Button>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'deleteService ',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => {
          setSuspendDialogOpen(true);
          setServiceIdForDelete(params.row.serviceId);
        }}>          <Icon style={{ cursor: "pointer" }} icon='ic:baseline-delete' />
        </Button>
      )
    }
  ]


    // Fetch staff data using listAllEmployeeApi
    const fetchData = async () => {
      try {
        const response: any = await ListAllServiceApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli') // Pass customerId and salonId
        // Update the component's state with the fetched data
        setServiceData(response?.data?.data)
        console.log('ListAllServiceApiData', response?.data?.data)
      } catch (error) {
        console.error('Error fetching Service data:', error)
      }
    }
    useEffect(() => {
    // Call the fetchData function
    fetchData()
  }, [])

  // Fetch staff data using listAllCategoryList
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
    selectStaff: '',
    amountHistory: {
      serviceAmount: ''
    }
  })

  const handleOption = (event: MouseEvent<HTMLButtonElement>) => {
    setOption(event.currentTarget)
  }

  const handleCloseOption = () => {
    setOption(null)
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    setAdd(event.currentTarget)
  }

  const handleCloseAdd = () => {
    setAdd(null)
  }
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof Data>('serviceId')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState<number>(7)
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const [open, setOpen] = useState<boolean>(false)

  // const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.serviceName)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredRows = rows.filter(row => {
    const searchTermLower = searchTerm.toLowerCase()
    return row.serviceName.toLowerCase().includes(searchTermLower)
  })

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

  const handleDelete = () => {
    router.push('/service/service/')
  }


  const handleImportClick = () => {
    handleCloseOption()
    setOpenImportDialog(true)
  }

  const handleDialogClose = () => {
    setOpenImportDialog(false)
  }

  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0])
  }

  const handleImportSubmit = () => {
    // Handle import logic here using the selected file
    // You can dispatch an action or call a function to handle the import
    // Remember to close the dialog after import is done
    handleDialogClose()
  }

  const [selectGroup, setSelectGroup] = useState('')
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false)
  const [categoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [status, setStatus] = useState<any>('')
  const [singleServiceData, setSingleServiceData] = useState({
    customerId: "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    salonId: "jkmli",
    serviceId: serviceIdForDelete,
    serviceStatus: 'inActive'
  })
  const handleSelectGroup = (event: SelectChangeEvent) => {
    setSelectGroup(event.target.value)
  }
  useEffect(() => {
    const singleServiceApiData = () => {
      if (serviceId) {
        getSingleServiceApi('099f9bf2-8ac2-8286-83bb46595fde', 'jkmli', serviceId).then((res: any) => {
          setSingleServiceData(res?.data.data)
          // setLoading(false)
        })
      }
    }
    singleServiceApiData()
  }, [serviceId])

  const handleAdded = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddServiceDialogOpen(true)
  }

  const handleCloseAddServiceDialog = () => {
    setAddServiceDialogOpen(false)
  }

  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    console.log(event.target.value)
  }
  const deleteData = {
    "customerId": singleServiceData?.customerId,
    "salonId": singleServiceData?.salonId,
    "serviceId": serviceIdForDelete,
    "serviceStatus": "inActive"
  }

  const handleDeleteApi = async () => {
    const res =await deleteServiceApi({ ...deleteData })
    if (res?.statuscode == 204) {

      router.push('/service/service/')
    }
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

  const handleClickOpen = () => {
    setOpen(true)
    // setStatus(singleServiceData.serviceStatus)
  }
  const handleDeleteClose = () => {
    // setStatus(singleServiceData.serviceStatus)
    setOpen(false)
  }


  const onSubmitButtom = () => {
    console.log(categoryData)
  }

  const onSubmit = (data: any) => {
    AddServicesApi(data)
    setDefaultStudentValues(data)

    console.log('kvjvb', data)
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
    getValues: serviceValues,
    handleSubmit: handleServiceSubmit,
    setValue,
    formState: { errors: ServiceErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultStudentValues
  })

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
      <Grid sx={{ display: 'flex', width: '100%' }}>
        <Grid sx={{ width: '25%', mr: 3 }}>
          <Dashboard />
        </Grid>
        <Card sx={{ width: '75%', p: 6, height: '100%' }}>
          <Grid sx={{ display: 'flex', width: '100%' }}>
            <Grid sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Services List</Typography>
              <Typography>Create, edit and manage service list</Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Box sx={{ marginTop: '10px' }}>
                {/* <Button
                  sx={{ mr: 2, width: '120px', cursor: 'pointer', textTransform: 'none' }}
                  variant='contained'
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleOption}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Options
                </Button> */}
                <Grid>
                  <Menu
                    keepMounted
                    id='simple-menu'
                    anchorEl={option}
                    onClose={handleCloseOption}
                    open={Boolean(option)}
                  >
                    <MenuItem onClick={handleImportClick}>Import Services</MenuItem>
                    <MenuItem onClick={handleCloseOption}>Sample File</MenuItem>
                  </Menu>
                </Grid>
              </Box>
              <Box sx={{ marginTop: '10px' }}>
                <Button
                  sx={{ mr: 2, width: '90px', cursor: 'pointer', textTransform: 'none' }}
                  variant='contained'
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleAdd}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Add
                </Button>
                <Grid>
                  <Menu
                    keepMounted
                    id='simple-menu'
                    anchorEl={add}
                    onClose={handleCloseAdd}
                    open={Boolean(add)}
                    sx={{}}
                  >
                    {/* <MenuItem onClick={handleCloseAdd}>Add Group</MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        handleCloseAdd()
                        setAddServiceDialogOpen(true)
                      }}
                    >
                      Add Service
                    </MenuItem>
                  </Menu>
                </Grid>
                <Dialog
                  sx={{
                    height: '100%'
                  }}
                  open={addServiceDialogOpen}
                  onClose={handleCloseAddServiceDialog}
                >
                  <DialogTitle> Add Service</DialogTitle>

                  <CardContent sx={{ width: '100%', height: '1000px' }}>
                    <form onSubmit={handleServiceSubmit(onSubmit)}>
                      <Grid item xs={12} sm={6} sx={{ margin: 1, display: 'flex', justifyContent: 'end', gap: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel
                            id='validation-basic-select'
                            error={Boolean(ServiceErrors.selectEmployee)}
                            htmlFor='validation-basic-select'
                          >
                            Select Categary*
                          </InputLabel>
                          <Controller
                            name='selectEmployee'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <Select
                                value={value}
                                label='Select Category '
                                onChange={onChange}
                                error={Boolean(ServiceErrors.selectEmployee)}
                                labelId='validation-basic-select'
                                aria-describedby='validation-basic-select'
                              >
                                {renderedCategory}
                              </Select>
                            )}
                          />
                          {ServiceErrors.selectEmployee && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                              {ServiceErrors.selectEmployee.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <Fragment>
                          <Button
                            variant='outlined'
                            onClick={handleClickOpen}
                            sx={{ borderRadius: 100, backgroundColor: 'blue', color: 'gray' }}
                          >
                            +
                          </Button>
                          <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                            {/* <DialogTitle id='form-dialog-title'> Add Categary</DialogTitle>
                            <DialogContent>
                              <TextField
                                id='name'
                                autoFocus
                                fullWidth
                                type='Name'
                                label='Name'
                              />
                            </DialogContent> */}

                            <Grid>
                              <Card>
                                <CardHeader title='Add Category' />
                                <CardContent>
                                  <form onSubmit={handleCategorySubmit(onSubmitButtom)}>
                                    <Grid>
                                      <Grid>
                                        <FormControl fullWidth>
                                          <Controller
                                            name='serviceCategoryName'
                                            control={Category}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                              <TextField
                                                value={value}
                                                label='Category Name'
                                                onChange={e => {
                                                  onChange(e)
                                                  setCategoryData(prevData => ({
                                                    ...prevData,
                                                    serviceCategoryName: e.target.value
                                                  }))
                                                  // {console.log(e.target.value)}
                                                }}
                                                placeholder='Type Here'
                                                error={Boolean(CategroyErrors.serviceCategoryName)}
                                                aria-describedby='validation-basic-first-name'
                                              />
                                            )}
                                          />
                                          {CategroyErrors.serviceCategoryName && (
                                            <FormHelperText
                                              sx={{ color: 'error.main' }}
                                              id='validation-basic-first-name'
                                            >
                                              This field is required
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                    </Grid>
                                  </form>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* <Button variant='outlined' color='secondary' type='submit' onSubmit={handleSubmit}> */}
                            <Button variant='outlined' color='secondary' type='submit' onClick={handleSubmit}>
                              Submit
                            </Button>
                          </Dialog>
                        </Fragment>
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
                                error={Boolean(ServiceErrors.selectEmployee)}
                                htmlFor='validation-basic-select'
                              >
                                Select Employee*
                              </InputLabel>
                              <Controller
                                name='selectEmployee'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <Select
                                    value={value}
                                    label='Select Employee '
                                    onChange={onChange}
                                    error={Boolean(ServiceErrors.selectEmployee)}
                                    labelId='validation-basic-select'
                                    aria-describedby='validation-basic-select'
                                  >
                                    {renderedOrganizations}
                                  </Select>
                                )}
                              />
                              {ServiceErrors.selectEmployee && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                  {ServiceErrors.selectEmployee.message}
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
                      <Button onClick={handleCloseAddServiceDialog} color='primary'>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCloseAddServiceDialog}
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
                </Dialog>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <EnhancedTableToolbar numSelected={selected.length} />
            <Grid item xs={6}>
              <TextField
                size='small'
                variant='outlined'
                value={searchTerm}
                placeholder='Search'
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                <TableBody>
                  {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const isItemSelected = selected.includes(row.serviceName)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <></>
                      // <TableRow
                      //   hover
                      //   tabIndex={-1}
                      //   key={row.serviceName}
                      //   selected={isItemSelected}
                      //   aria-checked={isItemSelected}
                      //   onClick={event => handleClick(event, row.serviceName)}
                      // >
                      //   <TableCell component='th' id={labelId} scope='row' padding='none'>
                      //     {row.serviceName}
                      //   </TableCell>
                      //   <TableCell align='right'>{row.serviceId}</TableCell>
                      //   <TableCell align='right'>{row.currentServiceAmount}</TableCell>
                      //   <TableCell align='right'>{row.serviceStatus}</TableCell>
                      //   <TableCell align='right'><Icon style={{ cursor: "pointer" }} icon='ic:baseline-delete' />
                      //   </TableCell>
                      // </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <DataGrid
              autoHeight
              rows={serviceData}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[7, 10, 25, 50, 80, 100]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Grid>
        </Card>
        <Dialog fullWidth open={suspendDialogOpen} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
          <Grid container justifyContent="flex-end">
            <Icon
              className="iconContainer"
              onClick={() => setSuspendDialogOpen(false)}
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
              <Typography sx={{ fontSize: '1.125rem', mb: 5 }}>You won't be able to revert Category!</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => setSuspendDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
              handleDeleteApi()
              handleDelete()
              fetchData()
              setSuspendDialogOpen(false)
            }
            }>
              Yes, I am Sure!
            </Button>

          </DialogActions>
        </Dialog>
      </Grid >

    </>
  )
}

export default Service
