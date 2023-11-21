import { Card, Typography, CardHeader, CardContent, Dialog, DialogContent, Grid, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteSingleForm, getAllForm, getSingleForm } from 'src/store/APIs/Api'
import QRCode from 'react-qr-code'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useTheme } from '@mui/material'
import Icon from 'src/@core/components/icon';
import html2canvas from 'html2canvas';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

const FormList = ({ formsArray }: any) => {

  const theme = useTheme()
  const router = useRouter()
  const mode = theme.palette.mode
  const [selectedFormId, setFormId] = useState<any>("")
  const [user, setUser] = useState<any>("")
  const [formList, setFormList] = useState<any>(formsArray)
  const [form, setForm] = useState<any>("")
  const [open, setOpen] = useState<boolean>(false)
  const [downloadLink, setDownloadLink] = useState<any>("")
  const [customerId, setCustomerId] = useState<any>("")
  const [organizationId, setOrganizationId] = useState<any>("")

  useEffect(() => {
    const userData = localStorage.getItem("organization")
    if (userData) {
      setUser(JSON.parse(userData))
      getFormList(JSON.parse(userData).customerId, JSON.parse(userData).organizationId)
      setCustomerId(JSON.parse(userData).customerId)
      setOrganizationId(JSON.parse(userData).organizationId)
    }
  }, [])

  const getFormList = (customerId: any, organizationId: any) => {
    getAllForm({ customerId: customerId, organizationId: organizationId }).then((res: any) => {
      // if (typeof (res.data.data) == "array") {

      setFormList(res.data.data)
      // }
      // else {

      // }
    })
  }

  const handleDownload = async () => {
    const qrCodeContainer = document.getElementById(`canvas-${selectedFormId}`);
    if (qrCodeContainer) {
      const canvas = await html2canvas(qrCodeContainer);
      const imageUri = canvas.toDataURL('image/png');
      setDownloadLink(imageUri);
    }
  };
  const handleClose = () => {
    setOpen(false)
  }

  const handleActivate = (form: any) => {
    const data = {
      "customerId": user.customerId,
      "organizationId": user.organizationId,
      "formTemplateId": form.formTemplateId,
      "formStatus": "active"
    }
    deleteSingleForm(data).then((res: any) => {
      getFormList(customerId, organizationId)
    })
  }

  const handleDelete = (form: any) => {
    const data = {
      "customerId": user.customerId,
      "organizationId": user.organizationId,
      "formTemplateId": form.formTemplateId,
      "formStatus": "inActive"
    }
    deleteSingleForm(data).then((res: any) => {
      getFormList(customerId, organizationId)
    })
  }

  const getSingleFormFunction = (customerId: any, organizationId: any, selectedFormId: any) => {
    getSingleForm({ customerId: customerId, organizationId: organizationId, formTemplateId: selectedFormId }).then((res: any) => {
      setForm(res.data.data)
    })
  }

  useEffect(() => {
    if (selectedFormId) {
      getSingleFormFunction(user.customerId, user.organizationId, selectedFormId)
    }
  }, [selectedFormId])

  return (

    <>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {
          formList?.map((form: any, index: any) => {
            return <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card key={index}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <CardHeader onClick={() => { setFormId(form.formTemplateId); }} title={form.formTitle} />
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <QrCode2Icon onClick={() => { setFormId(form.formTemplateId); setOpen(true) }} />
                      <Button onClick={() => { router.push(`forms/${form.formTemplateId}`) }}>view</Button>
                    </CardContent>
                  </div>

                  <CardContent>
                    {
                      form.formStatus == "active" ?
                        <>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            color='primary'
                            label={`active`}
                            onClick={() => handleDelete(form)}
                            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                          />
                        </>
                        : <>  <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          color='error'
                          label={`inActive`}
                          onClick={() => handleActivate(form)}
                          sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                        />
                        </>
                    }
                  </CardContent>
                </div>
              </Card>
            </Grid>
          })
        }
      </Grid>
      {/* <div style={{ marginTop: 10 }}>
        {
          selectedFormId && <FormView form={form} />
        }
      </div> */}
      <Dialog open={open} >
        <Grid container justifyContent="space-between" alignItems="center" >
          <div>

            <Icon
              onClick={() => { handleDownload() }}
              className="iconContainer"
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:download'
            />

            {/* <Button onClick={() => { window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${organizationId}?userId=${customerId}&organizationName=${organizationName.replaceAll(" ", "%20")}`) }}> */}
            <Icon
              className="iconContainer"
              onClick={() => { window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${user.organizationId}?userId=${user.customerId}&organizationName=${user?.organizationName.replaceAll(" ", "%20")}&formTemplateId=${selectedFormId}`) }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:copy'
            />
            {/* </Button> */}
          </div>
          <Icon
            className="iconContainer"
            onClick={() => { handleClose(); setDownloadLink(''); }}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              margin: "8px",
              transition: "background-color 0.3s",
            }}
            icon='bx:x'
          />
        </Grid>
        {
          downloadLink && <div>
            <a href={downloadLink} download="EnquiryQrCode.png">Click to download</a>
          </div>
        }
        <DialogContent>
          <div id={`canvas-${selectedFormId}`}>
            <QRCode
              fgColor={mode == 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}
              bgColor={mode == 'dark' ? theme.palette.background.paper : 'white'}
              value={`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${user.organizationId}?userId=${user.customerId}&organizationName=${user.organizationName?.replaceAll(" ", "%20")}&formTemplateId=${selectedFormId}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default FormList
