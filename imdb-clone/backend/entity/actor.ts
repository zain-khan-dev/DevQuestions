import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import Movie from "./movie"
@Entity()
export default class Actor {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name:string

    @Column()
    gender:string

    @Column()
    dob:string

    @Column()
    bio:string


    @ManyToMany((type) => Movie, (movie) => movie.actors)
    movies: Movie[]


    
}