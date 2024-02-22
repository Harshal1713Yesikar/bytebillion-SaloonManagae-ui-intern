import React, { use, useEffect } from 'react'
import {
  Box, Card, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem,
  CardContent,
  CardHeader,
  Dialog,
  Menu, Radio, RadioGroup, Typography,
  DialogContent
} from '@mui/material'
import { useState, Fragment } from 'react'
import Icon from 'src/@core/components/icon'
import { alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import toast from 'react-hot-toast'
import {
  AddServicesApi,
  ListAllServiceApi,
  getAllCategoryList,
  listAllEmployeeApi,
  createNewCategory,
  getSingleService
} from 'src/store/APIs/Api'
import { AddDailyServicesApi } from 'src/store/APIs/Api'
import DialogTitle from '@mui/material'
import { LocalizationProvider, DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { Grid, TextField, InputAdornment } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { MouseEvent } from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import AddProduct from 'src/views/forms/quickSaleFormTable/addProducts'
// import AddService from 'src/views/forms/quickSaleFormTable/addServices'
import AddDailyService from 'src/views/forms/quickSaleFormTable/addServices'
import AddMemberShip from 'src/views/forms/quickSaleFormTable/addMemberShip'
import AddPackage from 'src/views/forms/quickSaleFormTable/addpackage'
import AddIcon from '@mui/icons-material/Add';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { ListAllClientsApi } from 'src/store/APIs/Api'
import { useForm, Controller } from 'react-hook-form'
import { getSingleClient } from 'src/store/APIs/Api'
import CustomAvatar from 'src/@core/components/mui/avatar'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import Container from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

// import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useRouter } from 'next/router'
type Order = 'asc' | 'desc'
const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
]



interface CustomDatePickerProps extends DatePickerProps<Date> {
  renderInput: (startProps: any, endProps: any) => React.ReactElement;
}
interface FormInput {
  customerId: string
  salonId: string
  clientName: string
}
interface FormInputs {
  clientName: '',
}
interface EnhancedTableToolbarProps {
  numSelected: number
}

const AddStaffSchema = yup.object().shape({
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
  ]
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

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 290,
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
              {row.serviceName.toUpperCase() + row.serviceName.slice(1)}
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
        {/* {params.selectStaff.employeeId} */}
        {params?.row?.selectStaff.slice()}
      </Typography>
    )
  },

  // {
  //   flex: 0.15,
  //   minWidth: 110,
  //   field: 'employeePhone ',
  //   headerName: 'contact',
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.serviceName}
  //     </Typography>
  //   )
  // },

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
  }
]
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showService, setShowService] = useState<any[]>([]);
  const [showProduct, setShowProduct] = useState<any[]>([]);
  const [showMemberShip, setShowMemberShip] = useState<any[]>([]);
  const [showPackage, setShowPackage] = useState<any[]>([]);
  const [clientList, setClientList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false)
  const [addServiceListOpen, setAddServiceListOpen] = useState(false)
  const [option, setOption] = useState<null | HTMLElement>(null)
  const [add, setAdd] = useState<null | HTMLElement>(null)
  const [employeeList, setEmployeeList] = useState([])
  const [selected, setSelected] = useState<readonly string[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [serviceData, setServiceData] = useState<any>([])

  const [clientData, setClientData] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'dqXUs',
    clientName: ''
  })
  const [dailyServiceData, setDailyServiceData] = useState<any>({

    customerId: "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    salonId: "dqXUs",
    clientId: '',
    services: [
      {
        serviceId: '',
        serviceProvider: [
          {
            employeeId: ''
          }
        ],
        servicetiming: '',
        serviceAmount: '',
        serviceDiscount: '',
        totalServiceAmount: ''
      }
    ]
  }
  )
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
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)

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

  const orgSelected = (organization: any) => {
    listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli').then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
    })
  }

  useEffect(() => {
    const fatchServiceData = async () => {
      try {
        const response: any = await ListAllServiceApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
        setServiceList(response?.data?.data)

        console.log('aaa', response?.data?.data)
      } catch (err) {
        return err
      }
    }
    fatchServiceData()
  }, [])

  const ServiceSelected = async (organization: any) => {
    await getSingleService('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn', organization.serviceId).then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
      console.log(res, "ssss")
      // setClientList()
    })
  }

  const clientDataList = async () => {
    await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs').then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
      console.log(res.data.data, "ress")
      setClientList(res.data.data)
      // setClientList()
    })
  }
  const ClientSelected = async (organization: any) => {
    await getSingleClient('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs', organization.clientId).then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
      console.log(res, "ssss")
      // setClientList()
    })
  }




  const renderedOrganizations = employeeList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => orgSelected(organization)} key={index} value={organization.employeeName}>
        <Typography> {organization.employeeName}</Typography>
      </MenuItem>
    )
  })
  const handleCloseAdd = () => {
    setAdd(null)
  }
  const handleCloseDailyServiceList = () => {
    setAdd(null)
  }
  const handleAdded = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddServiceDialogOpen(true)
    // setAddServiceListOpen(true)
  }

  const handleCloseAddServiceDialog = () => {
    setAddServiceDialogOpen(false)
    setAddServiceListOpen(false)
  }

  useEffect(() => {
    clientDataList()
  }, [])

  // const data = async () => {
  //   try {
  //     const response: any = await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs')
  //     setClientList(response?.data.data)
  //     console.log('formData', response?.data?.data)
  //   } catch (err) {
  //     console.log('ABC', err)
  //   }
  // }

  const handleChanges = (event: any) => {
    setSearchTerm(event.target.value)
  }
  const [percentage, setPercentage] = useState('')

  const handleChanged = (event: any) => {
    setPercentage(event.target.value)
  }


  const [age, setAge] = useState<string>(''); // Assuming age is of type string

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };


  const handleAddService = () => {
    setShowService((prevService) => [[prevService, true]]);

  };

  const handleRemoveService = (index: number) => {
    setShowService((prevService) => {
      const updatedService = [...prevService];
      updatedService.splice(index, 1);

      return updatedService;
    });
  };

  const handleAddProduct = () => {
    setShowProduct((prevProduct) => [...prevProduct, true]);
  };

  const handleRemoveProduct = (index: number) => {
    setShowProduct((prevProduct) => {
      const updatedProduct = [...prevProduct];
      updatedProduct.splice(index, 1);

      return updatedProduct;
    });
  };

  const handleAddMemberShip = () => {
    setShowMemberShip((prevMemberShip) => [...prevMemberShip, true]);
  };

  const handleRemoveMemberShip = (index: number) => {
    setShowMemberShip((prevMemberShip) => {
      const updateMemberShip = [...prevMemberShip];
      updateMemberShip.splice(index, 1);

      return updateMemberShip;
    });
  };

  const handlePackage = () => {
    setShowPackage((prevPackage) => [...prevPackage, true]);
  };

  const handleRemovePackage = (index: number) => {
    setShowPackage((prevPackage) => {
      const updatePackage = [...prevPackage];
      updatePackage.splice(index, 1);

      return updatePackage;
    });
  };

  const handleResetClick = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to reset?");

    // If the user confirms, refresh the page
    if (isConfirmed) {
      window.location.reload();
    }
  };
  const router = useRouter();
  const handleBack = () => {
    router.push('./home');
  }

  const renderInput = (startProps: any, endProps: any) => (
    <div>
      <TextField {...startProps} variant='standard' helperText='' placeholder='Batch Start Date' />
      <TextField {...endProps} variant='standard' helperText='' placeholder='Batch End Date' />
    </div>
  );


  // Service List functions

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }


  // const {
  //   reset: serviceReset,
  //   control,
  //   getValues: ServiceValues,
  //   handleSubmit: handleServiceSubmit,
  //   setValue,
  //   formState: { errors: ServiceErrors }
  // } = useForm<FormInput>({
  //   defaultValues: clientData
  // })

  const {
    reset: ClientReset,
    control: Client,
    getValues: clientValue,
    handleSubmit: handleCategorySubmit,
    formState: { errors: clientErrors }
  } = useForm<FormInput>({
    defaultValues: clientData
  })

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

  const renderedClient = clientList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => ClientSelected(organization)} key={index} value={organization.clientId}>
        <Typography> {organization.clientName}</Typography>
      </MenuItem>
    )
  })
  const renderedDailyService = serviceList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => ServiceSelected(organization)} key={index} value={organization.serviceId}>
        <Typography> {organization.serviceName}</Typography>
      </MenuItem>
    )
  })

  const addServiceToList = async (data: any) => {
    const dailyData = {
      customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
      salonId: 'dqXUs',
      clientId: '',
      services: [
        {
          serviceId: '',
          serviceProvider: [
            {
              employeeId: '',
            },
          ],
          serviceName: '',
          currentServiceAmount: '',
          quantity: '',
          serviceDiscount: '',
          // servicetiming: serviceSaleData.servicetiming,
          // totalServiceAmount: totalServiceData,
        },
      ],
    };
    console.log(dailyData, 'new datasssss');
    try {
      const res = await AddDailyServicesApi(data)
      console.log(res, "res")
      setDailyServiceData(data)
      console.log(data, "serviceValues")
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    setAdd(event.currentTarget)
  }
  const handleServiceList = (event: MouseEvent<HTMLButtonElement>) => {
    setAdd(event.currentTarget)
  }

  const onSubmit = (data: any) => {
    AddServicesApi(data)
    setDefaultStudentValues(data)
    toast.success('New Service created successfully', {
      position: "bottom-right"
    });


    console.log('kvjvb', data)
  }



  return (

    <>

      <Grid>
        <Card style={{ padding: "20px" }}>
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: "30px" }}>Create Invoice</Typography>
            <Button style={{ marginBottom: "10px" }} variant="outlined" onClick={handleBack}>Back</Button>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
            <Grid item xs={12} sm={6} sx={{ margin: 1, display: 'flex', justifyContent: 'end', gap: 3 }}>
              <FormControl sx={{ width: "100%" }}  >
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(clientErrors.clientName)}
                  htmlFor='validation-basic-select'
                >
                  Select Client*
                </InputLabel>
                <Controller
                  name='clientName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Client'
                      onChange={onChange}
                      error={Boolean(clientErrors.clientName)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {renderedClient}
                    </Select>
                  )}
                />
                {clientErrors.clientName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    {clientErrors.clientName.message}
                  </FormHelperText>
                )}
              </FormControl>


            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={null}
                onChange={(date: Date | null) => console.log(date)}
                sx={{ padding: '10px', marginLeft: '270px', paddingRight: '0' }}
                renderInput={renderInput}
                inputFormat='dd/MM/yyyy'
                autoComplete='off'
                required
                startText='Batch Start Date'
                endText='Batch End Date'
                {...(Index as any)}
              // Other props as needed
              />
            </LocalizationProvider>
          </Grid>
        </Card>
        <div style={{ margin: '5px', display: "flex", justifyContent: "start", padding: "30px" }}>
          <Button variant='contained' sx={{ marginRight: '10px' }} aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleAdd} startIcon={<AddIcon />}>
            Add Services
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
              <MenuItem
                onClick={() => {
                  handleCloseAdd()
                  setAddServiceListOpen(true)

                }}
              >
                Service List
              </MenuItem>
            </Menu>
          </Grid>



          <Dialog
            sx={{
              height: '100%',

            }}
            open={addServiceDialogOpen}
            onClose={handleCloseAddServiceDialog}
          >
            {/* <DialogTitle > Add Service</DialogTitle> */}

            <CardContent sx={{ width: "1000px", height: '1000px' }}>
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
                          label='Select Categary'
                          onChange={onChange}
                          error={Boolean(ServiceErrors.selectCategory)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          {renderedDailyService}

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
                          label='Select Staff '
                          onChange={onChange}
                          error={Boolean(ServiceErrors.selectStaff)}
                          labelId='validation-basic-select'
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
          <Dialog sx={{
            height: '100%',
            width: "100vw",
            display: "flex",
            justifyContent: "center"
          }}
            open={addServiceListOpen}
            onClose={handleCloseAddServiceDialog}>
            <Grid sx={{ width: "100vw" }}>
              {/* <h1 >Daily Service List</h1> */}
              <EnhancedTableToolbar numSelected={selected.length} />
              <Grid item xs={6}>
                <TextField
                  size='small'
                  variant='outlined'
                  value={searchTerm}
                  sx={{ paddingLeft: "20px" }}
                  placeholder='Search'
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: <SearchIcon />
                  }}
                />
              </Grid>

              {/* <TablePagination
              page={page}
              component='div'
              // rows = {serviceData}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
              <DataGrid
                autoHeight
                rows={serviceList}
                columns={columns}
                sx={{ padding: "20px" }}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[7, 10, 25, 50, 80, 100]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              />
            </Grid>
          </Dialog>
          <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddProduct} startIcon={<AddIcon />}>
            Add Product
          </Button>
          {/* <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddMemberShip} startIcon={<AddIcon />}>
            Add Membership
          </Button>
          <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handlePackage} startIcon={<AddIcon />}>
            Add Package
          </Button>
          <Button variant='contained' sx={{ marginRight: '10px' }} startIcon={<CardGiftcardIcon />}>
            Gift Card
          </Button> */}
        </div>
        {/* {showService.map((index) => (
          <AddDailyService key={index} index={index} onRemove={() => handleRemoveService(showService.length - 1)} />
        ))} */}
        {/* {showService.map((value, index) => (
          <AddDailyService
            key={index}
            index={index}
            onRemove={() => handleRemoveService(showService.length - 1)}
          />
        ))} */}
        {showProduct.map((index) => (
          <AddProduct key={index} index={index} onRemove={() => handleRemoveProduct(showProduct.length - 1)} />
        ))}


        {/* {showMemberShip.map((index) => (
          <AddMemberShip key={index} index={index} onRemove={() => handleRemoveMemberShip(showMemberShip.length - 1)} />
        ))}

        {showPackage.map((index) => (
          <AddPackage key={index} index={index} onRemove={() => handleRemovePackage(showPackage.length - 1)} />
        ))} */}


        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Grid style={{ marginLeft: "1px" }}>
            <Typography>Reward Points</Typography>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">Select Reward Points</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Select Reward Points"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ marginLeft: '10px' }}>
            <Typography>Ex Charges</Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label=""
                id="outlined-size-small"
                size="small"
              />
            </Box>
          </Grid>
          <Grid style={{ marginLeft: '10px' }}>
            <Typography>Disc</Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label=""
                id="outlined-size-small"
                size="small"
              />
            </Box>
          </Grid>
          <Grid style={{ marginLeft: '10px' }}>
            <Typography>Disc Points</Typography>
            <FormControl sx={{ minWidth: 160 }} size="small">
              <InputLabel id="demo-select-small-label">Percentage (%)</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={percentage}
                label="Age"
                onChange={handleChanged}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ marginLeft: '10px' }}>
            <Typography>GST %</Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                placeholder='0'
                id="outlined-size-small"
                size="small"
              />
            </Box>
          </Grid>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
            <FormControl style={{ marginTop: '5px', width: '100%' }}>
              <FormLabel id="demo-row-radio-buttons-group-label">Payment</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                <FormControlLabel value="Check" control={<Radio />} label="Check" />
                <FormControlLabel value="Card" control={<Radio />} label="Card" />
              </RadioGroup>
            </FormControl>
            <Grid >
              <Typography>Adjust Payment</Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                  placeholder='0.00'
                />
              </Box>
            </Grid>
          </div>

          <TableContainer component={Paper} >
            <Table aria-label='simple table' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '10px' }} >
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.calories}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Grid style={{ display: "flex" }} >
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { width: '15ch' }, marginRight: "10px"
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Coupon Code"
              id="outlined-size-small"
              size="small"
            />
          </Box>
          <Button variant="contained" disableElevation>
            Apply
          </Button>
        </Grid>
        <Grid >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              marginTop: "20px"
            }}
          >
            <TextField fullWidth id="fullWidth" placeholder='Enter Notes' />
          </Box>
        </Grid>



        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ margin: "10px" }} variant="contained" onClick={handleResetClick}>Reset</Button>
          <Button style={{ margin: "10px" }} variant="contained">Generate Bill</Button>
        </Grid>
      </Grid>
    </>
  )
}
export default Index
