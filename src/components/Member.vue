<template>
  <div id="Member" class="border">
    <div id="MemberPlayerList">
      <ul class="no-margin no-padding">
        <li v-for="(metaUser, index) in lobbyStore.lobby?.members" :key="index">
          <div> {{ metaUser.user.name }} </div>
          <div v-if="isIGL()">
            <select style="max-width: 180px;" v-model="metaUser.grenadeAssignment" :id="metaUser.user.id">
              <option v-for="smoke in pickedSmokes" :key="smoke.imageUrl" :value="smoke">{{ smoke.description }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </div>
    <br>
    <!-- <div v-if="isIGL()"> -->
    <div v-if="false">
      <div> Select Map </div>
      <select style="max-width: 180px;" v-model="pickedMap">
        <option>Dust</option>
        <option>Inferno</option>
        <option>Mirage</option>
        <option>Nuke</option>
        <option>Vertigo</option>
      </select>
      <br>
    </div>
    <button @click="restSmokes()">Reset</button>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, watch, ref } from 'vue';
import { distributeGrenades } from "@/service/WSDataService";
import { lobbyStore, reactiveLobby } from "@/store/LobbyStore";
import { GrenadeAssignment } from '@/model/GrenadeAssignment';
import { Smoke } from '@/model/Smoke';

export default defineComponent({

  setup() {
    const pickedSmokes = ref<Smoke[]>([])
    const pickedMap = ref('Mirage')
    return {
      lobbyStore: ref<reactiveLobby>(lobbyStore),
      pickedSmokes,
      pickedMap
    }
  },
  data() {
    return {
      smokes: [
        //generated with pictureToJson script
        { map: "", team: "", jumpthrow: false, description: "Unassigned", imageUrl: "" }, //DO NOT REMOVE ME
        { map: "Mirage", team: "T", jumpthrow: false, description: "a jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "a ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "a stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b left arch", imageUrl: "maps/Mirage/T_true_b-left-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid conn", imageUrl: "maps/Mirage/T_true_mid-conn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid kort", imageUrl: "maps/Mirage/T_true_mid-kort_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "mid cat", imageUrl: "maps/Mirage/T_false_mid-cat_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b door", imageUrl: "maps/Mirage/T_true_b-door_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Mirage/T_false_b-default_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b right arch", imageUrl: "maps/Mirage/T_false_b-right-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b window", imageUrl: "maps/Mirage/T_true_b-window_1.jpg" },
      ],
    };
  },
  created() {
    //default
    this.pickSmoke('Mirage')
    if (this.isIGL()) {
      watch(() => this.pickedMap, (newVal, oldVal) => {
        this.pickSmoke(newVal)
      })
    }

    watch(() => lobbyStore.lobby, (newVal, oldVal) => {
      if (newVal == null) {
        return
      }
      this.distributeGrenadeWatcher();
    })
  },

  methods: {

    restSmokes() {
      const members = Object.values(lobbyStore.lobby?.members as object);
      let assigns: GrenadeAssignment[] = []
      members.forEach(metaUser => {
        assigns.push({
          userId: metaUser.user.id,
          assignment: {
            team: '',
            description: '',
            imageUrl: '',
            jumpthrow: false
          },
        })
      })
      distributeGrenades(assigns)
    },

    pickSmoke(compareTo: String) {
      this.pickedSmokes = []
      this.pickedSmokes.push({ map: "", team: "", jumpthrow: false, description: "Unassigned", imageUrl: "" })
      this.smokes.forEach((smoke) => {
        if (compareTo == smoke.map) {
          this.pickedSmokes.push(smoke)
        }
      })

    },

    isIGL() {
      //BE should controll this
      return lobbyStore.lobby?.creator == localStorage.getItem("id");
    },

    distributeGrenadeWatcher() {
      if (lobbyStore.lobby == null) {
        return;
      }
      const members = Object.values(lobbyStore.lobby?.members as object);
      members.forEach(metaUser => {
        watch(() => metaUser.grenadeAssignment, (newVal, oldVal) => {
          // if (metaUser.grenadeAssignment == newVal) {
          if (metaUser.grenadeAssignment == newVal) {
            return
          }
          const assign = {
            userId: metaUser.user.id,
            assignment: {
              team: newVal.team,
              description: newVal.description,
              imageUrl: newVal.imageUrl,
              jumpthrow: newVal.jumpthrow
            },
          } as GrenadeAssignment
          distributeGrenades([assign])
        });
      });
    }
  }
});
</script>
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
  