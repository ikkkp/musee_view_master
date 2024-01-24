import { createRouter, createWebHistory } from 'vue-router'
import CaptureMainView from '../views/CaptureMainView.vue'
import QuestionsCollectionView from '../views/QuestionsCollectionView.vue'
import UserInformationView from '../views/UserInformationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CaptureMainView
    },
    {
      path: '/QCollection',
      name: 'QuestionsCollectionView',
      component: QuestionsCollectionView
    }, 
    {
      path: '/userinfo',
      name: 'UserInformationView',
      component: UserInformationView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
