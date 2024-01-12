// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import UploadAttendace from 'src/views/ManageStaffView/UploadAttandace'

// ** Source code imports
const FileUploader = () => {
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink href='https://github.com/react-dropzone/react-dropzone/' target='_blank'>
                React Dropzone
              </MuiLink>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Simple HTML5 drag-drop zone with React.js</Typography>}
        />
        <Grid item xs={12}>
          {/* <CardSnippet
            title='Upload Multiple Files'
            // code={{
            //   // tsx: source.FileUploaderMultipleTSXCode,
            //   // jsx: source.FileUploaderMultipleJSXCode
            // }}
          >
            <UploadAttendace/>
          </CardSnippet> */}
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export default FileUploader
