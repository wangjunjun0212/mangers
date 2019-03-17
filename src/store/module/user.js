import { login, logout, updatePass } from '@/api/user'
import { setToken, getToken, setUserName, getUserName,setUserId, getUserId } from '@/libs/util'
import { Message } from 'iview'
export default {
  state: {
    userName: getUserName(),
    userId: getUserId(),
    avatorImgPath: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
      setUserId(id)
    },
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    async handleLogin ({ commit }, data) {
      let response = await login(data).catch((err) => {
        return err
      })
      if (response.data.code === 200) {
        commit('setToken', response.data.data2)
        setToken(response.data.data2)
        const data = response.data
        setUserName(data.data.user[0].yonghuleixing)
        commit('setUserId', data.data.id)
        setUserId(data.data.id)
        const setAccessList = []
        setAccessList.push(data.data.user[0].zhanghao)
        commit('setAccess', setAccessList)
        commit('setHasGetInfo', true)
        commit('setUserName', data.data.user[0].yonghuleixing)
        commit('setAvator', 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4')
      }
      return response
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setUserName', '')
          commit('setUserId', '')
          Message.error(res.data.message)
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // commit('setHasGetInfo', true)
        // resolve()
      })
    },
    async handleUpdatePass ({ commit }, data) {
      let response = await updatePass(data).catch((err) => {
        return err
      })
      if (response.data.code === 200) {
        commit('setToken', '')
        commit('setAccess', [])
        commit('setUserName', '')
        commit('setUserId', '')
      }
      return response
    }
  }
}
