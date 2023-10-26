<template>
    <div class="empty">
        <van-empty :description="!matchField ? '比赛还未开始请等待监督裁判指定比赛场次' : '您的打分数据已上传,监督裁判确认分数中,请稍后...'" >
            <div style="width: 100%; text-align: center;color: #969799;font-size: 18px;margin-bottom: 30px;">
                {{groupNum + '组'}} - {{ refeeTypeName }} - {{ refeeUserName }}
            </div>
            <div class="btn_outer btn_outer_normal" style="width: 300px;">
                <div class="btn_inner_normal" @click="pullRunningField()">拉取正在进行中的比赛</div>
            </div>
            <div class="btn_outer btn_outer_normal" style="width: 300px; margin-top: 20px;">
                <div class="btn_inner_normal" @click="back()">重新选择裁判</div>
            </div>
        </van-empty>
    </div>
</template>
<script>
import { Toast, Dialog } from 'vant'
export default {
    props: {
        matchField: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            matchId: this.$route.query.matchId,
            refeeType: this.$route.query.type, // 当前选择的裁判类型
            refeeTypeName: this.$route.query.refeeTypeName, // 裁判类型名称
            refeeUserName: this.$route.query.refeeName, // 输入的裁判姓名
            groupNum: this.$route.query.groupNum,   // 当前裁判所在的组, 如果是0表示该裁判没有分组
            refeeName: this.$route.query.refeeName
        }
    },
    methods: {
        pullRunningField () {
            console.log('拉取正在进行中的比赛')
            this.$emit('pullRunningField')
        },
        back () {
            Dialog.confirm({
                title: '提示',
                message: '确定重新选择裁判角色？'
            }).then(() => {
                Toast.loading({
                    duration: 0,
                    message: '加载中...',
                    forbidClick: false
                })
                this.$api.match.unbindRefree(this.matchId, this.refeeName).then(res => {
                    Toast.clear()
                    if (res.status === 0) {
                        this.$router.back()
                    } else {
                        Toast(res.msg)
                    }
                }).catch(() => {
                    Toast.clear()
                })
            })
        },
    }
}
</script>
<style scoped>
.header {
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 21px;
    padding: 30px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn_outer {
    width: 27%;
    height: 50px;
    border-radius: 30px;
    padding: 3px;
    margin-right: 20px;
    margin-left: 20px;
}
.btn_outer div {
    height: 100%;
    width: 100%;
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
}
.btn_outer_submit {
    background: linear-gradient(to right, #edb68d ,#ca9b87);
}
.btn_inner_submit {
    background: linear-gradient(to top right, #ce9979 ,#f7bc90);
}
.btn_outer_normal {
    background: linear-gradient(to right, #475a6b ,#1f212e);
}
.btn_inner_normal {
    background: linear-gradient(to top right, #1d1f2b ,#253449);
}
.empty {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.van-empty /deep/ .van-empty__description {
    font-size: 18px;
}
</style>
