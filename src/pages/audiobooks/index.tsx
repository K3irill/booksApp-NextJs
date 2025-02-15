import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import styles from './AudioBooks.module.scss'

export default function AudioBooksPage() {
	return (
		<MainLayout>
			<div className={styles.audiobooks}>
				<div className={(styles.audiobooks__container, 'container')}>
					<div className={styles.audiobooks__content}>audiobooks</div>
				</div>
			</div>
		</MainLayout>
	)
}
