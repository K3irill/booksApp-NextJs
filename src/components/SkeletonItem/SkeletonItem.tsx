import React from 'react'

import styles from './SkeletonItem.module.scss'

export const SkeletonItem = () => {
	return (
		<div className={styles.skeleton}>
			<div className={styles['skeleton__poster-wrapper']}></div>
			<div className={styles['skeleton__content']}>
				<div className={styles['skeleton__content-header']}>
					<p className={styles['skeleton__authors']}></p>
					<p className={styles['skeleton__title']}></p>
				</div>
				<p className={styles['skeleton__description']}></p>
				<p className={styles['skeleton__price']}></p>
				{/* <Button>Loading...</Button> */}
			</div>
		</div>
	)
}
