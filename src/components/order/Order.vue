<template>
    <div class="order">
        <my-header v-on:getOrder="getOrder"></my-header>
        <div class="btn">
        <div class="search">
            <input class="my-input" style="text" v-model="value" />      
        </div>       
            <mt-button @click="search" placehold="请搜索订单名称或订单号" class="my-btn" type="primary">搜索</mt-button>
         </div>
        <div class="order-list">
            <div class="order-list-item" v-for="item in orderList">
                <div class="order-list-title">{{item.orderTitle}}</div>
                <div class="order-list-body">
                    <table width='100%'>
                        <tr>
                            <td>订单：{{item.orderCode}}</td>
                            <td>付款金额：{{item.money}}</td>
                        </tr>
                        <tr>
                            <td>订单状态：{{item.orderStatus}}</td>
                            <td> 工资：{{item.commission}}</td>
                        </tr>
                        <tr>
                            <td>下单时间：{{item.orderTime}}</td>
                            <td> 工资状态：工资未结</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-show="isShow" class="loadingMore" @click="myLoad">点击继续加载数据</div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import MyHeader from '../Header.vue'
import { Search, Cell, Button } from 'mint-ui';
let pages = 0

Vue.component(Search.name, Search);
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
export default {
    name: 'index',
    data() {
        return {
            value: '',
            orderList: [],
            dataType: 'Day',
            data: {},
            isShow: true
        }
    },
    methods: {
        getOrder(data) {   
            this.isShow = true 
           if(data.data.length < 10) {
                this.isShow = false
            }      
            this.orderList = data.data
            this.dateType = data.dateType
            pages = 0
            console.log('传参*********',data)      
        },
        myLoad() {
            let that = this
            pages += 1             
            console.log('isLoading...')
            this.myPost('/commission/getOrder', {
                userCode: that.userCode,
                dateType: that.dateType,
                pages: pages
            }).then( res => {  
            if(res.data.Data.length < 10) {
                that.isShow = false
            }               
                that.orderList = that.orderList.concat(res.data.Data)
            })         
           
        },
        search() {
        let that = this
        this.myPost('/commission/getOrder', {
            userCode: that.userCode,
            text: that.value,
            dateType: that.dateType,
            pages: 0
        }).then( res => {
            console.log('订单数据',res.data.Data)
            that.orderList = res.data.Data
            if(res.data.Data.length < 10) {
                that.isShow = false
            }
        })
        }
    },
    mounted() {
        let that = this
        this.myPost('/commission/getOrder', {
            userCode: that.userCode,
            dateType: that.dateType,
            pages: 0
        }).then( res => {
            console.log('订单数据',res.data.Data)
            that.orderList = res.data.Data
            if(res.data.Data.length < 10) {
                that.isShow = false
            }
        })
    },
    components: {
        MyHeader
    }
}
</script>

<style scoped>
.btn {
    overflow: hidden;
}

.my-input {
    height: 40px;
    width: 90%;
}
.search {
    margin-top: 10px;
    height: 53px;
    overflow: hidden;
    width:80%;
    float: left;
}

.loadingMore {
    font-size: 16px;
    padding-top: 6px;
    text-align: center;
}

.my-btn {
    margin-top: 10px;
    height:50px;
}

.order-list {
    width: 96%;
    padding: 6px;
    font-size: 12px;
    padding-bottom: 80px;
}

.order-list-item {
    background-color: #fff;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
}

.order-list-title {
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    padding: 2px;
}

.order-list-body {}
</style>

