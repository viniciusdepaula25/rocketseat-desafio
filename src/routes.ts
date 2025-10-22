import express from 'express'

import { userRoutes } from './modules/users/routes'

export const routes = express.Router()

routes.use('/users', userRoutes)
