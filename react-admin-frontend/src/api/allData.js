import request from '@/utils/request'

/**
 * 获取所有分类
 * @param {Object} params - 查询参数
 * @param {Number} [params.page] - 当前页数
 * @param {Number} [params.limit] - 每页的数量
 */
export function getAll(params) {
  return request({
    url: '/category/getCategoryList',
    method: 'get',
    params: params
  });
}