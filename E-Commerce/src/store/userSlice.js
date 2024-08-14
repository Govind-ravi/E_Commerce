import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const { password, ...userDetails } = action.payload; 
            state.user = userDetails;
          },
        removeUser: (state) => {
            state.user = null
        },
    },
})

export const {setUserDetails, removeUser } = userSlice.actions
export default userSlice.reducer