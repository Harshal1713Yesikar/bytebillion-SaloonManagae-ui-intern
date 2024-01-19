import { Button, Card, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

const Index = () => {
  const [selectProduct, setSelectProduct] = React.useState('');
  const [selectRetail, setSelectRetail] = React.useState('');

  const handleSelectProduct = (event: SelectChangeEvent) => {
    setSelectProduct(event.target.value);
  };

  const handleSelectRetail = (event: SelectChangeEvent) => {
    setSelectRetail(event.target.value);
  };

  return (
    <>
      <Card sx={{ width: '70%' }}>
        <Grid sx={{ p: 5, pb: 2 }}>
          <Grid sx={{ display: 'flex', alignItems: 'center', mb: 10 }}>
            <CloseIcon sx={{ fontSize: '25px', cursor: 'pointer', mr: 3 }} />
            <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Add Product Request</Typography>
          </Grid>
          <Grid sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
              <Select
                value={selectProduct}
                onChange={handleSelectProduct}
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
            <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
              <Select
                value={selectRetail}
                onChange={handleSelectRetail}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em style={{ fontStyle: 'normal' }}>Retail</em>
                </MenuItem>
                <MenuItem value={10}>In House</MenuItem>

              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', pr: 5, borderBottom: '1px solid lightGray', pb: 4 }}>
          <Button sx={{ width: '140px', textTransform: 'none', fontSize: '15px' }} variant='contained'><AddIcon sx={{ mr: 1 }} /> Add More</Button>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', p: 5 }}>
          <Button variant='contained'>Save</Button>
        </Grid>
      </Card>
    </>
  )
}

export default Index
