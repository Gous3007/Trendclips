const axios = require("axios");

const BASE_URL =
    process.env.CASHFREE_MODE === "production"
        ? process.env.CASHFREE_PROD_URL
        : process.env.CASHFREE_SANDBOX_URL;

exports.createCashfreeOrder = async ({ orderId, amount, customer }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/orders`,
            {
                order_id: orderId,
                order_amount: amount,
                order_currency: "INR",

                customer_details: {
                    customer_id: customer.id,
                    customer_phone: customer.phone,
                    customer_email: customer.email
                },

                order_meta: {
                    return_url: `${process.env.FRONTEND_URL}/payment/success?order_id=${orderId}`
                }
            },
            {
                headers: {
                    "x-client-id":
                        process.env.CASHFREE_MODE === "production"
                            ? process.env.CASHFREE_PROD_APP_ID
                            : process.env.CASHFREE_SANDBOX_APP_ID,

                    "x-client-secret":
                        process.env.CASHFREE_MODE === "production"
                            ? process.env.CASHFREE_PROD_SECRET_KEY
                            : process.env.CASHFREE_SANDBOX_SECRET_KEY,

                    "x-api-version": "2023-08-01",
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Cashfree Error ❌",
            error.response?.data || error.message
        );
        throw error;
    }
};
