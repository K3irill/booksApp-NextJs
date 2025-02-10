import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import Product from './components/Product'
import { useRouter } from 'next/router'

export default function ProductById() {
	const router = useRouter()

	return (
		<MainLayout>
			<Product path={router.asPath} />
		</MainLayout>
	)
}
