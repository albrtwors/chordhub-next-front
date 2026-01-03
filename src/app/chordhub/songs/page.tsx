import SongCard from "@/components/chordhub/songs/SongCard";
import SongGrid from "@/components/chordhub/songs/SongGrid";
import axios from "axios";

export default async function Page(){
    const {data} = await axios.get('/api/auth/songs')
    const {songs} = data
  
    return <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Canciones</h1>
        <h3 className="text-lg">Aquí encontrarás todas las canciones disponibles</h3>
        <SongGrid>
            {songs.map((song:any)=><SongCard key={song.id} name={song.name} id={song.id} author={song.author_name}></SongCard>)}
        </SongGrid>
        
    </div>
}