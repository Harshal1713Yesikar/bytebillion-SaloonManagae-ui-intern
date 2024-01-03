import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'

import React from 'react'
import { Borderless } from 'src/@core/styles/libs/react-draft-wysiwyg'

 const Settings = () => {
  
  const Container = {
    color : 'black',
    fontSize : 21,
    fontWeight: 700,
    borderBottom:" 1px solid "
}
  return (
    <>
    <Grid >
         <Card sx={{height:900}}>
            <CardContent>
                <Typography style={Container}>Business Details</Typography>
            </CardContent>
            <CardContent>
                <Typography>Business Logo</Typography>
                <Typography>Upload a logo to appear on your emails,invoices
                            and mini-wedsite
                </Typography>
            </CardContent>

        </Card>
    </Grid>
    </>
  )
}
export default Settings;
