<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="user_zhanghao">
      <Input v-model="form.user_zhanghao" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="user_mima">
      <Input type="password" v-model="form.user_mima" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem style="width:100%">
      <Button @click="handleSubmit" type="primary" long :loading='loading'>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    loading: {
      type: Boolean, default: false
    }
  },
  data () {
    return {
      form: {
        user_zhanghao: 'admin',
        user_mima: '',
        usertype_code: 0
      }
    }
  },
  computed: {
    rules () {
      return {
        user_zhanghao: this.user_zhanghao,
        user_mima: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', this.form)
        }
      })
    }
  }
}
</script>
