import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import React, { ChangeEvent, useState } from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/TableFilter'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types'
import { useRouter } from 'next/router'


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
const InventoryReturn = () => {
  const [data] = useState<DataGridRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])

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

  const [selectedContent, setSelectedContent] = useState('returnOrders');

  const handleInventoryReturnClick = () => {
    setSelectedContent('inventoryReturn');
  };

  const handleReturnOrdersClick = () => {
    setSelectedContent('returnOrders');
  };

  const router = useRouter();
  const handleBack = () => {
    router.push('./');
  }

  return (
    <>
      <Card>
        <Grid sx={{ display: 'flex' }}>
          <Button variant='outlined' sx={{ textTransform: 'none', m: 1 }} onClick={handleBack}>Back</Button>
          <Button variant={selectedContent === 'returnOrders' ? 'outlined' : 'contained'} sx={{ textTransform: 'none', m: 1 }} onClick={handleInventoryReturnClick}>
            Inventory Return
          </Button>
          <Button variant={selectedContent === 'returnOrders' ? 'contained' : 'outlined'} sx={{ textTransform: 'none', m: 1 }} onClick={handleReturnOrdersClick}>
            Return Orders
          </Button>
        </Grid>


        {selectedContent === 'returnOrders' && (
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
        )}

        {selectedContent === 'inventoryReturn' && (
          <>
            <Grid sx={{ m: 2 }}>
              <Grid sx={{ mt: 10, mb: 5 }}>
                <Typography sx={{ letterSpacing: '0.02em', fontFamily: 'sans-serif', fontWeight: '600', fontSize: '22px' }}>
                  Inventory Return (Outlet-to-Warehouse)
                </Typography>
              </Grid>
              <Typography sx={{ fontSize: '15px', backgroundColor: 'rgb(238, 238, 238)', p: 2 }}>
                For business with multiple outlets, the easiest way to replenish stock is often through a stock transfer.
                That transfer doesn’t just have to be from store to store, but it also could mean from warehouse to store, such
                is the necessity of interconnectivity between multiple outlets in modern retailing.
              </Typography>

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
                      value: searchText, clearSearch: () => handleSearch(''),
                      onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                    }
                  }}
                />
              </Grid>

              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
                <Button variant='contained'>Return</Button>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </>
  );
};


export default InventoryReturn
