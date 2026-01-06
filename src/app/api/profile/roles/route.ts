import { NextResponse } from "next/server"
import { supabase } from "../../../../../database/supabase/database"
import { getUserId } from "../../auth/cookies/route"
import { cookies } from "next/headers"
import { verifyPermission } from "../permissions/route"

export async function GET(req:any, res:any){
    
    const {data,error} = await supabase.from('user_role').select('*, roles(id)').eq('user_id', 15)
    if(error){
        console.log(error)
        return NextResponse.json({message:'Hubo un error obteniendo los roles'})
    }

    return NextResponse.json(data)
}