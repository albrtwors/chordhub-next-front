import { NextResponse } from "next/server"
import { supabase } from "../../../../../../database/supabase/database"

export async function GET(req:any, res:any){
    const {id} = await res.params
    const {data, error} = await supabase.from('files').select('*').eq('id', id)

    if(error){
        console.log(error)
        return NextResponse.json({message:'hubo un error', state:'error'})
    }

    return NextResponse.json(data[0])

}