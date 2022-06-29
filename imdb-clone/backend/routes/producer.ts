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



router.post("/", (req:Request, res:Response) => {
    res.json("Posting producer data")
})


router.put("/", (req:Request, res:Response) => {
    res.json("Updating producer data")
})


export default router