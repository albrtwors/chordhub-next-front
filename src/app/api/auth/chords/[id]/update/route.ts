import { NextResponse } from "next/server"
import { supabase } from "../../../../../../../database/supabase/database"
import { getUserId } from "../../../cookies/route"

export async function PATCH(req:any, res:any){
    const {id} = await res.params
    const {name,structure, song_id} = await req.json()
    const {data, error} = await supabase.from('chords').update({name:name,song_id:song_id, structure:structure, user_id:await getUserId()}).eq('id', id)

    if(error){
        console.log(error)
        return NextResponse.json({message:'Uno de los datos está repetido, revisa nuevamente los datos proporcionados', state:'error'})
    }

    return NextResponse.json({message:'Cancion actualizada', state:'success'})

}