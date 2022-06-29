import React, {FormEventHandler, MouseEventHandler, useState} from "react"
import AutoComplete from "../Component/AutoComplete"
import {User} from "../schema"

const AddMovie = () => {



    const [name, setName] = useState("")

    const [releaseYear, setReleaseYear] = useState("")


    const [actorList, setActorList] = useState<User[]>([])

    const [producer, setProducer] = useState<User|null>(null)

    const [plot, setPlot] = useState("")


    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(name, releaseYear, plot)
    }


    const handleAddActor = (actor:User|null) => {
        if(!actor)
        return
        const copyActorList:User[] = [...actorList]
        copyActorList.push(actor)
        setActorList(copyActorList)
    }

    const handleAddProducer = (newProducer:User|null) => {

        if(!newProducer)
        return
        setProducer(newProducer)
    }

    console.log(actorList)

    return (
        <div className="mx-auto">
            <div className="text-center text-2xl ">Add movie</div>
            <div className="mx-auto w-fit m-2 p-4 "> 
                <form className="flex flex-col justify-center">
                    <label className="block mb-2 text-lg">Enter name</label>
                    <input className="block my-2 border-2 border-black" value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                    <div>Choose Actors</div>
                    <AutoComplete handleAddUser={handleAddActor} /> 
                    <div className="flex flex-col">
                        <div className="text-lg">Actors List</div>
                        <div>
                            {actorList.map((actor)=><div>{actor.name}</div>)}
                        </div>
                    </div>
                    <label className="my-2">Add Producer</label>
                    <AutoComplete handleAddUser={handleAddProducer} />
                    <label className="block my-2" >Enter year of release</label>
                    <input className="block my-2 border-2 border-black" value={releaseYear} onChange={(e)=>setReleaseYear(e.target.value)} type="date" />
                    <label className="block my-2">Enter plot</label>
                    <textarea className="border-2 my-2 border-black block" value={plot} onChange={(e)=>setPlot(e.target.value)} />
                    <button type="submit" className="bg-red-500 text-white mx-auto  rounded-xl p-2  text-center" onSubmit={handleSubmit}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddMovie