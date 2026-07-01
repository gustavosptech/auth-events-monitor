import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const login = (email: string, password: string) => api.post('/auth/login', {email, password})

export const validate = (token: string) => api.post('/auth/validate', { token })

export const revoke = (token: string) => 
    api.post('/auth/revoke', {}, {
        headers: { 'Authorization': `Bearer ${token}` }    
    })

export const audit = (token: string) => 
    api.get('/admin/audit', {
        headers: { 'Authorization': `Bearer ${token}` }
    })