import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getBookById } from '@/store/services/google.services'

interface ProductProps {
	bookId?: string
}

export default function Product({ bookId }: ProductProps) {
	const { bookInfo, loading, error } = useSelector(
		(state: RootState) => state.bookInfo
	)
	const dispatch = useDispatch()

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
							<div>
								<img src={bookInfo?.volumeInfo.imageLinks?.thumbnail} alt='' />
							</div>
							<div>
								<h2>{bookInfo?.volumeInfo.title}</h2>
								<h2>{bookInfo?.volumeInfo.description}</h2>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
