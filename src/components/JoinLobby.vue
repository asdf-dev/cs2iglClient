<template>
  <div id="JoinLobby">
    <input id="JoinLobbyInput" type="text"><button @click="joinLobby()" id="JoinLobbyButton">Join</button> -- Kald rest
    -> ok -> join lobby
    /kode
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { fetchData } from '@/service/dataService'

export default defineComponent({

  methods: {
    async joinLobby() {
      console.log("joinLobby")
      try {
        let data = await fetchData()
        //show error dialog if no lobby is found
      } catch (error) {
        //show error dialog
      }
    }
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  