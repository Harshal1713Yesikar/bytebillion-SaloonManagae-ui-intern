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
import { ListAllClientsApi } from 'src/store/APIs/Api'
import { CreateClientApi } from 'src/store/APIs/Api'



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
interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
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
  const [clientData, setClientData] = useState<any[]>([])
  const [hideNameColumn, setHideNameColumn] = useState(false)

  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [defaultClientValues, setDefaultClientValues] = useState<any>({

    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: '6GZr2',
    clientId: '',
    clientName: '',
    clientPhoneNumber: '',
    clientEmail: '',
    clientGender: '',
    clientStatus: ''

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
      flex: 0.175,
      minWidth: 150,
      field: 'clientStatus',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.clientStatus == 'active' ? (
            <CustomChip rounded size='small' skin='light' color='success' label={params.row.clientStatus} />
          ) : (
            <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.clientStatus} />
          )}
        </Typography>
      )
    }


  ]



  const FatchData = async () => {
    try {
      const res: any = await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', '6GZr2')
      console.log("fatchData", res?.data.data)
      setClientData(res?.data?.data)
    }
    catch (err) {
      return err
    }
  }
  useEffect(() => {
    FatchData()
  }, [])

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

  const onSubmit = ((data: any) => {
    console.log("abs", data)
    CreateClientApi(data)
  })


  return (
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
          {/* <DialogContent>
            <Grid style={{ display: 'flex' }}>
              <TextField
                sx={{ m: 5, width: "40%" }}
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                sx={{ m: 5, width: "40%" }}
                label="Contact"
                fullWidth
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Grid>
            <Typography sx={{ fontSize: 20 }}>Select Group</Typography>
            <TextField
              sx={{ m: 5, width: "90%" }}
              label="Group"
              fullWidth
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </DialogContent> */}
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
      <Container style={{ border: '2px solid lightgray', borderRadius: '10px', padding: '20px', display: 'flex' }}>
        <Grid style={{ display: 'flex', flexDirection: 'column' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography>Date</Typography>
            <DatePicker
              label='From'
              slotProps={{
                textField: {
                  size: 'small',
                  style: { width: '150px' }
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='To'
            slotProps={{
              textField: {
                size: 'small',
                style: { width: '250px', marginLeft: '5px', marginTop: '25px' }
              }
            }}
          />
        </LocalizationProvider>
        <Grid style={{ display: 'flex', flexDirection: 'column', margin: '0px', marginLeft: '5px' }}>
          <Typography>Client Type</Typography>
          <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size='small'>
            <InputLabel id='demo-select-small-label'>All Clients</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={client}
              label='All Clients'
              onChange={handleClient}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid style={{ padding: '0', marginTop: '25px', marginLeft: '10px' }}>
          <Button variant='contained'>Search</Button>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '20px' }}>
          <Button
            variant='contained'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Action
          </Button>
          <Grid>
            <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
              <MenuItem onClick={handleCustomer}>Client Groups</MenuItem>
              <MenuItem onClick={handleClose}>Simple File Download</MenuItem>
              <MenuItem onClick={handleImportClick}>Import Client</MenuItem>
            </Menu>
          </Grid>
          <Dialog open={openImportDialog} onClose={handleDialogClose} fullWidth>
            <DialogTitle>Import Client</DialogTitle>
            <DialogContent>
              {/* File input for importing */}
              <TextField
                type='file'
                onChange={handleFileChange}
                inputProps={{ accept: '.csv, .xlsx' }} // Specify allowed file types
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleImportSubmit} color='primary' variant='contained'>
                Import
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
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
  )
}

export default Index
