

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

// ** Next Imports
import { redirect } from 'next/navigation';

import { ReactNode } from 'react';


/**
 *  Set Home URL based on User Roles
 */
// export const getHomeRoute = (role: string) => {
//   return '/home'
// }


interface Props {
  children: ReactNode
}

const Home = ({ children }: Props) => {
  // ** Hooks



  return (
    <>
      <AuthenticatedTemplate >
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        no
      </UnauthenticatedTemplate>
    </>)
}

export default Home
