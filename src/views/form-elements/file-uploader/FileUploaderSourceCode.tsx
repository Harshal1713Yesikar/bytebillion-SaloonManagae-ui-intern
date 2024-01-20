export const FileUploaderMultipleJSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { Fragment, useState } from 'react'
  
  // ** Next Import
  import Link from 'next/link'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import List from '@mui/material/List'
  import Button from '@mui/material/Button'
  import ListItem from '@mui/material/ListItem'
  import IconButton from '@mui/material/IconButton'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography from '@mui/material/Typography'
  
  // ** Icon Imports
  import Icon from 'src/@core/components/icon'
  
  // ** Third Party Imports
  import { useDropzone } from 'react-dropzone'
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderMultiple = () => {
    // ** State
    const [files, setFiles] = useState([])
  
    // ** Hooks
    const theme = useTheme()
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
      }
    })
  
    const renderFilePreview = file => {
      if (file.type.startsWith('image')) {
        return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
      } else {
        return <Icon icon='bx:file' />
      }
    }
  
    const handleRemoveFile = file => {
      const uploadedFiles = files
      const filtered = uploadedFiles.filter(i => i.name !== file.name)
      setFiles([...filtered])
    }
  
    const fileList = files.map(file => (
      <ListItem key={file.name}>
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? {(Math.round(file.size / 100) / 10000).toFixed(1)} mb
                : {(Math.round(file.size / 100) / 10).toFixed(1)} kb}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))
  
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
  
    return (
      <Fragment>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                Drop files here or click{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                  browse
                </Link>{' '}
                thorough your machine
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
    )
  }
  
  export default FileUploaderMultiple
  `}</code>
    </pre>
  )
  
  export const FileUploaderRestrictionsJSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { Fragment, useState } from 'react'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import List from '@mui/material/List'
  import Button from '@mui/material/Button'
  import ListItem from '@mui/material/ListItem'
  import IconButton from '@mui/material/IconButton'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography from '@mui/material/Typography'
  
  // ** Icon Imports
  import Icon from 'src/@core/components/icon'
  
  // ** Third Party Components
  import toast from 'react-hot-toast'
  import { useDropzone } from 'react-dropzone'
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderRestrictions = () => {
    // ** State
    const [files, setFiles] = useState([])
  
    // ** Hooks
    const theme = useTheme()
  
    const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 2,
      maxSize: 2000000,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
      },
      onDropRejected: () => {
        toast.error('You can only upload 2 files & maximum size of 2 MB.', {
          duration: 2000
        })
      }
    })
  
    const renderFilePreview = file => {
      if (file.type.startsWith('image')) {
        return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
      } else {
        return <Icon icon='bx:file' />
      }
    }
  
    const handleRemoveFile = file => {
      const uploadedFiles = files
      const filtered = uploadedFiles.filter(i => i.name !== file.name)
      setFiles([...filtered])
    }
  
    const fileList = files.map(file => (
      <ListItem key={file.name}>
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? {(Math.round(file.size / 100) / 10000).toFixed(1)} mb
                : {(Math.round(file.size / 100) / 10).toFixed(1)} kb}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))
  
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
  
    return (
      <Fragment>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
              <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography>
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
    )
  }
  
  export default FileUploaderRestrictions
  `}</code>
    </pre>
  )
  
  export const FileUploaderSingleJSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { useState } from 'react'
  
  // ** Next Import
  import Link from 'next/link'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography from '@mui/material/Typography'
  
  // ** Third Party Imports
  import { useDropzone } from 'react-dropzone'
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderSingle = () => {
    // ** State
    const [files, setFiles] = useState([])
  
    // ** Hook
    const theme = useTheme()
  
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
      }
    })
  
    const img = files.map(file => (
      <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    ))
  
    return (
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          img
        ) : (
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                Drop files here or click{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                  browse
                </Link>{' '}
                thorough your machine
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    )
  }
  
  export default FileUploaderSingle
  `}</code>
    </pre>
  )
  
  export const FileUploaderRestrictionsTSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { Fragment, useState } from 'react'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import List from '@mui/material/List'
  import Button from '@mui/material/Button'
  import ListItem from '@mui/material/ListItem'
  import IconButton from '@mui/material/IconButton'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography, { TypographyProps } from '@mui/material/Typography'
  
  // ** Icon Imports
  import Icon from 'src/@core/components/icon'
  
  // ** Third Party Components
  import toast from 'react-hot-toast'
  import { useDropzone } from 'react-dropzone'
  
  interface FileProp {
    name: string
    type: string
    size: number
  }
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderRestrictions = () => {
    // ** State
    const [files, setFiles] = useState<File[]>([])
  
    // ** Hooks
    const theme = useTheme()
    const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 2,
      maxSize: 2000000,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      },
      onDropRejected: () => {
        toast.error('You can only upload 2 files & maximum size of 2 MB.', {
          duration: 2000
        })
      }
    })
  
    const renderFilePreview = (file: FileProp) => {
      if (file.type.startsWith('image')) {
        return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
      } else {
        return <Icon icon='bx:file' />
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
                ? {(Math.round(file.size / 100) / 10000).toFixed(1)} mb
                : {(Math.round(file.size / 100) / 10).toFixed(1)} kb}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))
  
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
  
    return (
      <Fragment>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
              <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography>
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
    )
  }
  
  export default FileUploaderRestrictions
  `}</code>
    </pre>
  )
  
  export const FileUploaderMultipleTSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { Fragment, useState } from 'react'
  
  // ** Next Import
  import Link from 'next/link'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import List from '@mui/material/List'
  import Button from '@mui/material/Button'
  import ListItem from '@mui/material/ListItem'
  import IconButton from '@mui/material/IconButton'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography, { TypographyProps } from '@mui/material/Typography'
  
  // ** Icon Imports
  import Icon from 'src/@core/components/icon'
  
  // ** Third Party Imports
  import { useDropzone } from 'react-dropzone'
  
  interface FileProp {
    name: string
    type: string
    size: number
  }
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderMultiple = () => {
    // ** State
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
        return <Icon icon='bx:file' />
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
                ? {(Math.round(file.size / 100) / 10000).toFixed(1)} mb
                : {(Math.round(file.size / 100) / 10).toFixed(1)} kb}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </ListItem>
    ))
  
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
  
    return (
      <Fragment>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                Drop files here or click{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                  browse
                </Link>{' '}
                thorough your machine
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
    )
  }
  
  export default FileUploaderMultiple
  `}</code>
    </pre>
  )
  
  export const FileUploaderSingleTSXCode = (
    <pre className='language-jsx'>
      <code className='language-jsx'>{`// ** React Imports
  import { useState } from 'react'
  
  // ** Next Import
  import Link from 'next/link'
  
  // ** MUI Imports
  import Box from '@mui/material/Box'
  import { styled, useTheme } from '@mui/material/styles'
  import Typography, { TypographyProps } from '@mui/material/Typography'
  
  // ** Third Party Imports
  import { useDropzone } from 'react-dropzone'
  
  interface FileProp {
    name: string
    type: string
    size: number
  }
  
  // Styled component for the upload image inside the dropzone area
  const Img = styled('img')(({ theme }) => ({
    width: 300,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
      width: 250,
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 200
    }
  }))
  
  // Styled component for the heading inside the dropzone area
  const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  
  const FileUploaderSingle = () => {
    // ** State
    const [files, setFiles] = useState<File[]>([])
  
    // ** Hook
    const theme = useTheme()
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      }
    })
  
    const img = files.map((file: FileProp) => (
      <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
    ))
  
    return (
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          img
        ) : (
          <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
              <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
              <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                Drop files here or click{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                  browse
                </Link>{' '}
                thorough your machine
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    )
  }
  
  export default FileUploaderSingle
  `}</code>
    </pre>
  )
  