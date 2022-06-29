import axios from "axios"
import { useEffect } from "react"

const ListMovies = () => {

    useEffect(()=>{
        const token = ""
        const header = `Authorization: Bearer ${token}`;
        axios.get("https://api.themoviedb.org/4/movie/top_rated", {headers:{header}})
        .then((result)=>{
            console.log("Made request succesfully")
        })
    })



    return (
        <div>
            <div>Movies List</div>
            <div>Database Movies</div>
            <div>Movies will be displayed here</div>
            <div>TMDB Mvoies</div>
            <div>TMDB Movies will be displayed here</div>
        </div>
    )
}

export default ListMovies