import { BookItem } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
	items: BookItem[]
}

const loadCartFromLocalStorage = (): CartState => {
	try {
		const storedCart = localStorage.getItem('cart')
		return storedCart ? JSON.parse(storedCart) : { items: [] }
	} catch (error) {
		console.error('Ошибка загрузки корзины:', error)
		return { items: [] }
	}
}

const initialState: CartState = loadCartFromLocalStorage()

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleItemToCart(state, action: PayloadAction<BookItem>) {
			const newItem = action.payload
			const existingItem = state.items.find(item => item.id === newItem.id)
			if (!existingItem) {
				state.items.push(newItem)
			} else {
				state.items = state.items.filter(item => item.id !== newItem.id)
			}
			localStorage.setItem('cart', JSON.stringify(state))
		},
	},
})

export default cartSlice.reducer
