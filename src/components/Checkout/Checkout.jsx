import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {
    // dispatch customer info to order history
    
    const history = useHistory()
    const cartContents = useSelector(store => store.cartContents)
    const currentCustomer = useSelector(store => store.currentCustomer)
    const totalPrice = useSelector(store => store.totalPrice)

    let pizzasToSubmit = cartContents.map((pizza) => (
            {
                id: pizza.id,
                quantity: 1
            }
        )
    )

    let orderToSubmit = {
        ...currentCustomer,
        total: Number(totalPrice),
        pizzas: pizzasToSubmit
    }

    const submitOrder = () => {
        axios({
            method: 'POST',
            url: '/api/order',
            data: orderToSubmit
        })
        .then((response) => {
            alert('Order received!')
            history.push('/')
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    return (
        <div>
            <h2>Step 3: Checkout</h2>
            <p>{currentCustomer.customer_name}</p>
            <p>{currentCustomer.street_address}</p>
            <p>{currentCustomer.city}, {currentCustomer.zip}</p>
            <span>{currentCustomer.type.toUpperCase()}</span>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Cost</td>
                    </tr>
                </thead>
                <tbody>
                    {cartContents.map((pizza) => (
                            <tr key={pizza.id}>
                                <td>{pizza.name}</td>
                                <td>{pizza.price}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <p>TOTAL: {totalPrice}</p>
            <button onClick={submitOrder}>CHECKOUT</button>
        </div>
)}

export default Checkout;