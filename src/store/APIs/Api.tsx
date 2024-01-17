import React from 'react'
import axios from 'axios'
import headers from "./Headers";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Api = () => {
    return (
        <div>Api</div>
    )
}

export default Api

export async function acceptInvitation(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_ACCEPT_INVITATION}?parentCustomerId=${params.customerId}&organizationId=${params.organizationId}&customerId=${params.userId}&userId=${params.temporaryId}`, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function addUser(params: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADD_USER_API}`, {
      ...params
    }, {
      headers
    })


    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function listAllRoles(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_LIST_ALL_ROLES}?customerId=${params.customerId}&organizationId=${params.organizationId}`, { headers })


    return res
  }
  catch (err: any) {
    return err;
  }
}

export const organizationRegistration = async ({ newOrganizationDetails, id, courseDetails }: any) => {
  try {
    if (courseDetails.courseName) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ORGANIZATION_REGISTRATION_API}`,
        {
          customerId: id,
          organizationId: newOrganizationDetails.organizationId,
          organizationName: newOrganizationDetails.organizationName,
          organizationDetails: newOrganizationDetails.organizationDetails,
          organizationCategoryId: newOrganizationDetails.organizationCategoryId,
          organizationCategoryName: newOrganizationDetails.organizationCategoryName,
          organizationPhoneNumber: newOrganizationDetails.organizationPhoneNumber,
          organizationEmail: newOrganizationDetails.organizationEmail,
          organizationAddress: newOrganizationDetails.organizationAddress,
          organizationLogo: newOrganizationDetails.organizationLogo ? newOrganizationDetails.organizationLogo : "",
          courses: [
            {
              courseName: courseDetails.courseName,
              courseDescription: courseDetails.courseDescription,
              courseFee: courseDetails.courseFee,
              courseFeeDescription: courseDetails.courseFeeDescription,
              maxPaymentInstallment: courseDetails.maxPaymentInstallment,
              courseDuration: courseDetails.courseDuration
            }
          ]
        },
        { headers }
      );

      return res.data; // Assuming you want to return the data from the response
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ORGANIZATION_REGISTRATION_API}`,
        {
          customerId: id,
          organizationId: newOrganizationDetails.organizationId,
          organizationName: newOrganizationDetails.organizationName,
          organizationDetails: newOrganizationDetails.organizationDetails,
          organizationCategoryId: newOrganizationDetails.organizationCategoryId,
          organizationCategoryName: newOrganizationDetails.organizationCategoryName,
          organizationPhoneNumber: newOrganizationDetails.organizationPhoneNumber,
          organizationEmail: newOrganizationDetails.organizationEmail,
          organizationAddress: newOrganizationDetails.organizationAddress,
          organizationLogo: newOrganizationDetails.organizationLogo ? newOrganizationDetails.organizationLogo : "",
          courses: []
        },
        { headers }
      );

      return res.data; // Assuming you want to return the data from the response
    }
  } catch (err) {
    throw err; // Rethrow the error to be caught by the caller
  }
};




// export const organizationDetails: any = createAsyncThunk(
//   "Organiztation_Details",
//   async (id: string) => {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_ORGANIZATION_API}?customerId=${id}`,
//         { headers }
//       );

//       return res.data;
//     } catch (err) { }
//   }
// );

export const organizationDetails = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ORGANIZATION_API}?customerId=${id}`,
      { headers }
    );

    return res.data;

  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error to be caught by the caller
  }
};



export async function organizationEmailVerification(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ORGANIZATION_EMAIL_VERIFICATION_MAIL}`, {
      "organizationName": params.organizationName,
      "validationCode": params.validationCode,
      "organizationEmail": params.organizationEmail
    }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

// export const customerRegistration: any = createAsyncThunk(
//   "Add_Customer",
//   async (id: any) => {
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_CUSTOMER_REGISTRATION_API}`,
//         { id_token: id },
//         { headers }
//       );

//       return res.data;
//     } catch (err) {
//       return err;
//     }
//   }
// );

export const customerRegistration = async (id:any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CUSTOMER_REGISTRATION_API}`,
      { id_token: id },
      { headers }
    );

    return res.data;
  } catch (err) {
    throw err; // Rethrow the error to be caught by the caller
  }
};


export async function getCustomerDetails(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_GET_CUSTOMER_DETAILS}?customerId=${params.customerId}`, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getSingleOrganization(customerId: any, organizationId: any) {
  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_GETSINGLE_ORGANIZATION}?customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function updateOrganization(organization: any) {
  try {
    const res = await axios.post(`https://karomanage-dev-apim.azure-api.net/organizationDetails/updateOrganization`,
      {
        "customerId": organization.customerId,
        "organizationId": organization.organizationId,
        "organizationName": organization.organizationName,
        "organizationDetails": organization.organizationDetails,
        "organizationPhoneNumber": organization.organizationPhoneNumber,
        "organizationEmail": organization.organizationEmail,
        "organizationAddress": organization.organizationAddress,
        "organizationLogo": organization.organizationLogo
      }, { headers }
    )

    return res;
  }
  catch (err) {
    console.log(err)
  }
}


// organization mails
export async function karomanageWelcomeMail(organizationName: any, organizationEmail: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_KAROMANAGE_WELCOME_MAIL}`, {
      "organizationName": organizationName,
      "userEmail": organizationEmail
    }, { headers })

    return res
  }
  catch (err: any) {
    return err;
  }
}

