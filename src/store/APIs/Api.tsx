import axios from 'axios';
import headers from "./Headers";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Chart Data Api
export const chartApiData: any = createAsyncThunk(
  "ChartApiData",
  async (props: { customerId: string, organizationId: string }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Chart_API}customerId=${props.customerId}&organizationId=${props.organizationId}`, { headers }
      );


      return res.data;

    } catch (err) {
      return err;

    }
  }
);
export const receivedPaymentApi: any = createAsyncThunk(
  "ChartApiData",
  async (props: { customerId: string, organizationId: string }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Accept_Payment_API}customerId=${props.customerId}&organizationId=${props.organizationId}`, { headers }
      );

      return res.data;

    } catch (err) {

      return err

    }
  }
);


export const organizationDetails: any = createAsyncThunk(
  "Organiztation_Details",
  async (id: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ORGANIZATION_API}?customerId=${id}`,
        { headers }
      );

      return res.data;
    } catch (err) { }
  }
);


export const organizationRegistration: any = createAsyncThunk(
  "Organiztation_Registration",
  async ({ newOrganizationDetails, id, courseDetails }: any) => {
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

          // { headers }
        );

        return res;
      }
      else {
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

          // { headers }
        );

        return res;
      }


    }
    catch (err) {

      return err;

    }
  }
);

export const allInventoryList: any = createAsyncThunk(
  "allInventoryList",
  async (props: { customerId: string, organizationId: string }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_INVENTORY_LIST_API}customerId=${props.customerId}&organizationId=${props.organizationId}`, { headers }
      );

      return res.data;

    } catch (err) {
      return err;
    }
  }
);

export const customerRegistration: any = createAsyncThunk(
  "Add_Customer",
  async (id: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CUSTOMER_REGISTRATION_API}`,
        { id_token: id },
        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);


export const employeeRegistartionApi: any = createAsyncThunk(
  "Add_Customer",
  async (employeeDetailsforApi: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EMPLOYEE_REGISTRATION}`,
        employeeDetailsforApi,
        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export async function listAllEmployeeApi(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_EMPLOYEE_LIST_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    return err;
  }

}
export async function checkEmployeeId(customerId: any, employeeId: any, organizationId: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CHECK_EMPLOYEE_ID_API}`,

      {
        customerId: customerId,
        employeeId: employeeId,
        organizationId: organizationId,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}
export async function genrateEmployeeSalaryPdf(data: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_GENRATE_EMPLOYEE_SALARY_PDF_API}`,

      data
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}
export async function getEmployeeSalaryPdf(data: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_GET_EMPLOYEE_SALARY_PDF_API}`,

      data
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function getEmployeeDetails(customerId: any, employeeId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_EMPLOYEE_DETAILS_API}customerId=${customerId}&employeeId=${employeeId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    return err;
  }

}


export async function updateEmployee(employeeData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_EMPLOYEE_UPDATE_API}`,
      employeeData
      ,
      { headers }
    );

    return res.data;
  } catch (err) { return err; }
}
export async function inactiveEmployee(employeeData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DELETE_EMPLOYEE_API}`,
      employeeData
      ,
      { headers }
    );

    return res.data;
  } catch (err) { return err; }
}
export async function deleteEmployee(employeeData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DELETE_EMPLOYEE_API}`,
      employeeData
      ,
      { headers }
    );

    return res.data;
  } catch (err) { return err; }
}


export async function deleteInventory(inventoryData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Inventory_Delete_API}`,
      inventoryData,

      { headers }
    );

    return res.data;
  } catch (err) {
    return err;
  }
}

export async function updateInventory(inventoryData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Update_Inventory_API}`,
      inventoryData
      ,
      { headers }
    );

    return res.data;
  } catch (err) {
    return err;
  }
}

//Employee Salary Apis
export async function createSalary(customerId: any, organizationId: any, employeeId: any, salaryDetails: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_EMPLOYEE_SALARY}`,

      {
        customerId: customerId,
        organizationId: organizationId,
        employeeId: employeeId,
        "totalSalary": salaryDetails.totalSalary,
        "payableDays": salaryDetails.payableDays,
        "totalWorkingDays": salaryDetails.totalWorkingDays,
        "lossOfDays": salaryDetails.lossOfDays,
        "inhandSalary": salaryDetails.inHandSalary,
        "salaryDate": salaryDetails.date
      },
      { headers }
    );

    return res.data;
  } catch (err) { console.log(err) }
}

export async function listEmployeeSalary(customerId: any, employeeId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_EMPLOYEE_SALARY_LIST}customerId=${customerId}&employeeId=${employeeId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export async function employeeSalaryDetails(customerId: any, organizationId: any, employeeId: any, salaryId: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_EMPLOYEE_SALARY_DETAILS}customerId=${customerId}&employeeId=${employeeId}&organizationId=${organizationId}&salaryId=${salaryId}`,

      { headers }
    );

    return res.data;
  } catch (err) {
    return err;
  }
}
export async function deleteEmployeeSalary(customerId: any, organizationId: any, employeeId: any, salaryId: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DELETE_EMPLOYEE_SALARY_API}customerId=${customerId}&employeeId=${employeeId}&organizationId=${organizationId}&salaryId=${salaryId}`,

      { headers }
    );

    return res.data;
  } catch (err) {
    return err;
  }
}

export async function updateEmployeeSalary(customerId: any, organizationId: any, employeeId: any, salaryId: any, employeeSalaryData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_EMPLOYEE_SALARY_UPDATE_API}`,
      {
        "customerId": customerId,
        "employeeId": employeeId,
        "organizationId": organizationId,
        "salaryId": salaryId,
        "totalSalary": employeeSalaryData.totalSalary,
        "payableDays": employeeSalaryData.payableDays,
        "totalWorkingDays": employeeSalaryData.totalWorkingDays,
        "lossOfDays": employeeSalaryData.lossOfDays,
        "daysPayable": employeeSalaryData.payableDays,
        "inhandSalary": employeeSalaryData.inhandSalary
      }

      ,
      { headers }
    );

    return res.data;
  } catch (err) { console.log(err) }
}



export async function listAllInventoryCategoryApi(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENTITY_CATEGORY_LIST_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}
export async function listOneInventoryApi(customerId: any, organizationId: any, inventoryId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_Get_Inventory_Detail_API}customerId=${customerId}&organizationId=${organizationId}&inventoryId=${inventoryId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}
export async function listOneStudentDetailApi(customerId: any, organizationId: any, rollNo: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STUDENT_DETAILS_API}customerId=${customerId}&organizationId=${organizationId}&rollNo=${rollNo}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export const createInventory: any = async (inventoryData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_INVENTORY_API}`,
      inventoryData,
      { headers }
    );

    return res;
  } catch (err) {
    return err;
  }
}
export const createCoupon: any = async (inventoryData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Accept_Create_Coupon_API}`,
      inventoryData,
      { headers }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export const createInventoryCategory: any = async (inventoryCategoryData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_CATEGORY_API}`,
      inventoryCategoryData,
      { headers }
    );

    return res;
  } catch (err) {
    return err;
  }
}
export const singleCouponDetails: any = async (singleCouponData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Accept_Single_Coupon_API}`,
      singleCouponData,
      { headers }
    );

    return res;
  } catch (err) {
    return err;
  }
}
export const updateCouponDetails: any = async (customerId: any, organizationId: any, couponId: any, singleCouponData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Accept_Update_Coupon_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        couponId: couponId,
        coupons: singleCouponData
      },
      { headers }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteCoupon(couponData: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Accept_Delete_Coupon_API}`,
      couponData,

      { headers }
    );

    return res.data;
  } catch (err) { }
}

export const getAllStudentCount: any = createAsyncThunk(
  "Get_Student_Count",
  async ({ customerId, organizationId }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ALL_STUDENT_COUNT}?customerId=${customerId}&organizationId=${organizationId}`,
        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }

);



export async function getAllStudentList(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STUDENT_LIST_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export async function getCouponList(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_Accept_List_Coupon_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export async function getAllCouponList(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_Accept_List_All_Coupon_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export async function updateStudentDetails(studentData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_DETAILS_API}`, studentData,
      { headers }
    );

    return res.data;
  } catch (err) { console.log(err) }
}

export async function updateStudenPaymentDetails(studentData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_PAYMENT_DETAILS_API}`, studentData,
      { headers }
    );

    return res.data;
  } catch (err) { console.log(err) }
}

export async function updateStudenCourseCouponBatchDetails(studentData: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_COUPON_COURSE_BATCH_DETAILS_API}`, studentData,
      { headers }
    );
    return res.data;
  } catch (err) { console.log(err) }
}

export const getAllEmployeeCount: any = createAsyncThunk(
  "Get_Employee_Count",
  async ({ organizationId, customerId }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ALL_EMPLOYEE_COUNT}?customerId=${customerId}&organizationId=${organizationId}`,

        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);


// Student Apis Start

export const createStudentAdmission: any = async (studentData: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ADDMISSION_API}`,
      studentData,
      { headers }
    );

    return res;
  } catch (err) {
    return err;
  }
}

export const checkStudentEnrollmentNumber: any = async ({ customerId: customerId, studentEnrollmentNumber: studentEnrollmentNumber, organizationId: organizationId }: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CHECKENROLLMENT_API}`,
      {
        customerId: customerId,
        studentEnrollmentNumber: studentEnrollmentNumber,
        organizationId: organizationId,
      },
      { headers }
    );

    return res;
  }
  catch (err) {

    console.log(err)

    return err;
  }
}

export async function getStudentBasicInfo(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STUDENT_BASIC_INFO}?customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export const deleteStudent: any = async (customerId: any, rollNo: any, organizationId: any, studentStatus: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DELETE_STUDENT_DETAILS_API}`,
      {
        customerId: customerId,
        rollNo: rollNo,
        organizationId: organizationId,
        studentStatus: studentStatus
      },
      { headers }
    );

    return res;
  } catch (err) {
    return err;
  }
}

export async function getRollNumberId(customerId: any, organizationId: any, fullRollNumber: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CHECK_STUDENT_ROLLNUMBER_API}`,

      {
        customerId: customerId,
        rollNo: fullRollNumber,
        organizationId: organizationId,
      }
      ,
      { headers }
    );
    return res.data;
  } catch (err) { }
}

// student Apis end

//  batch Apis start

export async function createBatch(customerId: any, organizationId: any, data: any, students: any, courses: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CREATE_BATCH_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batch: data,
        students: students,
        courses: courses
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function getAllBatchList(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_LIST_ALL_BATCH_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}


export async function listSingleBatch(customerId: any, organizationId: any, batchId: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SINGLE_BATCH_DETAIL_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: batchId,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) {
    console.log(err)
  }

}


export async function updateBatch(customerId: any, organizationId: any, batchId: any, data: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_BATCH_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: batchId,
        batch: data,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function updateStudentInBatch(customerId: any, organizationId: any, batchId: any, newStudent: any, newCourse: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_BATCH_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: batchId,
        newStudent: newStudent,
        newCourse: newCourse
      }
      ,
      { headers }
    );
    return res.data;
  } catch (err) { }
}

export async function updateCourseInBatch(customerId: any, organizationId: any, batchId: any, newCourse: any, newStudent: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_BATCH_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: batchId,
        newCourse: newCourse,
        newStudent: newStudent
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function updateBatchInCourse(customerId: any, organizationId: any, courseId: any, newBatch: any, newStudent: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Organization_Courses_Update}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        courseId: courseId,
        newBatch: newBatch,
        newStudent: newStudent
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function updateExistingStudentInBatch(customerId: any, organizationId: any, batchId: any, updatedStudent: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_IN_BATCH}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: batchId,
        updatedStudent: updatedStudent,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

export async function updateExistingStudentInCourse(customerId: any, organizationId: any, courseId: any, updatedStudent: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_IN_COURSE}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        courseId: courseId,
        updatedStudent: updatedStudent
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}



export async function deleteBatch(customerId: any, organizationId: any, getBatchId: any, batchStatus: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DELETE_BATCH_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        batchId: getBatchId,
        batchStatus: batchStatus,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) { }
}

// batch Apis end

export const EmployeeInHandSalary: any = createAsyncThunk(
  "EmployeeInHandSalary",
  async ({ organizationId, customerId }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Employee_InHand_Salary_Payment_API}customerId=${customerId}&organizationId=${organizationId}`,

        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const StudentUpcomingPaymentList: any = createAsyncThunk(
  "StudentUpcomingPaymentList",
  async ({ organizationId, customerId, startDate, endDate }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Student_Upcoming_Payment_List_API}customerId=${customerId}&organizationId=${organizationId}&startDate=${startDate}&endDate=${endDate}`,

        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const StudentOverDuePaymentList: any = createAsyncThunk(
  "StudentOverDuePaymentList",
  async ({ organizationId, customerId }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Student_Over_Due_Payment_List_API}customerId=${customerId}&organizationId=${organizationId}`,

        { headers }
      );

      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const listOrganizationCourse: any = createAsyncThunk(
  "ListOrgCourses",
  async ({ organizationId, customerId }: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Organization_Courses_List}customerId=${customerId}&organizationId=${organizationId}`,
        { headers }
      );

      return res;
    }
    catch (err) {
      return err;
    }
  }
)

export async function singleOrgCourseDetails(customerId: any, organizationId: any, courseId: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Organization_Courses_SingleList}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        courseId: courseId,
      }
      ,
      { headers }
    );
    return res;
  } catch (err) {
    console.log(err)
  }

}

export const UpdateOrgCourse: any = async ({ organizationId, customerId, courseDetails, courseId, courseName, courseDescription, courseFee, courseFeeDescription, maxPaymentInstallment, courseDuration }: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Organization_Courses_Update}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        courseId: courseId,
        course: {
          courseName: courseName,
          courseDescription: courseDescription,
          courseFee: courseFee,
          courseFeeDescription: courseFeeDescription,
          maxPaymentInstallment: maxPaymentInstallment,
          courseDuration: courseDuration
        }
      },
      { headers }
    );

    return res;
  } catch (err) {
    console.log(err)

    return err;
  }
}
export const createCourse: any = async ({ id, customerId, courseDetails }: any) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_Organization_Course_Create}`,
      {
        customerId: customerId,
        organizationId: id,
        courses:
          [
            {
              courseName: courseDetails.courseName,
              courseDescription: courseDetails.courseDescription,
              courseFee: courseDetails.courseFee,
              courseFeeDescription: courseDetails.courseFeeDescription,
              maxPaymentInstallment: courseDetails.maxPaymentInstallment,
              courseDuration: courseDetails.courseDuration
            }
          ],
        students: [],
        batch: []
      }, { headers }
    )

    return res;
  }
  catch (err) {
    console.log(err);
  }
}
export const DeleteOrgCourse: any = createAsyncThunk("deleteCourse",
  async ({ id, organizationId, courseId, status }: any) => {
    try {
      const res = axios.get(`${process.env.NEXT_PUBLIC_Organization_Courses_Delete}customerId=${id}&organizationId=${organizationId}&courseId=${courseId}&courseStatus=${status}`, { headers })

      return res;
    }
    catch (err) {
      return err;
    }
  })

export async function paidStudentPaymentApi(customerId: any, organizationId: any, startDate: any, endDate: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_Last_Days_Received_Payment_API}&customerId=${customerId}&organizationId=${organizationId}&startDate=${startDate}&endDate=${endDate}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}


export async function ExpensesList(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ExpensesList_API}&customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}


export async function TotalExpenses(customerId: any, organizationId: any) {

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_Total_Expenses_API}&customerId=${customerId}&organizationId=${organizationId}`, { headers })

    return res.data
  }
  catch (err) {
    console.log(err)
  }

}

export async function couponCountCheck(customerId: any, organizationId: any, couponId: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Accept_Coupon_Count_Check_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        couponId: couponId,
      }
      ,
      { headers }
    );

    return res.data;
  } catch (err) {
    console.log(err)
  }
}

export async function updateStudentPaymentStatus(updataionData: any) {
  try {
    if (updataionData.refundAmount) {

      const res = axios.post(
        `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_PAYMENT_STATUS}`, {
        customerId: updataionData.customerId,
        installmentNumber: updataionData.installmentNumber,
        organizationId: updataionData.organizationId,
        rollNo: updataionData.rollNo,
        updatedPaymentStatus: updataionData.updatedPaymentStatus,
        studentStatus: updataionData.studentStatus,
        refundAmount: Number(updataionData.refundAmount),
        restInstallmentStatus: updataionData.restInstallmentStatus,
        updatedDate: updataionData.updatedDate,

      }, { headers }
      )

      return res;
    }
    else {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_UPDATE_STUDENT_PAYMENT_STATUS}`, {
        customerId: updataionData.customerId,
        installmentNumber: updataionData.installmentNumber,
        organizationId: updataionData.organizationId,
        rollNo: updataionData.rollNo,
        updatedPaymentStatus: updataionData.updatedPaymentStatus,
        studentStatus: updataionData.studentStatus,
        updatedDate: updataionData.updatedDate,
      }, { headers }
      )

      return res;
    }

  }
  catch (error: any) {
    return error;
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
export async function getAllEnquiryList(params: any) {

  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_ENQUIRY_LIST}?organizationId=${params.organizationId}&customerID=${params.customerId}`, {
      headers
    })

    return res;

  } catch (err: any) {
    return err;
  }

}

export async function getSingleEnquiry(params: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_SINGLE_ENQUIRY_LIST}?id=${params.id}`, {
      headers
    })

    return res;
  }
  catch (error) {
    return error;
  }

}


export async function updateEnquiry(params: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_UPDATE_SINGLE_ENQUIRY}`, {
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

export async function createEnquiry(params: any) {
  delete params.name
  delete params.lastName

  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY}`, {
      "customerID": params.customerId,
      "organizationId": params.organizationId,
      "studentName": params.studentName,
      "enquiryCourse": params.enquiryCourse,
      "status": "active",
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



// user management functions

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

export async function inviteUser(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_INVITE_USER_API}`, { ...params }, {
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

export async function listAllUsers(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_LIST_ALL_USER}?customerId=${params.customerId}&organizationId=${params.organizationId}`, {
      headers
    })

    return res
  } catch (err: any) {
    return err;
  }
}

export async function updateUserDetails(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_SUB_USER_DETAILS_UPDATE}`, {
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

export async function deleteSubUser(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_DELETE_SUBUSER_API}`, { ...params }, { headers })

    return res;
  }
  catch (err: any) {
    return err;
  }
}



// user management roles and permissions


export async function createRole(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_CREATE_ROLE_API}`, { ...params }, { headers })


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

export async function inviteUserApi(params: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_INVITE_USER_API}`,
      { ...params },
      {
        headers
      }
    )

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function updateUserRole(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_SUBUSER_ROLE_UPDATE}`, {
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

// email services

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

// student mails

export async function studentWelcomeMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_STUDENT_WELCOME_MAIL}`, {
      "organizationName": params.organizationName,
      "studentEmail": params.studentEmail,
      "studentName": params.studentName,
      "courseName": params.courseName,
      "courseTiming": params.courseTiming,
      "courseStartDate": params.courseStartDate,
      "organizationMail": params.organizationMail,
      "organizationLogo": params.organizationLogo
    }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}


export async function studentFeeSlipMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_STUDENT_FEE_SLIP_MAIL}`,
      params, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function studentPaymentOverDueMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_STUDENT_PAYMENT_OVER_DUE_MAIL}`, {
      "courseName": params.courseName,
      "studentName": params.studentName,
      "studentEmail": params.studentEmail,
      "organizationName": params.organizationName,
      "organizationEmail": params.organizationEmail,
      "organizationLogo": params.organizationLogo,
      "installmentsArray": params.installmentsArray
    }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function studentUpcomingFeeMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_STUDENT_UPCOMING_FEE_MAIL}`,
      {
        "organizationName": params.organizationName,
        "studentEmail": params.studentEmail,
        "studentName": params.studentName,
        "courseName": params.courseName,
        "feeAmount": params.feeAmount,
        "paymentDate": params.paymentDate,
        "organizationMail": params.organizationMail,
        "organizationLogo": params.organizationLogo,

      }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}



// enquiry mails

export async function enquirySubmissionMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_SUBMISSION_MAIL}`, {
      "organizationName": params.organizationName,
      "studentEmail": params.studentEmail,
      "course": params.course,
      "studentName": params.studentName,
      "customerId": params.customerId,
      "organizationId": params.organizationId,
      "organizationLogo": params.organizationLogo,
      "courseDescription": params.courseDescription,
    }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

// employee mails

export async function employeeWelcomeMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_EMPLOYEE_WELCOME_MAIL}`, {
      "organizationName": params.organizationName,
      "employeeEmail": params.employeeEmail,
      "employeeName": params.employeeName,
      "organizationLogo": params.organizationLogo
    }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function generateEmployeeSalarySlip(params: any) {
  try {

    const res = axios.post(`${process.env.NEXT_PUBLIC_EMPLOYEE_SALARY_SLIP}`,
      {
        "organizationName": params.organizationName,
        "userName": params.userName,
        "userEmail": params.userEmail,
        "month": params.month,
        "year": params.year
      }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}


// user mails

export async function userDeleteMail(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_USER_DELETE_MAIL}`,
      {
        "organizationName": params.organizationName,
        "organizationEmail": params.organizationEmail,
        "userName": params.userName,
        "userEmail": params.userEmail,
        "userRole": params.userRole,
        "organizationLogo": params.organizationLogo
      }, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getStudentFeeReceipt(customerId: any, organizationId: any, rollNo: any, studentName: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_STUDENT_FEES_RECEIPT}?customerId=${customerId}&organizationId=${organizationId}&rollNo=${rollNo}&studentName=${studentName}`, { headers })
    return res;
  }
  catch (err) {
    return err;
  }
}

// birthday reminder
export async function updateNotificationHub(customerId: any, organizationId: any, totalBirthdayNotification: any, totalDueNotification: any, totalOverDueNotification: any, totalForecastNotification: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_UPDATENOTIFICATIONHUB_DETAILS}`,
      {
        "customerId": customerId,
        "organizationId": organizationId,
        "updateNotificiation": {
          "birthdays": {
            "student": [
              ...totalBirthdayNotification.student
            ],
            "employee": [
              ...totalBirthdayNotification.employee
            ]
          },
          "due": [
            ...totalDueNotification
          ],
          "overDue": [
            ...totalOverDueNotification
          ],
          "upcomingForecast": [
            ...totalForecastNotification
          ]
        }
      }, {
      headers
    })
    return res;
  }
  catch (err: any) {
    return err;
  }
}
export async function birthdayReminder(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_BIRTHDAY_REMINDER}?customerId=${params.customerId}&organizationId=${params.organizationId}`, { headers })

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
export async function getNotificationDetails(customerId: any, organizationId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GETNOTIFICATION_DETAILS}?customerId=${customerId}&organizationId=${organizationId}`, { headers })
    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function createEmailNotification(data: any, customerId: any, organizationId: any) {

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_EMAILNOTIFICATION_CREATE_API}`,
      {
        "customerId": customerId,
        "organizationId": organizationId,
        "deleteUserMail": data.deleteUserMail,
        "userAddUsingUserManagement": true,
        "welcomeMailToEmployee": true,
        "welcomeMailForNewCustomer": true,
        "enquirySubmissionMailToStudent": data.enquirySubmissionMailToStudent,
        "welcomeMailToStudentWithFeeSlip": data.welcomeMailToStudentWithFeeSlip,
        "studentFeeReceipt": data.studentFeeReceipt,
        "upcomingFeeReminderToStudentMail": data.upcomingFeeReminderToStudentMail,
        "overdueFeeReminderToStudentMail": data.overdueFeeReminderToStudentMail,
        "weeklyReportCoachingRevenueMail": data.weeklyReportCoachingRevenueMail,
        "monthlyReportCoachingRevenueMail": data.monthlyReportCoachingRevenueMail,
        "sixMonthReportCoachingRevenueMail": data.sixMonthReportCoachingRevenueMail,
        "oneYearReportCoachingRevenueMail": data.oneYearReportCoachingRevenueMail
      },
      { headers }
    );
    return res;
  } catch (err) { console.log(err) }
}

export async function listEmailNotification(customerId: any, organizationId: any) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_EMAILNOTIFICATION_GET_API}customerId=${customerId}&organizationId=${organizationId}`, { headers })
    return res.data
  }
  catch (err) {
    return err;
  }
}


export async function updateEmailNotification(data: any, customerId: any, organizationId: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_EMAILNOTIFICATION_UPDATE_API}`,
      {
        customerId: customerId,
        organizationId: organizationId,
        userAddUsingUserManagement: true,
        welcomeMailToEmployee: true,
        welcomeMailForNewCustomer: true,
        deleteUserMail: data.deleteUserMail,
        enquirySubmissionMailToStudent: data.enquirySubmissionMailToStudent,
        welcomeMailToStudentWithFeeSlip: data.welcomeMailToStudentWithFeeSlip,
        studentFeeReceipt: data.studentFeeReceipt,
        upcomingFeeReminderToStudentMail: data.upcomingFeeReminderToStudentMail,
        overdueFeeReminderToStudentMail: data.overdueFeeReminderToStudentMail,
        weeklyReportCoachingRevenueMail: data.weeklyReportCoachingRevenueMail,
        monthlyReportCoachingRevenueMail: data.monthlyReportCoachingRevenueMail,
        sixMonthReportCoachingRevenueMail: data.sixMonthReportCoachingRevenueMail,
        oneYearReportCoachingRevenueMail: data.oneYearReportCoachingRevenueMail
      },
      { headers }
    );

    return res;
  } catch (err) { console.log(err) }

}


// dynamic enquiry system API's

// templates

export async function createEnquiryForm(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_CREATE_FORM}`,
      params, {
      headers
    })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getSingleForm(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_ENQUIRY_GET_SINGLE_FORM}?customerId=${params.customerId}&organizationId=${params.organizationId}&formTemplateId=${params.formTemplateId}`,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getAllForm(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_ENQUIRY_GET_ALL_FORM}?customerId=${params.customerId}&organizationId=${params.organizationId}`,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function updateSingleForm(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_UPDATE_SINGLE_FORM}`, params,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}


export async function deleteSingleForm(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_DELETE_SINGLE_FORM}`, params,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

//  form data

export async function getSingleFormData(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_ENQUIRY_GET_SINGLE_FORM_DATA}?customerId=${params.customerId}&organizationId=${params.organizationId}&formTemplateId=${params.formTemplateId}&formId=${params.formId}`,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function getAllFormData(params: any) {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_ENQUIRY_GET_ALL_FORM_DATA}?customerId=${params.customerId}&organizationId=${params.organizationId}&formTemplateId=${params.formTemplateId}`,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function deleteSingleFormData(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_DELETE_FORM_DATA}`, params,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}

export async function updateSingleFormData(params: any) {
  try {
    const res = axios.post(`${process.env.NEXT_PUBLIC_ENQUIRY_UPDATE_FORM_DATA}`, params,
      {
        headers
      })

    return res;
  }
  catch (err: any) {
    return err;
  }
}



export async function attendanceCreate(customerId: any, organizationId: any, batchId: any, student: any) {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_STUDENT_ATTENDANCE_CREATE_API}`,
      {
        "customerId": customerId,
        "organizationId": organizationId,
        "batchId": batchId,
        "students": student,
      },
      { headers }
    );

    return res;
  } catch (err) { console.log(err) }

}


export async function attendanceList(customerId: any, organizationId: any, batchId: any, attendanceId: any) {


  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_STUDENT_ATTENDANCE_LIST_API}?customerId=${customerId}&organizationId=${organizationId}&batchId=${batchId}&attendanceId=${attendanceId}`, { headers })

    return res
  }
  catch (err: any) {
    return err;
  }
}