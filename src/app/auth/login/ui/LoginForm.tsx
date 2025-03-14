'use client';
import { authenticate } from "@/action";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {

  const [ state, dispatch ] = useActionState( authenticate, undefined );
  // const router = useRouter();
  const searchParams = useSearchParams(); // Obtén los query parameters

  // Obtén el valor de `redirectTo` desde la URL
  const redirectTo = searchParams.get("redirectTo") || "/";



  useEffect(() => {
    if( state === 'Success') {
      // router.replace('/')
      window.location.replace(redirectTo)
    }
  }, [ state , redirectTo ]);
  

  return (
    <form action={ dispatch } className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email" 
        name="email"
        />
        
      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" 
        name="password"
        />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {
          state === "CredentialsSignin" && (
            <div className="flex flex-row mb-2 mx-auto">
              <IoInformationOutline className="h-5 w-5 text-red-500"/>
              <p className="text-sm text-red-500">Credenciales no son correctas</p>
            </div>
          )
        }
      </div>
    
      <LoginButton />
      {/* <button
        type="submit"
        className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
};

function LoginButton() {

  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={
        clsx(
          pending ? "btn-disabled" : "btn-primary"
        )
      }
      disabled={pending}
    >
      Ingresar
    </button>
  )
}