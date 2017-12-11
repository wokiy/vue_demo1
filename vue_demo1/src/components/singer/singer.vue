<template>
    <div class="singer" ref="singer">

    </div>
</template>

<script>
  import getSingerList from 'api/singer'
  import EER_OK  from 'api/config'
  export default {
    //定义data
    data() {//data 需要return
      return {
        singer: []//默认空数组
      }

    },
    created() {//创建时候获取singer数据
      this._getSingerList
    },
    methods: {
      _getSingerList() {//getSingerList() 是一个Promise then
        this.getSingerList().then((res) => {
          if (res.code === EER_OK){
            this.singers = res.data.list;
            console.log(res.data/list)
           }
        })
      }
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
