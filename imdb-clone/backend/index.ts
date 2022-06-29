import "reflect-metadata"
import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import movieRouter from "./routes/movie"
import actorRouter from "./routes/actor"
import producerRouter from "./routes/producer"
import cors from "cors"

dotenv.config();


const app:Express = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended:true}))


app.use("/movie", movieRouter)

app.use("/actor", actorRouter)

app.use("/producer", producerRouter)


app.get("/", (req:Request, res:Response) => {
	res.json({"new":"Helloworld"})
})

app.listen(port, () => {
	console.log(`[server]: Server is running at https://localhost:${port}`)
})
