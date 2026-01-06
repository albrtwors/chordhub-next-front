import axios from "axios"
import { NextResponse } from "next/server"
import { supabase } from "../../../../../database/supabase/database"
import { getUserName } from "../../auth/cookies/route"

export async function GET(req:any, res:any){
   const username = await getUserName()

   const {data} = supabase.storage.from('avatars').getPublicUrl(`${username}`)
   
   return NextResponse.json(data.publicUrl)
    
}

export async function POST(req:any, res:any){
    const {image} = await req.json()
    

}

