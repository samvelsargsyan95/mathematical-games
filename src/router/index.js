import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/Home");
const MainGame = () => import("@/views/MainGame");
const Map = () => import("@/views/Map");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children : [
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/pascals-triangle',
    name: 'Pascals Triangle',
    component: MainGame
  },  
  {
    path: '/magic-square-builder',
    name: 'Magic Square Builder',
    props: true,
    component: MainGame
  },  
  {
    path: '/famous-mathematics',
    name: 'Famous Mathematics',
    component: Map
  },      
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
