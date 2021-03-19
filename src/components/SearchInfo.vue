<template>
  <el-container id="app">
    <el-header id="waring_header">
      <el-input v-model="input" placeholder="请输入想要查询的内容" class="el-input">
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
      </el-input>
    </el-header>
    <el-main>
      <el-table
          border
          v-loading="loading"
          height="400"
          element-loading-text="正在加载,请稍后"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="use_real_name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="use_sex"
            label="性别"
            width="180">
        </el-table-column>
        <el-table-column
            prop="use_address"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="use_email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="use_age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="use_astro"
            label="星座">
        </el-table-column>
        <el-table-column
            prop="use_nation"
            label="民族">
        </el-table-column>
        <el-table-column
            prop="use_school"
            label="学校">
        </el-table-column>
        <el-table-column
            prop="use_birthplace"
            label="出生地">
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total=pageCount
          @current-change="changePage">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>

import axios from "axios";

export default {
  name: "SearchInfo",
  data() {
    return {
      options: [{
        value: '1',
        label: '姓名'
      }, {
        value: '2',
        label: '邮箱'
      }, {
        value: '3',
        label: '地址'
      },],
      value: '',
      input: '',
      tableData: [],
      loading: false,
      pageCount: 1,
    }
  },

  methods: {
    searchInfo() {
      this.loading = true
      console.log(this.value)
      if (this.value === '1') {
        this.searchByName(1, this.input)
      } else if (this.value === '2') {
        this.searchByEmail(1, this.input)
      } else if (this.value === '3') {
        this.searchByAddress(1, this.input)
      } else {
        this.value = '姓名';
        this.searchByName(1, this.input)
      }
    },

    changePage(page) {
      this.loading = true
      if (this.value === '1') {
        this.searchByName(page, this.input)
      } else if (this.value === '2') {
        this.searchByEmail(page, this.input)
      } else if (this.value === '3') {
        this.searchByAddress(page, this.input)
      } else {
        this.value = '姓名';
        this.searchByName(page, this.input)
      }
    },

    searchByName(page, name) {
      axios.get('http://widealpha.top:8000/social?name=' + name + '&page=' + page + '&limit=' + 10)
          .then(response => {
            this.pageCount = response.data['count']
            this.tableData = response.data['list']
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.loading = false)
    },
    searchByAddress(page, address) {
      axios.get('http://widealpha.top:8000/social?address=' + address + '&page=' + page + '&limit=' + 10)
          .then(response => {
            this.pageCount = response.data['count']
            this.tableData = response.data['list']
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.loading = false)
    },
    searchByEmail(page, email) {
      axios.get('http://widealpha.top:8000/social/?email=' + email + '&page=' + page + '&limit=' + 10)
          .then(response => {
            this.pageCount = response.data['count']
            this.tableData = response.data['list']
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.loading = false)
    },
  },

  mounted() {
    this.$notify({
      title: '提示',
      message: '本网页仅用于学习用途,请勿用作其他任何用途',
      type: 'warning',
    });
  }
}

</script>

<style>

.el-select .el-input {
  width: 130px;
}

#waring_header {
  margin-top: 20px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>