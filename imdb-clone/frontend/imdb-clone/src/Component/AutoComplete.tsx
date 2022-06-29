import React, { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { User } from '../Constants/schema' 
import axios from "axios"
import {AiFillCaretDown} from "react-icons/ai"
import { setActor } from '../Reducer/ActorSlice'
import {setProducer} from "../Reducer/ProducerSlice"
import { useAppSelector, useAppDispatch } from '../Reducer/hook'

interface Props {
    handleAddUser:(user:User)=> void,
    type:string
}


const AutoComplete:React.FC<Props>  = ({handleAddUser, type}) => {



    const actors = useAppSelector((state)=>state.actor.users)
    const producers = useAppSelector((state)=>state.producer.users)

    const dispatch = useAppDispatch()
    
    
    const [peopleList, setPeopleList] = useState<User[]>([])

    const [query, setQuery] = useState('')

    console.log("Value of actors in cache")
    console.log(actors)

    const [selectedPerson, setSelectedPerson] = useState<User|null>(null)

    useEffect(()=>{

        if((type === "actor" && actors.length != 0) || (type=="producer" && producers.length !=0 )){
            if(type ==="actor")
            setPeopleList(actors)
            else
            setPeopleList(producers)
        }
        else{
            axios.get("http://localhost:8000/" + type)
                .then((result)=>{
                    if(type === "actor"){
                        console.log("setting actors")
                        dispatch(setActor(result.data))
                    }
                    else{
                        dispatch(setProducer(result.data))
                    }
                    console.log("Now here")
                    setPeopleList(result.data)
                })
                .catch((err)=>{
                    console.log("Could not fetch details from server due to error "+ err)
                })
        }

    }, [])

    console.log(peopleList)

    useEffect(()=>{
        console.log("selected Person updated add to array now")

        console.log(selectedPerson)
        if(selectedPerson)
            handleAddUser(selectedPerson)
        
    }, [selectedPerson])


    if(peopleList.length == 0){
        return (<div>Loading</div>)
    }
    else{
        const filteredPeople =
            query === ''
            ? peopleList
            : peopleList.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
                )
    return (
           <Combobox value={selectedPerson} onChange={setSelectedPerson} >
            <Combobox.Input className="border-2 border-black" onChange={(event) => setQuery(event.target.value)} />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              </Combobox.Button>
            <Combobox.Options className="p-2 border-2 border-black max-h-[200px] overflow-scroll">
                {filteredPeople.map((person) => (
                <Combobox.Option className="py-1 text-lg bg-gray-100 border-black border-b-2" key={person.id} value={person}>
                    {person.name}
                </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )

    }

}

export default AutoComplete