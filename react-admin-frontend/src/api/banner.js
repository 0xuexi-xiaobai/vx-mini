import request from '@/utils/request'

export function updateBanner(data) {
    return request({
      url: '/app/updateApp',
      method: 'post',
      data
    })
}

export function getBanner() {
    return request({
      url: '/app/getApp',
      method: 'get',
    })
}