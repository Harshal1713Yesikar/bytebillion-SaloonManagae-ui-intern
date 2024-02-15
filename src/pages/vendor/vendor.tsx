import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react'
import Dashboard from '../dashboard'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/context/types';
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types';
import QuickSearchToolbar from 'src/views/table/TableFilter';
import { ListAllVendorListApi, VendorCreateApi, deleteVendorApi, updateVendorApi } from 'src/store/APIs/Api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomChip from 'src/@core/components/mui/chip'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

interface FormInputs {
  customerId: string
  salonId: string

  clientName: string
  clientPhoneNumber: string
  clientEmail: string
  clientGender: string
  clientStatus: string
  vendorName: string,
  phoneNumber: string,
  address: string,
  email: string,
  vendorCertificate: [{
    certificateName: string,
    certificateImage: string
  }]

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
  const [openEditVendorDialog, setOpenEditVendorDialog] = useState(false)
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [vendorData, setVendorData] = useState<any[]>([])
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [deleteVendorFunc, setDeleteVendorFunc] = useState({})
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [formData, setFormData] = useState<any>({
    "customerId": "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    "salonId": "NRImf",
    "vendorName":"",
    "phoneNumber": "",
    "address": "",
    "email": "",
    "vendorCertificate": [{
      "certificateName": "",
      "certificateImage": ""
    }]
  });
  const handleChange = (e: any) => {
    setFormData(prevState => ({
      ...prevState,
    }));
    console.log("name", e)
    const { name, value } = e.target
    console.log(name,value,"cscwasdasca");
    setFormData({ ...formData, [name]: value })
  };

  const handleCommon = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error message for the corresponding field
  }
  const onSubmitVendor = async () => {
    try {
      const res = await VendorCreateApi(formData);
      console.log("success vendor", res);
      handleDialogCloseVendor()
    } catch (err) {
      console.error("Error creating vendor", err);
    }

  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }

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
  const handleDialogCloseEditVendor = ()=>{
    setOpenEditVendorDialog(false)
  }

  const handleVendorChange = (event: any) => {
    // Handle file selection here
    setOpenAddVendorDialog(true)
  }

  const FatchData = async () => {
    try {
      const res: any = await ListAllVendorListApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', '6GZr2')
      console.log("fatchData", res?.data.data)
      setVendorData(res?.data?.data)
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
  const handleChangeVendor = (rowData: DataGridRowType) => {
    console.log(rowData, "rowData");
    setFormData({
      ...rowData,
      // Populate other fields similarly
    });
    setOpenEditVendorDialog(true);
  };

  const handleDeleteVendor = async () => {
    console.log(deleteVendorFunc, "deleteClient gfhgf");
    try {
      await deleteVendorApi(deleteVendorFunc);
      handleCloseDialogDelete();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  const handleOpenDialogDelete = (data: any) => {
    const deleteVendorData = {
      customerId: data.customerId,
      salonId: data.salonId,
      vendorId: data.vendorId,
      vendorStatus: "inActive"
    }
    console.log(data,"hjfhgdfgdfd")
    setDeleteVendorFunc(deleteVendorData)
    setOpenDialogDelete(true)
  }

  const onSubmitVendorUpdate = async () => {
    try {
      const res = await updateVendorApi(formData);
      console.log("success data", res);
      await ListAllVendorListApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', '6GZr2')
      handleDialogCloseEditVendor()
      // Optionally, you can handle the success response here
    } catch (err) {
      console.error("Error updating vendor", err);
      // Optionally, you can handle the error here
    }
  };

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'vendorName',
      headerName: 'vendorName',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.vendorName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'vendorStatus',
      headerName: 'vendorStatus',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={params.row.vendorStatus === 'active' ? 'success' : 'error'}
            label={params.row.vendorStatus}
          />
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'vendorEmail',
      minWidth: 80,
      headerName: 'Email',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.vendorEmail}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'edit',
      headerName: 'Edit',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="edit" onClick={() => handleChangeVendor(params.row)}>
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
        <IconButton aria-label="delete" onClick={() => handleOpenDialogDelete(params.row)} >
          <DeleteIcon />
        </IconButton>
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
                <DialogTitle><CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDialogCloseVendor} />Add Vendor</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        name="vendorName"
                        value={formData.vendorName}
                        onChange={handleChange}
                        size='small'
                        fullWidth
                        id="outlined-basic"
                        placeholder='Name'
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>  handleChange(e)}

                        size='small'
                        fullWidth
                        id="outlined-basic"
                        placeholder='Contact'
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="email"
                        value={formData.email}
                        onChange={(e) =>  handleChange(e)}

                        size='small'
                        fullWidth
                        id="outlined-basic"
                        placeholder='Email'
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="vendorStatus"
                        value={formData.vendorStatus}
                        onChange={(e) =>  handleChange(e)}

                        size='small'
                        fullWidth
                        id="outlined-basic"
                        placeholder='vendorStatus'
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="gst"
                        onChange={(e) =>  handleChange(e)}

                        size='small'
                        fullWidth
                        id="outlined-basic"
                        placeholder='GST'
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onSubmitVendor} color='primary' variant='contained'>
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
            rows={vendorData}
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
      <Dialog open={openEditVendorDialog} onClose={handleDialogCloseEditVendor} fullWidth>
        <DialogTitle><CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDialogCloseEditVendor} />Add Vendor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="vendorName"
                value={formData.vendorName}
                onChange={handleCommon}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='Name'
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="vendorPhoneNumber"
                value={formData.vendorPhoneNumber}
                onChange={handleCommon}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='Contact'
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="vendorEmail"
                value={formData.vendorEmail}
                onChange={handleCommon}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='Email'
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="vendorAddress"
                value={formData.vendorAddress}
                onChange={handleCommon}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='Address'
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="gst"
                onChange={handleCommon}
                size='small'
                fullWidth
                id="outlined-basic"
                placeholder='GST'
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitVendorUpdate} color='primary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteVendor} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Vendor
