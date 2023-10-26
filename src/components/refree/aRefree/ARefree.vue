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
            <table>
                <tr class="header">
                    <td>艺术错误</td>
                    <td colspan="10">扣分</td>
                </tr>
                <tr class="body" v-for="(item, index) in tableColumns" :key="index">
                    <td style="width: 30%;" v-if="!item.nameHidden" :rowspan="item.rowspan">
                        <div style="font-weight: bold;">{{ item.name }}</div>
                        <div class="desc" v-if="item.subName" v-html="item.subName"></div>
                    </td>
                    <td style="width: 7%;" :class="score.checked ? 'active' : ''" v-for="(score, sIndex) in item.values" :key="sIndex" @click="scoreClick(item, score)">
                        {{ score.score }}
                        <div class="desc" v-if="score.msg">{{ score.msg }}</div>
                    </td>
                </tr>
                <tr class="table_footer">
                    <td>艺术错误</td>
                    <td colspan="10">{{ computeTotalScore() == 0 ? '' : '-' + computeTotalScore() }}</td>
                </tr>
            </table>
            <div class="footer">
                <div class="btn_outer btn_outer_normal">
                    <div class="btn_inner_normal" @click="back()">返回</div>
                </div>
                <div class="btn_outer btn_outer_submit">
                    <div class="btn_inner_submit" @click="submit">提交</div>
                </div>
            </div>
        </div>
        <refree-empty v-show="!matchField || waiting" @pullRunningField="$refs.scoreHeader.pullRunningField()" :matchField="this.matchField"></refree-empty>
    </div>
</template>
<script>
import { Toast, Dialog } from 'vant'
import ScoreHeader from '@/components/common/ScoreHeader'
import RefreeEmpty from '@/components/common/RefreeEmpty'
import { columns, teamColumns, getRefeeType } from '@/utils/aFreeColums'
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
            tableColumns: [],  // JSON.parse(JSON.stringify(columns))
            matchField: null,
            waiting: false,
            checkedProjectName: null,
            checkedMode: []
        }
    },
    methods: {
        getRefeeType,
        scoreClick (row, score) {
            const s = score.score
            if (!s)
                return

            const checked = score.checked
            score.checked = !checked
            let rowName = row.name
            const sameRow = this.tableColumns.filter(item => {
                if (item.name === rowName) {
                    return item
                }
            })
            // 将相同指标的其他分数设置为未选中状态
            for (let i = 0; i < sameRow.length; i++) {
                const values = sameRow[i].values
                for (let j = 0; j < values.length; j++) {
                    const valueScore = values[j].score
                    if (valueScore !== s) {
                        values[j].checked = false
                    }
                }
            }
        },
        // 计算总的扣分
        computeTotalScore () {
            let totalScore = 0
            this.tableColumns.forEach(row => {
                row.values.forEach(value => {
                    if (value.checked) {
                        totalScore += Number.parseFloat(value.score)
                    }
                })
            })
            return totalScore.toFixed(2)
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
                score: this.computeTotalScore(),
                type: this.checkedProjectName,
                mode: this.checkedMode.join(','),
                refereeNum: this.refeeType,
                name: this.refeeName,
                groupNum: this.groupNum,
                param: this.calParam()
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
                    Toast('分数上传成功，等待监督裁判响应')
                    // this.waiting = true
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
        },
        calParam () {
            let obj = {}
            this.tableColumns.forEach(row => {
                row.values.forEach(value => {
                    if (value.checked) {
                        obj[row.enName] = Number.parseFloat(value.score)
                    }
                })
            })
            return obj
        },

        projectChange (args) {
            this.checkedProjectName = args
        },
        modeChange (args) {
            this.checkedMode = args
        },
        fieldChange (field, playerName) {
            console.log('fieldChange  field', field, 'playerName', playerName)
            this.matchField = field
            this.waiting = false
            const playerNameAry = playerName.split(',')
            if (playerNameAry.length == 1) {
                this.tableColumns = JSON.parse(JSON.stringify(columns))
            } else {
                this.tableColumns = JSON.parse(JSON.stringify(teamColumns))
            }
        },
        newField (field, playerName) {
            console.log('newField  field', field, 'playerName', playerName)
            this.matchField = field
            this.waiting = false
            // this.checkedProjectName = null
            // this.checkedMode = []
            const playerNameAry = playerName.split(',')
            if (playerNameAry.length == 1) {
                this.tableColumns = JSON.parse(JSON.stringify(columns))
            } else {
                this.tableColumns = JSON.parse(JSON.stringify(teamColumns))
            }
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
table{
    border-bottom:1px solid #898989;
    border-right:1px solid #898989;
    color: white;
    margin-top: 20px;
    border-spacing: 0;
}
table td{
    border-left: 1px solid #898989;
    border-top: 1px solid #898989;
}
table .header td {
    height: 40px;
    text-align: center;
    background: #000000;
}
table .body td{
    height: 40px;
    text-align: center;
}
.active {
    background: #2773d5;
}
.desc {
    font-size: 12px;
    white-space: pre-line;
}
table .table_footer td {
    height: 40px;
    text-align: center;
    background: #000000;
}
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex: 1;
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
