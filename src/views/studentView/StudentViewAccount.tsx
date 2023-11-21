// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Component Imports

// import UsersInvoiceListTable from './UsersInvoiceListTable'

import StudentCollegeBatchDetails from './StudentCollegeBatchDetails'
import { useEffect } from 'react'



// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))
interface Props {
  updateCollegeState: any
  setUpdateCollegeState: any
}

const UserViewOverview = (props: Props) => {
  const { updateCollegeState, setUpdateCollegeState } = props

  useEffect(() => {
    console.log(updateCollegeState, "updateCollegeState")
  }, [updateCollegeState])

  return (

    <Box sx={{ overflowX: 'hidden' }} >
      <StudentCollegeBatchDetails updateCollegeState={updateCollegeState} setUpdateCollegeState={setUpdateCollegeState} />
    </Box>

  )
}

export default UserViewOverview
