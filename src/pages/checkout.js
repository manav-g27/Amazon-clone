import React from "react";
import Header from "../components/header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/checkoutproduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal)
  const { data: session } = useSession();

  const createCheckoutSession = async()=>
  {
    const stripe = await stripePromise;
    //call the backend to create checkout session    
      const checkoutSession = await axios.post('./api/create-checkout-session',{items:items,email:session.user.email})
    //redirect user to checkout
    const result = await stripe.redirectToCheckout({sessionId:checkoutSession.data.id})
    if(result.error)
    {
      alert(result.error.message);
    }
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="ls:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct key={i} {...item} />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold"> ${total}</span>
              </h2>
              <button
              onClick={createCheckoutSession}
                role="link"
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 cursor-not-allowed text-gray-300"
                }`}
                disabled={!session}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
