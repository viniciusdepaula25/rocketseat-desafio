import { Request, Response } from 'express'

import { UserServices } from '../services/user-services'

export class Userscontroller {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body

    const user = await UserServices.create({ name, email })
    res.status(200).send(user)
  }

  static async list(req: Request, res: Response) {
    const users = await UserServices.list()
    return res.status(200).send(users)
  }

  static async get(req: Request, res: Response) {
    const { id } = req.params
    const user = await UserServices.get(id)
    res.status(200).send(user)
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    await UserServices.delete(id)

    res.status(200).send(true)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, email } = req.body

    const user = await UserServices.update(id, name, email)

    res.status(200).send(user)
  }
}
