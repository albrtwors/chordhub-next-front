import { NextResponse } from "next/server"
import { supabase } from "../../../../../../../database/supabase/database"

export async function PATCH(req:any, res:any){
    const {id} = await res.params
    const {name,author,structure} = await req.json()
    const {data, error} = await supabase.from('songs').update({name:name, author_name:author, structure:structure}).eq('id', id)

    if(error){
        return NextResponse.json({message:'Uno de los datos está repetido, revisa nuevamente los datos proporcionados', state:'error'})
    }

    return NextResponse.json({message:'Cancion actualizada', state:'success'})

}