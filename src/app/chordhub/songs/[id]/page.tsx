
"use client"
import SongPreview from "@/components/chordhub/songs/SongPreview"
import axios from "axios"
import { useParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

import { routeClient } from "../../../../../constants/defaultPathClient"

export default function Page(){
    const {id} = useParams()
    const [song,setSong]: any = useState(null)
    useEffect(() => {

    const fetchSong = async () => {

        try {

        const res = await axios.get(`${routeClient()}/api/auth/songs/${id}`);

        const { song } = res.data;

        setSong(song);

        } catch (error) {

            console.error('Error fetching song:', error);

            setSong(null); 

        }

    };

    fetchSong();

    }, [id]);
    
   

    return <Suspense fallback={<h1 className="text-3xl font-bold">Cargando ...</h1>}>
    <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{song && song.name}</h1>
        <SongPreview songStructure={song && song.structure}></SongPreview>
        
    </div>
    </Suspense>
}