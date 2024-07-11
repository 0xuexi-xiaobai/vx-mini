import request from '@/utils/request'

export function addCategory(data) {
  return request({
    url: '/category/addCategory',
    method: 'post',
    data
  }) 
}

export function deleteCategory(id) {
  return request({
    url: '/category/deleteCategory',
    method: 'post',
    id
  })
}

export function updateCategory(data) {
  return request({
    url: '/category/updateCategory',
    method: 'post',
    data
  })
}