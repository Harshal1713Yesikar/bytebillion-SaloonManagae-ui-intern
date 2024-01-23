import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


import DeleteIcon from '@mui/icons-material/Delete';

// import { Icon } from '@iconify/react';

const ClientCustomerCreate = () => {


  const [isModalOpen, setModalOpen] = useState(false);
  const [client, setClient] = useState('');

  const openClient = () => {
    setModalOpen(true);
  };

  const closeClient = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    // Handle saving data or any other logic here
    closeClient();
  };

  const [isEditOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState('');

  const openEdit = () => {
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
  };

  const handleEdit = () => {
    // Handle saving data or any other logic here
    closeEdit();
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Do you want to delete?');

    if (confirmDelete) {
      // Add your logic to delete the item here
      // You can call a function or dispatch an action to handle the deletion
    }
  };

  return (
    <>
      <Card>
        <Grid>
          <Grid style={{ display: "flex", width: "100%", padding: "30px" }}>
            <Typography style={{ borderBottom: "2px solid lightGray", width: "100%", fontSize: "20px", fontWeight: "600", paddingBottom: "20px" }}>Customer Groups</Typography>
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button sx={{ fontSize: 40, cursor: 'pointer' }} onClick={openClient}>create</Button>
            </Grid>
            <Dialog open={isModalOpen} onClose={closeClient}>
              <DialogTitle sx={{ width: "500px" }}>Add Client Group</DialogTitle>
              <DialogContent sx={{ borderBottom: "2px solid lightGray", width: "100%", marginBottom: "20px" }}>
                <Grid style={{ display: 'flex' }}>
                  <TextField
                    sx={{ m: 5, width: "100%" }}
                    label="Name"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSave} variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={closeClient} variant="contained" color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid style={{ display: 'flex', width: "100%", padding: "30px" }}>
            <Typography style={{ width: "100%", fontSize: "15px", fontWeight: "600", paddingBottom: "20px" }}>Name</Typography>
            <Grid sx={{ display: "flex" }}>
              <Icon baseClassName="fas" className="fa-edit" sx={{ cursor: 'pointer', fontSize: "20px" }} onClick={openEdit} />
              <DeleteIcon onClick={handleDeleteClick} sx={{ fontSize: "25px", marginLeft: "10px" }} />
            </Grid>
            <Dialog open={isEditOpen} onClose={closeEdit}>
              <DialogTitle sx={{ width: "500px" }}>Edit Client Group</DialogTitle>
              <DialogContent sx={{ borderBottom: "2px solid lightGray", width: "100%", marginBottom: "20px" }}>
                <Grid style={{ display: 'flex' }}>
                  <TextField
                    sx={{ m: 5, width: "100%" }}
                    label="Name"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEdit} variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={closeEdit} variant="contained" color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Card>


    </>
  )
}

export default ClientCustomerCreate
