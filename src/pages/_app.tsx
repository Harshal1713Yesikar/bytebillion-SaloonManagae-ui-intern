// ** React Imports

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

//
import LoginPage from './login'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { organizationDetails } from 'src/store/APIs/Api'

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'




// ** Global css styles
import '../../styles/counter.css'
import '../../styles/globals.css'
import { msalConfig } from 'src/config/authConfig'
import { PublicClientApplication } from '@azure/msal-browser'
import { Provider } from 'react-redux'
import { store } from 'src/store/combineReducer'
import { OrganizationDetailApiCall } from 'src/@core/components/organizationDetailApiCall'
import SelectionBox from 'src/views/forms/organizaitoncreation/selectionBox'

// import { useDispatch } from 'react-redux'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const msalInstance = new PublicClientApplication(msalConfig)

  //

  let storedData: any = ''
  const [selectedOrganizaiton, setSelectedOrganization] = useState('')
  const [isLocalDataSet, setIsLocalDataSet] = useState('')



  if (typeof window !== 'undefined') {
    storedData = localStorage.getItem('organization');

  }


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Is a easy to use and scalable CRM used for managing Organization.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      <AuthenticatedTemplate>
                        <div>
                          {storedData || selectedOrganizaiton ?
                            getLayout(<Component {...pageProps} />) :
                            <SelectionBox setSelectedOrganization={setSelectedOrganization} />
                          }
                        </div>
                      </AuthenticatedTemplate>
                      <UnauthenticatedTemplate>
                        <LoginPage />
                      </UnauthenticatedTemplate>
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </MsalProvider>
      </Provider>
    </CacheProvider>
  )
}

export default App
