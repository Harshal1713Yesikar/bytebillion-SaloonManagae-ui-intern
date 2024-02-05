/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Checkbox, Grid, ListItemText, OutlinedInput, Typography } from '@mui/material'
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
const AddProducts = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [product, setProduct] = useState<any>('')

  const handleProduct = (event: SelectChangeEvent) => {
    setProduct(event.target.value)
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
  const [perc, setPerc] = useState('');


  const handlePerc = (event: SelectChangeEvent) => {
    setPerc(event.target.value as string);
  };

  return (
    <>
      <Grid style={{ display: "flex", backgroundColor: "rgb(241, 249, 247)", padding: "10px" }}>
        <Grid style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Product</Typography>
          <FormControl sx={{ m: 1, minWidth: 160 }} size='small'>
            <InputLabel id='demo-select-small-label'>Select Product</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={product}
              label='Select Product'
              onChange={handleProduct}
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
          <Typography sx={{ ml: 1 }} >Qty</Typography>
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
          <Typography sx={{ ml: 1 }} >Disc.(Rs)</Typography>
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
        </Grid>
        <FormControl sx={{ padding: "3px", width: "8ch", mt: 6.3 }} size='small'>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={perc || "Rs"} // Set "Rs" as the default value
            onChange={handlePerc}
          >
            <MenuItem value={"Rs"}>Rs</MenuItem>
            <MenuItem value={"%"}>%</MenuItem>
          </Select>
        </FormControl>
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
          <DeleteIcon sx={{ cursor: 'pointer' }} />
        </Grid>
      </Grid >
    </>
  )
}

export default AddProducts
