import { Box, Button, Card, CardHeader, Dialog, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import { MouseEvent } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddProductPop from 'src/views/pages/Product/addProduct/addProductPop'
import { useRouter } from 'next/router';
import Normaltable from 'src/views/table/productTable/Normaltable';
import QuickSearchToolbar from 'src/views/table/TableFilter';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { rows } from 'src/@fake-db/table/static-data';
import EditIcon from '@mui/icons-material/Edit';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types'
import { ListAllProductListApi } from 'src/store/APIs/Api';

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// ** renders client column
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
  // ** State
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
  const [selectedRowId, setSelectedRowId] = useState(null);


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
  const handleOpenDialogUpdate = () => {
    setDialogOpenUpdate(true);
  };

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
    vendor.push('../service/service');
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
      flex: 0.2,
      minWidth: 140,
      field: 'empty',
      headerName: 'empty',
      renderCell: (params: GridRenderCellParams) => (
        <CustomChip rounded size='small' skin='light' color="primary" label="Current" />
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'edit',
      headerName: 'Edit',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label="edit" onClick={handleOpenDialogUpdate}>
          <EditIcon />
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
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response: any = await ListAllProductListApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
        setProductList(response?.data?.data)
        console.log('aaa', response.data.data)
      } catch (err) {
        return err
      }
    }
    fatchData()
  }, [])



  return (
    <>
      <Card sx={{ paddingTop: '40px' }}>
        <Box >
          <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField size='small' id='outlined-basic' label='Search' sx={{ width: '400px' }} />
            <FormControl sx={{ width: '400px', ml: 2 }} size='small'>
              <InputLabel id='demo-simple-select-outlined-label'>Select Products</InputLabel>
              <Select
                label='Select Products'
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
              >
                <MenuItem value=''>
                  <em>Select Products</em>
                </MenuItem>
                <MenuItem value={10}>Products for sale (Retail)</MenuItem>
                <MenuItem value={20}>Products for Business use (In House)</MenuItem>
              </Select>
            </FormControl>
            <Button sx={{ ml: 2 }} variant='contained'>
              Search
            </Button>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center', margin: "20px", alignItems: 'center' }} >
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
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            {showAdvancedFilters && (
              <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }} >
                <FormControl sx={{ width: '300px', ml: 2 }} size='small'>
                  <InputLabel id='demo-simple-select-outlined-label'>Select Brand</InputLabel>
                  <Select
                    label='Select Brand'
                    id='demo-simple-select-outlined'
                    labelId='demo-simple-select-outlined-label'
                  >
                    <MenuItem value=''>
                      <em>Select Brand</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '300px', ml: 2 }} size='small'>
                  <InputLabel id='demo-simple-select-outlined-label'>Select Product Type</InputLabel>
                  <Select
                    label='Select Product Type'
                    id='demo-simple-select-outlined'
                    labelId='demo-simple-select-outlined-label'
                  >
                    <MenuItem value=''>
                      <em>Select Product Type</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '300px', ml: 2 }} size='small'>
                  <InputLabel id='demo-simple-select-outlined-label'>Select Vendor</InputLabel>
                  <Select
                    label='Select Vendor'
                    id='demo-simple-select-outlined'
                    labelId='demo-simple-select-outlined-label'
                  >
                    <MenuItem value=''>
                      <em>Select Vendor</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box >
      </Card>
      <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: '10px' }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }} >
          <Button sx={{ mr: 2 }} variant='contained' onClick={handleOpenDialog}>
            Add Product
          </Button>
          <Button sx={{ mr: 2, width: '180px' }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleReturn} endIcon={<ArrowDropDownIcon />} >
            Return Order
          </Button>
          <Grid>
            <Menu keepMounted id='simple-menu' anchorEl={anchorAl} onClose={handleCloseReturn} open={Boolean(anchorAl)}>
              <MenuItem onClick={handleInventory}>Inventory Return</MenuItem>
              <MenuItem onClick={handleReturnOrder}>Return Order</MenuItem>
            </Menu>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "10px" }} >
          <Button sx={{ mr: 2, width: '190px' }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleProduct} endIcon={<ArrowDropDownIcon />}>
            Product Order
          </Button>
          <Grid >
            <Menu keepMounted id='simple-menu' anchorEl={productBl} onClose={handleCloseProduct} open={Boolean(productBl)} sx={{}}>
              <MenuItem onClick={handleProductOrder}>Create New</MenuItem>
              <MenuItem onClick={handleCloseProduct}>View Orders</MenuItem>
            </Menu>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }} >
          <Button sx={{ mr: 2, width: '80px' }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleAssign} endIcon={<ArrowDropDownIcon />}>
            Edit
          </Button>
          <Grid>
            <Menu keepMounted id='simple-menu' anchorEl={anchorDl} onClose={handleCloseAssign} open={Boolean(anchorDl)}>
              <MenuItem onClick={handlevendor}>Vendors List</MenuItem>
              <MenuItem onClick={handleCloseAssign}>Brand View</MenuItem>
              <MenuItem onClick={handleCloseEdit}>Product Types</MenuItem>
              <MenuItem onClick={handleCloseEdit}>Print Barcode/label</MenuItem>
              <MenuItem onClick={handleCloseEdit}>Sample File</MenuItem>
              <MenuItem onClick={handleCloseEdit}>Import Products</MenuItem>
            </Menu>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "10px" }} >
          <Button sx={{ width: '205px', m: 0 }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleEdit} endIcon={<ArrowDropDownIcon />}>
            Assign Products
          </Button>
          <Grid>
            <Menu keepMounted id='simple-menu' anchorEl={anchorCl} onClose={handleCloseEdit} open={Boolean(anchorCl)}>
              <MenuItem onClick={handleCloseEdit}>Retail Products New</MenuItem>
              <MenuItem onClick={handleCloseEdit}>In-House Products</MenuItem>
            </Menu>
          </Grid>
        </Box>
      </Grid>
      <Dialog maxWidth="md" sx={{ overflow: 'auto' }} open={isDialogOpen} onClose={handleCloseDialog}>
        < AddProductPop />
      </Dialog >
      <Card>
        <Card>
          <CardHeader title='Quick Filter' />
          <DataGrid
            autoHeight
            columns={columns}
            pageSize={pageSize}
            // rows={filteredData.length ? filteredData : data}
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
        <Grid style={{ display: 'flex', justifyContent: 'center', gap: "20px", padding: "20px" }}>
          <Button variant='outlined' >
            Previous
          </Button>
          <Button variant='contained' >
            Next
          </Button>
        </Grid>
      </Card>
      <Dialog maxWidth="md" sx={{ overflow: 'auto' }} open={isDialogOpenUpdate} onClose={handleCloseDialogUpdate}>
        < Normaltable />
      </Dialog >
    </>
  )
}

export default Index
