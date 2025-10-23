import { User } from 'src/db/model/user'

type createData = {
  name: string
  email: string
}

export class UserServices {
  static async create({ name, email }: createData) {
    if (!name) throw new Error('É necessario informar o nome.')
    if (!email) throw new Error('É necessario informar o email.')

    const findUser = await User.findOne({
      where: {
        email,
      },
    })

    if (findUser) throw new Error('Email já cadastrado')

    const user = await User.create({
      name,
      email,
    })
    return user
  }

  static async list() {
    const user = await User.findAll({
      // paranoid: false,
    })

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
      throw new Error('Nenhum usuario encontrado com esse ID informado')

    return user
  }

  static async delete(id: string) {
    if (!id) throw new Error('Necessario informar id')

    const user = await this.get(id)

    await user.destroy()
  }

  static async update(id: string, name: string, email: string) {
    const user = await this.get(id)

    await user.update({ name, email })

    return user
  }
}
