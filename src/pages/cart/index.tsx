import React from 'react'
import styles from './CartPage.module.scss'
import MainLayout from '@/Layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import ProductCounter from '@/components/ProductCounter/ProductCounter'
import { MixedCartItem, selectTotalPrice } from '@/store/slices/cartsSlice'
import Button from '@/components/buttons/Button/Button'
import { addProductToCart as deleteProductFromCart } from '@/utils/addProductToCart'

export default function CartPage() {
	const { items } = useSelector((state: RootState) => state.cart)
	const totalPrice = useSelector(selectTotalPrice)
	const dispatch = useDispatch<AppDispatch>()
	const tablesHeaders = [
		{ name: 'ITEM', key: 'Item' },
		{ name: 'QUANTITY', key: 'quantity' },
		{ name: 'PRICE', key: 'price' },
		{ name: 'DELIVERY', key: 'delivery' },
	]

	return (
		<MainLayout>
			<div className={`${styles.cart} container`}>
				<div className={styles.cart__content}>
					{items.length > 0 ? (
						<>
							<table className={styles.cart__table}>
								<thead>
									<tr>
										{tablesHeaders.map(header => (
											<th key={header.key}>{header.name}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{items.map((item: MixedCartItem) => (
										<tr
											style={{
												boxShadow: !item.saleInfo.retailPrice?.amount
													? '0px 0px 10px #ff0000b5'
													: 'none',
											}}
											key={item.id}
										>
											<td>
												<div className={styles.cart__item}>
													<div className={styles.cart__img}>
														<img
															src={item.volumeInfo.imageLinks?.thumbnail}
															alt={item.volumeInfo.title}
														/>
													</div>
													<div className={styles['cart__item-content']}>
														<h3>{item.volumeInfo.title}</h3>
														<p>{item.volumeInfo.authors?.join(', ')}</p>
													</div>
												</div>
											</td>
											<td>
												{item.saleInfo.retailPrice?.amount ? (
													<ProductCounter
														id={item.id}
														productCount={item.count}
													/>
												) : (
													<button
														onClick={event =>
															deleteProductFromCart(event, item, dispatch)
														}
													>
														{'DELETE'}
													</button>
												)}
											</td>
											<td>{item.saleInfo.retailPrice?.amount ?? 'N/A'}</td>
											<td>
												Shipping:{' '}
												{item.saleInfo.retailPrice?.amount
													? item.shippingStatus
													: 'OUT OF STORE'}
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<div className={styles.cart__total}>
								<h2>TOTAL PRICE: ${totalPrice.toFixed(2)}</h2>
								<Button>CHECKOUT</Button>
							</div>
						</>
					) : (
						<h2 className={styles.cart__empty}>Товаров в корзине нет.</h2>
					)}
				</div>
			</div>
		</MainLayout>
	)
}
