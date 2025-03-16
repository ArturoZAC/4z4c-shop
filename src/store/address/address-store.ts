import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  }


  //*Methods
  setAddress: (address: State['address']) => void;
  clearAddress: () => void;

}

export const useAddressStore = create<State>()(

  persist(
    (set, _) => ({
      //*
      address: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        phone: ""
      },
      setAddress: (address: State['address']) => {
        set({ address: address })
      },
      clearAddress: () => {
        set({ address: {
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          postalCode: "",
          city: "",
          country: "",
          phone: ""
        } })
      }
      //*
    }),
    //*Inicio del store en local storage
    {
      name: 'address-store'
    }
  )

)