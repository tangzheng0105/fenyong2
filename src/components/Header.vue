<template>
    <div>
        <div class="header">
            <div @click="headerChoose(index)" v-for="(item,index) in headerList" class="header-item">
                <div class="header-item-img" :class="{'header-active': item.active}"><img src="../assets/activity.png" alt=""></div>
                <div class="header-item-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'header',
    data() {
        return {
            headerList: [
                { name: '今日', active: true },
                { name: '昨日', active: false },
                { name: '本周', active: false },
                { name: '本月', active: false },
                { name: '上月', active: false }
            ],
            headerActive: 'header-active',
            userInfo: {}
        }
    },
    methods: {
        headerChoose: function(index) {
            let that = this
            let _dateType = ['Day', 'Yesterday', 'Week', 'Month', 'LastMonth']
            console.log('Choosing......', index)
            this.headerList.forEach(function(element) {
                element.active = false
            }, this);
            this.headerList[index].active = true
            // 获取自身代理数据
            this.myPost('/commission/getUserInfo', {
                userCode: that.userCode,
                dateType: _dateType[index]
            }).then( res => {               
               that.$emit('changeDateType', res.data.Data);           
            })
            // 获取代理数据
            this.myPost('/commission/getAgent', {
                userCode: that.userCode,
                dateType: _dateType[index]
            }).then( res => { 
               console.log('getAgent',res.data.Data)               
               that.$emit('getAgent', res.data.Data);           
            })

            // 获取订单数据
            this.myPost('/commission/getOrder', {
                userCode: that.userCode,
                dateType: _dateType[index],
                pages: 0
            }).then( res => { 
               console.log('getOrder',res.data.Data,_dateType[index])               
               that.$emit('getOrder', {data:res.data.Data, dateType: _dateType[index] });           
            })
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    overflow: hidden;
}

.header-item {
    width: 20%;
    float: left;
}

.header-item .header-item-img img {
    margin: 0 auto;
    max-width: 70%;
    height: auto;
    position: absolute;
    top: 8px;
    left: 7px;
}

.header-item-img {
    background-color: #888;
    height: 50px;
    width: 50px;
    border-radius: 40px;
    margin: 0 auto;
    position: relative;
}

.header-active {
    background-color: #00BFFF;
}

.header-item-name {
    text-align: center;
    font-size: 14px;
    margin-top: 6px;
    color: #888;
}
</style>

