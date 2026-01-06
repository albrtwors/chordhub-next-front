import { NextResponse } from "next/server"
import { supabase } from "../../../../../database/supabase/database"
import { getUserId } from "../cookies/route"

export async function POST(req:any, res:any){
    const {name,structure, song_id} = await req.json()

    try{
        const {error} = await supabase.from('chords').insert({name:name, structure:structure,song_id:song_id,user_id: await getUserId()})
        if(error){
            console.log(error)
            return NextResponse.json({state:'error', message:'Hubo un error al insertar la cancion'})
        }

    }catch(e){
        return NextResponse.json({state:'error', message:'Hubo un error al insertar la cancion'})
    }
    
    
    return NextResponse.json({state:'success', message:'Cancion Creada'})
}

export async function GET(req:any, res:any){
    const {error, data} = await supabase.from('chords').select('*, songs(name)')

    if(error){
        return NextResponse.json({message:'Error al obtener los datos', state:'error'})
    }

    return NextResponse.json({songs:data})
}