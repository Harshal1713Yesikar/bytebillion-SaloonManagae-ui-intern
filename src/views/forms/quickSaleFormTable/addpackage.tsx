/* eslint-disable react-hooks/rules-of-hooks */
import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';



const AddPackage = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [packages, setPackages] = useState<any>('')

  const handlePackage = (event: SelectChangeEvent) => {
    setPackages(event.target.value)
  }


  return (
    <>
      <Grid style={{ display: "flex", backgroundColor: "rgb(251, 242, 234)", padding: "10px" }}>
        <Grid style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ ml: 1 }} >Services</Typography>
          <FormControl sx={{ m: 1, minWidth: 160 }} size='small'>
            <InputLabel id='demo-select-small-label'>Select Services</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={packages}
              label='Select Services'
              onChange={handlePackage}
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
          <Typography sx={{ ml: 1 }} >Valid</Typography>
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
          <DeleteIcon sx={{ cursor: 'pointer' }} />
        </Grid>
      </Grid >
    </>
  )
}

export default AddPackage
