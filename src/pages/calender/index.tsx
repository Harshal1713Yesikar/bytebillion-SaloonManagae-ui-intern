/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Checkbox, Grid, ListItemText, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const Index = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [service, setService] = useState<any>('')

  const handleService = (event: SelectChangeEvent) => {
    setService(event.target.value)
  }
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleStaff = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(

      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const [time, setTime] = useState('');


  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };


  const [perc, setPerc] = useState('');


  const handlePerc = (event: SelectChangeEvent) => {
    setPerc(event.target.value as string);
  };

  return (
    <>
      <Grid style={{ display: "flex" }}>
        <FormControl sx={{ m: 1, minWidth: 160 }} size='small'>
          <InputLabel id='demo-select-small-label'>Select Services</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={service}
            label='Select Services'
            onChange={handleService}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 150 }} size="small">
          <InputLabel id="demo-multiple-checkbox-label">Select Staff</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleStaff}

            input={<OutlinedInput label="Select Staff" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <FormControl sx={{ padding: "3px" }} size='small'>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Time"
            onChange={handleTime}
          >
            <MenuItem value={"08:00"}>08:00 AM</MenuItem>
            <MenuItem value={"08:30"}>08:30 AM</MenuItem>
            <MenuItem value={"09:00"}>09:00 AM</MenuItem>
            <MenuItem value={"09:30"}>09:30 AM</MenuItem>
            <MenuItem value={"10:00"}>10:00 AM</MenuItem>
            <MenuItem value={"10:30"}>10:30 AM</MenuItem>
            <MenuItem value={"11:00"}>11:00 AM</MenuItem>
            <MenuItem value={"11:30"}>11:30 AM</MenuItem>
            <MenuItem value={"12:00"}>12:00 PM</MenuItem>
            <MenuItem value={"12:30"}>12:30 PM</MenuItem>
            <MenuItem value={"01:00"}>01:00 PM</MenuItem>
            <MenuItem value={"01:30"}>01:30 PM</MenuItem>
            <MenuItem value={"02:00"}>02:00 PM</MenuItem>
            <MenuItem value={"02:30"}>02:30 PM</MenuItem>
            <MenuItem value={"03:00"}>03:00 PM</MenuItem>
            <MenuItem value={"03:30"}>03:30 PM</MenuItem>
            <MenuItem value={"04:00"}>04:00 PM</MenuItem>
            <MenuItem value={"04:30"}>04:30 PM</MenuItem>
            <MenuItem value={"05:00"}>05:00 PM</MenuItem>
            <MenuItem value={"05:30"}>05:30 PM</MenuItem>
            <MenuItem value={"06:00"}>06:00 PM</MenuItem>
            <MenuItem value={"06:30"}>06:30 PM</MenuItem>
            <MenuItem value={"07:00"}>07:00 PM</MenuItem>
            <MenuItem value={"07:30"}>07:30 PM</MenuItem>
            <MenuItem value={"08:00"}>08:00 PM</MenuItem>
            <MenuItem value={"08:30"}>08:30 PM</MenuItem>
            <MenuItem value={"09:00"}>09:00 PM</MenuItem>
            <MenuItem value={"09:30"}>09:30 PM</MenuItem>
            <MenuItem value={"10:00"}>10:00 PM</MenuItem>
          </Select>
        </FormControl>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '12ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="" variant="outlined" size='small' />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '8ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="" variant="outlined" size='small' />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '8ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="" variant="outlined" size='small' />
        </Box>
        <FormControl sx={{ padding: "3px", width: "8ch" }} size='small'>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={perc}

            onChange={handlePerc}
          >
            <MenuItem value={"Rs"}>Rs</MenuItem>
            <MenuItem value={"%"}>%</MenuItem>
          </Select>
        </FormControl>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '12ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="" variant="outlined" size='small' />
        </Box>
        <Button variant="outlined" onClick={onRemove}>
          Close
        </Button>
      </Grid>
    </>
  )
}

export default Index
