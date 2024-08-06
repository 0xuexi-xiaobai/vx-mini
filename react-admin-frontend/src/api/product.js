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

export function getProduct( ) {
  return request({
    url: '/category/getCategoryList',
    method: 'get',
    params: { 
      page: 1,
      pageSize: 100,
    }
  });
}

export function updateProduct(data) {
  return request({
    url: '/banner',
    method: 'post',
    data
  })
}