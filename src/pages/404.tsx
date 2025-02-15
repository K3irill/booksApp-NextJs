import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

export default function NOTFOUND() {
	return (
		<MainLayout>
			<div className={'not-found'}>
				<div className={cn('not-found', 'container')}>
					<div className={'not-found'}>
						<h2 style={{ fontSize: '64px', marginBottom: '20px' }}>
							404 PAGE NOT FOUND
						</h2>

						<p>
							Return <Link href={'/'}>HOME</Link>
						</p>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
