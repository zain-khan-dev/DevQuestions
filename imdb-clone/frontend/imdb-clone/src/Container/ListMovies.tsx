import axios from "axios"
import { useEffect,useState } from "react"
import MovieView from "../Component/MovieView"
import {Movie} from "../Constants/schema"

const ListMovies = () => {

    const [TMDBMovies, setTMDBMovies] = useState<Movie[]>([])
    const [DBMovies, setDBMovies] = useState<Movie[]>([])


    useEffect(()=>{
        const token = process.env.REACT_APP_TOKEN4
        const token3 = process.env.REACT_APP_TOKEN3
        const header = `Authorization: Bearer ${token}`;
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${token3}`)
        .then((response)=>{
            console.log(response.data.results)
            setTMDBMovies(response.data.results.map((movie:any)=>{return {name:movie.title, plot:movie.overview,poster:movie.poster_path }}))
            console.log("Made request succesfully")
        })

        axios.get("http://localhost:8000/movie")
        .then((result)=>{
            console.log(result.data)
            setDBMovies(result.data)
        })
        .catch((err)=>{
            console.log(err)
        })


    }, [])



    return (
        <div className="w-9/12 mx-auto text-center">
            <div className="text-5xl">Movies List</div>
            <div className="text-3xl font-bold">Database Movies</div>
            <div className="grid grid-cols-4 gap-4">
                {DBMovies.map((movie)=><MovieView movie={movie} type="db" />)}
            </div>
            <div>Movies will be displayed here</div>
            <div className="text-3xl font-bold">TMDB Movies</div>
            <div className="grid grid-cols-4 gap-4 ">
                {TMDBMovies.map((movie)=><MovieView movie={movie} type="tmdb" />)}
            </div>
        </div>
    )
}

export default ListMovies