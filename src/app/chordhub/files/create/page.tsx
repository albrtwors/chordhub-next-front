"use client"
import Input from "@/components/form/input/InputFieldOL";
import Label from "@/components/form/Label";
import { useEffect, useState } from "react";
import * as z from 'zod'
import {ReactSortable} from 'react-sortablejs'
import axios from "axios";
import { routeClient } from "../../../../../constants/defaultPathClient";
import Alert from "@/utils/swalClass";
export default function Page(){
    const [songs, setSongs]: any = useState([])
    const [searchSongs, setSearchSongs]:any = useState([])
    const [listSongs, setListSongs]:any = useState([
    ])

    //SEARCH DATA
    const [search, setSearch]: any = useState('')
  
    useEffect(()=>{
        axios.get(`${routeClient()}/api/auth/songs`).then((res:any)=>{
            setSongs(res.data.songs)
            setSearchSongs(res.data.songs)
        })
    },[])

    const handleSongAdd = (song:any)=>{

        let error: boolean = false

        listSongs.forEach((so:any)=>{
            if(song.id==so.id){
                Alert.ErrorAlert('Error', 'No puedes incluir la misma cancion dos veces')
                error=true
                return
            }
        })

        if(error){
            return
        }

        setListSongs([...listSongs, song])
        
    }

    const handleSearch = (e: any) => {
        const searchTerm = e.target.value.toLowerCase(); 
        const newSongArray = songs.filter((li: any) => {
            return li.name.toLowerCase().includes(searchTerm)
        });
        
        setSearchSongs(newSongArray);
   
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        let fileCredentials: any = Object.fromEntries(formData.entries())
        fileCredentials = {...fileCredentials, songs:listSongs}
        
        Alert.LoadingAlert()

        axios.post(`${routeClient()}/api/auth/files`,fileCredentials, {headers:{
            'Content-Type': 'application/json'
        }}).then(res=>{
            if(res.data.state=='error'){
                Alert.ErrorAlert('Error', res.data.message)
                return
            }

            Alert.SuccessAlert('Exito', res.data.message)
        })

    }
    return <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Crear Cancionero</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="sm:col-span-1">
                <Label>
                    Nombre del cancionero<span className="text-error-500">*</span>
                </Label>
                <Input
                    type="text"
                    zodPattern={ z.string().min(5)
                    .max(45)
                    .regex(/^[A-Za-z]/)}
                    name="name"
                    hint="El nombre de cancionero solo admite carácteres alfanuméricos y debe tener de 5-45 caracteres"
                    id="name"
                    placeholder="Introduce nombre del cancionero"
                />
            </div>

            <div className="gap-5 flex flex-col sm:flex-col md:flex-row lg:flex-row">

                <div className="flex-1">
                    <Label>Buscar Canciones</Label>
                    <input onChange={handleSearch} placeholder="Eres todopoderoso" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"></input>
                    <div className="ms-3 mt-5">
                        <Label>Canciones:</Label>
                        <div className="mt-5 flex flex-col gap-2 h-50 overflow-y-scroll">
                            {songs && searchSongs.map((song:any, key:number)=><div className="p-3 bg-gray-100 flex rounded-lg" key={key}>
                                {song.name}
                                <div className="flex-1 flex justify-end gap-2">
                                    <button type="button" onClick={()=>handleSongAdd(song)} className="px-6 py-3 bg-green-600 rounded-full text-white">+</button>
                                </div>
                            </div>)}
                        </div>

                    </div>
                </div>


                <div className="flex-1">
                    <Label>Canciones Seleccionadas</Label>
                    <ReactSortable list={listSongs} setList={setListSongs}>
                        {listSongs.map((li:any)=>{
                        return <div className="p-1 border-2 rounded-lg flex" key={li.id}>
                            {li.name} 
                            <div className="flex-1 flex justify-end gap-5">
                                
                                
                                <div>
                                    <button onClick={()=>{
                                        let newArray = listSongs.filter((song:any)=>{
                                            return song.id!=li.id
                                        })
                                        setListSongs(newArray)
                                    
                                }} type="button" className="rounded-full p-3 px-6 bg-red-600 text-white">-</button>
                                </div>
                            </div>    
                        </div>
                        })}
                    </ReactSortable>
                </div>

            </div>

            <button className="p-2 rounded-lg bg-green-600 text-white">Crear</button>

        </form>
    </div>
}