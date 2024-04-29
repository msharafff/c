import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clear: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    if (cartItemIndex > -1) {
      const existingItem = state.items[cartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[cartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedItems = [...state.items];

    if (updatedItems[cartItemIndex].quantity === 1) {
      updatedItems.splice(cartItemIndex, 1);
    } else {
      const updatedItem = {
        ...updatedItems[cartItemIndex],
        quantity: updatedItems[cartItemIndex].quantity - 1,
      };

      updatedItems[cartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clear() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clear,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
