<template>
  <Card dis-hover style="margin-bottom:20px;border:none">
      <div slot="title">
        <Row style="padding-bottom:20px;border-bottom:1px solid #f5f7f9;margin-bottom:20px">
          <ul class="select-list">
            <li>
              <Select placeholder="请选择教材" @on-change="onChangeMaterial" v-model="search.jclx">
                <Option v-for="item in materialList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择学段" @on-change="onChangeOpt" v-model="search.xd">
                <Option v-for="item in periodList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择年级" @on-change="onClassOpt"  clearable v-model="search.nj">
                <Option v-for="item in gradeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择上下册" @on-change="onUsingOpt" v-model="search.sxc">
                <Option v-for="item in usingList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
              <Select placeholder="请选择单元" v-model="search.dy">
                <Option v-for="item in unitList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </li>
          </ul>
          <div class="fr mr20">
            <Button size="large" icon="ios-search" type="primary" shape="circle" :loading="exportLoading" @click.native="searchList">搜索</Button>
          </div>
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
              <li v-if="showAddAds" class="ml10" style="width:136px;">
                <Button type="primary" shape="circle" icon="android-add" size="large" @click.native="addAds">{{showAddAdsTitle}}</Button>            
              </li>
              <li v-if="showSearch" class="ml20 mr20">
                <Input class="search" v-model="search" icon="ios-search" placeholder="搜索..." size="large" @click.native="onSearch"></Input>           
              </li>
              <li v-if="showRefresh" class="left-line">
                <Tooltip content="刷新" style="padding-left:10px;">
                    <Icon type="ios-refresh" size="32" @click.native="onRefresh" :class="{'rotate-center' : rotate}"/>
                </Tooltip>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Table height="520"
        :columns="columns"
        :row-class-name="rowClassName"
        :data="listdata"
      ></Table>
      <Page
        style="margin-top:20px"
        :total="total"
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
  width:120px;
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
  name: 'TextList',
  props: {
    spinShow: {
      type: Boolean, default: true
    },
    topTitle: {
      type: String, default: '信息列表'
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
    showSchool: {
      type: Boolean, default: true
    },
    showClass: {
      type: Boolean, default: true
    },
    showSearch: {
      type: Boolean, default: true
    },
    showRefresh: {
      type: Boolean, default: true
    },
    exportLoading: {
      type: Boolean, default: false
    },
    // onOptClass: {
    //   type: String, default: ''
    // },
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
    pageSize: {
      type: Number, default: 10
    },
    materialList: {
      type: Array, default: []
    },
    periodList: {
      type: Array, default: []
    },
    gradeList: {
      type: Array, default: []
    },
    usingList: {
      type: Array, default: []
    },
    unitList: {
      type: Array, default: []
    }
  },
  methods: {
    rowClassName (row, index) {
      return 'zzld-tr'
    },
    searchList () {
      this.$emit('on-search-list',this.search)
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
    startHandle () {
      switch (this.selects.length) {
        case 0:
          this.$Message.info('最少选择一条数据')
          break
        case 1:
          this.$emit('on-start', this.selects[0].id)
          break
        default:
          this.$Message.info('最多选择一条数据')
          break
      }
    },
    onChangePage (page) {
      this.$emit('on-change-page', page)
    },
    onChangeOpt (val) {
      this.onOptClass = ''
      this.$emit('on-change-opt', val, this.onOptClass)
    },
    onChangeMaterial (val) {
      this.$emit('on-change-Material', val)
    },
    onClassOpt (val) {
      this.$emit('on-class-opt', val)
    },
    onUsingOpt (val) {
      this.$emit('on-using-opt', val)
    },
    exportExcel () {
      this.$emit('on-download', this.selects)
    }
  },
  data () {
    return {
      lists: [],
      search: {
        jclx: '',
        xd: '',
        nj: '',
        sxc: '',
        dy: '',
        pageNumber: 1,
        pageSize : 10
      },
      onOptClass: '',
      rotate: false
    }
  }
}
</script>
