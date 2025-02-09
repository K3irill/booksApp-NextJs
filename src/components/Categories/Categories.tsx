import React from 'react'
import styles from './Categories.module.scss'
import cn from 'classnames'
import { BookCategoryTitles } from '../Categories/bookCategories'

type CategoryItem = {
	id: number
	title: string
	path: string
}

interface CategoriesProps {
	items: CategoryItem[]
	activeCategory: BookCategoryTitles
	onCategorySelect: (category: BookCategoryTitles) => void
}

export default function Categories({
	items,
	activeCategory,
	onCategorySelect,
}: CategoriesProps) {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['categories']}>
				{items.map(item => {
					const isActive = activeCategory === item.title

					return (
						<button
							key={item.id}
							className={cn(styles['categories__item'], {
								[styles['categories__item--active']]: isActive,
							})}
							onClick={() => onCategorySelect(item.title as BookCategoryTitles)}
						>
							{item.title}
						</button>
					)
				})}
			</div>
		</div>
	)
}
