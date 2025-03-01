import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
	success?: boolean
	error?: boolean
	message?: string
	token?: string
}

const validateUser = (email: string, password: string) => {
	if (email === 'test@example.com' && password === 'password123') {
		return { success: true, token: 'fakeToken123' }
	}
	return { error: true, message: 'Email or password are incorrect' }
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ error: true, message: 'Only POST method is allowed' })
	}

	const { email, password } = req.body

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: true, message: 'Email and password are required' })
	}

	const result = validateUser(email, password)

	if (result.error) {
		return res.status(401).json(result)
	}

	return res.status(200).json(result)
}
