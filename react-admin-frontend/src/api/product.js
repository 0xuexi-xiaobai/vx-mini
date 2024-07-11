import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: '/product/addProduct',
    method: 'post',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: '/product/deleteProduct',
    method: 'post',
    id
  })
}

export function updateProduct(data) {
  return request({
    url: '/banner',
    method: 'post',
    data
  })
}