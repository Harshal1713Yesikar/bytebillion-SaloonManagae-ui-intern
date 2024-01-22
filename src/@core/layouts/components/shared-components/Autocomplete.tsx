// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { Settings } from 'src/@core/context/settingsContext'
import Icon from 'src/@core/components/icon'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DialogTitle from '@mui/material/DialogTitle'
import { InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';


interface Props {
  hidden: boolean
  settings: Settings
}

// ** Styled Dialog component
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)'
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550
    }
  }
})

const NoResult = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px' // This will make the container occupy the full height
      }}
    >
      <Box sx={{ mb: 2.5, color: 'text.primary' }}>
        <Icon icon='mdi:file-remove-outline' fontSize='5rem' />
      </Box>
      <Typography variant='h6' sx={{ wordWrap: 'break-word' }}>
        No results found
      </Typography>
    </Box>
  )
}

const AutocompleteComponent = ({ hidden, settings }: Props) => {
  // ** States
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [studentBasicInfo, setStudentBasicInfo] = useState<any>([])
  const [defaultList, setDefaultList] = useState<any>([])
  const [permission, setPermission] = useState<any>()
  const [user, setUser] = useState<any>()
  const router = useRouter()
  const [value, setValue] = useState<any>(true)
  const { layout } = settings
  const { mode } = settings
  const wrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)

    }
  }, [user])

  async function getStudentBasicInfoApi() {

    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      const response = await (JSON.parse(userDetails).customerId, JSON.parse(userDetails).organizationId)
      if (response?.statusCode == 200) {
        setDefaultList(response.data)
        setStudentBasicInfo(response.data)
      }
    }

  }

  useEffect(() => {
    getStudentBasicInfoApi()
  }, []);

  useEffect(() => {
    if (!openDialog) {
      setSearchValue('')
    } else {
      getStudentBasicInfoApi()
    }
  }, [openDialog])

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);



  const requestSearch = (searchValue: any) => {
    // Ensure that searchValue is a string
    if (typeof searchValue !== 'string') {
      searchValue = ''; // Set it to an empty string if it's not a string
    }

    setSearchValue(searchValue); // Set the search value even if it's empty

    if (searchValue.trim() === '') {
      // If the search value is empty, show the default list
      setStudentBasicInfo(defaultList);
    } else {
      const trimmedSearchValue = searchValue.trim().toLowerCase();
      const filteredRows = defaultList.filter((row: any) => {
        if (
          row?.studentFirstName.toLowerCase().includes(trimmedSearchValue) ||
          row?.studentLastName.toLowerCase().includes(trimmedSearchValue) ||
          row?.studentEmail.toLowerCase().includes(trimmedSearchValue) ||
          row?.studentContact.includes(trimmedSearchValue) ||
          row?.studentEnrollmentNumber?.toLowerCase().includes(trimmedSearchValue)
        ) {
          return row;
        }
      });

      if (filteredRows.length > 0) {
        setStudentBasicInfo(filteredRows);
      } else {
        // Set the data to an empty array to indicate no results
        setStudentBasicInfo([]);
      }
    }
  };


  const cancelSearch = () => {
    setSearchValue("");
    setOpenDialog(false)
    requestSearch(defaultList);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setOpenDialog(false);
      setStudentBasicInfo(defaultList)
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [defaultList, router]);



  if (!isMounted) {
    return null
  } else {
    return (
      <>
        {mode == 'light' ?
          <Box
            ref={wrapper}

            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
          >
            <IconButton onClick={() => {
              setOpenDialog(true);
            }}
              color='inherit' sx={!hidden && layout === 'vertical' ? { mr: 1, ml: -2.75 } : {}}
            >
              <Icon icon='bx:search' />
            </IconButton>
            {!hidden && layout === 'vertical' ? (
              <></>
            ) : null}
            {openDialog && (


              <Dialog fullWidth open={openDialog} onClose={() => setOpenDialog(false)}  >
                <DialogTitle sx={{ textAlign: 'start', fontSize: '1.5rem !important', display: "flex", justifyContent: "space-between" }}>
                  <Typography variant='h5' component='span'>
                    Explore student profiles
                  </Typography>
                  <Icon
                    className="iconContainer"
                    onClick={() => {
                      cancelSearch()
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      margin: "2px",
                      transition: "background-color 0.3s",
                    }}
                    icon='bx:x'
                  />

                </DialogTitle>
                <Box sx={{ position: 'sticky', display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                  <TextField
                    placeholder='Search...'
                    style={{ width: '92%' }}
                    value={searchValue}
                    onChange={(event) => {
                      requestSearch(event.target.value);
                    }}

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon='bx:search' />
                        </InputAdornment>
                      ),
                      endAdornment: searchValue && (
                        <InputAdornment position="start">
                          <ClearIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSearchValue("");
                              requestSearch("");
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                </Box>

                <TableContainer style={{ maxHeight: '500px', marginBottom: '40px', marginTop: '20px' }}>
                  <Table aria-label="simple table"  >
                    <TableHead style={{ position: 'sticky', top: 0, backgroundColor: '#F5F5F9' }}>
                      <TableRow>
                        <TableCell align="center"  >Enrollment</TableCell>
                        <TableCell align="center" >Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center" >Contact</TableCell>
                      </TableRow>
                    </TableHead>


                    {/* <div style={{ maxHeight: '500px', overflowY: 'auto' }}> */}
                    {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) ?
                      <TableBody style={{ overflowY: 'auto', maxHeight: '480px' }}>
                        {studentBasicInfo.length > 0 ?
                          studentBasicInfo.map((row: any) => (
                            <TableRow
                              key={row?.studentEnrollmentNumber}
                              onClick={() => {

                                router.push(`/student/studentDetails/${row?.rollNo}`)
                              }}
                            >

                              <TableCell align="center" style={{ cursor: 'pointer' }}>{row?.studentEnrollmentNumber ? row?.studentEnrollmentNumber : "-"}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer' }}>{row?.studentFirstName.charAt(0).toUpperCase() + row?.studentFirstName.slice(1)} {row?.studentLastName.charAt(0).toUpperCase() + row?.studentLastName.slice(1)}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer' }}>{row?.studentEmail}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer' }}>{row?.studentContact}</TableCell>
                            </TableRow>
                          ))
                          :
                          (
                            <TableRow>
                              <TableCell colSpan={4}>
                                <NoResult />
                              </TableCell>
                            </TableRow>
                          )
                        }

                      </TableBody>
                      :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <NoResult />
                          </TableCell>
                        </TableRow>
                      </TableBody>}
                  </Table>

                </TableContainer>


              </Dialog>

            )
            }
          </Box >
          : null}
        {mode == 'dark' ?
          <Box
            ref={wrapper}

            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
          >
            <IconButton onClick={() => {
              setOpenDialog(true);
            }}
              color='inherit' sx={!hidden && layout === 'vertical' ? { mr: 1, ml: -2.75 } : {}}
            >
              <Icon icon='bx:search' />
            </IconButton>
            {!hidden && layout === 'vertical' ? (
              <></>
            ) : null}
            {openDialog && (


              <Dialog fullWidth open={openDialog} onClose={() => setOpenDialog(false)}  >
                <DialogTitle sx={{ textAlign: 'start', fontSize: '1.5rem !important', display: "flex", justifyContent: "space-between" }}>
                  <Typography variant='h5' component='span'>
                    Explore student profiles
                  </Typography>
                  <Icon
                    className="iconContainer"
                    onClick={() => {
                      cancelSearch()
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      margin: "2px",
                      transition: "background-color 0.3s",
                    }}
                    icon='bx:x'
                  />

                </DialogTitle>
                <Box sx={{ position: 'sticky', display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                  <TextField
                    placeholder='Search...'
                    style={{ width: '92%' }}
                    value={searchValue}
                    onChange={(event) => {
                      requestSearch(event.target.value);
                    }}

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon='bx:search' />
                        </InputAdornment>
                      ),
                      endAdornment: searchValue && (
                        <InputAdornment position="start">
                          <ClearIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSearchValue("");
                              requestSearch("");
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                </Box>

                <TableContainer style={{ maxHeight: '500px', marginBottom: '40px', marginTop: '20px' }}>
                  <Table aria-label="simple table"  >
                    <TableHead style={{ position: 'sticky', top: 0, backgroundColor: '#353649', zIndex: 1, }} >
                      <TableRow>
                        <TableCell align="center" style={{ color: 'white' }}  >Enrollment</TableCell>
                        <TableCell align="center" style={{ color: 'white' }}>Name</TableCell>
                        <TableCell align="center" style={{ color: 'white' }}>Email</TableCell>
                        <TableCell align="center" style={{ color: 'white' }}>Contact</TableCell>
                      </TableRow>
                    </TableHead>


                    {/* <div style={{ maxHeight: '500px', overflowY: 'auto' }}> */}
                    {permission?.some((obj: any) => obj?.title === "Student" && obj?.action?.includes("read")) ?
                      <TableBody style={{ overflowY: 'auto', maxHeight: '480px' }}>
                        {studentBasicInfo.length > 0 ?
                          studentBasicInfo.map((row: any) => (
                            <TableRow
                              key={row?.studentEnrollmentNumber}
                              onClick={() => {

                                router.push(`/student/studentDetails/${row?.rollNo}`)
                              }}
                            >

                              <TableCell align="center" style={{ cursor: 'pointer', color: 'white' }}>{row?.studentEnrollmentNumber ? row?.studentEnrollmentNumber : "-"}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer', color: 'white' }}>{row?.studentFirstName.charAt(0).toUpperCase() + row?.studentFirstName.slice(1)} {row?.studentLastName.charAt(0).toUpperCase() + row?.studentLastName.slice(1)}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer', color: 'white' }}>{row?.studentEmail}</TableCell>
                              <TableCell align="center" style={{ cursor: 'pointer', color: 'white' }}>{row?.studentContact}</TableCell>
                            </TableRow>
                          ))
                          :
                          (
                            <TableRow>
                              <TableCell colSpan={4}>
                                <NoResult />
                              </TableCell>
                            </TableRow>
                          )
                        }

                      </TableBody>
                      :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <NoResult />
                          </TableCell>
                        </TableRow>
                      </TableBody>}
                  </Table>

                </TableContainer>


              </Dialog>

            )
            }
          </Box >
          : null}

      </>
    )
  }
}

export default AutocompleteComponent
