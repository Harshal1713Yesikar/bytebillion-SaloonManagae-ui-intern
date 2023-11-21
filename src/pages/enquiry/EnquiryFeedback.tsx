import React, { useEffect, forwardRef, ChangeEvent, useState } from 'react'
import { Table, TableRow, TableBody, TableHead, TableCell, Card, CardHeader, CardContent, CardActionArea, Button, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';


const CustomInput = forwardRef(({ ...props }: any, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const EnquiryFeedback = ({ followUp, setFollowUp, updationCall }: any) => {

  const date = new Date();
  const [dataArray, setDataArray] = useState<any>(followUp)
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<any>(dataArray.length + 1)
  const [initialDescription, setInitialDescription] = useState<any>("")
  const [newEnquiry, setNewEnquiry] = useState<any>({
    "createDate": "",
    "followUpDate": "",
    "description": "",
  })
  const [previousDate, setPreviousDate] = useState<any>("")
  const [newDate, setNewDate] = useState<any>("")

  useEffect(() => {
    setNewEnquiry({
      ...newEnquiry, "createDate": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    })
  }, [])

  const handleSave = (enquiryStatusUpdate: any) => {
    let finalArray = [...dataArray, enquiryStatusUpdate]
    setDataArray(finalArray)
    setFollowUp(finalArray)
    updationCall(finalArray)
    setEditIndex("")
  }

  const handleEdit: any = (data: any, index: number) => {
    return data
  }

  const handleDelete = (index: any) => {
    const newArray = dataArray.filter((data: any, i: number) => { return i != index })
    setDataArray(newArray)
    setFollowUp(newArray)
    updationCall(newArray)
  }

  const handleTextChange = (id: any, newText: any, field: any) => {
    const updatedData = dataArray.map((item: any, index: any) => {
      if (index === id) {
        return { ...item, "description": newText };
      }
      return item;
    });
    setDataArray(updatedData);
  };

  const handleDateChange = (id: any, newText: any, field: any) => {
    const updatedData = dataArray.map((item: any, index: any) => {
      if (index === id) {
        return { ...item, "followUpDate": `${newText.getDate()}/${newText.getMonth() + 1}/${newText.getFullYear()}` };
      }
      return item;
    });
    setDataArray(updatedData);
  };

  useEffect(() => {
    setNewDate("")
  }, [editIndex])

  return (
    <Card>
      <CardHeader title="Enquiry status" />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr no.</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Follow up</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            dataArray.map((data: any, index: any) => {
              return (
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {data.createDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {editIndex == index ?
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={newDate}
                            id='basic-input'
                            autoComplete='OFF'
                            onChange={(fixedDate: Date) => {
                              setNewDate(fixedDate)
                              handleDateChange(index, fixedDate, "followUpDate")
                            }
                            }
                            placeholderText='Follow up Date'
                            required
                            customInput={<CustomInput
                              label='follow up date ' />}
                          />
                        </DatePickerWrapper>
                        : data.followUpDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {
                      editIndex == index ? <TextField
                        value={data.description}
                        label="Message"
                        onChange={(e) => {
                          handleTextChange(index, e.target.value, "description")
                        }}
                      /> :
                        <Typography sx={{ fontWeight: 500 }}>
                          {data.description}
                        </Typography>
                    }
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                      {
                        editIndex == index ? <SaveIcon onClick={() => { updationCall(dataArray); setEditIndex(dataArray.length + 1) }} /> :
                          <EditIcon onClick={() => { handleEdit(data, index); setEditIndex(index); setInitialDescription(data.description); setPreviousDate(data.followUpDate) }} />
                      }
                      {
                        editIndex == index ? <ClearIcon onClick={() => { setEditIndex(dataArray.length + 1); handleTextChange(index, initialDescription, "des") }} /> :
                          <DeleteIcon onClick={() => { handleDelete(index) }} />
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })
          }
          <TableBody>
            <TableCell>
              <Typography sx={{ fontWeight: 500 }}>
                {dataArray.length + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <TextField
                disabled
                value={newEnquiry.createDate}
              />
            </TableCell>
            <TableCell>
              <DatePickerWrapper>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={newEnquiry.followUpDate}
                  id='basic-input'
                  autoComplete='OFF'
                  onChange={(fixedDate: Date) => {
                    setNewEnquiry({
                      ...newEnquiry, "followUpDate": fixedDate
                    }); setIsChanged(true)
                  }
                  }
                  placeholderText='Follow up Date'
                  required
                  customInput={<CustomInput
                    label='follow up date ' />}
                />
              </DatePickerWrapper>
            </TableCell>
            <TableCell>
              <TextField
                value={newEnquiry.description}
                label="message"
                required
                onChange={(e: any) => {
                  setNewEnquiry({
                    ...newEnquiry, "description": e.target.value
                  });
                  setIsChanged(true)
                }
                }
              />
            </TableCell>
            <TableCell>
              <Button
                variant='contained'
                disabled={!newEnquiry.description && !newEnquiry.followUpDate}
                onClick={() => {
                  if (newEnquiry.description && newEnquiry.followUpDate) {
                    const array = dataArray
                    setDataArray([...array, newEnquiry]);
                    handleSave({
                      "createDate": newEnquiry.createDate,
                      "followUpDate": `${newEnquiry.followUpDate.getDate()}/${newEnquiry.followUpDate.getMonth() + 1}/${newEnquiry.followUpDate.getFullYear()}`,
                      "description": newEnquiry.description,
                    })
                    setNewEnquiry({
                      "createDate": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                      "followUpDate": "",
                      "description": "",
                    })
                    setEditIndex(990)
                  }
                }}>ADD</Button>
            </TableCell>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default EnquiryFeedback;
