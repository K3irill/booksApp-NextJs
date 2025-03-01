import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	email: string | null
	token: string | null
}

const loadCartFromLocalStorage = (): UserState => {
	try {
		const storedUser = localStorage.getItem('user')
		return storedUser ? JSON.parse(storedUser) : { email: null, token: null }
	} catch (error) {
		console.error('Ошибка загрузки корзины:', error)
		return { email: null, token: null }
	}
}

const initialState: UserState = loadCartFromLocalStorage()

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action: PayloadAction<UserState>) {
			state.email = action.payload.email
			state.token = action.payload.token
			localStorage.setItem('user', JSON.stringify(state))
		},
		logout(state) {
			state.email = null
			state.token = null
			localStorage.removeItem('user')
		},
	},
})

export default userSlice.reducer
