// ** MUI Imports

import Grid from '@mui/material/Grid'






import InventoryProjectListTable from './InventoryProjectListTable'





const UserViewOverview = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <InventoryProjectListTable />
      </Grid>

      <Grid item xs={12}>

      </Grid>
    </Grid>
  )
}

export default UserViewOverview
