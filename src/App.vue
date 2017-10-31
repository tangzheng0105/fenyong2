<template>
  <div id="app">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="index">
        <Index></Index> 
      </mt-tab-container-item>
      <mt-tab-container-item id="partner">
        <Partner></Partner> 
      </mt-tab-container-item>
      <mt-tab-container-item id="order">
        <Order></Order>
      </mt-tab-container-item>
      <mt-tab-container-item id="mine">
        正在紧张的开发中....敬请期待....
      </mt-tab-container-item>
    </mt-tab-container>
    <Tabbar @choose="choose"></Tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import Tabbar from './components/Tabbar.vue';
import Index from './components/index/Index.vue';
import Partner from './components/partner/Partner.vue';
import Order from './components/order/Order.vue';
import { TabContainer, TabContainerItem } from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
  name: 'app',
  data() {
    return {
      active: "index",
      selected: true
    }
  },
  methods: {
    choose: function(e) {
      console.log('choosing...', e)
      this.active = e
    }
   },
  mounted() {
    
  },
  components: {
    Tabbar,
    Index,
    Partner,
    Order
  }
}
</script>

<style>

</style>
