import { useState } from 'react'
import IconButton from '../buttons/IconButton/IconButton'
import styles from './LoginDropdown.module.scss'
const LoginDropdown = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			className={styles.login}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<IconButton src='/icons/user.svg' alt='user' width={12} height={15} />

			{isOpen && (
				<div className={styles.login__menu}>
					<h6>Log In</h6>
					<label>
						<p>Email</p>
						<input type='email' />
					</label>
					<label>
						<p>Password</p>
						<input type='password' />
					</label>
					<button>Login</button>
				</div>
			)}
		</div>
	)
}

export default LoginDropdown
