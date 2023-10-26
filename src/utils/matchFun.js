export default {
  randomNumFile (name, url) {
    var randomNum = Math.floor(Math.random() * 100000)
    var file = {
      uid: randomNum + '',
      name: name,
      status: 'done',
      url: url,
      response: { data: {url: url} }
    }
    return file
  },
  handleDate (value) {
    var date
    if (value instanceof Date) {
      date = value
    }else if (value instanceof Object) {
      date = value._d
    } else {
      var arr = value.split(/[- : /]/)
      if (value.indexOf(':') > -1) {
        date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
      } else {
        date = new Date(arr[0], arr[1] - 1, arr[2])
      }
    }
    return date
  },
  formatDate (value, isTime) {
    var date = this.handleDate(value)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    if (!isTime) {
      return Y + M + D
    }
    var h =  ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
  },
  formatTime (value) {
    var date = this.handleDate(value)
    var h =  ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return h + m + s
  },
  formatHm (value) {
    var date = this.handleDate(value)
    var h =  ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    return h + m
  },
  formatTimeStamp (value) {
    var date = this.handleDate(value)
    return date.getTime()
  },
  phoneFun (phones) {
    var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
    if (!myreg.test(phones)) {
      console.log('手机号格式不正确')
      return false
    } else {
      console.log('手机号格式正确')
      return true
    }
  },
  weekListByStr (str) {
    let arr = str.split(',')
    let week = []
    arr.forEach(element => {
      if (Number(element) === 1) {
        week.push({
          weekDay: 1,
          name: '星期一'
        })
      } else if (Number(element) === 2) {
        week.push({
          weekDay: 2,
          name: '星期二'
        })
      } else if (Number(element) === 3) {
        week.push({
          weekDay: 3,
          name: '星期三'
        })
      } else if (Number(element) === 4) {
        week.push({
          weekDay: 4,
          name: '星期四'
        })
      } else if (Number(element) === 5) {
        week.push({
          weekDay: 5,
          name: '星期五'
        })
      } else if (Number(element) === 6) {
        week.push({
          weekDay: 6,
          name: '星期六'
        })
      } else if (Number(element) === 7) {
        week.push({
          weekDay: 7,
          name: '星期日'
        })
      }
    })
    return week
  },
  weekArr () {
    return [{
      num: 1,
      name: '星期一'
    }, {
      num: 2,
      name: '星期二'
    }, {
      num: 3,
      name: '星期三'
    }, {
      num: 4,
      name: '星期四'
    }, {
      num: 5,
      name: '星期五'
    }, {
      num: 6,
      name: '星期六'
    }, {
      num: 7,
      name: '星期日'
    }]
  },
  weekToName (num) {
    switch (Number(num)) {
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
      case 7:
      return '星期日'
    }
  },
  dayWeek (num) {
    var now = new Date()
    var day = now.getDay()
    var weeks = new Array(7, 1, 2, 3, 4, 5, 6)
    return num === weeks[day]
  },
  ages (str) {  
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
    if (r === null) return false
    var d = new Date(r[1], r[3]-1, r[4])
    if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]) {  
      var Y = new Date().getFullYear()
      return Y-r[1]
    }  
    return ''
  },
  //获取日期是星期几
  getMyDay(date) {
    let week
    if (date.getDay() == 0) week = 7
    if (date.getDay() == 1) week = 1
    if (date.getDay() == 2) week = 2
    if (date.getDay() == 3) week = 3
    if (date.getDay() == 4) week = 4
    if (date.getDay() == 5) week = 5
    if (date.getDay() == 6) week = 6
    return week
  }
}