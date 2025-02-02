import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import styles from '../styles/Home.module.scss'
import Banner from '@/components/Banner/Banner'

export default function Home() {
	return (
		<MainLayout>
			<div className={styles.home}>
				<div className={(styles.home__container, 'container')}>
					<div className={styles.home__content}>
						<Banner />
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
