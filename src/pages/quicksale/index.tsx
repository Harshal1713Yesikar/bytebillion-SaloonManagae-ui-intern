import React, { use, useEffect } from 'react'
import { Box, Card, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { LocalizationProvider, DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { Grid, TextField, InputAdornment } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import AddProduct from 'src/views/forms/quickSaleFormTable/addProducts'
// import AddService from 'src/views/forms/quickSaleFormTable/addServices'
import AddDailyService from 'src/views/forms/quickSaleFormTable/addServices'
import AddMemberShip from 'src/views/forms/quickSaleFormTable/addMemberShip'
import AddPackage from 'src/views/forms/quickSaleFormTable/addpackage'
import AddIcon from '@mui/icons-material/Add';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { ListAllClientsApi } from 'src/store/APIs/Api'
import { useForm, Controller } from 'react-hook-form'
import { getSingleClient } from 'src/store/APIs/Api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import Container from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

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

interface CustomDatePickerProps extends DatePickerProps<Date> {
  renderInput: (startProps: any, endProps: any) => React.ReactElement;
}
interface FormInput {
  customerId: string
  salonId: string
  clientName: string
}
// interface FormInputs {
//   clientName: '',
// }
const AddStaffSchema = yup.object().shape({
  selectCategory: yup.string().required()
})



const Index = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showService, setShowService] = useState<any[]>([]);
  const [showProduct, setShowProduct] = useState<any[]>([]);
  const [showMemberShip, setShowMemberShip] = useState<any[]>([]);
  const [showPackage, setShowPackage] = useState<any[]>([]);
  const [clientList, setClientList] = useState([])
  const [clientData, setClientData] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'dqXUs',
    clientName: ''
  })
  const ClientSelected = async (organization: any) => {
    await getSingleClient('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs', organization.clientId).then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
      console.log(res, "ssss")
      // setClientList()
    })
  }
  const clientDataList = async () => {
    await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs').then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
      console.log(res.data.data, "ress")
      setClientList(res.data.data)
      // setClientList()
    })
  }
  useEffect(() => {
    clientDataList()
  }, [])

  // const data = async () => {
  //   try {
  //     const response: any = await ListAllClientsApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'dqXUs')
  //     setClientList(response?.data.data)
  //     console.log('formData', response?.data?.data)
  //   } catch (err) {
  //     console.log('ABC', err)
  //   }
  // }

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
    setShowService((prevService) => [[prevService, true]]);

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

  const renderInput = (startProps: any, endProps: any) => (
    <div>
      <TextField {...startProps} variant='standard' helperText='' placeholder='Batch Start Date' />
      <TextField {...endProps} variant='standard' helperText='' placeholder='Batch End Date' />
    </div>
  );


  const {
    reset: serviceReset,
    control,
    getValues: ServiceValues,
    handleSubmit: handleServiceSubmit,
    setValue,
    formState: { errors: ServiceErrors }
  } = useForm<FormInput>({
    defaultValues: clientData
  })

  const renderedClient = clientList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => ClientSelected(organization)} key={index} value={organization.clientId}>
        <Typography> {organization.clientName}</Typography>
      </MenuItem>
    )
  })


  return (

    <>

      <Grid>
        <Card style={{ padding: "20px" }}>
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: "30px" }}>Create Invoice</Typography>
            <Button style={{ marginBottom: "10px" }} variant="outlined" onClick={handleBack}>Back</Button>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
            <Grid item xs={12} sm={6} sx={{ margin: 1, display: 'flex', justifyContent: 'end', gap: 3 }}>
              <FormControl sx={{ width: "100%" }}  >
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(ServiceErrors.clientName)}
                  htmlFor='validation-basic-select'
                >
                  Select Client*
                </InputLabel>
                <Controller
                  name='clientName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Client'
                      onChange={onChange}
                      error={Boolean(ServiceErrors.clientName)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {renderedClient}
                    </Select>
                  )}
                />
                {ServiceErrors.clientName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    {ServiceErrors.clientName.message}
                  </FormHelperText>
                )}
              </FormControl>


            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={null}
                onChange={(date: Date | null) => console.log(date)}
                sx={{ padding: '10px', marginLeft: '270px', paddingRight: '0' }}
                renderInput={renderInput}
                inputFormat='dd/MM/yyyy'
                autoComplete='off'
                required
                startText='Batch Start Date'
                endText='Batch End Date'
                {...(Index as any)}
              // Other props as needed
              />
            </LocalizationProvider>
          </Grid>
        </Card>
        <div style={{ margin: '5px' }}>
          <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddService} startIcon={<AddIcon />}>
            Add Services
          </Button>
          <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddProduct} startIcon={<AddIcon />}>
            Add Product
          </Button>
          {/* <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handleAddMemberShip} startIcon={<AddIcon />}>
            Add Membership
          </Button>
          <Button variant='contained' sx={{ marginRight: '10px' }} onClick={handlePackage} startIcon={<AddIcon />}>
            Add Package
          </Button>
          <Button variant='contained' sx={{ marginRight: '10px' }} startIcon={<CardGiftcardIcon />}>
            Gift Card
          </Button> */}
        </div>
        {/* {showService.map((index) => (
          <AddDailyService key={index} index={index} onRemove={() => handleRemoveService(showService.length - 1)} />
        ))} */}
        {showService.map((value, index) => (
          <AddDailyService
            key={index}
            index={index}
            onRemove={() => handleRemoveService(showService.length - 1)}
          />
        ))}
        {showProduct.map((index) => (
          <AddProduct key={index} index={index} onRemove={() => handleRemoveProduct(showProduct.length - 1)} />
        ))}


        {/* {showMemberShip.map((index) => (
          <AddMemberShip key={index} index={index} onRemove={() => handleRemoveMemberShip(showMemberShip.length - 1)} />
        ))}

        {showPackage.map((index) => (
          <AddPackage key={index} index={index} onRemove={() => handleRemovePackage(showPackage.length - 1)} />
        ))} */}


        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Grid style={{ marginLeft: "1px" }}>
            <Typography>Reward Points</Typography>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">Select Reward Points</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Select Reward Points"
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



        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ margin: "10px" }} variant="contained" onClick={handleResetClick}>Reset</Button>
          <Button style={{ margin: "10px" }} variant="contained">Generate Bill</Button>
        </Grid>
      </Grid>
    </>
  )
}
export default Index
