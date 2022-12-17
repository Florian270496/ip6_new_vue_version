import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '../views/ListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/newHazard/:actualTitleNameNewHazard/:itemIdNewHazard/:acceptCounterArrayLengthNewHazard',
    name: 'NewHazard',
    mode: "history",
    component: () => import('../views/NewHazard.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
