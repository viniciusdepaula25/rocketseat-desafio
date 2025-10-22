import { User } from 'src/db/model/user'

type createData = {
  name: string
  email: string
}

export class UserServices {
  static async create({ name, email }: createData) {
    const user = await User.create({
      name,
      email,
    })
    return user
  }

  static async list() {
    const user = await User.findAll({
      paranoid: false,
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

    return user
  }

  static async delete(id: string) {
    if (!id) throw new Error('Necessario informar id')

    const user = await this.get(id)

    if (!user)
      throw new Error('Nenhum usuario encontrado com esse ID informado')
    await user.destroy()
  }
}
