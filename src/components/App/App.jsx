import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import Header from "../Header/Header";
import CustomerForm from "../CustomerForm/CustomerForm";
import PizzaItem from "../PizzaItem/PizzaItem";
import Checkout from "../Checkout/Checkout";
import Admin from "../Admin/Admin";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const menu = useSelector((store) => store.menu);

  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = () => {
    axios
      .get("/api/pizza")
      .then((response) => {
        dispatch({
          type: "GET_ALL_PIZZAS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Header />
      <Router>
        <Route exact path="/">
          {menu.map((pizza) => {
            return <PizzaItem key={pizza.id} pizza={pizza} />;
          })}
          <Link to="/customerinfo">
            <button className="next">NEXT</button>
          </Link>
        </Route>
        <Route exact path="/customerinfo">
          <CustomerForm />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Router>
    </div>
  );
}

export default App;
