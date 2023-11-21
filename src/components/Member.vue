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
        <option>Ancient</option>
        <option>Anubis</option>
        <option>Inferno</option>
        <option>Mirage</option>
        <option>Nuke</option>
        <option>Vertigo</option>
      </select>
      <br>
      <div v-if="doesExecuteExist(pickedMap)">

        <button @click="restSmokes()">Reset</button>
        <br>
        Default executes
        <br>
        <button @click="aExecuteBtn(pickedMap)">A Smokes</button>
        <br>
        <button @click="midExecuteBtn(pickedMap)">Mid Smokes</button>
        <br>
        <button @click="bExecuteBtn(pickedMap)">B Smokes</button>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, watch, ref, watchEffect } from 'vue';
import { distributeGrenades } from "@/service/WSDataService";
import { lobbyStore, reactiveLobby } from "@/store/LobbyStore";
import { GrenadeAssignment } from '@/model/GrenadeAssignment';
import { Smoke } from '@/model/Smoke';
import { Grenade } from '@/model/Grenade';
import { closeConnection } from '@/service/WSDataService';
import { aExecuteSmokes } from '@/model/smokes/aExecuteSmokes'
import { bExecuteSmokes } from '@/model/smokes/bExecuteSmokes'
import { midExecuteSmokes } from '@/model/smokes/midExecuteSmokes'
import { AllSmokes } from '@/model/smokes/allSmokes'
import { CookieService } from '@/service/CookieService';

export default defineComponent({

  setup() {
    const pickedSmokes = ref<Smoke[]>([])
    const pickedMap = ref('Mirage')
    const knownIds = ref<string[]>([]);
    const cookieService = new CookieService();
    return {
      LocallobbyStore: ref<reactiveLobby>(lobbyStore),
      pickedSmokes,
      pickedMap,
      knownIds,
      cookieService,
    }
  },
  data() {
    return {
      lobbyWatch: null as ReturnType<typeof watch> | null,
      smokes: AllSmokes.smokes,
      executeMaps: ['Mirage', 'Inferno', 'Anubis', 'Ancient', 'Vertigo'],

      aExecute: aExecuteSmokes.smokes,
      midExecute: midExecuteSmokes.smokes,
      bExecute: bExecuteSmokes.smokes

    };
  },
  created() {
    this.pickSmoke('Mirage')
    watch(() => this.pickedMap, (newVal, oldVal) => {
      this.pickSmoke(newVal)
    })
    watch(() => lobbyStore.lobby?.members, (newVal, oldVal) => {
      if (newVal == null) {
        return
      }
    })
    this.updateWatcher();
    this.lobbyWatch = watch(() => lobbyStore.lobby, (newVal, oldVald) => {
      if (newVal != null) {
        this.addToKnownUsers()
      }
    })
  },

  mounted() {
    this.cookieService.cookieValidator();
    this.addToKnownUsers()
  },
  unmounted() {
    closeConnection();
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
            } as Grenade,
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

    aExecuteBtn(map: string) {
      //lige nu har vi kun mirage.. På sigt rename Amirage til AExecute. Temp list filter på mapnavn
      let filtered = this.aExecute.filter( item => item.map == map)
      this.executeHandler(filtered)
    },
    bExecuteBtn(map: string) {
      let filtered = this.bExecute.filter( item => item.map == map)
      this.executeHandler(filtered)
    },
    midExecuteBtn(map: string) {
      let filtered = this.midExecute.filter( item => item.map == map)
      this.executeHandler(filtered)
    },
    doesExecuteExist(map: string): boolean {
      return this.executeMaps.includes(map)
    },

    executeHandler(listOfSmokes: Grenade[]) {
      var temp = this.knownIds.slice();
      listOfSmokes.forEach(i => {
        if (temp.length != 0) {
          var assign = {
            userId: temp[0],
            assignment: i
          } as GrenadeAssignment

          distributeGrenades([assign])

          temp.splice(0, 1)
        }
      });

    },

    updateWatcher() {
      watch(() => lobbyStore.update, (newval, oldval) => {
        if (lobbyStore.lobby == null) {
          return
        }
        for (const memberId in lobbyStore.lobby!.members) {
          if (lobbyStore.lobby.members.hasOwnProperty(memberId)) {
            if (!this.knownIds.includes(memberId)) {
              this.knownIds.push(memberId);
              this.grenadeAssignmentWatcher(memberId)
            }
          }
        }
      })
      if (this.lobbyWatch) {
        this.lobbyWatch;
      }
    },

    addToKnownUsers() {
      if (lobbyStore.lobby?.members == null) {
        return
      }

      for (const memberId in lobbyStore.lobby!.members) {
        if (lobbyStore.lobby.members.hasOwnProperty(memberId)) {
          if (!this.knownIds.includes(memberId)) {
            this.knownIds.push(memberId);
            this.grenadeAssignmentWatcher(memberId)
          }
        }
      }
      if (this.lobbyWatch) {
        this.lobbyWatch;
      }
    },

    grenadeAssignmentWatcher(memberId: string) {
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
  