import { Box, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid,
IconButton, InputAdornment, InputLabel, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import { MouseEvent } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddProductPop from 'src/views/pages/Product/addProduct/addProductPop'
import { useRouter } from 'next/router';
import QuickSearchToolbar from 'src/views/table/TableFilter';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProductApi, updateProductApi } from 'src/store/APIs/Api';
import { ListAllProductListApi } from 'src/store/APIs/Api';
import { debounce } from 'lodash'
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types'
import toast from 'react-hot-toast';

const validationSchema = yup.object().shape({
  productName: yup.string().matches(/^[A-Z a-z]+$/).required('Product Name is required'),
  Barcode: yup.string().required('Barcode is required'),
  costPrice: yup.string().matches(/^[0-9]+$/, 'Cost Price must be a number').required('Cost Price is required'),
  fullPrice: yup.string().matches(/^[0-9]+$/, 'Full Price must be a number').required('Full Price is required'),
  sellPrice: yup.string().matches(/^[0-9]+$/, 'Sell Price must be a number').required('Sell Price is required'),
});

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const renderClient = (params: GridRenderCellParams) => {
  const { row } = params

  return (
    <CustomAvatar
      skin='light'
      color="primary"
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row.full_name ? row.full_name : 'John Doe')}
    </CustomAvatar>
  )
}

const Index = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [anchorAl, setAnchorAl] = useState<null | HTMLElement>(null)
  const [productBl, setProductBl] = useState<null | HTMLElement>(null)
  const [anchorCl, setAnchorCl] = useState<null | HTMLElement>(null)
  const [anchorDl, setAnchorDl] = useState<null | HTMLElement>(null)
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpenUpdate, setDialogOpenUpdate] = useState(false);
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [productList, setProductList] = useState<DataGridRowType[]>([])
  const [isOpen, setIsOpen] = useState(true);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorBarcode, setErrorBarcode] = useState('');
  const [errorCostPrice, setErrorCostPrice] = useState('');
  const [errorFullPrice, setErrorFullPrice] = useState('');
  const [errorSellPrice, setErrorSellPrice] = useState('');
  const [updateSingleData, setUpdateSingleData] = useState<any>({
    "customerId": "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    "salonId": "NRImf",
    "productId": "",
    "stockId": "",
    "brandId": "",
    "productName": " ",
    "productStatus": "",
    "Barcode": "",
    "costPrice": "",
    "fullPrice": "",
    "sellPrice": "",
    "productDescription": " ",
    "vendorName": [],
    "availableStock": {
      "retailStock": ""
    }
  });
  const [deleteProductFunc, setDeleteProductFunc] = useState({})
  const handleCommon = (e: any) => {
    setUpdateSingleData({ ...updateSingleData, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case 'productName':
        setErrorName('');
        break
      case 'Barcode':
        setErrorBarcode('');
        break;
      case 'costPrice':
        setErrorCostPrice('');
        break;
      case 'fullPrice':
        setErrorFullPrice('');
        break;
      case 'sellPrice':
        setErrorSellPrice('');
        break;

      default:
        break;
    }
  }


  const handleClose = () => {
    setIsOpen(false);
  };

  const debouncedSubmit = debounce(() => {
    handleSubmit()
  }, 1000)

  const handleCheckboxChange = (checkboxId: string) => {
    setSelectedCheckbox(checkboxId === selectedCheckbox ? null : checkboxId);
  };

  const handleButtonClick = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleReturn = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorAl(event.currentTarget)
  }

  const handleCloseReturn = () => {
    setAnchorAl(null)
  }

  const handleProduct = (event: MouseEvent<HTMLButtonElement>) => {
    setProductBl(event.currentTarget)
  }

  const handleCloseProduct = () => {
    setProductBl(null)
  }

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorCl(event.currentTarget)
  }

  const handleCloseEdit = () => {
    setAnchorCl(null)
  }

  const handleAssign = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorDl(event.currentTarget)
  }

  const handleCloseAssign = () => {
    setAnchorDl(null)
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEditProduct = (rowData: DataGridRowType) => {
    console.log(rowData, "rowData");
    setUpdateSingleData({
      ...rowData,
      // Populate other fields similarly
    });
    setDialogOpenUpdate(true);
  };

  const handleDeleteProduct = async () => {
    console.log(deleteProductFunc, "deleteClient ");
    try {
      await deleteProductApi(deleteProductFunc);
      handleCloseDialogDelete();
      ProductAllListData()
      toast.success('Product InActive successfully', {
        position: 'bottom-right'
      })
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleOpenDialogDelete = (data: any) => {
    const deleteProductData = {
      customerId: data.customerId,
      salonId: data.salonId,
      productId: data.productId,
      productStatus: "inActive"
    }
    console.log(data, "hjfhgdfgdfd")
    setDeleteProductFunc(deleteProductData)
    setOpenDialogDelete(true)
  }

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  const handleCloseDialogUpdate = () => {
    setDialogOpenUpdate(false);
  };

  const inventory = useRouter();
  const handleInventory = () => {
    inventory.push('../products/inventoryReturn');
  }

  const returnOrder = useRouter();
  const handleReturnOrder = () => {
    returnOrder.push('../products/returnOrder');
  }

  const productOrder = useRouter();
  const handleProductOrder = () => {
    productOrder.push('../products/productOrder');
  }

  const vendor = useRouter();
  const handlevendor = () => {
    vendor.push('../vendor/vendor');
  }

  const Brand = useRouter();
  const handleBrand = () => {
    Brand.push('../brand/brand');
  }

  const columns: GridColumns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'productName',
      headerName: 'productName',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.productName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Barcode',
      field: 'Barcode',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.Barcode}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'costPrice',
      headerName: 'costPrice',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.costPrice}
        </Typography>
      )
    },
    {
      flex: 0.125,
      field: 'fullPrice',
      minWidth: 80,
      headerName: 'fullPrice',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.fullPrice}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'productStatus',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={params.row.productStatus === 'active' ? 'success' : 'error'}
            label={params.row.productStatus}
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
        <IconButton aria-label="edit" onClick={() => handleEditProduct(params.row)}>
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
        <IconButton aria-label="delete" onClick={() => handleOpenDialogDelete(params.row)}>
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

  const ProductAllListData = async () => {
    try {
      const response: any = await ListAllProductListApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
      setProductList(response?.data?.data)
      console.log('aaa', response.data.data)
    } catch (err) {
      return err
    }
  }
  useEffect(() => {
    ProductAllListData()
  }, [])

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(updateSingleData, { abortEarly: false });
      console.log("defaultProductValues", updateSingleData)
      await updateProductApi(updateSingleData);
      await ProductAllListData()
      handleCloseDialogUpdate()
      toast.success('Product Updated', {
        position: 'bottom-right'
      })
    } catch (error) {
      error.inner.forEach(err => {
        switch (err.path) {
          case 'productName':
            setErrorName(err.message);
            break;
          case 'Barcode':
            setErrorBarcode(err.message);
            break;
          case 'costPrice':
            setErrorCostPrice(err.message);
            break;
          case 'fullPrice':
            setErrorFullPrice(err.message);
            break;
          case 'sellPrice':
            setErrorSellPrice(err.message);
            break;
          default:
            break;
        }
      });
    }
  };

  return (
    <>
      <Card sx={{ padding: '20px', pt: 15 }}>
        <Box sx={{ padding: '10px' }}>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField size='small' id='outlined-basic' label='Search' sx={{ width: '40%' }} />
            <FormControl sx={{ width: '40%', ml: 5 }} size='small'>
              <InputLabel id='demo-simple-select-outlined-label'>Select Products</InputLabel>
              <Select
                label='Select Products'
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                sx={{ width: '100%' }}
              >
                <MenuItem value=''>
                  <em>Select Products</em>
                </MenuItem>
                <MenuItem value={10}>Products for sale (Retail)</MenuItem>
                <MenuItem value={20}>Products for Business use (In House)</MenuItem>
              </Select>
            </FormControl>

          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center', margin: "20px", alignItems: 'center' }}>
            <Button sx={{ ml: 2 }} variant='contained'>
              Search
            </Button>
          </Grid>
          {/* <Grid sx={{ display: 'flex', justifyContent: 'center', margin: "20px", alignItems: 'center' }}>
          <label>
            <input
              type="checkbox"
              checked={selectedCheckbox === 'checkbox1'}
              onChange={() => handleCheckboxChange('checkbox1')}
            />
            Zero quantity products only
          </label>
          <label style={{ marginLeft: "20px", marginRight: "20px" }}>
            <input
              type="checkbox"
              checked={selectedCheckbox === 'checkbox2'}
              onChange={() => handleCheckboxChange('checkbox2')}
            />
            Low quantity products only
          </label>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedCheckbox === 'checkbox3'}
              onChange={() => handleCheckboxChange('checkbox3')}
            />
            In Stock products only
          </label>
          <Grid>
            <Button variant='contained' onClick={handleButtonClick}>Advanced Filters</Button>
          </Grid>
        </Grid> */}
          {/* <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>

{showAdvancedFilters && (
  <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 5 }} >
    <FormControl sx={{ width: '100%', ml: 2 }} size='small'>
      <InputLabel id='demo-simple-select-outlined-label'>Select Brand</InputLabel>
      <Select
        label='Select Brand'
        id='demo-simple-select-outlined'
        labelId='demo-simple-select-outlined-label'
        sx={{ width: '100%' }}
      >
        <MenuItem value=''>
          <em>Select Brand</em>
        </MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ width: '100%', ml: 2 }} size='small'>
      <InputLabel id='demo-simple-select-outlined-label'>Select Product Type</InputLabel>
      <Select
        label='Select Product Type'
        id='demo-simple-select-outlined'
        labelId='demo-simple-select-outlined-label'
        sx={{ width: '100%' }}
      >
        <MenuItem value=''>
          <em>Select Product Type</em>
        </MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ width: '100%', ml: 2 }} size='small'>
      <InputLabel id='demo-simple-select-outlined-label'>Select Vendor</InputLabel>
      <Select
        label='Select Vendor'
        id='demo-simple-select-outlined'
        labelId='demo-simple-select-outlined-label'
        sx={{ width: '100%' }}
      >
        <MenuItem value=''>
          <em>Select Vendor</em>
        </MenuItem>
      </Select>
    </FormControl>
  </Grid>
)}
        </Grid> */}
        </Box >
      </Card>
      <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: '10px' }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }} >
          <Button sx={{ mr: 2 }} variant='contained' onClick={handleOpenDialog}>
            Add Product
          </Button>
          <Button sx={{ mr: 2 }} variant='contained' onClick={handlevendor}>
            Vendor List
          </Button>
          <Button sx={{ mr: 2 }} variant='contained' onClick={handleBrand}>
            Brand List
          </Button>
        </Box>
      </Grid>
      <Dialog maxWidth="md" sx={{ overflow: 'auto' }} open={isDialogOpen} onClose={handleCloseDialog}>
        < AddProductPop />
      </Dialog >
      <Card>
        <Card>
          <CardHeader title='Product List' />
          <DataGrid
            autoHeight
            columns={columns}
            pageSize={pageSize}
            rows={productList}
            rowsPerPageOptions={[7, 10, 25, 50]}
            components={{ Toolbar: QuickSearchToolbar }}
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
      </Card>
      <Dialog maxWidth="md" sx={{ overflow: 'auto' }} open={isDialogOpenUpdate} onClose={handleCloseDialogUpdate}>
        <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }} >
          <Grid sx={{ borderBottom: '2px solid lightGray' }}>
            <Grid sx={{ p: 3 }}>
              <Grid sx={{ display: 'flex' }}>
                <Box sx={{ m: 2, cursor: 'pointer' }}   ><CloseIcon onClick={handleCloseDialogUpdate} /></Box>
                <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Update Product</Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex' }} >
                <TextField
                  sx={{ width: '25ch', m: 1 }}
                  id='outlined-basic'
                  label='Product Name'
                  size='small'
                  value={updateSingleData && updateSingleData.productName}
                  onChange={handleCommon}
                  error={!!errorName}
                  helperText={errorName}
                  name="productName"
                />
                <TextField
                  sx={{ width: '25ch', m: 1 }}
                  fullWidth
                  id='outlined-basic'
                  label='Barcode'
                  size='small'
                  variant='outlined'
                  value={updateSingleData && updateSingleData.Barcode}
                  onChange={handleCommon}
                  error={!!errorBarcode}
                  helperText={errorBarcode}
                  name="Barcode"
                />
              </Grid>
              <Grid item sx={{ display: 'flex', width: '100%', maxWidth: '100%' }} xs={12}>
                <Grid item xs={12} md={6}>
                  <TextField
                    size='small'
                    placeholder="Cost Price"
                    id='outlined-basic'
                    sx={{ m: 1, width: '25ch' }}
                    value={updateSingleData && updateSingleData.costPrice}
                    onChange={handleCommon}
                    error={!!errorCostPrice}
                    helperText={errorCostPrice}
                    name='costPrice'
                    type="number"
                    inputProps={{ pattern: "[0-9]*" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    size='small'
                    placeholder="Full Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    value={updateSingleData && updateSingleData.fullPrice}
                    onChange={handleCommon}
                    error={!!errorFullPrice}
                    helperText={errorFullPrice}
                    name='fullPrice'
                    type="number"
                    inputProps={{ pattern: "[0-9]*" }}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    size='small'
                    placeholder="Sell Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    value={updateSingleData && updateSingleData.sellPrice}
                    onChange={handleCommon}
                    error={!!errorSellPrice}
                    helperText={errorSellPrice}
                    name='sellPrice'
                    type="number"
                    inputProps={{ pattern: "[0-9]*" }}
                  />
                </Grid>
              </Grid>


            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 4 }}>
            <Button variant="contained" onClick={() => {
              handleClose
              debouncedSubmit()
              ProductAllListData()

            }}>Save</Button>

          </Grid>
        </Card >

      </Dialog >
      <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default Index
