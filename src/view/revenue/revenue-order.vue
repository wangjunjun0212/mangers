<template>
  <div>
    <Card class="margin-bottom-20">
      <Row class="padding-left-8">
        <Col span="3">
          <Cascader :data="data" v-model="value1" placeholder="请选择城市"></Cascader>
        </Col>
        <Col span="3" offset="1">
          <Cascader :data="data" v-model="value1" placeholder="请选择区域"></Cascader>
        </Col>
        <Col span="3" offset="1">
          <Cascader :data="data" v-model="value1" placeholder="请选择学校"></Cascader>
        </Col>
        <Col span="3" offset="1">
          <Cascader :data="data" v-model="value1" placeholder="请选择年级"></Cascader>
        </Col>
        <Col span="3" offset="1">
            <DatePicker type="daterange" confirm placement="bottom-end" placeholder="请选择日期" style="width: 200px"></DatePicker>
        </Col>
        <Col span="3" offset="3">
          <Button span="4" type="info">搜索</Button>
        </Col>
      </Row>
    </Card>
    <Row>
      <Col span="20">
        <h2><Divider type="vertical" class="blue"/>订单明细<span class="font14 padding-left-10">（未排除坏账）</span></h2>
      </Col>
      <Col span="2" offset="1">
          <Button type='info'  icon="md-download" :loading="exportLoading" @click="exportExcel">导出表格</Button>
      </Col>
    </Row>
    <!-- </Card> -->
    <Card class="margin-top-10 margin-bottom-20">
      <Row>
        <Table height="360" :columns="tableTitle" :data="tableData" class="margin-bottom-20"></Table>
      </Row>
      <Page :total="100" show-total />
    </Card>
  </div>
</template>
<style lang="less">
    @import "./common.less";
</style>
<script>
import excel from '@/libs/excel'
export default {
  name: 'export-excel',
  data () {
    return {
      exportLoading: false,
      value1: [],
      data: [{
          value: 'beijing',
          label: '北京',
          children: [
              {
                  value: 'gugong',
                  label: '故宫'
              },
              {
                  value: 'tiantan',
                  label: '天坛'
              },
              {
                  value: 'wangfujing',
                  label: '王府井'
              }
          ]
      }],
      tableTitle: [
        {
          width:100,
          title: '支付时间',
          key: 'category1',
          align: 'center'
        },
        {
          width:104,
          title: '账号',
          key: 'category2',
          align: 'center'
        },
        {
          width:60,
          title: '省份',
          key: 'category3',
          align: 'center'
        },
        {
          width:80,
          title: '地市',
          key: 'category4',
          align: 'center'
        },
        {
          width:80,
          title: '区域',
          key: 'category5',
          align: 'center'
        },
        {
          width:126,
          title: '学校',
          key: 'category6',
          align: 'center'
        },
        {
          width:100,
          title: '班级',
          key: 'category7',
          align: 'center'
        },
        {
          width:100,
          title: '支付方式',
          key: 'category8',
          align: 'center'
        },
        {
          width:180,
          title: '订单内容',
          key: 'category9',
          align: 'center'
        },
        {
          width:80,
          title: '有效期',
          key: 'category10',
          align: 'center'
        },
        {
          width:100,
          title: '订单金额',
          key: 'category11',
          align: 'center'
        },
      ],
      tableData: [
        {
          category1: '2018-09-25 13:49:30',
          category2: '136****9794',
          category3: '宁夏',
          category4: '银川市',
          category5: '兴庆区',
          category6: '唐中宝湖校区',
          category7: '七年级11班',
          category8: '手机微信',
          category9: '银川初中英语听说人机对话训练系统（个人版E卡）',
          category10: '3年',
          category11: '766元'
        },
        {
          category1: 4,
          category2: 5,
          category3: 6
        },
        {
          category1: 4,
          category2: 5,
          category3: 6
        },
        {
          category1: 4,
          category2: 5,
          category3: 6
        },
        {
          category1: 4,
          category2: 5,
          category3: 6
        },{
          category1: 4,
          category2: 5,
          category3: 6
        },
        {
          category1: 4,
          category2: 5,
          category3: 6
        },
        {
          category1: 7,
          category2: 8,
          category3: 9
        }
      ]
    }
  },
  methods: {
    exportExcel () {
      if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['一级分类', '二级分类', '三级分类'],
          key: ['category1', 'category2', 'category3'],
          data: this.tableData,
          autoWidth: true,
          filename: '分类列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

