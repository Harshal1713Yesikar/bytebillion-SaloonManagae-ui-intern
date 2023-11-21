// ** MUI Import
import { Alert, Card } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import AlertTitle from '@mui/material/AlertTitle'
import { makeStyles } from '@material-ui/core'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import CountUp from 'react-countup'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

import { StudentOverDuePaymentList, studentPaymentOverDueMail } from 'src/store/APIs/Api'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

interface TableData {
  email: string
  amount: number
  avatarSrc?: string
  customerName: string
  status: 'paid' | 'failed' | 'pending'
  paidBy: 'visa' | 'paypal' | 'mastercard'
}

const statusObj = {
  failed: <CustomChip rounded size='small' skin='light' color='error' label='Over Due' sx={{ fontWeight: 500 }} />
}
function Item(props: any) {
  const { sx, ...other } = props

  return (
    <Box
      sx={{
        p: 3,
        m: 1,
        bgcolor: theme => (theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100'),
        color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        borderColor: theme => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '1.100rem',
        fontWeight: '700',
        ...sx
      }}
      {...other}
    />
  )
}
Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
}

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: 'initial'
  }
})

const OverDuePaymentTable = () => {
  // ** Hooks & Var
  const theme = useTheme()
  const { settings } = useSettings()
  const { direction } = settings
  const dispatch = useDispatch()
  const [user, setUser] = useState<any>()
  const router = useRouter()
  const [open, setOpen] = useState<any>(false)
  const [showData, setShowData] = useState<any>()
  const [sent, setSent] = useState<boolean>(false)
  const [OverDuePayment, setOverDuePayment] = useState<any>(0)
  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])
  const paidByObj = {
    visa: (
      <Avatar
        alt='visa'
        variant='rounded'
        sx={{ width: 50, height: 29 }}
        src={`/images/cards/visa-${theme.palette.mode}.png`}
      />
    ),
    paypal: (
      <Avatar
        alt='paypal'
        variant='rounded'
        sx={{ width: 50, height: 29 }}
        src={`/images/cards/paypal-${theme.palette.mode}.png`}
      />
    ),
    mastercard: (
      <Avatar
        alt='mastercard'
        variant='rounded'
        sx={{ width: 50, height: 29 }}
        src={`/images/cards/mastercard-${theme.palette.mode}.png`}
      />
    )
  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (user) {
      const DateStart = ''
      const DateEnd = ''

      let dataInfo = 0

      dispatch(
        StudentOverDuePaymentList({
          customerId: user.customerId,
          organizationId: user.organizationId
        })
      )
        .then((res: any) => {
          setShowData(res.payload.data)
          res?.payload.data?.map((payments: any, index: any) => {
            payments.paymentForecast.map((i: any) => {
              return <>{(dataInfo = dataInfo + Number(i.Details.duePayment))}</>
            })
            setOverDuePayment(dataInfo)
          })
        })
        .catch((err: any) => console.log(err, 'error'))
    }
  }, [user])

  const overDueMailCall = () => {
    showData.map((val: any, index: any) => {
      let installmentArray = val.paymentForecast.map((v: any, i: number) => {
        return ({
          overDueDate: v.Details.nextpaymetDate,
          overDueAmount: v.Details.duePayment,
        })
      })

      studentPaymentOverDueMail({
        courseName: '',
        studentName: `${val.studentFirstName} ${val.studentLastName}`,
        studentEmail: val.studentEmail,
        installmentsArray: installmentArray,
        organizationName: user.organizationName,
        organizationEmail: user.organizationEmail,
        organizationLogo: organizationLogo
      })
      setSent(true)
      setOpen(true)

    })
  }

  const classes = useStyles()

  return (
    <>
      <Card sx={{ height: 600, overflowY: 'auto', overflowX: 'auto' }}>
        <Box sx={{ mb: 4, flexWrap: 'wrap' }}>
          <CardHeader
            title={' Over due student details'}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': { mb: 0 },
              '& .MuiCardHeader-content': { mb: [2, 0] }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              style={{ marginLeft: '25px', display: 'flex', alignItems: 'center', color: 'red' }}
              sx={{ mr: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'red ' } }}
            >
              <Icon icon='bxs:circle' fontSize='0.75rem' />
              <Item>
                <label>
                  Over all due payment : <span style={{ color: 'red', marginLeft: '8px' }}>&#8377;</span>
                </label>
                <CountUp
                  style={{ color: 'red' }}
                  start={0.01}
                  end={OverDuePayment}
                  duration={1}
                  useEasing={true}
                  separator=','
                />
              </Item>
            </Box>
            {showData?.length > 0 ?
              <Button
                onClick={() => {
                  overDueMailCall()
                }}
                variant='contained'
                color='primary'
                disabled={sent ? true : false}
                sx={{ marginRight: 4, height: 35 }}
              >
                Notify
                <MailIcon />
              </Button>
              : null}
          </Box>
        </Box>

        <TableContainer classes={{ root: classes.customTableContainer }} sx={{ overflowX: 'scroll' }} >
          <Table stickyHeader aria-label='sticky table' >
            <TableHead>
              <TableRow  >
                <TableCell
                  sx={{
                    py: 3,
                    lineHeight: 1.1,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,

                  }}
                >
                  rollNo
                </TableCell>
                <TableCell
                  sx={{
                    py: 3,
                    lineHeight: 1.1,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,

                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    py: 3,
                    lineHeight: 1.5,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,

                  }}
                >
                  installment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="hoverRow">
              {showData ? (
                showData.length > 0 ? (
                  <>
                    {showData
                      ? showData.map((e: any, index: number) => {
                        return (
                          <>
                            <TableRow
                              key={index}
                              sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2)} !important` } }}
                              onClick={() => router.push(`student/studentDetails/${e.rollNo}/`)}
                            >
                              <TableCell style={{ paddingLeft: '5px', borderRight: '1px solid ', borderColor: "rgb(196 206 215 / 60%)" }}>
                                <Typography noWrap sx={{ fontWeight: 500 }}>
                                  {e.rollNo}
                                </Typography>
                              </TableCell>
                              <TableCell style={{ paddingLeft: '5px', borderRight: '0.5px solid ', borderColor: "rgb(196 206 215 / 60%)" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography noWrap sx={{ fontWeight: 500, fontSize: '14px' }}>
                                      {e.studentFirstName.charAt(0).toUpperCase() + e.studentFirstName.slice(1)}{' '}
                                      {e.studentLastName.charAt(0).toUpperCase() + e.studentLastName.slice(1)}
                                    </Typography>
                                    <Typography noWrap variant='body2' sx={{ color: 'text.disabled', fontSize: '14px' }}>
                                      {e.studentEmail}
                                    </Typography>
                                    <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                      {e.studentContact}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>

                              {e.paymentForecast.map((i: any) => {
                                return (
                                  <>
                                    <TableRow>
                                      <TableCell style={{ paddingLeft: "6px" }}>Payment</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell>Date</TableCell>
                                    </TableRow>
                                    <TableRow style={{ gap: '0px' }}>
                                      <TableCell style={{ paddingLeft: "6px" }}>
                                        <Typography noWrap sx={{ fontWeight: 500 }}>
                                          {parseInt(i.Details.duePayment)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell style={{ paddingLeft: "6px" }} >
                                        {statusObj.failed}
                                      </TableCell>
                                      <TableCell style={{ paddingLeft: "6px" }}>
                                        <Typography noWrap sx={{ fontWeight: 500 }}>
                                          {i.Details.nextpaymetDate.split('-')[2] +
                                            '-' +
                                            i.Details.nextpaymetDate.split('-')[1] +
                                            '-' +
                                            i.Details.nextpaymetDate.split('-')[0]}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                )
                              })}
                            </TableRow>
                          </>
                        )
                      })
                      : ''}
                  </>
                ) : (
                  <Stack
                    sx={{
                      width: '50%',
                      mt: '140px',
                      ml: '200px'
                    }}
                    spacing={2}
                  >
                    <Alert severity='error' sx={{ pt: '10px' }}>
                      <AlertTitle>No data found</AlertTitle>
                    </Alert>
                  </Stack>
                )
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
          Mail sent Successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default OverDuePaymentTable
