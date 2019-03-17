<template>
  <Card dis-hover style="margin-bottom:20px;border:none">
      <div slot="title">
        <Row style="padding-bottom:20px;border-bottom:1px solid #f5f7f9;margin-bottom:20px">
          <ul class="select-list">
            <!-- <li>
              <Select placeholder="请选择省市" @on-change="onProince" v-model="searchItem.province">
                <Option v-for="item in provinceLists" :value="item.diqudaima" :key="item.diqudaima" >{{ item.diquname }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择城市" @on-change="onCity" v-model="searchItem.city">
                <Option v-for="item in cityList" :value="item.diqudaima" :key="item.diqudaima">{{ item.diquname }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择地区"  @on-change="onArea" v-model="searchItem.area">
                <Option v-for="item in areaList" :value="item.diqudaima" :key="item.diqudaima">{{ item.diquname }}</Option>
              </Select>
            </li>
            <li v-if="showSchool">
              <Select placeholder="请选择学校" v-model="searchItem.school">
                <Option v-for="item in schoolList" :value="item.daima" :key="item.daima">{{ item.ming }}</Option>
              </Select>
            </li>
            <li v-if="showGrade">
              <Select placeholder="请选择年级" v-model="searchItem.user_nianjima">
                <Option v-for="item in gradeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
            <li v-if="showClass">
              <Select placeholder="请选择班级" v-model="searchItem.user_banjima">
                <Option v-for="item in classList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li> -->
            <li v-if="showSearch" style="width:400px">
                <Input class="search" v-model="search" icon="ios-search" placeholder="请输入标题" size="large" @click.native="onSearch"></Input>           
              </li>
            <li v-if="showClassItem">
                <Input class="search" v-model="classItem" placeholder="请输入班级序列号" size="large"></Input>           
            </li>
          </ul>
          <!-- <div class="fr mr20">
            <Button size="large" icon="ios-search" type="primary" shape="circle" :loading="exportLoading" @click.native="searchList">搜索</Button>
          </div> -->
        </Row>
        <Row>
          <Col span="10">
            <span style="line-height:30px">{{topTitle}}</span>
          </Col>
          <Col span="14">
            <ul class="navTab">
              <li v-if="showDownLoad" class="right-line mr10" style="width:100px">
                <Button size="large" icon="md-download" type="primary" shape="circle" :loading="exportLoading" @click.native="exportExcel">{{downLoadTitle}}</Button>                
              </li>
              
              <!-- <li v-if="showSearch" class="ml20 mr20">
                <Input class="search" v-model="search" icon="ios-search" placeholder="请输入班级序列号" size="large" @click.native="onSearch"></Input>           
              </li> -->
              <li v-if="showRefresh" class="left-line">
                <Tooltip content="刷新" style="padding-left:10px;">
                    <Icon type="ios-refresh" size="32" @click.native="onRefresh" :class="{'rotate-center' : rotate}"/>
                </Tooltip>
              </li>
              <li v-if="showAddAds" class=" ml10" style="width:136px;">
                <Button type="primary" shape="circle" icon="android-add" size="large" @click.native="addAds">{{showAddAdsTitle}}</Button>            
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Row>
        <Col :span="24">
          <Table 
            ref="studentTable"
            :height="height"
            :columns="columns"
            :data="listdata"
          ></Table>
        </Col>
      </Row>
      
      <Page
        style="margin-top:20px"
        :total="total"
        :current.sync="currentPage"
        :page-size="pageSize"
        show-total
        @on-change="onChangePage"
        class="page"
      />
  </Card>
</template>
<style scoped>
.rotate-center {
  animation-name:go;
  animation-duration:1s;
  animation-iteration-count: infinite
}
@keyframes go{
  0% {
    transform: rotateZ(0);
  }
  100% {transform: rotateZ(360deg); }
}
.fr {
  float:right
}
.mr10 {
  margin-right: 10px;
}
.mr20 {
  margin-right: 20px;
}
.ml10 {
  margin-left: 10px;
}
.ml20 {
  margin-left: 20px;
}
.ivu-card-head ul li i {
  cursor: pointer;
}
.ivu-card-head ul li i:hover {
  color: #2b83f9;
}
.select-list li{
  width:160px;
  margin-right:10px;
}
ul.navTab {
  float: right;
  height: 34px;
  line-height: 34px;
}
ul li {
  float: left;
  list-style: none;
}
  .search {
    border-radius: 20px;
  }
  .right-line {
    border-right: 1px solid #ccc
  }
  .left-line {
    border-left: 1px solid #ccc
  }
</style>
<script>
export default {
  name: 'AdsList',
  props: {
    topTitle: {
      type: String, default: '信息列表'
    },
    spinShow: {
      type: Boolean, default: true
    },
    columns: {
      type: Array, required: true
    },
    listdata: {
      type: Array, required: true
    },
    tableData: {
      type: Array, required: true
    },
    listTitle1: {
      type: String, default: '信息列表'
    },
    listTitle2: {
      type: String, default: '信息列表'
    },
    downLoadTitle: {
      type: String, default: '下载'
    },
    showGrade: {
      type: Boolean, default: false
    },
    showSchool: {
      type: Boolean, default: true
    },
    showClass: {
      type: Boolean, default: true
    },
    showSearch: {
      type: Boolean, default: true
    },
    showClassItem: {
      type: Boolean, default: false
    },
    showRefresh: {
      type: Boolean, default: true
    },
    exportLoading: {
      type: Boolean, default: false
    },
    showAddAdsTitle: {
      type: String, default: '完成制作'
    },
    showAddAds: {
      type: Boolean, default: true
    },
    showDownLoad: {
      type: Boolean, default: true
    },
    total: {
      type: Number, default: 0
    },
    currentPage: {
      type: Number, default: 1
    },
    pageSize: {
      type: Number, default: 10
    },
    height: {
      type: Number, default: 520
    }
  },
  mounted () {
    
  },
  methods: {
    rowClassName (row, index) {
      return 'zzld-tr'
    },
    onProince (val) {
 
    },
    onCity (val) {

    },
    onArea (val) {

    },
    schoolLists (val) {
    },
    searchList () {
      this.$emit('on-search-list', this.searchItem, this.classItem)
    },
    addAds () {
      this.$emit('on-add')
    },
    onRefresh () {
      this.rotate = true
      setTimeout(() => {
        this.rotate = false
      }, 1000)
      this.$emit('on-refresh')
    },
    onSearch () {
      this.$emit('on-search', this.search)
    },
    modelChange () {
      this.$emit('on-model-change')
    },
    onChangePage (page) {
      this.$emit('on-change-page', page)
    }
  },
  data () {
    return {
      search: '',
      classItem:'',
      searchItem: {
        province: '',
        city: '',
        area: '',
        school: '',
        user_banjima: '',
        user_nianjima: '',
        pageNumber: 1,
        pageSize : 10
      },
      gradeList: [
        {
          code: '',
          name: ''
        }
      ],
      classList: [
        {
          code: '',
          name: ''
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
      rotate: false
    }
  }
}
</script>
