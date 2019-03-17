import axios from '@/libs/api.request'
import qs from 'qs'

/**
 * 省市区列表
 * @param { jibie: ''(可选参数), fudaima: '' }
 */
export const areaList = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/diqu/ChaDiQuListByJiBie',
    method: 'post',
    data: params
  })
}
/**
 * 学校列表
 * @param { ming: '' , diqudaima: '' }
 */
// export const schoolList = (data) => {
//   let params = qs.stringify(data)
//   return axios.request({
//     url: '/zidian/getXueXiao',
//     method: 'post',
//     data: params
//   })
// }
