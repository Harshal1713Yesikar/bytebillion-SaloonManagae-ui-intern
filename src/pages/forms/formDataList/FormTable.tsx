import { Button, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { getSingleFormData, updateSingleFormData, deleteSingleFormData } from 'src/store/APIs/Api'
import CreateIcon from '@mui/icons-material/Create';
import CustomChip from 'src/@core/components/mui/chip'
import DeleteIcon from '@mui/icons-material/Delete';

export const DummyTable = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>
            <Skeleton>
              <Typography>
                sr
              </Typography>
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton>
              <Typography>
                name
              </Typography>
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton>
              <Typography>
                email
              </Typography>
            </Skeleton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton>
              <Typography>
                email
              </Typography>
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton>
              <Typography>
                email
              </Typography>
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton>
              <Typography>
                email
              </Typography>
            </Skeleton>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  )
}

const FormTable = ({ data, getAllFormDataFunc }: any) => {
  const router = useRouter()
  const [user, setUser] = useState<any>("")
  const [customerId, setCustomerId] = useState<any>("")
  const [organizationId, setOrganizationId] = useState<any>("")
  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    const organizationData = localStorage.getItem("organization")
    if (organizationData) {
      setUser(JSON.parse(organizationData))
      setCustomerId(JSON.parse(organizationData).customerId)
      setOrganizationId(JSON.parse(organizationData).organizationId)

    }
  }, [])


  function splitCamelCase(input: any) {
    return input.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  const getSingleFormDataFunc = (field: any) => {

    getSingleFormData({ customerId: field.customerId, organizationId: field.organizationId, formTemplateId: field.formTemplateId, formId: field.formId }).then((res: any) => {

    })
  }


  const handleEdit = (data: any) => {
    console.log(data)
  }

  const handleFormDataDelete = (field: any) => {
    let updataionData = {
      "customerId": field.customerId,
      "organizationId": field.organizationId,
      "formTemplateId": field.formTemplateId,
      "formId": field.formId,
      "formStatus": "inActive"
    }
    deleteSingleFormData(updataionData).then((res: any) => {
      getAllFormDataFunc(field.customerId, field.organizationId, field.templateId)
    })

  }

  return (
    <>

      <Table>

        {
          !data ?
            <DummyTable /> :
            <>
              <TableHead>
                <TableCell >Status</TableCell>
                {
                  data[0]?.formData &&
                  Object.keys(data[data.length - 1].formData).map((key: any) => {
                    return (
                      <TableCell key={key}>{splitCamelCase(key)}</TableCell>
                    );
                  })
                }
              </TableHead>
              <TableBody>
                {
                  data.map((field: any, index: any) => {

                    return (
                      <TableRow key={index}
                      // onClick={() => getSingleFormDataFunc(field)}

                      >
                        {
                          field.formStatus == "active" ?
                            <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                color='primary'
                                label={field.formStatus}
                                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                              />
                              <DeleteIcon onClick={() => { handleFormDataDelete(field) }} /></TableCell> :
                            <TableCell>
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                color='error'
                                label={field.formStatus}
                                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                              />
                            </TableCell>

                        }
                        {
                          field.formData &&
                          Object.keys(field.formData).map((key: any) => {
                            const value = field.formData[key];
                            return (
                              <TableCell key={key}>{value}</TableCell>
                            );
                          })
                        }

                        {/* <TableCell><CreateIcon onClick={() => handleEdit(field)} /></TableCell> */}
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </>
        }
      </Table>
    </>
  )
}
export default FormTable
