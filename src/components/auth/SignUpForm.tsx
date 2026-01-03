"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputFieldOL";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import * as z from 'zod'
import Link from "next/link";
import React, { useState } from "react";
import PasswordInput from "../form/input/PasswordInput";
import Alert from "@/utils/swalClass";
import axios from "axios";
import { signData } from "../../../schemas/auth/signSchema";
import { routeClient } from "../../../constants/defaultPathClient";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
    const handleSubmit = async (e: any) => {
      e.preventDefault();
  
      const formData = new FormData(e.target)
      const objectForm:any = Object.fromEntries(formData.entries());

      try{
        signData.parse(objectForm)
      }catch(e){
        Alert.ErrorAlert('Error', 'Uno de los Datos Incumple el formato')
        return
      }
      


      Alert.LoadingAlert()
      const response:any = await axios.post(`${routeClient()}/api/auth/sign`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     
  
      if(response.data.state === 'error'){
        Alert.ErrorAlert('Error', response.data.message)
        return
      }
      
      Alert.SuccessAlert('Cargado Exitosamente', response.data.message)



      
  
    
      
    };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
    
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Regístrate
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tus datos para comenzar a usar Chordhub
            </p>
          </div>
          <div>
      
         
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- username --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Nombre de usuario<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      zodPattern={ z.string().min(7)
                      .max(12)
                      .regex(/^[A-Za-z]/)}
                      name="name"
                      hint="El nombre de usuario solo admite carácteres alfanuméricos y debe tener de 7-12 caracteres"
                      id="name"
                      placeholder="Introduce nombre de usuario"
                    />
                  </div>
             
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    hint="Debes introducir una direccion de correo válida"
                    zodPattern={z.email()}
                    placeholder="Introduce tu email"
                  />
                </div>
               <PasswordInput/>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Creando esta cuenta aceptas los siguientes {" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Términos y condiciones,
                    </span>{" "}
                    y nuestras{" "}
                    <span className="text-gray-800 dark:text-white">
                      políticas de privacidad
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Regístrate
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Ya tienes una cuenta?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
