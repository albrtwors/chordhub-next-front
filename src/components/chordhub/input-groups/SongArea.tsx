import { parseSongToJson } from "@/app/chordhub/songs/create/page"

export default function SongArea({setScriptJson,songScript, setSongScript, setCaretPosition=null}: any){
    const handleChange =(e:any)=>{
        setSongScript(e.target.value)
        setScriptJson(parseSongToJson(songScript))
    }
    return <textarea onClick={(e:any)=>{setCaretPosition(e.target.selectionStart)}} value={songScript} onChange={handleChange} className="bg-gray-100 h-50 w-full rounded-sm">
    
    </textarea>
}

