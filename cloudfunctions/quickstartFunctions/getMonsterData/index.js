const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const collectionName= 'monster'

const MAX_LIMIT = 100

exports.main = async (event, context) => {

  const _ = db.command

  // 先取出集合记录总数
  let countResult = 0
  if (event.keyword && event.keyword != '') {
    countResult = await db.collection(collectionName)
      .where(_.or([{
        keyword_str: db.RegExp({
          regexp: event.keyword,
          options: 'i'
        })
      }, {
        name: db.RegExp({
          regexp: event.keyword,
          options: 'i'
        })
      }])).count()
  } else {
    countResult = await db.collection(collectionName).count()
  }
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise
    if (event.keyword && event.keyword != '') {
      promise = db.collection(collectionName)
        .where(_.or([{
          keyword_str: db.RegExp({
            regexp: event.keyword,
            options: 'i'
          })
        }, {
          name: db.RegExp({
            regexp: event.keyword,
            options: 'i'
          })
        }]))
        .skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    } else {
      promise = db.collection(collectionName).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    }
    tasks.push(promise)
  }
  // 等待所有
  if (tasks.length <= 0) {
    return {
      data: [],
      errMsg:"data not found"
    }
  }else{
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }
}