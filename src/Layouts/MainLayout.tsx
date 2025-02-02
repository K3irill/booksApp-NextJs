import React from 'react'
import Header from '../components/Header/Header'
interface MainLayoutProps {
	children: React.ReactNode | string
}
export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}
