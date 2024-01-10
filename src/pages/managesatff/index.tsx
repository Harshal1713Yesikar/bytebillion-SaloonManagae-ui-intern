import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Button, CardContent, Typography } from '@mui/material'
import TableColumns from 'src/views/apps/manageStaff/AddStaff'
import ListSimple from '../dashboard'

const Managesaff = () => {
  return (
    <>
      <Grid>
        <Grid sx={{ mb: 5, borderRadius: '100' }}>
          <ListSimple/>
          <Card>
            <CardContent>
              {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
              <Typography sx={{color:"black",fontSize:20,fontWeight:"600"}}>Staff List</Typography>
              <Typography>
              Ensure the management of staff attendance, their availability, payroll, commissions, and access<br/> permissions.
              </Typography>
            </CardContent>
              <Card>
                <TableColumns/>
              </Card>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Managesaff
