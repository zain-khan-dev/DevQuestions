import express, {Request, Response} from "express"
import AppDataSource from "../configs/db.config"
import Actor from "../entity/actor"

const router = express.Router()

router.get("/", async (req:Request,res:Response) => {

    const user = await AppDataSource.getRepository(Actor).find({})

    return res.json(user)
})



router.post("/", async (req:Request, res:Response) => {

    console.log(req.body)

    const actorInstance = req.body



    const newActor = new Actor()

    newActor.bio = actorInstance.bio
    newActor.dob = actorInstance.dob
    newActor.gender = actorInstance.gender
    newActor.name = actorInstance.name

    const actor = await AppDataSource.getRepository(Actor).save(newActor)

    return res.json(actor)
})


router.put("/", (req:Request, res:Response) => {
    res.json("Updating user data")
})  


export default router