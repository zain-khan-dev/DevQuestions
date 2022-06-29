import React, { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { User } from '../schema' 
import axios from "axios"



interface Props {
    handleAddUser:(user:User|null)=> void
}


const AutoComplete:React.FC<Props>  = ({handleAddUser}) => {


    const [peopleList, setPeopleList] = useState<User[]>([])

    const [query, setQuery] = useState('')


    const [selectedPerson, setSelectedPerson] = useState<User|null>(null)

    useEffect(()=>{

        axios.get("http://localhost:8000/actor")
        .then((result)=>{
            setPeopleList(result.data)
        })
        .catch((err)=>{
            console.log("Could not fetch details from server due to error "+ err)
        })


    }, [])

    console.log(peopleList)

    useEffect(()=>{
        console.log("selected Person updated add to array now")

        console.log(selectedPerson)
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
            <Combobox.Options>
                {filteredPeople.map((person) => (
                <Combobox.Option key={person.id} value={person}>
                    {person.name}
                </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )

    }

}

export default AutoComplete