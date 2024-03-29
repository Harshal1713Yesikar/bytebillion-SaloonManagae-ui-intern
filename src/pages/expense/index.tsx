// ** React Imports
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react'

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
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, Menu, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router'
import PrintIcon from '@mui/icons-material/Print';
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

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };



  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const router = useRouter();
  const handleBack = () => {
    router.push('./expense/createExpense');
  }

  const routers = useRouter();
  const handleExpensecate = () => {
    routers.push('../expense/createCategory');
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
        <Grid style={{ display: "flex", justifyContent: 'flex-end', width: "100%", margin: "20px" }}>
          <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 40, color: "black", cursor: 'pointer' }} onClick={handleBack} />
        </Grid>
      </Grid>
      <Grid style={{ display: "flex", width: "100%" }}>
        <Container style={{ border: '2px solid lightgray', borderRadius: '10px', padding: "20px", display: "flex", margin: "20px" }}>
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
                  style: { width: '150px', marginLeft: "5px", marginTop: "24px" }
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
                value={age}
                label="All Clients"
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
          <Grid style={{ padding: "0", marginTop: '25px', marginLeft: '10px' }}>
            <Button variant='contained' >
              Search
            </Button>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "20px" }} >
            <Grid sx={{ mt: 2, cursor: 'pointer' }}>
              <PrintIcon />
            </Grid>
            <Button variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} endIcon={<ArrowDropDownIcon />} size='small'>
              Action
            </Button>
            <Grid>
              <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
                <MenuItem onClick={handleExpensecate}>Category</MenuItem>
                <MenuItem onClick={handleClose}>Simple File</MenuItem>
                <MenuItem onClick={handleImportClick}>Import Expenses</MenuItem>
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
      </Grid>
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
