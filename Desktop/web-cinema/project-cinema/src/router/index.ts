import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import WorkPage from '@/views/WorkPage.vue';
import AddUserForm from '@/views/AddUserForm.vue';
import AddNewsPage from '@/views/AddNewsPage.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/work',
      name: 'work',
      component: WorkPage
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: AddUserForm
    },
    {
      path: '/addnews',
      name: 'addnews',
      component: AddNewsPage
    }
  ],
})

export default router
