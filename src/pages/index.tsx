import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

// ** Next Imports

import { ReactNode } from 'react'
import DashboardLayout from './home'


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


      <AuthenticatedTemplate><DashboardLayout /></AuthenticatedTemplate>
      <UnauthenticatedTemplate>no</UnauthenticatedTemplate>

    </>
  )
}

export default Home
