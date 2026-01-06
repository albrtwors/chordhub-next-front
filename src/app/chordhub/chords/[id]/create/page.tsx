"use client"
import SongArea from "@/components/chordhub/input-groups/SongArea"
import SongPreview from "@/components/chordhub/chords/SongPreview"
import Input from "@/components/form/input/InputFieldOL"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import Alert from "@/utils/swalClass"
import axios from "axios"
import { useEffect, useState } from "react"
import * as z from "zod"
import { route } from "../../../../../../constants/defaultPath"
import { routeClient } from "../../../../../../constants/defaultPathClient"
import { useParams } from "next/navigation"
import { songJsonToText } from "@/app/chordhub/songs/[id]/edit/page"
import { allChords } from "../../../../../../constants/chords"
import { parseSongToJson } from "@/app/chordhub/songs/create/page"

interface Part {
  type: string;
  text: string;
}



export default function Page(){
    const [script, setSongScript] = useState('')
    const [scriptJson, setScriptJson]: any = useState(null)
    const [songName, setSongName]: any = useState(null)
    const {id} = useParams()
    
    //SELECTED CHORD
    const [chord, setChord]: any = useState('[C]')
    const [caretPosition, setCaretPosition]: any = useState(null)
   

    const handleChordAdd = ()=>{
        const song = script.substring(0,caretPosition)+chord+script.substring(caretPosition)
        setSongScript(song)
        setScriptJson(parseSongToJson(song))
    }
    useEffect(()=>{
        axios.get(`${routeClient()}/api/auth/chords/${id}/create`).then(res=>{
           console.log(res)
           setSongScript(songJsonToText(res.data.song.structure))
           setScriptJson(res.data.song.structure)
           setSongName(res.data.song.name)
        })



    },[id])

    const handleSubmit = async (e:any)=>{
      e.preventDefault()
      const formData = new FormData(e.target)
      let objectForm:any = Object.fromEntries(formData.entries());
      objectForm = {...objectForm, structure:scriptJson, song_id:id}

      Alert.LoadingAlert()
      
      const res:any = await axios.post(`${routeClient()}/api/auth/chords`, objectForm, 
        {headers: {
          'Content-Type': 'application/json'
        }})

      if(res.data.state=='error'){
        Alert.ErrorAlert('Error de consulta', res.data.message)
        return
      }

      Alert.SuccessAlert('Datos Procesados', res.data.message)

  
    }



    return <form onSubmit={handleSubmit} className="flex-col flex gap-5">
            <h1 className="text-3xl font-bold">Armonizar {songName}</h1>
                <div className="sm:col-span-1">
                    <Label>
                      Nombre de la versión<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      zodPattern={ z.string().min(5)
                      .max(45)
                      .regex(/^[A-Za-z]/)}
                      name="name"
                      hint="El nombre de cancion solo admite carácteres alfanuméricos y debe tener de 5-45 caracteres"
                      id="name"
                      placeholder="Introduce nombre de la cancion"
                    />
                  </div>

                 
                 

                  <div className="flex lg:flex-row flex-col md:flex-row sm:flex-col gap-5">
                    <div className="flex flex-1 flex-col gap-5">
                      <Label>
                        Estructura <span className="text-error-500">*</span>
                      </Label>
                      <SongArea setCaretPosition={setCaretPosition} setScriptJson={setScriptJson} songScript={script} setSongScript={setSongScript}></SongArea>
                      <div className="flex gap-5 justify-center">
                          <select className="bg-gray-100 rounded-lg p-1 px-3" onChange={(e)=>{setChord(e.target.value)}}>
                            {allChords.map((chord,index)=><option key={index} value={`[${chord}]`}>{chord}</option>)}
                            
                          </select>
                          <button type='button' onClick={handleChordAdd} className="bg-sky-600 rounded-full py-3 px-6 text-white">Añadir</button>      
                      </div>
                    </div>
              

                    <SongPreview songStructure={scriptJson}></SongPreview>

                  </div>


                  <button className="p-1 text-white rounded-sm py-3 px-6 bg-green-600">Crear</button>
            </form>

}