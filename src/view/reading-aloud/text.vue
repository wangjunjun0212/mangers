<template>
    <div>
      <div>
        <ads-list
          :total="total"
          :topTitle="topTitle"
          :listdata="listdata"
          :tableData="tableData"
          :showAddAdsTitle="showAddAdsTitle"
          :columns="columns"
          :showDownLoad=false
          :showSearch=true
          :showClass=false
          :showRefresh=false
          :spinShow="spinShow"
          @on-add="add"
          @on-search-list="searchList"
          @on-search="search"
          @on-model-change="showModal"
          @on-change-page="onChangePage"
        ></ads-list>
      </div>

        <Modal v-model="modalVisible" :closable="false" :mask-closable="false" width="78%" :styles="{top: '20px',left:'0'}">
            <div class="model">
              <div v-if="showDeatil">
                <div class="formTitle">广告</div>
                  <Form ref="form" :model="itemsList" :label-width="150" class="add-form clearfix" :rules="itemRule">
                    <Row>
                      <Col>
                        <FormItem label="标题" prop="tatile" style="width:100%" >
                            <Input v-model="itemsList.tatile"  placeholder="标题"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <FormItem label="发布人" prop="publisher">
                          <!-- <Input v-model="itemsList.publisher" placeholder="请输入积分" style="width:200px" type="number"></Input>                           -->
                          <Input v-model="itemsList.publisher"  placeholder="发布人" style="width:200px"></Input>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem label="截止日期" prop="endDate">
                            <DatePicker type="date" :options="endDas" placeholder="选择截止日期" style="width:200px" v-model="itemsList.endDate"></DatePicker>
                        </FormItem>
                      </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <FormItem label="会员等级" prop="advLevel">
                        <Select v-model="itemsList.advLevel" style="width:200px" >
                            <Option v-for="item in leveLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="积分"  prop="advInte" >
                        <Input v-model="itemsList.advInte" placeholder="请输入积分（只能为数字）" style="width:200px"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                     <FormItem label="内容"  prop="content"  class="input-content">
                        <Input v-model="itemsList.content" type="textarea" placeholder="例如：........." :rows="5"/>
                    </FormItem>

                  <FormItem label="广告图片" v-show="islook" style="width:100%">
                    <template>
                        
                        <div>
                          <ul >
                            <li style="display:inline-block;width: 200px;height:210px;margn-right:10px" class="file-list" v-for="(list,index) in file" :key="index">
                              
                              <img :src="imgs[index].updSrc" alt="" style="width:100px;height:100px">
                              <p>
                                  文件名: <span style="font-size:15px;">{{ list.name }}</span> <Icon type="ios-close" size="20" style="float:right;" @click="delFileList(index)"></Icon>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <Upload
                            multiple
                            ref="upload"
                            type="drag"
                            :format="['jpg','jpeg','png']"
                            :max-size="5000"
                            :before-upload="handleUpload"
                            :action="action">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或者拖拽到此次上传文件</p>
                            </div>
                        </Upload>
                    </template>
                </FormItem>
              </Form>
            </div>
                <div  v-if="funType === 'watchDetai'">

                </div>
            </div>
            <div slot="footer">
                <template v-if="funType === 'add'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalAdd" :loading="isLoading">添加</Button>
                </template>
                <template v-if="funType === 'edit'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalUpdate" :loading="isLoading">修改</Button>
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
    .add-form .ivu-input-wrapper,{
        width:600px;
    }
    .ivu-input {
      width: 600px !important;
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
    .remove {
      position: absolute;
      background: red;
      color: #fff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: block;
      text-align: center;
      line-height: 30px;
      left: 0;
      top: 0px;
    }
    .ivu-upload {
      width: 200px;
      // margin: 0 auto;
    }
</style>

<script>
import axios from 'axios'
import qs from 'qs'
import AdsList from '@/components/ads-list'
import { userList } from '@/api/user'
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
    init () {
      let data = {
        pageNum:1,
        pageSize:10
        // userid: 'admin',
        // password: 123456
      }
      debugger
      this.userList(data)
    },
    userList (params) {
      axios.post("/ggfb/adv/getPage", qs.stringify(params), {
        timeout: 10000,
        headers: {
            // 'Content-Type': 'multipart/form-data'
        }
        }).then(function (rdata) {
            
            console.log(rdata);
        }).catch(function (error) {
          console.log(error)
            // this.loading2 = false;
            // this.$Message.error('服务器错误' + error);
        });
      //  let data = qs.stringify(params)
      // //  debugger
      //  axios.post("/ggfb/sysLogin", {data: data}, {
      //   timeout: 10000,
      //   headers: {
      //       // 'Content-Type': 'multipart/form-data'
      //   }
      //  }).then(function (rdata) {
      //    debugger
      //       console.log(rdata);
      //   }).catch(function (error) {
      //     console.log(error)
      //       that.loading2 = false;
      //       that.$Message.error('服务器错误' + error);
      //   })
      // userList(params).then(res=> {
        // console.log(res)
        // let lists = res.data.data
        // this.listdata = lists
        // this.total = res.data.pageInfo
        // this.spinShow = false
      // })
    },
    delFileList(index){
        let that = this;
        that.file.splice(index, 1);
        that.imgs.splice(index,1)
    },
    handleUpload (file) {
        let that = this;
        if(that.file.length >= 5){
            this.$Message.info("最多只能上传5个文件");
        }else{
            that.file.push(file);
            this.handlePreview();
        }
        return false;
    },
    handlePreview(){
       const self = this;
       const len = self.file.length - 1;
       const reader = new FileReader();
       reader.readAsArrayBuffer(this.file[len]);
       debugger
  			reader.onload = function(e){
  				const bf = this.result;
  				const blob = new Blob([bf],{type:"text/plain"});
          const str = URL.createObjectURL(blob);
          self.updSrc = str;
          let obj = {
            updSrc: self.updSrc
          } 
          self.imgs.push(obj)
          console.log(self.imgs)
  		 };
    },
    upload(){
      let that = this;
      if(that.file.length > 0){
      //创建 formData 对象
      let formData = new FormData();
      //向 formData 对象中添加文件
      Object.keys(that.itemsList).forEach((key)=>{
        formData.append(key,that.itemsList[key]);
      })
      //多个文件上传
        for(var i=0; i< that.file.length; i++){
          formData.append("files",that.file[i]);  
      }
      axios.post("/ggfb/adv/save", formData, {
        timeout: 10000,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(function (rdata) {
            
            console.log(rdata);
        }).catch(function (error) {
          console.log(error)
            that.loading2 = false;
            that.$Message.error('服务器错误' + error);
        });
      }else{
          that.$Message.error("请至少上传一个文件");
      }
    },
    add () {
      this.modalVisible = true
      this.showDeatil = true
      this.funType = 'add'
    },
    onEdit (params) {

    },
    searchList (params) {
 
      
    },
    search (val) {
      console.log('搜索' + val)
    },
    onDetalClose () {
    },
    onDelete (id) {
      this.delModal = true
      this.delId = id
    },
    del () {
       
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
      this.upload()
    },
    onModalUpdate () {

    },
    onChangePage (page) {
      let params = {
        usertype_code: '2',
        pageNumber: page,
        pageSize : 10
      }
      this.userList(params)
    },
  },
  data () {
    const validateMobile = (rule, value, callback) => {
          if (!Number.isInteger(+value)) {
              callback(new Error('请输入数字值'));
          } else {
              callback();
          }
      };
    return {
      endDas: {
        disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      islookshenghe:false,
      loading2:false,
      imgs: [],
      isfiletihsi:true,
      isfiletihsi:false,
      islook:true,
      leveLists:[
        {
          value:'1',
          label: '等级1'
        },
        {
          value:'2',
          label: '等级2'
        },
      ],
      file: [],
      updSrc: '',
      delId: '',
      delModal: false,
      del_loading: false,
      itemsList: {
        advLevel: '',
        tatile: '',
        advInte: '',
        publisher: '',
        endDate: '',
        content: ''
      },
      modalVisible: false,
      showAddAdsTitle: '+ 添加广告',
      topTitle: '广告列表',
      showDeatil: true,
      tableData: [],
      isLoading: false,
      borderColor: '1px solid #e8eaec',
      funType: '',
      spinShow: false,
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
          title: '标题',
          width:80,
          key: 'user_m'
        },
        // {
        //   title: '性别',
        //   width:60,
        //   key: 'user_sex_m'
        // },
        // {
        //   title: '电话号码',
        //   align: 'center',
        //   key: 'user_dianhua'
        // },
        {
          title: '用户等级',
          align: 'center',
          key: 'user_sheng_m'
        },
        {
          title: '积分',
          key: 'user_shi_m'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', {
              class: 'xcm-action'
            }, [
              h('Button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.watchDetai(params.row)
                  }
                }
              }, '查看'),
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
              }, '删除')
            ])
          }
        }
      ],
      listdata: [],
      
      itemRule: {
        tatile: [
            { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        advInte: [
           {required: true, message: '积分不能为空', trigger: 'blur'},
           {validator: validateMobile, trigger: 'blur'}
          // { required: true, type: 'number',message: '请输入积分', trigger: 'blur' }
        ],
        advLevel:[
            { required: true, message: '请选择等级', trigger: 'blur' }
        ],
        publisher:[
            { required: true, message: '请输入发布人', trigger: 'blur' }
        ],
        endDate:[
            { required: true, message: '请选择截止日期', trigger: 'blur', pattern: /.+/ }
        ],
        content:[
            { required: true, message: '请输入内容', trigger: 'blur' }
        ],
      }
    }
  }
}
</script>
