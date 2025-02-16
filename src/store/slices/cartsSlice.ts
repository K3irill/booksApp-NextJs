import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { BookItem } from '@/types/types'

type ProductItem = {
	shippingStatus: 'delivered' | 'pending' | 'shipped'
	count: number
}

export type MixedCartItem = ProductItem & (BookItem & { count: number })

export interface CartState {
	items: MixedCartItem[]
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
			const newItem = { ...action.payload, count: 1, shippingStatus: 'pending' }
			const existingItem = state.items.find(
				item => 'id' in item && item.id === newItem.id
			)

			if (!existingItem) {
				state.items.push(newItem)
			} else {
				state.items = state.items.filter(
					item => !('id' in item) || item.id !== newItem.id
				)
			}

			localStorage.setItem('cart', JSON.stringify(state))
		},
		incrementProductCount(state, action: PayloadAction<{ id: string }>) {
			const item = state.items.find(
				item => 'id' in item && item.id === action.payload.id
			)
			if (item) {
				item.count += 1
				localStorage.setItem('cart', JSON.stringify(state))
			}
		},
		decrementProductCount(state, action: PayloadAction<{ id: string }>) {
			const item = state.items.find(
				item => 'id' in item && item.id === action.payload.id
			)
			if (item && item.count > 1) {
				item.count -= 1
			} else {
				state.items = state.items.filter(i => i.id !== action.payload.id)
			}
			localStorage.setItem('cart', JSON.stringify(state))
		},
	},
})

export const selectTotalPrice = (state: RootState) =>
	state.cart.items.reduce((total, item) => {
		const price =
			'saleInfo' in item ? item.saleInfo.retailPrice?.amount ?? 0 : 0
		return total + price * item.count
	}, 0)

export default cartSlice.reducer
