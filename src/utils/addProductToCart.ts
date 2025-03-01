import { cartSlice } from '@/store/slices/cartsSlice'
import { AppDispatch } from '@/store/store'
import { BookItem } from '@/types/types'

export const addProductToCart = (
	e: React.MouseEvent<HTMLButtonElement>,
	props: BookItem | null,
	dispatch: AppDispatch
) => {
	e.stopPropagation()
	if (props) {
		dispatch(cartSlice.actions.toggleItemToCart(props))
	}
}
