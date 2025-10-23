import { Router } from 'express'

import { MealControllers } from '../controllers/meals-controllers'

export const mealRoutes = Router()

mealRoutes.post('/:userId', MealControllers.create)
mealRoutes.get('/:userId', MealControllers.list)
