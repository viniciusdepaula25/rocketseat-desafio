import { Request, Response } from 'express'

import { MealServices } from '../services/meal-services'

export class MealControllers {
  static async create(req: Request, res: Response) {
    const userId = req.user.id
    const { name, description, dateTimeMeal, onDiet } = req.body

    const meal = await MealServices.create({
      name,
      description,
      dateTimeMeal,
      onDiet,
      userId: Number(userId),
    })
    res.status(201).send(meal)
  }

  static async list(req: Request, res: Response) {
    const userId = req.user.id
    const meals = await MealServices.list(userId)

    res.status(200).send(meals)
  }

  static async update(req: Request, res: Response) {
    const userId = req.user.id
    const { id } = req.params
    const { name, description, dateTimeMeal, onDiet } = req.body

    const meal = await MealServices.update(
      Number(id),
      userId,
      name,
      description,
      dateTimeMeal,
      onDiet,
    )

    res.status(200).send(meal)
  }

  static async delete(req: Request, res: Response) {
    const userId = req.user.id
    const { id } = req.params
    await MealServices.delete(Number(id), userId)

    res.status(200).send(true)
  }

  static async get(req: Request, res: Response) {
    const userId = req.user.id
    const { id } = req.params
    const meal = await MealServices.get(Number(id), userId)

    res.status(200).send(meal)
  }

  static async amount(req: Request, res: Response) {
    const userId = req.user.id
    const total = await MealServices.amount(userId)

    res.status(200).send({
      userId: Number(userId),
      totalMeals: total,
    })
  }

  static async onDietTrue(req: Request, res: Response) {
    const userId = req.user.id
    const total = await MealServices.onDietTrue(userId)

    res.status(200).send({
      userId: Number(userId),
      OnDietTrue: total,
    })
  }

  static async onDietFalse(req: Request, res: Response) {
    const userId = req.user.id
    const total = await MealServices.onDietFalse(userId)

    res.status(200).send({
      userId: Number(userId),
      OnDietFalse: total,
    })
  }

  static async onDietStreak(req: Request, res: Response) {
    const userId = req.user.id
    const sequency = await MealServices.onDietStreak(userId)

    res.status(200).send({
      sequency,
    })
  }
}
