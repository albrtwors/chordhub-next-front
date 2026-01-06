import { NextResponse } from "next/server"
import { supabase } from "../../../../../database/supabase/database"
import { getUserId } from "../cookies/route"

export async function POST(req:any, res:any){
    const {name, songs} = await req.json()
    const {data,error} = await supabase.from('files').insert({name:name, songs:songs, user_id: await getUserId()})

    if (error){
        return NextResponse.json({message: 'Verifica los datos, probablemente hay uno repetido', state:'error'})
    }

    return NextResponse.json({message:'Cancionero Insertado exitosamente', state:'success'})
}

export async function GET(req:any, res:any){
    const {data, error} = await supabase.from('files').select('*')

    if(error){
        return NextResponse.json({state:'error', message:'Hubo un error obteniendo los cancioneros'})
    }

    return NextResponse.json(data)
}