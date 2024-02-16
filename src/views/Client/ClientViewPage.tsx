// ** React Imports
import { ChangeEvent, useState, useEffect, MouseEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/TableFilter'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'
import EditIcon from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import {
  Button,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  Menu,
  TextField
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Icon from '@mui/material/Icon'
import { useRouter } from 'next/router'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  ListAllClientsApi,
  CreateClientApi,
  getSingleClient,
  UpdateClientApi,
  deleteClientApi,
  updateEmployeeApi,
  listAllEmployeeApi
} from 'src/store/APIs/Api'

import { update, values } from 'lodash'
import axios from 'axios'
import { colorToString } from '@iconify/utils'

interface FormInputs {
  customerId: string
  salonId: string
  clientId: string
  clientName: string
  clientPhoneNumber: string
  clientEmail: string
  clientGender: string
  clientStatus: string
}

interface defaultValues {
  customerId: ''
  salonId: ''
  clientId: ''
  clientName: ''
  clientPhoneNumber: ''
  clientEmail: ''
  clientGender: ''
  clientStatus: ''
}

interface defaultClientsValues {
  customerId: ''
  salonId: ''
  clientId: ''
  clientName: ''
  clientPhoneNumber: ''
  clientEmail: ''
  clientGender: ''
  clientStatus: ''
}

const AddClientSchema = yup.object().shape({
  clientName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  clientEmail: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/)
    .email()
    .required(),
  clientPhoneNumber: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required()
})

const AddClientReSchema = yup.object().shape({
  clientName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  clientEmail: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/)
    .email()
    .required(),
  clientPhoneNumber: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required(),
  clientGender: yup.string().required(),
  clientStatus: yup.string().required('')
})

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
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
        {getInitials(row.clientName ? row.clientName : '')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const ClientViewPage = () => {
  // ** States
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [clientData, setClientData] = useState<any[]>([])
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [isDialogOpenUpdate, setDialogOpenUpdate] = useState(false)
  const [isDialogOpenDalete, setDialogOpenDelete] = useState(false)
  const [singleClient, setSingleClient] = useState<any[]>([])
  const [deleteClient, setDeleteClient] = useState<boolean>(false)
  const [deleteClientFunc, setDeleteClientFunc] = useState({})
  const [isModalOpen, setModalOpen] = useState(false)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isOpen, setIsOpen] = useState(true)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [group, setGroup] = useState('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [updateClientId, setUpdateClientId] = useState('')
  const [clientId, setClientId] = useState<any>('')
  const [defaultClientValues, setDefaultClientValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'dqXUs',
    clientName: '',
    clientPhoneNumber: '',
    clientEmail: '',
    clientGender: '',
    clientStatus: ''
  })



  const [defaultClientReValues, setDefaultClientReValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'dqXUs',
    clientId: updateClientId,
    clientName: '',
    clientPhoneNumber: '',
    clientEmail: '',
    clientGender: '',
    clientStatus: 'inactive'
  })



  const isFormValid  = () => {
    // Add your form validation logic here
    // For example, you can check if all required fields are filled
    return (
      defaultClientReValues.clientName !== '' &&
      defaultClientReValues.clientPhoneNumber !== ''&&
      defaultClientReValues.clientEmail!==''&&
      defaultClientReValues.clientGender!==''
      // defaultClientReValues.clientStatus!==''
    );
  };

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'clientName',
      headerName: 'Name',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.clientName}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'clientPhoneNumber ',
      headerName: 'Phone Number',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.clientPhoneNumber}
        </Typography>
      )
    },

    {
      flex: 0.1,
      field: 'clientId',
      minWidth: 80,
      headerName: 'client ID',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.clientId}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'clientGender',
      minWidth: 80,
      headerName: 'clientGender',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.clientGender}
        </Typography>
      )
    },

    {
      flex: 0.13,
      minWidth: 100,
      field: 'clientStatus',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={params.row.clientStatus === 'active' ? 'success' : 'error'}
            label={params.row.clientStatus}
          />
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'edit',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label='edit' onClick={() => handleOpenDialogUpdate(params.row)}>
          <EditIcon />
        </IconButton>
      )
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'Delete',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label='Delete' onClick={() => handleOpenDialogDelete(params.row)}>
          <Delete />
        </IconButton>
      )
    }
  ]

  const handleOpenDialogUpdate = (data: any) => {
    console.log('data', data)
    setUpdateClientId(data.clientId)
    singleClientDetailsFunc(data)
    setDialogOpenUpdate(true)
  }

  const handleCloseDialogUpdate = () => {
    setDialogOpenUpdate(false)
  }

  const handleForm = () => {
    setIsOpen(false)
  }

  const handleOpan = ()=>{
    handleClose()
  }




  const handleUpdateEmployeeData = (e: { target: { name: any; value: any } }) => {
    setDefaultClientReValues({ ...defaultClientReValues, [e.target.name]: e.target.value })
    console.log('AAA')
  }

  const handleOpenDialogDelete = (data: any) => {
    const deleteClientData = {
      customerId: data.customerId,
      salonId: data.salonId,
      clientId: data.clientId,
      clientStatus: 'Inactive'
    }
    setDeleteClientFunc(deleteClientData)
    setDialogOpenDelete(true)
  }

  const handleCloseDialogDelete = (data: any) => {
    setDialogOpenDelete(false)
  }

  const singleClientDetailsFunc = async (data: any) => {
    try {
      const res: any = await getSingleClient('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs', clientId)
      console.log('ress', res.data.data)
      setSingleClient(res?.data?.clientId)
    } catch (error: any) {
      console.log(error)
    }
  }

  const FatchData = async () => {
    try {
      const res: any = await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs')
      console.log('fatchData', res?.data.data)
      setClientData(res?.data?.data)
    } catch (err) {
      return err
    }
  }
  useEffect(() => {
    FatchData()
  }, [])

  const onUpdateData = async () => {
    try {
      await updateEmployeeApi(defaultClientReValues)
      await FatchData()
    } catch (err) {
      return err
    }
  }

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const [client, setClient] = useState('')

  const handleClient = (event: SelectChangeEvent) => {
    setClient(event.target.value)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSave = () => {
    // Handle saving data or any other logic here
    closeModal()
  }

  const router = useRouter()
  const handleCustomer = () => {
    router.push('../second-page/clientCustomerCreate')
  }



  const handleImportClick = () => {
    handleClose()
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

  const {
    reset: studentReset,
    control,
    getValues: studentValues,
    handleSubmit: handleClientSubmit,
    setValue,
    formState: { errors: ClientErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultClientValues,
    resolver: yupResolver(AddClientSchema)
  })

  const {
    reset: clientReset,
    control: ABC,
    getValues: clientsValues,
    watch: CS,
    handleSubmit: handleClientReSubmit,
    formState: { errors: ClientReErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultClientReValues,
    resolver: yupResolver(AddClientReSchema)
  })

  // const isFormValid = () => {
  //   const values = clientsValues()
  //   // Check your form validation conditions here
  //   return console.log('clientName error:', !ClientReErrors.clientName)
  //   // !ClientReErrors.clientEmail &&    values.clientEmail &&
  //   // !ClientReErrors.clientPhoneNumber &&
  //   // values.clientPhoneNumber &&
  //   // !ClientReErrors.clientGender &&
  //   // values.clientGender

  //   // Add other conditions as needed
  // }

  const onSubmit = async () => {
    try {
      await CreateClientApi(studentValues())
      console.log(studentValues(), 'defaultClientValues')
      await FatchData()
      toast.success('New Client created successfully', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.log('error', err)
    }
  }

  const updateClientSubmit = async () => {
    console.log(clientsValues(), 'fsdjfklsjd')
    try {
      await UpdateClientApi({ ...clientsValues(), clientId: updateClientId })
      console.log(clientsValues(), 'DDSS')
      await FatchData()
      toast.success('New Client updated successfully', {
        position: 'bottom-right'

      })
      // singleClientDetailsFunc()
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleDeleteClient = async () => {
    console.log(deleteClientFunc, 'deleteClient')
    try {
      await deleteClientApi(deleteClientFunc)
      toast.error(' Client InActive ', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.log(err)
    }
  }


  const handleCloss = () => {
    setIsOpen(false)
  }

  const handleChange = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Card>
        <Grid style={{ display: 'flex', width: '100%' }}>
          <Grid style={{ marginLeft: '20px', padding: '10px', width: '100%' }}>
            <CardHeader style={{ padding: '0px' }} title='Expense Transactions' />
            <Typography>You can see which one s you have, their methods, notes and amounts</Typography>
          </Grid>
          <Grid style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '20px' }}>
            <Button onClick={openModal} variant='contained'>
              Add Client
            </Button>
          </Grid>

          <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogTitle>Add Client</DialogTitle>

            <CardContent>
              <form onSubmit={handleClientSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='clientName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='First Name'
                            onChange={onChange}
                            placeholder='First Name'
                            error={Boolean(ClientErrors.clientName)}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                      {ClientErrors.clientName && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='clientEmail'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            type='Email'
                            value={value}
                            onChange={onChange}
                            label='Email '
                            placeholder='john.doecxvvbdffdd@example.co  '
                            error={Boolean(ClientErrors.clientEmail)}
                          />
                        )}
                      />
                      {ClientErrors.clientEmail && (
                        <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name='clientPhoneNumber'
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            type='number'
                            value={value}
                            onChange={onChange}
                            label='MobileNumber'
                            placeholder='Type Here'
                            error={Boolean(ClientErrors.clientPhoneNumber)}
                          />
                        )}
                      />
                      {ClientErrors.clientPhoneNumber && (
                        <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        id='validation-basic-select'
                        error={Boolean(ClientErrors.clientGender)}
                        htmlFor='validation-basic-select'
                      >
                        Gender*
                      </InputLabel>
                      <Controller
                        name='clientGender'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            label='Country'
                            onChange={onChange}
                            error={Boolean(ClientErrors.clientGender)}
                            labelId='validation-basic-select'
                            aria-describedby='validation-basic-select'
                          >
                            {/* <MenuItem value=''>Select</MenuItem> */}
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                          </Select>
                        )}
                      />
                      {ClientErrors.clientGender && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                          {ClientErrors.clientGender.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size='large'
                      type='submit'
                      variant='contained'
                      onSubmit={onSubmit}
                      onClick={() => {
                        handleClose()
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Dialog>
        </Grid>

        <DataGrid
          autoHeight
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[7, 10, 25, 50]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={clientData}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      </Card>

      <Dialog maxWidth='md' sx={{ overflow: 'auto' }} open={isDialogOpenUpdate} onClose={handleCloseDialogUpdate}>
        {isOpen && (
          <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <DialogTitle>Edit Client</DialogTitle>
            <CardContent>
            <form onSubmit={handleClientReSubmit(updateClientSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='clientName'
                      control={ABC}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          // value={value ? value : singleClient.clientName}
                          // value={singleClient.clientName}
                          value={value}
                          label='First Name'
                          onChange={onChange}
                          placeholder='First Name'
                          error={Boolean(ClientReErrors.clientName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {ClientReErrors.clientName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='clientEmail'
                      control={ABC}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='Email'
                          value={value}
                          //  value={value ?value:singleClient.clientEmail}

                          onChange={onChange}
                          label='Email '
                          placeholder='john.doecxvvbdffdd@example.co  '
                          error={Boolean(ClientReErrors.clientEmail)}
                        />
                      )}
                    />
                    {ClientReErrors.clientEmail && (
                      <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      control={ABC}
                      name='clientPhoneNumber'
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='number'
                          // value={value ?value:singleClient?.clientPhoneNumber}
                          value = {value}
                          onChange={onChange}
                          label='MobileNumber'
                          placeholder='Type Here'
                          error={Boolean(ClientReErrors.clientPhoneNumber)}
                        />
                      )}
                    />
                    {ClientReErrors.clientPhoneNumber && (
                      <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='validation-basic-select'
                          error={Boolean(ClientReErrors.clientGender)}
                          htmlFor='validation-basic-select'
                        >
                          Gender*
                        </InputLabel>
                        <Controller
                          name='clientGender'
                          control={ABC}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              label='Gender'

                              onChange={onChange}
                              error={Boolean(ClientReErrors.clientGender)}
                              labelId='validation-basic-select'
                              aria-describedby='validation-basic-select'
                            >
                              <MenuItem value=''>Select</MenuItem>
                              <MenuItem value='Male'>Male</MenuItem>
                              <MenuItem value='Female'>Female</MenuItem>
                              <MenuItem value='Female'>Other</MenuItem>

                            </Select>
                          )}
                        />
                        {ClientReErrors.clientGender && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {ClientReErrors.clientGender.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                </Grid>

                <Grid item xs={12}>
                  {/* <Button size='large' type='submit' variant='contained' onSubmit={updateClientSubmit} >
                    Update
                  </Button> */}
                    <Button size='large' type='submit' variant='contained' onClick={() =>
                       { updateClientSubmit();
                      handleCloseDialogUpdate();
                     }}
                    //  disabled={!isFormVaild()}
                     >
                Update
              </Button>

                </Grid>
              </Grid>
            </form>
            </CardContent>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 4 }}></Grid>
          </Card>

          // <DialogContent>
          //   <Box>
          //     <Grid container spacing={2}>
          //       <Grid item md={6} xs={12}>
          //         <TextField
          //           fullWidth
          //           label='clientName'
          //           name='clientName'
          //           required
          //           inputProps={{
          //             maxLength: 50
          //           }}
          //           onChange={handleUpdateEmployeeData}
          //           value={defaultClientReValues.clientName}
          //         />
          //       </Grid>

          //       <Grid item md={6} xs={12}>
          //         <TextField
          //           fullWidth
          //           label='clientPhoneNumber'
          //           name='clientPhoneNumber'
          //           required
          //           inputProps={{
          //             maxLength: 50
          //           }}
          //           onChange={handleUpdateEmployeeData}
          //           value={defaultClientReValues.clientPhoneNumber}
          //         />
          //       </Grid>

          //       <Grid item md={6} xs={12}>
          //         <TextField
          //           fullWidth
          //           label='clientEmail'
          //           name='clientEmail'
          //           required
          //           onChange={handleUpdateEmployeeData}
          //           value={defaultClientReValues.clientEmail}
          //         />
          //       </Grid>

          //       <Grid item md={6} xs={12}>
          //         <TextField
          //           fullWidth
          //           label='clientGender'
          //           name='clientGender'
          //           required
          //           onChange={handleUpdateEmployeeData}
          //           value={defaultClientReValues.clientGender}
          //         />
          //       </Grid>

          //     </Grid>
          //   </Box>

          //   <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
          //     <Button
          //       size='large'
          //       variant='contained'
          //       onClick={() => {

          //       }}
          //       // Disable the button if the form is not valid
          //     >
          //       Cancel
          //     </Button>
          //     <Button
          //       size='large'
          //       type='submit'
          //       variant='contained'
          //       onClick={() => {
          //         updateClientSubmit()
          //         handleCloseDialogUpdate()
          //       }}
          //       disabled={!isFormValid()}
          //     >
          //       Update
          //     </Button>
          //   </DialogActions>
          // </DialogContent>
        )}
      </Dialog>

      <Dialog maxWidth='md' sx={{ overflow: 'auto' }} open={isDialogOpenDalete} onClose={handleCloseDialogDelete}>
        <Grid>
          <DialogContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                {/* <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} /> */}
                <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                  Are you sure?
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>Are you sure you want to delete this Client!</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{ mr: 1.5 }}
              onClick={() => {
                handleDeleteClient()
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  )
}

export default ClientViewPage
