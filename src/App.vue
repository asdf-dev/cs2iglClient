<template>
  <nav class="nav-container">
    <div class="nav-content">
      <div v-if="isLobbyPath" id="lobbyCode" style="padding: 10px;">
        <button @click="reportBug">Report bug</button><span style="padding: 5px;" />
        <input readonly id="inputCode" :value="lobbyId" />
        <button id="lobbyCopyBtn" @click="copyLobbyToClipboard">Copy</button>
        <router-link class="navSpace" to="/">🏠</router-link>
      </div>
      <div v-else id="createLobby">
        <CreateLobby />
      </div>
    </div>
  </nav>
  <div>
    <DialogBox :isOpen="dialogOpen" @closeDialog="closeDialog" />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import DialogBox from "./components/dialogBox.vue"
import { ref, onMounted, computed } from "vue"
import { useRoute } from 'vue-router';
import CreateLobby from "./components/CreateLobby.vue";



export default {
  components: {
    DialogBox,
    CreateLobby
  },

  setup() {
    const lobbyId = ref()
    const dialogOpen = ref(false);
    const username = ref<string | null>(null);
    const route = useRoute();



    onMounted(() => {
      // Check if the "username" key exists in local storage
      if (!localStorage.getItem('username')) {
        //username.value = localStorage.getItem('username');
        console.error("missing username");
        openDialog();
      }
    });

    const isLobbyPath = computed(() => {
      if (route.path.includes('lobby')) {
        lobbyId.value = `${window.location.origin}${route.fullPath}`;
      }
      return route.path.includes('lobby');
    });

    const openDialog = () => {
      dialogOpen.value = true;
    };

    const closeDialog = () => {
      dialogOpen.value = false;
    };

    return {
      route,
      dialogOpen,
      openDialog,
      closeDialog,
      username,
      isLobbyPath,
      lobbyId
    };
  },
  methods: {
    reportBug() {
      window.open("https://github.com/asdf-dev/cs2iglClient/issues/new/choose", '_blank');
    },
    async copyLobbyToClipboard() {
      const inputCodeElement = document.querySelector<HTMLInputElement>('#inputCode');
      if (inputCodeElement) {
        inputCodeElement.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          alert('Unable to copy code');
        }
        window.getSelection()?.removeAllRanges();
      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-content {
  display: flex;
  align-items: center;
}

.navSpace {
  margin-left: 10px;
}
</style>
