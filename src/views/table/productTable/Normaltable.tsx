import { Box, Button, Card, Grid, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { updateProductApi } from 'src/store/APIs/Api';
import { debounce } from 'lodash'
import * as yup from 'yup';



const validationSchema = yup.object().shape({
  productName: yup.string().matches(/^[A-Z a-z]+$/).required('Product Name is required'),
  Barcode: yup.string().required('Barcode is required'),
  costPrice: yup.string().matches(/^[0-9]+$/, 'Cost Price must be a number').required('Cost Price is required'),
  fullPrice: yup.string().matches(/^[0-9]+$/, 'Full Price must be a number').required('Full Price is required'),
  sellPrice: yup.string().matches(/^[0-9]+$/, 'Sell Price must be a number').required('Sell Price is required'),
});



const Normaltable = () => {
  const [Brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [vendor, setVendor] = useState('');
  const [retail, setRetail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const [defaultProductValues, setDefaultProductValues] = useState<any>({
    "customerId": "099f9bf2-8ac2-4f84-8286-83bb46595fde",
    "salonId": "NRImf",
    "productId": "",
    "stockId": "",
    "brandId": "",
    "productName": "",
    "productStatus": "",
    "Barcode": "",
    "costPrice": "",
    "fullPrice": "",
    "sellPrice": "",
    "productDescription": "",
    "vendorName": [],
    "availableStock": {
      "retailStock": ""
    }
  })

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

      default:
        break;
    }
  }



  const handleSubmit = async () => {
    try {
      await validationSchema.validate(defaultProductValues, { abortEarly: false });
      console.log("defaultProductValues", defaultProductValues)
      await updateProductApi(defaultProductValues);
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
                <Box sx={{ m: 2, cursor: 'pointer' }} onClick={handleClose}  ><CloseIcon /></Box>
                <Typography sx={{ fontSize: '22px', letterSpacing: '0.02em', m: 1, fontWeight: '600' }}>Update Product</Typography>
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

export default Normaltable


