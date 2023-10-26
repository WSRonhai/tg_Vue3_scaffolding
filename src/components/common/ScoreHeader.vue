<template>
    <div>
        <div class="header">
            <div style="width: 20px;height: 20px;"></div>
            <div>{{  matchName }}</div>
            <div style="width: 20px;height: 20px;">
                <img style="width: 20px;height: 20px;" v-if="socketStatus != null" :src="socketStatus == 0 ? disconnect : connecting"/>
            </div>
        </div>
        <div class="sub_header">
             <div class="column1">
                <div>{{ playerName.split(',').length == 1 ? '个人项目艺术得分' : '集体项目艺术得分' }}&nbsp;&nbsp;-&nbsp;&nbsp;{{ refeeTypeName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ refeeUserName }}</div>
                <div class="player">
                    <div>运动员: {{ playerName }}</div>
                    <div style="display: flex; align-items:center;">
                        代表队: {{ agencyName }}
                        <van-button v-if="cacheFieldData.length > 0" type="primary" size="small" style="margin-left: 20px;" @click="changeFieldShow = true">切换场次</van-button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div class="column2" v-if="playerName.split(',').length == 1">
                        <div class="project" :class="checkProjectIndex == index ? 'active' : ''" v-for="(item, index) in projects" :key="index" @click="projectClick(index)">
                            <img :src="item.icon"/>
                        </div>
                    </div>
                    <div class="column2" v-else>
                        <div class="team_project" :class="checkProjectIndex == index ? 'active' : ''" v-for="(item, index) in teamProjects" :key="index" @click="projectClick(index)">
                            {{ item.pName }}
                        </div>
                    </div>
                </div>
                <div class="column3">
                    <van-checkbox class="checkbox" shape="square" :name="1" v-model="checkBox[0]" @change="modelChange()">资格、全能</van-checkbox>
<!--                    <van-checkbox class="checkbox" shape="square" :name="2" v-model="checkBox[1]" @change="modelChange()">全能</van-checkbox>-->
                    <van-checkbox class="checkbox" shape="square" :name="2" v-model="checkBox[1]" @change="modelChange()">单项</van-checkbox>
                </div>
            </div>
        </div>
        <van-popup v-model:show="changeFieldShow" position="top" closeable>
            <div v-for="(item, index) in cacheFieldData" :key="index" class="field_item" @click="changeFieldByPerson(item)">
                场次号：{{ item.Data.MatchField }}  运动员：{{ item.Data.PlayerName }}  代表队：{{ item.Data.AgencyName }}
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { Toast } from 'vant'
export default {
    data () {
        return {
            matchId: this.$route.query.matchId,
            matchName: this.$route.query.matchName,
            refeeType: this.$route.query.type, // 当前选择的裁判类型
            refeeTypeName: this.$route.query.refeeTypeName, // 裁判类型名称
            refeeUserName: this.$route.query.refeeName, // 输入的裁判姓名
            groupNum: this.$route.query.groupNum,   // 当前裁判所在的组, 如果是0表示该裁判没有分组
            playerName: '',
            agencyName: null,
            matchField: null,
            projects: [
                { pType: 5, pName: '徒手', icon: require('@/assets/icons/tushou.png') },
                { pType: 6, pName: '绳', icon: require('@/assets/icons/sheng.png') },
                { pType: 1, pName: '圈', icon: require('@/assets/icons/quan.png') },
                { pType: 2, pName: '球', icon: require('@/assets/icons/qiu.png') },
                { pType: 3, pName: '棒', icon: require('@/assets/icons/bang.png') },
                { pType: 4, pName: '带', icon: require('@/assets/icons/dai.png') }
            ],
            teamProjects: [
               { pType: 1, pName: '1种器械' },
               { pType: 2, pName: '2种器械' },
            ],
            checkProjectIndex: -1,
            checkBox: [false, false],
            socket: null,
            lockReconnect: false,   // 是否真正建立连接
            timeout: 20 * 1000, // 20秒一次心跳
            timeoutObj: null, // 心跳倒计时
            serverTimeoutObj: null, // 心跳倒计时
            timeoutNum: null, // 断开，重连倒计时
            activeDisconnect: false, // 是否是主动断开的连接
            socketStatus: null,   // socket 连接状态 0：未连接 1：已连接
            disconnect: require('@/assets/icons/disconnecting.png'),
            connecting: require('@/assets/icons/connecting.png'),
            changeFieldShow: false,
            cacheFieldData: JSON.parse(localStorage.getItem('cache_field_match_' + this.$route.query.matchId)) || [] // 视线裁判缓存中的场次信息
        }
    },
    computed: {
        defaultOption () {
            return {
                step: 0.2, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 2, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
        }

    },
    mounted () {
        this.activeDisconnect = false
        this.connectWebsocket()
    },
    unmounted () {
        if (this.socket != null) {
            this.socket.close()
            this.socket = null
            this.activeDisconnect = true
            this.timeoutNum && clearTimeout(this.timeoutNum)
            this.timeoutObj && clearTimeout(this.timeoutObj)
            this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
        }
    },
    methods: {
        projectClick (index) {
            this.checkProjectIndex = index
            if (this.playerName.split(',').length == 1) {
                this.$emit('projectChange', this.projects[this.checkProjectIndex].pName)
                localStorage.setItem('single_project', this.checkProjectIndex)
            } else {
                this.$emit('projectChange', this.teamProjects[this.checkProjectIndex].pName)
                localStorage.setItem('team_project', this.checkProjectIndex)
            }

        },
        connectWebsocket () {
            let url = process.env.VUE_APP_MODEL_BASE_SOCKET_URL + `/ws/eurhythmics/${this.matchId}/${this.refeeType}/${this.refeeUserName}/${this.groupNum}`
            this.socket = new WebSocket(url)
            this.socket.onopen = this.websocketOnOpen
            this.socket.onmessage = this.websocketOnMessage
            this.socket.onerror = this.websocketOnError
            this.socket.onclose = this.websocketOnClose
        },
        // 断线重连
        reconnect () {
            if (this.activeDisconnect || this.lockReconnect) {
                return
            }
            console.log('开始重连.....')
            this.lockReconnect = true
            this.timeoutNum && clearTimeout(this.timeoutNum)
            this.timeoutNum = setTimeout(() => {
                this.connectWebsocket()
                this.lockReconnect = false
            }, 2000)
        },
        // 重置心跳
        reset () {
            clearTimeout(this.timeoutObj)
            clearTimeout(this.serverTimeoutObj)
            // 重启心跳
            this.startHeart()
        },
        // 开启心跳
        startHeart () {
            const self = this
            self.timeoutObj && clearTimeout(self.timeoutObj)
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)
            self.timeoutObj = setTimeout(function () {
                if (self.socket && self.socket.readyState == 1) {
                    const msg = { DataType: 11 }
                    self.socket.send(JSON.stringify(msg))
                } else {
                    self.reconnect()
                }
                self.serverTimeoutObj = setTimeout(function () {
                    self.socket.close()
                }, self.timeout)
            }, self.timeout)
        },
        websocketOnOpen () {
            this.socketStatus = 1
            console.log('SOCKET连接成功')
            this.startHeart()
            // 连接成功立即向监督裁判客户端发送获取正在进行的比赛场次消息
            this.pullRunningField()
        },
        websocketOnError (evt) {
            this.socketStatus = 0
            console.log('SOCKET错误：', evt)
            if (this.socket != null) {
                this.reconnect()
            }
        },
        websocketOnClose (evt) {
            this.socketStatus = 0
            console.log('websocket关闭：', evt)
            if (this.socket != null) {
                this.reconnect()
            }
        },
        websocketOnMessage (evt) {
            console.log('收到消息....', evt)
            this.handlerMsg(evt.data)
            // 收到服务器消息，重置心跳
            this.reset()
        },
        handlerMsg (msg) {
            const msgObj = JSON.parse(msg)
            const msgType = msgObj.DataType
            if (3 == msgType) {
                Dialog.alert({
                    title: '提示',
                    message: '您的评分被驳回，请重新打分后提交',
                    theme: 'round-button',
                }).then(() => {
                    this.$emit('reScore')
                })
            } else if (4 == msgType) {
                // 比赛同步
                console.log('比赛同步...........', this.refeeType)
                if ('SL' == this.refeeType || 'SR' == this.refeeType) {
                    Dialog.alert({
                        title: '提示',
                        message: '监督裁判已确认, 请进行下一场比赛的判罚',
                        theme: 'round-button',
                        cancelButtonText: '稍后切换',
                        showCancelButton: true
                    }).then(() => {
                        this.nextField(msgObj)
                    }).catch(() => {
                        const cacheKey = 'cache_field_match_' + this.matchId
                        this.cacheFieldData.push(msgObj)
                        localStorage.setItem(cacheKey, JSON.stringify(this.cacheFieldData))
                    })
                } else {
                    Dialog.alert({
                        title: '提示',
                        message: '监督裁判已确认, 请进行下一场比赛的判罚',
                        theme: 'round-button',
                    }).then(() => {
                        this.nextField(msgObj)
                    })
                }
            } else if (8 == msgType) {
                console.log('获取到正在进行的比赛信息', msg)
                this.checkBox = JSON.parse(localStorage.getItem('checkBox')) || [false, false]
                this.playerName = msgObj.Data.PlayerName
                this.agencyName = msgObj.Data.AgencyName
                this.matchField = msgObj.Data.MatchField
                const eurhyType = msgObj.Data.EurhyType
                if (this.playerName.split(',').length == 1) {
                    this.checkProjectIndex = eurhyType.indexOf('1')
                    this.$emit('projectChange', this.projects[this.checkProjectIndex].pName)
                } else {
                    const eurhyTypeAry = eurhyType.split('')
                    const oneAry = this.indexOfAll(eurhyTypeAry, '1')
                    if (oneAry.length > 1) {
                        this.checkProjectIndex = 1
                    } else {
                        this.checkProjectIndex = 0
                    }
                    this.$emit('projectChange', this.teamProjects[this.checkProjectIndex].pName)
                }
                if (this.matchField) {
                    this.$emit('fieldChange', this.matchField, this.playerName)
                } else {
                    Dialog.alert({
                        title: '提示',
                        message: '当前暂无正在进行中的比赛场次信息，请稍后再试',
                        theme: 'round-button',
                    }).then(() => {
                    })
                }
            } else if (9 == msgType) {
                Toast('监督裁判未上线，请稍后重试')
            } else if (10 == msgType) {
                // 强制下线
                // Toast('您选择的裁判类型已有其他人登录')
                localStorage.setItem('offLine', 1)
                this.$router.back()
            } else if (12 == msgType) {
                // 评分响应消息
                this.$emit('pushScoreSuccess')
            } else if (15 == msgType) {
                Toast('拉取进行中的比赛失败：投屏客户端未在线，请稍后再试')
            }
        },
        changeFieldByPerson (msgObj, index) {
            this.changeFieldShow = false
            this.cacheFieldData.splice(index, 1)
            const cacheKey = 'cache_field_match_' + this.matchId
            localStorage.setItem(cacheKey, JSON.stringify(this.cacheFieldData))
            this.nextField(msgObj)
        },
        nextField (msgObj) {
            this.playerName = msgObj.Data.PlayerName
            this.agencyName = msgObj.Data.AgencyName
            this.matchField = msgObj.Data.MatchField
            const eurhyType = msgObj.Data.EurhyType
            if (this.playerName.split(',').length == 1) {
                // 个人赛
                this.checkProjectIndex = eurhyType.indexOf('1')
                this.$emit('projectChange', this.projects[this.checkProjectIndex].pName)
            } else {
                // 团体赛
                const eurhyTypeAry = eurhyType.split('')
                const oneAry = this.indexOfAll(eurhyTypeAry, '1')
                if (oneAry.length > 1) {
                    this.checkProjectIndex = 1
                } else {
                    this.checkProjectIndex = 0
                }
                this.$emit('projectChange', this.teamProjects[this.checkProjectIndex].pName)
            }
            this.checkBox = JSON.parse(localStorage.getItem('checkBox')) || [false, false]
            if (this.matchField) {
                this.$emit('newField', this.matchField, this.playerName)
            }
        },
        // 拉取正在进行中的比赛
        pullRunningField () {
            const msg = {
                DataType: 7,
                Data: { Target:  this.refeeType, Group: this.groupNum}
            }
            console.log('发送消息', msg)
            this.socket.send(JSON.stringify(msg))
        },
        modelChange () {
            // 将当前选择的资格、全能/单项 保存起来
            localStorage.setItem('checkBox', JSON.stringify(this.checkBox))
            let checkModel = []
            for (let i = 0; i < this.checkBox.length; i++) {
                if (this.checkBox[i]) {
                    let name = ''
                    if (i == 0) {
                        name = '资格、全能'
                    } else {
                        name = '单项'
                    }
                    checkModel.push(name)
                }
            }
            this.$emit('modeChange', checkModel)
        },
        indexOfAll (ary, target) {
            const indices = [];
            ary.forEach((el, i) => el === target && indices.push(i));
            return indices;
        }
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
.sub_header {
    display: flex;
    color: white;
    padding: 0px 20px;
    align-items: center;
}
.column1 {
    flex-grow: 1;
    margin-right: 20px;
}
.player div{
    margin-top: 10px;
}
.column2 {
    display: flex;
}
.project {
    width: 40px;
    height: 40px;
    border: 1px solid #2773d5;
}
.team_project {
    height: 40px;
    width: 120px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #2773d5;
}
.active {
    background: #2773d5;
}
.project img {
    width: 40px;
    height: 40px;
}
.column3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    color: white;
}
.column3 /deep/ .van-checkbox__label {
    color: white;
}
.checkbox {
    /* margin-right: 5px; */
}
.field_item {
    display: flex; 
    align-items: center;
    font-size: 18px;
    border-bottom: 1px solid rgba(69,90,100,.6);
    padding: 20px 10px 20px 10px;
}
</style>
