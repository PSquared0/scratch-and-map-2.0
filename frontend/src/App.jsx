import React, { Component } from "react";
import ParentNav from "./components/NavContainer/ParentNav";
import "./index.scss";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// react-stripe-elements is unmaintained/incompatible with React 18+.
// Replaced with the modern official Stripe SDK: loadStripe() returns a
// promise that is passed directly to <Elements stripe={...}>.
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder"
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    //grab FbAcessToken from local storage
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/fb/token`, {
        accessToken: window.localStorage.getItem("FbAccessToken")
      })
      .then(res => {
        if (window.localStorage.getItem("FbAccessToken")) {
          this.setState({ isLoggedIn: true });
        }
      });
  }
  render() {
    return (
      <div className="App">
        <Elements stripe={stripePromise}>
          <ParentNav />
        </Elements>
      </div>
    );
  }
}

export default App;
