import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FormView from './FormView';
import FormList from './FormList';
import { createEnquiryForm } from 'src/store/APIs/Api';


const Forms = () => {


  const footerRef = useRef<any>();

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isNewForm, setIsNewForm] = useState(false)
  const [formsArray, setFormsArray] = useState<any>()
  const [focus, setFocus] = useState<any>("")
  const [user, setUser] = useState<any>("")
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
  const [updationIndex, setUpdationIndex] = useState<any>(null)
  const [form, setForm] = useState<any>({
    formTitle: "Title",
    formDescription: "",
    active: true,
    formFields: [{
      name: "name",
      isRequired: true,
      message: "Your name",
      type: "textField",
      options: []
    },
    {
      name: "email",
      isRequired: true,
      message: "Required email",
      type: "textField",
      options: []
    },
    {
      name: "phone number",
      isRequired: true,
      message: "Mobile number",
      type: "textField",
      options: []
    }]
  })
  const [field, setField] = useState<any>({
    name: "",
    isRequired: true,
    message: "",
    type: "textField",
    options: []
  })
  const [option, setOption] = useState<any>({
    name: ""
  })

  useEffect(() => {
    const userData = localStorage.getItem("organization")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleNewForm = () => {
    if (form.formTitle && form.formDescription && form.formFields) {
      // setFormsArray([...formsArray, form])
      const data = {
        "customerId": user.customerId,
        "organizationId": user.organizationId,
        "formTitle": form.formTitle,
        "formDescription": form.formDescription,
        "formFields": form.formFields
      }
      createEnquiryForm(data).then((res: any) => {
        console.log(res, "form creation response")
      })
    }
    setForm({
      formTitle: "",
      formDescription: "",
      active: true,
      formFields: []
    });
    setField({
      name: "",
      isRequired: true,
      message: "",
      type: "textField",
      options: []
    });
    setOption({
      name: ""
    })
    setIsNewForm(false)
  }



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

  const handleDiscard = () => {
    setForm({
      formTitle: "",
      formDescription: "",
      active: true,
      formFields: [{
        name: "name",
        isRequired: true,
        message: "name ",
        type: "textField",
        options: []
      },
      {
        name: "email",
        isRequired: true,
        message: "",
        type: "textField",
        options: []
      },
      {
        name: "phone number",
        isRequired: true,
        message: "",
        type: "textField",
        options: []
      }]
    })
    setField({
      name: "",
      isRequired: true,
      message: "",
      type: "textField",
      options: []
    })
  }

  const handleOptionDelete = (index: any) => {
    const newOptions = field.options.filter((option: any, i: any) => index != i)
    setField({ ...field, "options": newOptions })
  }

  const handleFieldUpdate = (field: any, index: any) => {
    setUpdateTrigger(true)
    setUpdationIndex(index)
    setField(field)
  }

  const handleFieldDelete = (index: number) => {
    if (index == 0 || index == 1 || index == 2) {

    }
    else {

      const newFields = form.formFields.filter((field: any, i: number) => index != i)
      setForm({ ...form, formFields: newFields })
    }
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

  return (
    <div>
      <Button variant="contained" onClick={() => setIsNewForm(!isNewForm)}>
        {isNewForm == true ? "cancel" : "create form"}
      </Button>
      {
        isNewForm && <>
          <Card sx={{ mb: 6, mt: 5 }}>
            <CardHeader title="Add new form" />
            <CardContent>
              <TableRow>
                <TableCell>
                  <TextField
                    value={form.formTitle}
                    label="Title"
                    required
                    placeholder='From title'
                    onChange={(e) => { setForm({ ...form, formTitle: e.target.value }) }}
                  />
                </TableCell>
                <TableCell >
                  <TextField
                    value={form.formDescription}
                    label="description"
                    required
                    placeholder='From description'
                    onChange={(e) => { setForm({ ...form, formDescription: e.target.value }) }}
                  />
                </TableCell>
              </TableRow>
            </CardContent>
          </Card >
          <FormView form={form} handleFieldDelete={handleFieldDelete} fields={field} setFields={setField} handleFieldUpdate={handleFieldUpdate} scrollToFooter={scrollToFooter} />
          <div ref={footerRef}>
            <Card >
              <CardContent>
                <Table>

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
                              value={field.type}
                              label="field type"
                              id="demo-simple-select"
                              labelId="demo-simple-select-label"
                              disabled={updationIndex == 0 || updationIndex == 1 || updationIndex == 2}
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
                      updateTrigger ?
                        <Button variant='contained' disabled={!field.name || !field.type} onClick={() => handleFieldUpdateSubmission()}>Update</Button>
                        :
                        <Button variant='contained' disabled={!field.name || !field.type} onClick={() => handleAddField()}>Add field</Button>
                    }
                  </div>
                </Table>
              </CardContent>
              <CardActions>
                <Button variant='contained' onClick={() => { handleNewForm() }}>Create</Button>
                <Button variant='outlined' onClick={() => { handleDiscard() }}>Discard</Button>
              </CardActions>
            </Card>
          </div>
        </>
      }
      {
        !isNewForm &&
        <FormList formArray={formsArray} />
      }

    </div>
  )
}
export default Forms
