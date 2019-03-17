<template>
  <div>
    <div class="user-avator-dropdown">
      <span style="padding:0 20px 0 0">欢迎您：<i style="color:rgb(45, 140, 240);font-style:normal;font-weight:600">{{userName}}</i></span>
      <Dropdown @on-click="handleClick">
        <Avatar :src="userAvator"/>
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem name="changePaass">修改密码</DropdownItem>
          <DropdownItem name="logout">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div v-if="modalVisible">
      <Modal v-model="modalVisible" :closable="false">
      <div class="formTitle">修改密码</div>
      <Form ref="form" :label-width="150" class="user-login-form" :rules="itemRule" :model="items">
        <FormItem label="修改的密码" prop="password">
          <Input v-model="items.password" placeholder="请输入修改的密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <template>
          <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
          <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalAdd" :loading="isLoading">确定</Button>
        </template>
      </div>
  </Modal>
    </div>
  </div>
</template>
<style scoped>
  .user-login-form {
    display: flex;
    justify-content: center;
  }
  .user-login-form .ivu-form-item {
    width:30%
  }
</style>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.userName = this.$store.state.user.userName
  },
  methods: {
    ...mapActions([
      'handleLogOut',
      'handleUpdatePass'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
        case 'changePaass':
        this.modalVisible = true
          break
      }
    },
    onModalClose () {
      this.modalVisible = false
      this.$refs['form'].resetFields()
    },
    onModalAdd () {
      this.isLoading = true
      this.items.id = this.$store.state.user.id
      this.$store.dispatch('handleUpdatePass', this.items).then(res => {
          if (res.data.code === 200) {
            this.$router.push({
              name: 'login'
            })
            setTimeout(()=>{
              this.isLoading = false
              this.modalVisible = false
              this.$Message.success('修改成功，请重新登录')             
            },500)
          } else {
            this.isLoading = false
            this.$Message.error('修改失败')
          }
      })
    }
  },
  data () {
    return {
      items:{
        password: ''
      },
      userName: '',
      value: '',
      isLoading:false,
      modalVisible: false,
      itemRule: {
        password: [
            { required: true, message: '请输入修改的密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
