<template>
    <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from "vuex"
  const HOT_NAME = '热门'
  const HOT_SINGERS_LEN = 10
  export default {
    //定义data
    data() {//data 需要return
      return {
        singers: []//默认空数组
      }

    },
    created() {//创建时候获取singer数据
      this._getSingerList()
    },
    methods: {
      _getSingerList() {//getSingerList() 是一个Promise then
        getSingerList().then((res) => {
          if (res.code === ERR_OK){
            this.singers = this._normalizeSinger(res.data.list);
//            console.log(this.singers)
           }
        })
      },
      //数据结构的处理
      _normalizeSinger(list) {
        //this.singers 参数
        let map ={
          //创建数据结构 hot 数据 换个title
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item,index) => {
          if (index < HOT_SINGERS_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
            }))
          }
          const key = item.Findex
          if(!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        //有序列表的获取
        let hot = []
        let ret = []
        for(let key in map) {
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if(val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) -b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      selectSinger(singer) {
        //闯入的一个singer 的实例
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
