<template>
  <div id="JoinLobby">
    <input id="JoinLobbyInput" type="text" v-model="inputValue"><button @click="joinLobby()"
      id="JoinLobbyButton">Join</button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { joinLobby } from '@/service/dataService'
import { useRouter } from 'vue-router';

export default defineComponent({

  setup() {
    const inputValue = ref('');
    const router = useRouter();

    return {
      inputValue,
      router
    }
  },
  methods: {
    async joinLobby() {
      try {
        if (this.inputValue.length == 0) {
          return
        }
        this.router.push(`/lobby?lobbyId=${this.inputValue}`);
      } catch (error) {
        console.error(error)
      }
    }
  },
});
</script>
<style scoped></style>
  