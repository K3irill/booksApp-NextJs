import React from 'react'
import styles from './Button.module.scss'

import cn from 'classnames'

interface ButtonProps {
	action?: () => void
	className?: string
	children: string | React.ReactNode
}

export default function Button({ action, className, children }: ButtonProps) {
	return (
		<button onClick={action} className={cn(styles.button, className)}>
			{children}
		</button>
	)
}
