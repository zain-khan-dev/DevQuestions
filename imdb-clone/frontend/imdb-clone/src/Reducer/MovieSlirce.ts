import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./store"
import {Movie} from "../Constants/schema"


// Define a type for the slice state
interface MovieState {
    movies:Movie[]
}

// Define the initial state using that type
const initialState: MovieState = {
  movies: [],
}

export const movieSlice = createSlice({
  name: 'movie',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMovie: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload
    },
    addMovie :(state, action:PayloadAction<Movie>) => {
      state.movies.push(action.payload)
    }
  },
})

export const { setMovie, addMovie } = movieSlice.actions

export default movieSlice.reducer