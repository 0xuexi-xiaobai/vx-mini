import request from '@/utils/request'

export function updateSwiper(data) {
    return request({
      url: '/swiper',
      method: 'post',
      data
    })
}

export function getSwipers() {
    return request({
      url: '/swiper',
      method: 'get',
    })
}