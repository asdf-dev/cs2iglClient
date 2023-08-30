<template>
    <div id="JoinLobby">
        <button id="CreateLobbyBtn" @click="CreateLobby()">Create</button>
    </div>
</template>
  
<script lang="ts">
import { createLobby } from '@/service/dataService';
import { defineComponent } from 'vue';
import { connect } from '@/service/WSDataService';
import { useRouter } from 'vue-router';


export default defineComponent({
    setup() {
        const router = useRouter();

        return {
            router
        }
    },

    methods: {
        CreateLobby() {
            const username = localStorage.getItem('username');
            const resp = createLobby();
            //tag lobby id og navigate til lobby
            resp.then(value => {
                connect(value.lobbyId)
                this.router.push('/lobby?lobbyId=' + value.lobbyId);
            })
        }
    }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  