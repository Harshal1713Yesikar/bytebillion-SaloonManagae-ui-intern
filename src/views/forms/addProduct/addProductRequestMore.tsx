import { FormControl, Grid, IconButton, MenuItem, TextField } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const AddProductRequestMore = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [selectProductAdd, setSelectProductAdd] = useState<any>('');
  const [selectRetailAdd, setSelectRetailAdd] = useState<any>('');

  const handleSelectProductAdd = (event: SelectChangeEvent) => {
    setSelectProductAdd(event.target.value);
  };

  const handleSelectRetailAdd = (event: SelectChangeEvent) => {
    setSelectRetailAdd(event.target.value);
  };




  return (
    <>
      <Grid sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
          <Select
            value={selectProductAdd}
            onChange={handleSelectProductAdd}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em style={{ fontStyle: 'normal' }}>Select Product</em>
            </MenuItem>
            <MenuItem value={10}>Hair Gel</MenuItem>
            <MenuItem value={20}>Lipstic</MenuItem>
            <MenuItem value={30}>Test</MenuItem>
          </Select>
        </FormControl>
        <TextField sx={{ m: 1 }} size='small' id='outlined-basic' label='Quantity' />
        <FormControl sx={{ m: 1, minWidth: 250 }} size='small'>
          <Select
            value={selectRetailAdd}
            onChange={handleSelectRetailAdd}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em style={{ fontStyle: 'normal' }}>Retail</em>
            </MenuItem>
            <MenuItem value={10}>In House</MenuItem>

          </Select>
        </FormControl>
        <IconButton sx={{ ml: 3 }} onClick={onRemove} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </>
  )
}

export default AddProductRequestMore
