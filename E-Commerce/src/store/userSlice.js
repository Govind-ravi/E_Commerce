import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        },
    },
})

export const {setUserDetails, removeUser } = userSlice.actions
export default userSlice.reducer