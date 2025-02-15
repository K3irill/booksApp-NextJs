import React from 'react'
import styles from './CartPage.module.scss'
import MainLayout from '@/Layouts/MainLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
export default function CartPage() {
	const { items } = useSelector((state: RootState) => state.cart)
	return (
		<MainLayout>
			<div className={styles.cart}>
				<div className={(styles.cart__container, 'container')}>
					<div className={styles.cart__content}>cart</div>
				</div>
			</div>
		</MainLayout>
	)
}
