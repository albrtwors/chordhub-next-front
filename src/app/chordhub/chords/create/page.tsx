import SongCard from "@/components/chordhub/chords/SongCard";
import SongGrid from "@/components/chordhub/songs/SongGrid";
import axios from "axios";
import { route } from "../../../../../constants/defaultPath";


export default async function Page(){
    let songs: any | Array<object>  = null
    try{
        const {data} = await axios.get(`${route}/api/auth/songs`)
        songs = data.songs
    }catch(e){
        console.error(e)
    }
  
    return <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Acordes</h1>
        <h3 className="text-lg">Aquí encontrarás todas las canciones para armonizar</h3>
        
        <SongGrid>
          {songs && songs!.map((song:any)=><SongCard type={'create'} key={song.id} name={song.name} id={song.id} author={song.author_name}></SongCard>)}    
        </SongGrid>
        
    </div>
}