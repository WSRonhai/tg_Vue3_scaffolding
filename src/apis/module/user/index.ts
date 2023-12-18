import http from '@/apis/axios'
import type { user } from './types'

export function info() {
  return http.request<user>({
    url: 'info',
  })
}

export function findPrograms() {
  return http.request<user>({
    url: `/projectCenter/website/noauth/findPrograms`,
  })
}
