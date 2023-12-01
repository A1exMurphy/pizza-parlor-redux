import { useDispatch } from 'react-redux';
import { useState } from 'react';

function PizzaItem({pizza}){

    const [isInCart, setIsInCart] = useState(false);
    
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: pizza
        });
       setIsInCart(!isInCart);
    }

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: pizza.id
        });
        setIsInCart(!isInCart);
    }

    return <div className="pizza-item">
        <img src={pizza.image_path}></img><br></br>
        {pizza.name}<br></br>
        {pizza.description}<br></br>
        {pizza.price}
        {isInCart ? <button onClick={removeFromCart}>REMOVE</button> :
        <button onClick={addToCart}>ADD</button>}
    </div>
}
export default PizzaItem;