import { useSelector } from 'react-redux';
import { selectPrice } from './../features/PriceSlice';
import { useEffect, useRef } from "react";

const Paypal = () => {
  const price = useSelector(selectPrice);
  const paypal = useRef();

  useEffect(() => {
    const myButton = window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "NETFLIX subscription",
              amount: {
                currency_code: "USD",
                value: price,
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order completed:', order);
      },
      onError: err => console.log(err)
    });

    if (paypal.current && !paypal.current.innerHTML) {
      myButton.render(paypal.current);
    }
    return () => {};
  }, [price]);

  return (
    <div ref={paypal}></div>
  );
}

export default Paypal;



