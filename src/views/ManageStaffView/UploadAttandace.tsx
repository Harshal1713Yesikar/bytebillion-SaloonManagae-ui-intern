import { Card, Grid, CardContent, IconButton, Icon, ListItem, List } from '@mui/material'
import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { MemoryRouter, Route, Routes, matchPath, useLocation } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import { useState } from 'react'
import { Button } from '@mui/material'

// ** Next Import
import Links from 'next/link'
import { Link } from 'react-router-dom'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'



interface FileProp {
  name: string
  type: string
  size: number
}


// Styled component for the upload image inside the dropzone area
// const Img = styled('img')(({ theme }) => ({
//   width: 300,
//   [theme.breakpoints.up('md')]: {
//     marginRight: theme.spacing(15.75)
//   },
//   [theme.breakpoints.down('md')]: {
//     width: 250,
//     marginBottom: theme.spacing(4)
//   },
//   [theme.breakpoints.down('sm')]: {
//     width: 200
//   }
// }));

// // Styled component for the heading inside the dropzone area
// const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
//   marginBottom: theme.spacing(5),
//   [theme.breakpoints.down('sm')]: {
//     marginBottom: theme.spacing(4)
//   }
// }));




function Router(props: { children?: React.ReactNode }) {
  const { children } = props
  if (typeof window === 'undefined') {
    return <StaticRouter location='/drafts'>{children}</StaticRouter>
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  )
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/staffList', '/addStaff', '/staffSchedule', '/updateAttendanes', '/inactiveStaff'])
  const currentTab = routeMatch?.pattern?.path
}
function CurrentRoute() {
  const location = useLocation()
}

const UploadAttendace = () => {
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      // return <Icon icon='bx:file' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      {/* <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='bx:x' fontSize={20} />
      </IconButton> */}
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      <Grid>
        <Card>
          <CardContent>
            {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
            <Typography sx={{ fontSize: 20, fontWeight: '600', borderBottom: '1px solid gray' }}>
              {' '}
              Update Attendance{' '}
            </Typography>
            <Typography>
              NOTE*: when uploading Attendance,ensure that you only upload the attendance of your current staff.
              <br /> If any staff is not available in the system , they will not be Added
            </Typography>
          </CardContent>
          <Router>
            <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
          </Router>




          
          <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                {/* <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} /> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                  {/* <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography> */}
                  <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                    <Card >
                    Choose File{' '}
                    {/* <Link href='/' onClick={e => e.preventDefault()}>
                      browse
                    </Link>{' '} */}
                    File chosen
                    </Card>
                  </Typography>

                </Box>
              </Box>
            </div>
            {files.length ? (
              <Fragment>
                <List>{fileList}</List>
                <div className='buttons'>
                  <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                    Remove All
                  </Button>
                  <Button variant='contained'>Upload Files</Button>
                </div>
              </Fragment>
            ) : null}
          </Fragment>
        </Card>
      </Grid>
    </>
  )
}

export default UploadAttendace
