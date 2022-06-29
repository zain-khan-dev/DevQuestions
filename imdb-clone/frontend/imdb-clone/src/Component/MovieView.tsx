import {Movie} from "../Constants/schema"

interface Props {
    movie:Movie, 
    type:string
}


const MovieView:React.FC<Props> = ({movie, type}) => {
    

    const handleMovieEdit = () => {

    }
    
    
    return (
        
        <div className="flex flex-col mx-auto bg-gray-200 shadow-xl m-2 p-2" >
            {type==="db"?<div className="bg-yellow-600 text-white px-2 w-fit rounded-xl shadow-xl cursor-pointer right-0" onClick={handleMovieEdit}>Edit</div>:<div></div>}
            <div className="text-xl font-bold">
                {movie.name}
            </div>
            <div className="text-lg">
                Released in {movie.year_of_release} 
            </div>
            <div>
                <img src={(type==="tmdb"?"https://image.tmdb.org/t/p/w500":"http://localhost:8000") + movie.poster} />
            </div>
            <div className="text-lg font-bold" >
                Summary
            </div>
            <div className="text-sm">
                <div>{movie.plot}</div>
            </div>
        </div>
    )
}

export default MovieView