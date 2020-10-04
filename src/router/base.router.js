import Home from '../views/home/Home.vue'
import Page2 from '../views/Page2.vue'

export default [
  // =============================================================================
  // Theme Routes
  // =============================================================================
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/page2',
    name: 'page-2',
    component: () => Page2
  },
  {
    path:'/countries',
    name:'Pais',
    component: () => import('../views/countries/Countries.vue')
  }
]