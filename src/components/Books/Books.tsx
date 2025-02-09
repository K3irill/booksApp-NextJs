import { getBooks } from '@/store/services/google.services'
import { AppDispatch, RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookCard } from './BooksCard/BooksCard'
import styles from './Books.module.scss'
import Categories from '../Categories/Categories'
import {
	bookCategories,
	BookCategoryTitles,
} from '../Categories/bookCategories'
import Button from '../buttons/Button/Button'
import { SkeletonItem } from '../SkeletonItem/SkeletonItem'

export default function Books() {
	const dispatch = useDispatch<AppDispatch>()
	const [retry, setRetry] = useState(false)
	const { books, error, loading } = useSelector(
		(state: RootState) => state.books
	)
	const [activeCategory, setActiveCategory] = useState<BookCategoryTitles>(
		BookCategoryTitles.ARCHITECTURE
	)

	useEffect(() => {
		if (activeCategory) {
			dispatch(
				getBooks({ category: activeCategory, startIndex: 0, maxResults: 10 })
			)
		}
	}, [dispatch, retry, activeCategory])

	useEffect(() => {
		if (!loading || error) {
			setRetry(false)
		}
	}, [loading, error])

	useEffect(() => {
		if (books) console.log(books)
	}, [books])

	if (error)
		return (
			<div>
				<span>{error}</span>
				<Button action={() => setRetry(prev => !prev)}>Retry</Button>
			</div>
		)
	return (
		<div className={styles['content']}>
			<Categories
				items={bookCategories}
				activeCategory={activeCategory}
				onCategorySelect={setActiveCategory}
			/>
			{!loading ? (
				<div className={styles['books-wrapper']}>
					{books && books.length > 0 ? (
						books.map(book => <BookCard key={book.id} props={book} />)
					) : (
						<>
							<Button action={() => setRetry(true)}>Retry</Button>
						</>
					)}
				</div>
			) : (
				<div className={styles['books-wrapper']}>
					{Array.from({ length: 6 }).map((_, i) => (
						<SkeletonItem key={i} />
					))}
				</div>
			)}
		</div>
	)
}
