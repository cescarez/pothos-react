import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Button } from 'react-bootstrap'
import { FaStripeS } from 'react-icons/fa';
import axios from 'axios';


const Stripe = ({baseURL, request, currentUserData}) => {
    const stripePromise = loadStripe('pk_test_51IJcCmDqXqMV98IIcKn53LMqLUGVLgSYKsZGWVked8QVfzYRye95mWra1cbG5NtEquWsj7Df5CsKYAPeW8X0Ljag0052QuXo9c');

    const handleClick = async (event) => {
        event.preventDefault()
        const stripe = await stripePromise;
        const response = await fetch(baseURL + "/create-checkout-session", {
            method: "POST",
            // body: JSON.stringify()
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
            {request.paid? <div>Paid</div> :
            currentUserData.userID === request.owner &&
            <Button onClick={handleClick}><FaStripeS /></Button>}
        </div>       
    )
}

export default Stripe;