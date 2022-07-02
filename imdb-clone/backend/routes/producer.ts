import express, {Request, Response} from "express"
import AppDataSource from "../configs/db.config"
import Producer from "../entity/producer"
const router = express.Router()



router.get("/", async (req:Request,res:Response) => {


    const user = await AppDataSource
    .createQueryBuilder()
    .select("producer")
    .from(Producer, "producer")
    .getMany()

    return res.json(user)
})



router.post("/", async (req:Request, res:Response) => {

    console.log(req.body)

    const actorInstance = req.body



    const newProducer = new Producer()

    newProducer.bio = actorInstance.bio
    newProducer.dob = actorInstance.dob
    newProducer.gender = actorInstance.gender
    newProducer.name = actorInstance.name

    const producer = await AppDataSource.getRepository(Producer).save(newProducer)

    return res.json(producer)
})

router.put("/", (req:Request, res:Response) => {
    res.json("Updating producer data")
})


export default router