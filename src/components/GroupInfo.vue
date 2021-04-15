<template>
  <el-container>
    <el-header id="waring_header">
      <el-input v-model="input" placeholder="请输入中心QQ号/QQ群号" class="el-input">
        <el-select v-model="selectValue" slot="prepend" placeholder="请选择" style="width: 150px">
          <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
      </el-input>
    </el-header>
    <el-main class="el-main">
      <div id="main" style="width: 100%; height: 500px;"></div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios"
import * as echarts from 'echarts'

export default {
  name: "GroupInfo",
  data() {
    return {
      input: '',
      selectValue: '',
      selectOptions: [{
        value: '1',
        label: 'QQ号中心搜索'
      }, {
        value: '2',
        label: '群号中心搜索'
      },]
    }
  },
  methods: {
    doSearch() {
      if (this.selectValue === '1') {
        this.loadQQData()
      } else if (this.selectValue === '2') {
        this.loadQunData()
      } else if (this.selectValue.length === 0) {
        this.$message('选项不能为空')
      } else if (this.input.length === 0) {
        this.$message('QQ/QQ群号不能为空')
      } else {
        console.log('选项不合法')
      }
    },
    loadQQData() {
      let myChart = echarts.init(document.getElementById('main'));
      myChart.showLoading()
      axios.get('http://localhost:8000/group/qq', {
        params: {
          'qqNum': this.input
        }
      }).then((res) => {
        myChart.hideLoading()
        let graph = res.data
        let option = {
          title: {
            text: 'QQ群关系图',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {

          },
          legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'QQ群关系图',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              force: {
                repulsion: 2500,
                edgeLength: [5, 10]
              },
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                width: 2,
                // curveness: 0.3
              },
              emphasis: {
                // focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        }
        myChart.setOption(option)
        console.log(res.status)
      })
    },
    loadQunData() {
      let myChart = echarts.init(document.getElementById('main'));
      myChart.clear()
      myChart.showLoading()
      axios.get('http://localhost:8000/group/qun', {
        params: {
          'qunNum': this.input
        }
      }).then((res) => {
        myChart.hideLoading()
        let graph = res.data
        let option = {
          title: {
            text: 'QQ群关系图',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {
            "trigger": "item",
            "confine": true,
            "formatter": (p)=>{
              if (p.dataType === 'node'){
                if (p.data.id.startsWith('qq')){
                  return `昵称:${p.data.name}</br>QQ号码:${p.data.id.substr(2)}`
                } else {
                  return `群名称:${p.data.name}</br>群号码:${p.data.id.substr(3)}`
                }
              }
              if (p.dataType === 'edge'){
                return `关系:${p.data.source.substr(2)}->${p.data.target.substr(3)}</br>`
              }
            }
          },
          legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'QQ群关系图',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              force: {
                repulsion: 2500,
                edgeLength: [5, 10]
              },
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'target',
                width: 2,
                // curveness: 0.3
              },
              emphasis: {
                // focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        }
        myChart.setOption(option)
        console.log(res.status)
      })
    },
  }
}
</script>

<style scoped>
.el-main {
  margin: 0;
  padding: 0;
}
</style>