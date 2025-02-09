import React from 'react'
import { BookItem } from '@/types/types'
import cn from 'classnames'
import styles from './BooksCard.module.scss'
import Button from '@/components/buttons/Button/Button'

interface BookCardProps {
	props: BookItem
}
export const BookCard: React.FC<BookCardProps> = ({ props }) => {
	return (
		<div data-id={props.id} className={styles.card}>
			<div className={styles['card__poster-wrapper']}>
				<img
					src={props.volumeInfo.imageLinks?.thumbnail || 'default.src'}
					alt={props.volumeInfo.title || 'not found'}
				/>
			</div>
			<div className={styles['card__content']}>
				<div className={styles['card__content-header']}>
					<p className={styles['card__authors']}>
						<span>
							{props.volumeInfo.authors?.map(author => author).join(', ')}
						</span>
					</p>
					<p className={styles['card__title']}>{props.volumeInfo.title}</p>
					{props.volumeInfo.averageRating && (
						<div className={styles['card__rates-container']}>
							<div className={styles['card__rates-stars']}>
								<div
									style={{ width: `${props.volumeInfo.averageRating / 5}` }}
									className={styles['card__fill-stars']}
								></div>
							</div>
						</div>
					)}
				</div>
				<p className={styles['card__description']}>
					{props.volumeInfo.description}
				</p>
				{props.saleInfo.retailPrice ? (
					<p className={styles['card__price']}>
						{props.saleInfo.retailPrice?.amount}
					</p>
				) : (
					<p className={styles['card__price']}>{props.saleInfo.saleability}</p>
				)}

				<Button>BUY NOW</Button>
			</div>
		</div>
	)
}
