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
	const { email } = useSelector((state: RootState) => state.user)
	const [isOpen, setIsOpen] = useState(false)
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = data => {
		if (email) {
			dispatch(userSlice.actions.logout())
		} else {
			dispatch(userSlice.actions.login({ email: data.email }))
			router.push('/profile')
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
								<p
									style={{
										color: 'red',
										fontSize: '10px',
										justifySelf: 'start',
									}}
								>
									{errors.email?.message}
								</p>
							</label>
							<label>
								<p className={styles.login__label}>Password</p>
								<input
									type='password'
									placeholder='Enter password'
									{...register('password')}
								/>
								<p
									style={{
										color: 'red',
										fontSize: '10px',
										justifySelf: 'start',
									}}
								>
									{errors.password?.message}
								</p>
							</label>
						</>
					)}

					<button className={styles.login__btn}>
						{email ? 'Logout' : 'Login'}
					</button>
				</form>
			)}
		</div>
	)
}

export default LoginDropdown
