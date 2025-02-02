import React from 'react'
import styles from './Banner.module.scss'
import MySwiper from '../Swiper/Swiper'

export default function Banner() {
	return (
		<div className={styles.banner}>
			<MySwiper />
		</div>
	)
}
