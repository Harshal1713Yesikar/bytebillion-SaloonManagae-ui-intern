import { Box, Button, Card, FormControl, Grid, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close';

const AddProductPop = () => {
  const [Brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [vendor, setVendor] = useState('');
  const [retail, setRetail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleBrand = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
  };

  const handleProductType = (event: SelectChangeEvent) => {
    setProductType(event.target.value);
  };

  const handleVendor = (event: SelectChangeEvent) => {
    setVendor(event.target.value);
  };

  const handleRetail = (event: SelectChangeEvent) => {
    setRetail(event.target.value);
  };

  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0]);
  };

  const handleCloseClick = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && (
        <Card sx={{ width: '100%', height: '100%', p: 3 }}>
          <Grid sx={{ display: 'flex' }}>
            <Box sx={{ m: 2 }} onClick={handleCloseClick}><CloseIcon /></Box>
            <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Add Product</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex' }} >
            <TextField sx={{ width: '25ch', m: 1 }} id='outlined-basic' label='Product  Name' size='small' />
            <TextField sx={{ width: '25ch', m: 1 }} fullWidth id='outlined-basic' label='Barcode' size='small' />
          </Grid>
          <Grid item sx={{ display: 'flex', width: '100%', maxWidth: '100%' }} xs={12}>
            <Grid>
              <TextField
                size='small'
                placeholder="Cost Price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                }}
              />
            </Grid>
            <Grid>
              <TextField
                size='small'
                placeholder='Full Price'
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                }}
              />
            </Grid>
            <Grid>
              <TextField
                size='small'
                placeholder="Sell Price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
          <Box>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={3}
              sx={{ width: '77ch', m: 1 }}
            />
          </Box>

          <Grid sx={{ display: 'flex', m: 1 }}>
            <FormControl sx={{ mr: 2, width: '25ch' }} size="small">
              <InputLabel id="demo-select-small-label">Select Brand</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                size='small'
                value={Brand}
                label="Select Brand"
                onChange={handleBrand}
              >
                <MenuItem value="">
                  <em>Select Brand</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 2, width: '25ch' }} size="small">
              <InputLabel id="demo-select-small-label">Select Product Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                size='small'
                value={productType}
                label="Select Product Type"
                onChange={handleProductType}
              >
                <MenuItem value="">
                  <em>Select Product Type</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 2, width: '25ch' }} size="small">
              <InputLabel id="demo-select-small-label">Select Vendor</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                size='small'
                value={vendor}
                label="Select Vendor"
                onChange={handleVendor}
              >
                <MenuItem value="">
                  <em>Select Product Type</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ m: 1, width: '25ch' }}>
            <TextField
              type="file"
              value={selectedFile}
              onChange={handleFileChange}
              inputProps={{ accept: '.csv, .xlsx' }} // Specify allowed file types
            />
          </Grid>
          <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Stock Control</Typography>
          <Typography sx={{ backgroundColor: 'rgb(238, 238, 238)', m: 1, p: 1 }}>List the available in stock quantities for the products. Also set a minimum quantity level <br /> and get alerts when the stock is less.</Typography>
          <Grid>
            <TextField
              size='small'
              placeholder="In Stock Quantity"
              id='outlined-basic'
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              size='small'
              placeholder="Quantity Alert"
              id='outlined-basic'
              sx={{ m: 1, width: '25ch' }}
            />
          </Grid>
          <Grid>
            <FormControl sx={{ m: 1, width: '25ch' }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                size='small'
                value={retail}
                onChange={handleRetail}
                placeholder='Retail'
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={10}>Retail</MenuItem>
                <MenuItem value={20}>In House</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size='small'
              placeholder="Product Usage"
              id='outlined-basic'
              sx={{ m: 1, width: '25ch' }}
            />
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
            <Button variant='contained'>Save</Button>
          </Grid>
        </Card >
      )}
    </>
  )
}

export default AddProductPop
