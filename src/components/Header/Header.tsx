import React, { useState } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'

import Link from 'next/link'
import { useRouter } from 'next/router'
import IconButton from '../buttons/IconButton/IconButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import LoginDropdown from '../LoginDropdown/LoginDropdown'

export default function Header() {
	const router = useRouter()
	const pathname = router.pathname
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { items } = useSelector((state: RootState) => state.cart)
	const navContent = [
		{ id: 0, title: 'Books', path: '/books' },
		{ id: 1, title: 'Audiobooks', path: '/audiobooks' },
		{ id: 2, title: 'Stationery & gifts', path: '/stationery-gifts' },
		{ id: 3, title: 'Blog', path: '/blog' },
	]

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className={styles.header}>
			<div className={cn(styles.header__container, 'container')}>
				<div className={cn(styles.header__content)}>
					<div className={cn(styles.header__logo)}>Bookshop</div>

					<nav
						className={cn(styles.header__nav, {
							[styles['header__nav--open']]: isMenuOpen,
						})}
					>
						<ul className={cn(styles['header__nav-list'])}>
							{navContent.map(item => (
								<li key={item.id} className={cn(styles['header__nav-item'])}>
									<Link
										href={item.path}
										className={cn(styles['header__nav-link'], {
											[styles['header__nav-link--active']]:
												pathname === item.path,
										})}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className={cn(styles['header__activity'])}>
						<LoginDropdown />
						<Link href={'/cart'} className={cn(styles['header__cart'])}>
							<IconButton
								src='/icons/bag.svg'
								alt='bag'
								width={12}
								height={15}
							/>
							<div className={cn(styles['header__goods-count'])}>
								<span>{items.length}</span>
							</div>
						</Link>
					</div>

					<div
						className={cn(styles['header__burger'], {
							[styles['header__burger--open']]: isMenuOpen,
						})}
						onClick={toggleMenu}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</header>
	)
}
