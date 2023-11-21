import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material'
import { listAllRoles, updateUserRole } from 'src/store/APIs/Api';
import CreateIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { blue } from '@mui/material/colors';
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid'

const styles = {
  name: {
    marginBottom: -10,
    fontWeight: 'bold'
  },
  subHeading: {
    margin: 0,
    fontWeight: 'lighter',
    marginBottom: -10,
    color: 'primary'
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: -5,
    fontWeight: 'bold'
  }

}

const UserDialogBox = ({ open, setOpen, userData, rolesArray, listRecall }: any) => {

  const [update, setUpdate] = useState<any>(false)
  const [roleInfo, setRoleInfo] = useState<any>({})
  const [userRole, setRole] = useState<any>(userData.role?.roleName)
  const [customerId, setCustomerId] = useState<any>(userData.customerId)
  const router = useRouter()
  const [organizationId, setOrganizationId] = useState<any>(userData.organizationId)
  const [childCustomerId, setChildCustomerId] = useState<any>(userData.childCustomerId)


  const handleUpdate = () => {
    const data = {
      "customerId": userData.customerId,
      "organizationId": userData.organizationId,
      "userId": userData.userId,
      "customerName": userData.userName,
      "userType": roleInfo.roleName,
      "role": {
        ...roleInfo
      }
    }

    updateUserRole({ ...data }).then((res: any) => {
      setRole('')
      setRoleInfo({})
      listRecall(userData.customerId, userData.organizationId)
    })
  }


  return (
    <div >
      {
        userData ?
          <Dialog open={open} fullWidth>
            <Grid container justifyContent="flex-end" alignItems="center" sx={{ mt: '-15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <DialogTitle sx={styles.dialogTitle} style={{ textAlign: 'center', fontSize: '1.5rem !important' }}>User Details</DialogTitle>
              {
                update ? <div style={{ marginTop: '10px' }} >
                  <Icon
                    className="iconContainer"
                    onClick={() => {
                      setOpen(false);
                      setRole('');
                      setUpdate(false);
                      setRoleInfo({});
                    }}
                    style={{
                      cursor: 'pointer',
                      fontSize: '30px',
                      margin: '8px',
                      transition: 'background-color 0.3s',
                    }}
                    icon="bx:x"
                  />
                </div> :
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>Role<Icon
                    className="iconContainer"
                    onClick={() => {
                      setUpdate(true)
                    }}
                    style={{
                      cursor: 'pointer',
                      fontSize: '30px',
                      margin: '8px',
                      transition: 'background-color 0.3s',
                    }}
                    icon="bx:pencil"
                  />
                  </div>
              }

            </Grid>
            <Grid sx={{ alignItems: 'center', justifyContent: 'center' }}>


              <DialogContent>
                <h2 className='name'>
                  {userData?.userName} {userData?.userSurname}
                </h2>
                {!update && (
                  <h3 className='subHeading'>{userData?.role?.roleName}</h3>
                )}

                {update && (
                  <FormControl fullWidth sx={{ marginTop: 5 }}>
                    <Select
                      value={userRole ? userRole : userData.role.roleName}
                      inputProps={{
                        name: 'role',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {rolesArray.map((role: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={role.roleName}
                          onClick={() => {
                            setRole(role.roleName);
                            setRoleInfo(role);
                          }}
                        >
                          {role.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <hr />
              </DialogContent>
              <DialogActions sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
                <Button variant={update ? 'outlined' : "contained"}
                  onClick={() => {
                    router.push({
                      pathname: `/user-management/roles/[user]`,
                      query: { user: userData.userId },
                    });
                  }}
                  sx={{ mr: 6 }}
                >
                  Edit profile
                </Button>
                <div>
                  <Button sx={{ mr: 5 }} onClick={() => { setOpen(false); setRole(''); setUpdate(false); setRoleInfo({}) }} variant='outlined'  >Close</Button>
                  {update && (
                    <Button onClick={() => { setOpen(false); handleUpdate(); }} variant='contained'>Save</Button>
                  )}

                </div>
              </DialogActions>
            </Grid>
          </Dialog>
          : null
      }
    </div >
  )
}

export default UserDialogBox
