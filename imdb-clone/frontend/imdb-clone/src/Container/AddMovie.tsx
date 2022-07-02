import axios from "axios"
import React, {FormEventHandler, MouseEventHandler, useState} from "react"
import AutoComplete from "../Component/AutoComplete"
import {User} from "../Constants/schema"
import DialogForm from "../Component/DialogForm"
import {ACTOR, PRODUCER} from "../Constants/Constants"

const AddMovie = () => {



    const [name, setName] = useState("")

    const [releaseYear, setReleaseYear] = useState("")


    const [actorList, setActorList] = useState<User[]>([])

    const [producer, setProducer] = useState<User|null>(null)

    const [plot, setPlot] = useState("")

    const fileRef = React.createRef<HTMLInputElement>()

    console.log(fileRef)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("here")
        console.log(event)
        let files = null
        let file = null

        
        if(fileRef.current){
            files = fileRef.current.files
            if(files && files.length > 0){
                console.log(files[0])
                file = files[0]
            }
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("releaseYear",releaseYear)
        formData.append("plot", plot)
        formData.append("actorList", JSON.stringify(actorList))
        formData.append("producer", JSON.stringify(producer))


        if(!file)
            formData.append("file", "")
        else
            formData.append("file", file)


//{name:name, actorList:actorList,plot:plot, releaseYear: releaseYear, producer:producer, file:file}
        axios.post("http://localhost:8000/movie", formData , {headers:{"Content-Type": "multipart/form-data"}})
        .then((result)=>{
            console.log(result)
            console.log("submitted successfully")
        })
        .catch((err)=>{
            console.log("Facing error "+ err)
        })
        console.log(name, releaseYear, plot)
    }


    const handleAddActor = (actor:User|null) => {
        if(!actor)
        return
        const copyActorList:User[] = [...actorList]
        copyActorList.push(actor)
        setActorList(copyActorList)
    }

    const handleAddProducer = (newProducer:User) => {

        console.log("producer is " + newProducer)
        setProducer(newProducer)
    }


    return (
        <div className="mx-auto">
            <div className="text-center text-5xl font-bold ">Add movie</div>
            <div className="mx-auto w-fit m-2 p-4 "> 
                <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                    <label className="block mb-2 text-xl">Enter name</label>
                    <input className="block my-2 border-2 border-black" value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                    <div className="text-xl">Choose Actors</div>
                    <AutoComplete handleAddUser={handleAddActor} type="actor" />
                    <DialogForm btnText="Add Actor" userType={ACTOR} /> 
                    <div className="flex flex-col">
                        <div className="text-xl">Chosen Actors</div>
                        <div>
                            {actorList.map((actor, idx)=><div className="text-lg py-1 px-2">{idx + 1} . {actor.name}</div>)}
                        </div>
                    </div>
                    <label className="my-2">Add Producer</label>
                    <AutoComplete handleAddUser={handleAddProducer} type="producer" />
                    <DialogForm btnText="Add Producer" userType={PRODUCER} /> 
                    <label className="my-2">Chosen Producer</label>
                    <div>{producer!=null?producer.name:""}</div>
                    <label className="block my-2" >Enter year of release</label>
                    <input className="block my-2 border-2 border-black" value={releaseYear} onChange={(e)=>setReleaseYear(e.target.value)} type="date" />
                    <label className="p-2">Choose Poster Path</label>
                    <input type="file" accept="image/*" ref={fileRef} />
                    <label className="block my-2">Enter plot</label>
                    
                    <textarea className="border-2 my-2 border-black block" value={plot} onChange={(e)=>setPlot(e.target.value)} />
                    <button type="submit" className="bg-red-500 text-white mx-auto  rounded-xl p-2  text-center" >Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddMovie