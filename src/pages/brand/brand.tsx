import AddCircle from '@mui/icons-material/AddCircle'
import { Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'

const Brand = () => {
  return (
    <>
      <Card>
        <Grid>
          <Button variant='contained'>
            Back
          </Button>
          <Typography>Product Brand</Typography>
        </Grid>
        <Grid><AddCircle /></Grid>
      </Card>
    </>
  )
}

export default Brand
