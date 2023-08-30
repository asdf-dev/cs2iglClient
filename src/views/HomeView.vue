<template>
  <div class="home">
    <JoinLobby />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JoinLobby from '@/components/JoinLobby.vue';
import Member from '@/components/Member.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    JoinLobby,
    Member,
  },
});
</script>
