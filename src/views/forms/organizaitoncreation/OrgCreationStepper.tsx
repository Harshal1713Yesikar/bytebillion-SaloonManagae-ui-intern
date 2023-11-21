// ** React Imports
import { ChangeEvent, Fragment, useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { AES, enc } from 'crypto-js';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import MuiStep, { StepProps } from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { karomanageWelcomeMail, organizationDetails, organizationEmailVerification, organizationRegistration } from 'src/store/APIs/Api'
import { AccordionDetails, Alert, Snackbar } from '@mui/material'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const steps = [
  {
    icon: 'bx:home',
    title: 'Organization Details',
    subtitle: 'Enter your Organization Details'
  }

]

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '&:not(.Mui-completed)': {
    '& .step-title': {
      color: theme.palette.text.secondary
    },
    '& + svg': {
      color: theme.palette.text.disabled
    }
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: theme.palette.text.disabled
    },
    '& + svg': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiStepLabel-label.Mui-active .step-title': {
    color: theme.palette.primary.main
  }
}))

const OrgCreationStepper = ({ customerDetails, refreshCall }: any) => {
  // ** States

  const [activeStep, setActiveStep] = useState<number>(0)
  const [language, setLanguage] = useState<string[]>([])
  const [logo, setLogo] = useState<any>("")
  const [state, setState] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      formSubmit();
    }

  }
  const handleReset = () => {

    setCourseDetails({
      ...courseDetails, "courseDescription": '',
      "courseFee": 0,
      "courseName": '',
      "courseFeeDescription": "",
      "maxPaymentInstallment": 0,
    })
  }


  // Handle Language
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }
  const dispatch = useDispatch();
  let mainId = ''
  const [categoryList, setCategoryList] = useState([]);
  const [allValues, setAllValues] = useState({
    organizationId: ``,
    organizationName: "",
    organizationDetails: "",
    organizationCategoryId: "",
    organizationCategoryName: "",
    temporaryId: '',
    organizationPhoneNumber: '',
    organizationEmail: '',
    organizationAddress: '',
    organizationLogo: ''
  });
  const [emailValidator, setEmailValidator] = useState("")
  const [verification, setVerification] = useState(false)
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [image, setImage] = useState<any>()
  const [error, setError] = useState<any>(null)
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseDescription: "",
    courseFee: 0
    , courseFeeDescription: "",
    maxPaymentInstallment: 0,
    courseDuration: 0
  });
  const [validateEmail, setValidateEmail] = useState(false)
  const [open, setOpen] = useState(false);
  const [userOtp, setUserOtp] = useState("")
  const [emailSend, setEmailSend] = useState<string>("OTP")
  const [next, setNext] = useState(false)
  const handleClick = () => {
    setOpen(true);
  };
  const [base64String, setBase64String] = useState<any>("");
  // useEffect(() => {

  //   const reader = new FileReader();
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  //   reader.onloadend = () => {
  //     const base64String = reader.result;
  //     setBase64String(base64String)

  //   };

  // }, [image])


  const handleClose: any = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const courseChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value })
  }

  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })


  }

  const handleImageChange = (e: any) => {

    setImage(e.target.files[0])

    setError(null);
    const selectedFile = e.target.files[0];


    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64String(base64String);
        setAllValues({ ...allValues, organizationLogo: base64String });
      };
    }
  }

  if (allValues.organizationName) {
    const id = allValues.organizationName.split(" ");
    const idLength = id.length

    for (let i = 0; i < idLength; i++) {
      if (id[i][0] === undefined) {
        continue;
      }
      mainId += id[i][0];
    }
  }

  useEffect(() => {
    setValidEmail(false)
    setUserOtp("")
    if (allValues.organizationEmail.length == 0) {
      setValidateEmail(false)
    }

    else if ((allValues.organizationEmail).indexOf('@') == -1 || (allValues.organizationEmail).indexOf('.') == -1) {
      setValidateEmail(true)
    }
    else {
      setValidateEmail(false)
    }
  }, [allValues.organizationEmail])



  const emailVerification = () => {
    const chars = '0123456789';
    let uniqueID = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      uniqueID += chars[randomIndex];
    }

    const cipherText = AES.encrypt(`${uniqueID}`, `test key`).toString();
    localStorage.setItem('sneat-icon', cipherText)
    setTimeout(() => {
      localStorage.removeItem('sneat-icon')
    }, 600000);

    organizationEmailVerification({ organizationName: allValues.organizationName, validationCode: uniqueID, organizationEmail: allValues.organizationEmail })
  }
  const handleVerification = () => {
    const decrypted: any = localStorage.getItem('sneat-icon')
    if (decrypted) {


      const bytes = AES.decrypt(decrypted.toString(), `test key`).toString(enc.Utf8)
      if (bytes == userOtp) {
        setEmailValidator("OTP is valid")
        setOpen(true)
        setValidEmail(true)

      }
      else if (bytes != userOtp) {
        setEmailValidator("OTP is invalid")
        setOpen(true)
        setValidEmail(false)
      }
    }
    else {
      setEmailValidator("OTP is invalid or expired")
      setOpen(true)
      setValidEmail(false)
    }
  }

  const formSubmit = () => {
    if (allValues.organizationName !== ''
      && allValues.organizationId !== ''
      && allValues.organizationPhoneNumber
      && allValues.organizationEmail) {
      // setNext(true)
      setEmailValidator("Successfully created new Organization")
      console.log(allValues, "allValues")
      dispatch(organizationRegistration({ newOrganizationDetails: allValues, id: customerDetails.customerId, courseDetails: courseDetails })).then((res: any) => {
        setOpen(true)
        setLogo(allValues.organizationLogo);
        karomanageWelcomeMail(allValues.organizationName, allValues.organizationEmail)
        setAllValues({
          organizationId: ``,
          organizationName: "",
          organizationDetails: "",
          organizationCategoryId: "",
          organizationCategoryName: "",
          temporaryId: '',
          organizationPhoneNumber: '',
          organizationEmail: '',
          organizationAddress: '',
          organizationLogo: ''
        })
        setCourseDetails({
          ...courseDetails, "courseDescription": '',
          "courseFee": 0,
          "courseName": '',
          "courseFeeDescription": "",
          "maxPaymentInstallment": 0,
        })
        if (refreshCall) {
          refreshCall(customerDetails.customerId);
        }
      });
      handleClick();
    }
    else {
      setEmailValidator("In ")
      setOpen(true)

      // setNext(false)
    }
  }

  useEffect(() => {
    if (allValues.organizationName
      && allValues.organizationId
      && allValues.organizationPhoneNumber
      && allValues.organizationEmail
      && allValues.organizationCategoryName
      && allValues.organizationAddress
      && allValues.organizationDetails) {
      setNext(true)
    }
    else {
      setNext(false)
    }
  }, [allValues])

  const orgCategoryHandler = (e: any) => {
    const ctgId = e.target.value.split("%")[0]
    const ctgName = e.target.value.split("%")[1]
    setAllValues({
      ...allValues, "organizationCategoryId": ctgId, "organizationCategoryName": ctgName
    })
  }



  useEffect(() => {
    if (allValues.organizationName) {
      if (mainId) {
        let uniqueId = ''
        const chars = "0123456789"
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          uniqueId += chars[randomIndex];
        }

        setAllValues({ ...allValues, "organizationId": `${mainId.toUpperCase()}-${uniqueId}` })
      }
    }
    else {
      setAllValues({ ...allValues, "organizationId": `-` })
    }
  }, [allValues.temporaryId, mainId, allValues.organizationName.split("-").length])


  useEffect(() => {
    dispatch(organizationDetails(customerDetails.customerId)).then((res: any) => {
      if (res.payload.data) {
        setCategoryList(res.payload.data.organizations.organizationCategory)
      }
    });



  }, [customerDetails, customerDetails.customerId, dispatch])

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fragment>

            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Organization category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='organizationCategoryId'
                      style={{ marginBottom: "10px" }}
                      required
                      value={`${allValues.organizationCategoryId}%${allValues.organizationCategoryName}`}
                      label="Organization category"
                      onChange={orgCategoryHandler}
                      inputProps={{
                        maxLength: 50,
                      }}
                    >
                      {categoryList && categoryList.length > 0 ? (
                        categoryList.map((organization: any, index: any) => (
                          <MenuItem key={index} value={`${organization.organizationCategoryId}%${organization.organizationCategoryName}`}>
                            {organization.organizationCategoryName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          No data found
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    name="organizationName"
                    onChange={changeHandler}
                    label="Organization name"
                    style={{ marginBottom: "10px" }}
                    value={allValues.organizationName}
                    inputProps={{
                      maxLength: 50,
                    }}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        display: 'none'
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield'
                      }
                    }}
                    type="number"
                    name="organizationPhoneNumber"
                    label="Organization phone number"
                    onChange={changeHandler}
                    value={allValues.organizationPhoneNumber}
                    placeholder='+911234568790'
                    required
                    error={allValues.organizationPhoneNumber.length > 13 ? true : false}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0,
                      max: 10000,
                    }}
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">Organization Id</InputLabel>
                    <OutlinedInput
                      name="temporaryId"
                      placeholder='Organization Id'
                      label="Organization Id"
                      required
                      onChange={changeHandler}
                      disabled
                      value={allValues.organizationId.split("-")[1]}
                      style={{ marginBottom: "10px" }}
                      fullWidth
                      startAdornment={<InputAdornment position="start">{mainId ? mainId.toUpperCase() + ' - ' : ''}</InputAdornment>}
                    />

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField name="inventoryImage" type='file' onChange={handleImageChange} />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {/* {base64String && <img src={base64String} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />} */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                      type="email"
                      name="organizationEmail"
                      label="Organization E-mail"
                      required
                      onChange={changeHandler}
                      value={allValues.organizationEmail}
                      variant="outlined"
                      style={{ marginBottom: "10px" }}
                      error={validateEmail}
                      sx={{ width: '88%' }}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                    <Button
                      disabled={!allValues.organizationEmail ? true : validateEmail ? true : false}
                      variant='contained'
                      onClick={() => {
                        emailVerification(),
                          setVerification(true)
                        setEmailSend("Resend")
                      }}>{emailSend}</Button>
                  </div>
                </Grid>
                {
                  verification && !validEmail && <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      sx={{ width: '88%' }}
                      value={userOtp}
                      onChange={(e) => setUserOtp(e.target.value)}
                    />
                    <Button
                      variant='outlined'
                      sx={{ marginLeft: 10 }}
                      color={validEmail ? 'success' : 'primary'}
                      onClick={() => handleVerification()} >Verify</Button>
                  </Grid>
                }
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-multiline-static"
                    name="organizationAddress"
                    label="Organization address "
                    onChange={changeHandler}
                    required
                    minRows={3}
                    inputProps={{
                      maxLength: 150,
                    }}
                    value={allValues.organizationAddress}
                    variant="outlined"
                    placeholder='1456, Liberty Street'
                    style={{ marginBottom: "10px" }}
                    multiline
                    fullWidth
                    helperText="max 150 words"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-multiline-static"
                    name="organizationDetails"
                    required
                    label="Organization description "
                    onChange={changeHandler}
                    minRows={3}
                    value={allValues.organizationDetails}
                    variant="outlined"
                    multiline
                    fullWidth
                    inputProps={{
                      maxLength: 500,
                    }}
                    helperText="max 500 words"
                  />
                </Grid>

              </Grid>
            </AccordionDetails>

          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Course name'
                required
                placeholder='HTML,CSS,back-end...'
                value={courseDetails.courseName}
                name='courseName'
                onChange={courseChangeHandler}
                autoComplete='OFF'
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-custom-vertical-personal-select-label'>Course Duration</InputLabel>
                <Select
                  label='Course duration   '
                  required
                  value={courseDetails.courseDuration}
                  name='courseDuration'
                  autoComplete='OFF'
                  id='stepper-custom-vertical-personal-select'
                  onChange={courseChangeHandler}
                  labelId='stepper-custom-vertical-personal-select-label'
                >
                  <MenuItem value={1}>1 months</MenuItem>
                  <MenuItem value={3}>3 months</MenuItem>
                  <MenuItem value={6}>6 months</MenuItem>
                  <MenuItem value={9}>9 months</MenuItem>
                  <MenuItem value={12}>1 year</MenuItem>
                  <MenuItem value={24}>2 year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='courseDescription'
                label='Course description'
                placeholder='Course description'
                autoComplete='OFF'
                required
                value={courseDetails.courseDescription}
                onChange={courseChangeHandler}
                minRows={2}
                inputProps={{
                  maxLength: 500,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Course fee'
                required
                placeholder='20000...'
                autoComplete='OFF'
                value={courseDetails.courseFee}
                name='courseFee'
                onChange={courseChangeHandler}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0,

                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-custom-vertical-personal-select-label'>Max Installments</InputLabel>
                <Select
                  label='Max installment   '
                  autoComplete='OFF'
                  value={courseDetails.maxPaymentInstallment}
                  name='maxPaymentInstallment'
                  id='stepper-custom-vertical-personal-select'
                  onChange={courseChangeHandler}
                  labelId='stepper-custom-vertical-personal-select-label'
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='courseFeeDescription'
                label='Course fee description'
                placeholder='Course fee description'
                required
                autoComplete='OFF'
                value={courseDetails.courseFeeDescription}
                onChange={courseChangeHandler}
                minRows={2}
                inputProps={{
                  maxLength: 500,
                }}
              />
            </Grid>
            {/* <Button color='primary' onClick={formSubmit}>create </Button> */}
          </Fragment>
        )

      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>

          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            {/* {logo && <img src={logo} alt="Organization Logo" style={{ maxWidth: '100px', marginTop: '10px' }} />} */}
          </Box>
        </>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', mt: -7, justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <div >
                {
                  <Button sx={{ marginRight: 6 }} disabled={validEmail && next ? false : true} size='large' variant='contained' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                }

              </div>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <>
      <Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                >
                  {steps.map((step, index) => {
                    return (
                      <Step key={index}>
                        <StepLabel StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <CustomAvatar
                              variant='rounded'
                              skin={activeStep === index ? 'filled' : 'light'}
                              color={activeStep >= index ? 'primary' : 'secondary'}
                              sx={{
                                mr: 2.5,
                                borderRadius: 1,
                                ...(activeStep === index && {
                                  boxShadow: theme => `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                                })
                              }}
                            >
                              <Icon icon={step.icon} />
                            </CustomAvatar>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
            </StepperHeaderContainer>
            <Divider sx={{ m: '0 !important' }} />

            <CardContent sx={{ width: '100%' }}>{renderContent()}</CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                >

                </Stepper>
              </StepperWrapper>
            </StepperHeaderContainer>
          </Card>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={emailValidator?.includes("invalid") ? "error" : "success"} sx={{ width: '100%' }}>
            {emailValidator}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  )
}

export default OrgCreationStepper
