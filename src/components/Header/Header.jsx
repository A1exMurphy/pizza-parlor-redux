import { useSelector, useDispatch } from "react-redux";

function Header() {

  const cartContents = useSelector((store) => store.cartContents);
  const dispatch = useDispatch();

  let totalPrice = 0;

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // .reduce will loop through each object in our cartContents array and for the price
  // property it will add that value to our accumulator, which starts at 0
  if (cartContents.length > 0) {
    totalPrice = cartContents.reduce(
      (acc, currentPizza) => acc + Number(currentPizza.price),
      0
    );
    dispatch({
      type: "UPDATE_PRICE",
      payload: totalPrice,
    });
  }

  return (
    <header className="App-header">
      <h1 className="App-title">Prime Pizza</h1>
      <h3>Total Price: {formatCurrency.format(totalPrice)}</h3>
    </header>
  );
}

export default Header;
