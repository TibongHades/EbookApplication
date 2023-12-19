import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'book',
      component: () => import('../views/BookView.vue')
    },
    {
      path: '/authors',
      name: 'author',
      component: () => import('../views/AuthorView.vue')
    },
    {
      path:'/books/:id',
      name:'SingleBook',
      component: () => import('../views/SingleBook.vue'),
      props: true
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: () => import('../components/AddBookForm.vue')
    },
    {
      path: '/editBook/:id',
      name: 'editBook',
      component: () => import('../components/EditBook.vue'),
      props: true,
    },
    {
      path: '/addAuthor',
      name: 'addauthor',
      component: () => import('../components/AddAuthorForm.vue')
    },
    {
      path: '/editAuthor/:id',
      name: 'editAuthor',
      component: () => import('../components/EditAuthor.vue'),
      props: true,
    },
    {
      path: '/chapters',
      name: 'chapter',
      component: () => import('../views/ChapterView.vue')
    },
    {
      path: '/addChapter',
      name: 'addChapter',
      component: () => import('../components/AddChapterForm.vue')
    },
    {
      path: '/editChapter/:id',
      name: 'editChapter',
      component: () => import('../components/EditChapter.vue'),
      props: true,
    },
  ]
})

export default router
