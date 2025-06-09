// src/hooks/useMarketplace.js

import { useReducer, useCallback } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

/**
 * useMarketplaceCart - hook managing the shopping cart state
 */
export function useMarketplaceCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = useCallback(
    (product) => dispatch({ type: "ADD_ITEM", payload: product }),
    []
  );
  const removeItem = useCallback(
    (product) => dispatch({ type: "REMOVE_ITEM", payload: product }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
  };
         }
  
