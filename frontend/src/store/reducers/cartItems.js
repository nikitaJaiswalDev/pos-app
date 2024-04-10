import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    isPending: false,
    items: [],
  },
  reducers: {
    addCartItem(state, action) {
        const newItem = action.payload.item;
        if(newItem) {
          const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);
          if (existingItemIndex !== -1) {
              // If item already exists, update its quantity
              state.items[existingItemIndex].qtn += newItem.qtn;
              state.items[existingItemIndex].price += newItem.price;
          } else {
              // If item does not exist, push it into the state
              state.items.push(newItem);
          }
        } else {
          state.items = []
        }
    },
    updateQtn(state, action) {
      const {id, operation } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === id);
      const currentItem = state.items[existingItemIndex];
      
      if(operation == 'plus') { currentItem.qtn++ 
        currentItem.price += currentItem.original_price
      }
      else { 
        currentItem.qtn-- 
        currentItem.price -= currentItem.original_price
        if(currentItem.qtn === 0) {
          state.items = state.items.filter(item => item._id !== id)
        }
      }      
    },
    removeCartItem(state, action) {
      const itemToRemove = action.payload.item;
      state.items = state.items.filter(item => item._id !== itemToRemove._id); 
    },
  }
});

export default cart.reducer;
export const { addCartItem, removeCartItem, updateQtn } = cart.actions;
