// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
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
  coachingValues: Function
  paymentValues: Function
  installmentPartPaymentNoValues: Function
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








const PrintPage = (props: Props) => {
  // ** Props
  const { studentValues, collegeValues, coachingValues, paymentValues, installmentPartPaymentNoValues } = props



  // ** Effect
  useEffect(() => {
    console.log(studentValues())
    console.log(collegeValues())
    console.log(coachingValues())
    console.log(paymentValues())
    console.log(installmentPartPaymentNoValues())
  }, [studentValues, collegeValues, coachingValues, paymentValues, installmentPartPaymentNoValues])

  // ** Hook
  const theme = useTheme()

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 100)
  }, [])




  return (
    <Card>
      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>

                <Typography
                  variant='h5'
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.45px',
                    fontSize: '1.75rem !important'
                  }}
                >
                  Student Review Page
                </Typography>
              </Box>

              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Student Personal Details :</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Full Name   :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().firstName.toUpperCase()} {studentValues().lastName.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Enrollment Number :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().enrollmentNumber}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Email  :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().email}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Mobile Number :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().phoneNumber}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Father Name :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersName.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Fathers Mobile Number :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersPhoneNumber}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Date Of Birth :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(studentValues().dob).getDate()}`} / {`${new Date(studentValues().dob).getMonth() + 1}`} / {`${new Date(studentValues().dob).getFullYear()}`}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Address :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().address.toUpperCase()}</MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
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
                <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                  Date Issued:
                </Typography>

                <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
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

      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>College Details :</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  Name : </MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeName.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  Course :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeCourse.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>College  Semester :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeSemester}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Department Name :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().departmentName.toUpperCase()}</MUITableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Coaching Details :</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Course Name  :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().courseName.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Course Duration :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().courseDuration.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Mode Of Class :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().modeOfClass.toUpperCase()}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Roll Number :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().rollNumber.toUpperCase()}</MUITableCell>
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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Payment Details :</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Total Payment Amount:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().totalPaymentAmount}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Part Payment :</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().partPayment.toUpperCase()}</MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

          </Grid>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>

            {paymentValues().partPayment == "false" ? <>
              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Payment Info :</Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                        <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().totalPaymentAmount}</MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                        <MUITableCell sx={{ pb: '0 !important' }}>{installmentPartPaymentNoValues().paymentDescription.toUpperCase()}</MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                        <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getDate()}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getMonth() + 1}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getFullYear()}`}</MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

            </> : ""}
          </Grid>
        </Grid>
      </CardContent>






    </Card>
  )
}

export default PrintPage
