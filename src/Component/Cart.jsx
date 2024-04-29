import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/Formatting";
import ModalContext from "../store/ModalContext";
import Button from "../UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const modalCtx = useContext(ModalContext);
  function handleCloseModal() {
    modalCtx.hideCart();
  }

  function handleCheckout() {
    modalCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={modalCtx.progress === "cart"}
      onClose={modalCtx.progress === "cart" ? handleCloseModal : null}
    >
      <h2>your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-action">
        <Button textOnly onClick={handleCloseModal}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
