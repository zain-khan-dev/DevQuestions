import { configureStore } from '@reduxjs/toolkit'
import ActorReducer from "./ActorSlice"
import MovieSlirce from './MovieSlirce'
import ProducerSlice from "./ProducerSlice"


export const store = configureStore({
  reducer: {
    actor: ActorReducer,
    producer: ProducerSlice,
    movie: MovieSlirce
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch