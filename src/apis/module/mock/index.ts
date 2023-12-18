import http from '@/apis/axios'
import type { get } from './types'
export function get() {
    return http.request<get>({
        url: '/api/get/',
    })
}