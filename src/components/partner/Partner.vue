<template>
    <div>
        <my-header v-on:getAgent="getAgent"></my-header>
         
        <div>
            <div class="partner-list-item">
                <div class="partner-list-title">
                    <table width='100%'>
                        <tr>
                            <td>{{userInfo.personal.nickName}}</td>
                            <td style="text-align: right"></td>                            
                        </tr>
                    </table>
                </div>
                <div class="partner-list-info">
                    <table width='100%'>
                        <tr>
                            <td>订单：{{userInfo.personal.orderSum}}</td>
                            <td>他的预估：{{userInfo.personal.tempSum}}</td>
                            <td>我的提成：{{userInfo.personal.moneySum}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <h4 class="partner-list-header">下一级合伙人:</h4>
        <div class="partner-list">
            <div v-for="item in userInfo.Sublevel" class="partner-list-item">
                <div class="partner-list-title">
                    <table width='100%'>
                        <tr>
                            <td>{{item.nickName}}</td>
                            <td @click="checkNext(item.userCode)" style="text-align: right">查看他的下级>></td>                            
                        </tr>
                    </table>
                </div>
                <div class="partner-list-info">
                    <table width='100%'>
                        <tr>
                            <td>订单：{{item.orderSum}}</td>
                            <td>他的预估：{{item.tempSum}}</td>
                            <td>我的提成：{{item.moneySum}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from '../Header.vue'
export default {
    name: 'partner',
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        checkNext(userCode) {
            let that = this
            this.myPost('/commission/getAgent', {
                    userCode: userCode,
                    dateType: 'Day'
            }).then( res => {                
                that.userInfo = res.data.Data
            })
        },
        getAgent(userInfo) {
            let that = this
            console.log('代理数据的转变',userInfo)
        }
    },
    mounted() {
        let that = this
        this.myPost('/commission/getAgent', {
                userCode: that.userCode,
                dateType: 'Day'
        }).then( res => {            
            that.userInfo = res.data.Data
        })
    },
    components: {
        MyHeader
    }
}
</script>

<style scoped>
.partner-list {
    padding-bottom: 60px;
    font-size: 16px;
    color: #888;
}
.partner-list-item {
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.partner-list-title {
    border-bottom: 1px solid #ccc;
}
.partner-list-item td {
    padding: 6px 6px;
}
.partner-list-header {
    padding-left: 10px;
}
</style>

