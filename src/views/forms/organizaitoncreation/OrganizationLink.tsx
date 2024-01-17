import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LinkIcon from '@mui/icons-material/Link';
import { AES, enc } from 'crypto-js';
import { Button, Snackbar, Alert } from '@mui/material';
import { acceptInvitation, addUser, listAllRoles } from 'src/store/APIs/Api';
import { Router, useRouter } from 'next/router';

export default function JoinUsingLink({ recall, setRecall }: any) {

  const router = useRouter();
  const [encrypted, setEncrypted] = React.useState('')
  const [customerId, setCustomerId] = React.useState('')
  const [temporaryId, setTemporaryId] = React.useState('')
  const [organizationId, setOrganizationId] = React.useState('')
  const [timeStamp, setTimeStamp] = React.useState('')
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [userId, setUserId] = React.useState('')

  React.useEffect(() => {
    if (encrypted) {
      try {
        const bytes = AES.decrypt(encrypted.toString(), `test key`).toString(enc.Utf8)
        if (bytes) {
          const data = bytes.split("/")
          setTimeStamp(data[3])
          setCustomerId(data[0])
          setOrganizationId(data[1])
          setTemporaryId(data[2])
        }
        else {
          setMessage('The Link is wrong or has expired')
          setSnackOpen(true)
        }
      }
      catch (err: any) {
        console.log(err)
      }
    }
  }, [encrypted])

  React.useEffect(() => {
    const data = localStorage.getItem('userDetails');
    if (data) {
      // setUserId(JSON.parse(data).payload?.customerId)
            setUserId(JSON.parse(data)?.customerId)

    }
  }, [])

  const validateEncryptionText = () => {
    const details: any = localStorage.getItem('userDetails')
    const id = JSON.parse(details).payload.customerId
    if (timeStamp && encrypted && id) {
      const time = new Date().getTime()
      const timeDiff = Math.abs(time - Number(timeStamp))
      if (timeDiff / (60000 * 60) > 1) {
        setMessage('The Link is wrong or has expired')
        setSnackOpen(true)
      }
      else {
        const data = {
          "customerId": customerId,
          "organizationId": organizationId,
          "userId": id,
          "temporaryId": temporaryId
        }
        acceptInvitation({ ...data }).then((res: any) => {
          if (res) {
            setMessage(res.data.message)
            setSnackOpen(true)
            if (res.data.message == "Invitation Accepted Successfully") {
              setTimeout(() => {
                setRecall(!recall)
              }, 2000);
            }
          }
        })
      }
    }
    else {
    }
  }

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="input-with-icon-textfield"
          label="Enter invitation link"
          sx={{ borderRadius: '300px!important' }}
          placeholder='www.karomanage.com/abc'
          value={encrypted}
          onChange={(e) => { setEncrypted(e.target.value) }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant='contained' onClick={() => validateEncryptionText()}>Join</Button>
        </div>
      </Box>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={message ? message.includes('Success') ? 'success' : 'error' : 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
