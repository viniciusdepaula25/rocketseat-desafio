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
    const meals = await MealServices.list(userId)

    res.status(200).send(meals)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, dateTimeMeal, onDiet } = req.body

    const meal = await MealServices.update(
      id,
      name,
      description,
      dateTimeMeal,
      onDiet,
    )

    res.status(200).send(meal)
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    await MealServices.delete(id)

    res.status(200).send(true)
  }

  static async get(req: Request, res: Response) {
    const { id, userId } = req.params
    const meal = await MealServices.get(id, userId)

    res.status(200).send(meal)
  }

  static async amount(req: Request, res: Response) {
    const { userId } = req.params
    const total = await MealServices.amount(userId)

    res.status(200).send({
      userId: Number(userId),
      totalMeals: total,
    })
  }
}
