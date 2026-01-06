import { NextResponse } from "next/server";
import { supabase } from "../../../../../database/supabase/database";
import { getUserId } from "../../auth/cookies/route";

export async function GET(req:any, res:any){
  const userId = await getUserId()
  const userRoles:any = await supabase.from('user_role').select('roles(id)').eq('user_id',  userId)
  const userRolArray: any = userRoles.data?.map((role:any)=>{return role.roles.id})

  const userPermissionBasedInRole = await supabase.from('permission_role').select('permissions(id)').in('role_id', userRolArray)
  const userPermissionBasedInRoleArray: any = userPermissionBasedInRole.data?.map((permission: any)=>{return permission.permissions.id})

  const userPurePermissions = await supabase.from('permission_user').select('permissions(id)').eq('user_id', 15)
  const userPurePermissionArray: any = userPurePermissions.data?.map((usper:any)=>{ return usper.permissions.id})


  const allUserPermissions: Array<any> = [...new Set([...userPermissionBasedInRoleArray, ...userPurePermissionArray])]
  const permissions:any = await supabase.from('permissions').select('name').in('id', allUserPermissions)
  const permissionArray: any = permissions.data?.map((per:any)=>{return per.name})
  return NextResponse.json({userPermissions:allUserPermissions, permissions:permissionArray})
}


export async function verifyPermission(userId: number, permisoNombre: string) {

  const userRoles:any = await supabase.from('user_role').select('roles(id)').eq('user_id',  userId)
  const userRolArray: any = userRoles.data?.map((role:any)=>{return role.roles.id})

  const userPermissionBasedInRole = await supabase.from('permission_role').select('permissions(id)').in('role_id', userRolArray)
  const userPermissionBasedInRoleArray: any = userPermissionBasedInRole.data?.map((permission: any)=>{return permission.permissions.id})

  const userPurePermissions = await supabase.from('permission_user').select('permissions(id)').eq('user_id', 15)
  const userPurePermissionArray: any = userPurePermissions.data?.map((usper:any)=>{ return usper.permissions.id})

  const desiredPermission: any = await supabase.from('permissions').select('id').eq('name', permisoNombre)
  const allUserPermissions: Array<any> = [...new Set([...userPermissionBasedInRoleArray, ...userPurePermissionArray])]

  if(allUserPermissions.includes(desiredPermission.data[0].id)){
    return true
  }else{
    return false
  }

 
}
