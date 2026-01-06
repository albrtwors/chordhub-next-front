'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { routeClient } from "../../../../../constants/defaultPathClient"
import SongGrid from "@/components/chordhub/songs/SongGrid"
import FileCard from "@/components/chordhub/files/FileCard"

export default function Page(){
    const [files, setFiles] = useState([])

    useEffect(()=>{
        axios.get(`${routeClient()}/api/auth/files/update`).then(res=>{
            if(res.data.state ==='error'){
                return
            }
            setFiles(res.data)
            console.log(res)
        })
    },[

    ])
    
    return <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Cancioneros</h1>
        <h3 className="text-lg">Aquí encontrarás todos los cancioneros disponibles</h3>
        <SongGrid>
            {files.map((file:any)=><FileCard key={file.id} name={file.name} id={file.id} type={'edit'}></FileCard>)}
        </SongGrid>
    </div>
}