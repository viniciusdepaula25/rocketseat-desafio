import { Meal } from 'src/db/model/meals'
import AppError from 'src/error/app-error'

type createData = {
  name: string
  description: string
  dateTimeMeal: string
  onDiet: boolean
  userId: number
}

type mealsType = {
  onDiet: boolean
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
    if (!name) throw new AppError('É necessario informar o nome')
    if (!description) throw new AppError('É necessario informar a descrição')
    if (!dateTimeMeal)
      throw new AppError('É necessario informar quando a refeição foi feita')
    if (onDiet === undefined)
      throw new AppError('É necessario informar se esta dentro da dieta')
    return meal
  }

  static async list(userId: number) {
    const meal = await Meal.findAll({
      where: {
        userId,
      },
      attributes: ['id', 'name', 'description', 'dateTimeMeal', 'onDiet'],
    })
    if (!meal) throw new AppError('Nenhuma refeição registrada')
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

    if (!meal) throw new AppError('Refeição não exite.')

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

    if (!meal) throw new AppError('Refeição não exite')

    await meal.update({ name, description, dateTimeMeal, onDiet })

    return meal
  }

  static async delete(id: number, userId: number) {
    const meal = await this.get(id, userId)

    if (!meal) throw new AppError('Refeição não exite')

    await meal.destroy()
  }

  // static async getId(id: string) {
  //   const meal = await Meal.findOne({
  //     where: {
  //       id,
  //     },
  //     attributes: ['id', 'name', 'description', 'dateTimeMeal', 'onDiet'],
  //   })
  //   if (!meal) throw new AppError('Refeição não exite.')

  //   return meal
  // }

  static async amount(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
      },
    })
    if (!meals) throw new AppError('Nenhuma refeição registrada')
    return meals
  }

  static async onDietTrue(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
        onDiet: true,
      },
    })
    if (!meals) throw new AppError('Nenhuma refeição dentro da dieta')
    return meals
  }

  static async onDietFalse(userId: number) {
    const meals = await Meal.count({
      where: {
        userId,
        onDiet: false,
      },
    })
    if (meals === 1) throw new AppError('Nenhuma refeição fora da dieta')
    return meals
  }

  static async onDietStreak(userId: number) {
    const meals = (await Meal.findAll({
      where: {
        userId,
      },
      attributes: ['onDiet'],
      order: [['dateTimeMeal', 'ASC']],
      raw: true,
    })) as unknown as mealsType[]

    if (!meals) throw new AppError('Not Found')

    let sequency = 0

    meals.reduce((acc, meals) => {
      if (meals.onDiet) {
        acc += 1

        if (acc > sequency) {
          sequency = acc
        }
      } else {
        acc = 0
      }
      return acc
    }, 0)
    return sequency
  }
}
