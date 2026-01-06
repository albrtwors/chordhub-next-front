import { NextResponse } from "next/server";
import { supabase } from "../../../../../../database/supabase/database";

export async function GET(req:any, res:any){
    const {data, error} = await supabase.from('files').select('*')

    if(error){
        return NextResponse.json({message:'hubo un error', state:'error'})
    }

    return NextResponse.json(data)

}