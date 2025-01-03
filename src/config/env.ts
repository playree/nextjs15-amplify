export const OAUTH_TYPE_GOOGLE = 'google'
export const getGoogleAuthConfig = () => {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }
}
