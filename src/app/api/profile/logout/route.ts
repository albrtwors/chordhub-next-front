import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:any, res:any){
    const cookieStore = await cookies()
    cookieStore.delete('user-id')
    cookieStore.delete('user-name')
    return NextResponse.json({message:'logout exitoso', state:'success'})


}