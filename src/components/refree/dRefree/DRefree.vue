<template>
    <div class="bg">
        <div class="content" v-show="matchField && !waiting">
            <score-header
                ref="scoreHeader"
                @reScore="waiting = false"
                @fieldChange="fieldChange"
                @projectChange="projectChange"
                @modeChange="modeChange"
                @newField="newField"
                @pushScoreSuccess="waiting = true"
            ></score-header>
            <div class="center">
                <div class="center_bg">
                    <input type="number" v-model="score" placeholder="请输入得分"/>
                </div>
            </div>
            <div class="footer">
                <div class="btn_outer btn_outer_normal" style="margin-right: 20px;">
                    <div class="btn_inner_normal" @click="back()">返回</div>
                </div>

                <div class="btn_outer btn_outer_submit" style="margin-left: 20px;">
                    <div class="btn_inner_submit" @click="submit()">提交</div>
                </div>
            </div>
        </div>
        <refree-empty v-show="!matchField || waiting" @pullRunningField="$refs.scoreHeader.pullRunningField()" :matchField="this.matchField"></refree-empty>
    </div>
</template>
<script>
import ScoreHeader from '@/components/common/ScoreHeader'
import RefreeEmpty from '@/components/common/RefreeEmpty'
import { Toast, Dialog } from 'vant'
import { getRefeeType } from '@/utils/aFreeColums'
export default {
    components: {
      ScoreHeader,
      RefreeEmpty
    },
    data () {
        return {
            matchId: this.$route.query.matchId,
            matchName: this.$route.query.matchName,
            refeeType: this.$route.query.type,
            refeeName: this.$route.query.refeeName,
            groupNum: this.$route.query.groupNum,
            matchField: null,
            waiting: false,
            checkedProjectName: null,
            checkedMode: [],
            score: null
        }
    },
    methods: {
        getRefeeType,
        fieldChange (args) {
            this.matchField = args
            this.waiting = false
        },
        projectChange (args) {
            this.checkedProjectName = args
        },
        modeChange (args) {
            this.checkedMode = args
        },
        newField (args) {
            this.matchField = args
            this.waiting = false
            // this.checkedProjectName = null
            // this.checkedMode = []
            this.score = null
        },
        submit () {
            if (this.checkedProjectName == null) {
                Dialog.alert({
                    title: '提示',
                    message: '请选择比赛项目',
                })
                return
            }
            if (this.checkedMode.length == 0) {
                Dialog.alert({
                    title: '提示',
                    message: '请选择比赛类型',
                })
                return
            }
            if (this.score == null) {
                Dialog.alert({
                    title: '提示',
                    message: '请输入得分',
                })
                return
            }
            let valData = {
                refereeType: this.getRefeeType(this.refeeType),
                matchId: this.matchId,
                matchField: this.matchField,
                score: Math.abs(this.score).toFixed(1),
                type: this.checkedProjectName,
                mode: this.checkedMode.join(','),
                refereeNum: this.refeeType,
                name: this.refeeName,
                groupNum: this.groupNum,
                param: null
            }
            Toast.loading({
                duration: 0,
                message: '正在提交分数...',
                forbidClick: false
            })
            this.$api.match.eurhythmics(valData).then(res => {
                Toast.clear()
                if (res.status === 0) {
                    // 提交成功，显示等待监督裁判确认分数弹出框
                    // this.waiting = true
                    Toast('分数上传成功，等待监督裁判响应')
                } else {
                    Toast(res.msg)
                }
            }).catch(() => {
                Toast.clear()
            })
        },
        back () {
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
        }
    }
}
</script>
<style scoped>
.bg {
    height: 100vh;
    background: linear-gradient(to right , #263248 ,#1d2532);
}
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.center {
    padding: 20px 20px 0px 20px;
}
.center_bg {
    background: #000000;
    width: 100%;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.footer {
    padding: 0px 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn_outer {
    width: 27%;
    height: 50px;
    border-radius: 30px;
    padding: 3px;
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

input {
    background: #000000;
    border-top: 0;
    border-bottom: 1px solid white;
    border-left: 0;
    border-right: 0;
    width: 80%;
    height: 100px;
    color: white;
    padding: 0px 10px 30px 10px;
    text-align: center;
    font-size: 60px;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color:  #000000;
}
::-webkit-input-placeholder {
    color: #666666;
}
:-moz-placeholder {
    color: #666666;
}
::-moz-placeholder {
    color: #666666;
}
:-ms-input-placeholder {
    color: #666666;
}
</style>
