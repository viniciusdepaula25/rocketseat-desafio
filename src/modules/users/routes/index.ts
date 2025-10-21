import { Router } from "express";
import { Userscontroller } from "../controllers/users-controllers";

export const userRoutes = Router()

userRoutes.post('/', Userscontroller.create)
