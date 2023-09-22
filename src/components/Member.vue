<template>
  <div id="Member" class="border">
    <div id="MemberPlayerList">
      <ul class="no-margin no-padding">
        <li v-for="(metaUser, id) in lobbyStore.lobby?.members" :key="(id)">
          <div v-if="isIGL()">
            <div v-if="metaUser.online" style="display: inline;">
              {{ handleLongNames(metaUser.name) }}: {{ metaUser.grenadeAssignment?.description }}
            </div>
            <select style="max-width: 20px;" v-model="metaUser.grenadeAssignment" :id="(id as string)">
              <option v-for="smoke in pickedSmokes" :key="smoke.imageUrl" :value="smoke">{{ smoke.description }}
              </option>
            </select>
          </div>
          <div v-else>
            <div v-if="metaUser.online" style="display: inline;">
              {{ handleLongNames(metaUser.name) }}: {{ metaUser.grenadeAssignment?.description }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <br>
    <div v-if="isIGL()">
      <div> Select Map </div>
      <select style="max-width: 180px;" v-model="pickedMap">
        <option>Dust</option>
        <option>Inferno</option>
        <option>Mirage</option>
        <option>Nuke</option>
        <option>Vertigo</option>
      </select>
      <br>
      <button @click="restSmokes()">Reset</button>
    </div>
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

        //Dust

        //Inferno

        //Mirage
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

        //Nuke

        //vertigo
      ],
    };
  },
  created() {
    //default
    this.pickSmoke('Mirage')
    watch(() => this.pickedMap, (newVal, oldVal) => {
      this.pickSmoke(newVal)
    })

    watch(() => lobbyStore.lobby, (newVal, oldVal) => {
      if (newVal == null) {
        return
      }
      this.distributeGrenadeWatcher();
    })
  },

  methods: {
    handleLongNames(name: string) {
      if (name.length > 8) {
        return name.substring(0, 8)
      }
      return name
    },

    restSmokes() {
      let assigns: GrenadeAssignment[] = []
      for (const memberId in lobbyStore.lobby?.members) {
        if (Object.prototype.hasOwnProperty.call(lobbyStore?.lobby?.members, memberId)) {
          assigns.push({
            userId: memberId,
            assignment: {
              team: '',
              description: 'Unassigned',
              imageUrl: '',
              jumpthrow: false
            },
          })
        }
        distributeGrenades(assigns)
      }
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
      for (const memberId in lobbyStore.lobby?.members) {
        if (Object.prototype.hasOwnProperty.call(lobbyStore.lobby.members, memberId)) {
          const member = lobbyStore.lobby.members[memberId]
          watch(() => member.grenadeAssignment, (newVal, oldVal) => {
            if (oldVal?.imageUrl == newVal?.imageUrl) {
              return
            }
            const assign = {
              userId: memberId,
              assignment: {
                team: newVal?.team,
                description: newVal?.description,
                imageUrl: newVal?.imageUrl,
                jumpthrow: newVal?.jumpthrow
              },
            } as GrenadeAssignment
            distributeGrenades([assign])
          })
        }
      }
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
  