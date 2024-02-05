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

export const salonRegistration = async ({ newOrganizationDetails }: any) => {
  try {
    // console.log(newOrganizationDetails);


    const res = await axios.post(
      "https://karo-scan-dev-api.azure-api.net/st-salonRegistration-fnp/createSalon",
      {
        customerId: newOrganizationDetails.customerId,
        salonName: newOrganizationDetails.salonName,
        PhoneNumber: newOrganizationDetails.PhoneNumber,
        email: newOrganizationDetails.email,
        address: newOrganizationDetails.address,
        colonyName: newOrganizationDetails.colonyName,
        landmark: newOrganizationDetails.landmark,
        pincode: newOrganizationDetails.pincode,
        city: newOrganizationDetails.city,
        state: newOrganizationDetails.state,
        Logo: newOrganizationDetails.Logo,
      },
      { headers }
    );
    console.log("response", res.data)

    return res.data; // Assuming you want to return the data from the response

  } catch (err) {
    throw err; // Rethrow the error to be caught by the caller
  }
};

export const organizationDetails = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CUSTOMER_REGISTRATION_API}?customerId=${id}`,
      { headers }
    );
    console.log("AAAAA")
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

export const customerRegistration = async (id: any) => {
  console.log(id, "ABCsd")
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
    return err
  }
}


// Chart Data Api



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




export async function getSingleOrganization(customerId: any, organizationId: any) {
  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_GETSINGLE_ORGANIZATION}?customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getAllOrganizationList(customerId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ORGANIZATION_REGISTRATION_ALL_SALON_LIST}?customerId=${customerId}`, { headers })

    return res;
  }

  catch (err: any) {

    return err;
  }
}

// CATEGORY API

export async function createNewCategory(categoryData: any) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_CREATE_CATEGORY_API}`, categoryData, { headers, },);
    // console.l""og((await response).data)
    console.log("category data service", response)
    return response
  }
  catch (err: any) {
    // console.log(err, "errrr")
    return err;
  }
}

export async function getAllCategoryList(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LIST_API}?customerId=${customerId}&salonId=${salonId}`, { headers })
    // console.log(res, "resssssss")
    return res;
  }

  catch (err: any) {

    return err;
  }
} 


// #Employee API

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
export async function listAllEmployeeApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_EMPLOYEE_LIST}customerId=${customerId}&salonId=${salonId}`, { headers })
    console.log("staff Data", res.data)
    return res
  }
  catch (err) {
    return err;
  }
}





// #ServicesAPI
export async function AddServicesApi(serviceFormData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_SERVICE_API}`,
      serviceFormData,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function ListAllServiceApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_SERVICE_LIST_API}customerId=${customerId}&salonId=${salonId}`, { headers })
    return res
  }

  catch (err) {
    return err;
  }

}



