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
      lobbyWatch: null as ReturnType<typeof watch> | null,
      smokes: [
        //generated with pictureToJson script
        { map: "", team: "", jumpthrow: false, description: "Unassigned", imageUrl: "" }, //DO NOT REMOVE ME


        //Inferno
        { map: "Inferno", team: "T", jumpthrow: true, description: "a pit", imageUrl: "maps/Inferno/T_true_a-pit_1.jpg" },
        { map: "Inferno", team: "CT", jumpthrow: false, description: "a balc", imageUrl: "maps/Inferno/CT_false_a-balc_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "a lib", imageUrl: "maps/Inferno/T_true_a-lib_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "right top mid", imageUrl: "maps/Inferno/T_flase_right-top-mid_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: true, description: "A mini pit", imageUrl: "maps/Inferno/t_true_A-mini-pit_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "arch", imageUrl: "maps/Inferno/T_true_arch_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B ct", imageUrl: "maps/Inferno/t_false_B-ct_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B coffin", imageUrl: "maps/Inferno/t_false_B-coffin_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "a heaven", imageUrl: "maps/Anubis/T_true_a-heaven_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "a con", imageUrl: "maps/Anubis/T_true_a-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "a stair", imageUrl: "maps/Anubis/T_false_a-stair_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "mid sniper nest", imageUrl: "maps/Anubis/T_true_mid-sniper-nest_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "b con", imageUrl: "maps/Anubis/T_false_b-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b plat", imageUrl: "maps/Anubis/T_true_b-plat_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Anubis/T_false_b-default_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b ct", imageUrl: "maps/Anubis/T_true_b-ct_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b water", imageUrl: "maps/Anubis/T_true_b-water_1.jpg" },

        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "a stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "a ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "a jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b window", imageUrl: "maps/Mirage/T_true_b-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Mirage/T_false_b-default_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b left arch", imageUrl: "maps/Mirage/T_true_b-left-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b door", imageUrl: "maps/Mirage/T_true_b-door_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b right arch", imageUrl: "maps/Mirage/T_false_b-right-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid conn", imageUrl: "maps/Mirage/T_true_mid-conn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid kort", imageUrl: "maps/Mirage/T_true_mid-kort_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "mid cat", imageUrl: "maps/Mirage/T_false_mid-cat_1.jpg" },

        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site venstre", imageUrl: "maps/Vertigo/T_false_a-site-venstre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site kort", imageUrl: "maps/Vertigo/T_false_a-site-kort_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site højre", imageUrl: "maps/Vertigo/T_false_a-site-højre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "mid heaven", imageUrl: "maps/Vertigo/T_false_mid-heaven_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Vertigo/T_false_b-default_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "B kryds", imageUrl: "maps/Vertigo/T_false_B-kryds_1.jpg" },

        //Ancient
        { map: "Ancient", team: "T", jumpthrow: true, description: "a temple", imageUrl: "maps/Ancient/T_true_a-temple_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "a ct", imageUrl: "maps/Ancient/T_true_a-ct_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid donut", imageUrl: "maps/Ancient/T_true_mid-donut_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid ct", imageUrl: "maps/Ancient/T_true_mid-ct_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b cave", imageUrl: "maps/Ancient/T_true_b-cave_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b right", imageUrl: "maps/Ancient/T_true_b-right_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b left", imageUrl: "maps/Ancient/T_true_b-left_1.jpg" },

        //Nuke
        { map: "Nuke", team: "T", jumpthrow: false, description: "a heaven", imageUrl: "maps/Nuke/T_false_a-heaven_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "yard sec", imageUrl: "maps/Nuke/T_true_yard-sec_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "yard first", imageUrl: "maps/Nuke/T_true_yard-first_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "garge", imageUrl: "maps/Nuke/T_true_garge_1.jpg" }
      ],
      executeMaps: ['Mirage', 'Inferno', 'Anubis', 'Ancient', 'Vertigo'],

      aExecute: [
        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "a stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "a ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "a jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },

        //Inferno
        { map: "Inferno", team: "T", jumpthrow: true, description: "a pit", imageUrl: "maps/Inferno/T_true_a-pit_1.jpg" },
        { map: "Inferno", team: "CT", jumpthrow: false, description: "a balc", imageUrl: "maps/Inferno/CT_false_a-balc_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "a lib", imageUrl: "maps/Inferno/T_true_a-lib_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "a heaven", imageUrl: "maps/Anubis/T_true_a-heaven_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "a con", imageUrl: "maps/Anubis/T_true_a-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "a stair", imageUrl: "maps/Anubis/T_false_a-stair_1.jpg" },
        

        //Ancient
        { map: "Ancient", team: "T", jumpthrow: true, description: "a temple", imageUrl: "maps/Ancient/T_true_a-temple_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "a ct", imageUrl: "maps/Ancient/T_true_a-ct_1.jpg" },

        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site venstre", imageUrl: "maps/Vertigo/T_false_a-site-venstre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site kort", imageUrl: "maps/Vertigo/T_false_a-site-kort_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site højre", imageUrl: "maps/Vertigo/T_false_a-site-højre_1.jpg" },
      ],

      midExecute: [
        //Mirage
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid conn", imageUrl: "maps/Mirage/T_true_mid-conn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid kort", imageUrl: "maps/Mirage/T_true_mid-kort_1.jpg" },

        //Inferno
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "right top mid", imageUrl: "maps/Inferno/T_flase_right-top-mid_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "mid sniper nest", imageUrl: "maps/Anubis/T_true_mid-sniper-nest_1.jpg" },

        //Ancient 
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid donut", imageUrl: "maps/Ancient/T_true_mid-donut_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid ct", imageUrl: "maps/Ancient/T_true_mid-ct_1.jpg" },
        
        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "mid heaven", imageUrl: "maps/Vertigo/T_false_mid-heaven_1.jpg" },
      ],

      bExecute: [
        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "b right arch", imageUrl: "maps/Mirage/T_false_b-right-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b left arch", imageUrl: "maps/Mirage/T_true_b-left-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Mirage/T_false_b-default_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b window", imageUrl: "maps/Mirage/T_true_b-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b door", imageUrl: "maps/Mirage/T_true_b-door_1.jpg" },

        //Inferno
        { map: "Inferno", team: "t", jumpthrow: false, description: "B ct", imageUrl: "maps/Inferno/t_false_B-ct_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B coffin", imageUrl: "maps/Inferno/t_false_B-coffin_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: false, description: "b con", imageUrl: "maps/Anubis/T_false_b-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b plat", imageUrl: "maps/Anubis/T_true_b-plat_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Anubis/T_false_b-default_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b ct", imageUrl: "maps/Anubis/T_true_b-ct_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b water", imageUrl: "maps/Anubis/T_true_b-water_1.jpg" },

        //Ancient
        { map: "Ancient", team: "T", jumpthrow: true, description: "b cave", imageUrl: "maps/Ancient/T_true_b-cave_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b right", imageUrl: "maps/Ancient/T_true_b-right_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b left", imageUrl: "maps/Ancient/T_true_b-left_1.jpg" },

        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Vertigo/T_false_b-default_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "b kryds", imageUrl: "maps/Vertigo/T_false_B-kryds_1.jpg" },

      ]

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
    this.addToKnownUsers()
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

    aExecuteBtn(map: string) {
      //lige nu har vi kun mirage.. På sigt rename Amirage til AExecute. Temp list filter på mapnavn
      console.log("a")
      let filtered = this.aExecute.filter( item => item.map == map)
      this.executeHandler(filtered)
    },
    bExecuteBtn(map: string) {
      let filtered = this.aExecute.filter( item => item.map == map)
      this.executeHandler(filtered)
    },
    midExecuteBtn(map: string) {
      let filtered = this.aExecute.filter( item => item.map == map)
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
  