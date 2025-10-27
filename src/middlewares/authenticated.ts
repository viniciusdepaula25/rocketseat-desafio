import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'src/env'

export async function authorized(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  let token = request.headers.authorization

  if (!token) throw new Error('Não autorizado')

  token = token.split(' ')[1]

  try {
    const decodeToken = jwt.verify(token, env.JWT_SECRET)

    const { id } = decodeToken as { id: number }

    request.user = { id }

    next()
  } catch (err) {
    throw new Error('Não autorizado')
  }
}
