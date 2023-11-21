import React, { useState, useEffect } from 'react'
import {
  Button, Table, TableHead, TableRow, TableCell, TableBody, Card
} from '@mui/material';
import { createEmailNotification, updateEmailNotification, listEmailNotification } from 'src/store/APIs/Api';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


const MailSender = ({ value, setIsFormComplete }: any) => {
  const Mail_Discription = [
    {
      title: "Welcome mail for new customer",
      name: "welcomeMailForNewCustomer",
    },
    {
      title: "User add using user management",
      name: "userAddUsingUserManagement",
    },
    {
      title: "Welcome mail to employee",
      name: "welcomeMailToEmployee",
    },
    {
      title: "Delete user mail",
      name: "deleteUserMail",
    },
    {
      title: "Enquiry submission mail to student",
      name: "enquirySubmissionMailToStudent",
    },
    {
      title: "Welcome mail to student with fee slip",
      name: "welcomeMailToStudentWithFeeSlip",
    },
    {
      title: "Student fee receipt",
      name: "studentFeeReceipt",
    },
    {
      title: "Upcoming fee reminder to Student mail",
      name: "upcomingFeeReminderToStudentMail",
    },
    {
      title: "Overdue fee reminder to Student mail",
      name: "overdueFeeReminderToStudentMail",
    },

    {
      title: "Mail for weekly report for coaching revenue",
      name: "weeklyReportCoachingRevenueMail",
    },
    {
      title: "Mail for month report for coaching revenue",
      name: "monthlyReportCoachingRevenueMail",
    },
    {
      title: "Mail for 6-month report for coaching revenue",
      name: "sixMonthReportCoachingRevenueMail",
    },
    {
      title: "Mail for 1-year report for coaching revenue",
      name: "oneYearReportCoachingRevenueMail",
    },
  ];

  const labelStyle = { marginRight: '60px' };
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const [responseMessage, setResponseMessage] = useState<string>("")
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [openAlert, setOpenAlert] = useState<any>({ open: "", msg: "" })
  const [snackbarColor, setSnackbarColor] = useState(true)

  const [user, setUser] = useState<any>()
  const [open, setOpen] = useState<any>(false)
  const [updateButton, setUpdateButton] = useState<any>(false)


  const handleCloseAlert = () => {
    if (openAlert.open == true) {
      setOpenAlert({ open: false, mssg: "" })
    }
  }
  useEffect(() => {
    const userDetails = localStorage.getItem('organization');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const listApi = () => {
    listEmailNotification(user.customerId, user.organizationId).then((res) => {
      console.log(res, "reszDAta")
      if (res.message === "Success") {
        console.log(res.data);
        setSelectedOptions(res.data);
        setOpen(true)
      } else if (res.message === "Data not found") {
        setSnackbarColor(false)
        setSnackbaropen(true)
        setResponseMessage("Data not found")
        setOpen(false)
      }
    });
  }

  useEffect(() => {
    if (user) {
      listApi()
    }
  }, [user]);

  const handleOptionChange = (event: any) => {
    setIsFormComplete(false)
    const { name, value } = event.target;
    setSelectedOptions((prevState: any) => ({ ...prevState, [name]: value == "yes" ? true : false }));
    
  };

  const submitHandle = () => {
    

    if ((selectedOptions.deleteUserMail === true || selectedOptions.deleteUserMail === false)
      && (selectedOptions.enquirySubmissionMailToStudent == true || selectedOptions.enquirySubmissionMailToStudent == false)
      && (selectedOptions.studentFeeReceipt == true || selectedOptions.studentFeeReceipt == false)
      && (selectedOptions.welcomeMailToStudentWithFeeSlip == true || selectedOptions.welcomeMailToStudentWithFeeSlip == false)
      && (selectedOptions.upcomingFeeReminderToStudentMail == true || selectedOptions.upcomingFeeReminderToStudentMail == false)
      && (selectedOptions.overdueFeeReminderToStudentMail == true || selectedOptions.overdueFeeReminderToStudentMail == false)
      && (selectedOptions.weeklyReportCoachingRevenueMail == true || selectedOptions.weeklyReportCoachingRevenueMail == false)
      && (selectedOptions.monthlyReportCoachingRevenueMail == true || selectedOptions.monthlyReportCoachingRevenueMail == false)
      && (selectedOptions.sixMonthReportCoachingRevenueMail == true || selectedOptions.sixMonthReportCoachingRevenueMail == false)
      && (selectedOptions.oneYearReportCoachingRevenueMail == true || selectedOptions.oneYearReportCoachingRevenueMail == false)) {
      createEmailNotification(selectedOptions, user.customerId, user.organizationId).then((result) => {
        setOpen(true)
        setSnackbarColor(true)
        setSnackbaropen(true)
        setResponseMessage("Entry created successfully")
        setIsFormComplete(true)
        listApi()
      }).catch((err) => {
        console.log(err)
      });
    } else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Required to fill all checkbox")
    }
  }

  const updateHandle = () => {
  
    updateEmailNotification(selectedOptions, user.customerId, user.organizationId).then((res) => {
      setSelectedOptions(res?.data?.data)
      // listApi()
    })
    setSnackbarColor(true)
    setSnackbaropen(true)
    setResponseMessage("Entries updated successfully")
    setUpdateButton(false)
    setIsFormComplete(true)
  }
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mail_Description</TableCell>
            <TableCell>Do you want to send the mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Mail_Discription.map((mail, index) => (
            <TableRow key={index}>
              <TableCell>{mail.title}</TableCell>
              {mail.title == "Welcome mail for new customer" || mail.title == "User add using user management" || mail.title == "Welcome mail to employee" ?
                <TableCell>
                  <label style={labelStyle} >
                    <input
                      type="radio"
                      name={mail.name}
                      value="yes"
                      disabled={true}
                      checked={selectedOptions[mail.name] = true}
                      onChange={(event) => handleOptionChange(event)}
                    />
                    Yes
                  </label>
                  <label style={labelStyle}>
                    <input
                      type="radio"
                      name={mail.name}
                      value="no"
                      disabled={true}
                      checked={selectedOptions[mail.name] = false}
                      onChange={(event) => handleOptionChange(event)}
                    />
                    No
                  </label>
                </TableCell> :
                <TableCell>
                  <label style={labelStyle} >
                    <input
                      type="radio"
                      name={mail.name}
                      value="yes"
                      onClick={() => setUpdateButton(true)}
                      checked={selectedOptions[mail.name] === true}
                      onChange={(event) => handleOptionChange(event)}
                    />
                    Yes
                  </label>
                  <label style={labelStyle}>
                    <input
                      type="radio"
                      name={mail.name}
                      value="no"
                      onClick={() => setUpdateButton(true)}
                      checked={selectedOptions[mail.name] === false}
                      onChange={(event) => handleOptionChange(event)}
                    />
                    No
                  </label>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open ? (
        <Button sx={{ float: "right" }} onClick={updateHandle} disabled={!updateButton}>Update</Button>
      ) : (
        <Button sx={{ float: "right" }} onClick={submitHandle}>Submit</Button>
      )}
      {
        openAlert.open == true &&
        <Snackbar open={openAlert.open} onClose={handleCloseAlert} autoHideDuration={3000}>
          <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
            {openAlert.mssg}
          </Alert>
        </Snackbar>
      }

      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </Card>
  )
}
export default MailSender