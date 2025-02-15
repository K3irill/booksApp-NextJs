import React from 'react'
import { BookItem } from '@/types/types'
import styles from './BooksCard.module.scss'
import Button from '@/components/buttons/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { cartSlice } from '@/store/slices/cartsSlice'
import { useRouter } from 'next/router'

interface BookCardProps {
	props: BookItem
}

export const BookCard: React.FC<BookCardProps> = ({ props }) => {
	const isSelected = useSelector((state: RootState) =>
		state.cart.items.some(item => item.id === props.id)
	)
	const dispatch = useDispatch<AppDispatch>()
	const { items } = useSelector((state: RootState) => state.cart)
	const router = useRouter()

	const createBookPath = (id: string) => id.split(' ').join('-')

	const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		if (props) {
			dispatch(cartSlice.actions.toggleItemToCart(props))
			console.log('Added to cart', items)
		}
	}

	const handleCardClick = () => {
		router.push(`/products/${createBookPath(props.id)}`)
	}

	return (
		<div className={styles.card} onClick={handleCardClick}>
			<div className={styles['card__poster-wrapper']}>
				<img
					src={
						props.volumeInfo.imageLinks?.thumbnail ||
						'https://d1lp72kdku3ux1.cloudfront.net/title_instance/e60/small/2405134.jpg'
					}
					alt={props.volumeInfo.title || 'not found'}
				/>
			</div>
			<div className={styles['card__content']}>
				<div className={styles['card__content-header']}>
					<p className={styles['card__authors']}>
						<span>{props.volumeInfo.authors?.join(', ')}</span>
					</p>
					<p className={styles['card__title']}>{props.volumeInfo.title}</p>
					{props.volumeInfo.averageRating && (
						<div className={styles['card__rates-container']}>
							<div className={styles['card__rates-stars']}>
								<div
									style={{
										width: `${(props.volumeInfo.averageRating / 5) * 100}%`,
									}}
									className={styles['card__fill-stars']}
								></div>
							</div>
						</div>
					)}
				</div>
				<p className={styles['card__description']}>
					{props.volumeInfo.description}
				</p>
				<p className={styles['card__price']}>
					{props.saleInfo.retailPrice?.amount || props.saleInfo.saleability}
				</p>

				<Button action={handleAddToCart} selected={isSelected}>
					{isSelected ? 'IN THE CART' : 'BUY NOW'}
				</Button>
			</div>
		</div>
	)
}
