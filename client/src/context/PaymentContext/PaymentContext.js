import React, {useReducer} from "react";

const initialState = {
    data: null,
    loading: false,
    error: false
}


const reducer = (state, action) => {

    switch (action.type) {
        case "FETCH":
            return {...state, loading: true};
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case "FETCH_ERROR":
            return {...state, loading: false, error: true};
        default:
            throw new Error();

    }
}



const PaymentContext = React.createContext();
const PaymentContextConsumer = PaymentContext.Consumer;

const PatientContextProvider = props => {
    const [paymentContext, dispatchPayment] = useReducer(reducer, initialState);
    const value = {paymentContext, dispatchPayment};

    return (
        <PaymentContext.Provider value={value}>
            {props.children}
        </PaymentContext.Provider>
    );
};

export default PatientContextProvider;
export {PaymentContext, PaymentContextConsumer};
