import React, { useReducer } from "react";

const initialState = null;

const reducer = (state, action) => {
    return action;
};

const PaymentContext = React.createContext();
const PaymentContextConsumer = PaymentContext.Consumer;

const PaymentContextProvider = props => {
    const [paymentContext, dispatchPayment] = useReducer(reducer, initialState);
    const value = { paymentContext, dispatchPayment };

    return (
        <PaymentContext.Provider value={value}>
            {props.children}
        </PaymentContext.Provider>
    );
};

export default PaymentContextProvider;
export { PaymentContext, PaymentContextConsumer };
