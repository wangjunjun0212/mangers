import { areaList } from '@/api/area'
export default {
  state: {
    list: []
  },
  mutations: {
    setArea: (state, data) => {
      state.list = data
    }
  },
  actions: {
    async handleAreaList ({ commit }, data) {
      let response = await areaList(data).catch((err) => {
        return err
      })
      if (response.data.code === 200) {
        commit('setArea', response.data.data)
      } else {
        this.$Message.error('服务器请求错误')
      }
      return response
    }
  }
}
