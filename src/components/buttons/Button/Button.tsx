import React from 'react'
import styles from './Button.module.scss'

import cn from 'classnames'

interface ButtonProps {
	action?: (e: any) => void
	className?: string
	children: string | React.ReactNode
	selected?: boolean
}

export default function Button({
	action,
	className,
	children,
	selected,
}: ButtonProps) {
	return (
		<button
			onClick={action}
			className={cn(
				styles.button,
				{ [styles['button--selected']]: selected },
				className
			)}
		>
			{children}
		</button>
	)
}
