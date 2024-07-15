import request from '@/utils/request';

export function addCategory(data) {
  return request({
    url: '/category/addCategory',
    method: 'post',
    data,
  });
}

export function deleteCategory(id) {
  return request({
    url: '/category/deleteCategory',
    method: 'delete',
    params: { id },
  });
}

export function updateCategory(data) {
  return request({
    url: '/category/updateCategory',
    method: 'post',
    data,
  });
}

export function getCategory() {
  return request({
    url: '/category/getCategoryList',
    method: 'get',
    data: {
      page: 1,
      pageSize: 1000, // large enough
    },
  });
}