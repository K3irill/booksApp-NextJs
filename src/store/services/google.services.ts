import { BookItem, GoogleApiBooks } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/api'
type FetchBooksParams = {
	category: string
	startIndex: number
	maxResults: number
}

const KEY = process.env.NEXT_PUBLIC_API_KEY

export const getBooks = createAsyncThunk<
	BookItem[],
	FetchBooksParams,
	{ rejectValue: string }
>(
	'books/getBooks',
	async ({ category, startIndex, maxResults }, { rejectWithValue }) => {
		try {
			const response = await instance.get<GoogleApiBooks>(
				`books/v1/volumes?q="subject:${category.trim()}"&key=${KEY}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`
			)
			return response.data.items || []
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
			return rejectWithValue('Не удалось загрузить книги')
		}
	}
)
