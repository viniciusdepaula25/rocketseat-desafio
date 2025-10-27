import { Meal } from 'src/db/model/meals'

type createData = {
  name: string
  description: string
  dateTimeMeal: string
  onDiet: boolean
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

  static async list(userId: number) {
    const meal = await Meal.findAll({
      where: {
        userId,
      },
      attributes: ['id', 'name', 'description', 'dateTimeMeal', 'onDiet'],
    })
    if (!meal) throw new Error('Nenhuma refeição registrada')
    return meal
  }

  static async get(id: number, userId: number) {
    const meal = await Meal.findOne({
      where: {
        userId,
        id,
      },
      attributes: [
        'userId',
        'id',
        'name',
        'description',
        'dateTimeMeal',
        'onDiet',
      ],
    })

    if (!meal) throw new Error('Refeição não exite.')

    return meal
  }

  static async update(
    id: number,
    userId: number,
    name: string,
    description: string,
    dateTimeMeal: string,
    onDiet: boolean,
  ) {
    const meal = await this.get(id, userId)
    await meal.update({ name, description, dateTimeMeal, onDiet })

    return meal
  }

  static async delete(id: number, userId: number) {
    const meal = await this.get(id, userId)

    await meal.destroy()
  }

  static async getId(id: string) {
    const meal = await Meal.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name', 'description', 'dateTimeMeal', 'onDiet'],
    })
    if (!meal) throw new Error('Refeição não exite.')

    return meal
  }

  static async amount(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
      },
    })
    return meals
  }

  static async onDietTrue(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
        onDiet: true,
      },
    })
    return meals
  }

  static async onDietFalse(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
        onDiet: false,
      },
    })
    return meals
  }

  // static async onDietStreak(userId: string) {
  //   const meals = await Meal.findAll({
  //     where: {
  //       userId,
  //     },
  //     order: [['dateTimeMeal', 'ASC']],
  //   })

  // }
}
