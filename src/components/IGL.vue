<template>
  <div id="IGL" class="border">
    igl view:
    <div id="IGLPlayerList">
      <ul class="no-margin no-padding">
        <li v-for="(player, index) in players" :key="index">
          <div> {{ player.name }} </div>
          <select :v-model="player.name" :id="player.id">
            <option v-for="smoke in smokes" :key="smoke.place" :value="smoke">{{ smoke.place }} - {{ smoke.description }}
            </option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue';
import { Player } from "../model/Player";

export default defineComponent({

  data() {
    return {
      players: [
        { name: "Player1", id: "Player1" },
        { name: "Player2", id: "Player2" },
        { name: "Player3", id: "Player3" },
        { name: "Player4", id: "Player4" },
        { name: "Player5", id: "Player5" }
      ] as Player[],
      smokes: [
        { place: '', pic1: '', pic2: null, description: null }, //first need to be blank
        { place: 'CT', pic1: 'map.png', pic2: 'map_2.png', description: 'fra x til y' },
        { place: 'Stairs', pic1: 'map.png', pic2: 'map_2.png', description: 'fra x til y' },
        { place: 'Jungle', pic1: 'map.png', pic2: 'map_2.png', description: 'fra x til y' },
        { place: 'Default', pic1: 'map.png', pic2: 'map_2.png', description: 'fra x til y' },
      ],

    };
  },
  methods: {

  },
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
  border: 3px solid green;
}
</style>
  