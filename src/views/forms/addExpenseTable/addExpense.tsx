import { FormControl, Grid, InputLabel, MenuItem, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteIcon from '@mui/icons-material/Delete';


const AddExpense = ({ onRemove }: { index: number; onRemove: () => void }) => {
  const [category, setCategory] = useState('');

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const [mode, setMode] = useState('');

  const handleMode = (event: SelectChangeEvent) => {
    setMode(event.target.value);
  };

  return (
    <>
      <Grid sx={{ display: 'flex', backgroundColor: "rgb(238, 238, 238)", ml: 1, mr: 1 }}>
        <TextField
          sx={{ m: 2, width: "20%" }}
          label="Payee"
          fullWidth
          size='small'
        />
        <Grid sx={{ m: 2, ml: 0 }} style={{ display: 'flex', flexDirection: "column", marginLeft: "5px", }}>
          <FormControl sx={{ m: 5, margin: 0, width: "170px" }} size="small">
            <InputLabel id="demo-select-small-label">Select Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="Select Category"
              onChange={handleCategory}
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
        <TextField
          sx={{ m: 2, ml: 0, width: "100px" }}
          label="Amount"
          fullWidth
          size='small'
        />
        <Grid sx={{ m: 2, ml: 0 }} style={{ display: 'flex', flexDirection: "column" }}>
          <FormControl sx={{ margin: 0, width: "170px" }} size="small">
            <InputLabel id="demo-select-small-label">Select Mode</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={mode}
              label="Select Mode"
              onChange={handleMode}
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
        <Grid sx={{ m: 2, ml: 0 }} style={{ display: 'flex', flexDirection: "column" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              label="Date"
              slotProps={{
                textField: {
                  size: 'small',
                  style: { width: '170px' }
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <TextField
          sx={{ m: 2, ml: 0, width: "150px" }}
          label="Remark"
          fullWidth
          size='small'
        />
        <Grid item xs={8} sx={{ mt: 4, cursor: 'pointer ' }} onClick={onRemove}>
          <DeleteIcon />
        </Grid>
      </Grid>
    </>
  )
}

export default AddExpense
