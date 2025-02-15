import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import Product from './components/Product'
import { useRouter } from 'next/router'

export default function ProductById() {
	const router = useRouter()
	const { query, isReady } = router

	if (!isReady || !query.id) {
		return <p>loading...</p>
	}

	const bookId = Array.isArray(query.id) ? query.id[0] : query.id

	return (
		<MainLayout>
			<Product bookId={bookId} />
		</MainLayout>
	)
}
