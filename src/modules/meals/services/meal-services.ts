import { Meal } from 'src/db/model/meals'

type createData = {
  name: string
  description: string
  dateTimeMeal: string
  onDiet: string
  userId: number
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

  static async list(userId: Number) {
    const meal = await Meal.findAll({
      where: {
        user_id: userId,
      },
      attributes: ['name', 'description', 'dateTimeMeal', 'onDiet'],
    })

    return meal
  }

  static async get(id: string) {
    const meal = await Meal.findOne({
      where: {
        id,
      },
      attributes: ['name', 'descreption', 'dateTimeMeal', 'onDiet'],
    })

    if (!meal) throw new Error('Refeição não exite.')

    return meal
  }

  static async update(
    id: string,
    name: string,
    descreption: string,
    dateTimeMeal: string,
    onDiet: string,
  ) {
    const meal = await this.get(id)

    await meal.update({ name, descreption, dateTimeMeal, onDiet })
  }

  static async delete(id: string) {
    const meal = await this.get(id)

    await meal.destroy()
  }
}
