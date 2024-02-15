import AddCircle from '@mui/icons-material/AddCircle'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { ChangeEvent, useState } from 'react'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import QuickSearchToolbar from 'src/views/table/TableFilter'
import { DataGridRowType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/context/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { BrandCreateApi } from 'src/store/APIs/Api'

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


const Brand = () => {
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [openAddBrandDialog, setOpenAddBrandDialog] = useState(false)
  const [brandData, setBrandData] = useState<any>({
    "customerId": "099f9bf2-8ac2-4f84-8286-83bb46595fde",

    "salonId": "NRImf",

    "brandName": ""
  });

  const columns: GridColumns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'brandName',
      headerName: 'brandName',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.brandName}
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
      flex: 0.175,
      minWidth: 150,
      field: 'brandStatus',
      headerName: 'brandStatus',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={params.row.brandStatus === 'active' ? 'success' : 'error'}
            label={params.row.brandStatus}
          />
        </Typography>
      )
    },
  ]

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

  const handleChange = (e: any) => {
    setBrandData(prevState => ({
      ...prevState,
    }));
    console.log("name", e)
    const { name, value } = e.target
    console.log(name,value,"cscwasdasca");
    setBrandData({ ...brandData, [name]: value })
  };


  const onSubmitBrand = async () => {
    try {
      const res = await BrandCreateApi(brandData);
      console.log("success Brand", res);
      setOpenAddBrandDialog(false)
    } catch (err) {
      console.error("Error creating Brand", err);
    }

  };

  const handleDialogCloseAddBrand = ()=>{
    setOpenAddBrandDialog(false)
  }

  const handleVendorChange = (event: any) => {
    // Handle file selection here
    setOpenAddBrandDialog(true)
  }

  return (
    <>
      <Card>
        <Grid sx={{display:'flex',alignItems:'center'}}>

          <Button variant='contained'sx={{m:'20px'}} >
            Back
          </Button>
          <Typography sx={{fontSize:'20px',width:'100%'}}>Product Brand</Typography>
        <Grid sx={{display:'flex',justifyContent:'flex-end',width:'100%',p:'20px',cursor:'pointer'}} ><AddCircle onClick={handleVendorChange} sx={{fontSize:"40px"}} /></Grid>
        </Grid>

      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}

        components={{ Toolbar: QuickSearchToolbar }}
        rows={}
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
        <Dialog open={openAddBrandDialog} onClose={handleDialogCloseAddBrand} fullWidth>
        <DialogTitle><CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDialogCloseAddBrand} />Add Vendor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="brandName"
                value={brandData.vendorName}
                onChange={handleChange}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='Name'
                variant="outlined"
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitBrand} color='primary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Brand
