import { Box, Button, Card, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close';
import { ListAllProductListApi, ProductCreateRegistrationApi } from 'src/store/APIs/Api';
import { debounce } from 'lodash'
import * as yup from 'yup';
import toast from 'react-hot-toast';

const validationSchema = yup.object().shape({
  productName: yup.string().matches(/^[A-Z a-z]+$/).required('Product Name is required'),
  Barcode: yup.string().required('Barcode is required'),
  costPrice: yup.string().matches(/^[0-9]+$/, 'Cost Price must be a number').required('Cost Price is required'),
  fullPrice: yup.string().matches(/^[0-9]+$/, 'Full Price must be a number').required('Full Price is required'),
  sellPrice: yup.string().matches(/^[0-9]+$/, 'Sell Price must be a number').required('Sell Price is required'),
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


  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0]);
  };


  const getProductListData = async () => {
    try {
      const response: any = await ListAllProductListApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
      console.log('aaa', response.data.data)
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    getProductListData()
  }, [])


  const [productName, setProductName] = useState('');
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
    setDefaultProductValues({ ...defaultProductValues, [e.target.name]: e.target.value });
    // Clear the error message for the corresponding field
    switch (e.target.name) {
      case 'productName':
        setErrorName('');
        break;
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
      case 'productDescription':
        setErrorDescription('');
        break;
      case 'inStockQuantity':
        setInStockError('');
        break;
      case 'quantityAlert':
        setQuantityAlertError('');
        break;
      case 'productUsage':
        setErrorpro('');
        break;
      case 'Brand':
        setErrorBrand('');
        break;
      case 'productType':
        setProductTypeError('');
        break;
      case 'vendor':
        setVendorError('');
        break;
      default:
        break;
    }
  }



  const handleSubmit = async () => {
    try {
      await validationSchema.validate(defaultProductValues, { abortEarly: false });
      console.log("defaultProductValues", defaultProductValues)
      await ProductCreateRegistrationApi(defaultProductValues)
      await getProductListData()
      toast.success('Product Created successfully', {
        position: 'bottom-right'
      })
      setIsOpen(false);
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
          case 'productDescription':
            setErrorDescription(err.message);
            break;
          case 'inStockQuantity':
            setInStockError(err.message);
            break;
          case 'quantityAlert':
            setQuantityAlertError(err.message);
            break;
          case 'productUsage':
            setErrorpro(err.message);
            break;
          case 'Brand':
            setErrorBrand(err.message);
            break;
          case 'productType':
            setProductTypeError(err.message);
            break;
          case 'vendor':
            setVendorError(err.message);
            break;
          default:
            break;
        }
      });
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const debouncedSubmit = debounce(() => {
    handleSubmit()

  }, 1000)

  return (
    <>
      {isOpen &&
        <Card sx={{ width: '100%', height: '100%', overflow: 'auto' }} >
          <Grid sx={{ borderBottom: '2px solid lightGray' }}>
            <Grid sx={{ p: 3 }}>
              <Grid sx={{ display: 'flex' }}>
                <Box sx={{ m: 2, cursor: 'pointer' }} onClick={handleClose} ><CloseIcon /></Box>
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
                    type="number" // Specify input type as number
                    inputProps={{ pattern: "[0-9]*" }} // Restrict input to numeric values only
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
                    type="number" // Specify input type as number
                    inputProps={{ pattern: "[0-9]*" }} // Restrict input to numeric values only
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
                    type="number" // Specify input type as number
                    inputProps={{ pattern: "[0-9]*" }} // Restrict input to numeric values only
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


