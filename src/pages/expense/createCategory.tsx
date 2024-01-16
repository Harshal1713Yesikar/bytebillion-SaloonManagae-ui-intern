import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import React, { ChangeEvent, useState } from 'react'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { DataGridRowType } from 'src/@fake-db/types'
import CustomChip from 'src/@core/components/mui/chip'
import QuickSearchToolbar from 'src/views/table/TableFilter'
import { useRouter } from 'next/router'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}
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
const CreateCategory = () => {
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
  const router = useRouter();
  const handleExpense = () => {
    router.push('./');
  }


  return (
    <>
      <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleExpense} variant='contained' sx={{ m: 2 }}>+ Expenses</Button>
      </Grid>
      <Grid sx={{ display: 'flex' }}>
        <Card sx={{ width: "70%" }}>
          <Typography sx={{ fontWeight: '800', fontSize: '20px', m: 5 }}>All Category</Typography>
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
          <Grid style={{ display: 'flex', justifyContent: 'center', gap: "20px", padding: "20px" }}>
            <Button variant='outlined' >
              Previous
            </Button>
            <Button variant='contained' >
              Next
            </Button>
          </Grid>
        </Card>
        <Card sx={{ ml: "10px", width: "30%" }}>
          <Typography sx={{ fontWeight: '800', fontSize: '20px', m: 5 }}>Add Category</Typography>
          <Grid>
            <Typography sx={{ m: 2 }}>Name</Typography>
            <TextField
              sx={{ m: 2, width: "90%" }}
              fullWidth
              size='small'
            />
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ m: 5 }} variant='contained'>Submit</Button>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}

export default CreateCategory
