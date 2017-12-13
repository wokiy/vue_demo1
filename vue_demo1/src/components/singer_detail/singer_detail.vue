<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      //mapGetters 语法糖 函数仅仅是将 store 中的 getter 映射到局部计算属性
      /*mapGetters({
          // 映射 `this.Singer` 为 `store.getters.singer`
          Singer: 'singer'
        })
      * */
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._nomalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
    },
      //整理歌手的数据格式显示前台的手段
    _nomalizeSongs(list) {
      //遍历list
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        //musicData 转化为 songs
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

    .slice-enter-active, .slide-leave-active
      transition: all 0.3
    .slide-enter, .slide-leave-to
      transition: transform3d(100%, 0, 0)
</style>
