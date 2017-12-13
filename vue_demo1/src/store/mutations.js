import * as types from './mutation-types'
//引入字符串常量
const  mutations = {
  /*更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：
  每个 mutation 都有一个字符串的 事件类型 (type) ===[types.SET_SINGER]
  和 一个 回调函数 (handler)。(state, singer) state.singer = singer
  这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  * */
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
