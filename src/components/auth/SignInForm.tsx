"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import axios from 'axios'
import Alert from "@/utils/swalClass";
import Swal from "sweetalert2";
import { routeClient } from "../../../constants/defaultPathClient";
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState (false)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target)
   
    Alert.LoadingAlert()
    const response:any = await axios.post(`${routeClient()}/api/auth/login`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if(response.data.state =='error'){
      Alert.ErrorAlert('Hubo un error', response.data.message)
      return
    }

    Alert.SuccessAlert('Cargado Exitosamente', response.data.message)
    await new Promise((resolve)=>setTimeout(resolve, 1000))
    window.location.href = `${routeClient()}/chordhub`
    

  
    
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
     
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Inicia Sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu email y contraseña para iniciar sesión
            </p>
          </div>
          <div>
         
    
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input name="email" placeholder="info@gmail.com" type="email" />
                </div>
                <div>
                  <Label>
                    Contraseña<span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Recordar este usuario
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Inicia sesión
                  </Button>
                </div>
              </div>
              {loading && <p>CARGANDO...</p>}
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                No tienes una cuenta? | -
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
