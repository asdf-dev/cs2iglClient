<template>
  <div>
    <CreateLobby />
    <br>
    <JoinLobby />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateLobby from './CreateLobby.vue';
import JoinLobby from './JoinLobby.vue';

export default defineComponent({
  components: {
    JoinLobby,
    CreateLobby
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
