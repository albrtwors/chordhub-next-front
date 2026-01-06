import { NextResponse } from "next/server"
import { supabase } from "../../../../../../../database/supabase/database"

export async function GET(req:any, res:any){
    const {id}=await res.params
    const {data, error} = await supabase.from('songs').select('*').eq('id', id)

    if(error){
        console.log(error)
        return NextResponse.json({message:'Hubo un error'})
    }
    console.log(data)
    return NextResponse.json({song:data[0]})


}