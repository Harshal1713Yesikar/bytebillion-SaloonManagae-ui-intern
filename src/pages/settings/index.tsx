// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'


// ** Demo Components Imports
import UserViewPage from './UserViewPage'

const Settings = () => {

  return <UserViewPage />
}


export default Settings

