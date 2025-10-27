import { Router } from 'express'
import { authorized } from 'src/middlewares/authenticated'

import { Userscontroller } from '../controllers/users-controllers'

export const userRoutes = Router()

userRoutes.post('/login', Userscontroller.login)
userRoutes.post('/', Userscontroller.create)

userRoutes.use(authorized)

userRoutes.get('/', Userscontroller.list)
userRoutes.get('/:id', Userscontroller.get)
userRoutes.delete('/:id', Userscontroller.delete)
userRoutes.put('/:id', Userscontroller.update)
