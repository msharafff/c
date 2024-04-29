import Header from "./Component/Header";
import Meals from "./Component/Meals";
import { CartContextProvider } from "./store/CartContext";
import { ModalContextProvider } from "./store/ModalContext";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
