import SongCard from "@/components/chordhub/songs/SongCard";
import SongGrid from "@/components/chordhub/songs/SongGrid";
import axios from "axios";
import { route } from "../../../../constants/defaultPath";
import { cookies } from "next/headers";
import { verifyPermission } from "@/app/api/profile/permissions/route";
import {redirect, RedirectType } from "next/navigation";

export default async function Page(){
    let songs: any | Array<object>  = null
    const cookiesShop: any = await cookies()
    const id = cookiesShop.get('user-id').value
    const hasPermission = await verifyPermission(id, 'chords.show')
    
    if(!hasPermission){
        redirect('/chordhub', RedirectType.push)
    }
 
    try{
        const {data} = await axios.get(`${route}/api/auth/songs`)
        songs = data.songs
    }catch(e){
        console.error(e)
    }
  
    return <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Canciones</h1>
        <h3 className="text-lg">Aquí encontrarás todas las canciones disponibles</h3>
        <SongGrid>
            {songs && songs!.map((song:any)=><SongCard type={'show'} key={song.id} name={song.name} id={song.id} author={song.author_name}></SongCard>)}
        </SongGrid>
        
    </div>
}