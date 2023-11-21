import { Theme, SxProps, PaletteMode } from '@mui/material'
import { ReactNode } from 'react'
import { AppBarProps } from '@mui/material/AppBar'
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'

import { Settings } from 'src/@core/context/settingsContext'

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]
export type ErrCallbackType = (err: { [key: string]: string }) => void
export type Mode = PaletteMode | 'semi-dark'
export type AppBar = 'fixed' | 'static' | 'hidden'
export type Footer = 'fixed' | 'static' | 'hidden'
export type Skin = 'default' | 'bordered'
export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
export type ContentWidth = 'full' | 'boxed'
export type VerticalNavToggle = 'accordion' | 'collapse'
export type NavSectionTitle = {
  action?: string
  subject?: string
  sectionTitle: string
}
export type HorizontalNavItemsType = (NavLink | NavGroup)[]
export type HorizontalMenuToggle = 'hover' | 'click'
export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}
export type FooterProps = {
  sx?: SxProps<Theme>
  content?: (props?: any) => ReactNode
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}
export type NavGroup = {
  icon?: string
  title: string
  action?: string
  subject?: string
  badgeContent?: string
  children?: (NavGroup | NavLink)[]
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}
export type HorizontalLayoutProps = {
  appBar?: {
    componentProps?: AppBarProps
    content?: (props?: any) => ReactNode
    branding?: (props?: any) => ReactNode
  }
  navMenu?: {
    sx?: SxProps<Theme>
    navItems?: HorizontalNavItemsType
    content?: (props?: any) => ReactNode
  }
}
export type NavLink = {
  icon?: string
  path?: string
  title: string
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type VerticalLayoutProps = {
  appBar?: {
    componentProps?: AppBarProps
    content?: (props?: any) => ReactNode
  }

  navMenu: {
    lockedIcon?: ReactNode
    unlockedIcon?: ReactNode
    navItems?: VerticalNavItemsType
    content?: (props?: any) => ReactNode
    branding?: (props?: any) => ReactNode
    afterContent?: (props?: any) => ReactNode
    beforeContent?: (props?: any) => ReactNode
    componentProps?: Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>
  }
}
export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
export type LayoutProps = {
  hidden: boolean
  settings: Settings
  children: ReactNode
  footerProps?: FooterProps
  contentHeightFixed?: boolean
  scrollToTop?: (props?: any) => ReactNode
  saveSettings: (values: Settings) => void
  verticalLayoutProps: VerticalLayoutProps
  horizontalLayoutProps?: HorizontalLayoutProps
}
