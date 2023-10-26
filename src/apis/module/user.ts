import http from '@/apis/axios'
export interface user {
    name: string
    age: number
    avatar: string
}

export function info() {
    return http.request<user>({
        url: 'info',
    })
}

export function findPrograms() {
    return http.request<user>({
        url: `projectCenter/website/noauth/findPrograms`
    })
}

