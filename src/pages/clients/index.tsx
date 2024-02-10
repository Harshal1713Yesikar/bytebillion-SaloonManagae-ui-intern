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
import EditIcon from '@mui/icons-material/Edit';


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
import { ListAllClientsApi} from 'src/store/APIs/Api'
import { CreateClientApi } from 'src/store/APIs/Api'
import { UpdateClientApi } from 'src/store/APIs/Api'
import { getSingleClient } from 'src/store/APIs/Api'
import { update } from 'lodash'



interface FormInputs {
  customerId: string
  salonId: string
  clientId:string
  clientName: string
  clientPhoneNumber: string
  clientEmail: string
  clientGender: string
  clientStatus:string
}

interface defaultValues {
  customerId: ''
  salonId: ''
  clientId:''
  clientName: ''
  clientPhoneNumber: ''
  clientEmail: ''
  clientGender: ''
  clientStatus:''

}

interface defaultClientsValues {
  customerId: ''
  salonId: ''
  clientId:''
  clientName: ''
  clientPhoneNumber: ''
  clientEmail: ''
  clientGender: ''
  clientStatus:''

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
    .required(),


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


const Index = () => {
  // ** States
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [clientData,setClientData] =useState<any[]>([])
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [isDialogOpenUpdate, setDialogOpenUpdate] = useState(false);
  const [singleClient,setSingleClient] =useState<any[]>([])

  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [defaultClientValues,setDefaultClientValues] =useState<any>({

    customerId:'099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId:'6GZr2',
    clientId:'',
    clientName:'',
    clientPhoneNumber:'',
    clientEmail:'',
    clientGender:'',
    clientStatus:''

  })

  const [defaultClientReValues,setDefaultClientReValues] =useState<any>({

    customerId:'099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId:'6GZr2',
    clientId:'',
    clientName:'',
    clientPhoneNumber:'',
    clientEmail:'',
    clientGender:'',
    clientStatus:''

  })


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
      flex: 0.175,
      minWidth: 150,
      field: 'clientStatus',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.clientStatus == 'active' ? (
            <CustomChip rounded size='small' skin='light' color='success' label={params.row.clientStatus} />
          ) : (
            <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.clientStatus  } />
          )}
        </Typography>
      )
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'edit',
      headerName: 'Edit',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="edit" onClick={()=>handleOpenDialogUpdate(params.row)}>
          <EditIcon />
        </IconButton>
      )
    }

  
  ]

  const handleOpenDialogUpdate = (data:any) => {
    singleClientDetailsFunc(data)
    setDialogOpenUpdate(true);
  };
  
  const handleCloseDialogUpdate = () => {
    setDialogOpenUpdate(false);
  };


  
 const singleClientDetailsFunc = async (data:any) => {
  try {
    const res: any = await getSingleClient('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs', data.clientId)
    console.log("ress",res.data.data)
    setSingleClient(res?.data?.data)

  } catch (error: any) {
    console.log(error)
  }
}
// useEffect(() => {
//   singleClientDetailsFunc()
// }, [])



 const FatchData = async ()=>{
  try{
    const res:any = await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde','dqXUs') 
    console.log("fatchData",res?.data.data)
    setClientData(res?.data?.data)
  }
  catch(err){
    return err 
  }
 }
 useEffect(()=>{
  FatchData()
 },[])

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

  const [isModalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [group, setGroup] = useState('')

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

  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isOpen, setIsOpen] = useState(true);


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
    control : ABC,
    getValues: clientsValues,
    handleSubmit: handleClientReSubmit,
    formState: { errors: ClientReErrors }

  } = useForm<FormInputs>({
    defaultValues: defaultClientReValues,
    resolver: yupResolver(AddClientReSchema)
  })

console.log(clientsValues(),"clientsValues")

//  const onSubmit = ((data:any)=>{
//   console.log("abs",data)
//   CreateClientApi(data)
//  })

 const onSubmit = async () => {
    try {
      await CreateClientApi(studentValues())
      console.log(studentValues(), "defaultClientValues")
    }
    catch (err) {
      console.log("error", err)
    }
  }





//  const ClientSubmit = ((data:any)=>{
//   console.log("AAAAA",data)
//   updateEmployeeApi(data)
//  })

 const ClientSubmit = async () => {
    try {
      await UpdateClientApi(clientsValues())
      console.log(clientsValues(), "ADC")
    }
    catch (err) {
      console.log("error", err)
    }
  }



 const handleCloss = () => {
  setIsOpen(false);
};



const handleChange=(e:any)=>{
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
                              <MenuItem value='Canada'>Female</MenuItem>
                              
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
                  <Button size='large' type='submit' variant='contained' onSubmit={onSubmit} onClick={handleSave}>
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





    <Dialog maxWidth="md" sx={{ overflow: 'auto' }} open={isDialogOpenUpdate} onClose={handleCloseDialogUpdate}>
    {isOpen &&
        <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }} >
          <CardContent>
            <form onSubmit={handleClientReSubmit(ClientSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='clientName'
                      control={ABC}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value ? value : singleClient.clientName}
                          // value={singleClient.clientName}
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
                          // value={value}
                      value={value ?value:singleClient.clientEmail}

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
                          value={value ?value:singleClient?.clientPhoneNumber}
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
                          error={Boolean(ClientErrors.clientGender)}
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
                              label='Country'
                              onChange={onChange}
                              error={Boolean(ClientReErrors.clientGender)}
                              labelId='validation-basic-select'
                              aria-describedby='validation-basic-select'
                            >
                              {/* <MenuItem value=''>Select</MenuItem> */}
                              <MenuItem value='Male'>Male</MenuItem>
                              <MenuItem value='Canada'>Female</MenuItem>
                              
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
                    
                <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='validation-basic-select'
                          error={Boolean(ClientReErrors.clientStatus)}
                          htmlFor='validation-basic-select'
                        >
                          Status*
                        </InputLabel>
                        <Controller
                          name='clientStatus'
                          control={ABC}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              label='clientStatus'
                              
                              onChange={onChange}
                              error={Boolean(ClientReErrors.clientStatus)}
                              labelId='validation-basic-select'
                              aria-describedby='validation-basic-select'
                            >
                              {/* <MenuItem value=''>Select</MenuItem> */}
                              <MenuItem value='Active'>Active</MenuItem>
                              <MenuItem value='In Active'>In Active</MenuItem>
                              
                            </Select>
                          )}
                        />
                        {ClientReErrors.clientStatus && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {ClientReErrors.clientStatus.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                <Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained' onSubmit={ClientSubmit} onClick={handleSave}>
                    Submit
                  </Button>
                
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 4 }}>
            {/* <Button variant="contained" onClick={debouncedSubmit}>Save</Button> */}
          </Grid>
        </Card >
      }
      </Dialog >
    </>  
  )
}

export default Index
