<template>
  <div id="Member" class="border">
    <div id="MemberPlayerList">
      <ul class="no-margin no-padding">
        <li v-for="(metaUser, index) in lobbyStore.lobby?.members" :key="index">
          <div> {{ metaUser.user.name }} </div>
          <div v-if="isIGL()">
            <select style="max-width: 180px;" v-model="metaUser.grenadeAssignment" :id="metaUser.user.id">
              <option v-for="smoke in smokes" :key="smoke.place" :value="smoke">{{ smoke.place }} - {{
                smoke.description }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </div>
    <br>
    <div> Select Map </div>
    <select style="max-width: 180px;">
      <option>Mirage
      </option>
    </select>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, watch, ref } from 'vue';
import { distributeGrenades } from "@/service/WSDataService";
import { lobbyStore, reactiveLobby } from "@/store/LobbyStore";
import { GrenadeAssignment } from '@/model/GrenadeAssignment';

export default defineComponent({
  setup() {
    return {
      lobbyStore: ref<reactiveLobby>(lobbyStore)
    }
  },
  data() {
    return {
      smokes: [
        { map: "", side: "", place: "", description: "No smoke", imageUrl: "" },
        { map: "mirage", side: "T", place: "mid", description: "mid fra kort", imageUrl: "maps/mirage/T_mid_smoke-mid-fra-kort_1.jpg" },
        { map: "mirage", side: "T", place: "window", description: "window smoke", imageUrl: "maps/mirage/T_window_window-smoke_1.jpg" },
        { map: "mirage", side: "T", place: "ticket", description: "CT ticket", imageUrl: "maps/mirage/T_ticket_smoke-CT-ticket_1.jpg" },
        { map: "mirage", side: "T", place: "jungle", description: "beksrivelse", imageUrl: "maps/mirage/T_jungle_beksrivelse_1.jpg" },
        { map: "mirage", side: "T", place: "CT", description: "ct fra tetris", imageUrl: "maps/mirage/T_CT_smoke-ct-fra-tetris_1.jpg" },

      ],
    };
  },
  created() {
    watch(() => lobbyStore.lobby, (newVal, oldVal) => {
      if (newVal == null) {
        return
      }
      this.distributeGrenadeWatcher();
    })
  },

  methods: {

    isIGL() {
      //BE should controll this
      return lobbyStore.lobby?.creator == localStorage.getItem("id")

    },

    distributeGrenadeWatcher() {
      if (lobbyStore.lobby == null) {
        return;
      }
      const members = Object.values(lobbyStore.lobby?.members as object);
      members.forEach(metaUser => {
        watch(() => metaUser.grenadeAssignment, (newVal, oldVal) => {
          const assign = {
            userId: metaUser.user.id,
            assignment: {
              name: newVal.place,
              imageUrl: newVal.imageUrl
            },
          } as GrenadeAssignment
          distributeGrenades([assign])
        });
      });
    }


  }
});
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style: none;
}

ul.no-margin {
  list-style: none;
  margin: 0;
}

ul.no-padding {
  padding: 0;
}

.border {
  padding: 0;
  text-align: left;
  width: fit-content;
  height: fit-content;
}
</style>
  