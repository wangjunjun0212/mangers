<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loading='loading'></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit (LoginForm) {
      this.$router.push({
        name: this.$config.homeName
      })
      this.loading = true
      this.$store.dispatch('handleLogin',  LoginForm).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$router.push({
              name: this.$config.homeName
            })
            setTimeout(()=>{
              this.$Message.success('登录成功')             
            },500)
          } else {
              this.$Message.error('用户名或密码错误')
          }
      })
    }
  }
}
</script>

<style>

</style>
