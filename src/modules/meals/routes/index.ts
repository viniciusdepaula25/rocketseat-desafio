import { Router } from 'express'
import { authorized } from 'src/middlewares/authenticated'

import { MealControllers } from '../controllers/meals-controllers'

export const mealRoutes = Router()

// mealRoutes.use(authorized)

mealRoutes.get('/on-diet-false', authorized, MealControllers.onDietFalse)
mealRoutes.get('/on-diet-true', authorized, MealControllers.onDietTrue)
mealRoutes.get('/amount', authorized, MealControllers.amount)
mealRoutes.post('/create', authorized, MealControllers.create)
mealRoutes.get('/meals/:id', authorized, MealControllers.get)
mealRoutes.get('/list', authorized, MealControllers.list)
mealRoutes.put('/:id', authorized, MealControllers.update)
mealRoutes.delete('/:id', authorized, MealControllers.delete)
