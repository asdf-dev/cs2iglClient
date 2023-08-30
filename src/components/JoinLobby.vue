<template>
  <div id="JoinLobby">
    <input id="JoinLobbyInput" type="text" v-model="inputValue"><button @click="joinLobby()"
      id="JoinLobbyButton">Join</button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { joinLobby } from '@/service/dataService'
import { connect } from '@/service/WSDataService'
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
        //handle empty value
        if (this.inputValue.length == 0) {
          return
        }
        await joinLobby(this.inputValue);
        connect(this.inputValue)
        this.router.push('/lobby');

      } catch (error) {
        //show error dialog
        console.error(error)
      }
    }
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  