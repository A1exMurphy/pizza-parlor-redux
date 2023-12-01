import { useState } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// we need to use local state for inputs at this point

function CustomerForm() {
    const cartContents = useSelector(store => store.cartContents)

     let totalPrice = cartContents.reduce((acc, currentPizza) => 
        acc + Number(currentPizza.price), 0)

  let [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    street_address: "",
    city: "",
    zip: "",
    type: "",
    total: totalPrice
  });

  const dispatch = useDispatch();

  const setDeliveryType = (event) => {
    if (event.target.value === "delivery"){
        setCustomerInfo({
            ...customerInfo,
            type: 'delivery'
        })
    } else {
        setCustomerInfo({
            ...customerInfo,
            type: 'pickup'
        })
  } console.log("Delivery or pickup:", customerInfo.type)
}

  const handleInputChange = (input, event) => {
    // gets customerInfo object, spreads it open,
    // and sets customer_name property equal to whatever
    // is typed in the input field
    setCustomerInfo({
        ...customerInfo,
        [input]: event.target.value
    })
  };

  const saveCustomerInfo = () => {
    console.log("Current customer: ", customerInfo)
    dispatch({
        type: "SAVE_CUSTOMER_INFO",
        payload: customerInfo,
  })
}

  return (
    <>
      <form>
        <input
          placeholder="Customer Name"
          onChange={() => {
            handleInputChange("customer_name", event);
          }}
          value={customerInfo.customer_name}
        ></input>
        <input
          placeholder="Street Address"
          onChange={() => {
            handleInputChange("street_address", event);
          }}
          value={customerInfo.street_address}
        ></input>
        <input
          placeholder="City"
          onChange={() => {
            handleInputChange("city", event);
          }}
          value={customerInfo.city}
        ></input>
        <input
          placeholder="ZIP code"
          onChange={() => {
            handleInputChange("zip", event);
          }}
          value={customerInfo.zip}
        >
          
        </input>
    {/* input names need to be the same on radio buttons */}
    <div onChange={setDeliveryType}>
        <input 
            type="radio" 
            value="delivery"
            name="method"
            required></input>
        <label htmlFor="delivery">Delivery</label>
        <input 
            type="radio" 
            value="pickup"
            name="method"
            required></input>
        <label htmlFor="pickup">For Pickup</label>
        </div>   
    <Router>
      <Link to="/checkout">
            <button 
            className="next"
            onClick={saveCustomerInfo}
            >NEXT</button>
          </Link>
          </Router>
      </form>
   
    </>
  );
}

export default CustomerForm;
