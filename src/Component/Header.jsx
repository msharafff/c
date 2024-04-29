import { useContext } from "react";
import Logo from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import ModalContext from "../store/ModalContext";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const modalCtx = useContext(ModalContext);
  function handleShowCart() {
    modalCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="the app logo" />
        <h1>fast food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Count ({totalItems})
        </Button>
      </nav>
    </header>
  );
}
