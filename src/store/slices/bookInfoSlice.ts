import { BookItem } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBookById } from '../services/google.services'

interface BookInfoState {
	bookInfo: BookItem | null
	loading: boolean
	error: string | null
}

const initialState: BookInfoState = {
	bookInfo: null,
	loading: false,
	error: null,
}

export const bookInfoSlice = createSlice({
	name: 'bookInfo',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getBookById.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(
				getBookById.fulfilled,
				(state, action: PayloadAction<BookItem>) => {
					state.loading = false
					state.bookInfo = action.payload
				}
			)
			.addCase(getBookById.rejected, state => {
				state.loading = false
				state.error = 'Ошибка загрузки книги'
			})
	},
})

export default bookInfoSlice.reducer
