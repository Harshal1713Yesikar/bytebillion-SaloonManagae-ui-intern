// ** React Imports
import { ChangeEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/TableFilter'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Menu, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';
import { useRouter } from 'next/router'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
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

const columns: GridColumns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Name',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.full_name}
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
    flex: 0.2,
    minWidth: 120,
    headerName: 'Date',
    field: 'start_date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'salary',
    headerName: 'Salary',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.salary}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'Age',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.age}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => {
      const status = statusObj[params.row.status]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  }
]

const Index = () => {
  // ** States
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])

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

  const [client, setClient] = useState('');

  const handleClient = (event: SelectChangeEvent) => {
    setClient(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',

      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);


  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [group, setGroup] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    // Handle saving data or any other logic here
    closeModal();
  };

  const router = useRouter();
  const handleCustomer = () => {
    router.push('../second-page/clientCustomerCreate');
  }


  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleImportClick = () => {
    handleClose();
    setOpenImportDialog(true);
  };

  const handleDialogClose = () => {
    setOpenImportDialog(false);
  };

  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0]);
  };

  const handleImportSubmit = () => {
    // Handle import logic here using the selected file
    // You can dispatch an action or call a function to handle the import
    // Remember to close the dialog after import is done
    handleDialogClose();
  };


  return (
    <Card>
      <Grid style={{ display: 'flex', width: "100%" }}>
        <Grid style={{ marginLeft: "20px", padding: "10px", width: "100%" }}>
          <CardHeader style={{ padding: "0px" }} title='Expense Transactions' />
          <Typography >You can see which one s you have, their methods, notes and amounts</Typography>
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '20px' }}>
          <Icon
            baseClassName="fas"
            className="fa-plus-circle"
            sx={{ fontSize: 40, color: 'black', cursor: 'pointer' }}
            onClick={openModal}
          />
        </Grid>

        <Dialog open={isModalOpen} onClose={closeModal}>
          <DialogTitle>Add Client</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={closeModal} variant="contained" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Container style={{ border: '2px solid lightgray', borderRadius: '10px', padding: "20px", display: "flex" }}>
        <Grid style={{ display: 'flex', flexDirection: "column" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Typography>Date</Typography>
            <DatePicker
              label="From"
              slotProps={{
                textField: {
                  size: 'small',
                  style: { width: '150px' }
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
            label="To"
            slotProps={{
              textField: {
                size: 'small',
                style: { width: '250px', marginLeft: "5px", marginTop: "25px" }
              }
            }}
          />
        </LocalizationProvider>
        <Grid style={{ display: 'flex', flexDirection: "column", margin: "0px", marginLeft: "5px", }}>
          <Typography>Client Type</Typography>
          <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
            <InputLabel id="demo-select-small-label">All Clients</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={client}
              label="All Clients"
              onChange={handleClient}
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
        <Grid style={{ padding: "0", marginTop: '25px', marginLeft: '10px' }}>
          <Button variant='contained' >
            Search
          </Button>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "20px" }} >
          <Button variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
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
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: '.csv, .xlsx' }} // Specify allowed file types
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleImportSubmit} color="primary" variant='contained'>
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
        rows={filteredData.length ? filteredData : data}
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
      <Grid style={{ display: 'flex', justifyContent: 'center', gap: "20px", padding: "20px" }}>
        <Button variant='outlined' >
          Previous
        </Button>
        <Button variant='contained' >
          Next
        </Button>
      </Grid>
    </Card>
  )
}

export default Index
