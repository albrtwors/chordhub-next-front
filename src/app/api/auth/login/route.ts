import { NextResponse } from 'next/server';
import { supabase } from '../../../../../database/supabase/database';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../../jwt/jwt';
import { NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export async function POST(request:any, response:any) {
  try {
    const res:any = await request.formData()
    const {data, error } = await supabase.from('users').select('*').eq('email', res.get('email'))
 

    if(data?.length===0){
        return NextResponse.json({ state:'error',message: 'El usuario no existe'});
    }

    if(error){
        return NextResponse.json({ state:'error',message: 'Error de consulta'});
    }
    const passwdComparisonResult = bcrypt.compareSync(res.get('password'),data![0].password)

    if(!passwdComparisonResult){
        return NextResponse.json({ state:'error',message: 'Credenciales incorrectas'}); 
    }

    
    const cookieHandler = await cookies()
    // const token = await signToken({name:data[0].name, email:data[0].email, id: data[0].id})
    // cookieHandler.set('jwt', token, {maxAge:60*60*24*7, httpOnly:true, secure: process.env.NODE_ENV === 'production', path:'/'})
    cookieHandler.set('user-name', data[0].name, {maxAge:60*60*24*7, httpOnly:true, secure: process.env.NODE_ENV === 'production', path:'/'})
    cookieHandler.set('user-id', data[0].id, {maxAge:60*60*24*7, httpOnly:true, secure: process.env.NODE_ENV === 'production', path:'/'})
    
    
    return NextResponse.json({ message: 'Datos Correctos, iniciando sesión', state:'success'});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al procesar la petición' }, { status: 500 });
  }
}