import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormView = ({ form, handleFieldDelete, fields, setFields, handleFieldUpdate, scrollToFooter }: any) => {

  const [formData, setFormData] = useState<any>({})
  const [snackbar, setSnackBar] = useState<any>({
    open: false,
    message: "",
    color: ''
  })

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar({
      ...snackbar,
      open: false
    })
  };

  const fieldChecker = (index: any) => {
    if (index == 0 || index == 1 || index == 2) {
      setSnackBar({
        open: 'true',
        message: 'Cannot remove a required field !',
        color: 'error'
      })
    }
  }


  return (
    <Card sx={{ mb: 6 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
        <Typography sx={{ margin: '0 auto' }} variant='h3'>{form.formTitle} </Typography>
        <Typography>{form.formDescription}</Typography>
        {
          form.title &&
          <Typography>Active :{form.active}</Typography>
        }
      </div>
      <CardContent >
        <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center' }}>
          {
            form?.formFields?.map((field: any, index: number) => {
              const dummyName = field.name.split(" ");
              let fieldName = ""
              for (let i = 0; i < dummyName.length; i++) {
                if (i == 0) {
                  fieldName += dummyName[i].toLowerCase();
                }
                else {
                  fieldName += `${dummyName[i].charAt(0).toUpperCase()}${dummyName[i].slice(1).toLowerCase()}`
                }
              }

              return (
                <Grid item xs={12} sm={10} md={8} lg={5}>

                  <CardContent style={{ display: "flex", flexDirection: "row" }}>
                    <Grid sx={{ margin: '0 auto' }}>
                      {field.message ? <Typography variant='h4'>{field.message}    {field.isRequired ? "*" : ""}</Typography> : ""}
                      {
                        field.type == "textField" && <TextField
                          fullWidth
                          label={field.name}
                          onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
                          placeholder={field.name}
                          required={field.isRequired}
                        />
                      }
                      {
                        field.type == "dropDown" && <FormControl fullWidth >
                          <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>
                          <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={fields.type}
                            label={field.name}
                            required={field.isRequired}
                            onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
                          >
                            {
                              field.options.map((option: any) => {
                                return <MenuItem value={option.name}>{option.name}</MenuItem>
                              })
                            }
                          </Select>
                        </FormControl>
                      }
                      {
                        field.type == "radio" && <FormControl fullWidth>
                          <FormLabel id="demo-row-radio-buttons-group-label">{field.name}</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={fields.isRequired}
                            onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
                          >
                            {
                              field.options.map((option: any, index: number) => {
                                return <FormControlLabel checked={false} value={option.value} control={<Radio />} label={option.name} />
                              })
                            }
                          </RadioGroup>
                        </FormControl>
                      }
                    </Grid>
                    <Grid xs={3}>
                      {
                        handleFieldDelete &&
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                          {
                            setFields &&
                            <CreateIcon onClick={() => { handleFieldUpdate(field, index), scrollToFooter() }} />
                          }
                          <CancelIcon onClick={() => { handleFieldDelete(index), fieldChecker(index) }} />
                        </div>
                      }
                    </Grid>
                  </CardContent>
                  <hr style={{ width: '100%' }} />
                </Grid>
              )
            })
          }
        </Grid>
      </CardContent>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.color} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  )
}
export default FormView
