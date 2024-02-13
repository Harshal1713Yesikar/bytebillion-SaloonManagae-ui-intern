import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState, MouseEvent, ChangeEvent } from 'react'
import Dashboard from '../dashboard'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/context/types';
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types';
import QuickSearchToolbar from 'src/views/table/TableFilter';
import { VendorCreateApi } from 'src/store/APIs/Api';

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
const Vendor = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [openAddVendorDialog, setOpenAddVendorDialog] = useState(false)
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [clientData, setClientData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
    handleDialogClose()
  }

  const handleDialogCloseVendor = () => {
    setOpenAddVendorDialog(false)
  }

  const handleVendorChange = (event: any) => {
    // Handle file selection here
    setOpenAddVendorDialog(true)
  }

  const handleVendorSubmit = () => {
    handleDialogCloseVendor()
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

  return (
    <>
      <Grid sx={{ display: 'flex', width: '100%' }}>
        <Grid sx={{ width: '25%', mr: 3 }}>
          <Dashboard />
        </Grid>
        <Card sx={{ width: '75%', p: 6, height: '100%' }}>
          <Grid sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: '20px', width: "100%" }}>Vendor List</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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
                  <MenuItem onClick={handleVendorChange}>Add Vendor</MenuItem>
                  <MenuItem onClick={handleClose}>Simple File Download</MenuItem>
                  <MenuItem onClick={handleImportClick}>Import Vendor</MenuItem>
                </Menu>
              </Grid>
              <Dialog open={openImportDialog} onClose={handleDialogClose} fullWidth>
                <DialogTitle>Import Vendor</DialogTitle>
                <DialogContent>
                  <TextField
                    type='file'
                    onChange={handleFileChange}
                    inputProps={{ accept: '.csv, .xlsx' }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleImportSubmit} color='primary' variant='contained'>
                    Import
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={openAddVendorDialog} onClose={handleDialogCloseVendor} fullWidth>
                <DialogTitle ><CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDialogCloseVendor} />Add Vendor</DialogTitle>
                <DialogContent>
                  <Grid sx={{ display: 'flex' }}>
                    <TextField sx={{ p: 2 }} size='small' id="outlined-basic" placeholder='Name' variant="outlined" />
                    <TextField sx={{ p: 2 }} size='small' id="outlined-basic" placeholder='Contact' variant="outlined" />
                    <TextField sx={{ p: 2 }} size='small' id="outlined-basic" placeholder='Email' variant="outlined" />
                  </Grid>
                  <TextField sx={{ p: 2, width: '79vh' }} size='small' id="outlined-basic" placeholder='Address' variant="outlined" />
                  <TextField sx={{ p: 2, width: '26vh' }} size='small' id="outlined-basic" placeholder='GST' variant="outlined" />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleVendorSubmit} color='primary' variant='contained'>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>
          <DataGrid
            sx={{ mt: '50px' }}
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
      </Grid>
    </>
  )
}

export default Vendor
