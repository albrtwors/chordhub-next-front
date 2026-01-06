"use client"
import SongArea from "@/components/chordhub/input-groups/SongArea"
import SongPreview from "@/components/chordhub/songs/SongPreview"
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

interface Part {
  type: string;
  text: string;
}

export const songJsonToText = (songJson: any)=>{
    let textString = ''
    songJson.parts.map((part:any)=>{
        textString+=part.type+'\n\n'+part.text+'\n\n'
    })
    return textString
}


export default function Page(){
    const {id} = useParams()
    const [script, setSongScript] = useState('')
    const [scriptJson, setScriptJson] = useState(null)
    const [song, setSong]: any = useState({})
    useEffect(()=>{
        axios.get(`${routeClient()}/api/auth/songs/${id}/edit`).then(res=>{
            console.log(res)
            setSong(res.data.song)
            setScriptJson(res.data.song.structure)
            setSongScript(songJsonToText(res.data.song.structure))
        })

    },[id])

    const handleSubmit = async (e:any)=>{
      e.preventDefault()
      const formData = new FormData(e.target)
      let objectForm:any = Object.fromEntries(formData.entries());
      objectForm = {...objectForm, structure:scriptJson}

      Alert.LoadingAlert()
      
      const res:any = await axios.patch(`${routeClient()}/api/auth/songs/${id}/update`, objectForm, 
        {headers: {
          'Content-Type': 'application/json'
        }})

      if(res.data.state=='error'){
        Alert.ErrorAlert('Error de consulta', res.data.message)
        return
      }

      Alert.SuccessAlert('Datos Procesados', res.data.message)

  
    }

    const addSongPart = (part:string)=>{
        if(script==''){
           setSongScript(script+part)     
        }else{
            setSongScript(script+'\n\n'+part)
        }
        
    }

    return <form onSubmit={handleSubmit} className="flex-col flex gap-5">
            <h1 className="text-3xl font-bold">Editar Cancion</h1>
                <div className="sm:col-span-1">
                    <Label>
                      Nombre de la Cancion<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      defaultValue={song && song.name}
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


                  <div className="sm:col-span-1">
                    <Label>
                      Autor de la Canción<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      defaultValue={song && song.author_name}
                      zodPattern={ z.string().min(5)
                      .max(45)
                      .regex(/^[A-Za-z]/)}
                      name="author"
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
                      <SongArea setScriptJson={setScriptJson} songScript={script} setSongScript={setSongScript}></SongArea>
                      <div className="flex gap-5 justify-center">
                          <button type="button" onClick={()=>{
                            addSongPart('Estrofa')
                            setSongScript(script)
                          }} className="p-1 text-white rounded-full py-3 px-6 bg-sky-600">
                              Estrofa +
                          </button>

                          <button type="button" onClick={()=>addSongPart('Coro')} className="p-1 text-white rounded-full py-3 px-6 bg-sky-600">
                              Coro +
                          </button>
                          <button type="button" onClick={()=>addSongPart('Puente')} className="p-1 text-white rounded-full py-3 px-6 bg-sky-600">
                              Puente
                          </button>                    
                      </div>
                    </div>
              

                    <SongPreview songStructure={scriptJson}></SongPreview>

                  </div>


                  <button className="p-1 text-white rounded-sm py-3 px-6 bg-green-600">Actualizar</button>
            </form>

}