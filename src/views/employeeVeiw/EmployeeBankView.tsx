// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

import EmployeeBankDetailsListTable from './EmployeeBankDetailsListTable'

const EmployeeBankView = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EmployeeBankDetailsListTable />
      </Grid>


      <Grid item xs={12}>

      </Grid>
    </Grid>
  )
}

export default EmployeeBankView
