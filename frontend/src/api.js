import axios from 'axios'

// Option #1:

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API : ''

const customAxiosWithBaseUrl = axios.create({
    baseURL: baseURL
})

export default customAxiosWithBaseUrl