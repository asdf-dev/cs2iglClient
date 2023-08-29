<template>
  <div class="lobby">
    This is the lobby component.
    <br>
    <br>
    <br>
    <br>
    <br>
    only render this if you're IGL
    IGL todo:
    <li>
      Listener til players håndteres med events
    </li>
    <li>
      Listener til smokes valgt - fjerner allerde valgte smokes
    </li>
    <li>
      list of smokes (remove used) regex + cahce
    </li>
    <li>
      picture comp
    </li>
    <li>
      player view
    </li>
    <IGL />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IGL from "@/components/IGL.vue";

export default defineComponent({
  name: 'LobbyView',
  components: {
    IGL
  },
  mounted() {
    console.log('hello from lobby');
  }
});
</script>
<style></style>