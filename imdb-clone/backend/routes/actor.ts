import express, {Request, Response} from "express"
import AppDataSource from "../configs/db.config"
import Actor from "../entity/actor"

const router = express.Router()



router.get("/", async (req:Request,res:Response) => {

    const user = await AppDataSource
    .createQueryBuilder()
    .select("actor")
    .from(Actor, "actor")
    .getMany()

    return res.json(user)
})



router.post("/", async (req:Request, res:Response) => {

    console.log(req.body)

    const actorInstance = req.body


    await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(Actor)
    .values([   
        {"name":actorInstance.name,
        "dob":actorInstance.dob,
        "gender":actorInstance.gender,
        "bio":actorInstance.bio}])
    .execute()

    return res.json("Created Successfully")
})


router.put("/", (req:Request, res:Response) => {
    res.json("Updating user data")
})  


export default router