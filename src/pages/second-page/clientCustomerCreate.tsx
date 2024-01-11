import { Card, Grid, Icon, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { loadCSS } from 'fg-loadcss';

const ClientCustomerCreate = () => {
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',

      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <>
      <Card>
        <Grid>
          <Grid style={{ display: "flex", width: "100%", padding: "30px" }}>
            <Typography style={{ borderBottom: "2px solid lightGray", width: "100%", fontSize: "20px", fontWeight: "600", paddingBottom: "20px" }}>Customer Groups</Typography>
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
            </Grid>
          </Grid>
          <Grid style={{ display: 'flex', width: "100%", padding: "30px" }}>
            <Typography style={{ width: "100%", fontSize: "15px", fontWeight: "600", paddingBottom: "20px" }}>Name</Typography>
          </Grid>
        </Grid>
      </Card>


    </>
  )
}

export default ClientCustomerCreate
