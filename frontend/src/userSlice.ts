import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        firstName: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId
            state.firstName = action.payload.firstName
        }
    }
})

export const {setUser} = userSlice.actions;
export const userReducer =  userSlice.reducer;