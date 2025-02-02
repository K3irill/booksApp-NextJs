import React from 'react'
import styles from './IconButton.module.scss'
import Image from 'next/image'

interface IconButtonProps {
	src: string
	alt: string
	width: number
	height: number
	action?: () => void
}

export default function IconButton({
	src,
	alt,
	width,
	height,
	action,
}: IconButtonProps) {
	return (
		<button onClick={action} className={styles.button}>
			<Image src={src} alt={alt} width={width} height={height} />
		</button>
	)
}
