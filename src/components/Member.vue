<template>
  <div id="Member" class="border">
    <div id="MemberPlayerList">
      <ul class="no-margin no-padding">
        <li v-for="(metaUser, id) in LocallobbyStore.lobby?.members" :key="(id)">
          <div v-if="isIGL()">
            <div v-if="metaUser.online" style="display: inline;">
              {{ handleLongNames(metaUser.name) }}: {{ metaUser.grenadeAssignment?.description }}
              <select style="max-width: 20px;" v-model="metaUser.grenadeAssignment" :id="(id as string)">
                <option v-for="smoke in pickedSmokes" :key="smoke.imageUrl" :value="smoke">{{ smoke.description }}
                </option>
              </select>
            </div>
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
        <option>Inferno</option>
        <option>Mirage</option>
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
import { MetaUser } from '@/model/MetaUser';

export default defineComponent({

  setup() {
    const pickedSmokes = ref<Smoke[]>([])
    const pickedMap = ref('Mirage')
    const knownIds = ref<string[]>([]);
    return {
      LocallobbyStore: ref<reactiveLobby>(lobbyStore),
      pickedSmokes,
      pickedMap,
      knownIds
    }
  },
  data() {
    return {
      smokes: [
        //generated with pictureToJson script
        { map: "", team: "", jumpthrow: false, description: "Unassigned", imageUrl: "" }, //DO NOT REMOVE ME

        //Dust

        //Inferno
        { map: "Inferno", team: "t", jumpthrow: true, description: "A mini pit", imageUrl: "maps/Inferno/t_true_A-mini-pit_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: true, description: "A lib", imageUrl: "maps/Inferno/t_true_A-lib_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B ct", imageUrl: "maps/Inferno/t_false_B-ct_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B coffin", imageUrl: "maps/Inferno/t_false_B-coffin_1.jpg" },

        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "A jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "A ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "A stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
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
        { map: "Vertigo", team: "T", jumpthrow: false, description: "A site venstre", imageUrl: "maps/Vertigo/T_false_a-site-venstre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "A site kort", imageUrl: "maps/Vertigo/T_false_a-site-kort_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "A site højre", imageUrl: "maps/Vertigo/T_false_a-site-højre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "mid heaven", imageUrl: "maps/Vertigo/T_false_mid-heaven_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "B default", imageUrl: "maps/Vertigo/T_false_b-default_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "B kryds", imageUrl: "maps/Vertigo/T_false_B-kryds_1.jpg" },
      ],
    };
  },
  created() {
    this.pickSmoke('Mirage')
    watch(() => this.pickedMap, (newVal, oldVal) => {
      this.pickSmoke(newVal)
    })
    watch(() => lobbyStore.lobby?.members, (newVal, oldVal) => {
      console.log("watch lobby:")
      if (newVal == null) {
        return
      }
    })
    this.updateWatcher();
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


    updateWatcher() {
      watch(() => lobbyStore.update, (newval, oldval) => {
        if (lobbyStore.lobby == null) {
          return
        }
        for (const memberId in lobbyStore.lobby!.members) {
          if (lobbyStore.lobby.members.hasOwnProperty(memberId)) {
            const metaUser: MetaUser = lobbyStore.lobby.members[memberId];
            if (!this.knownIds.includes(memberId)) {
              this.knownIds.push(memberId);
              watch(() => lobbyStore.lobby?.members[memberId].grenadeAssignment, (newVal, oldVal) => {
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
      })
    },

    isIGL() {
      //BE should controll this
      return lobbyStore.lobby?.creator == localStorage.getItem("id");
    },
  },
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
  