import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import  Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from "components/singer_detail/singer_detail"
Vue.use(Router)
export default new Router({
 /* base: '/dist/',*/
  base: '/dist/',
  routes: [
    {
      path: '/',
      redirect: "/recommend"
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
        children: [
          {
            path: ":id",
            component: SingerDetail
          }
        ]
    },
    {
      path: '/Rank',
      component: Rank
    },
    {
      path: '/Search',
      component: Search
    }


  ]
})
