import { getBooks } from '@/store/services/google.services'
import { AppDispatch, RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Books() {
	const dispatch = useDispatch<AppDispatch>()
	const [retry, setRetry] = useState(false)
	const { books, error, loading } = useSelector(
		(state: RootState) => state.books
	)

	useEffect(() => {
		dispatch(getBooks({ category: 'flowers', startIndex: 0, maxResults: 10 }))
	}, [dispatch, retry])

	useEffect(() => {
		if (!loading || error) {
			setRetry(false)
		}
	}, [loading, error])

	if (loading) return 'loading..............'
	if (error)
		return (
			<div>
				<span>{error}</span>
				<button onClick={() => setRetry(prev => !prev)}>you may retry</button>
			</div>
		)
	return (
		<div>
			{books && books.length > 0 ? (
				books.map(book => <div key={book.id}>{book.volumeInfo.title}</div>)
			) : (
				<>
					<button onClick={() => setRetry(true)}>you may retry</button>
				</>
			)}
		</div>
	)
}
