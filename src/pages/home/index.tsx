// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Box, Button, StyledEngineProvider, colors } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// import "../../../styles/global.css"
import { useState } from 'react'



interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;

  return { name, code, population, size, density };
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
  createData('Brazil', 'BR', 210147125, 8515767),
];

const Home = () => {
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
    margin: 10,


  }


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid>
        <Grid sx={{ mb: 5, borderRadius: '100' }}>
          <Card>
            <CardContent>
              {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
              <Typography style={container}>Learn How To</Typography>
              <Typography sx={{ color: 'black', fontSize: 40, fontWeight: '900' }}>Get Started On Salonist</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
          <div>
            <Button style={{margin:"10px"}} variant="contained">+ Add Deshlets</Button>
          </div>
        </Grid>
        <Grid container item gap={10} xs={40} mb={8}>
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

        <Grid >
          <Card>
            <div style={{ margin: "30px" }}>

              <Button style={{margin:"10px"}} variant="contained">Quick Sale</Button>
              <Button  variant="contained">Appointments</Button>
            </div>


          </Card>

          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "0" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
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

export default Home
