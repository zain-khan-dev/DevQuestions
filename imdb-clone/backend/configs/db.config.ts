import { DataSource } from "typeorm"
import Actor from "../entity/actor"
import Movie from "../entity/actor"
import Producer from "../entity/actor"

const AppDataSource:DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "zainkhan",
    database: "test",
    synchronize: true,
    entities: [__dirname + '/../**/entity/*.ts']
})

AppDataSource.initialize()
    .then(() => {
        console.log("App data source has been initialised")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource