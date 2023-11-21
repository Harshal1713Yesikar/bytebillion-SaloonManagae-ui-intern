// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { allInventoryList } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import { Skeleton } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'

// ** ThirdParty Components
import axios from 'axios'
import { useDispatch } from 'react-redux'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/tabel/studentTabel/ServerSideToolBar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from '../../../@fake-db/types'
import RefreshIcon from '@mui/icons-material/Refresh';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import FormValidationBasic from 'src/pages/inventory/createInventory'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

type SortType = 'asc' | 'desc' | undefined | null

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

const dummyData = [
  {
    inventoryId: 1
  },
  {
    inventoryId: 2
  },
  {
    inventoryId: 3
  },
  {
    inventoryId: 4
  },
  {
    inventoryId: 5
  },
  {
    inventoryId: 6
  }
]

const dummyColumns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 180,
    field: 'rollNo',
    headerName: 'Name of expense',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Lorem, ipsum.
              </Typography>
            </Skeleton>
            <Skeleton>
              <Typography noWrap variant='caption'>
                Lorem, ipsum dolor.
              </Typography>
            </Skeleton>
          </Box>

        </Box>
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Description',
    field: 'studentFirstName',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }} >
          Lorem.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Currency',
    field: 'CourseName',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem.
        </Typography>
      </Skeleton>
    )
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Amount',
    field: 'BatchName',
    renderCell: (params: GridRenderCellParams) => (
      <Skeleton >
        <Typography variant='body2' sx={{ display: 'flex', color: 'text.primary', justifyContent: 'center' }}>
          Lorem, ipsum.
        </Typography>
      </Skeleton >
    )
  }
]



const columns: GridColumns = [
  {
    flex: 0.25,
    minWidth: 290,
    field: 'inventoryId',
    headerName: 'Name Of Expense',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={params.row.inventoryName} componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "black",
                textTransform: "capitalize",
                "& .MuiTooltip-arrow": {
                  color: "black"
                }
              }
            }
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.inventoryName}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.email}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      )
    }
  },


  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Description',
    field: 'Description',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.inventoryDescription} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.inventoryDescription}
        </Typography>
      </Tooltip>
    )
  },



  {
    flex: 0.125,
    field: 'Amount',
    minWidth: 80,
    headerName: 'Amount',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.inventoryAmount} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          ₹ {params.row.inventoryAmount}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'Datecreated',
    headerName: 'Date created',
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.dateCreated} componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "black",
            textTransform: "capitalize",
            "& .MuiTooltip-arrow": {
              color: "black"
            }
          }
        }
      }}>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>

          {`${new Date(params.row.dateCreated).getDate()}`} / {`${new Date(params.row.dateCreated).getMonth() + 1}`} / {`${new Date(params.row.dateCreated).getFullYear()}`}
        </Typography>
      </Tooltip>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'Status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => (

      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.inventoryStatus == "active" ? <CustomChip rounded size='small' skin='light' color='success' label={params.row.inventoryStatus} /> : <CustomChip rounded size='small' skin='light' color='secondary' label={params.row.inventoryStatus} />}


      </Typography>

    )
  },
]

interface inventory {
  customerId: string;
  organizationId: string;
  inventoryId: string;
  inventoryName: string;
  inventoryDescription: string;
  inventoryAmount: string;
  categoryName: string;
  currencyCode: string;
  inventoryStatus: string;
}


const InventoryTable = ({ reload }: any) => {
  // ** State
  const [user, setUser] = useState<any>()

  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(10)
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')
  const router = useRouter()
  const [reList, setReList] = useState<any>([])
  const [getAllInventory, setAllInventory] = useState<inventory[]>([])
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)


  function loadServerRows(currentPage: number, data: inventory[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }



  useEffect(() => {

    if (user) {
      listAllInventoryFunc(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, reload])

  const listAllInventoryFunc = (user: any) => {
    dispatch(allInventoryList({
      customerId: user.customerId,
      organizationId: user.organizationId
    })).then((res: any) => {
      setAllInventory(res?.payload?.data)
      setReList(res?.payload?.data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)

    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value) {

      const data: any = getAllInventory.filter((e, index) => {
        if (e.inventoryName.includes(value) || e.inventoryDescription.includes(value) || e.inventoryAmount.includes(value)) {
          return e;
        }

      })
      if (data?.length > 0) {
        setAllInventory(data)
      }
      else {

        setAllInventory(reList)

      }
    }
    else {
      setAllInventory(reList)
    }
  }



  const handleCellClick = (row: any) => {
    router.push(`/inventory/inventoryDetails/${row.id}`)

  }

  return (
    <>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            className='refresh' variant='outlined' size='small' sx={{ ml: 6, mt: 5, mb: 5, height: 34 }} onClick={() => {
              listAllInventoryFunc(user);
              setIsLoading(true)
            }}><RefreshIcon />
          </Button>
          {/* <FormValidationBasic /> */}
        </div>
        <DataGrid
          autoHeight
          pagination
          rows={isLoading ? dummyData : getAllInventory}
          sx={{ cursor: 'pointer' }}
          getRowId={(row) => row.inventoryId}
          onCellClick={handleCellClick}
          columns={isLoading ? dummyColumns : columns}
          pageSize={pageSize}
          disableSelectionOnClick
          onSortModelChange={handleSortModel}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageChange={newPage => setPage(newPage)}
          components={{ Toolbar: ServerSideToolbar }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchValue,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            },
          }}
        />

      </Card>

    </>
  )
}

export default InventoryTable
