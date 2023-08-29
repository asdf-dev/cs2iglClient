<template>
    <div id="JoinLobby">
        <form>
            <button id="CreateLobby" @click="CreateLobby()">Create</button> -> Kald rest -> få id -> lobby
        </form>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    methods: {
        CreateLobby() {
            console.log("create lobby")
        }
    }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  