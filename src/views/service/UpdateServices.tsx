import React, { Fragment, useEffect, useState } from 'react'
import Dashboard from 'src/pages/dashboard'
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import * as yup from 'yup'
import { updateServicesApi, listAllEmployeeApi } from 'src/store/APIs/Api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

import serviceId from 'src/pages/service/serviceDetails/[serviceId]';


interface FormInputs {
  customerId: ''
  salonId: ''
  serviceCategoryId: ''
  serviceName: ''
  serviceDescription: ''
  serviceTime: ''
  selectEmployee: ''
  amountHistory: {
    serviceAmount: ''
  }
}

const createData = (
  serviceName: string,
  serviceId: number,
  serviceStatus: number,
  currentServiceAmount: number
): Data => {
  return { serviceName, serviceId, serviceStatus, currentServiceAmount }
}

interface Data {
  serviceId: number
  serviceName: string
  serviceStatus: number
  currentServiceAmount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}
const ServiceSchema = yup.object().shape({
  serviceName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),

  serviceTime: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(50)
    .required(),
  amountHistory: yup.string().min(30).max(30).required(),
  serviceDescription: yup.string().required().max(100),
  selectEmployee: yup.string().required()
})
const UpdateServices = () => {

  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false)
  const [categoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [defaultStudentValues, setDefaultStudentValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'E7uqn',
    serviceCategoryId: 'HFm4p',
    serviceName: '',
    serviceDescription: '',
    serviceTime: '',
    selectStaff: '',
    amountHistory: {
      serviceAmount: ''
    }
  })
  const [employeeList, setEmployeeList] = useState([])

  const {
    reset: serviceReset,
    control,
    getValues: serviceValues,
    handleSubmit: handleServiceSubmit,
    setValue,
    formState: { errors: ServiceErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultStudentValues
  })
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const orgSelected = (organization: any) => {
    listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli').then((res: any) => {
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      // setLoading(false)
    })
  }


  const handleCloseAddServiceDialog = () => {
    setAddServiceDialogOpen(false)
  }
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response: any = await listAllEmployeeApi('99f9bf2-8ac2-4f84-8286-83bb46595fde', 'E7uqn')
        setEmployeeList(response?.data?.data)
        console.log('aaa', response?.data?.data)
      } catch (err) {
        return err
      }
    }
    fatchData()
  }, [])

  const onSubmit = (serviceData: any) => {
    updateServicesApi(serviceData)
    // setDefaultStudentValues(data)
  }
  const renderedOrganizations = employeeList?.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => orgSelected(organization)} key={index} value={organization.employeeName}>
        <Typography> {organization.employeeName}</Typography>
      </MenuItem>
    )
  })

  return (
    <Grid sx={{ display: 'flex', width: '100%' }}>
      <Grid sx={{ width: '25%', mr: 3 }}>
        <Dashboard />
      </Grid>

      <Card>

        <DialogTitle> Add Service</DialogTitle>

        <CardContent sx={{ width: '100%', height: '1000px' }}>
          <form onSubmit={handleServiceSubmit(onSubmit)} >
            <Grid item xs={12} sm={6} sx={{ margin: 1, display: 'flex', justifyContent: 'end', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(ServiceErrors.selectEmployee)}
                  htmlFor='validation-basic-select'
                >
                  Select Category
                </InputLabel>
                <Controller
                  name='selectEmployee'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Select Categary '
                      onChange={onChange}
                      error={Boolean(ServiceErrors.selectEmployee)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    ></Select>
                  )}
                />
                {ServiceErrors.selectEmployee && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    {ServiceErrors.selectEmployee.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Fragment>
                <Button variant='outlined' onClick={handleClickOpen} sx={{ borderRadius: 100, backgroundColor: "blue", color: "white" }}>
                  +
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                  <DialogTitle id='form-dialog-title'> Add Category</DialogTitle>
                  <DialogContent>
                    <TextField
                      id='name'
                      autoFocus
                      fullWidth
                      type='Name'
                      label='Name'
                    />
                  </DialogContent>
                  {/* <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='serviceName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    value={value}
                                    label='Service Name'
                                    onChange={onChange}
                                    placeholder='Type Here'
                                    error={Boolean(ServiceErrors.serviceName)}
                                    aria-describedby='validation-basic-first-name'
                                  />
                                )}
                              />
                              {ServiceErrors.serviceName && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                  This field is required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid> */}
                  <DialogActions>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            </Grid>
            <Grid>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='serviceName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Service Name'
                          onChange={onChange}
                          placeholder='Type Here'
                          error={Boolean(ServiceErrors.serviceName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {ServiceErrors.serviceName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name='amountHistory.serviceAmount'
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='amountHistory'
                          value={value}
                          onChange={onChange}
                          label='Amount'
                          placeholder='Type Here '
                          error={Boolean(ServiceErrors.amountHistory)}
                        />
                      )}
                    />
                    {ServiceErrors.amountHistory && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        required,10-digit phone number
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='serviceTime'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Service Time'
                          onChange={onChange}
                          placeholder='Service Time'
                          error={Boolean(ServiceErrors.serviceTime)}
                          aria-describedby='validation-basic-last-name'
                        />
                      )}
                    />
                    {ServiceErrors.serviceTime && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      error={Boolean(ServiceErrors.selectEmployee)}
                      htmlFor='validation-basic-select'
                    >
                      Select Employee*
                    </InputLabel>
                    <Controller
                      name='selectEmployee'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Select Employee '
                          onChange={onChange}
                          error={Boolean(ServiceErrors.selectEmployee)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          {renderedOrganizations}
                        </Select>
                      )}
                    />
                    {ServiceErrors.selectEmployee && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {ServiceErrors.selectEmployee.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={16}>
                  <FormControl fullWidth>
                    <Controller
                      name='serviceDescription'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label='Designation'
                          placeholder='Type Here'
                          error={Boolean(ServiceErrors.serviceDescription)}
                          aria-describedby='validation-basic-textarea'
                        />
                      )}
                    />
                    {ServiceErrors.serviceDescription && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Button onClick={handleCloseAddServiceDialog}
              size='large'
              type='submit'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleCloseAddServiceDialog}
              size='large'
              type='submit'
              variant='contained'
              color='primary'
              onSubmit={onSubmit}
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UpdateServices
