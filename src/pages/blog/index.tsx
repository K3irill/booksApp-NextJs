import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import styles from './Blog.module.scss'

export default function BlogPage() {
	return (
		<MainLayout>
			<div className={styles.blog}>
				<div className={(styles.blog__container, 'container')}>
					<div className={styles.blog__content}>Blog</div>
				</div>
			</div>
		</MainLayout>
	)
}
