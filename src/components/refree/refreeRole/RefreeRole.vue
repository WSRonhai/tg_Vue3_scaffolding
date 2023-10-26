<template>
    <div class="page">
        <div class="page_content">
            <div class="item" v-for="(item, index) in roles" :key="index" @click="roleClick(item)">
                <div class="inner">{{ refeeName[item.number] }}</div>
            </div>
        </div>
        <div class="footer">
             <div class="btn_outer btn_outer_normal">
                <div class="btn_inner_normal" @click="back()">返回</div>
            </div>
        </div>

        <van-dialog :show="dialogShow" title="请输入裁判名称" show-cancel-button @confirm="confirmRefereeName()" @cancel="dialogShow = false">
            <div style="width: 100%;text-align: center;">
                <input class="input" type="text" v-model="refereeName"/>
            </div>
        </van-dialog>

        <van-dialog :show="offLineDialogShow" title="提示" @confirm="offLineDialogShow = false">
            <div style="text-align: center;padding:30px 20px;">
                由于您选择的裁判已有其他人选择，你被强制退出，请重新选择您的裁判角色
            </div>
        </van-dialog>
    </div>
</template>
<script>
import { Toast, Dialog } from 'vant'
// import { refeeName } from '@/utils/aFreeColums'
export default {
    data () {
        return {
            // refeeName,
            matchId: this.$route.query.matchId,
            matchName: this.$route.query.matchName,
            roles: [],
            dialogShow: false,
            offLineDialogShow: false,
            refereeName: null,
            clickItem: null
        }
    },
    mounted () {
        this.refeeList()
        const offLine = localStorage.getItem('offLine')
        if (offLine == 1) {
            this.offLineDialogShow = true
        }
        localStorage.removeItem('offLine')
    },
    methods: {
        refeeList () {
            Toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: false
            })
            this.$api.match.refeeList(this.matchId).then(res => {
                Toast.clear()
                if (res.status === 0) {
                    this.roles = res.data
                } else {
                    Toast(res.msg)
                }
            }).catch(() => {
                Toast.clear()
            })
        },
        roleClick (item) {
            this.clickItem = item
            this.dialogShow = true
        },
        back () {
            this.$router.back()
        },
        confirmRefereeName () {
            if (this.refereeName == null || this.refereeName.trim() == '') {
                Toast('请输入裁判名称')
                return
            }
            Toast.loading({
                duration: 0,
                message: '正在绑定裁判...',
                forbidClick: false
            })
            this.$api.match.bindRefree(this.clickItem.id, this.refereeName, 0).then(res => {
                Toast.clear()
                if (res.status === 0) {
                    this.routePage(this.clickItem)
                } else {
                    if (res.status === 202) {
                        Dialog.confirm({
                            title: '提示',
                            confirmButtonText: '更换裁判',
                            cancelButtonText: '取消',
                            message: '该裁判已被其他人绑定, 如果确认您是该裁判请点击更换裁判强制替换',
                        }).then(() => {
                            // 强制替换裁判
                            Toast.loading({
                                duration: 0,
                                message: '正在绑定裁判...',
                                forbidClick: false
                            })
                            this.$api.match.bindRefree(this.clickItem.id, this.refereeName, 1).then(res => {
                                Toast.clear()
                                if (res.status === 0) {
                                    this.routePage(this.clickItem)
                                } else {
                                    Toast(res.msg)
                                }
                            })
                        })
                    } else {
                        Toast(res.msg)
                    }
                }
            }).catch(() => {
                Toast.clear()
            })
        },
        routePage (item) {
            const type = item.number
            let path = ''
            switch (type) {
                case '01':
                case '02':
                case '03':
                case '04':
                    path = 'aRefree'
                    break
                case '05':
                case '06':
                case '07':
                case '08':
                    path = 'dRefree'
                    break
                case '09':
                case '10':
                case '11':
                case '12':
                    path = 'eRefree'
                    break
                case '13':
                case '14':
                    path = 'eyeRefree'
                    break
                case '15':

                    break
            }
            localStorage.removeItem('checkBox')
            localStorage.removeItem('single_project')
            localStorage.removeItem('team_project')
            this.$router.push({
                path: path,
                query: { type: type, refeeTypeName: this.refeeName[item.number], refeeName: this.refereeName, matchId: this.matchId, matchName: this.matchName }
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
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}
.item {
    width: 27.5%;
    height: 110px;
    color: white;
    margin: 10px 2.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    background: linear-gradient(to right, #475a6b ,#1f212e);
    border-radius: 15px;

}
.inner {
    width: 96%;
    height: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(to top right, #1d1f2c ,#475a6b);
}
.input {
    height: 30px;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 20px 0px;
    padding: 5px;
}
.footer {
    display: flex;
    justify-content: center;
    padding: 10px;
    position: fixed;
    bottom: 0px;
    width: 100%;
}
.btn_outer {
    width: 80%;
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
.btn_outer_normal {
    background: linear-gradient(to right, #475a6b ,#1f212e);
}
.btn_inner_normal {
    background: linear-gradient(to top right, #1d1f2b ,#253449);
}
</style>
