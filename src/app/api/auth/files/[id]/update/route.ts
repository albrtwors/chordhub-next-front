import { NextResponse } from "next/server"
import { supabase } from "../../../../../../../database/supabase/database"
import { getUserId } from "../../../cookies/route"

export async function PATCH(req:any, res:any){
    const {id} = await res.params
    const {name,songs} = await req.json()
    const {data, error} = await supabase.from('files').update({name:name,songs:songs, user_id:await getUserId()}).eq('id', id)

    if(error){
        console.log(error)
        return NextResponse.json({message:'Uno de los datos está repetido, revisa nuevamente los datos proporcionados', state:'error'})
    }

    return NextResponse.json({message:'Cancionero actualizado', state:'success'})

}