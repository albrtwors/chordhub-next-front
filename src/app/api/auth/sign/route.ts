import { NextResponse } from 'next/server';
import { supabase } from '../../../../../database/supabase/database';
import { signData } from '../../../../../schemas/auth/signSchema';
import bcrypt from 'bcryptjs'

export async function POST(request: any) {
  try {
    const res = await request.formData()

    //checking credentials
    const credentials:any = {name:res.get('name'), password:res.get('password'), email:res.get('email')} 
    signData.parse(credentials)
    
    //hash pass
    const newPass = bcrypt.hashSync(credentials.password)

    //querying data
    const {data, error } = await supabase.from('users').insert({name:res.get('name'), email:res.get('email'), password:newPass, state:0})
    if(error){
        return NextResponse.json({ state:'error',message: 'El nombre de usuario o email ya están tomados, intenta con otro'});
    }


    return NextResponse.json({ message: 'Datos Correctos, Registrado exitosamente', state:'success'});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error de datos' , state:'error', message:'Verifica los datos que estas enviando'});
  }
}