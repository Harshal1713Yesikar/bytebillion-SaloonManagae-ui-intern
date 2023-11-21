// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { customDateFormat } from 'src/@core/utils/format'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

interface PickerProps {
  label?: string
}

interface Props {
  toggleAddCustomerDrawer: () => void
  studentValues: Function
  collegeValues: Function
  paymentValues: Function
  installmentPartPaymentNoValues: Function
  fullRollNumber: any
  arrayForInstallmentdetails: any
  coupounDataFormat: any
  courseDataFormat: any
  batchDataFormat: any
  couponApplied: any
  courseValueFee: any
  firstPaymentStatus: any
}



const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))


const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.85rem',
    position: 'absolute',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))








const StudentReviewPage = (props: Props) => {
  // ** Props

  const { toggleAddCustomerDrawer,
    studentValues, collegeValues,
    paymentValues, installmentPartPaymentNoValues,
    fullRollNumber, arrayForInstallmentdetails,
    coupounDataFormat, courseDataFormat,
    batchDataFormat, couponApplied,
    courseValueFee, firstPaymentStatus } = props



  // ** Effect
  useEffect(() => {
    console.log(studentValues())
    console.log(collegeValues(), "collegeValue")
    console.log(paymentValues())
    console.log(installmentPartPaymentNoValues())
    console.log(coupounDataFormat, courseDataFormat, batchDataFormat)
  }, [studentValues, collegeValues, paymentValues, installmentPartPaymentNoValues, coupounDataFormat, courseDataFormat, batchDataFormat])

  let count = 0;
  const installmentDetailsArray = []

  for (const singleObj of arrayForInstallmentdetails) {
    const obj: any = {}
    if (count == 0) {
      count++
      obj.installmentNumber = count;
      obj.paymentStatus = "payed";
      obj.paymetReceiveDate = singleObj.installmentReceivedDate
      obj.paymentNotes = singleObj.installmentPaymentDescription
      obj.receivedPayment = singleObj.installmentReceivedPayment
      installmentDetailsArray.push(obj)
    } else {
      count++
      obj.installmentNumber = count;
      obj.paymentStatus = "due"
      obj.nextpaymetDate = singleObj.installmentReceivedDate
      obj.paymentNotes = singleObj.installmentPaymentDescription
      obj.duePayment = singleObj.installmentReceivedPayment
      installmentDetailsArray.push(obj)
    }
  }

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }



  return (
    <Card>
      <CardContent >
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>

                <Typography
                  variant='h5'
                  sx={{
                    width: 600,
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.45px',
                    fontSize: '1.75rem !important'
                  }}
                >
                  Student review page
                </Typography>
              </Box>

              <Typography sx={{ mb: 4, fontWeight: 500 }}>Student personal details :</Typography>
              <TableContainer sx={{ width: '1100px' }} >
                <Table>
                  <TableBody sx={{ width: '1100px' }}>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '40% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Full name   :</MUITableCell></Grid>

                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().firstName.toUpperCase()} {studentValues().lastName.toUpperCase()}</MUITableCell>
                      </Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Enrollment number :</MUITableCell></Grid>

                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important', }}>{studentValues().enrollmentNumber}</MUITableCell></Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Email  :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().email}</MUITableCell></Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Mobile number :</MUITableCell></Grid>

                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().phoneNumber}</MUITableCell></Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Father name :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersName.toUpperCase()}</MUITableCell></Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Fathers mobile number :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersPhoneNumber}</MUITableCell>
                      </Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Date of birth :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(studentValues().dob).getDate()}`} / {`${new Date(studentValues().dob).getMonth() + 1}`} / {`${new Date(studentValues().dob).getFullYear()}`}</MUITableCell>
                      </Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Address :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().address.toUpperCase()}</MUITableCell>
                      </Grid>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xl={6} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  mt: { sm: 0, xs: 2 },
                  flexDirection: { sm: 'row', xs: 'column' },
                  alignItems: { sm: 'center', xs: 'flex-start' }
                }}
              >
                <Typography sx={{ mr: 2, mb: { sm: 0, xs: 3 }, width: '100px' }}>
                  Date issued:
                </Typography>

                <Typography sx={{ mr: 8, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                  {`${new Date().getDate()}`} / {`${new Date().getMonth() + 1}`} /  {`${new Date().getFullYear()}`}
                </Typography>

              </Box>
            </Box>
          </Grid>
        </Grid>

      </CardContent>

      <Divider
        sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
      />

      {collegeValues().collegeName != "" && collegeValues().collegeCourse != "" && collegeValues().collegeSemester != "" && collegeValues().departmentName != "" &&
        <>
          <CardContent sx={{ marginLeft: '18px' }}>


            <Typography sx={{ mb: 4, fontWeight: 500 }}>College details :</Typography>
            <TableContainer sx={{ width: '1100px' }}>
              <Table>
                <TableBody sx={{ width: '1100px' }}>
                  <TableRow >
                    <Grid sx={{ maxWidth: '60% !important' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  name : </MUITableCell></Grid>
                    <Grid sx={{ width: '76%' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeName.toUpperCase()}</MUITableCell></Grid>
                  </TableRow>
                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                    <Grid sx={{ maxWidth: '60% !important' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  course :</MUITableCell></Grid>
                    <Grid sx={{ width: '76%' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeCourse.toUpperCase()}</MUITableCell>
                    </Grid>
                  </TableRow>
                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                    <Grid sx={{ maxWidth: '60% !important' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  semester :</MUITableCell></Grid>
                    <Grid sx={{ width: '76%' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeSemester}</MUITableCell>
                    </Grid>
                  </TableRow>
                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                    <Grid sx={{ maxWidth: '60% !important' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>Department name :</MUITableCell></Grid>
                    <Grid sx={{ width: '76%' }}>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().departmentName.toUpperCase()}</MUITableCell></Grid>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>

          </CardContent>
          <Divider
            sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
          />
        </>}

      <CardContent sx={{ marginLeft: '18px' }}>

        <Typography sx={{ mb: 4, fontWeight: 500 }}>Course details :</Typography>
        <TableContainer sx={{ width: '1100px' }}>
          {courseDataFormat.map((e: any) => {
            return (
              <>
                <Table>
                  <TableBody sx={{ width: '1100px' }}>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Course name :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important', }}>{e.courseName.toUpperCase()}</MUITableCell>
                      </Grid>
                    </TableRow>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Course fee :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{e.courseFee}</MUITableCell></Grid>
                    </TableRow>
                  </TableBody>
                </Table>
                <Divider
                  sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
                />
              </>
            )
          })}
        </TableContainer >
        <TableContainer sx={{ width: '1100px' }}>
          <Table >
            <TableBody sx={{ width: '1100px' }}>
              <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                <Grid sx={{ maxWidth: '60% !important' }}>
                  <MUITableCell sx={{ pb: '0 !important' }}>Total courses amount :</MUITableCell></Grid>
                <Grid sx={{ width: '76%' }}>
                  <MUITableCell sx={{ pb: '0 !important' }} style={{ marginLeft: '-10px' }}>{courseValueFee}</MUITableCell></Grid>
              </TableRow>
            </TableBody>
          </Table>

        </TableContainer>
      </CardContent>

      <Divider
        sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
      />

      {batchDataFormat.length > 0 &&
        <>
          <CardContent>
            <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
              <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ mb: 4, fontWeight: 500 }}>Batch details :</Typography>
                  <TableContainer sx={{ width: '1100px' }}>
                    {batchDataFormat.map((e: any) => {
                      return (
                        <>
                          <Table>
                            <TableBody sx={{ width: '1100px' }}>
                              <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                <Grid sx={{ maxWidth: '60% !important' }}>
                                  <MUITableCell sx={{ pb: '0 !important' }}>Batch name :</MUITableCell></Grid>
                                <Grid sx={{ width: '76%' }}>
                                  <MUITableCell sx={{ pb: '0 !important' }}>{e.batchName.toUpperCase()}</MUITableCell>
                                </Grid>
                              </TableRow>
                              <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                <Grid sx={{ maxWidth: '60% !important' }}>
                                  <MUITableCell sx={{ pb: '0 !important' }}>Batch mode :</MUITableCell></Grid>
                                <Grid sx={{ width: '76%' }}>
                                  <MUITableCell sx={{ pb: '0 !important' }}>{e.batchMode.toUpperCase()}</MUITableCell>
                                </Grid>
                              </TableRow>
                              {e.batchClassEndTime != "" && e.batchClassStartTime != "" && e.batchStartDate != "" && e.batchEndDate != "" &&
                                <>
                                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Batch class start time :</MUITableCell></Grid>
                                    <Grid sx={{ width: '76%' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{e.batchClassStartTime}</MUITableCell>
                                    </Grid>
                                  </TableRow>
                                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Batch class end time :</MUITableCell></Grid>
                                    <Grid sx={{ width: '76%' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{e.batchClassEndTime}</MUITableCell></Grid>
                                  </TableRow>
                                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Batch start date :</MUITableCell></Grid>
                                    <Grid sx={{ width: '76%' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{e.batchStartDate}</MUITableCell></Grid>
                                  </TableRow>
                                  <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Batch end date :</MUITableCell></Grid>
                                    <Grid sx={{ width: '76%' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>{e.batchEndDate}</MUITableCell></Grid>
                                  </TableRow>
                                </>
                              }

                            </TableBody>
                          </Table>
                          <Divider
                            sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
                          />
                        </>
                      )
                    })}
                  </TableContainer>
                </Box>

              </Grid>
            </Grid>
          </CardContent>
          <Divider
            sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
          />
        </>
      }

      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>Payment details :</Typography>
              <TableContainer sx={{ width: '1100px' }}>
                <Table>
                  <TableBody sx={{ width: '1100px' }}>
                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Grand total payment amount:</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{courseValueFee}</MUITableCell></Grid>
                    </TableRow>
                    {coupounDataFormat.length > 0 &&
                      <>
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <Grid sx={{ maxWidth: '60% !important' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>Applied coupon name :</MUITableCell></Grid>
                          <Grid sx={{ width: '76%' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>{coupounDataFormat[0].couponName}</MUITableCell></Grid>
                        </TableRow>
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <Grid sx={{ maxWidth: '60% !important' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>Discounted payment amount:</MUITableCell></Grid>
                          <Grid sx={{ width: '76%' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>{courseValueFee - couponApplied}</MUITableCell></Grid>
                        </TableRow>
                        <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                          <Grid sx={{ maxWidth: '60% !important' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>After discounted payment amount:</MUITableCell></Grid>
                          <Grid sx={{ width: '76%' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>{couponApplied}</MUITableCell></Grid>
                        </TableRow>
                      </>
                    }

                    <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                      <Grid sx={{ maxWidth: '60% !important' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>Part payment :</MUITableCell></Grid>
                      <Grid sx={{ width: '76%' }}>
                        <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().partPayment == "false" ? "NO" : "YES"}</MUITableCell></Grid>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

          </Grid>
        </Grid>
      </CardContent>

      <Divider
        sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
      />

      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>


            {paymentValues().partPayment == "false" ?
              <>
                <Typography sx={{ mb: 4, fontWeight: 500 }}>Payment info :</Typography>


                <TableContainer sx={{ width: '1100px' }}>
                  <Table>
                    <TableBody sx={{ width: '1100px' }}>
                      <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                        {firstPaymentStatus == "payed" ?
                          <Grid sx={{ maxWidth: '40% !important' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>Total recieved amount:</MUITableCell></Grid>
                          :
                          <Grid sx={{ maxWidth: '40% !important' }}>
                            <MUITableCell sx={{ pb: '0 !important' }}>Next recieved amount:</MUITableCell></Grid>
                        }
                        <Grid sx={{ width: '76%' }}>
                          <MUITableCell sx={{ pb: '0 !important' }}> {couponApplied}</MUITableCell></Grid>
                      </TableRow>
                      <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                        <Grid sx={{ maxWidth: '60% !important' }}>
                          <MUITableCell sx={{ pb: '0 !important' }}>Payment date :</MUITableCell></Grid>
                        <Grid sx={{ width: '76%' }}>
                          <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getDate()}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getMonth() + 1}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getFullYear()}`}</MUITableCell>
                        </Grid>
                      </TableRow>
                      <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                        <Grid sx={{ maxWidth: '60% !important' }}>
                          <MUITableCell sx={{ pb: '0 !important' }}>Payment description :</MUITableCell></Grid>
                        <Grid sx={{ width: '76%' }}>
                          <MUITableCell sx={{ pb: '0 !important' }}> {installmentPartPaymentNoValues().paymentDescription.toUpperCase()}</MUITableCell>
                        </Grid>
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>

              </> :
              <>

                {installmentDetailsArray.map((installmentDetailsData: any) => {
                  console.log(installmentDetailsData, "singleObj")
                  if (installmentDetailsData.installmentNumber == 1) {
                    return (
                      <>
                        <Typography sx={{ mb: 4, fontWeight: 500 }}>Installment {installmentDetailsData.installmentNumber} :</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <TableContainer sx={{ width: '1100px' }}>
                            <Table>
                              <TableBody sx={{ width: '1100px' }}>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  {firstPaymentStatus == "payed" ?
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Total recieved amount:</MUITableCell></Grid>
                                    :
                                    <Grid sx={{ maxWidth: '60% !important' }}>
                                      <MUITableCell sx={{ pb: '0 !important' }}>Next recieved amount:</MUITableCell></Grid>
                                  }
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData.receivedPayment}</MUITableCell></Grid>

                                </TableRow>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  <Grid sx={{ maxWidth: '60% !important' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>Payment date :</MUITableCell></Grid>
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(installmentDetailsData.paymetReceiveDate).getDate()}`} / {`${new Date(installmentDetailsData.paymetReceiveDate).getMonth() + 1}`} / {`${new Date(installmentDetailsData.paymetReceiveDate).getFullYear()}`}</MUITableCell></Grid>
                                </TableRow>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  <Grid sx={{ maxWidth: '60% !important' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>Payment description :</MUITableCell></Grid>
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData.paymentNotes} </MUITableCell>
                                  </Grid>
                                </TableRow>

                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <Typography sx={{ mb: 4, fontWeight: 500, pt: 5 }}>Installment {installmentDetailsData.installmentNumber} :</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <TableContainer sx={{ width: '1100px' }}>
                            <Table>
                              <TableBody sx={{ width: '1100px' }}>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  <Grid sx={{ maxWidth: '60% !important' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>Next payment amount:</MUITableCell></Grid>
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData.duePayment}</MUITableCell>
                                  </Grid>
                                </TableRow>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  <Grid sx={{ maxWidth: '60% !important' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>Next payment date :</MUITableCell></Grid>
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(installmentDetailsData.nextpaymetDate).getDate()}`} / {`${new Date(installmentDetailsData.nextpaymetDate).getMonth() + 1}`} / {`${new Date(installmentDetailsData.nextpaymetDate).getFullYear()}`}</MUITableCell>
                                  </Grid>
                                </TableRow>
                                <TableRow sx={{ display: 'flex !important', justifyContent: 'space-between' }}>
                                  <Grid sx={{ maxWidth: '60% !important' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>Payment description :</MUITableCell></Grid>
                                  <Grid sx={{ width: '76%' }}>
                                    <MUITableCell sx={{ pb: '0 !important' }}>{installmentDetailsData.paymentNotes} </MUITableCell></Grid>
                                </TableRow>

                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>

                      </>
                    )
                  }
                })}
              </>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StudentReviewPage
