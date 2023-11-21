import { useRouter } from "next/router";
import FormTable from "./formDataList/FormTable";
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeColor } from 'src/@core/layouts/types';
import CustomAvatar from 'src/@core/components/mui/avatar';
import React, { useEffect, useRef, useState } from "react";
import { getAllFormData, getSingleForm, updateSingleForm } from "src/store/APIs/Api";
import { Card, Grid, Button, CardContent, Typography, Box, Divider, Tab, Skeleton, Dialog, DialogActions, DialogTitle, Table, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Radio, CardHeader } from "@mui/material";
import FormView from "./FormView";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomChip from 'src/@core/components/mui/chip'
import CreateIcon from '@mui/icons-material/Create';

const FormDataList = () => {


  const footerRef = useRef<any>();
  const fieldRef = useRef<any>();

  const router = useRouter()
  const [user, setUser] = useState<any>("")
  const [form, setForm] = useState<any>("")
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [customerId, setCustomerId] = useState<any>("")
  const [defaultForm, setDefaultForm] = useState<any>("")
  const [organizationId, setOrganizationId] = useState<any>("")
  const [updationIndex, setUpdationIndex] = useState<any>(null)
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
  const [formTemplateId, setFormTemplateId] = useState<any>(router.query.templateId)
  const [option, setOption] = useState<any>({
    name: ""
  })
  const [field, setField] = useState<any>({
    name: "",
    isRequired: true,
    message: "",
    type: "textField",
    options: []
  })
  const handleFieldUpdate = (field: any, index: number) => {
    setUpdateTrigger(true)
    setUpdationIndex(index)
    setField(field)
  }

  const handleFieldUpdateSubmission = () => {
    let dummyForm = form
    dummyForm.formFields[updationIndex] = field
    setForm(dummyForm)
    setField({
      name: "",
      isRequired: true,
      message: "",
      type: "textField",
      options: []
    })
    setUpdateTrigger(false)
    setUpdationIndex(-1)
  }

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddField = () => {
    if (form.formFields) {
      const data = [...form.formFields]
      data.push(field)
      setForm({ ...form, formFields: data })
      setField({
        name: "",
        isRequired: true,
        message: "",
        type: "textField",
        options: []
      })
    }
    else {
      const data = []
      data.push(field)
      setForm({ ...form, formFields: data })
      setField({
        name: "",
        isRequired: true,
        message: "",
        type: "textField",
        options: []
      })
    }
  }


  useEffect(() => {
    const organizationData = localStorage.getItem("organization")
    if (organizationData) {
      setUser(JSON.parse(organizationData))
      setCustomerId(JSON.parse(organizationData).customerId)
      setOrganizationId(JSON.parse(organizationData).organizationId)
      getAllFormDataFunc(JSON.parse(organizationData).customerId, JSON.parse(organizationData).organizationId, formTemplateId)
      getSingleFormFunction(JSON.parse(organizationData).customerId, JSON.parse(organizationData).organizationId, formTemplateId)
    }
  }, [router.query])

  const getSingleFormFunction = (customerId: any, organizationId: any, selectedFormId: any) => {
    getSingleForm({ customerId: customerId, organizationId: organizationId, formTemplateId: selectedFormId }).then((res: any) => {
      setForm(res.data.data)
      setDefaultForm(res.data.data)
    })
  }

  const getAllFormDataFunc = (customerId: any, organizationId: any, formTemplateId: any) => {
    getAllFormData({ customerId: customerId, organizationId: organizationId, formTemplateId: formTemplateId }).then((res: any) => {
      setFormData(res.data.data)
      setLoading(false)
    })
  }

  const handleFormTemplateUpdate = () => {
    updateSingleForm(form)
  }

  const handleAddOption = () => {
    if (field.options) {
      const data = field.options
      data.push(option)
      setField({ ...field, options: data })
      setOption({
        name: ""
      })
    }
    else {
      const data = []
      data.push(option)
      setField({ ...field, options: data })
      setOption({
        name: ""
      })
    }
  }
  const handleOptionDelete = (index: any) => {
    const newOptions = field.options.filter((option: any, i: any) => index != i)
    setField({ ...field, "options": newOptions })
  }
  const handleFieldDelete = (index: number) => {
    if (index == 0 || index == 1 || index == 2) {

    }
    else {
      const newFields = form.formFields.filter((field: any, i: number) => index != i)
      setForm({ ...form, formFields: newFields })
    }
  }
  return (
    <>
      <Grid container spacing={3} className='enquirylistpage'>
        <Grid item xs={12} sm={12} md={6} lg={4} >
          <Card>
            <Button onClick={() => router.back()} sx={{ marginTop: 2, ml: 2 }} variant='outlined'>&#8592; Back</Button>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={'primary' as ThemeColor}
                sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
              >
                {form?.formTitle?.charAt(0).toUpperCase()}
              </CustomAvatar>
              {form?.formTitle?.toUpperCase()}
              <CustomChip
                rounded
                skin='light'
                size='small'
                color='primary'
                label={form.formStatus}
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              />
            </CardContent>
            <CardContent >
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important`, pt: 3 }} />
              {
                !formData?.length &&
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }} variant="outlined" onClick={() => { setOpen(true), scrollToFooter() }}>
                    edit<CreateIcon />
                  </Button>
                </div>
              }
              <Box sx={{ pt: 2 }}>
                <Box sx={{ display: 'flex', m: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Responses :</Typography>
                  {
                    loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                      : <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        color='success'
                        label={formData.length}
                        sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                      />
                  }
                </Box>
                <Divider />
                {
                  form?.formFields?.map((data: any, index: any) => {
                    return (<>
                      <Box key={index} sx={{ display: 'flex', m: 4 }}>
                        <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Field name :</Typography>
                        {
                          loading ? <Skeleton><Typography sx={{ color: 'text.secondary' }}> lorem ipsum</Typography></Skeleton>
                            : <Typography sx={{ color: 'text.secondary' }}>{data.name} {data.isRequired ? '*' : ''}</Typography>
                        }
                      </Box>
                      <Box key={index} sx={{ display: 'flex', flexDirection: 'column', ml: 10 }}>
                        {
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography sx={{ color: 'text.primary' }}>Type :</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{data.type}</Typography>
                          </div>
                        }
                        {
                          data.options.length ?
                            <Typography sx={{ color: 'text.primary' }}>Options</Typography> : ''
                        }
                        {
                          data.options.map((option: any, i: number) => {
                            return (
                              <>
                                <MenuItem sx={{ color: 'text.secondary', width: '100%' }}><li>{option.name}</li></MenuItem>
                              </>
                            )
                          })
                        }
                      </Box>
                    </>
                    )
                  })
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8}>
          {
            formData.length ?
              <Card>
                <CardContent>
                  <FormTable data={formData} getAllFormDataFunc={getAllFormDataFunc} />
                </CardContent>
              </Card>
              : <Card>
                <CardHeader title={"No Entry found"} />
              </Card>
          }
        </Grid>
      </Grid >
      <div ref={footerRef}>


        {
          open &&
          <Box >
            <DialogTitle>Edit form template</DialogTitle>
            <FormView form={form} handleFieldDelete={handleFieldDelete} fields={field} setFields={setField} handleFieldUpdate={handleFieldUpdate} scrollToFooter={scrollToField} />
            <Card>
              <div ref={fieldRef}>
                <CardContent>
                  <TextField
                    value={field.name}
                    label="field name"
                    variant="filled"
                    required
                    disabled={updationIndex == 0 || updationIndex == 1 || updationIndex == 2}
                    fullWidth
                    placeholder='field name'
                    onChange={(e) => { setField({ ...field, name: e.target.value }) }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment sx={{ width: "50%" }} position="end">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">field type</InputLabel>
                            <Select
                              disabled={updationIndex == 0 || updationIndex == 1 || updationIndex == 2}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={field.type}
                              label="field type"
                              onChange={(e) => { setField({ ...field, type: e.target.value }) }}
                            >
                              <MenuItem value={"textField"}>Text Field</MenuItem>
                              <MenuItem value={"dropDown"}>Drop down</MenuItem>
                              <MenuItem value={"radio"}>Radio</MenuItem>
                            </Select>
                          </FormControl>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {
                    field?.options?.map((option: any, index: number) => {
                      if (field.type == "dropDown") {
                        return <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          opt {index + 1}.
                          <MenuItem > {option?.name}</MenuItem>
                          <CancelIcon onClick={() => handleOptionDelete(index)} />
                        </div>
                      }
                      if (field.type == "radio") {
                        return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "1ps solid primary", background: "primary" }}>
                          <FormControlLabel value={true} control={<Radio />} label={option?.name} />
                          <CancelIcon onClick={() => handleOptionDelete(index)} />
                        </div>
                      }
                    })
                  }


                  {
                    field.type == "dropDown" || field.type == "radio" ?
                      <>
                        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                          <TextField label="Option" value={option.name} onChange={(e) => { setOption({ ...option, name: e.target.value }) }} />
                          <Button onClick={() => handleAddOption()}>
                            <AddCircleIcon />
                          </Button>
                        </div>
                      </>
                      : ""
                  }
                  <TextField
                    value={field.message}
                    label="Description"
                    sx={{ mt: 10 }}
                    fullWidth
                    autoFocus={updationIndex == 0 || updationIndex == 1 || updationIndex == 2}
                    rows={4} // Set a default number of rows
                    maxRows={10}
                    placeholder='field description'
                    onChange={(e) => { setField({ ...field, message: e.target.value }) }}
                  />
                  {
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                      Required:
                      <Button sx={{ ml: 5 }} variant='outlined' onClick={() => setField({ ...field, isRequired: !field.isRequired })}>{`${field.isRequired}`}</Button>
                    </div>
                  }
                  <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    {
                      updateTrigger ? <Button onClick={() => { handleFieldUpdateSubmission() }} variant="contained">save</Button> :
                        <Button variant='contained' disabled={!field.name || !field.type} onClick={() => handleAddField()}>Add field</Button>
                    }
                  </div>
                </CardContent>
              </div>
            </Card>
            <DialogActions>
              <Button onClick={() => { setOpen(false), setForm(defaultForm) }}>cancel</Button>
              <Button onClick={() => { setOpen(false), handleFormTemplateUpdate() }} variant="contained">Update</Button>
            </DialogActions>
          </Box>
        }
      </div>
    </>
  );
}

export default FormDataList
