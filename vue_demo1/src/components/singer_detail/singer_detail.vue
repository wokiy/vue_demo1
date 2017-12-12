<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import ERR_OK from 'api/config'
    export default {
      computed: {
        ...mapGetters([
          'singer'
        ])
      },
      created() {
        console.log(this.singer)
        this._getDetail()
      },
      methods: {
        _getDetail() {
          if (!this.singer.id) {
            getSingerDetail(this.singer.id).then((res) => {
              if (res.code === ERROR) {
                console.log(res.data.list)
              }
            })
          }
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
      transition : all 0.3
    .slide-enter, .slide-leave-to
      transition : transform3d(100%, 0, 0)
</style>
