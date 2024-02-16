import AddCircle from '@mui/icons-material/AddCircle'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import QuickSearchToolbar from 'src/views/table/TableFilter'
import { DataGridRowType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/context/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { BrandCreateApi, ListAllBrandListApi, deleteBrandApi, deleteVendorApi, updateBrandApi } from 'src/store/APIs/Api'
import toast from 'react-hot-toast'

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
        {getInitials(row.brandName ? row.brandName : '')}
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
const [brandlist,setBrandList]= useState<any[]>([])
  const [openAddBrandDialog, setOpenAddBrandDialog] = useState(false)
  const [openUpdateBrandDialog, setOpenUpdateBrandDialog] = useState(false)
  const [deleteBrandFunc, setDeleteBrandFunc] = useState({})
  const [openDialogDeleteBrand, setOpenDialogDeleteBrand] = useState(false);
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
    {
      flex: 0.1,
      minWidth: 100,
      field: 'edit',
      headerName: 'Edit',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="edit" onClick={() => handleChangeBrand(params.row)}>
          <EditIcon />
        </IconButton>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="delete" onClick={() => handleOpenDialogDeleteBrand(params.row)} >
          <DeleteIcon />
        </IconButton>
      )
    }
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

  const FatchData = async () => {
    try {
      const res: any = await ListAllBrandListApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', '6GZr2')
      console.log("fatchData", res?.data.data)
      setBrandList(res?.data?.data)
    }
    catch (err) {
      return err
    }
  }
  useEffect(() => {
    FatchData()
  }, [])

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
      toast.success('Brand Created successfully', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.error("Error creating Brand", err);
    }

  };

  const onSubmitBrandUpdate = async () => {
    try {
      const res = await updateBrandApi(brandData);
      console.log("success Updatebrand", res);
      await ListAllBrandListApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', '6GZr2')
      handleDialogCloseUpdateBrand()
      await FatchData()
      toast.success('Brand Updated successfully', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.error("Error updating vendor", err);
    }
  };

  const handleChangeBrand = (rowData: DataGridRowType) => {
    console.log(rowData, "rowData");
    setBrandData({
      ...rowData,
    });
    setOpenUpdateBrandDialog(true);
  };

  const handleDeleteBrand = async () => {
    console.log(deleteBrandFunc, "deleteClient gfhgf");
    try {
      await deleteBrandApi(deleteBrandFunc);
      handleCloseDialogDeleteBrand();
      await FatchData()
      toast.success('Brand InActive successfully', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleOpenDialogDeleteBrand = (data: any) => {
    const deleteBrandData = {
      customerId: data.customerId,
      salonId: data.salonId,
      brandId: data.brandId,
      brandStatus: "inActive"
    }
    console.log(data,"hjfhgdfgdfd")
    setDeleteBrandFunc(deleteBrandData)
    setOpenDialogDeleteBrand(true)
  }

  const handleCloseDialogDeleteBrand = () => {
    setOpenDialogDeleteBrand(false)
  }

  const handleDialogCloseAddBrand = ()=>{
    setOpenAddBrandDialog(false)
  }
  const handleDialogCloseUpdateBrand = ()=>{
    setOpenUpdateBrandDialog(false)
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
        rows={brandlist}
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
                value={brandData.brandName}
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
      <Dialog open={openUpdateBrandDialog} onClose={handleDialogCloseUpdateBrand} fullWidth>
        <DialogTitle><CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDialogCloseUpdateBrand} />Add Vendor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="brandName"
                value={brandData.brandName}
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
          <Button onClick={onSubmitBrandUpdate} color='primary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogDeleteBrand} onClose={handleCloseDialogDeleteBrand}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDeleteBrand} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteBrand} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Brand
