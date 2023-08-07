<template>
  <nav>
    this is app.vue
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <CreateLobby />
  <br>
  <JoinLobby />
</template>

<script lang="ts">
import CreateLobby from '@/components/CreateLobby.vue';
import JoinLobby from '@/components/JoinLobby.vue';

export default {
  components: {
    CreateLobby,
    JoinLobby
  },
  // Component logic here
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
