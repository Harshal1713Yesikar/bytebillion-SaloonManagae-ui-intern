import { Configuration, RedirectRequest } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
    authority: `${process.env.NEXT_PUBLIC_AUTHORITY}`,
    redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
    postLogoutRedirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
    knownAuthorities: [`${process.env.NEXT_PUBLIC_KNOWNAUTHORITY}`] // Mark your B2C tenant's domain as trusted.
  }
}

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: [`${process.env.NEXT_PUBLIC_SCOPES}`]
}

// Add here the endpoints for MS Graph API services you would like to use.
