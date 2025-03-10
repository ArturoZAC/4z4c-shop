'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { setTransactionId } from "@/action";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round( amount * 100)) / 100;

  if ( isPending ) {
    return (
      <div className="animate-pulse mb-16 flex flex-col">
        <div className="h-[45px] bg-gray-300 rounded mb-[14px]"></div>
        <div className="h-[45px] bg-gray-300 rounded mb-[10px]"></div>
        <div className="h-[16px] bg-gray-300 rounded"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
  
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${ roundedAmount  }`,
          },
        },
      ],
    });

    // console.log({transactionId});
    const { ok } = await setTransactionId( orderId, transactionId );
    if ( !ok ) {
      throw new Error('No se pudo actualizar la orden')
    }

    return transactionId;
  };


  return (
    <PayPalButtons 
      createOrder={ createOrder }
      // onApprove={}
    />
  );


};
