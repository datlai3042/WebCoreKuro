import { CookieOptions, Response } from 'express'
import ms from 'ms'
export const oneWeek = 7 * 24 * 60 * 60 * 1000 // 7 ngày tính bằng miligiây
export const expriresAT = 60 * 30 * 1000 // 7 ngày tính bằng miligiây

export const setCookieResponse = (res: Response, expires: string, name: string, value: string, options?: CookieOptions) => {
  const expiryDate = new Date(expires)
  res.cookie(name, value, { ...options, expires: expiryDate, sameSite: 'none', path: '/', secure: true })
  return expiryDate
}

export const setCookieAuth = ({
  client_id,
  refresh_token,
  access_token,
  res
}: {
  client_id: string
  refresh_token: string

  access_token: string
  res: Response
}) => {
  const now = new Date().getTime()
  const expireCookieTime = new Date(Number(now + ms(process.env.EXPIRE_REFRESH_TOKEN as string))).toUTCString()

  const expireTokenTime = new Date(Number(now + ms(process.env.EXPIRE_ACCESS_TOKEN as string))).toUTCString()

  setCookieResponse(res, expireCookieTime, 'client_id', client_id, { httpOnly: true })

  setCookieResponse(res, expireCookieTime, 'access_token', access_token, { httpOnly: true })
  setCookieResponse(res, expireCookieTime, 'refresh_token', refresh_token, { httpOnly: true })
  console.log({ expireCookieTime, expireTokenTime })
  return { expireToken: new Date(expireTokenTime), expireCookie: new Date(expireCookieTime) }
}

export const clearCookieAuth = ({ res }: { res: Response }) => {
  res.clearCookie('client_id')
  res.clearCookie('refresh_token')
  res.clearCookie('access_token')
}
