import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "../../../../database/supabase/database";
import { getEmail, getUserName } from "../auth/cookies/route";

export async function GET(){
    const cookieStore = await cookies()
    return NextResponse.json({name:cookieStore.get('user-name')!.value!,email:cookieStore.get('user-id')!.value!, id:cookieStore.get('user-id')!.value!})
}

export async function PATCH(req:any, res:any){
    const form = await req.formData()
    const {data,error}: any = await supabase.from('users').update({name:form.name, email:form.email})
   
    const uploadRes = await uploadPfp(form.get('pfp'))
    
    return NextResponse.json({message:'Datos actualizados', state:'success'})
}

const uploadPfp = async (pfpFile: File) => {
 
  const userName = await getUserName()
  const fileName = `${userName}`;


  const { data, error } = await supabase.storage
    .from('avatars')
    .exists(fileName);


  if(data){
    supabase.storage.from('avatars').update(fileName, pfpFile, {upsert:true, contentType:'image',cacheControl: '3600',})
  }else{
    supabase.storage.from('avatars').upload(fileName, pfpFile, {upsert:true, contentType:'image',cacheControl: '3600',})
  }

  if (error) {
    console.error('Error uploading file:', error);
    return error;
  }
  return data;
};