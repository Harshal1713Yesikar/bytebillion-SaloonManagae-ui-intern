import React, { useEffect, useState } from 'react';
import * as MiniReact from 'react';
import {
  Typography, Button, Grid,
  Select, FormControl, Paper, InputLabel,
  MenuItem, InputAdornment, Input, Box, DialogContent, OutlinedInput, ButtonBase, Accordion, AccordionSummary, Divider, AccordionDetails, FormLabel, RadioGroup, FormControlLabel, Radio, Icon, Snackbar, Alert

} from '@mui/material';
import { TextField } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { organizationRegistration, organizationDetails, organizationEmailVerification } from 'src/store/APIs/Api';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { AES, enc } from 'crypto-js';
import Card from '@mui/material/Card';


const Item: any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const OrgCreation = ({ setValue, customerDetails, refreshCall, setCreateOrg }: any) => {

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
    organizationLogo: '',
  });
  const [validateEmail, setValidateEmail] = useState(false)

  // const [open, setOpen] = React.useState(false);
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [emailSend, setEmailSend] = useState<string>("OTP")
  const [verification, setVerification] = useState(false)
  const [userOtp, setUserOtp] = useState("")
  const [emailValidator, setEmailValidator] = useState("")
  const [next, setNext] = useState(false)
  const [snackbarColor, setSnackbarColor] = useState<boolean>()
  const [image, setImage] = useState<any>()
  const [error, setError] = useState<any>(null)
  const [open, setOpen] = useState<any>({ open: false, mssg: "" })
  const [base64String, setBase64String] = useState<any>("");
  const [logo, setLogo] = useState<any>("")
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose: any = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



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

    else if ((allValues.organizationEmail).indexOf('@') == -1 || (allValues.organizationEmail).indexOf('.com') == -1) {
      setValidateEmail(true)
    }
    else {
      setValidateEmail(false)
    }

  }, [allValues.organizationEmail])

  const [updateCourseDetails, setUpdateCourseDetails] = useState({
    courseId: '',
    courseName: "",
    courseDescription: "",
    courseFee: 0
    , courseFeeDescription: "",
    maxPaymentInstallment: 2,
    courseDuration: 0
  });

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
        setValidEmail(true)
        setSnackbarColor(true)
        setOpen({ open: true, mssg: `Otp is valid` })


      }
      else if (bytes != userOtp) {
        setSnackbarColor(false)
        setOpen({ open: true, mssg: `Otp is invalid` })
      }
    }
    else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: `Otp is invalid and expired` })
    }
  }

  const orgCategoryHandler = (e: any) => {

    const ctgId = e.target.value.split("%")[0]
    const ctgName = e.target.value.split("%")[1]
    setAllValues({
      ...allValues, "organizationCategoryId": ctgId, "organizationCategoryName": ctgName
    })
  }

  const formSubmit = () => {

    if (allValues.organizationName && allValues.organizationId
      && allValues.organizationPhoneNumber && allValues.organizationCategoryId) {

      dispatch(organizationRegistration({ newOrganizationDetails: allValues, id: customerDetails.customerId, courseDetails: updateCourseDetails })).then((res: any) => {
        setSnackbarColor(true)
        setLogo(allValues.organizationLogo);

        setCreateOrg(true)
        setOpen({ open: true, mssg: `Organization created successfully` })
        if (refreshCall) {
          refreshCall(customerDetails.customerId);
        }
      });
      handleClick();
      setAllValues({
        ...allValues, "organizationName": '',
        "organizationCategoryId": '',
        "organizationAddress": '',
        "organizationEmail": '',
        "temporaryId": '',
        "organizationDetails": '',
        "organizationPhoneNumber": '',
      })

    }

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

    if (allValues.organizationName && allValues.organizationEmail && allValues.organizationId
      && allValues.organizationDetails && allValues.organizationAddress && allValues.organizationPhoneNumber
      && allValues.organizationCategoryName) {
      setNext(true)
    }
    else {
      setNext(false)
    }
  }, [allValues])

  useEffect(() => {

    dispatch(organizationDetails(customerDetails.customerId)).then((res: any) => {
      if (res.payload.data) {
        setCategoryList(res.payload.data.organizations.organizationCategory)
      }
    });
  }, [customerDetails, customerDetails.customerId, dispatch])



  return (
    // <form onSubmit={e => e.preventDefault()}>
    // <Card elevation={0}>
    <form style={{ marginLeft: '50px' }}>
      <Accordion expanded={true} >


        <AccordionDetails>
          <Grid container spacing={6}>
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
                type="number"
                name="organizationPhoneNumber"
                label="Organization phone number"
                onChange={changeHandler}
                required
                value={allValues.organizationPhoneNumber}
                placeholder='+911234568790'
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',

                }}
                variant="outlined"

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
                  value={allValues.organizationId}
                  style={{ marginBottom: "10px" }}
                  fullWidth
                  disabled
                  inputProps={{
                    maxLength: 50,
                  }}
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
                />

              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="inventoryImage"
                  type="file"
                  onChange={handleImageChange}
                  label="Organization Logo"
                  variant="outlined"
                  style={{ marginBottom: '10px' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { borderColor: 'your-border-color', borderWidth: 'your-border-width' },
                  }}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}

              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                  type="email"
                  name="organizationEmail"
                  label="Organization E-mail"
                  onChange={changeHandler}
                  value={allValues.organizationEmail}
                  variant="outlined"
                  inputProps={{
                    maxLength: 50,
                  }}
                  style={{ marginBottom: "10px", width: '85%' }}
                  error={validateEmail}
                  required
                  fullWidth

                />
                {allValues.organizationEmail && !validEmail ?
                  <Button
                    sx={{ marginLeft: 10 }}
                    disabled={validateEmail ? true : false}
                    variant='contained'
                    onClick={() => {
                      emailVerification(),
                        setVerification(true)
                      setEmailSend("Resend")
                    }}>{emailSend}</Button>
                  : null
                }
              </div>
            </Grid>
            {
              verification && !validEmail && <Grid item xs={12} sx={{ display: 'flex' }}>
                <TextField
                  style={{ width: '85%' }}
                  value={userOtp}
                  variant='outlined'
                  onChange={(e) => setUserOtp(e.target.value)}
                />
                <Button sx={{ marginLeft: 10 }} variant='outlined' color={validEmail ? 'success' : 'primary'} onClick={() => handleVerification()} >Verify</Button>
              </Grid>
            }
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                name="organizationAddress"
                label="Organization address "
                required
                onChange={changeHandler}
                minRows={3}
                inputProps={{
                  maxLength: 100,
                }}
                value={allValues.organizationAddress}
                variant="outlined"
                placeholder='1456, Liberty Street'
                style={{ marginBottom: "10px" }}
                multiline
                fullWidth
                helperText="word limit 100"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-static"
                name="organizationDetails"
                label="Organization description "
                required
                onChange={changeHandler}
                minRows={3}
                value={allValues.organizationDetails}
                variant="outlined"
                multiline
                fullWidth
                inputProps={{
                  maxLength: 500,
                }}
                helperText="word limit 500"
              />
            </Grid>

          </Grid>
          <hr />
          <Grid sx={{ textAlign: 'center' }}>
            <Button size='large' type='submit' disabled={validEmail && next ? false : true} variant='contained' sx={{ mr: 4 }} onClick={() => { formSubmit() }}>
              Create
            </Button>
            {/* {logo && <img src={logo} alt="Organization Logo" style={{ maxWidth: '100px', marginTop: '10px' }} />} */}
            {open.open && (
              <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
                <Alert
                  variant="filled"
                  elevation={3}
                  onClose={handleClose}
                  severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
                >
                  {open.mssg}
                </Alert>
              </Snackbar>
            )}
          </Grid>


        </AccordionDetails>
      </Accordion>
    </form>
    // </Card>
  )
}
export default OrgCreation


