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
                    <div>
                        <div class="square" :class="type == 'SL' ? 'square_left' : 'square_right'">
                            <div class="left_btn" v-if="type == 'SL'">
                                <div class="square_left_right_player" @click="btnClick('player', 'left')">
                                    运动员
                                    <div class="num left_num" v-if="left.player != 0">{{ left.player }}</div>
                                </div>
                                <div class="square_left_right_player" @click="btnClick('equipment', 'left')">
                                    器械
                                    <div class="num left_num" v-if="left.equipment != 0">{{ left.equipment }} </div>
                                </div>
                            </div>
                            <div class="bottom_btn" v-if="type == 'SL'">
                                <div class="square_top_bottom_player" @click="btnClick('player', 'bottom')">
                                    运动员
                                    <div class="num top_num" v-if="bottom.player != 0">{{ bottom.player }}</div>
                                </div>
                                <div class="square_top_bottom_player" @click="btnClick('equipment', 'bottom')">
                                    器械
                                    <div class="num top_num" v-if="bottom.equipment != 0">{{ bottom.equipment }}</div>
                                </div>
                            </div>

                            <div class="right_btn" v-if="type == 'SR'">
                                <div class="square_left_right_player" @click="btnClick('player', 'right')">
                                    运动员
                                    <div class="num right_num" v-if="right.player != 0">{{ right.player }}</div>
                                </div>
                                <div class="square_left_right_player" @click="btnClick('equipment', 'right')">
                                    器械
                                    <div class="num right_num" v-if="right.equipment != 0">{{ right.equipment }}</div>
                                </div>
                            </div>
                            <div class="top_btn" v-if="type == 'SR'">
                                <div class="square_top_bottom_player" @click="btnClick('player', 'top')">
                                    运动员
                                    <div class="num top_num" v-if="top.player != 0">{{ top.player }}</div>
                                </div>
                                <div class="square_top_bottom_player" @click="btnClick('equipment', 'top')">
                                    器械
                                    <div class="num top_num" v-if="top.equipment != 0">{{ top.equipment }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="score" :class="'score_' + type">{{ '-' + Math.abs(totalScore).toFixed(1) }}</div>
                </div>
            </div>
            <div class="footer">
                <div class="btn_outer btn_outer_normal">
                    <div class="btn_inner_normal" @click="back()">返回</div>
                </div>
                <div class="btn_outer btn_outer_normal">
                    <div class="btn_inner_normal" @click="rollback()">撤销</div>
                </div>
                <div class="btn_outer btn_outer_normal">
                    <div class="btn_inner_normal" @click="reset()">重置</div>
                </div>
                <div class="btn_outer btn_outer_submit">
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
            type: this.$route.query.type,
            top: { player: 0, equipment: 0 },
            right: { player: 0, equipment: 0 },
            bottom: { player: 0, equipment: 0 },
            left: { player: 0, equipment: 0 },
            operationHistory: [],
            totalScore: 0,
            matchField: null,
            waiting: false,
            checkedProjectName: null,
            checkedMode: []
        }
    },
    methods: {
        getRefeeType,
        btnClick (type, location) {
            if ('top' === location) {
                this.top[type] = this.top[type] + 1
            } else if ('right' === location) {
                this.right[type] = this.right[type] + 1
            } else if ('bottom' === location) {
                this.bottom[type] = this.bottom[type] + 1
            } else if ('left' === location) {
                this.left[type] = this.left[type] + 1
            }
            this.totalScore += 0.3
            this.operationHistory.push({ type: type, location: location })
        },
        rollback () {
            if (this.operationHistory.length > 0) {
                const index = this.operationHistory.length - 1
                const lastSetp = this.operationHistory[index]
                if ('top' === lastSetp.location) {
                    this.top[lastSetp.type] = this.top[lastSetp.type] - 1
                } else if ('right' === lastSetp.location) {
                    this.right[lastSetp.type] = this.right[lastSetp.type] - 1
                } else if ('bottom' === lastSetp.location) {
                    this.bottom[lastSetp.type] = this.bottom[lastSetp.type] - 1
                } else if ('left' === lastSetp.location) {
                    this.left[lastSetp.type] = this.left[lastSetp.type] - 1
                }
                this.totalScore -= 0.3
                this.operationHistory.splice(index, 1)
            }
        },
        reset () {
            this.top = { player: 0, equipment: 0 }
            this.right = { player: 0, equipment: 0 }
            this.bottom = { player: 0, equipment: 0 }
            this.left = { player: 0, equipment: 0 }
            this.operationHistory = []
            this.totalScore = 0
        },
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
            this.top = { player: 0, equipment: 0 }
            this.right = { player: 0, equipment: 0 }
            this.bottom = { player: 0, equipment: 0 }
            this.left = { player: 0, equipment: 0 }
            this.operationHistory = []
            this.totalScore = 0
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
            let valData = {
                refereeType: this.getRefeeType(this.refeeType),
                matchId: this.matchId,
                matchField: this.matchField,
                score: this.totalScore.toFixed(1),
                type: this.checkedProjectName,
                mode: this.checkedMode.join(','),
                refereeNum: this.refeeType,
                name: this.refeeName,
                groupNum: this.groupNum,
                param: this.computeParams()
            }
            Toast.loading({
                duration: 0,
                message: '正在提交分数...',
                forbidClick: false
            })
            this.$api.match.eurhythmics(valData).then(res => {
                // Toast.clear()
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
        computeParams () {
            let params = {}
            if (this.type == 13) {
                params.leftPlayerNum = this.left.player
                params.leftWeaponNum = this.left.equipment
                params.bottomPlayerNum = this.bottom.player
                params.bottomWeaponNum = this.bottom.equipment
            } else {
                params.topPlayerNum = this.top.player
                params.topWeaponNum = this.top.equipment
                params.rightPlayerNum = this.right.player
                params.rightWeaponNum = this.right.equipment
            }
            return params
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
.top_line {
    background: chocolate;
    width: 300px;
    height: 50px;
}
.square {
    width: 300px;
    height: 300px;
    border-style: solid;
    border-width: 3px;
    position: relative;
}
.square_left {
    border-bottom-color: #2773d5;
    border-left-color: #2773d5;
    border-right-color: #4e4e4e;
    border-top-color: #4e4e4e;
}
.square_right {
    border-bottom-color: #4e4e4e;
    border-left-color: #4e4e4e;
    border-right-color: #2773d5;
    border-top-color: #2773d5;
}
.top_btn {
    position: absolute;
    top: -65px;
    width: 300px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bottom_btn {
    position: absolute;
    bottom: -65px;
    width: 300px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left_btn {
    position: absolute;
    top: 0px;
    left: -65px;
    height: 300px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.right_btn {
    position: absolute;
    top: 0px;
    right: -65px;
    height: 300px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.square_top_bottom_player {
    background: #2773d5;
    text-align: center;
    color: white;
    width: 45%;
    height: 30px;
    font-size: 21px;
    border-radius: 5px;
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.square_left_right_player {
    background: #2773d5;
    text-align: center;
    color: white;
    height: 45%;
    width: 30px;
    font-size: 21px;
    border-radius: 5px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.footer {
    padding: 0px 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn_outer {
    width: 22%;
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
.btn_outer_normal {
    background: linear-gradient(to right, #475a6b ,#1f212e);
}
.btn_outer_submit {
    background: linear-gradient(to right, #edb68d ,#ca9b87);
}
.btn_inner_normal {
    background: linear-gradient(to top right, #1d1f2b ,#253449);
}
.btn_inner_submit {
    background: linear-gradient(to top right, #ce9979 ,#f7bc90);
}
.num {
    width: 25px;
    height: 25px;
    background: #2773d5;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.top_num {
    position: absolute;
    top: -12px;
    right: -10px;
}
.left_num {
    position: absolute;
    top: -15px;
    left: -15px;
}
.right_num {
    position: absolute;
    top: -15px;
    right: -15px;
}
.score {
    color: white;
    font-size: 80px;
    font-weight: bold;
}
.score_SL {
    margin-top: 100px;
}
.score_SR {
    margin-top: 50px;
}
</style>
