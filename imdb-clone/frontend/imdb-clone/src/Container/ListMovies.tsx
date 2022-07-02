import axios from "axios"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MovieView from "../Component/MovieView"
import {Movie} from "../Constants/schema"
import { setMovie } from "../Reducer/MovieSlirce"
import { RootState } from "../Reducer/store"
import { useAppSelector } from "../Reducer/hook"

const ListMovies = () => {

    const [TMDBMovies, setTMDBMovies] = useState<Movie[]>([])



    const dbMovies =  useAppSelector((state:RootState)=>state.movie.movies)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    useEffect(()=>{
        const token = process.env.REACT_APP_TOKEN4
        const token3 = process.env.REACT_APP_TOKEN3
        const header = `Authorization: Bearer ${token}`;
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${token3}`)
        .then((response)=>{
            console.log(response.data.results)
            setTMDBMovies(response.data.results.map((movie:any)=>{return {name:movie.title, plot:movie.overview,poster:movie.poster_path,year_of_release:movie.release_date }}))
            console.log("Made request succesfully")
        })

        axios.get("http://localhost:8000/movie")
        .then((result)=>{
            dispatch(setMovie(result.data))
            console.log(result.data)
        })
        .catch((err)=>{
            console.log(err)
        })


    }, [])


    const moveToCreate = () => {
        navigate("/add")
    }

    return (
        <div className="w-9/12 mx-auto text-center">
            <div className="text-5xl">Movies List</div>
            <button className="px-3 py-2 bg-green-600 text-white rounded-xl my-2" onClick={moveToCreate}>Add New Movies</button>
            <div className="text-3xl font-bold">Database Movies</div>
            <div className="grid grid-cols-4 gap-4">
                {dbMovies.map((movie)=><MovieView movie={movie} type="db" />)}
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