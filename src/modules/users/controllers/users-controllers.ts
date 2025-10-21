import { UserServices } from "../services/user-services"

export class Userscontroller{
    static async create(req, res){
        const user = await UserServices.create()
        res.status(200).send(user)
    }
}