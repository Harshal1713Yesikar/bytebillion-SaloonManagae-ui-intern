// ** React Imports
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import { RootState } from 'src/store/combineReducer';
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { paySlipDesign } from 'src/store/APIs/designSelectionReducer/paySlipReducer'
import { feeSlipDesign } from 'src/store/APIs/designSelectionReducer/feeReceiptReducer'

// ** Icon Imports
import { CardActions, CardHeader } from '@mui/material'

interface CardDataType {
  title: string
  totalUsers: number
  avatars: { src: string; name: string }[]
}

const cardData: CardDataType[] = [
  {
    totalUsers: 1,
    title: 'Design 1',
    avatars: [
      { src: '/images/templates/studentTemplates/p1.png', name: 'Employee Pay Slip template 1' },


    ]
  },
  {
    totalUsers: 7,
    title: 'Design 2',
    avatars: [
      { src: '5.png', name: 'Employee Pay Slip template 2' },

    ]
  },
  {
    totalUsers: 5,
    title: 'Design 3',
    avatars: [
      { src: '4.png', name: 'Employee Pay Slip template 3' },

    ]
  },
  {
    totalUsers: 3,
    title: 'Design 4',
    avatars: [
      { src: '1.png', name: "Employee Pay Slip template 4" },

    ]
  },
  {
    totalUsers: 2,
    title: 'Design 5',
    avatars: [
      { src: '4.png', name: 'Employee Pay Slip template 5' },

    ]
  }
]

const cardDataStudent: CardDataType[] = [
  {
    totalUsers: 1,
    title: 'Design 1',
    avatars: [
      { src: '/images/templates/studentTemplates/p1.png', name: 'Student Receipt template 1' },


    ]
  },
  {
    totalUsers: 7,
    title: 'Design 2',
    avatars: [
      { src: '/images/templates/studentTemplates/p2.png', name: 'Student Receipt template 2' },

    ]
  },
  {
    totalUsers: 5,
    title: 'Design 3',
    avatars: [
      { src: '/images/templates/studentTemplates/p3.png', name: 'Student Receipt template 3' },

    ]
  },
  {
    totalUsers: 3,
    title: 'Design 4',
    avatars: [
      { src: '/images/templates/studentTemplates/p4.png', name: "Student Receipt template 4" },

    ]
  },
  {
    totalUsers: 2,
    title: 'Design 5',
    avatars: [
      { src: '/images/templates/studentTemplates/p5.png', name: 'Student Receipt template 5' },

    ]
  }
]


const rolesArr: string[] = [
  'Dashboard',
  'Student Management',
  'Employee Management',
  'Entity Management',

]

const InvoiceAndReceiptDesign = (value: any) => {
  // ** States
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const counter = useSelector((state: RootState) => state);
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [activeFeeSlipDesign, setActiveDesign] = useState<number>(counter.feeReceiptDesignReducer.value)
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [activePaySlipDesign, setActivePaySlipDesign] = useState(counter.paySlipDesignReducer.value)
  const [openStudentView, setOpenStudentView] = useState<boolean>(false)

  const [employeeReceiptView, setEmployeeReceiptView] = useState<any>({
    title: '',
    src: '',
    index: 1,
    name: ''
  })
  const [studentReceiptView, setStudentReceiptView] = useState<any>({
    title: '',
    src: '',
    index: 1,
    name: ''
  })


  // ** Hook
  const theme = useTheme()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)

  }

  const handleStudentClose = () => {
    setOpenStudentView(false)

  }



  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])


  useEffect(() => {
    dispatch(feeSlipDesign(activeFeeSlipDesign))
  }, [activeFeeSlipDesign, dispatch])

  useEffect(() => {
    dispatch(paySlipDesign(activePaySlipDesign))
  }, [activePaySlipDesign, dispatch])



  const renderCards = () =>
    cardDataStudent.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        {activeFeeSlipDesign === index + 1 ?
          <Card sx={{ border: '2px solid #696CFF' }}>
            <CardMedia
              component="img"
              height="150"
              image={item.avatars[0].src}
              alt={item.avatars[0].name}
            />
            <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography variant='h5' sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Button onClick={() => {
                    setOpenStudentView(true)
                    setStudentReceiptView({
                      title: item.title,
                      src: item.avatars[0].src,
                      index: index + 1,
                      name: item.avatars[0].name
                    })
                  }}>
                    View
                  </Button >
                </Box>
              </Box>
            </CardContent>
          </Card> :
          <Card >
            <CardMedia
              component="img"
              height="150"
              image={item.avatars[0].src}
              alt={item.avatars[0].name}
            />
            <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography variant='h5' sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Button onClick={() => {
                    setOpenStudentView(true)
                    setStudentReceiptView({
                      title: item.title,
                      src: item.avatars[0].src,
                      index: index + 1,
                      name: item.avatars[0].name
                    })
                  }}>
                    View
                  </Button >
                </Box>
              </Box>
            </CardContent>
          </Card>}
      </Grid>
    ))
  const renderCardsPaySlip = () =>
    cardData.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>

        {
          activePaySlipDesign === index + 1 ?
            <Card sx={{ border: '2px solid #696CFF' }}>
              <CardMedia
                component="img"
                height="150"
                image={item.avatars[0].src}
                alt={item.avatars[0].name}
              />
              <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant='h5' sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>

                    <Button onClick={() => {
                      setOpen(true)
                      setEmployeeReceiptView({
                        title: item.title,
                        src: item.avatars[0].src,
                        index: index + 1,
                        name: item.avatars[0].name
                      })
                    }}>
                      View
                    </Button >
                  </Box>
                </Box>
              </CardContent>
            </Card> : <Card  >
              <CardMedia
                component="img"
                height="150"
                image={item.avatars[0].src}
                alt={item.avatars[0].name}
              />
              <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant='h5' sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Button onClick={() => {
                      setOpen(true)
                      setEmployeeReceiptView({
                        title: item.title,
                        src: item.avatars[0].src,
                        index: index + 1,
                        name: item.avatars[0].name
                      })
                    }}>
                      View
                    </Button >
                  </Box>
                </Box>
              </CardContent>
            </Card>}
      </Grid >
    ))

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        {/* <Grid item xs={12}  >
          <Card>

            <CardHeader title='Select one design for employee pay slip'></CardHeader>
          </Card>
        </Grid>
        {renderCardsPaySlip()} */}

        <line />
        <Grid item xs={12}  >
          <Card>
            <CardHeader title='Select One Design for Student Payment Receipt'></CardHeader>
          </Card>
        </Grid>
        {renderCards()}

      </Grid>
      <Dialog onClose={handleClose} open={open}>
        <Card >
          <CardHeader title={employeeReceiptView.title} />

          <CardMedia
            component="img"
            sx={{ width: 600 }}
            image={employeeReceiptView.src}
            alt={employeeReceiptView.name}
          />{

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant={employeeReceiptView.index == activePaySlipDesign ? 'outlined' : 'contained'}
                onClick={() => {
                  setActivePaySlipDesign(employeeReceiptView.index)
                  setOpen(false)
                }}>{employeeReceiptView.index == activePaySlipDesign ? 'Already Active' : 'Set as active'}</Button>
            </CardActions>
          }
        </Card>
      </Dialog>
      <Dialog onClose={handleStudentClose} open={openStudentView}>
        <Card>
          <CardHeader title={studentReceiptView.title} />
          <CardMedia
            component="img"
            sx={{ width: 600 }}
            image={studentReceiptView.src}
            alt={studentReceiptView.name}
          />{

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant={studentReceiptView.index == activeFeeSlipDesign ? 'outlined' : 'contained'}
                onClick={() => {
                  setActiveDesign(studentReceiptView.index)
                  setOpenStudentView(false)
                }}>{studentReceiptView.index == activeFeeSlipDesign ? ' Already Active' : 'Set as active'}</Button>
            </CardActions>
          }
        </Card>
      </Dialog>
    </>
  )
}

export default InvoiceAndReceiptDesign


