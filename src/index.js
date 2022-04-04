import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    "pk_test_51KPWoHAEBB4Crcloj2BnmpGudRHh8oLwLvFGvphnSISWa0yMf6Q4TjXtEcy7Wq3sShKv2iFTTzbEOdzLmc6eBfzH00ufhSFYEw"
  );

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    styles: {
        global: {
            // styles for the `body`
            body: {
                fontFamily:  "'Roboto', sans-serif",
                fontWeight:400,
                color: "#1A1A1A",
            },
            // styles for the `a`
            a: {
                _hover: {
                },
            },
        },
    },
    colors: {
        blue:{
            500:'#0F0EA7'
        },
        // gray:{
        //     200:'#BCBCBC',
        // },
        brand: {
            100: "red",
            // ...
            900: "#1a202c",
        },
    },
    shadows:{
        outline:'none',
    }
})

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
      <ChakraProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();