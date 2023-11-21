<template>
  <div class="lobby">
    <div id="myview" class="flex-container">
      <div style="padding-right: 10px;" id="left">
        <Member />
      </div>
      <div id="right">
        <SmokePic />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Member from "@/components/Member.vue";
import SmokePic from '@/components/SmokePic.vue';
import { useRouter } from "vue-router";
import { connect } from '@/service/WSDataService';
import router from '@/router';
import { joinLobby } from '@/service/dataService';
import { CookieService } from '@/service/CookieService';


export default defineComponent({
  name: 'LobbyView',
  components: {
    Member,
    SmokePic
  },
  setup() {
    const username = localStorage.getItem('username');
    const lobbyId = useRouter().currentRoute.value.query.lobbyId?.toString();
    const router = useRouter()
    const cookieService = new CookieService();
    return {
      username,
      lobbyId,
      cookieService
    }
  },
  mounted() {
    this.cookieService.cookieValidator();
    // Check if the "username" key exists in local storage
    if (!localStorage.getItem('username')) {
      //username.value = localStorage.getItem('username');
      console.error("missing username");
      //show dialog or push to home
      router.push('/')
    }
    if (this.lobbyId != null) {
      joinLobby(this.lobbyId)
      connect(this.lobbyId)
    }
  }
});
</script>
<style>
.flex-container {
  display: flex;
  justify-content: left;
}
</style>