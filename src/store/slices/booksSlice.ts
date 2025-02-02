import { BookItem } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBooks } from '../services/google.services'

interface BooksState {
	books: BookItem[]
	loading: boolean
	error: string | null
}

const initialState: BooksState = {
	books: [],
	loading: false,
	error: null,
}

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getBooks.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				getBooks.fulfilled,
				(state, action: PayloadAction<BookItem[]>) => {
					state.loading = false
					state.books = action.payload
				}
			)
			.addCase(getBooks.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.payload ||
					action.error.message ||
					'Произошла ошибка при загрузке книг'
			})
	},
})

export default booksSlice.reducer
