import Axios from 'axios'

export const httpService = Axios.create({
    withCredentials: true,
})

// Add response interceptor to handle expired users
httpService.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403 && error.response?.data?.expired) {
            // User's trial has expired
            localStorage.removeItem('userDB')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)


