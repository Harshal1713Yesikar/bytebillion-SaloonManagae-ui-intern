import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Search" id="fullWidth" />
      </Grid>

      <Grid item xs={12} md={3}>
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
      </Grid>

      <Grid item xs={12} md={3}>
        <Button variant="contained" disableElevation sx={{ height: 50, backgroundColor: 'black' }}>
          Search
        </Button>
      </Grid>

      <Grid item xs={12} md={12}>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Zero quantity product only" />
          <FormControlLabel required control={<Checkbox />} label="Low quantity product only" />
          <FormControlLabel required control={<Checkbox />} label="In stock product only" />
        </FormGroup>
      </Grid>



      <Grid item xs={12} md={3}>
        <Button size='small' variant="contained" disableElevation sx={{ height: 40, backgroundColor: 'black' }}>
          Advanced Filters
        </Button>
      </Grid>
      <hr/>

      {/* Add product button */}
      <Grid item xs={12} md={1}>
        <Button size='small' variant="contained" disableElevation sx={{ height: 40, backgroundColor: 'black',margin:"5px" }}>
          Add product
        </Button>
      </Grid>

      {/* Four dropdown buttons for advanced filters */}
      {[1, 2, 3, 4].map((index) => (
        <Grid key={index} item xs={12} md={1} style={{margin:"5px"}}>
          <FormControl sx={{width:"100px",padding:0}} size='small'>
            <InputLabel  id={`filter${index}-label`}>{`Filter ${index}`}</InputLabel>
            <Select
              labelId={`filter${index}-label`}
              id={`filter${index}`}
              value={age}
              onChange={handleChange}
            >
              {/* Add options for each filter */}
            </Select>
          </FormControl>
        </Grid>
      ))}

      <Grid item xs={12} md={12}>
        <EnhancedTable />
      </Grid>
    </Grid>
  );
};

export default Index;
