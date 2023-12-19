import http from '@/apis/axios'
import type { User } from './types'

export function info() {
  return http.request<User>({
    url: 'info',
  })
}

export function findPrograms() {
  return http.request<User>({
    url: `/projectCenter/website/noauth/findPrograms`,
  })
}
