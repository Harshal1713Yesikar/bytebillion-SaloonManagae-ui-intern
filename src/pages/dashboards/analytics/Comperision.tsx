import React from 'react'
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import InputAdornment from '@mui/material/InputAdornment'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { chartApiData } from 'src/store/APIs/Api'
import CountUp from "react-countup"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

import PropTypes from "prop-types";
import { receivedPaymentApi } from 'src/store/APIs/Api'
import { getAllStudentCount, getAllEmployeeCount } from 'src/store/APIs/Api'
import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material";
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { EmployeeInHandSalary } from 'src/store/APIs/Api'

interface Props {
  direction: 'ltr' | 'rtl'
}


const Comperision = ({ direction }: Props) => {
  const [showData, setShowData] = useState()
  const [inHandSalary, setInHandSalary] = useState(0);
  const dispatch = useDispatch()
  const [OutStanding, setOutStanding] = useState("");
  const [monthData, setMonthData] = useState<any>({})
  const [chartData, setChartData] = useState<any>([
    { month: "Jan", OutStanding: 0 },
    { month: "Feb", OutStanding: 0 },
    { month: "Mar", OutStanding: 0 },
    { month: "Apr", OutStanding: 0 },
    { month: "May", OutStanding: 0 },
    { month: "Jun", OutStanding: 0 },
    { month: "Jul", OutStanding: 0 },
    { month: "Aug", OutStanding: 0 },
    { month: "Sep", OutStanding: 0 },
    { month: "Oct", OutStanding: 0 },
    { month: "Nov", OutStanding: 0 },
    { month: "Dec", OutStanding: 0 },
  ])
  const [totalReceivedPayment, setTotalReceivedPayment] = useState(0)
  const [currentPayment, setCurrentPayment] = useState([
    { month: 'Jan.', Received_Payment: 0 },
    { month: 'Feb.', Received_Payment: 0 },
    { month: 'Mar.', Received_Payment: 0 },
    { month: 'Apr.', Received_Payment: 0 },
    { month: 'May.', Received_Payment: 0 },
    { month: 'Jun.', Received_Payment: 0 },
    { month: 'Jul.', Received_Payment: 0 },
    { month: 'Aug.', Received_Payment: 0 },
    { month: 'Sep.', Received_Payment: 0 },
    { month: 'Oct.', Received_Payment: 0 },
    { month: 'Nov.', Received_Payment: 0 },
    { month: 'Dec.', Received_Payment: 0 }
  ])

  const [value, setValue] = useState<string>('income')

  const [studentCount, setStudentCount] = useState<any>();
  const [user, setUser] = useState<any>()
  const [employeeSalary, setEmployeeSalary] = useState<any>()

  useEffect(() => {

    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (user) {
      let dataInfo = 0;
      dispatch(
        EmployeeInHandSalary({
          customerId: user.customerId,
          organizationId: user.organizationId,
        })
      ).then((res: any) => {
        setShowData(res.payload.data)
        res?.payload.data?.map((payments: any, index: any) => {
          const date: any = new Date(payments.salaryDate);

          const month = date.getMonth();

          dataInfo = dataInfo + payments.inhandSalary;



          chartData[month].OutStanding += payments.inhandSalary;

          //   if (date <= )

        });
        setInHandSalary(dataInfo)

      }).catch((err: any) => {
        console.log(err)
      })


    }
  }, [user])

  // Received Payments



  return (
    <div>

    </div>
  )
}

export default Comperision
