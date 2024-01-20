// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

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
import { Button, Container, Grid, Icon } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { loadCSS } from 'fg-loadcss';

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


  return (
    <Card>
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ marginLeft: "20px", padding: "10px" }}>
          <CardHeader style={{ padding: "0px" }} title='Expense Transactions' />
          <Typography >You can see which one s you have, their methods, notes and amounts</Typography>
        </Grid>
        <Icon style={{ display: "flex", justifyContent: "center" }} baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30, color: "black" }} />
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
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Action</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Age"
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
