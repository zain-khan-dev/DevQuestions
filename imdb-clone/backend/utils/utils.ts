import Actor from "../entity/actor"
import AppDataSource from "../configs/db.config"


export const createNewActor = async (newActor:Actor) => {
    const actor = new Actor()

    actor.name = newActor.name
    actor.bio = newActor.bio
    actor.gender = newActor.gender
    actor.dob = newActor.dob

    await AppDataSource.manager.save(actor)

    return actor
}