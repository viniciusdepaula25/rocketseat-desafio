import express from 'express'

import { mealRoutes } from './modules/meals/routes'
import { userRoutes } from './modules/users/routes'

export const routes = express.Router()

routes.use('/users', userRoutes)
routes.use('/meals', mealRoutes)
