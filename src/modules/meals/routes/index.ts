import { Router } from 'express'

import { MealControllers } from '../controllers/meals-controllers'

export const mealRoutes = Router()

mealRoutes.get('/:userId/amount', MealControllers.amount)
mealRoutes.post('/:userId', MealControllers.create)
mealRoutes.get('/:userId/meals/:id', MealControllers.get)
mealRoutes.get('/:userId', MealControllers.list)
mealRoutes.put('/:id', MealControllers.update)
mealRoutes.delete('/:id', MealControllers.delete)
