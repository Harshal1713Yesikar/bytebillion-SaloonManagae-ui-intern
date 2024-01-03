// 
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 125 },
  { id: 'code', label: 'Contact', minWidth: 125 },
  {
    id: 'population',
    label: 'Bill No.',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Services',
    minWidth: 125,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
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
  {
    id: 'density',
    label: 'Action',
    minWidth: 125,
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
  createData('Ravi', 'IN', 1324171354, 3287263),
  createData('Arpit', 'CN', 1403500365, 9596961),
  createData('Harshita', 'IT', 60483973, 301340),
  createData('Jiganya', 'US', 327167434, 9833520),
  createData('Mitali', 'CA', 37602103, 9984670),
  createData('Harshal', 'AU', 25475400, 7692024),
  createData('Raj', 'DE', 83019200, 357578),
  createData('Jaya', 'IE', 4857000, 70273),
  createData('Yash', 'MX', 126577691, 1972550),
  createData('Vimal', 'JP', 126317000, 377973),
  createData('Viadik', 'FR', 67022000, 640679),
  createData('Ganesh', 'GB', 67545757, 242495),
  createData('Kannha', 'RU', 146793744, 17098246),
  createData('Narendra', 'NG', 200962417, 923768),
  createData('Suwati', 'BR', 210147125, 8515767),
];



const Appointments = () => {


  const Container = {
      color : 'black',
      fontSize : 30,
      fontWeight: 900
  }
  const button1 = {
    height: 35,
    width: 120,
    borderRadius: 9,
    backgroundColor: 'Blue',
    color: 'white'
  }
  const button2 = {
    height: 35,
    width: 120,
    borderRadius: 9,
    marginLeft:10
  }


const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] =React.useState(10);

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const [age, setAge] = React.useState('');

const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value);
};


  return (
    <>
    <Grid>
        <Card sx={{mb:8}}>
            <CardContent>
                <Typography style={Container}>Set up your profile For client to book online</Typography>
                <Typography sx={{color:"black"}}>Free up time and your client salf-booking online 24\7  </Typography>
                <Button sx={{backgroundColor:"Blue",color:"white",margin:5}}>Start Now </Button>
            </CardContent>
        </Card>


        <Grid >
          <Card>
            <div style={{ margin: "30px",display:"flex" }}>
              <button style={button1}>Quick Sale</button>
              <button style={button2}>Appointments</button>
              <Box sx={{display:'flex',marginLeft:"600px"}}>
             <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-select-small-label">Today</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Monday</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">All Status</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Active</MenuItem>
          <MenuItem value={20}>InActive</MenuItem>
          <MenuItem value={30}>Active</MenuItem>
        </Select>
      </FormControl>
      </Box>
            </div>
          </Card>
          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "0" }}>
            <TableContainer sx={{ maxHeight: 570 }}>
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
              rowsPerPageOptions={[10,15,25,100]}
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

export default Appointments
