import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { organizationDetails } from 'src/store/APIs/Api';


export const OrganizationDetailApiCall = ({ userId }: any) => {

    const dispatch = useDispatch();



    return (
        <div>OrganizationDetailApiCall</div>
    )
}
