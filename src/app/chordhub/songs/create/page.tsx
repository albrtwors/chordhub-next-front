"use client"
import SongArea from "@/components/chordhub/input-groups/SongArea"
import SongPreview from "@/components/chordhub/songs/SongPreview"
import Input from "@/components/form/input/InputFieldOL"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import Alert from "@/utils/swalClass"
import axios from "axios"
import { useState } from "react"
import * as z from "zod"
import { route } from "../../../../../constants/defaultPath"
import { routeClient } from "../../../../../constants/defaultPathClient"

interface Part {
  type: string;
  text: string;
}

export function parseSongToJson(song: string) {
  const lines = song.split("\n");
  const result = { parts: [] as Part[] };
  let actualPart: Part | null = null;
  const pattern =
    /^(Intro|Estrofa|Coro|PreCoro|Puente|Interludio|Verso|Outro)(\s*\d+)?$/i;

  lines.forEach((line) => {
    if (!line) return;
    if (pattern.test(line)) {
      if (actualPart) {
        result.parts.push(actualPart);
      }
      actualPart = {
        type: line.toLowerCase(),
        text: "",
      };
    } else {
      if (actualPart) {
        if (actualPart.text) {
          actualPart.text += "\n" + line;
        } else {
          actualPart.text = line;
        }
      }
    }
  });

  if (actualPart) {
    result.parts.push(actualPart);
  }

 
  return result;
}

export default function Page(){
    const [script, setSongScript] = useState('')
    const [scriptJson, setScriptJson] = useState(null)

    console.log(scriptJson)

    const handleSubmit = async (e:any)=>{
      e.preventDefault()
      const formData = new FormData(e.target)
      let objectForm:any = Object.fromEntries(formData.entries());
      objectForm = {...objectForm, structure:scriptJson}

      Alert.LoadingAlert()
      
      const res:any = await axios.post(`${routeClient()}/api/auth/songs`, objectForm, 
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
            <h1 className="text-3xl font-bold">Crear Cancion</h1>
                <div className="sm:col-span-1">
                    <Label>
                      Nombre de la Cancion<span className="text-error-500">*</span>
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


                  <div className="sm:col-span-1">
                    <Label>
                      Autor de la Canción<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
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


                  <button className="p-1 text-white rounded-sm py-3 px-6 bg-green-600">Crear</button>
            </form>

}