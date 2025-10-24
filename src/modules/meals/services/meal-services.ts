import { Meal } from 'src/db/model/meals'

type createData = {
  name: string
  description: string
  dateTimeMeal: string
  onDiet: string
  userId: number
}

type updateData = {
  id: string
  name: string
  description: string
  dateTimeMeal: string
  onDiet: string
  userId: string
}
export class MealServices {
  static async create({
    name,
    description,
    dateTimeMeal,
    onDiet,
    userId,
  }: createData) {
    const meal = await Meal.create({
      name,
      description,
      dateTimeMeal,
      onDiet,
      userId,
    })

    return meal
  }

  static async list(userId: string) {
    const meal = await Meal.findAll({
      where: {
        userId,
      },
      attributes: ['name', 'description', 'dateTimeMeal', 'onDiet'],
    })
    if (!meal) throw new Error('Nenhuma refeição registrada')
    return meal
  }

  static async get(id: string, userId: string) {
    const meal = await Meal.findOne({
      where: {
        id,
        userId,
      },
      attributes: ['name', 'description', 'dateTimeMeal', 'onDiet'],
    })

    if (!meal) throw new Error('Refeição não exite.')

    return meal
  }

  static async update({
    id,
    name,
    description,
    dateTimeMeal,
    onDiet,
    userId,
  }: updateData) {
    const meal = await this.get(id, userId)

    await meal.update({ name, description, dateTimeMeal, onDiet })

    return meal
  }

  static async delete(id: string, userId: string) {
    const meal = await this.get(id, userId)

    await meal.destroy()
  }
}
