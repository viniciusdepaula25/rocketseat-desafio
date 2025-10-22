import { Router } from 'express'

import { Userscontroller } from '../controllers/users-controllers'

export const userRoutes = Router()

userRoutes.post('/', Userscontroller.create)
userRoutes.get('/', Userscontroller.list)
userRoutes.get('/:id', Userscontroller.get)
userRoutes.delete('/:id', Userscontroller.delete)
