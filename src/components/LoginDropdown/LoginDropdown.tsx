import { useState } from 'react'
import IconButton from '../buttons/IconButton/IconButton'
import styles from './LoginDropdown.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { userSlice } from '@/store/slices/userSlice'
import { useRouter } from 'next/router'

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	})
	.required()

const LoginDropdown = () => {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const { email, token } = useSelector((state: RootState) => state.user)
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: { email: string; password: string }) => {
		setLoading(true)
		setErrorMessage('')

		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			const result = await response.json()

			if (response.ok) {
				dispatch(
					userSlice.actions.login({ email: data.email, token: result.token })
				)
				router.push('/profile')
			} else {
				setErrorMessage(result.message)
			}
		} catch (error) {
			setErrorMessage('Server error. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={styles.login}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<IconButton src='/icons/user.svg' alt='user' width={12} height={15} />

			{isOpen && (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.login__menu}>
					<h6 className={styles.login__title}>
						{email ? 'Log Out' : 'Log In'}
					</h6>
					{!email && (
						<>
							<label>
								<p className={styles.login__label}>Email</p>
								<input
									type='email'
									placeholder='Enter email'
									{...register('email')}
								/>
								<p className={styles.error}>{errors.email?.message}</p>
							</label>
							<label>
								<p className={styles.login__label}>Password</p>
								<input
									type='password'
									placeholder='Enter password'
									{...register('password')}
								/>
								<p className={styles.error}>{errors.password?.message}</p>
							</label>
						</>
					)}

					{errorMessage && <p className={styles.error}>{errorMessage}</p>}

					<button
						className={styles.login__btn}
						disabled={loading}
						onClick={
							token ? () => dispatch(userSlice.actions.logout()) : () => {}
						}
					>
						{loading ? 'Loading...' : token ? 'Logout' : 'Login'}
					</button>
				</form>
			)}
		</div>
	)
}

export default LoginDropdown
