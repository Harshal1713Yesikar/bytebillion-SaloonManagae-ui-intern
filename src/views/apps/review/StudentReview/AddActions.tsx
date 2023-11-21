// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { studentFeeSlipMail } from 'src/store/APIs/Api'

interface Props {
  id: string | undefined
  toggleSendInvoiceDrawer: () => void
}

const PreviewActions = ({ orgName, studentEmail, studentName, courseName }: any) => {

  const handleInvoiceSubmission = () => {
    // studentFeeSlipMail({ organizationName: orgName, studentEmail: studentEmail, studentName: studentName, courseName: courseName })
  }

  return (
    <Card>
      {/* <CardContent>
        <Button
          fullWidth
          sx={{ mb: 4 }}
          variant='contained'
          onClick={() => handleInvoiceSubmission()}
          startIcon={<Icon icon='bx:paper-plane' />}
        >
          Send Invo
        </Button>

        <Link
          href={`/apps/review/actions/print/PrintPage`}
        >
          Download
        </Link>

      </CardContent> */}
    </Card>
  )
}

export default PreviewActions
