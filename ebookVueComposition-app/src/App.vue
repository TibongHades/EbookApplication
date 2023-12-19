<template>
  <div class="app-container">
    <div class="sidebar">
      <div class="sidebar-item">
        <img src="@/assets/sidebarLogo.png" alt="Logo" class="logo">
        <h3>Novel Hall</h3>
        <RouterLink to="/" class="sidebar-link" :class="{ active: $route.path === '/' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house"
            viewBox="0 0 16 16">
            <path
              d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg> Home
        </RouterLink>
        <RouterLink to="/authors" class="sidebar-link" :class="{ active: $route.path === '/authors' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill"
            viewBox="0 0 16 16">
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>Authors
        </RouterLink>
        <RouterLink to="/books" class="sidebar-link" :class="{ active: $route.path === '/books' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book"
            viewBox="0 0 16 16">
            <path
              d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg> Books
        </RouterLink>
        <RouterLink to="/chapters" class="sidebar-link" :class="{ active: $route.path === '/chapters' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookshelf"
            viewBox="0 0 16 16">
            <path
              d="M2.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-1 0V15H3v.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5M3 14h10v-3H3zm0-4h10V7H3zm0-4h10V3H3z" />
          </svg>Chapters
        </RouterLink>
      </div>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-container {
  display: flex;
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
  background-color: gold;
  color: black;
  font-size: 18px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 50%;
  padding: 10px 10px;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-link {
  color: black;
  text-decoration: none;
  width: 100%;
  font-size: larger;
  margin: 15px 0;
  padding: 10px 10px;
  display: flex;

  align-items: center;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.2s ease, padding-left 0.3 ease;
}

.sidebar-link:hover {
  color: #fff;
  background-color: #007bff;
  transform: scale(1.01);
  padding-left: 50px;
}

.sidebar-link.active {
  color: #fff;
  background-color: #0056b3;
  padding-left: 50px;
}

.sidebar-link i {
  margin-right: 10px;
}

h3 {
  font-weight: bolder;
}

.content {
  flex: 3;
  background-image: url('@/assets/background.png');
  background-size: contain;
  background-position: center;
  margin-left: 200px;
  padding: 20px;
  min-height: 100vh;
  font-size: larger;
  color: #ffd700;
}</style>
