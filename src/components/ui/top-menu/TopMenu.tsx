'use client';

import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5"

export const TopMenu = () => {

  const getTotalItems = useCartStore( state => state.getTotalItems());
  const openSideMenu = useUIStore(state => state.openSideMenu);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full ">
      <div>
        <Link
          href='/'
        >
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link href='/gender/men' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Hombres</Link>
        <Link href='/gender/women' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Mujeres</Link>
        <Link href='/gender/kid' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Niños</Link>
      </div>

      <div className="flex items-center">

        {/* <Link href='/search' className="mx-2">
          <IoSearchOutline className="w-5 h-5"/>
        </Link> */}

        <Link href={
          ( getTotalItems === 0) && loaded
           ? '/empty'
           : '/cart'
        } 
          className="mx-2">
          <div className="relative">

            {
              ( loaded && getTotalItems > 0 ) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  { getTotalItems }
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5"/>
          </div>
        </Link>

        <button
          onClick={ openSideMenu }
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>

      </div>


    </nav>
  )
}
