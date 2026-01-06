"use client"
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { routeClient } from "../../../../../constants/defaultPathClient";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { compareSync } from "bcryptjs";
import Alert from "@/utils/swalClass";



export default function Profile() {
 const [user,setUser]:any = useState(null)
  useEffect(()=>{
      axios.get(`${routeClient()}/api/profile/full-profile`).then(res=>{
        setUser(res.data)
      })
  },[])

  const handleSubmit = (e:any)=>{
      e.preventDefault()
      const formData = new FormData(e.target)

      axios.patch(`${routeClient()}/api/profile`, formData, {headers:{
        'Content-Type':'multipart/form-data'
      }}).then(res=>{
        if(res.data.state=='error'){
          Alert.ErrorAlert('Error', res.data.message)
          return
        }

        Alert.SuccessAlert('Exito', res.data.message)


      })



  }
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          {user && user.name}
        </h3>
      
        <form className="flex flex-col mt-5 gap-5" encType="multipart/form-data" onSubmit={handleSubmit} action="">
         
         <div>
            <Label>Nombre de usuario</Label>
            <Input name="name" defaultValue={user && user.name}></Input>
         </div>

        
         <div>
            <Label>Correo</Label>
            <Input name="email" defaultValue={user && user.email}></Input>
         </div>

          <div>
                  <Label>Foto de Perfil</Label>
                  <Input type="file" name="pfp"></Input>
   
          </div>

          <button className="bg-green-600 text-white rounded-lg py-3">Subir</button>
          
        </form>
      </div>
    </div>
  );
}
