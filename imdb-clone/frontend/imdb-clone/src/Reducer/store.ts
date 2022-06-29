import { configureStore } from '@reduxjs/toolkit'
import ActorReducer from "./ActorSlice"
import ProducerSlice from "./ProducerSlice"


export const store = configureStore({
  reducer: {
    actor: ActorReducer,
    producer: ProducerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch