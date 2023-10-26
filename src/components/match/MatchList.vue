<template>
    <div class="page">
        <div class="page_content">
            <div v-if="list.length > 0">
                <div class="item" @click="itemClick(item)" v-for="(item, index) in list" :key="index">
                    <img :src="item.logo"/>
                    <div class="datas">
                        <div class="title">{{ item.title }}</div>
                        <div class="center_line">
                            <div class="time">
                                <van-icon name="clock-o" />&nbsp;&nbsp;{{ item.beginTime.split(' ')[0] }} ~ {{ item.endTime.split(' ')[0] }}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <van-icon name="location-o" />&nbsp;&nbsp;{{ item.address }}
                            </div>
                        </div>
                        <span class="status">进行中</span>
                    </div>
                </div>
            </div>
            <div class="empty" v-else>
                <van-empty description="该账号暂无授权赛事" />
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data () {
        return {
            list: []
        }
    },
    mounted () {
      this.matchList()
    },
    methods: {
        matchList () {
            Toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: false
            })
            this.$api.match.matchList().then(res => {
                Toast.clear()
                if (res.status === 0) {
                    this.list = res.data
                } else {
                    Toast(res.msg)
                }
            }).catch(err => {
                Toast(err)
                Toast.clear()
            })
        },
        itemClick (match) {
            this.$router.push({
                // path: '/refreeRole',
                path: '/refreeRoleGroup',
                query: { matchId: match.id, matchName: match.title }
            })
        }
    }
}
</script>
<style scoped>
.page {
    height: 100vh;
    background: #343d4c;
}
.page_content {
    padding: 10px;
}
.item {
    background: #000000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 20px;
    color: white;
    margin-bottom: 10px;
}
img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
}
.datas {
    margin-left: 20px;
    margin-right: 10px;
}
.title {
    font-weight: 600;
    font-size: 21px;
}
.center_line {
    display: inline;
}
.time {
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.status {
    background: #2773d5;
    padding: 5px 10px;
    border-radius: 5px;
}
.empty {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
