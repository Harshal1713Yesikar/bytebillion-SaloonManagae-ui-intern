import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTable from './table';


const Index = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (

    <>
  <Box sx={{
    width: "100%",
    maxWidth: "100%",
    height: 150,
    border:2,
    margin:"2px",
    borderBlockColor:"lightGray",


    // backgroundColor:"blueviolet"

  }}>
  <Box sx={{display:"flex",justifyContent:"center"}}>
    <Box
    sx={{
      width: 400,
      maxWidth: '100%',
      padding:5

    }}
  >
    <TextField fullWidth label="Search" id="fullWidth" />
  </Box>

  <Box sx={{ minWidth: 400,width:"400px",padding:5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Products</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 200,width:"200px",padding:5 }}>
    <Button variant="contained" disableElevation sx={{height:50,backgroundColor:"black"}}>
      Search
    </Button>
    </Box>
    </Box>


    <Box sx={{display:"flex",justifyContent:"center"}}>

    <FormGroup sx={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Zero quantity product only" />
      <FormControlLabel required control={<Checkbox />} label="Low quantity product only" />
      <FormControlLabel required control={<Checkbox />} label="In stock product only" />
    </FormGroup>
    <Box sx={{ minWidth: 200,width:"200px" }}>
    <Button variant="contained" disableElevation sx={{height:40,backgroundColor:"black"}}>
      Advanced Filters
    </Button>
    </Box>
    </Box>
  </Box>

  <Box sx={{display:"flex",justifyContent:"right",padding:3}}>

  <Box sx={{ minWidth: 200,width:"200px",margin:3,padding:4 }}>
    <Button variant="contained" disableElevation sx={{height:30,backgroundColor:"black"}}>
      Add product
    </Button>
    </Box>

    <FormControl variant="standard" sx={{ m: 1, minWidth: 120,margin:3 }}>
        <InputLabel id="demo-simple-select-standard-label">Return Order</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120,margin:3 }}>
        <InputLabel id="demo-simple-select-standard-label">Product Order</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120,margin:3 }}>
        <InputLabel id="demo-simple-select-standard-label">Edit</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120,margin:3 }}>
        <InputLabel id="demo-simple-select-standard-label">Asign product</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  </Box>
  <EnhancedTable/>
  </>
  )
}

export default Index
