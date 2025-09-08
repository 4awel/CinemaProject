<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';

export default {
  components: {
    RouterView,
    RouterLink
  }
}
</script>

<template>
  <div id="app">
    <!-- <header>
      <header-app/>
    </header> -->
    <main>
      <RouterView />
    </main>
    <!-- <footer>
      <footer-app></footer-app>
    </footer> -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
  overflow-x: hidden;
}



</style>
