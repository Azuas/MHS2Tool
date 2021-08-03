const getMonsterData = require('./getMonsterData/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
      case 'getMonsterData':
        return await getMonsterData.main(event, context)
  }
}
