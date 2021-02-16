import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Button } from 'react-bootstrap'
import { FaStripeS } from 'react-icons/fa';
import axios from 'axios';


const Stripe = ({baseURL, request, currentUserData, setError}) => {
    const stripePromise = loadStripe('pk_test_51IJcCmDqXqMV98IIcKn53LMqLUGVLgSYKsZGWVked8QVfzYRye95mWra1cbG5NtEquWsj7Df5CsKYAPeW8X0Ljag0052QuXo9c');

    const lineItems = () => {

    }

    const checkPayment = () => {
        if (request.paid && currentUserData.userID === request.owner) {
            return(<div>Paid</div>)
        } else if (currentUserData.userID === request.owner) {
            return(<Button onClick={handleClick}><FaStripeS /></Button>)
        } else {
            return(<div></div>)
        }
    }

    const handleClick = async (event) => {
        event.preventDefault()
        const stripe = await stripePromise;
        const response = await fetch(baseURL + "/create-checkout-session", {
            method: "POST",
            body: JSON.stringify(request)
        });

        axios.put(baseURL + '/request-payment/' + request.request_id)

        const session = await response.json();
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            setError({
                variant: 'warning',
                message: result.error.message
            })
        }
    };

    return(             
        <div>
            {checkPayment()}
        </div>       
    )
}

export default Stripe;