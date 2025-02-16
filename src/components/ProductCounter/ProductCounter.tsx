import React from 'react'
import styles from './ProductCounter.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { cartSlice } from '@/store/slices/cartsSlice'

interface ProductCounterProps {
	id: string
	productCount: number
}
const ProductCounter = ({ id, productCount }: ProductCounterProps) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className={styles.counter}>
			<button
				onClick={() =>
					dispatch(cartSlice.actions.decrementProductCount({ id }))
				}
				className={styles.counter__minus}
			>
				{'-'}
			</button>
			<div className={styles.counter__count}>{productCount}</div>
			<button
				onClick={() =>
					dispatch(cartSlice.actions.incrementProductCount({ id }))
				}
				className={styles.counter__plus}
			>
				{'+'}
			</button>
		</div>
	)
}

export default ProductCounter
