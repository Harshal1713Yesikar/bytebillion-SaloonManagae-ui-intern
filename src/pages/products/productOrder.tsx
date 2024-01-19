import { Box, Button, Card, Dialog, FormControl, Grid, IconButton, MenuItem, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/TableFilter'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import AddProductRequestMore from 'src/views/forms/addProduct/addProductRequestMore';


interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Name',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.full_name}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Date',
    field: 'start_date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'salary',
    headerName: 'Salary',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.salary}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'Age',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.age}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => {
      const status = statusObj[params.row.status]

      return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
    }
  }
]
const ProductOrder = () => {
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = React.useState('');
  const [selectRetail, setSelectRetail] = React.useState('');
  const [showMoreProduct, setShowMoreProduct] = useState<any[]>([]);

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleSelectProduct = (event: SelectChangeEvent) => {
    setSelectProduct(event.target.value);
  };

  const handleSelectRetail = (event: SelectChangeEvent) => {
    setSelectRetail(event.target.value);
  };



  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    // Handle saving data or any other logic here
    closeModal();
  };

  const handleClose = () => {
    // Handle saving data or any other logic here
    closeModal();
  };

  const Back = useRouter();
  const handleBack = () => {
    Back.push('./');
  }

  const handleAddProductAdd = () => {
    setShowMoreProduct((prevPackage) => [...prevPackage, true]);
  };
  const handleRemoveAddProductMore = (index: number) => {
    setShowMoreProduct((prevService) => {
      const updatedService = [...prevService];
      updatedService.splice(index, 1);

      return updatedService;
    });
  };

  return (
    <>
      <Card>
        <Grid sx={{ display: 'flex', alignItems: 'center', p: 5, width: '100%', borderBottom: '1px solid lightGray', mb: 5 }}>
          <Button onClick={handleBack} sx={{ width: '130px' }} variant='contained'><KeyboardReturnIcon sx={{ mr: 1 }} /> Back</Button>
          <Typography sx={{ fontSize: '20px', ml: 3, width: '100%' }}>Product Orders</Typography>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <AddCircleIcon onClick={openModal} sx={{ fontSize: '40px', cursor: 'pointer' }} />
          </Grid>
          <Dialog maxWidth="md" sx={{ mt: 0 }} open={isModalOpen} onClose={closeModal}>
            <Card >
              <Grid sx={{ p: 5, pb: 2 }}>
                <Grid sx={{ display: 'flex', alignItems: 'center', mb: 10 }}>
                  <CloseIcon onClick={handleClose} sx={{ fontSize: '25px', cursor: 'pointer', mr: 3 }} />
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Add Product Request</Typography>
                </Grid>
                <Grid sx={{ display: 'flex' }}>
                  <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
                    <Select
                      value={selectProduct}
                      onChange={handleSelectProduct}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">
                        <em style={{ fontStyle: 'normal' }}>Select Product</em>
                      </MenuItem>
                      <MenuItem value={10}>Hair Gel</MenuItem>
                      <MenuItem value={20}>Lipstic</MenuItem>
                      <MenuItem value={30}>Test</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField sx={{ m: 1 }} size='small' id='outlined-basic' label='Quantity' />
                  <FormControl sx={{ m: 1, minWidth: 300 }} size='small'>
                    <Select
                      value={selectRetail}
                      onChange={handleSelectRetail}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">
                        <em style={{ fontStyle: 'normal' }}>Retail</em>
                      </MenuItem>
                      <MenuItem value={10}>In House</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid sx={{ borderBottom: '1px solid lightGray', p: 5, pt: 0 }}>

                {showMoreProduct.map((index) => (
                  <AddProductRequestMore key={index} index={index} onRemove={() => handleRemoveAddProductMore(showMoreProduct.length - 1)} />
                ))}

                <Grid sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2, pb: 4 }}>
                  <Button onClick={handleAddProductAdd} sx={{ width: '140px', textTransform: 'none', fontSize: '15px' }} variant='contained'><AddIcon sx={{ mr: 1 }} /> Add More</Button>
                </Grid>
              </Grid>

              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', p: 3, pr: 7 }}>
                <Button onClick={handleSave} variant='contained'>Save</Button>
              </Grid>
            </Card>
          </Dialog>
        </Grid>
        <Grid>
          <DataGrid
            autoHeight
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[7, 10, 25, 50]}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={filteredData.length ? filteredData : data}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            componentsProps={{
              baseButton: {
                variant: 'outlined'
              },
              toolbar: {
                value: searchText,
                clearSearch: () => handleSearch(''),
                onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
              }
            }}
          />
        </Grid>
      </Card>
    </>
  )
}

export default ProductOrder
