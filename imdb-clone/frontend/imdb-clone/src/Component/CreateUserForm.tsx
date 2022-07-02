import axios from "axios"
import React, {useState} from "react"
import { Gender } from "../Constants/schema"
import {ACTOR, PRODUCER} from "../Constants/Constants"
import {useAppDispatch} from "../Reducer/hook"
import { addActor } from "../Reducer/ActorSlice"
import {addProducer} from "../Reducer/ProducerSlice"


interface Props {
    userType:string
    closeModal:()=>void
}


const CreateUserForm:React.FC<Props> = ({userType, closeModal}) => {

    const [name, setName] = useState<string>("")
    const [dob, setDOB] = useState<string>("")
    const [gender, setGender] = useState<Gender>("Male")


    const dispatch = useAppDispatch()

    const [bio, setBio] = useState<string>("")


    const handleCreate = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        console.log(name, dob, gender, bio)

        if(userType === ACTOR){
            axios.post("http://localhost:8000/actor", {name, dob, gender, bio})
            .then((result)=>{
                dispatch(addActor(result.data))
                closeModal()
            })
            // post to actor
        }
        else if(userType == PRODUCER){
            axios.post("http://localhost:8000/producer", {name, dob, gender, bio})
            .then((result)=>{
                console.log("Added succesfully")
                dispatch(addProducer(result.data))
                closeModal()
            })
            .catch((err)=>{
                console.log("Facing error")
            })
            // post to producer
        }
    }


    return (
        <form className="flex flex-col w-fit mx-auto" onSubmit={handleCreate}>
            <label className="font-bold p-2 m-2">Enter name</label>
            <input type="text" className="border-2 border-black" value={name} onChange={(e)=>setName(e.target.value)} />
            <label className="font-bold p-2 m-2">Enter Date of Birth</label>
            <input type="date" className="border-2 border-black" value={dob} onChange={(e)=>setDOB(e.target.value)} />
            <label className="font-bold p-2 m-2">Choose gender</label>
            <select className="p-2 m-2" onChange={(e)=>setGender(e.target.value as Gender)} value={gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <label>Enter Bio</label>
            <textarea value={bio} onChange={(e)=>setBio(e.target.value)} />
            <button type="submit" className="p-2 m-2 bg-green-600 text-white rounded-xl shadow-xl">Create</button>
      </form>
    )
}

export default CreateUserForm