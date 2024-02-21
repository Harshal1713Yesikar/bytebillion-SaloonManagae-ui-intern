import axios from 'axios'
import headers from './Headers'


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

// export const organizationDetails = async (id: string) => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_CUSTOMER_REGISTRATION_API}?customerId=${id}`,
//       { headers }
//     );
//     console.log("AAAAA")
//     return res.data;

//   } catch (err) {
//     console.error(err);
//     throw err; // Rethrow the error to be caught by the caller
//   }
// };



export async function organizationEmailVerification(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_VERIFICATION_MAIL_API}`, params, {
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
    console.log(res, "ABCsd")
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

// export const staffRegistrationApi = async (staffDetailsforApi: any) => {
//   console.log(staffDetailsforApi, "kkjghcvgf");

//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_STAFF_REGISTRATION_API}`,
//       staffDetailsforApi,
//       { headers }
//     );

//     console.log("success data", res.data)
//     return res.data;
//   } catch (err) {
//     return err;
//   }
// }

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
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LIST_API}?customerId=${customerId}&salonId=${salonId}`,
      { headers }
    )
    return res
  } catch (err: any) {
    return err
  }
}






// -----------// #ServicesAPI-----------------------

export async function AddServicesApi(serviceFormData: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_CREATE_SERVICE_API}`, serviceFormData, { headers })

    console.log('success data', res)
    return res.data
  } catch (err) {
    return err
  }
}

export async function ListAllServiceApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_ALL_SERVICE_LIST_API}customerId=${customerId}&salonId=${salonId}`,
      { headers }
    )
    return res
  } catch (err) {
    return err
  }
}





// -------------------employee API--------------------

export async function getSingleEmployee(customerId: any, salonId: any, employeeId: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_SINGLE_EMPLOYEE_DETAILS}?customerId=${customerId}&salonId=${salonId}&employeeId=${employeeId}`,
      { headers }
    )
    return res
  } catch (err) {
    return err
  }
}

export async function updateEmployeeApi(updateEmployeeData: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_UPDATE_EMPLOYEE_DETAIILS}`, updateEmployeeData, { headers })

    console.log('success data', res)
    return res.data
  } catch (err) {
    return err
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

export const staffRegistrationApi = async (staffDetailsforApi: any) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_STAFF_REGISTRATION_API}`, staffDetailsforApi, { headers })

    console.log('success data', res)
    return res.data
  } catch (err) {
    return err
  }
}



export const ProductCreateRegistrationApi = async (productDetailsforApi: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`,
      productDetailsforApi,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}



// export async function ListAllServiceApi(customerId: any, salonId: any) {
//   try {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_SERVICE_LIST_API}customerId=${customerId}&salonId=${salonId}`, { headers })
//     return res
//   }

//   catch (err) {
//     return err;
//   }

// }



export const updateProductApi = async (productDetailsforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-products-fnp/updateProduct`,
      productDetailsforApi,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export const deleteProductApi = async (productDetailforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-products-fnp/deleteProduct`,
      productDetailforApi,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}


export const VendorCreateApi = async (vendorDetailsforApi: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_VENDOR_API}`,
      vendorDetailsforApi,
      { headers }
    );
    console.log("success vendor", res)
    return res.data;
  } catch (err) {
    return err;
  }
}


export async function ListAllVendorListApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`https://karo-scan-dev-api.azure-api.net/st-vendor-fnp/getAllVendor?customerId=099f9bf2-8ac2-4f84-8286-83bb46595fde&salonId=NRImf`, { headers })
    console.log("vendor Data", res.data)
    return res
  }

  catch (err) {
    return err;
  }

}

export const updateVendorApi = async (vendorDetailsforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-vendor-fnp/updateVendor`,
      vendorDetailsforApi,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export const deleteVendorApi = async (productDetailforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-vendor-fnp/deleteVendor`,
      productDetailforApi,
      { headers }
    );
    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}


export const BrandCreateApi = async (brandDetailsforApi: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_BRAND_API}`,
      brandDetailsforApi,
      { headers }
    );
    console.log("success Brand", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function ListAllProductListApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`https://karo-scan-dev-api.azure-api.net/st-products-fnp/getAllProduct?customerId=${customerId}&salonId=${salonId}`, { headers })
    console.log("product Data", res.data)
    return res
  }

  catch (err) {
    return err;
  }

}

export async function ListAllBrandListApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`https://karo-scan-dev-api.azure-api.net/st-brand-fnp/getAllBrand?customerId=099f9bf2-8ac2-4f84-8286-83bb46595fde&salonId=NRImf`, { headers })
    console.log("brand Data", res.data)
    return res
  }

  catch (err) {
    return err;
  }

}

export const updateBrandApi = async (BrandDetailsforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-brand-fnp/updateBrand`,
      BrandDetailsforApi,
      { headers }
    );

    console.log("success update brand", res)
    return res.data;
  } catch (err) {
    return err;
  }
}

export const deleteBrandApi = async (BrandDetailforApi: any) => {
  try {
    const res = await axios.post(`https://karo-scan-dev-api.azure-api.net/st-brand-fnp/deleteBrand`,
      BrandDetailforApi,
      { headers }
    );
    console.log("success delete brand", res)
    return res.data;
  } catch (err) {
    return err;
  }
}




// ---------------------Client APi---------------------------


export async function CreateClientApi(updateClientData: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_CILENT_REGISTRATION_API}`, updateClientData, { headers })

    console.log('success data', res)
    return res.data
  } catch (err) {
    return err
  }
}

export async function ListAllClientsApi(customerId: any, salonId: any) {
  try {
    const res = await axios.get(`https://karo-scan-dev-api.azure-api.net/st-client-fnp/readClient?customerId=${customerId}&salonId=${salonId}`, { headers })
    console.log("data", res)
    return res
  }
  catch (err) {
    return err
  }

}

export async function UpdateClientApi(updateClient: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_UPDATE_CLIENT_DETAILS}`, updateClient, { headers })

    console.log('success data', res)
    return res.data
  } catch (err) {
    return err
  }
}

export async function getSingleClient(customerId: any, salonId: any, clientId: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SINGLE_CLIENT_API}?customerId=${customerId}&salonId=${salonId}&clientId=${clientId}`,
      { headers }
    )
    return res
  } catch (err) {
    return err
  }
}

export async function deleteClientApi(ClientData: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DELETE_CLIENT_API}`, ClientData, { headers });
    return res
  }
  catch (err) {
    return err
  }

}

// daily service api

export async function AddDailyServicesApi(serviceFormData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_DAILY_SERVICE}`,
      serviceFormData,
      { headers }
    );

    console.log("success data", res)
    return res.data;
  } catch (err) {
    return err;
  }
}






