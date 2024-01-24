import axios from 'axios';
import headers from "./Headers";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Chart Data Api

export const staffRegistrationApi = async (staffDetailsforApi: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_STAFF_REGISTRATION_API}`,
      staffDetailsforApi,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function listAllStaffApi(customerId: any, salonId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_LIST_ALL_STAFF_API}customerId=${customerId}&salonId=${salonId}`, { headers })
    console.log("staff Data", res.data)
    return res
  }
  catch (err) {
    return err;
  }

}

