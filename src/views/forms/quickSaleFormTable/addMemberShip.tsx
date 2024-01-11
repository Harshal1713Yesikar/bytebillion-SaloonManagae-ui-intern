/* eslint-disable react-hooks/rules-of-hooks */
import { Checkbox, Grid, ListItemText, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

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
const AddMemberShip = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [memberShip, setMemberShip] = useState<any>('')

  const handleMemberShip = (event: SelectChangeEvent) => {
    setMemberShip(event.target.value)
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

  return (
    <>
      <Grid style={{ display: "flex", backgroundColor: "rgb(235, 238, 242)", padding: "10px" }}>
        <Grid style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Membership</Typography>
          <FormControl sx={{ m: 1, minWidth: 160 }} size='small'>
            <InputLabel id='demo-select-small-label'>Select Membership</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={memberShip}
              label='Select Membership'
              onChange={handleMemberShip}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid style={{ display: 'flex', flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Staff</Typography>
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
        </Grid>
        <Grid style={{ display: 'flex', flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Price</Typography>
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
        </Grid>
        <Grid style={{ display: 'flex', flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Total</Typography>
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
        </Grid>
        <Grid item xs={8} sx={{ mt: 9 }} onClick={onRemove}>
          <DeleteIcon />
        </Grid>
      </Grid >

    </>
  )
}

export default AddMemberShip
