import { Box, Card, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Index = () => {
  const [selectGroup, setSelectGroup] = React.useState('');

  const handleSelectGroup = (event: SelectChangeEvent) => {
    setSelectGroup(event.target.value);
  };

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <Grid>
          <Typography>Add Service</Typography>
        </Grid>
        <Grid sx={{ display: 'flex', width: '100%' }}>
          <FormControl sx={{ m: 1, width: '50%' }}>
            <Select
              value={selectGroup}
              onChange={handleSelectGroup}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>Select Group</em>
              </MenuItem>
              <MenuItem value={10}>Facial Service</MenuItem>
              <MenuItem value={20}>Hair Service</MenuItem>
              <MenuItem value={30}>Nail Art</MenuItem>
            </Select>
          </FormControl>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '200px' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" placeholder='Name' variant="outlined" />
          </Box>
        </Grid>
        <Grid>
          <Box sx={{ width: '50%' }}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={3}
              sx={{ width: '100%', m: 1 }}
            />
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex' }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '200px' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" placeholder='Name' variant="outlined" />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker label="Basic time picker" />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Card>
    </>
  )
}

export default Index
