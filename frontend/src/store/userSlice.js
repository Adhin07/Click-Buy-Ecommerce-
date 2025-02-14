import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  cartProductCount:0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails:(state,action)=>{
      state.user =action.payload
    },
    setCartProductCount: (state, action) => {
      state.cartProductCount = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails ,setCartProductCount} = userSlice.actions

export default userSlice.reducer