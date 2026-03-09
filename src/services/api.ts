import type { InternalAxiosRequestConfig } from 'axios';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from '~/stores/auth';
import { formatBytes } from '~/utils/data';
import { env } from '~/utils/env';
import { responseErroHandler } from '~/utils/error';
import { devLog } from '~/utils/log';

export const api: AxiosInstance = axios.create({
	baseURL: env.API_BASE_URL,
	timeout: 1000 * 10, // 10 seconds
});

function request<T>(request: InternalAxiosRequestConfig<T>) {
	const token = useAuthStore.getState().accessToken;

	if (token && request.headers) {
		request.headers.Authorization = `Bearer ${token}`;
	}

	return request;
}

function response<T, D>(response: AxiosResponse<T, D>) {
	const totalBytes = JSON.stringify(response.data).length;

	const logInfos = [
		response.status.toString(),
		`[${response.config?.method?.toUpperCase()}] ${response.config?.url}`,
		formatBytes(totalBytes > 2 ? totalBytes : 0),
	]
		.filter(Boolean)
		.join(' - ');

	devLog(logInfos);

	return response;
}

api.interceptors.request.use(request);
api.interceptors.response.use(response, responseErroHandler);
