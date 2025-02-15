import Banner from '@/components/Banner/Banner'
import Books from '@/components/Books/Books'
import React from 'react'
import styles from './BooksPage.module.scss'
import MainLayout from '@/Layouts/MainLayout'
export default function BooksPage() {
	return (
		<MainLayout>
			<div className={styles.books}>
				<div className={(styles.books__container, 'container')}>
					<div className={styles.books__content}>
						<Banner />
						<Books />
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
