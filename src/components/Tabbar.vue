<template>
  <div>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="index">
        <img slot="icon" src="../assets/homepage.png"> 首页
      </mt-tab-item>
      <mt-tab-item id="partner">
        <img slot="icon" src="../assets/group.png"> 合伙人
      </mt-tab-item>
      <mt-tab-item id="order">
        <img slot="icon" src="../assets/order.png"> 订单
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="../assets/addressbook.png"> 报表
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: 'index'
    }
  },
  watch: {
    selected(newval, oldval) {
      console.log(newval)
      this.$emit('choose', newval);
    }
  }
}
</script>

<style>

</style>
