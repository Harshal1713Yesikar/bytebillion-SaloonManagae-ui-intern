import React from 'react'
import { Box, Card, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { Grid, TextField, InputAdornment } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import AddProduct from 'src/views/forms/quickSaleFormTable/addProducts'
import AddService from 'src/views/forms/quickSaleFormTable/addServices'
import AddMemberShip from 'src/views/forms/quickSaleFormTable/addMemberShip'
import AddPackage from 'src/views/forms/quickSaleFormTable/addpackage'

// import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useRouter } from 'next/router'

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
]

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showService, setShowService] = useState<any[]>([]);
  const [showProduct, setShowProduct] = useState<any[]>([]);
  const [showMemberShip, setShowMemberShip] = useState<any[]>([]);
  const [showPackage, setShowPackage] = useState<any[]>([]);


  const handleChanges = (event: any) => {
    setSearchTerm(event.target.value)
  }
  const [percentage, setPercentage] = useState('')

  const handleChanged = (event: any) => {
    setPercentage(event.target.value)
  }


  const [age, setAge] = useState<string>(''); // Assuming age is of type string

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };


  const handleAddService = () => {
    setShowService((prevService) => [...prevService, true]);
  };

  const handleRemoveService = (index: number) => {
    setShowService((prevService) => {
      const updatedService = [...prevService];
      updatedService.splice(index, 1);

      return updatedService;
    });
  };

  const handleAddProduct = () => {
    setShowProduct((prevProduct) => [...prevProduct, true]);
  };

  const handleRemoveProduct = (index: number) => {
    setShowProduct((prevProduct) => {
      const updatedProduct = [...prevProduct];
      updatedProduct.splice(index, 1);

      return updatedProduct;
    });
  };

  const handleAddMemberShip = () => {
    setShowMemberShip((prevMemberShip) => [...prevMemberShip, true]);
  };

  const handleRemoveMemberShip = (index: number) => {
    setShowMemberShip((prevMemberShip) => {
      const updateMemberShip = [...prevMemberShip];
      updateMemberShip.splice(index, 1);

      return updateMemberShip;
    });
  };

  const handlePackage = () => {
    setShowPackage((prevPackage) => [...prevPackage, true]);
  };

  const handleRemovePackage = (index: number) => {
    setShowPackage((prevPackage) => {
      const updatePackage = [...prevPackage];
      updatePackage.splice(index, 1);

      return updatePackage;
    });
  };

  const handleResetClick = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to reset?");

    // If the user confirms, refresh the page
    if (isConfirmed) {
      window.location.reload();
    }
  };
  const router = useRouter();
  const handleBack = () => {
    router.push('./home');
  }


  return (
    <>
      <Grid>
        <Card style={{ padding: "20px" }}>
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: "30px" }}>Create Invoice</Typography>
            <Button style={{ marginBottom: "10px" }} variant="outlined" onClick={handleBack}>Back</Button>
          </Grid>
          <Container style={{ border: '2px solid lightGray', borderRadius: '10px' }}>
            <TextField
              id='search'
              type='search'
              label='Search'
              value={searchTerm}
              onChange={handleChanges}
              sx={{ width: 600, padding: '10px', paddingLeft: '0' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={null}
                onChange={(date: Date | null) => console.log(date)}
                sx={{ padding: '10px', marginLeft: '270px', paddingRight: '0' }}
                renderInput={(startProps: any, endProps: any) => (
                  <>
                    <TextField {...startProps} variant='standard' helperText='' placeholder='Batch Start Date' />
                    <TextField {...endProps} variant='standard' helperText='' placeholder='Batch End Date' />
                  </>
                )}
                inputFormat='dd/MM/yyyy'
                autoComplete='off'
                required
                startText='Batch Start Date'
                endText='Batch End Date'

              // Other props as needed
              />
            </LocalizationProvider>
          </Container>
          <div style={{ margin: '5px' }}>
            <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddService}>
              Add Services
            </Button>
            <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddProduct} >
              Add Product
            </Button>
            <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddMemberShip} >
              Add Membership
            </Button>
            <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handlePackage}>
              Add Package
            </Button>
            <Button variant='contained' sx={{ marginRight: '10px' }}>
              Gift Card
            </Button>
          </div>
          {showService.map((index) => (
            <AddService key={index} index={index} onRemove={() => handleRemoveService(showService.length - 1)} />
          ))}

          {showProduct.map((index) => (
            <AddProduct key={index} index={index} onRemove={() => handleRemoveProduct(showProduct.length - 1)} />
          ))}

          {showMemberShip.map((index) => (
            <AddMemberShip key={index} index={index} onRemove={() => handleRemoveMemberShip(showMemberShip.length - 1)} />
          ))}

          {showPackage.map((index) => (
            <AddPackage key={index} index={index} onRemove={() => handleRemovePackage(showPackage.length - 1)} />
          ))}


          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Grid style={{ marginLeft: "1px" }}>
              <Typography>Reward Points</Typography>
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="demo-select-small-label">Select Reward Points</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="points"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ marginLeft: '10px' }}>
              <Typography>Ex Charges</Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                />
              </Box>
            </Grid>
            <Grid style={{ marginLeft: '10px' }}>
              <Typography>Disc</Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label=""
                  id="outlined-size-small"
                  size="small"
                />
              </Box>
            </Grid>
            <Grid style={{ marginLeft: '10px' }}>
              <Typography>Disc Points</Typography>
              <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="demo-select-small-label">Percentage (%)</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={percentage}
                  label="Age"
                  onChange={handleChanged}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ marginLeft: '10px' }}>
              <Typography>GST %</Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  placeholder='0'
                  id="outlined-size-small"
                  size="small"
                />
              </Box>
            </Grid>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
              <FormControl style={{ marginTop: '5px', width: '100%' }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Payment</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
                  <FormControlLabel value="Check" control={<Radio />} label="Check" />
                  <FormControlLabel value="Card" control={<Radio />} label="Card" />
                </RadioGroup>
              </FormControl>
              <Grid >
                <Typography>Adjust Payment</Typography>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label=""
                    id="outlined-size-small"
                    size="small"
                    placeholder='0.00'
                  />
                </Box>
              </Grid>
            </div>

            <TableContainer component={Paper} >
              <Table aria-label='simple table' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '10px' }} >
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.calories}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Grid style={{ display: "flex" }} >
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '15ch' }, marginRight: "10px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Coupon Code"
                id="outlined-size-small"
                size="small"
              />
            </Box>
            <Button variant="contained" disableElevation>
              Apply
            </Button>
          </Grid>
          <Grid >
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                marginTop: "20px"
              }}
            >
              <TextField fullWidth id="fullWidth" placeholder='Enter Notes' />
            </Box>
          </Grid>
        </Card>
      </Grid>
      <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button style={{ margin: "10px" }} variant="contained" onClick={handleResetClick}>Reset</Button>
        <Button style={{ margin: "10px" }} variant="contained">Generate Bill</Button>
      </Grid>
    </>
  )
}
export default Index
