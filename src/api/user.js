import axios from '@/libs/api.request'
import qs from 'qs'

/**
 * 学校列表
 * @param { ming: '' , diqudaima: '' }
 */
/**
 * 功能 ： 用户登录
 * @param { type: 1,(用户类型) userName : 'admin'（默认），password : '123456 }
 */
export const login = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/login/user',
    method: 'post',
    data: params
  })
}

/**
 * 功能 ： 用户登出
 * @param  无
 */
export const logout = () => {
  return axios.request({
    url: '/login/outlogin',
    method: 'get'
  })
}

/**
 * 功能 ： 用户已登录后修改密码
 * @param { password,type(用户类型) }
 */
export const updatePass = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/user/updatePW',
    method: 'post',
    data: params
  })
}

/**
 * 功能 ： 添加用户
 * @param {}
 */
export const addUser = (data) => {
  // let params = qs.stringify(data)
  return axios.request({
    url: '/ggfb/adv/save',
    method: 'post',
    data: data
  })
}

/**
 * 功能 ： 修改用户
 * @param {}
 */
export const editUser = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/user/xiugaiUser',
    method: 'post',
    data: params
  })
}

/**
 * 功能 ： 删除用户
 * @param {}
 */
export const deleteUser = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/user/delUserById',
    method: 'post',
    data: params
  })
}

/**
 * 功能 ： 1、加载用户列表
 *        2、查询用户
 * @param {}
 */
export const userList = (data) => {
  let params = qs.stringify(data)
  return axios.request({
    url: '/ggfb/adv/getPage',
    method: 'post',
    data: params
  })
}
