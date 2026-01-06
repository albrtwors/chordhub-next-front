import { cookies } from "next/headers"
import { supabase } from "../../../../../database/supabase/database"
import { NextResponse } from "next/server"
import { getUserId } from "../../auth/cookies/route"

export async function GET(req:any, res:any){
    const userId = await getUserId()

    const {data, error} = await supabase.from('users').select('*').eq('id', userId)

    if(error){
        console.error(error)
        return NextResponse.json({message:'No se han podido actualizar los datos'})
    }

    return NextResponse.json(data[0])

}