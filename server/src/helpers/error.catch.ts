import { NextFunction, Request, Response } from 'express'
import { reasonCode, statusCode } from '~/core/http'
import { Http } from '~/type'

const errorHandler = <ErrorCustom extends Http.ServerError>(error: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
  console.log('Mã lỗi:', JSON.parse(JSON.stringify(error.stack || '500')))
  console.log('Mô tả lỗi', JSON.parse(JSON.stringify(error.message || 'Không xác định')))

  const code = error.code ? error.code : statusCode.INTERNAL_SERVER_ERROR
  const message = error.message ? error.message : reasonCode.INTERNAL_SERVER_ERROR
  const metadata = error.metadata ? error.metadata : null
  res.status(code).send({ code, message, metadata })
}

export default errorHandler