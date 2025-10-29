import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from 'src/db/model/user'
import { env } from 'src/env'
import AppError from 'src/error/app-error'

type createData = {
  name: string
  email: string
  password: string
}

export class UserServices {
  static async create({ name, email, password }: createData) {
    if (!name) throw new AppError('É necessario informar o nome.')
    if (!email) throw new AppError('É necessario informar o email.')
    if (!password) throw new AppError('É necessario informar a senha')

    const findUser = await User.findOne({
      where: {
        email,
      },
    })

    if (findUser) throw new AppError('Email já cadastrado')
    const passwordHash = await bcrypt.hash(password, 8)
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    })
    return user
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) throw new AppError('Email ou senha invalidos')

    const passwordMatch = await bcrypt.compare(
      password,
      user.getDataValue('password'),
    )

    if (!passwordMatch) throw new AppError('Email ou senha invalidos')

    const token = jwt.sign(
      {
        id: user.getDataValue('id'),
      },
      env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    const data = user.dataValues

    return {
      token,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
    }
  }

  static async list() {
    const user = await User.findAll({
      // paranoid: false,
    })
    if (!user) throw new AppError('Nenhum usuario cadastrado')
    return user
  }

  static async get(id: string) {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: ['name', 'id'],
    })

    if (!user)
      throw new AppError('Nenhum usuario encontrado com esse ID informado')

    return user
  }

  static async delete(id: string) {
    if (!id) throw new AppError('Necessario informar id')

    const user = await this.get(id)

    await user.destroy()
  }

  static async update(id: string, name: string, email: string) {
    const user = await this.get(id)
    await user.update({ name, email })

    if (!name) throw new AppError('Necessario informar nome')
    if (!email) throw new AppError('Necessario informar email')

    return user
  }
}
