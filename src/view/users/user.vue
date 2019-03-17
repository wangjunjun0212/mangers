<template>
    <div>
      <div>
        <ads-list
          :total="total"
          :topTitle="topTitle"
          :listdata="listdata"
          :tableData="tableData"
          :showAddAdsTitle="showAddAdsTitle"
          :provinceLists="provinceLists"
          :columns="columns"
          :showDownLoad=false
          :showSearch=true
          :showClass=false
          :showRefresh=false
          :spinShow="spinShow"
          @on-add="add"
          @on-search-list="searchList"
          @on-refresh="refresh"
          @on-search="search"
          @on-model-change="showModal"
          @on-change-page="onChangePage"
        ></ads-list>
      </div>
        <Modal v-model="modalVisible" :closable="false" width="78%">
            <div class="model">
              <div v-if="showDeatil">
                <div class="formTitle">用户</div>
                  <Form ref="form" :model="itemsList" :label-width="150" class="add-form clearfix" :rules="itemRule">
                    <!-- <FormItem label="头像"  style="width:100%"> -->
                      <!-- <Upload
                          :before-upload="beforeUploadPhoto"
                          ref="photoupload"
                          :on-error="errorUploadPhoto"
                          :show-upload-list=false
                          :action="action"
                          :data="upPhoto"
                          :on-success="handlePhotoSuccess"
                        >
                          <Button icon="ios-cloud-upload-outline" :loading="isLoading">上传图片</Button>
                        </Upload> -->
                    <!-- </FormItem> -->

                    <!-- <FormItem label="姓名" prop="user_m">
                        <Input v-model="itemsList.user_m" placeholder="请输入姓名"></Input>
                    </FormItem> -->
                    <!-- <FormItem label="性别" prop="user_sex_d" style="width:100%">
                      <RadioGroup v-model="itemsList.user_sex_d">
                          <Radio label="1">男</Radio>
                          <Radio label="2">女</Radio>
                      </RadioGroup>
                    </FormItem> -->
                    <FormItem label="手机号码" prop="user_dianhua" style="width:100%">
                        <Input v-model="itemsList.user_dianhua"  placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="用户等级" prop="sheng" style="width:100%">
                      <Select placeholder="请选择用户等级" class="select-width" @on-change="provinceChange" v-model="itemsList.sheng">
                        <Option v-for="item in provinceLists" :value="item.diqudaima" :key="item.diqudaima">{{ item.diquname }}</Option>
                      </Select>
                    </FormItem>
                    <!-- <FormItem label="积分"  prop="shi"> -->
                      <!-- <Input v-model="itemsList.user_m" placeholder="请输入积分"></Input> -->
                      <!-- <Select placeholder="请选择市" class="select-width" @on-change="cityListChange" v-model="itemsList.shi">
                        <Option v-for="item in cityList" :value="item.diqudaima" :key="item.diqudaima">{{ item.diquname }}</Option>
                      </Select> -->
                    <!-- </FormItem> -->
                   <FormItem label="积分"  prop="qu">
                     <Input v-model="itemsList.user_m" placeholder="请输入积分"></Input>
                    </FormItem>
                     <!-- <FormItem label="学校" prop="user_school_d">
                      <Select placeholder="请选择学校" class="select-width" v-model="itemsList.user_school_d">
                        <Option v-for="item in schoolList" :value="item.daima" :key="item.daima">{{ item.ming }}</Option>
                      </Select>
                    </FormItem> -->
                  </Form>
                </div>
                <!-- <div  v-if="funType === 'watchDetai'">
                  <ul class="watch-deatil clearfix" :model="userDetail">
                    <li>
                      <label for="">姓名：</label><span>{{userDetail.userName}}</span>
                    </li>
                    <li>
                      <label for="">省：</label><span>{{userDetail.userSheng}}</span>
                    </li>
                    <li>
                      <label for="">性别：</label><span>{{userDetail.userSex}}</span>
                    </li>
                    <li>
                      <label for="">市：</label><span>{{userDetail.userShi}}</span>
                    </li>
                    <li>
                      <label for="">学校：</label><span>{{userDetail.userSchool}}</span>
                    </li>
                    <li>
                      <label for="">区：</label><span>{{userDetail.usersQu}}</span>
                    </li>
                    <li>
                      <label for="">电话：</label><span>{{userDetail.userPhone}}</span>
                    </li>
                  </ul>
                </div> -->
            </div>
            <div slot="footer">
                <template v-if="funType === 'add'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消添加</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalAdd" :loading="isLoading">确定添加</Button>
                </template>
                <template v-if="funType === 'edit'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消修改</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalUpdate" :loading="isLoading">确定修改</Button>
                </template>
                <template v-if="funType === 'watchDetai'">
                  <!-- <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666 right:80px;bottom:180px" primary>关闭</Button> -->
                  <Button type="primary" icon="android-create" shape="circle" size="large" @click="onDetalClose">关闭</Button>
                </template>
            </div>
        </Modal>
        <Modal v-model="delModal" width="300">
            <p slot="header" style="color:#f60;text-align:center;font-size:16px">
              <Icon type="ios-information-circle"></Icon>
              <span>删除确认</span>
            </p>
            <div style="text-align:center;font-size:16px">
                <p>删除后将不再保留数据</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="del">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<style scoped lang="less">
    .add-form .ivu-input-wrapper{
        width:260px;
    }
    .form-opt {
        color:red;
        font-size:12px;
    }
    .vertical-center-modal{
      display: flex;
      align-items: center;
      justify-content: center;
      .ivu-modal{
          top: 0;
      }
    }
</style>

<script>
import AdsList from '@/components/ads-list'
import { mapActions } from 'vuex'
import { schoolList } from '@/api/area'
import { userList, addUser, editUser, deleteUser } from '@/api/user'
export default {
  name: 'Headmaster',
  components: {
    AdsList
  },
  beforeUpdate () {
    switch (this.funType) {
      case 'view':
        this.isModalDisabled = true
        break
      case 'add':
        this.isModalDisabled = false
        break
      case 'edit':
        this.isModalDisabled = false
        break
      case 'watchDetai':
        this.isModalDisabled = false
        break
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'handleAreaList'
    ]),
    init () {
      /**
       * 功能：初始化加载省，根据省做市，区的联动（学校个根据省，市，县依次做联动）
       */
      // this.spinShow = true
      // this.$store.dispatch('handleAreaList', { jibie: '1' }).then(res=> {
      //   this.provinceLists = res.data.data
      // })
      /**
       * 功能：加载用户列表
       */
      let params = {
        usertype_code: '2',
        pageNumber: 1,
        pageSize : 10
      }
      this.userList(params)
    },
    userList (params) {
      userList(params).then(res=> {
        let lists = res.data.data
        this.listdata = lists
        this.total = res.data.pageInfo
        this.spinShow = false
      })
    },
    provinceList () {
      return this.$store.state.area.list
    },
    provinceChange (val) {
      this.schoolLists(val)
      this.itemsList.shi = ''
      this.itemsList.qu = ''
      this.$store.dispatch('handleAreaList', { jibie: '2', fudaima: val }).then(res => {
        this.cityList = res.data.data
      })
    },
    cityListChange (val) {
      this.schoolLists(val)
      this.itemsList.qu = ''
      if (val) {
        this.$store.dispatch('handleAreaList', { jibie: '3', fudaima: val }).then(res => {
          this.areaList = res.data.data
        })
      }
    },
    areaListChange (val) {
      // this.itemsList.qu = ''
      this.schoolLists(val)
    },
    schoolLists (val) {
      if(val) {
        schoolList({ diqudaima: val, ming: '' }).then(res => {
          this.schoolList = res.data.data
          this.itemsList.user_school_d = ''
        })
      }
    },
    add () {
      this.modalVisible = true
      this.showDeatil = true
      this.funType = 'add'
    },
    onEdit (params) {
      this.showDeatil = true
      this.modalVisible = true
      this.funType = 'edit'
      this.provinceChange(params.user_sheng_d)
      this.cityListChange(params.user_shi_d)
      this.areaListChange (params.user_diqu_d)
      this.itemsList.id = params.id
      //修改详情
      setTimeout(()=>{
        this.itemsList.user_m = params.user_m
        this.itemsList.user_sex_d = params.user_sex_d
        this.itemsList.user_dianhua = params.user_dianhua
        this.itemsList.sheng = params.user_sheng_d
        this.itemsList.shi = params.user_shi_d
        this.itemsList.qu = params.user_diqu_d
        this.itemsList.user_school_d = params.user_school_d
      },200)
    },
    refresh () {
      let params = {
        usertype_code: '2',
        pageNumber: 1,
        pageSize : 10
      }
      this.userList(params)
    },
    searchList (params) {
      this.spinShow = true
      let data = {
        usertype_code: '2',
        user_school_d: params.school,
        sheng: params.province,
        shi: params.city,
        xian: params.area,
        pageNumber: 1,
        pageSize : 10
      }
      setTimeout(()=>{
        this.userList(data)
      },1000)
      
    },
    search (val) {
      console.log('搜索' + val)
    },
    watchDetai (params) {
      this.borderColor = 'none'
      this.showDeatil = false
      this.modalVisible = true
      this.funType = 'watchDetai'
      // 查看详情
      this.userDetail.userName = params.user_m,
      this.userDetail.userSex = params.user_sex_m,
      this.userDetail.userPhone = params.user_dianhua,
      this.userDetail.userSheng = params.user_sheng_m,
      this.userDetail.userShi = params.user_shi_m,
      this.userDetail.userSchool = params.user_school_m,
      this.userDetail.usersQu = params.user_qu_m
    },
    onDetalClose () {
      this.modalVisible = false
      this.userDetail.userName = '',
      this.userDetail.userSex = '',
      this.userDetail.userPhone = '',
      this.userDetail.userZhanghao = '',
      this.userDetail.userSheng = '',
      this.userDetail.userSex = '',
      this.userDetail.userShi = '',
      this.userDetail.userSchool = '',
      this.userDetail.usersQu = ''
    },
    onDelete (id) {
      this.delModal = true
      this.delId = id
    },
    del () {
        this.del_loading = true
        let params = {
          id: this.delId,
          usertype_code: '2'
        }
        deleteUser(params).then(res => {
        if (res.data.code === 200) {
            let params = {
              usertype_code: '2',
              pageNumber: 1,
              pageSize : 10
            }
            this.userList(params)
          this.$Message.success('删除成功')
          setTimeout(() => {
            this.del_loading = false
            this.delModal = false
          }, 2000)
        } else {
          this.$Message.error('删除失败')
          setTimeout(() => {
            this.del_loading = false
            this.delModal = false
          }, 2000)
        }
      })
    },
    showModal () {
      this.modalVisible = true
    },
    onModalClose () {
      this.modalVisible = false
      this.itemsList.id = ''
      this.$refs['form'].resetFields()
    },
    onModalAdd () {
      this.itemsList.usertype_code= '2',
      this.isLoading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addUser(this.itemsList).then(res => {
            if (res.data.code === 200) {
                this.$Message.success('添加成功')
                let params = {
                  usertype_code: '2',
                  pageNumber: 1,
                  pageSize : 10
                }
                this.userList(params)
                this.onModalClose()
            } else {
                this.$Message.error('添加失败')
            }
          })
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        } else {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        }
      })
    },
    onModalUpdate () {
      this.isLoading = true
      this.itemsList.usertype_code= '2',
      this.isLoading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          editUser(this.itemsList).then(res => {
            if (res.data.code === 200) {
                this.$Message.success('修改成功')
                let params = {
                  usertype_code: '2',
                  pageNumber: 1,
                  pageSize : 10
                }
                this.userList(params)
                this.onModalClose()
            } else {
                this.$Message.error('修改失败')
            }
          })
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        } else {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        }
      })
    },
    onChangePage (page) {
      let params = {
        usertype_code: '2',
        pageNumber: page,
        pageSize : 10
      }
      this.userList(params)
      // console.log(page)
    },
     //上传图片
    beforeUploadPhoto (file) {
      this.photoFile = file
      this.photoName = file.name
      return false
    },
    upPhotoFile (path) {
      this.upPhoto.save_path = this.dy_path
      this.save_path = path
      this.$refs.photoupload.post(this.photoFile)
      if(!this.photoFile) {
        this.upload(this.save_path)
      }
    },
    handlePhotoSuccess (res,file) {
      if(this.uploadFile.length!=0) {
        this.upload(this.save_path)
      } else {
        setTimeout(() => {
            this.isLoading = false
            this.cancelLoading = true
            this.addLoading = true
            this.onreAdd = false
            this.$Message.success('成功')
            this.onModalClose()
            // let params = {
            //   pageNumber: 1,
            //   pageSize : 10,
            //   word_phrase: 'word'
            // }
            // this.getList(params)
          }, 1500)
      }
      
    },
    errorUploadPhoto () {
      this.isLoading = true
      this.$Message.error('失败，请重新提交')
    }
  },
  data () {
    return {
      delId: '',
      delModal: false,
      del_loading: false,
      itemsList: {
        user_m: '',
        user_sex_d: '1',
        user_dianhua: '',
        sheng: '',
        shi: '',
        qu: '',
        user_school_d: ''
      },
      provinceLists: [
        {
          diqudaima: '',
          diquname: ''
        }
      ],
      cityList: [
        {
          diqudaima: '',
          diquname: ''
        }
      ],
      areaList: [
        {
          diqudaima: '',
          diquname: ''
        }
      ],
      schoolList: [
        {
          ming: '',
          daima: ''
        }
      ],
      modalVisible: false,
      showAddAdsTitle: '+ 添加用户',
      topTitle: '用户列表',
      showDeatil: true,
      tableData: [],
      isLoading: false,
      borderColor: '1px solid #e8eaec',
      funType: '',
      spinShow: false,
      userDetail: {
        userName: '',
        userSex: '',
        userPhone: '',
        userZhanghao: '',
        userSheng: '',
        userShi: '',
        userSchool: '',
        usersQu: ''
      },
      upPhoto: {
        type: 1
      },
      action: this.$store.state.app.api,
      downLoad: this.$store.state.app.getUpUrl,
      statu: 1,
      total: 0,
      currentPage: 1,
      columns: [
        {
          title: '头像',
          key: 'avator',
          render: (h, params) => {
            return h('img', {
              attrs: {
                // scr: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                'src': 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                onerror:'this.src="https://goss.veer.com/creative/vcg/veer/800water/veer-133632476.jpg"'
              },
              style: {
                width: "50px",
                height:"50px"
              }
            })
          }
        },
        // {
        //   title: '性别',
        //   width:60,
        //   key: 'user_sex_m'
        // },
        {
          title: '手机号码',
          align: 'center',
          key: 'user_dianhua'
        },
        {
          title: '用户等级',
          align: 'center',
          key: 'user_sheng_m'
        },
        {
          title: '积分',
          key: 'user_shi_m'
        },
        // {
        //   title: '区域',
        //   key: 'user_qu_m'
        // },
        // {
        //   title: '学校',
        //   key: 'user_school_m'
        // },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', {
              class: 'xcm-action'
            }, [
              // h('Button', {
              //   props: {
              //     size: 'small',
              //     type: 'primary'
              //   },
              //   style: {
              //     marginRight: '10px'
              //   },
              //   on: {
              //     click: () => {
              //       this.watchDetai(params.row)
              //     }
              //   }
              // }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.onEdit(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  size: 'small',
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.onDelete(params.row.id)
                  }
                }
              }, '提现')
            ])
          }
        }
      ],
      listdata: [],
      itemRule: {
        user_m: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        user_sex_d:[
            { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        user_dianhua: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号码输入错误', trigger: 'blur' }
        ],
        sheng: [
          { required: true, message: '请选择省', trigger: 'blur' }
        ],
        shi: [
          { required: true, message: '请选择市', trigger: 'blur' }
        ],
        qu: [
          { required: true, message: '请选择区', trigger: 'blur' }
        ],
        user_school_d: [
          { required: true, message: '请选择学校', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
