import { Box, Button, Card, Dialog, FormControl, Grid, InputLabel, Menu, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import Select from '@mui/material/Select'
import { MouseEvent } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ProductTableFront from 'src/views/table/productTable/productTableFront';
import AddProductPop from 'src/views/pages/Product/addProduct/addProductPop'
import { useRouter } from 'next/router';


const Index = () => {
  // ** State
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleCheckboxChange = (checkboxId: string) => {
    setSelectedCheckbox(checkboxId === selectedCheckbox ? null : checkboxId);
  };

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleButtonClick = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };



  const [anchorAl, setAnchorAl] = useState<null | HTMLElement>(null)

  const handleReturn = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorAl(event.currentTarget)
  }

  const handleCloseReturn = () => {
    setAnchorAl(null)
  }

  const [productBl, setProductBl] = useState<null | HTMLElement>(null)

  const handleProduct = (event: MouseEvent<HTMLButtonElement>) => {
    setProductBl(event.currentTarget)
  }

  const handleCloseProduct = () => {
    setProductBl(null)
  }

  const [anchorCl, setAnchorCl] = useState<null | HTMLElement>(null)

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorCl(event.currentTarget)
  }

  const handleCloseEdit = () => {
    setAnchorCl(null)
  }

  const [anchorDl, setAnchorDl] = useState<null | HTMLElement>(null)

  const handleAssign = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorDl(event.currentTarget)
  }

  const handleCloseAssign = () => {
    setAnchorDl(null)
  }

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
        <ProductTableFront />
        <Grid style={{ display: 'flex', justifyContent: 'center', gap: "20px", padding: "20px" }}>
          <Button variant='outlined' >
            Previous
          </Button>
          <Button variant='contained' >
            Next
          </Button>
        </Grid>
      </Card>
    </>
  )
}

export default Index
