import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import Producer from "./producer"
import Actor from "./actor"

@Entity()
export default class Movie {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!:string

    @Column()
    year_of_release!:string

    @Column()
    plot!:string

    @Column()
    poster!:string

    @ManyToOne(type=>Producer, producer => producer.movies) 
    producer: Producer

    @ManyToMany(() => Actor, (actor) => actor.movies)
    @JoinTable()
    actors: Actor[]


    addActors(actorList:Actor[]) {
        this.actors = actorList
    }

    addProducer(producer:Producer) {
        this.producer = producer
    }


}