import { Button, Card, FormControl, Grid, InputLabel, MenuItem, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Select from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/router';
import AddExpense from 'src/views/forms/addExpenseTable/addExpense';

const CreateExpense = () => {
  const [category, setCategory] = useState('');
  const [showProduct, setShowProduct] = useState<any[]>([]);

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const [mode, setMode] = useState('');

  const handleMode = (event: SelectChangeEvent) => {
    setMode(event.target.value);
  };

  const router = useRouter();
  const handleCategorySubmit = () => {
    router.push('./createCategory');
  }
  const routers = useRouter();
  const handleBack = () => {
    routers.push('./');
  }


  const handleExpense = () => {
    setShowProduct((prevProduct) => [...prevProduct, true]);
  };

  const handleRemoveExpense = (index: number) => {
    setShowProduct((prevProduct) => {
      const updatedProduct = [...prevProduct];
      updatedProduct.splice(index, 1);

      return updatedProduct;
    });
  };

  return (
    <>
      <Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleBack} variant="contained" color="primary" sx={{ margin: '10px', textTransform: 'none' }}>
            Back
          </Button>

          <Button onClick={handleCategorySubmit} variant="contained" color="primary" sx={{ margin: '10px', textTransform: 'none' }}>
            Category
          </Button>
        </Grid>
        <Card>
          <Typography sx={{ m: 5, fontSize: 20 }} >Add Expense</Typography>
          <Grid sx={{ backgroundColor: "rgb(238, 238, 238)", m: 1, mb: 0 }}>
            <TextField
              sx={{ m: 5, width: "40%" }}
              label="Receipt Number"
              fullWidth
              size='small'
            />

            <Grid sx={{ display: 'flex' }}>
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
            </Grid>
          </Grid>
          {showProduct.map((index) => (
            <AddExpense key={index} index={index} onRemove={() => handleRemoveExpense(showProduct.length - 1)} />
          ))}
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleExpense} variant="contained" color="primary" sx={{ margin: '10px', textTransform: 'none' }}>
              Add More
            </Button>

            <Button variant="contained" color="primary" sx={{ margin: '10px', textTransform: 'none' }}>
              Save
            </Button>
          </Grid>

        </Card>

      </Grid>
    </>
  )
}

export default CreateExpense
