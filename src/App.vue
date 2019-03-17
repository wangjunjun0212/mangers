<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.formTitle {
    margin:10px auto 30px;
    font-size:20px;
    text-align: center
}
.select-width {
  width:170px !important;
}
.ivu-form .city .ivu-form-item-label {
  width:80px !important;
}
.ivu-form .city .ivu-form-item-content {
  margin-left:80px !important;
}
.ivu-modal {
  left:120px !important;
  // top:60px !important;
  // bottom: 0 !important;
  // width:78% !important;
}
.ivu-modal-footer {
  border:none !important
}
.ivu-form-item {
  float: left;
}
ul.watch-deatil {
  min-height: 300px;
  padding: 30px 0 0;
  margin:10px  0 0 20px
}
ul.watch-deatil label {
  color:#ccc;
  text-align: right;
  display: inline-block;
  width:100px;
  margin-right: 10px;
}
ul.watch-deatil li {
  float: left;
  width:40%;
  list-style: none;
  margin-bottom:20px;
}
.clearfix:after {
content: "";
display: block;
height: 0;
clear: both;
visibility: hidden;
}
.clearfix {
zoom: 1;
}
ul li {
  list-style: none;
}
</style>
