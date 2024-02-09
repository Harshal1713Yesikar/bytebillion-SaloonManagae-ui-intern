import React, { useEffect, useState } from 'react'
import {
  MenuItem,
  Typography,
  FormControl,
  Grid,
  CardContent,
  GridProps,
  InputLabel,
  Select,
  IconButton,
  Skeleton
} from '@mui/material'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch } from 'react-redux'
import {
  organizationDetails,
  customerRegistration,
  getCustomerDetails,
  getSingleOrganization
} from 'src/store/APIs/Api'
import { useMsal, useAccount } from '@azure/msal-react'
import { loginRequest } from '../../../config/authConfig'
import { useRouter } from 'next/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import OrgCreationStepper from './OrgCreationStepper'
import JoinUsingLink from './OrganizationLink'
import { getAllOrganizationList } from 'src/store/APIs/Api'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const Card = styled(MuiCard)<CardProps>(() => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundColor: 'transparent',
  backgroundImage: 'url(/images/pages/header.png)'
}))

const Img = styled('img')(({ theme }) => ({
  right: 60,
  bottom: -1,
  height: 170,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    position: 'static'
  }
}))

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
}

const SelectionBox = ({ setSelectedOrganization }: any) => {
  const theme = useTheme()
  const router = useRouter()

  // const dispatch = useDispatch();

  const [open, setOpen] = useState(true)
  const [orgId, setOrgId] = useState('')
  const [loading, setLoading] = useState(true)
  const [recall, setRecall] = useState<any>(true)
  const [customerId, setCustomerId] = useState('')
  const [userDetails, setUserDetails] = useState('')
  const [allOrganizationsList, setAllOrganizationsList] = useState([])
  const [organizationCategoryList, setOrganizationCategoryList] = useState()
  const [organizationData, setOrganizationData] = useState([])
  const [createOrg, setCreateOrg] = useState(false)

  function newSalon() {
    setCreateOrg(true)
    // router.push('/OrgCreationStepper')
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose: any = () => {
    setOpen(false)
    router.push('/home')
  }

  const handleLogout = () => {
    router.push('/')
    instance.logoutRedirect()
    localStorage.clear()
  }


  useEffect(() => {
    getAllOrganizationList("099f9bf2-8ac2-4f84-8286-83bb46595fde").then((res: any) => {
      console.log("sdjhsdufuf", res.data.data)
      setAllOrganizationsList(res?.data?.data)
      console.log(res?.data?.data, "asdfghj")
      setLoading(false)

      // console.log(res,"res")
      // localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
    })
  }, [])

  const orgSelected = (organization: any) => {
    getAllOrganizationList("099f9bf2-8ac2-4f84-8286-83bb46595fde").then((res: any) => {
      localStorage.setItem('organizationLogo', JSON.stringify({ logo: res.data.data.organizationLogo }))
      setLoading(false)
    })

    localStorage.setItem('organization', JSON.stringify(organization))
    setOrgId(organization.organizationId)
    setSelectedOrganization(organization)
    handleClose()
  }

  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})

  const request: any = {
    ...loginRequest,
    account
  }

  // const bringOrganizationsDetails = (userid: any) => {
  //   dispatch(organizationDetails(userid)).then((response: any) => {
  //     if (response.payload.data) {
  //       setAllOrganizationsList(response?.payload?.data?.organizations?.organizationNames);

  //       setLoading(false)
  //     }
  //   })
  // }

  const bringOrganizationsDetails = async (userid: any) => {
    try {
      const response = await organizationDetails(userid)
      console.log(response, '123')
      if (response && response.data) {
        setAllOrganizationsList(response.data.organizations.organizationNames)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setLoading(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance?.acquireTokenSilent(request)
        // console.log(response,"140 test 2")
        if (response) {
          // console.log('andr test 2222')
          const res = await customerRegistration(response.idToken)
          // Handle the response data
          // console.log(res,"2222")
          localStorage.setItem('userDetails', JSON.stringify(res))
          setCustomerId(res.payload.customerId)
          setUserDetails(res.payload)

          // Call bringOrganizationsDetails without dispatching
          await bringOrganizationsDetails("099f9bf2-8ac2-4f84-8286-83bb46595fde")


          // Call getCustomerDetails directly if it doesn't involve dispatch
          await getCustomerDetails({ customerId: res.payload.customerId })
        }
      } catch (error) {
        // Handle errors
        console.error(error)
      }
    }

    fetchData() // Call the async function immediately

    // Specify dependencies if needed, such as instance and request
  }, [instance, request])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350
      }
    }
  }

  const reload = () => {
    bringOrganizationsDetails("099f9bf2-8ac2-4f84-8286-83bb46595fde")
  }

  useEffect(() => {
    const data = localStorage.getItem('userDetails')
    if (data) {
      console.log('fdsjflkdjsfljds', JSON.parse(data)?.customerId)

      // bringOrganizationsDetails(JSON.parse(data).payload?.customerId)
      // getCustomerDetails({ customerId: JSON.parse(data).payload?.customerId })
      bringOrganizationsDetails("099f9bf2-8ac2-4f84-8286-83bb46595fde")
      getCustomerDetails({ customerId: "099f9bf2-8ac2-4f84-8286-83bb46595fde" })

      setLoading(false)
    }
  }, [recall])

  // const renderedOrganizations = allOrganizationsList.map((organization: any, index: number) => {
  //   return (
  //     <Card onClick={() => orgSelected(organization)} key={index} value={organization.salonName}>
  //       <Avatar sx={{ backgroundColor: 'grey' }}>{stringAvatar(organization.salonName)}</Avatar>
  //       <h3 style={{ marginBottom: 0 }}>{organization.salonName}</h3>
  //       <h4 style={{ marginTop: 0 }}>{organization.city}</h4>
  //     </Card>
  //   )
  // })



  // const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
  //   width: '100%',
  //   '& .MuiOutlinedInput-root': {
  //     backgroundColor: theme.palette.background.paper
  //   },
  //   [theme.breakpoints.up('sm')]: {
  //     width: '55%'
  //   }
  // }))



  function stringAvatar(name: string) {
    return name.split(' ')
      .map((word: string) => word.charAt(0))
      .join('');
  }

  return (
    <>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'fixed', top: 5, height: '7vh' }}
      >
        <Card sx={{ width: '90%', paddingX: '20px', backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', height: '7vh', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='refresh'>
              <RefreshIcon
                className='refresh'
                onClick={() => {
                  setRecall(!recall)
                  setLoading(true)
                }}
              />
            </div>
            <div className='signOut'>
              <Icon className='signOut' icon='bx:power-off' onClick={() => handleLogout()} />
            </div>
          </Box>
        </Card>
      </div>
      <Grid container spacing={0} sx={{ margin: '0 auto', padding: '0' }}>
        <Grid container xs={12} sm={6} md={8} lg={10} style={{ margin: '0 auto', display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "60px" }}>


          {allOrganizationsList.map((organization: any, index: number) => {
            return (<Card onClick={() => orgSelected(organization)} key={index} value={organization.salonName} style={{ height: "200px", width: "200px", border: "solid black 2px", backgroundColor: "pink", margin: "5px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} key={index}>
              <Avatar sx={{ backgroundColor: 'white' }}>{stringAvatar(organization.salonName)}</Avatar>
              <h3 style={{ marginBottom: 0 }}>{organization.salonName}</h3>
              <h4 style={{ marginTop: 0 }}>{organization.city}</h4>
              {/* {renderedOrganizations} */}

            </Card>)
          })}


          <Card style={{ height: "200px", width: "200px", border: "solid black 2px", backgroundColor: "pink", margin: "5px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1 onClick={newSalon} ><AddToPhotosIcon sx={{ fontSize: "100px", color: "black", alignItems: "center" }} /></h1>
          </Card>
        </Grid>
      </Grid>
      {createOrg ? <Grid xs={12} sm={6} style={{ margin: '0 auto', display: "block" }}>
        <OrgCreationStepper
          categoryList={organizationCategoryList}
          customerDetails={userDetails}
          refreshCall={bringOrganizationsDetails}
        />
      </Grid> : <Grid xs={12} sm={6} style={{ margin: '0 auto', display: "none" }}>
        <OrgCreationStepper
          categoryList={organizationCategoryList}
          customerDetails={userDetails}
          refreshCall={bringOrganizationsDetails}
        />
      </Grid>}
    </>
  )
}
export default SelectionBox
