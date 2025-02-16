import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import bookInfoReducer from './slices/bookInfoSlice'
import cartReducer from './slices/cartsSlice'
import userReducer from './slices/userSlice'
export const store = configureStore({
	reducer: {
		books: booksReducer,
		bookInfo: bookInfoReducer,
		cart: cartReducer,
		user: userReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
