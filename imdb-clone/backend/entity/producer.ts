import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Movie from "./movie"

@Entity()
export default class Producer {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!:string

    @Column()
    gender!:string

    @Column()
    dob!:string

    @Column()
    bio!:string

    @OneToMany(type=>Movie, movie => movie.producer, {cascade:true} ) 
    movies:Movie[];


    addMovie(movie:Movie) {
        if(this.movies == null)
        this.movies = Array<Movie>();
        this.movies.push(movie)
    }
}