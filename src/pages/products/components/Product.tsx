import React from 'react'
import styles from './Product.module.scss'

interface ProductProps {
	path: string
}

export default function Product({ path }: ProductProps) {
	return (
		<div className={styles.product}>
			<div className={(styles.product__container, 'container')}>
				<div className={styles.product__content}>{path}</div>
			</div>
		</div>
	)
}
