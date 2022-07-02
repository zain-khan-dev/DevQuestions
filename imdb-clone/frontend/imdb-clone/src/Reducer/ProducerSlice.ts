import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./store"
import {User} from "../Constants/schema"


// Define a type for the slice state
interface UserState {
    users:User[]
}

// Define the initial state using that type
const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'producer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProducer: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addProducer :(state, action:PayloadAction<User>) => {
      state.users.push(action.payload)
    }
  },
})

export const { setProducer, addProducer } = userSlice.actions

export default userSlice.reducer