import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Menu, MenuItem, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MouseEvent } from 'react';
import Dashboard from '../dashboard'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import SearchIcon from '@mui/icons-material/Search';

// ** MUI Imports
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// ** Icon Imports
import Icon from 'src/@core/components/icon'


type Order = 'asc' | 'desc'

interface Data {
  fat: number
  name: string
  carbs: number
  protein: number
  calories: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number): Data => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)'
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories'
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)'
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)'
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  // ** Prop
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        px: theme => `${theme.spacing(6)} !important`,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='bx:trash-alt' />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  )
}
const Service = () => {
  const [option, setOption] = useState<null | HTMLElement>(null)
  const [add, setAdd] = useState<null | HTMLElement>(null)


  const handleOption = (event: MouseEvent<HTMLButtonElement>) => {
    setOption(event.currentTarget)
  }

  const handleCloseOption = () => {
    setOption(null)
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    setAdd(event.currentTarget)
  }

  const handleCloseAdd = () => {
    setAdd(null)
  }
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof Data>('calories')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [searchTerm, setSearchTerm] = useState('');


  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(row => {
    const searchTermLower = searchTerm.toLowerCase();
    return row.name.toLowerCase().includes(searchTermLower);
  });

  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleImportClick = () => {
    handleCloseOption();
    setOpenImportDialog(true);
  };

  const handleDialogClose = () => {
    setOpenImportDialog(false);
  };

  const handleFileChange = (event: any) => {
    // Handle file selection here
    setSelectedFile(event.target.files[0]);
  };

  const handleImportSubmit = () => {
    // Handle import logic here using the selected file
    // You can dispatch an action or call a function to handle the import
    // Remember to close the dialog after import is done
    handleDialogClose();
  };

  const [selectGroup, setSelectGroup] = useState('');
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);

  const handleSelectGroup = (event: SelectChangeEvent) => {
    setSelectGroup(event.target.value);
  };

  const handleAdded = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddServiceDialogOpen(true);
  };

  const handleCloseAddServiceDialog = () => {
    setAddServiceDialogOpen(false);
  };

  return (
    <>
      <Grid sx={{ display: "flex", width: "100%" }}>
        <Grid sx={{ width: '25%', mr: 3 }}>
          <Dashboard />
        </Grid>
        <Card sx={{ width: '75%', p: 6, height: '100%' }}>
          <Grid sx={{ display: 'flex', width: '100%' }}>
            <Grid sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Services List</Typography>
              <Typography>Create, edit and manage service list</Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Box sx={{ marginTop: "10px" }} >
                <Button sx={{ mr: 2, width: '120px', cursor: 'pointer', textTransform: 'none' }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleOption} endIcon={<ArrowDropDownIcon />}>
                  Options
                </Button>
                <Grid >
                  <Menu keepMounted id='simple-menu' anchorEl={option} onClose={handleCloseOption} open={Boolean(option)} >
                    <MenuItem onClick={handleImportClick}>Import Services</MenuItem>
                    <MenuItem onClick={handleCloseOption}>Sample File</MenuItem>
                  </Menu>
                </Grid>
                <Dialog open={openImportDialog} onClose={handleDialogClose} fullWidth>
                  <DialogTitle>Import</DialogTitle>
                  <DialogContent>
                    {/* File input for importing */}
                    <TextField
                      type="file"
                      onChange={handleFileChange}
                      inputProps={{ accept: '.csv, .xlsx' }} // Specify allowed file types
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleImportSubmit} color="primary" variant='contained'>
                      Import
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
              <Box sx={{ marginTop: "10px" }} >
                <Button sx={{ mr: 2, width: '90px', cursor: 'pointer', textTransform: 'none' }} variant='contained' aria-controls='simple-menu' aria-haspopup='true' onClick={handleAdd} endIcon={<ArrowDropDownIcon />}>
                  Add
                </Button>
                <Grid >
                  <Menu keepMounted id='simple-menu' anchorEl={add} onClose={handleCloseAdd} open={Boolean(add)} sx={{}}>
                    <MenuItem onClick={handleCloseAdd}>Add Group</MenuItem>
                    <MenuItem onClick={() => { handleCloseAdd(); setAddServiceDialogOpen(true); }}>Add Service</MenuItem>
                  </Menu>
                </Grid>
                <Dialog maxWidth="md" sx={{
                  overflow: 'auto', width: '100%', height: '100%'
                }} open={addServiceDialogOpen} onClose={handleCloseAddServiceDialog}>
                  < DialogTitle > Add Service</DialogTitle>
                  <DialogContent>

                    <Grid sx={{ display: 'flex', width: '100%' }}>
                      <FormControl sx={{ m: 1, width: '500px' }}>
                        <Select
                          value={selectGroup}
                          onChange={handleSelectGroup}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value="">
                            <em>Select Group</em>
                          </MenuItem>
                          <MenuItem value={10}>Facial Service</MenuItem>
                          <MenuItem value={20}>Hair Service</MenuItem>
                          <MenuItem value={30}>Nail Art</MenuItem>
                        </Select>
                      </FormControl>
                      <Grid sx={{ width: "100%" }}>
                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { m: 1, width: '300px' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField id="outlined-basic" placeholder='Name' variant="outlined" />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Box sx={{ width: '100%' }}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Description"
                          multiline
                          rows={3}
                          sx={{ width: '100%', m: 1 }}
                        />
                      </Box>
                    </Grid>
                    <Grid sx={{ display: 'flex' }}>
                      <Grid sx={{ width: '100%', m: 0 }}>
                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { m: 1 },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField id="outlined-basic" placeholder='Price' variant="outlined" />
                        </Box>
                      </Grid>
                      <Grid sx={{ width: '100%' }}>
                        <Box >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker label="Basic time picker" />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                    </Grid>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAddServiceDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleCloseAddServiceDialog} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
          </Grid >
          <Grid >
            <EnhancedTableToolbar numSelected={selected.length} />
            <Grid item xs={6}>
              <TextField
                size='small'
                variant="outlined"
                value={searchTerm}
                placeholder='Search'
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <SearchIcon />
                  ),
                }}
              />
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={rows.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}

                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = selected.includes(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.name}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={event => handleClick(event, row.name)}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                          </TableCell>
                          <TableCell component='th' id={labelId} scope='row' padding='none'>
                            {row.name}
                          </TableCell>
                          <TableCell align='right'>{row.calories}</TableCell>
                          <TableCell align='right'>{row.fat}</TableCell>
                          <TableCell align='right'>{row.carbs}</TableCell>
                          <TableCell align='right'>{row.protein}</TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Card >
      </Grid >
    </>
  )
}

export default Service
