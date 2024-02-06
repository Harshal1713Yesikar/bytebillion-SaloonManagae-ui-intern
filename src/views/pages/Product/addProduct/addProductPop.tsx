import { Box, Button, Card, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close';

const AddProductPop = () => {
  const [Brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [vendor, setVendor] = useState('');
  const [retail, setRetail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);



  const handleRetail = (event: SelectChangeEvent) => {
    setRetail(event.target.value);
  };

  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    setIsOpen(false);

    // Additional logic or cleanup can be added here
  };

  const [productName, setProductName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [errorBarcode, setErrorBarcode] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [errorCostPrice, setErrorCostPrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [errorFullPrice, setErrorFullPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [errorSellPrice, setErrorSellPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [inStockQuantity, setInStockQuantity] = useState('');
  const [inStockError, setInStockError] = useState('');
  const [quantityAlert, setQuantityAlert] = useState('');
  const [quantityAlertError, setQuantityAlertError] = useState('');
  const [productUsage, setProductUsage] = useState('');
  const [errorpro, setErrorpro] = useState('');


  const handleChange = (event: any) => {
    const inputValue = event.target.value.trim();
    const wordCount = inputValue.split(/\s+/).length;
    if (inputValue === '') {
      setErrorName('Name cannot be empty');
    } else if (wordCount > 5) {
      setErrorName('Name should contain maximum 5 words');
    } else {
      setErrorName('');
    }
    setProductName(inputValue);
  };

  const handleBarcode = (event: any) => {
    const inputText = event.target.value;
    if (inputText.length > 13) {
      setBarcode(inputText.substring(0, 13)); // Truncate input to 13 characters
      setErrorBarcode('Exceeded maximum word limit of 13');
    } else {
      setBarcode(inputText);
      setErrorBarcode('');
    }
  };

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;

    // Check if input is empty
    if (!inputValue.trim()) {
      setErrorCostPrice('Field is required');
    } else if (!/^\d+$/.test(inputValue)) { // Check if input contains only digits
      setErrorCostPrice('Only numbers are allowed');
    } else {
      setErrorCostPrice('');
    }

    setCostPrice(inputValue);
  };

  const handleInputChangefull = (event: any) => {
    const inputValue = event.target.value;

    if (!inputValue.trim()) {
      setErrorFullPrice('Field is required');
    } else if (!/^\d+$/.test(inputValue)) {
      setErrorFullPrice('Only numbers are allowed');
    } else {
      setErrorFullPrice('');
    }

    setFullPrice(inputValue);
  };

  const handleInputChangesell = (event: any) => {
    const inputValue = event.target.value;

    if (!inputValue.trim()) {
      setErrorSellPrice('Field is required');
    } else if (!/^\d+$/.test(inputValue)) {
      setErrorSellPrice('Only numbers are allowed');
    } else {
      setErrorSellPrice('');
    }

    setSellPrice(inputValue);
  };


  const handleDescriptionChange = (event: any) => {
    const inputText = event.target.value;
    setDescription(inputText);
    if (inputText.trim() === '') {
      setErrorDescription('Description cannot be empty');
    } else {
      setErrorDescription('');
    }
  };

  const handleInStockChange = (event: any) => {
    const inputText = event.target.value;
    setInStockQuantity(inputText);
    if (inputText.trim() === '') {
      setInStockError('In Stock Quantity cannot be empty');
    } else {
      setInStockError('');
    }
  };

  const handleQuantityAlertChange = (event: any) => {
    const inputText = event.target.value;
    setQuantityAlert(inputText);
    if (inputText.trim() === '') {
      setQuantityAlertError('Quantity Alert cannot be empty');
    } else {
      setQuantityAlertError('');
    }
  };

  const handleChangeprod = (event: any) => {
    const inputText = event.target.value;
    setProductUsage(inputText);
    if (inputText.trim() === '') {
      setErrorpro('Product Usage cannot be empty');
    } else {
      setErrorpro('');
    }
  };


  const [errorBrand, setErrorBrand] = useState('');

  const handleBrands = (event: any) => {
    const selectedBrand = event.target.value;

    // Check if a brand is selected
    if (!selectedBrand) {
      setErrorBrand('Please select a brand');
    } else {
      setErrorBrand('');
    }

    setBrand(selectedBrand);
  };


  const [productTypeError, setProductTypeError] = useState('');
  const [vendorError, setVendorError] = useState('');

  const handleProductType = (event: any) => {
    const selectedProductType = event.target.value;

    if (!selectedProductType) {
      setProductTypeError('Please select a product type');
    } else {
      setProductTypeError('');
    }

    setProductType(selectedProductType);
  };

  const handleVendor = (event: any) => {
    const selectedVendor = event.target.value;

    if (!selectedVendor) {
      setVendorError('Please select a vendor');
    } else {
      setVendorError('');
    }

    setVendor(selectedVendor);
  };

  const handleSubmit = () => {
    let hasError = false;

    // Validate each field
    if (productName.trim() === '') {
      setErrorName('Name cannot be empty');
      hasError = true;
    }
    if (barcode.trim() === '') {
      setErrorBarcode('Barcode cannot be empty');
      hasError = true;
    }
    if (costPrice.trim() === '') {
      setErrorCostPrice('Cost Price cannot be empty');
      hasError = true;
    }
    if (fullPrice.trim() === '') {
      setErrorFullPrice('Full Price cannot be empty');
      hasError = true;
    }
    if (sellPrice.trim() === '') {
      setErrorSellPrice('Sell Price cannot be empty');
      hasError = true;
    }
    if (description.trim() === '') {
      setErrorDescription('Description cannot be empty');
      hasError = true;
    }
    if (inStockQuantity.trim() === '') {
      setInStockError('In Stock Quantity cannot be empty');
      hasError = true;
    }
    if (quantityAlert.trim() === '') {
      setQuantityAlertError('Quantity Alert cannot be empty');
      hasError = true;
    }
    if (productUsage.trim() === '') {
      setErrorpro('Product Usage cannot be empty');
      hasError = true;
    }

    if (!productType) {
      setProductTypeError('Please select a product type');
      return;
    }

    if (!vendor) {
      setVendorError('Please select a product type');
      return;
    }
    // If any field has error, return without saving
    if (hasError) {
      return;
    }

    // Proceed with saving logic...
    console.log('Form saved successfully');
  };

  return (
    <>
      {isOpen &&
        <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
          <Grid sx={{ borderBottom: '2px solid lightGray' }}>
            <Grid sx={{ p: 3 }}>
              <Grid sx={{ display: 'flex' }}>
                <Box sx={{ m: 2, cursor: 'pointer' }} onClick={() => { handleClose() }} ><CloseIcon /></Box>
                <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Add Product</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }} >
                <TextField
                  sx={{ width: '25ch', m: 1 }}
                  id='outlined-basic'
                  label='Product Name'
                  size='small'
                  value={productName}
                  onChange={handleChange}
                  error={!!errorName}
                  helperText={errorName}
                />

                <TextField
                  sx={{ width: '25ch', m: 1 }}
                  fullWidth
                  id='outlined-basic'
                  label='Barcode'
                  size='small'
                  variant='outlined'
                  value={barcode}
                  onChange={handleBarcode}
                  error={!!errorBarcode}
                  helperText={errorBarcode}
                />              </Grid>
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
                    value={costPrice}
                    onChange={handleInputChange}
                    error={!!errorCostPrice}
                    helperText={errorCostPrice}
                  />
                </Grid>
                <Grid>
                  <TextField
                    size='small'
                    placeholder="Full Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    value={fullPrice}
                    onChange={handleInputChangefull}
                    error={!!errorFullPrice}
                    helperText={errorFullPrice}
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
                    value={sellPrice}
                    onChange={handleInputChangesell}
                    error={!!errorSellPrice}
                    helperText={errorSellPrice}
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
                  value={description}
                  onChange={handleDescriptionChange}
                  error={!!errorDescription}
                  helperText={errorDescription}
                />
              </Box>

              <Grid sx={{ display: 'flex', m: 1 }}>
                <FormControl sx={{ mr: 2, width: '25ch' }} size="small" error={!!errorBrand}>
                  <InputLabel id="demo-select-small-label">Select Brand</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    size='small'
                    value={Brand}
                    label="Select Brand"
                    onChange={handleBrands}
                  >
                    <MenuItem value="">
                      <em>Select Brand</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ fontSize: '0.75rem' }}>{errorBrand}</FormHelperText>
                </FormControl>
                <FormControl sx={{ mr: 2, width: '25ch' }} size="small" error={!!productTypeError}>
                  <InputLabel id="demo-select-product-type-label">Select Product Type</InputLabel>
                  <Select
                    labelId="demo-select-product-type-label"
                    id="demo-select-product-type"
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
                  <FormHelperText style={{ fontSize: '0.75rem' }}>{productTypeError}</FormHelperText>
                </FormControl>

                <FormControl sx={{ mr: 2, width: '25ch' }} size="small" error={!!vendorError}>
                  <InputLabel id="demo-select-vendor-label">Select Vendor</InputLabel>
                  <Select
                    labelId="demo-select-vendor-label"
                    id="demo-select-vendor"
                    size='small'
                    value={vendor}
                    label="Select Vendor"
                    onChange={handleVendor}
                  >
                    <MenuItem value="">
                      <em>Select Vendor</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ fontSize: '0.75rem' }}>{vendorError}</FormHelperText>
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
                  value={inStockQuantity}
                  onChange={handleInStockChange}
                  error={!!inStockError}
                  helperText={inStockError}
                />
                <TextField
                  size='small'
                  placeholder="Quantity Alert"
                  id='outlined-basic'
                  sx={{ m: 1, width: '25ch' }}
                  value={quantityAlert}
                  onChange={handleQuantityAlertChange}
                  error={!!quantityAlertError}
                  helperText={quantityAlertError}
                />
              </Grid>
              <Grid sx={{ mb: 2 }}>
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
                  value={productUsage}
                  onChange={handleChangeprod}
                  error={!!errorpro}
                  helperText={errorpro}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 4 }}>
            <Button variant="contained" onClick={handleSubmit}>Save</Button>          </Grid>
        </Card >
      }
    </>
  )
}

export default AddProductPop
