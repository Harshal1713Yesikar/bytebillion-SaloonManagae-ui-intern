// ** React Importse
import { useEffect, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch } from 'react-redux'
import { ReactDatePickerProps } from 'react-datepicker'
import { useTheme } from '@mui/material/styles'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CircularProgress from '@mui/material/CircularProgress'


import Icon from 'src/@core/components/icon'
import { Skeleton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { InputLabel, Select } from '@mui/material'
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/10.png'
}

interface Props {
  setUpdateCollegeState: any
  updateCollegeState: any
  orgData: any
  setOrgData: any
}

const CourseViewLeft = (props: Props) => {
  // ** States

  const currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 5)
  const minDate = new Date(currentDate)
  minDate.setFullYear(minDate.getFullYear() - 100)
  const maxDate = new Date(currentDate)
  maxDate.setMonth(11, 31)

  const { orgData, setOrgData, updateCollegeState, setUpdateCollegeState } = props
  const router = useRouter()
  const { couponId } = router.query
  console.log('coupon id =', couponId)

  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string>('')
  const [editCoupon, setEditCoupon] = useState<any>()
  const [getcouponId, setGetcouponId] = useState<any>()
  const [update, setUpdate] = useState<any>()
  const [couponStatus, setStudentDateOfBirth] = useState<any>()
  const [status, setStatus] = useState('delete')
  const [value, setValue] = useState('InActive')
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<any>(false)
  const [selectedcouponId, setSelectedcouponId] = useState<any>()
  const [couponList, setCouponList] = useState<any>([])
  const [disc, setDisc] = useState<any>()
  const [deleteBatchPopup, setDeleteBatchPopup] = useState<boolean>(false)
  const [batchStatus, setBatchStatus] = useState<any>()
  const [open, setOpen] = useState<any>(false)
  const [page, setPage] = useState(0)
  const [customerId, setCustomerId] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
 
  const dispatch = useDispatch()
  const handleCloseAlert = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const theme = useTheme()

  const { direction } = theme



  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingCourse, setIsLoadingCourse] = useState<boolean>(true)


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid></Grid>

        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'left' }}>
              <Button
                sx={{ mr: 2 }}
                onClick={() => {
                  router.push('/coupons/couponsList/')
                }}
                variant='outlined'
              >
                &#8592; Coupon List
              </Button>
            </Box>
            <Card>
              <Button
              
                className='refreshs'
                variant='outlined'
                size='small'
                sx={{ mt: 5, mb: 5, ml: 5, display: 'flex' }}
              >
                <RefreshIcon className='refreshs' />
              </Button>
              <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {data.avatar.length ? (
                  <CustomAvatar src={data.avatar} sx={{ width: 110, height: 110, mb: 6 }} variant='rounded' alt={''} />
                ) : (
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={data.avatarColor as ThemeColor}
                    sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                  >
                    {getInitials(data.fullName)}
                  </CustomAvatar>
                )}

                {orgData.couponName ? (
                  <Typography variant='h5' sx={{ mb: 2.5, fontSize: '--1.375rem !important' }}>
                    {`${orgData.couponName}`}
                  </Typography>
                ) : (
                  <Skeleton>
                    <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                  </Skeleton>
                )}
              </CardContent>

              <CardContent>
                <Grid sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Coupon Details</Typography>
                  <Grid>
                    <Grid>
                      {/* {permission?.some((obj: any) => obj?.title === 'Coupons' && obj?.action?.includes('update')) && ( */}
                      <Button
                        className='update'
                        onClick={() => {
                          setGetcouponId(orgData.couponId)

                          setEditCoupon(true)
                          setDialogTitle('Edit')
                          setIsLoading(false)
                        }
                        }
                      >
                        <Icon style={{ cursor: 'pointer' }} icon='bx:pencil' />
                      </Button>
                      {/* ) */}
                      {/* } */}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
                {isLoadingCourse ? (
                  <>
                    <Box sx={{ pt: 4, pb: 2 }}>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Coupon Id :</Typography>
                        <Skeleton>
                          {' '}
                          <Typography sx={{ color: 'text.secondary' }}>lorem message</Typography>
                        </Skeleton>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Coupon Name:</Typography>
                        <Skeleton>
                          {' '}
                          <Typography sx={{ color: 'text.secondary' }}>lorem message</Typography>{' '}
                        </Skeleton>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Coupon Expiry Date :</Typography>
                        <Skeleton>
                          {' '}
                          <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            lorem message
                          </Typography>{' '}
                        </Skeleton>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                          {' '}
                          Coupon Type :
                        </Typography>
                        <Skeleton>
                          {' '}
                          <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            lorem message
                          </Typography>{' '}
                        </Skeleton>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                          {' '}
                          Coupon Description :
                        </Typography>
                        <Skeleton>
                          {' '}
                          <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            lorem message
                          </Typography>{' '}
                        </Skeleton>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Status :</Typography>
                        <Skeleton>
                          <div>
                            <CustomChip
                              style={{ height: '30px', margin: '5px', cursor: 'pointer' }}
                              rounded
                              size='small'
                              skin='light'
                              color={couponStatus == 'active' ? 'success' : 'warning'}
                              label='loremmm'
                            />
                          </div>
                        </Skeleton>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ pt: 4, pb: 2 }}>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Coupon Id :</Typography>
                      {orgData.couponId ? (
                        <Typography sx={{ color: 'text.secondary' }}>{orgData.couponId}</Typography>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Coupon Name:</Typography>
                      {orgData.couponName ? (
                        <Typography sx={{ color: 'text.secondary' }}>{`${orgData.couponName}`}</Typography>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Coupon Expiry Date :</Typography>
                      {orgData.couponExpiryDate ? (
                        <Typography
                          sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}
                        >{`${orgData.couponExpiryDate}`}</Typography>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                        {' '}
                        Coupon Type :
                      </Typography>
                      {orgData.couponType ? (
                        <Typography
                          sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}
                        >{`${orgData.couponType}`}</Typography>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>
                        {' '}
                        Coupon Description :
                      </Typography>
                      {orgData.couponDescription ? (
                        <Typography
                          sx={{ color: 'text.secondary', wordWrap: 'break-word', wordBreak: 'break-all' }}
                        >{`${orgData.couponDescription}`}</Typography>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Status :</Typography>
                      {orgData.couponStatus ? (
                        <div>
                          <CustomChip
                            style={{ height: '30px', margin: '5px', cursor: 'pointer' }}
                            rounded size='small'
                            skin='light'
                            color={orgData.couponStatus == 'active' ? 'success' : 'warning'}
                            label={orgData.couponStatus}

                          />
                        </div>
                      ) : (
                        <Skeleton>
                          <Typography sx={{ color: 'text.secondary' }}>Loading...</Typography>
                        </Skeleton>
                      )}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
      <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000}>
        <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
          Inventory updated successfully
        </Alert>
      </Snackbar>

      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant='filled'
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
      {editCoupon == true ? (
        <Dialog fullWidth maxWidth='md' scroll='body' open={editCoupon}>
          <Grid container justifyContent='space-between' alignItems='center' sx={{ mt: '-15px' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              <Typography variant='h5' component='span'>
                {`Edit Coupon`}
              </Typography>
            </DialogTitle>
            <Icon
              className='iconContainer'
              onClick={() => {
              
                setFormUpdateButton(false)
                setSubmitted(false)
                setEditCoupon(false)
                // setupdateCoupon({
                //   couponName: '',
                //   couponDescription: '',
                //   couponExpiryDate: null,
                //   couponType: '',
                //   couponValue: null
                // })
              }}
              style={{
                cursor: 'pointer',
                fontSize: '30px',
                margin: '8px',
                transition: 'background-color 0.3s'
              }}
              icon='bx:x'
            />
          </Grid>

          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <TableContainer>
              <Grid container spacing={5} mt={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label='Coupon Name'
                    placeholder='HTML,CSS,back-end...'
                   
                    name='couponName'
                 
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='stepper-custom-vertical-personal-select-label'>Coupon Value </InputLabel>
                    <Select
                      required
                      label='CouponType'
                      name='couponType'
                      id='stepper-custom-vertical-personal-select'
                      
                      labelId='stepper-custom-vertical-personal-select-label'
                    >
                      <MenuItem value={1}>Flat</MenuItem>
                      <MenuItem value={3}>Persentage</MenuItem>
                      {/* <MenuItem value={6}>6 months</MenuItem>
                      <MenuItem value={9}>9 months</MenuItem>
                      <MenuItem value={12}>1 year</MenuItem>
                      <MenuItem value={24}>2 year</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name='couponDescription'
                    minRows={2}
                    inputProps={{
                      maxLength: 500
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name='couponValue'
                    label='CouponValue'
                
                    minRows={2}
                    inputProps={{
                      maxLength: 500
                    }}
                  />
                </Grid>
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
                  required
                  fullWidth
                  type='date'
                  label='couponExpiryDate'
                  placeholder='dd/mm/yy'
                  name='couponExpiryDate'
                 
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0
                  }}
                />
              </Grid>

            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right' }}>
            <Box className='demo-space-x'>
              <Button
                size='large'
                color='secondary'
                variant='outlined'
                onClick={() => {
            
                  setFormUpdateButton(false)
                  setSubmitted(false)
                  setEditCoupon(false)
                }}
              >
                Cancel
              </Button>
              <Button
                size='large'
                type='submit'
                variant='contained'
                onClick={() => {
      
                  setEditCoupon(true)
                }}
                disabled={!formUpdateButton}
              >
                Update
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )
      }
    </Grid >
  )
}

export default CourseViewLeft
