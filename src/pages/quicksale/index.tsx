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
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

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

  const handleChanges = (event:any) => {
    setSearchTerm(event.target.value)
  }
  const [searchsTerm, setSearchsTerm] = useState('')

  const handleChanged = (event:any) => {
    setSearchsTerm(event.target.value)
  }


  const [age, setAge] = useState<string>(''); // Assuming age is of type string

  const handleChange = (event:any) => {
    setAge(event.target.value as string);
  };

  return (
    <>
    <Grid>
      <Card style={{padding:"20px"}}>
        <Grid style={{display:'flex',justifyContent:'space-between'}}>
        <Typography style={{fontSize:"30px"}}>Create Invoice</Typography>
        <Button  variant="outlined">Outlined</Button>
        </Grid>
      <Container style={{ border: '2px solid gray', borderRadius: '10px' }}>
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
        <Button variant='contained' sx={{ background: 'black', marginRight: '10px' }}>
          Add Services
        </Button>
        <Button variant='contained' sx={{ background: 'black', marginRight: '10px' }}>
          Add Product
        </Button>
        <Button variant='contained' sx={{ background: 'black', marginRight: '10px' }}>
          Add Membership
        </Button>
        <Button variant='contained' sx={{ background: 'black', marginRight: '10px' }}>
          Add Package
        </Button>
        <Button variant='contained' sx={{ background: 'black', marginRight: '10px' }}>
          Gift Card
        </Button>
      </div>

<div style={{display:'flex',marginTop:'20px'}}>
      <Grid style={{marginLeft:"1px"}}>
      <Typography>Reward Points</Typography>
      <FormControl sx={{  minWidth: 200 }} size="small">
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
    <Grid style={{ marginLeft:'10px'}}>
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
    <Grid style={{ marginLeft:'10px'}}>
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
      <Grid style={{marginLeft:'10px'}}>
      <Typography>Disc Points</Typography>
      <FormControl sx={{  minWidth: 160 }} size="small">
      <InputLabel id="demo-select-small-label">Percentage (%)</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={searchsTerm}
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
    <Grid style={{ marginLeft:'10px'}}>
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
      <div style={{display:"flex"}}>
      <div style={{display:'flex',flexDirection:"column",width:"100%"}}>
      <FormControl style={{marginTop:'5px',width:'100%'}}>
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
      <Table  aria-label='simple table'style={{display:'flex',flexDirection:'column',alignItems:'flex-end',marginTop:'10px'}} >
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
    <Grid style={{display:"flex"}} >
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '15ch' },marginRight:"10px"
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
        marginTop:"20px"
      }}
    >
      <TextField fullWidth  id="fullWidth" placeholder='Enter Notes' />
    </Box>
      </Grid>
    </Card>
      </Grid>
      <Grid style={{display:"flex", justifyContent:"flex-end"}}>
      <Button style={{margin:"10px"}} variant="contained">Reset</Button>
      <Button style={{margin:"10px"}} variant="contained">Generate Bill</Button>
    </Grid>
    </>
  )
}
export default Index
