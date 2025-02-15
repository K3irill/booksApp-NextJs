import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getBookById } from '@/store/services/google.services'
import Button from '@/components/buttons/Button/Button'
import { addProductToCart } from '@/utils/addProductToCart'

interface ProductProps {
	bookId?: number
}

export default function Product({ bookId }: ProductProps) {
	const { bookInfo, loading, error } = useSelector(
		(state: RootState) => state.bookInfo
	)

	const isSelected = useSelector((state: RootState) =>
		state.cart.items.some(item => item.id === bookInfo?.id)
	)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (bookId) {
			dispatch(getBookById({ bookId: bookId }))
		}
	}, [])

	if (error) return <h2>{error}</h2>
	return (
		<div className={styles.product}>
			<div className={(styles.product__container, 'container')}>
				<div className={styles.product__content}>
					{loading ? (
						<>Loading....</>
					) : (
						<>
							<div className={styles.product__img}>
								<img src={bookInfo?.volumeInfo.imageLinks?.thumbnail} alt='' />
							</div>
							<div className={styles.product__info}>
								<h2>{bookInfo?.volumeInfo.title}</h2>
								<h3>{bookInfo?.volumeInfo.description}</h3>
								<Button
									action={event => addProductToCart(event, bookInfo, dispatch)}
									selected={isSelected}
								>
									{isSelected ? 'IN THE CART' : 'BUY NOW'}
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
