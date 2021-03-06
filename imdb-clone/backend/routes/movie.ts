import express, {Request, Response} from "express"
import { In } from "typeorm"
import AppDataSource from "../configs/db.config"
import Actor from "../entity/actor"
import Movie from "../entity/movie"
import Producer from "../entity/producer"
import multer from "multer"
const upload = multer({ dest: './public/posters/' });

const router = express.Router()



router.get("/", async (req:Request,res:Response) => {



    AppDataSource.getRepository(Movie).find({relations:{producer:true, actors:true}})
    .then((result)=>{
        return res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })




    // const movies = await userRepository.find({
    //     relations: {
    //         producer: true,
    //     },
    // })

    // console.log(movies)

    // return res.json(movies)

})



router.post("/", upload.single("file"), async (req:Request, res:Response) => {


    const formData = req.body;


    console.log(formData)


    let path =""

    if(req.file){
        path = req.file["destination"] + req.file["filename"]
        path = path.substring(8)
        console.log(path)
    }   

    console.log(req.body)

    const producerStr = JSON.parse(formData["producer"])
    const producerId = producerStr.id

    const actorListIds = JSON.parse(formData["actorList"])

    const actorIds = actorListIds.map((actor:any)=>actor.id)



    const actorList = await AppDataSource.getRepository(Actor).find({where:{id:In([...actorIds])}})


    const producer = await AppDataSource.getRepository(Producer).find({where:{id:producerId}})



    console.log(producer)


    await AppDataSource  
    .createQueryBuilder()
    .delete()
    .from(Movie)
    .where("year_of_release is null")
    .execute();


    const movie1 = new Movie()
    movie1.name = req.body["name"]
    movie1.plot = req.body["plot"]
    movie1.poster = path
    movie1.year_of_release = req.body["releaseYear"]
    movie1.addActors(actorList)

    if(producer.length !=  0)
        movie1.addProducer(producer[0])
    else{

    }
    const movie = await AppDataSource.manager.save(movie1)


    return res.json(movie)
})


router.put("/", (req:Request, res:Response) => {
    res.json("Updating user data")
})


export default router