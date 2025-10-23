import { Request, Response } from 'express'

import { MealServices } from '../services/meal-services'

export class MealControllers {
  static async create(req: Request, res: Response) {
    const { userId } = req.params
    const { name, description, dateTimeMeal, onDiet } = req.body

    const meal = await MealServices.create({
      name,
      description,
      dateTimeMeal,
      onDiet,
      userId: Number(userId),
    })
    res.status(200).send(meal)
  }

  static async list(req: Request, res: Response) {
    const { userId } = req.params
    const meals = MealServices.list(Number(userId))
    res.status(200).send(meals)
  }
}
