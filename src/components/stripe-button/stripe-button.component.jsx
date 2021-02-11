import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priveForStripe = price * 100
    const publishableKey = `pk_test_51HNMcCEUTrPaloDuVyF4Jj7kvD4m1oLpzN2cFoiiy53L5I7P3AdLrSMPgfkSUjkUxZzpBA3yIqAoYuHNxOrGQiAA00efLqeKi7`

    const onToken = token => {
        console.log(token)
        alert(`Payment successfull!`)
    }

    return (
        <StripeCheckout
            label='Pay now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priveForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton
