import { Box, Button, Card, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ProductCreateRegistrationApi } from 'src/store/APIs/Api';
import { debounce } from 'lodash'
import * as yup from 'yup';



const validationSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  Barcode: yup.string().required('Barcode is required'),
  costPrice: yup.string().required('Cost Price is required'),
  fullPrice: yup.string().required('Full Price is required'),
  sellPrice: yup.string().required('Sell Price is required'),
  productDescription: yup.string().required('Product Description is required'),
  inStockQuantity: yup.string().required('In Stock Quantity is required'),
  quantityAlert: yup.string().required('Quantity Alert is required'),
  productUsage: yup.string().required('Product Usage is required'),
  Brand: yup.string().required('Brand is required'),
  productType: yup.string().required('Product Type is required'),
  vendor: yup.string().required('Vendor is required'),
});

const AddProductPop = () => {
  const [Brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [vendor, setVendor] = useState('');
  const [retail, setRetail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const [defaultProductValues, setDefaultProductValues] = useState<any>({
    customerId: '99f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'E7uqn',
    "productName": "",
    "Barcode": "",
    "costPrice": "",
    "fullPrice": "",
    "sellPrice": "",
    "productDescription": "",
    "brandId": "",
    "vendorName": [],
    "productCategoryId": "",
    "availableStock": {
      "retail": {
        "retailStock": ""
      },
      "inHouse": {
        "inHouseStock": ""
      }
    }
  })

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
  const [Barcode, setBarcode] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [productDescription, setDescription] = useState('');
  const [inStockQuantity, setInStockQuantity] = useState('');
  const [quantityAlert, setQuantityAlert] = useState('');
  const [productUsage, setProductUsage] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorBarcode, setErrorBarcode] = useState('');
  const [errorCostPrice, setErrorCostPrice] = useState('');
  const [errorFullPrice, setErrorFullPrice] = useState('');
  const [errorSellPrice, setErrorSellPrice] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [inStockError, setInStockError] = useState('');
  const [quantityAlertError, setQuantityAlertError] = useState('');
  const [errorpro, setErrorpro] = useState('');
  const [errorBrand, setErrorBrand] = useState('');
  const [productTypeError, setProductTypeError] = useState('');
  const [vendorError, setVendorError] = useState('');



  const handleCommon = (e: any) => {
    setDefaultProductValues({ ...defaultProductValues, [e.target.name]: e.target.value })
  }

  console.log(defaultProductValues, "defef")


  const handleSubmit = async () => {
    try {
      await validationSchema.validate(defaultProductValues, { abortEarly: false });
      console.log("defaultProductValues", defaultProductValues)
      ProductCreateRegistrationApi(defaultProductValues)
    } catch (error) {
      // Handle validation errors
      console.error("Validation Error:", error);
    }

  }



  const debouncedSubmit = debounce(() => {
    handleSubmit()

  }, 300)

  return (
    <>
      {isOpen &&
        <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
          <Grid sx={{ borderBottom: '2px solid lightGray' }}>
            <Grid sx={{ p: 3 }}>
              <Grid sx={{ display: 'flex' }}>
                <Box sx={{ m: 2, cursor: 'pointer' }} onClick={() => { setIsOpen(false) }} ><CloseIcon /></Box>
                <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Add Product</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }} >
                <TextField
                  sx={{ width: '25ch', m: 1 }}
                  id='outlined-basic'
                  label='Product Name'
                  size='small'
                  value={defaultProductValues.productName}
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
                  value={defaultProductValues.Barcode}
                  onChange={handleCommon}
                  error={!!errorBarcode}
                  helperText={errorBarcode}
                  name="Barcode"

                />              </Grid>
              <Grid item sx={{ display: 'flex', width: '100%', maxWidth: '100%' }} xs={12}>
                <Grid>
                  <TextField
                    size='small'
                    placeholder="Cost Price"
                    id='outlined-basic'
                    sx={{ m: 1, width: '25ch' }}
                    value={defaultProductValues.costPrice}
                    onChange={handleCommon}
                    error={!!errorCostPrice}
                    helperText={errorCostPrice}
                    name='costPrice'
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
                    value={defaultProductValues.fullPrice}
                    onChange={handleCommon}
                    error={!!errorFullPrice}
                    helperText={errorFullPrice}
                    name='fullPrice'
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
                    value={defaultProductValues.sellPrice}
                    onChange={handleCommon}
                    error={!!errorSellPrice}
                    helperText={errorSellPrice}
                    name='sellPrice'
                  />
                </Grid>
              </Grid>
              <Box>
                <TextField
                  id="outlined-multiline-static"
                  label="productDescription"
                  multiline
                  rows={3}
                  sx={{ width: '77ch', m: 1 }}
                  value={defaultProductValues.productDescription}
                  onChange={handleCommon}
                  error={!!errorDescription}
                  helperText={errorDescription}
                  name='productDescription'
                />
              </Box>

              <Grid sx={{ display: 'flex', m: 1 }}>
                <FormControl sx={{ mr: 2, width: '25ch' }} size="small" error={!!errorBrand}>
                  <InputLabel id="demo-select-small-label">Select Brand</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    size='small'
                    value={defaultProductValues.Brand}
                    label="Select Brand"
                    onChange={handleCommon}
                    name='Brand'
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
                    value={defaultProductValues.productType}
                    label="Select Product Type"
                    onChange={handleCommon}
                    name='productType'
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
                    value={defaultProductValues.vendor}
                    label="Select Vendor"
                    onChange={handleCommon}
                    name='vendor'
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
                  value={defaultProductValues.selectedFile}
                  onChange={handleFileChange}
                  inputProps={{ accept: '.csv, .xlsx' }} // Specify allowed file types
                  name='selectedFile'
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
                  value={defaultProductValues.inStockQuantity}
                  onChange={handleCommon}
                  error={!!inStockError}
                  helperText={inStockError}
                  name='inStockQuantity'
                />
                <TextField
                  size='small'
                  placeholder="Quantity Alert"
                  id='outlined-basic'
                  sx={{ m: 1, width: '25ch' }}
                  value={defaultProductValues.quantityAlert}
                  onChange={handleCommon}
                  error={!!quantityAlertError}
                  helperText={quantityAlertError}
                  name='quantityAlert'
                />
              </Grid>
              <Grid sx={{ mb: 2 }}>
                <TextField
                  size='small'
                  placeholder="Product Usage"
                  id='outlined-basic'
                  sx={{ m: 1, width: '25ch' }}
                  value={defaultProductValues.productUsage}
                  onChange={handleCommon}
                  error={!!errorpro}
                  helperText={errorpro}
                  name='productUsage'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 4 }}>
            <Button variant="contained" onClick={debouncedSubmit}>Save</Button>
          </Grid>
        </Card >
      }
    </>
  )
}

export default AddProductPop
