import axios from '@/libs/api.request'

/**
 * 功能 ： 添加用户
 * @param {}
 */
export const addAd = (data) => {
  // let params = qs.stringify(data)
  return axios.request({
    url: '/ggfb/adv/save',
    method: 'post',
    data
  })
}
