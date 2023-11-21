import CountUp from 'react-countup'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import { StudentOverDuePaymentList } from 'src/store/APIs/Api'
import { Card, Box, CardHeader, CardContent, Typography, Table, tooltipClasses } from '@mui/material'
import { ResponsiveContainer, BarChart, Legend, CartesianGrid, Tooltip, XAxis, YAxis, Bar } from 'recharts'
import { FormControl, InputLabel, Select, Grid, MenuItem, TableCell, TableRow, Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

function Item(props: any) {
  const { sx, ...other } = props

  return (
    <Box
      sx={{
        p: 3,
        m: 1,

        bgcolor: theme => (theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100'),
        color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        borderColor: theme => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '1.10rem',
        fontWeight: '1000',
        ...sx
      }}
      {...other}
    />
  )
}
Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
}

const getIntroOfPage = (label: any, data: any, year: any) => {
  const name: any[] = []
  if (data) {
    data?.map((value: any, index: number) => {
      if (label == 'Jan.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '01' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label == 'Feb.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '02' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Mar.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '03' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Apr.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '04' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'May.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '05' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label == 'Jun.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '06' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label == 'Jul.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '07' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Aug.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '08' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Sep.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '09' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Oct.') {
        value.paymentForecast.map((val: any, i: number) => {

          if (val.Details.nextpaymetDate.split('-')[1] == '10' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }

          }
        })
      }
      if (label === 'Nov.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '11' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
      if (label === 'Dec.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '12' && val.Details.nextpaymetDate.split('-')[2] == year) {
            if (!name.includes(`${value.studentFirstName} ${value.studentLastName}`)) {
              name.push(`${value.studentFirstName} ${value.studentLastName}`)
            }
          }
        })
      }
    })
  }
  return name ? name : []
}
const CustomTooltip = ({ active, payload, label, setToolTipData, data, toolTipData }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className='custom-tooltip' style={{ background: 'transparent' }}>
        <CardHeader title={`${label} : ${payload[0].value}`} className='label'></CardHeader>
        {getIntroOfPage(payload[0].payload.month, data, toolTipData).length > 0 ? (
          getIntroOfPage(payload[0].payload.month, data, toolTipData).length > 3 ? (
            <CardContent sx={{ height: '30vh' }}>
              {getIntroOfPage(payload[0].payload.month, data, toolTipData).map((names: any, index) => {
                return (
                  <Typography key={index} className='intro'>
                    {names}
                  </Typography>
                )
              })}
            </CardContent>
          ) : (
            <CardContent sx={{ height: '10vh' }}>
              {getIntroOfPage(payload[0].payload.month, data, toolTipData).map((names: any, index) => {
                return (
                  <Typography key={index} className='intro'>
                    {names}
                  </Typography>
                )
              })}
            </CardContent>
          )
        ) : (
          ''
        )}
      </Card>
    )
  }
  return null
}

const OverDuePaymentChart = ({ direction, expand, setExpand }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userId, setUser] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [overAllDueAmount, setOverAllDueAmount] = useState(0)
  const [dropDownValue, setDropDownValue] = useState<any>(2023)
  const [overDueData, setOverDueData] = useState<any>([])
  const [month, setMonth] = useState<any>('')
  const [toolTipData, setToolTipData] = useState<any>([])
  const [touched, setTouched] = useState<boolean>(false)
  const [yearlyData, setYearlyData] = useState<any>(0)
  const [currentPayment, setCurrentPayment] = useState([
    { month: 'Jan.', overDuePayment: 0 },
    { month: 'Feb.', overDuePayment: 0 },
    { month: 'Mar.', overDuePayment: 0 },
    { month: 'Apr.', overDuePayment: 0 },
    { month: 'May.', overDuePayment: 0 },
    { month: 'Jun.', overDuePayment: 0 },
    { month: 'Jul.', overDuePayment: 0 },
    { month: 'Aug.', overDuePayment: 0 },
    { month: 'Sep.', overDuePayment: 0 },
    { month: 'Oct.', overDuePayment: 0 },
    { month: 'Nov.', overDuePayment: 0 },
    { month: 'Dec.', overDuePayment: 0 }
  ])

  useEffect(() => {
    const date = new Date()
    setDropDownValue(date.getFullYear())
    const organization = localStorage.getItem('organization')
    if (organization) {
      setUser(JSON.parse(organization).customerId)
      setOrganizationId(JSON.parse(organization).organizationId)
      dispatch(
        StudentOverDuePaymentList({
          customerId: JSON.parse(organization).customerId,
          organizationId: JSON.parse(organization).organizationId
        })
      ).then((res: any) => {
        let data = 0
        setOverDueData(res.payload.data)
        const charData = [
          { month: 'Jan.', overDuePayment: 0 },
          { month: 'Feb.', overDuePayment: 0 },
          { month: 'Mar.', overDuePayment: 0 },
          { month: 'Apr.', overDuePayment: 0 },
          { month: 'May.', overDuePayment: 0 },
          { month: 'Jun.', overDuePayment: 0 },
          { month: 'Jul.', overDuePayment: 0 },
          { month: 'Aug.', overDuePayment: 0 },
          { month: 'Sep.', overDuePayment: 0 },
          { month: 'Oct.', overDuePayment: 0 },
          { month: 'Nov.', overDuePayment: 0 },
          { month: 'Dec.', overDuePayment: 0 }
        ]
        res.payload.data.map((value: any, index: number) => {
          value.paymentForecast.map((innerValue: any, i: number) => {
            data += parseInt(innerValue.Details.duePayment)
            if (Number(innerValue.Details.nextpaymetDate.split('-')[2]) == 2023) {
              charData[Number(innerValue.Details.nextpaymetDate.split('-')[1]) - 1].overDuePayment += parseInt(
                innerValue.Details.duePayment
              )
            }
          })
        })
        setCurrentPayment(charData)
        setOverAllDueAmount(data)
      })
        .catch((err: any) => {
          return err;
        })
    }
  }, [])

  useEffect(() => {
    setToolTipData([])
    setMonth('')
    const data = [
      { month: 'Jan.', overDuePayment: 0 },
      { month: 'Feb.', overDuePayment: 0 },
      { month: 'Mar.', overDuePayment: 0 },
      { month: 'Apr.', overDuePayment: 0 },
      { month: 'May.', overDuePayment: 0 },
      { month: 'Jun.', overDuePayment: 0 },
      { month: 'Jul.', overDuePayment: 0 },
      { month: 'Aug.', overDuePayment: 0 },
      { month: 'Sep.', overDuePayment: 0 },
      { month: 'Oct.', overDuePayment: 0 },
      { month: 'Nov.', overDuePayment: 0 },
      { month: 'Dec.', overDuePayment: 0 }
    ]
    let amount = 0
    overDueData.map((value: any, index: number) => {
      value.paymentForecast.map((innerValue: any, i: number) => {
        if (Number(innerValue.Details.nextpaymetDate.split('-')[2]) == dropDownValue) {
          amount += parseInt(innerValue.Details.duePayment);
          data[Number(innerValue.Details.nextpaymetDate.split('-')[1]) - 1].overDuePayment += parseInt(
            innerValue.Details.duePayment
          )
        }
      })
    })
    setYearlyData(amount)
    setCurrentPayment(data)
  }, [dropDownValue])

  useEffect(() => {
    let nameArray: any = []


    overDueData?.map((value: any, index: number) => {

      if (month == 'Jan.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '01' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Feb.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '02' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Mar.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '03' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Apr.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '04' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'May.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '05' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Jun.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '06' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Jul.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '07' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Aug.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '08' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Sep.') {
        value.paymentForecast.map((val: any, i: number) => {

          if (
            val.Details.nextpaymetDate.split('-')[1] == '09' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
        // nameArray.push(...newArray)
      }
      if (month == 'Oct.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (val.Details.nextpaymetDate.split('-')[1] == '10' && val.Details.nextpaymetDate.split('-')[2] == dropDownValue) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Nov.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '11' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
      if (month == 'Dec.') {
        value.paymentForecast.map((val: any, i: number) => {
          if (
            val.Details.nextpaymetDate.split('-')[1] == '12' &&
            val.Details.nextpaymetDate.split('-')[2] == dropDownValue
          ) {
            if (!nameArray.includes(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)) {
              nameArray.push(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
            }
            else {
              let index = nameArray.indexOf(`${value.studentFirstName} ${value.studentLastName} ${val.Details.duePayment}/${value.rollNo}`)
              let amount = parseInt(nameArray[index].split("/")[0].split(" ")[2])
              amount += parseInt(val.Details.duePayment)
              nameArray[index] = `${value.studentFirstName} ${value.studentLastName} ${amount}/${value.rollNo}`
            }
          }
        })
      }
    })
    setToolTipData(nameArray)
  }, [month])

  return (
    <Card >
      <CardHeader
        title='Due payment status'
        action={
          <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <InputLabel id='demo-customized-select-label'>Year</InputLabel>
              <Select
                value={dropDownValue}
                onChange={e => {
                  setDropDownValue(e.target.value)
                  setTouched(true)
                }}
                sx={{ height: '5vh', width: '16vh' }}
                id='demo-customized-select'
                labelId='demo-customized-select-label'
                input={<OutlinedInput label='Year' />}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
              </Select>
            </div>
            <Button className={expand ? 'collapse-button' : 'expand-button'} onClick={() => setExpand(!expand)} >
              {expand ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
            </Button>
          </FormControl>
        }
      />
      <CardContent>
        <Box
          sx={{
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& svg': { mr: 1, color: 'red ' }
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon icon='bxs:circle' fontSize='0.75rem' />
            <Item>
              <label style={{ fontWeight: 'bold' }}>
                Over all due amount : <span style={{ color: 'red', marginLeft: '8px' }}>&#8377;</span>
              </label>
              <CountUp
                style={{ color: 'red', fontWeight: 'bold' }}
                start={0.01}
                end={overAllDueAmount}
                duration={2}
                useEasing={true}
                separator=','
              />
            </Item>
            {
              touched &&
              <Item>
                <label style={{ fontWeight: 'bold' }}>
                  {dropDownValue} Due Amount : <span style={{ color: 'red', marginLeft: '8px' }}>&#8377;</span>
                </label>
                <CountUp
                  style={{ color: 'red', fontWeight: 'bold' }}
                  start={0.01}
                  end={yearlyData}
                  duration={2}
                  useEasing={true}
                  separator=','
                />
              </Item>
            }
          </div>
        </Box>
        <div style={{ display: 'flex' }}>
          <Box sx={{ height: 435, pt: 5, width: `${expand ? '85%' : '100%'}` }}>
            <ResponsiveContainer>
              <BarChart height={350} data={currentPayment} barSize={15} style={{ direction }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' reversed={direction === 'rtl'} />
                <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                <Tooltip
                  content={
                    <CustomTooltip
                      user={userId}
                      setToolTipData={setToolTipData}
                      toolTipData={dropDownValue}
                      data={overDueData}
                      organizationId={organizationId}
                    />
                  }
                />
                <Bar
                  dataKey='overDuePayment'
                  stackId='a'
                  fill='red'
                  onClick={e => {
                    setMonth(e.month)
                    setExpand(true)
                  }}
                  style={{ cursor: 'pointer' }}
                  radius={[15, 15, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <div style={{ height: 350, overflowX: 'hidden', marginTop: '20px', marginLeft: '20px' }}>
            {month ? (
              <div>
                {month ? (
                  <CustomChip
                    color='primary'
                    label={month ? month : ''}
                  />
                ) : (
                  ''
                )}
                <Table>
                  {toolTipData && expand
                    ? toolTipData.map((student: any, index: number) => {
                      return (
                        <TableRow
                          key={index}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <TableCell>
                              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                                {/* <Icon icon='mdi:dot' /> */}
                                <Box sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => { router.push(`/student/studentDetails/${toolTipData[index].split("/")[1]}`) }}>
                                  <Typography sx={{ mb: 0.5, fontWeight: 500 }}>{toolTipData[index].split("/")[0]}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          </Box>
                        </TableRow>
                      )
                    })
                    : null}
                </Table>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default OverDuePaymentChart
