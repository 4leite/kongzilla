import axios, { AxiosResponse } from 'axios'

export interface ApiService {
	get<Response>(endpoint: string): Promise<AxiosResponse<Response>>
	put<Payload, Response>(endpoint: string, payload: Payload): Promise<AxiosResponse<Response>>
	post<Payload, Response>(endpoint: string, payload: Payload): Promise<AxiosResponse<Response>>
	delete<Response>(endpoint: string): Promise<AxiosResponse<Response>>
}

export const getApiService = (url: string): ApiService => ({
	get: <Response,>(endpoint: string) => {
		console.log('apiservice:get', endpoint)
		return axios.get<Response>(`${url}${endpoint}`)
	},
	put: <Payload, Response>(endpoint: string, payload: Payload) => {
		console.log('apiservice:put', endpoint, payload)
		return axios.put<Payload, AxiosResponse<Response>>(`${url}${endpoint}`, payload)
	},
	post: <Payload, Response>(endpoint: string, payload: Payload) => {
		console.log('apiservice:post', endpoint, payload)
		return axios.post<Payload, AxiosResponse<Response>>(`${url}${endpoint}`, payload)
	},
	delete: <Response,>(endpoint: string) => {
		console.log('apiservice:delete', endpoint)
		return axios.delete<Response>(`${url}${endpoint}`)
	}
})