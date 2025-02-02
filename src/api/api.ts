import axios, { CreateAxiosDefaults } from 'axios'

const API_URL = 'https://www.googleapis.com/'

export const IS_CLIENT = typeof window === 'undefined'

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)
