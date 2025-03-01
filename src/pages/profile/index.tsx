import React from 'react'
import styles from './ProfilePage.module.scss'
import MainLayout from '@/Layouts/MainLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
export default function ProfilePage() {
	const { email } = useSelector((state: RootState) => state.user)
	return (
		<MainLayout>
			<div className={styles.profile}>
				<div className={(styles.profile__container, 'container')}>
					<div className={styles.profile__content}>
						<h2 className={styles.profile__title}>User profile</h2>
						<p className={styles.profile__email}>
							{email ? email : 'You are not authorized'}
						</p>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
