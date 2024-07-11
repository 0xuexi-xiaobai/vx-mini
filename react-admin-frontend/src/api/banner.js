import request from '@/utils/request'

export function updateBanner(data) {
    return request({
      url: '/banner',
      method: 'post',
      data
    })
}

export function getBanner() {
    return request({
      url: '/banner',
      method: 'get',
    })
}