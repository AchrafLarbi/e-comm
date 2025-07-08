import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { PAYPAL_CLIENT_ID } from "../constants/OrderConstants";

// Renders errors or successful transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PayPal({ orderId }) {
    const userInfo = useSelector((state) => state.userLogin.userInfo);

  const initialOptions = {
    "client-id":PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
              try {
                  const response = await fetch(`/api/orders/create-payment/${orderId}/`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${userInfo.token}`,
                      },
                  });
                  
                  const data = await response.json();
                  if (response.ok) {
                    alert("response",data)
                    return data.id; // Return the payment ID from the backend

                  } else {
                      throw new Error(data.error || 'Could not create PayPal payment');
                  }
              } catch (error) {
                  console.error(error);
                  setMessage(`Error: ${error.message}`);
                  return null;
              }
          }}
          onApprove={async (data) => {
              try {
                  const response = await fetch(`/api/orders/${orderId}/pay/paypal/`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${userInfo.token}`,
                      },
                      body: JSON.stringify({
                          paymentId: data.orderID,
                          PayerID: data.payerID,
                      }),
                  });

                  const result = await response.json();
                  if (response.ok) {
                      setMessage(`Payment successful: ${result.status}`);
                  } else {
                      throw new Error(result.error || 'Payment execution failed');
                  }
              } catch (error) {
                  console.error(error);
                  setMessage(`Error: ${error.message}`);
              }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PayPal;
