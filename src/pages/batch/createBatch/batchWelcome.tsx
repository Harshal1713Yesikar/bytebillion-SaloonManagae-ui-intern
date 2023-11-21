// ** MUI Imports
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { customDateFormat, customTimeFormat, convertToISODate } from 'src/@core/utils/format'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

// ** Custom Component Import
import CustomChip from 'src/@core/components/mui/chip'
import CustomInput from './../../../views/form-elements/picker/PickersCustomInput'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import Grid, { GridProps } from '@mui/material/Grid'
import { InputLabel, MenuItem, Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { createBatch, listSingleBatch, updateBatch, deleteBatch } from 'src/store/APIs/Api'
import { InputAdornment } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CardHeader from '@mui/material/CardHeader'
import Icon from 'src/@core/components/icon'
import EventNoteIcon from '@mui/icons-material/EventNote';
import { getAllBatchList } from 'src/store/APIs/Api'
import BatchCard from './batchCard'
// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: 1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  left: 58,
  bottom: 0,
  height: 173,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    position: 'static'
  }
}))

const BatchWelcome = (props: any) => {

  const { setOpenSnackBar, editBatch, setListApiStatus, setEditBatch, getBatchId, setGetBatchId, setBatchListApiCall, batchListApiCall } = props

  // ** states
  const [open, setOpen] = useState<any>(false)
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [startTime, setStartTime] = useState<any>(null)
  const [endTime, setEndTime] = useState<any>(null)
  const [batchTime, setBatchTime] = useState<any>(false)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [user, setUser] = useState<any>()
  const [permission, setPermission] = useState<any>()
  const [batchData, setBatchData] = useState<any>({
    batchName: "",
    batchDescription: "",
    batchClassStartTime: "",
    batchClassEndTime: "",
    batchStartDate: "",
    batchEndDate: "",
    batchMode: ""
  })

  const [singleBatch, setSingleBatch] = useState<any>()
  const [updateStartTime, setUpdateStartTime] = useState<any>(null)
  const [updateEndTime, setUpdateEndTime] = useState<any>(null)
  const [updateBatchTime, setUpdateBatchTime] = useState<any>(false)
  const [updateStartDate, setUpdateStartDate] = useState<DateType>(null)
  const [updateEndDate, setUpdateEndDate] = useState<DateType>(null)

  const [batchStatus, setBatchStatus] = useState<any>()
  const [toSetTime, setToSetTime] = useState<any>('yes')
  const [toSetDate, setToSetDate] = useState<any>('yes')
  const [formUpdated, setFormUpdated] = useState<any>(false)
  const [formUpdatedButton, setFormUpdatedButton] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<any>(false)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectedCourseId, setSelectedCourseId] = useState<any>()
  const [submitted, setSubmitted] = useState<boolean>(false)
  // const[batchListApiCall,setBatchListApiCall]=useState<boolean>(false)
  const [startBatchDate, setStartBatchDate] = useState<any>(null);
  const [endBatchEndDate, setEndBatchEndDate] = useState<any>(null);
  const [singleBatchForUpdate, setSingleBatchForUpdate] = useState({
    batchName: '',
    batchDescription: '',
    batchClassEndTime: '',
    batchClassStartTime: '',
    batchEndDate: new Date(),
    batchStartDate: new Date(),
    batchMode: "",
    batchStatus: '',
  });

  // ** Hook
  const theme = useTheme()

  // ** function
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => { setOpen(false), setFormUpdatedButton(false); setSingleBatch({}); setEditBatch(false) }


  useEffect(() => {
    if (singleBatch) {
      if (updateStartDate) {
        singleBatch.batchStartDate = customDateFormat(updateStartDate);
        setSingleBatch(singleBatch)
      }

      if (updateEndDate) {
        singleBatch.batchEndDate = customDateFormat(updateEndDate);
        setSingleBatch(singleBatch)
      }

      if (updateEndTime) {
        singleBatch.batchClassEndTime = customTimeFormat(updateEndTime);
        setSingleBatch(singleBatch)
      }

      if (updateStartTime) {
        singleBatch.batchClassStartTime = customTimeFormat(updateStartTime);
        setSingleBatch(singleBatch)
      }
    }
  }, [updateStartTime, updateEndTime, updateStartDate, updateEndDate])


  useEffect(() => {
    if (editBatch == true) {
      setDialogTitle('Edit')
      setEditBatch(false)
      setUpdateStartTime(null)
      setUpdateEndTime(null)
      setUpdateStartDate(null)
      setUpdateEndDate(null)
    }
  }, [editBatch])
  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])
  useEffect(() => {
    if (getBatchId) {
      if (user) {
        const customerId = user.customerId
        const organizationId = user.organizationId

        listSingleBatch(customerId, organizationId, getBatchId).then((res: any) => {
          if (res.data.batchStartDate != "" && res.data.batchEndDate != "") {
            const newStartDate = res.data.batchStartDate.split("/")
            const singleBatchStartData: any = res?.data
            setSingleBatch({ ...singleBatchStartData, batchStartDate: `${newStartDate[1]}/${newStartDate[0]}/ ${newStartDate[2]}` })

            const newEndDate = res.data.batchEndDate.split("/")
            const singleBatchEndData: any = res?.data
            setSingleBatch({ ...singleBatchEndData, batchEndDate: `${newEndDate[0]}/${newEndDate[1]}/ ${newEndDate[2]}` })
            handleClickOpen()

          }
          else {
            setSingleBatch(res?.data)
            handleClickOpen()
          }
        }).catch((err: any) => {
          console.log(err)
        })
      }
    }
  }, [getBatchId])


  useEffect(() => {
    setStartTime(null)
    setEndTime(null)
    setStartDate(null)
    setEndDate(null)
    setUpdateStartTime(null)
    setUpdateEndTime(null)
    setUpdateStartDate(null)
    setUpdateEndDate(null)
    setBatchData({
      batchName: "",
      batchDescription: "",
      batchClassStartTime: "",
      batchClassEndTime: "",
      batchStartDate: "",
      batchEndDate: "",
      batchMode: ""
    })
  }, [])

  useEffect(() => {
    if (startDate) {
      batchData.batchStartDate = customDateFormat(startDate);
      setBatchData(batchData)
    }

    if (endDate) {
      batchData.batchEndDate = customDateFormat(endDate);
      setBatchData(batchData)
    }

    if (endTime) {
      batchData.batchClassEndTime = customTimeFormat(endTime);
      setBatchData(batchData)
    }

    if (startTime) {
      batchData.batchClassStartTime = customTimeFormat(startTime);
      setBatchData(batchData)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, startDate, endDate])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])



  const setAllStateEmpty = () => {
    setStartTime(null)
    setEndTime(null)
    setStartDate(null)
    setEndDate(null)
    setUpdateStartTime(null)
    setUpdateEndTime(null)
    setUpdateStartDate(null)
    setUpdateEndDate(null)
    setToSetTime('yes')
    setToSetDate('yes')
    setBatchData({
      batchName: "",
      batchDescription: "",
      batchClassStartTime: "",
      batchClassEndTime: "",
      batchStartDate: "",
      batchEndDate: "",
      batchMode: ""
    })
  }



  const formSubmit = () => {

    if (batchTime == false) {
      const data = []

      if (user) {
        const customerId = user.customerId
        const organizationId = user.organizationId
        data.push(batchData)

        if (data.length > 0) {
          if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {

                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("New batch created successfully ")
                setSubmitted(false)
                setListApiStatus(true)
                setBatchListApiCall(true)
                setSubmitted(false)
                handleClose()
                setAllStateEmpty()
              }
              else {
                setSnackbarColor(false)
                setSnackbaropen(true)
                setResponseMessage("Fill all the required information")
                handleClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })
          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'yes' && batchData.batchStartDate && batchData.batchEndDate && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("New batch created successfully ")
                setSubmitted(false)
                setListApiStatus(true)
                setBatchListApiCall(true)

                handleClose()
                setSubmitted(false)
                setAllStateEmpty()
              }
              else {
                setSnackbarColor(false)
                setSnackbaropen(true)
                setResponseMessage("Fill all the required information")
                handleClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })
          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'yes' && batchData.batchClassStartTime && batchData.batchClassEndTime) {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("New batch created successfully ")
                setBatchListApiCall(true)

                setSubmitted(false)
                setListApiStatus(true)
                handleClose()
                setSubmitted(false)
                setAllStateEmpty()
              }
              else {
                setSnackbarColor(false)
                setSnackbaropen(true)
                setResponseMessage("Fill all the required information")
                handleClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })
          }
          else if (batchData.batchName !== '' && batchData.batchDescription !== '' && batchData.batchMode !== '' && toSetDate == 'no' && toSetTime == 'no') {
            let students: any = []
            let courses: any = []
            createBatch(customerId, organizationId, data, students, courses).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("New batch created successfully ")
                setSubmitted(false)
                setListApiStatus(true)
                setBatchListApiCall(true)

                handleClose()
                setSubmitted(false)
                setAllStateEmpty()
              }
              else {
                setSnackbarColor(false)
                setSnackbaropen(true)
                setResponseMessage("Fill all the required information")
                handleClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })
          }

          else {
            setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Fill all the required information")

          }
        }

      }
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Batch end time must be at least 30 minutes after start time ")
    }
  }

  const updateFormSubmit = () => {
    setFormUpdatedButton(false);
    if (updateBatchTime == false) {
      if (singleBatch.batchName && singleBatch.batchDescription) {
        if (user) {
          const customerId = user.customerId
          const organizationId = user.organizationId
          if (getBatchId) {
            updateBatch(customerId, organizationId, getBatchId, singleBatch).then((res: any) => {
              if (res.statusCode == 200) {
                setSnackbarColor(true)
                setSnackbaropen(true)
                setResponseMessage("Batch updated successfully ")
                setSubmitted(false)
                setListApiStatus(true)
                handleClose()
              }
              else {
                setOpen({ open: true, mssg: res.message })
                handleClose()
              }

            }).catch((err: any) => {
              console.log(err)
            })

          }
        }
      }
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Batch end time must be at least 30 minutes after start time ")
    }

    setFormUpdated(false);
  }

  const deleteApiCall = () => {
    setDialogOpen(false)
    if (user) {
      const customerId = user.customerId
      const organizationId = user.organizationId
      if (getBatchId && batchStatus) {
        deleteBatch(customerId, organizationId, getBatchId, batchStatus).then((res: any) => {
          if (res.statusCode == 200) {
            setSnackbarColor(true)
            setSnackbaropen(true)
            setResponseMessage("Batch status updated successfully ")
            handleClose();
            setListApiStatus(true)
            setBatchStatus('')
            setGetBatchId('')
          }
          else {
            setOpen({ open: true, mssg: res.message })

            handleClose();
          }
        }).catch((err: any) => {
          console.log(err)
        })

      }
    }
  }

  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value })
  }

  const updateChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setSingleBatch({ ...singleBatch, [e.target.name]: e.target.value })
    setFormUpdated(true);
  }

  const handleDeleteDialogOpen = (status: any) => {
    setSuspendDialogOpen(true);
    setSelectedCourseId(status);
  };

  const handleStartTimeChange = (date: any) => {
    setStartTime(date);
    if (endTime && date) {
      const timeDiffInMinutes = Math.round((endTime - date) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setSnackbaropen(true)
        setResponseMessage("Batch end time must be at least 30 minutes after start time ")

      }
      else {
        setBatchTime(false)
      }
    }
  };

  const handleEndTimeChange = (date: any) => {
    setEndTime(date);
    if (startTime && date) {
      const timeDiffInMinutes = Math.round((date - startTime) / (1000 * 60));
      if (timeDiffInMinutes < 30) {
        setBatchTime(true)
        setSnackbarColor(false)
        setSnackbaropen(true)
        setResponseMessage("Batch end time must be at least 30 minutes after start time ")
      }
      else {
        setBatchTime(false)
      }
    }
  };


  const handleUpdateTimeChange = (date: any, type: any) => {
    if (type == "batchClassEndTime") {
      setUpdateEndTime(date);
      if (updateStartTime != null) {
        if (updateStartTime && date) {
          const updatetimeDiffInMinutes = Math.round((date - updateStartTime) / (1000 * 60));
          if (updatetimeDiffInMinutes < 30) {
            setUpdateBatchTime(true)
            setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Batch end time must be at least 30 minutes after start time ")
          }
          else {
            setUpdateBatchTime(false)
          }
        }
      }
      else {
        const [time, period] = singleBatch?.batchClassStartTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const currentDate: any = new Date();
        currentDate.setHours(period === 'PM' ? hours + 12 : hours, minutes, 0, 0);
        if (currentDate && date) {
          const updatetimeDiffInMinutes = Math.round((date - currentDate) / (1000 * 60));
          if (updatetimeDiffInMinutes < 30) {
            setUpdateBatchTime(true)
            setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Batch end time must be at least 30 minutes after start time ")
          }
          else {
            setUpdateBatchTime(false)
          }
        }
      }
    }

    else {

      setUpdateStartTime(date);
      if (updateEndTime != null) {
        if (updateEndTime && date) {
          const updatetimeDiffInMinutes = Math.round((updateEndTime - date) / (1000 * 60));
          if (updatetimeDiffInMinutes < 30) {
            setUpdateBatchTime(true)
            setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Batch end time must be at least 30 minutes after start time ")
          }
          else {
            setUpdateBatchTime(false)
          }
        }

      }
      else {
        const [times, periods] = singleBatch?.batchClassEndTime.split(' ');
        const [hourss, minutess] = times.split(':').map(Number);
        const currentDates: any = new Date();
        currentDates.setHours(periods === 'PM' ? hourss + 12 : hourss, minutess, 0, 0);
        if (currentDates && date) {
          const updatetimeDiffInMinutes = Math.round((currentDates - date) / (1000 * 60));
          if (updatetimeDiffInMinutes < 30) {
            setUpdateBatchTime(true)
            setSnackbarColor(false)
            setSnackbaropen(true)
            setResponseMessage("Batch end time must be at least 30 minutes after start time ")
          }
          else {
            setUpdateBatchTime(false)
          }
        }
      }
    }
  };

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    if (date) {
      const endDateValue = new Date(date);
    }
  };
  const handleUpdateStartDateChange = (date: any) => {
    setUpdateStartDate(date);

    if (date) {
      const endDateValue = new Date(date);
    }
  };

  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <>

      <Grid item xs={12} sx={{ display: 'flex' }} >

        <Card
          sx={{ width: '100%' }}

        >
          <Grid sx={{ height: '100%', paddingY: '15px', display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            
            <Grid sx={{ paddingRight: '30px' }}>
              {permission?.some((obj: any) => obj?.title === "Courses" && obj?.action?.includes("create")) &&

                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                      setSubmitted(false)
                    }}
                  >
                    Add batch <div style={{ paddingLeft: '5px', paddingTop: '2px' }}>
                      <Icon icon="material-symbols:group" />
                    </div>

                  </Button>

                </Box>
              }
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Dialog fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '630px' } }} open={open}>

        {dialogTitle == 'Edit' ?
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              <Typography variant='h5' component='span'>
                {`${dialogTitle} Batch `}
              </Typography>
            </DialogTitle>
            <Icon
              className="iconContainer"
              onClick={() => { handleClose(); setGetBatchId('') }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />

            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>

              <TableContainer>
                <Grid container spacing={5} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label='Batch  name'
                      placeholder='Morning / Evening Batch'
                      name='batchName'
                      value={singleBatch?.batchName}
                      onChange={(e) => {
                        setFormUpdatedButton(true)
                        updateChangeHandler(e)
                      }}
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 50,
                      }}
                      error={submitted ? singleBatch?.batchName ? false : true : false}
                      helperText={submitted && !singleBatch?.batchName ? 'Required,max 50 chars' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name='batchDescription'
                      label='Batch  description'
                      minRows={2}
                      value={singleBatch?.batchDescription}
                      onChange={(e) => {
                        setFormUpdatedButton(true)
                        updateChangeHandler(e)
                      }}
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 500,
                      }}
                      error={submitted ? singleBatch?.batchDescription ? false : true : false}
                      helperText={submitted && !singleBatch?.batchDescription ? 'Required,max 500 chars' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>

                      <DatePicker
                        showTimeSelect
                        selected={updateStartTime}
                        timeIntervals={15}
                        showTimeSelectOnly
                        required
                        popperPlacement={popperPlacement}
                        value={updateStartTime ? updateStartTime : singleBatch?.batchClassStartTime}
                        name='batchClassStartTime'
                        placeholderText='4:00 PM'
                        dateFormat='h:mm aa'
                        id='time-only-picker'
                        onChange={(date: Date) => {
                          handleUpdateTimeChange(date, "batchClassStartTime");
                          setFormUpdatedButton(true);
                        }}

                        customInput={<CustomInput label='Batch class start time' />}
                      />
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        showTimeSelect
                        selected={updateEndTime}
                        timeIntervals={15}
                        showTimeSelectOnly
                        required
                        popperPlacement={popperPlacement}
                        value={updateEndTime ? updateEndTime : singleBatch?.batchClassEndTime}
                        name='batchClassEndTime'
                        placeholderText='8:00 PM'
                        dateFormat='h:mm aa'
                        id='time-only-picker'
                        onChange={(date: Date) => {
                          handleUpdateTimeChange(date, "batchClassEndTime");
                          setFormUpdatedButton(true);
                        }}

                        customInput={<CustomInput label='Batch class end time' />}
                      />
                    </DatePickerWrapper>
                  </Grid>


                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>

                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={updateStartDate}
                        id='basic-input'
                        popperPlacement={popperPlacement}
                        autoComplete='OFF'
                        required
                        value={updateStartDate ? updateStartDate : singleBatch?.batchStartDate}
                        onChange={(date) => {
                          handleUpdateStartDateChange(date);
                          setFormUpdatedButton(true);
                        }}
                        maxDate={updateEndDate || null}
                        placeholderText='Batch Start Date'
                        customInput={<CustomInput
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                          }}
                          label='Batch start date' />}
                      />
                    </DatePickerWrapper>

                  </Grid>

                  <Grid item xs={12} sm={6}>

                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={updateEndDate}
                        id='basic-input'
                        popperPlacement={popperPlacement}
                        autoComplete='OFF'
                        required
                        value={updateEndDate ? updateEndDate : singleBatch?.batchEndDate != "" ? singleBatch?.batchEndDate : ""}
                        onChange={(date) => {
                          setUpdateEndDate(date);
                          setFormUpdatedButton(true)
                        }}

                        minDate={updateStartDate ? new Date(updateStartDate) : new Date(singleBatch?.batchStartDate)}
                        placeholderText='Batch End Date'
                        customInput={<CustomInput
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                          }}
                          label='Batch end date' />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Batch mode </InputLabel>
                      <Select
                        label='Batch Mode'
                        name='batchMode'
                        required
                        id='stepper-custom-vertical-personal-select'
                        value={singleBatch?.batchMode}
                        autoComplete='OFF'
                        onChange={(e) => {
                          setFormUpdatedButton(true)
                          updateChangeHandler(e)
                        }}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={"online"}>Online</MenuItem>
                        <MenuItem value={"offline"}>Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ display: 'flex' }}>
                    <Grid item xs={12} sm={12} sx={{ display: 'flex' }}>
                      <Typography sx={{ mt: 2, color: 'text.secondary' }} >
                        Current status  {singleBatch?.batchStatus == 'active' ?
                          <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={singleBatch?.batchStatus} />
                          :
                          <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={singleBatch?.batchStatus} />
                        }
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography sx={{ mt: 2, color: 'text.secondary' }} >
                        Change status

                        {singleBatch?.batchStatus === 'active' ?
                          <Button sx={{ margin: "5px", }} variant='contained'

                            onClick={() => {
                              setBatchStatus('inActive');
                              setDialogOpen(true);
                            }}
                          >
                            Inactive
                          </Button> : <Button sx={{ margin: "5px", }} variant='contained'

                            onClick={() => {
                              setBatchStatus('active');
                              setDialogOpen(true);
                            }}
                          >
                            active
                          </Button>}

                      </Typography>
                    </Grid>


                  </Grid>
                </Grid>
              </TableContainer>
              <StyledGrid item xs={12} sm={6}>
                <Img alt='Welcome back John' src={`/images/pages/illustration-john-${theme.palette.mode}.png`} />
              </StyledGrid>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right', width: '100%' }}>
              <Box className='demo-space-x'>
                <Button size='large' color='secondary' variant='outlined' onClick={() => { handleClose(); setSubmitted(false); setGetBatchId('') }}>
                  Cancel
                </Button>

                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  onClick={() => { updateFormSubmit(); setSubmitted(true); }}
                  disabled={!formUpdatedButton}
                >
                  Update
                </Button>
              </Box>
            </DialogActions>
          </Grid> :
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }} >
              <Typography variant='h5' component='span'>
                {`${dialogTitle} Batch `}
              </Typography>
            </DialogTitle>
            <Icon
              className="iconContainer"
              onClick={handleClose}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <TableContainer>
                <Grid container spacing={5} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label='Batch name'
                      placeholder='Morning / Evening Batch'
                      name='batchName'
                      error={submitted ? batchData.batchName ? false : true : false}
                      helperText={submitted && !batchData.batchName ? 'Required,max 50 chars' : ''}
                      value={batchData.batchName}
                      onChange={changeHandler}
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 50,
                      }}

                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name='batchDescription'
                      label='Batch description'
                      minRows={2}
                      error={submitted ? batchData.batchDescription ? false : true : false}
                      helperText={submitted && !batchData.batchDescription ? 'Required,max 500 chars' : ''}
                      value={batchData.batchDescription}
                      onChange={changeHandler}
                      autoComplete='OFF'
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch duration</InputLabel>
                      <Select
                        label='Do you want to set batch duration'
                        name='Do You Want To Set batch duration'
                        id='stepper-custom-vertical-personal-select'
                        value={toSetTime}
                        onChange={(e: any) => { setToSetTime(e.target.value) }}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'yes'}>Yes</MenuItem>
                        <MenuItem value={'no'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Do you want to set batch date</InputLabel>
                      <Select
                        label='Do you want to set batch date '
                        name='Do You Want To Set batch date '
                        id='stepper-custom-vertical-personal-select'
                        value={toSetDate}
                        onChange={(e: any) => { setToSetDate(e.target.value) }}
                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'yes'}>Yes</MenuItem>
                        <MenuItem value={'no'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {toSetTime == 'yes' &&
                    <>
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            showTimeSelect
                            selected={startTime}
                            timeIntervals={15}
                            required

                            showTimeSelectOnly
                            popperPlacement={popperPlacement}
                            name='batchClassStartTime'
                            placeholderText='4:00 PM'
                            dateFormat='h:mm aa'
                            id='time-only-picker'
                            onChange={(date: Date) => handleStartTimeChange(date)}
                            customInput={<CustomInput error={submitted ? startTime ? false : true : false}
                              helperText={submitted && !startTime ? 'Batch class start time is required' : ''}
                              label='Batch class start time' />}
                          />
                        </DatePickerWrapper>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            showTimeSelect
                            selected={endTime}
                            timeIntervals={15}
                            showTimeSelectOnly
                            required
                            popperPlacement={popperPlacement}
                            name='batchClassEndTime'
                            placeholderText='8:00 PM'
                            dateFormat='h:mm aa'
                            id='time-only-picker'
                            onChange={(date: Date) => handleEndTimeChange(date)}
                            customInput={<CustomInput error={submitted ? endTime ? false : true : false}
                              helperText={submitted && !endTime ? 'Batch class end time is required' : ''}
                              label='Batch class end time' />}
                          />
                        </DatePickerWrapper>
                      </Grid>

                    </>}

                  {toSetDate == 'yes' &&
                    <>
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            id='basic-input'
                            autoComplete='OFF'
                            required
                            popperPlacement={popperPlacement}
                            onChange={(date: Date) => handleStartDateChange(date)}
                            maxDate={endDate || null}
                            placeholderText='Batch Start Date'

                            customInput={<CustomInput
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}
                              error={submitted ? startDate ? false : true : false} label='Batch start date'
                              helperText={submitted && !startDate ? 'Batch start date is required' : ''}

                            />}
                          />
                        </DatePickerWrapper>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            id='basic-input'
                            autoComplete='OFF'
                            required
                            popperPlacement={popperPlacement}
                            onChange={(date) => setEndDate(date)}
                            minDate={startDate || new Date()}

                            placeholderText='Batch End Date'
                            customInput={<CustomInput label='Batch end date'
                              InputProps={{
                                endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                              }}
                              error={submitted ? endDate ? false : true : false}
                              helperText={submitted && !endTime ? 'Batch end date is required' : ''}
                            />}
                          />
                        </DatePickerWrapper>
                      </Grid>
                    </>}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='stepper-custom-vertical-personal-select-label'>Batch mode </InputLabel>
                      <Select
                        label='Batch Mode'
                        name='batchMode'
                        id='stepper-custom-vertical-personal-select'
                        value={batchData.batchMode}
                        onChange={changeHandler}
                        error={submitted ? batchData.batchMode ? false : true : false}

                        labelId='stepper-custom-vertical-personal-select-label'
                      >
                        <MenuItem value={'online'}>Online</MenuItem>
                        <MenuItem value={'offline'}>Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right', width: '100%' }}>
              <Box className='demo-space-x'>
                <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' variant='contained' onClick={() => { formSubmit(); setSubmitted(true) }} >
                  Submit
                </Button>

              </Box>
            </DialogActions>
          </Grid>}
      </Dialog>


      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'}
        >
          {responseMessage}
        </Alert>
      </Snackbar>

      {dialogOpen == true ? <Dialog fullWidth open={dialogOpen} onClose={() => setDialogOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <Grid container justifyContent="flex-end">
          <Icon
            className="iconContainer"
            onClick={() => setDialogOpen(false)}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid>
        <DialogContent sx={{ pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
              <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>

          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'right', mb: '10px' }}>
          <Button variant='outlined' color='secondary' onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {

            deleteApiCall();
          }}>
            Change the status to {batchStatus}
          </Button>

        </DialogActions>
      </Dialog> : ""
      }

    </>
  )
}

export default BatchWelcome