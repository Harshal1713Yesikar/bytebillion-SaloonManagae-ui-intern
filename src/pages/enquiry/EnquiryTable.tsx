import { Card, CardActions, Box, Typography, CardContent, CardHeader, Button, Icon } from '@mui/material';
import { error } from 'console';
import React, { useState, useEffect, ChangeEvent } from 'react'
import { getAllEnquiryList } from 'src/store/APIs/Api';
import CustomChip from 'src/@core/components/mui/chip'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ServerSideToolbar from 'src/views/tabel/studentTabel/ServerSideToolBar'

const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

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

type SortType = 'asc' | 'desc' | undefined | null

const columns: GridColumns = [

  {
    flex: 0.2,
    minWidth: 150,
    field: 'rollNo',
    headerName: 'Student Id',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.rollNo}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.studentName.split(" ")[0]}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Student Name',
    field: 'studentFirstName',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.studentName.charAt(0).toUpperCase() + params.row.studentName.slice(1)}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 120,
    headerName: 'Enquiry Subject',
    field: 'CourseName',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.enquiryCourse}
      </Typography>
    )
  },


  {
    flex: 0.175,
    minWidth: 110,
    field: 'studentContact',
    headerName: 'Mobile Number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.mobileNumber}
      </Typography>
    )
  },

  {
    flex: 0.175,
    field: 'studentEmail',
    minWidth: 200,
    headerName: 'Email Id',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.email}
      </Typography>
    )
  },
  {
    flex: 0.175,
    field: 'studentStatus',
    minWidth: 80,
    headerName: 'View & update',
    renderCell: (params: GridRenderCellParams) => (
      <div style={{ marginLeft: 20 }}>
        <RemoveRedEyeIcon color='primary' />
      </div>
    )
  },


]

export const EnquiryTable = () => {

  const router = useRouter();
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')
  const [studentData, setStudentData] = useState<any>([])


  useEffect(() => {
    const organizationData = localStorage.getItem('organization')
    if (organizationData) {
      getAllEnquiryList({
        customerId: JSON.parse(organizationData).customerId
        , organizationId: JSON.parse(organizationData).organizationId
      }).then((res: any) => {

        setStudentData(res?.data?.dataArray?.resources)
      }).catch((error: any) => {
        console.log(error, 'enquiryerror')
      })
    }
  }, [])

  const handleCellClick = (row: any) => {
    console.log("cellClick")
    router.push(`/enquiry/${row.id}`)

  }

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)

      // fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }
  const handleSearch = (value: string) => {
    setSearchValue(value)

    // fetchTableData(sort, value, sortColumn)
  }

  return (

    <DataGrid
      autoHeight
      pagination
      rows={studentData}
      getRowId={(row) => row.id}
      columns={columns}
      onCellClick={handleCellClick}
      checkboxSelection
      pageSize={pageSize}
      onSortModelChange={handleSortModel}
      rowsPerPageOptions={[7, 10, 25, 50]}
      onPageChange={newPage => setPage(newPage)}
      components={{ Toolbar: ServerSideToolbar }}
      onPageSizeChange={newPageSize => setPageSize(newPageSize)}

    />


  )
}
export default EnquiryTable;
