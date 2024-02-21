// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// import { Box, StyledEngineProvider, colors } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// import Typography from '@mui/material/Typography';

// import "../../../styles/global.css"
import { useState } from 'react'

import { useRouter } from 'next/router'

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 125 },
  { id: 'code', label: 'Contact', minWidth: 125 },
  {
    id: 'population',
    label: 'Bill No.',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Services',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'Price/Paid/Balances',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Date',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Feedback & Rating',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Status',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string
  code: string
  population: number
  size: number
  density: number
}

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size

  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
]

const HomeViewPage = () => {
  const container = {
    fontSize: '20px',
    fontWeight: '900'
  }
  const button = {
    height: 35,
    width: 120,
    borderRadius: 8,
    backgroundColor: 'black',
    color: 'white',
    marginBottom: 20,
    marginRight: '50%'
  }
  const box = {
    height: '197px',
    width: '168px'
  }
  const button1 = {
    height: 35,
    width: 120,
    borderRadius: 9,
    backgroundColor: 'black',
    color: 'white'
  }
  const button2 = {
    height: 35,
    width: 120,
    borderRadius: 9,
    margin: 10
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [checked, setChecked] = useState<number[]>([0])
  const router = useRouter()


  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleClick = () => {
    // Perform any necessary actions before redirection
    // console.log('Card clicked');
    router.push('./bookSlot/booking');
  }

  const [activeTable, setActiveTable] = useState<string | null>(null);

  const showTable = (tableId: string) => {
    setActiveTable(tableId);
  };


  return (
    <>
      <Grid>

        <Grid sx={{ mb: 5, borderRadius: '100' }}>
          <Card onClick={handleClick}>
            <CardContent>
              {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
              <Typography style={container}>Learn How To</Typography>
              <Typography sx={{ color: 'black', fontSize: 40, fontWeight: '900' }}>Get Started On scissortrack</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
          <div>
            <button style={button} onClick={handleClickOpen}>
              + Add Deshlets
            </button>
          </div>
          <Card>
            <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
              <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                Modal title
              </DialogTitle>
              <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <List sx={{ width: '500px' }}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(0)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png'
                          alt='Caroline Black'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-0' primary='Next 7 Days Appointments' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(0)}
                          checked={checked.indexOf(0) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-0' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(1)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png'
                          alt='Alfred Copeland'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-1' primary='Sales Chart' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(1)}
                          checked={checked.indexOf(1) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-1' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(2)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png'
                          alt='Celia Schneider'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-2' primary='Services Sale Graph' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(2)}
                          checked={checked.indexOf(2) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-2' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(3)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png'
                          alt='Alfred Copeland'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-1' primary='Services Sale' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(3)}
                          checked={checked.indexOf(3) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-1' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(4)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png'
                          alt='Alfred Copeland'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-1' primary='Sale Break Down' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(4)}
                          checked={checked.indexOf(4) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-1' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggle(5)}>
                      <ListItemAvatar>
                        <Avatar
                          src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png'
                          alt='Alfred Copeland'
                          sx={{ height: 32, width: 32 }}
                        />
                      </ListItemAvatar>
                      <ListItemText id='checkbox-list-label-1' primary='Top 10 Sales Services' />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          tabIndex={-1}
                          disableRipple
                          onChange={handleToggle(5)}
                          checked={checked.indexOf(5) !== -1}
                          inputProps={{ 'aria-labelledby': 'checkbox-list-label-1' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                </List>
              </DialogContent>
              <DialogActions sx={{ height: '70px' }}>
                <Button variant='contained' autoFocus onClick={handleClose} sx={{ backgroundColor: 'black' }}>
                  Add
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Card>
        </Grid>
        <Grid container item gap={10} xs={40} mb={10}>
          <Card style={box}>
            <CardHeader title={<Icon icon='mdi:cart-sale' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Recent Sales</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>Today</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='tabler:shopping-bag-check' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Recent Appointments</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>Today</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='mdi:people-group-outline' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Total Clients</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>LifeTime</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='ri:map-pin-user-line' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Total Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='fluent:people-queue-20-regular' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Old Client Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='fluent:people-team-add-20-regular' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>New Client Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{}}>
          <Card>
            <div style={{ margin: '30px' }}>
            <Button variant='contained' onClick={() => showTable('table1')} sx={{gap:"10px",margin:"10px"}}>Quick Sale</Button>
            <Button variant='contained' onClick={() => showTable('table2')}>Appointments</Button>
            </div>
          </Card>

          {/* first table start */}

          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '0',display: activeTable === 'table1' ? 'block' : 'none'  }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

        {/* second table start */}


        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '0',display: activeTable === 'table2' ? 'block' : 'none'  }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

        </Grid>
      </Grid>
    </>
  )
}

export default HomeViewPage
