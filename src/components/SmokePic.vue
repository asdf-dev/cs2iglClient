<template>
    <div id="smokePic">
        <div v-if="imageUrl1">
            <img v-if="!showHoverImage" :src="imageUrl1" @mouseover="showHoverImage = true"
                style="width: 1050px; height: 820px;" />
            <img v-else :src="imageUrl2" @mouseout="showHoverImage = false" style="width: 1050px; height: 820px;" />
        </div>
        <div v-else style="width: 1050px; height: 820px;">
            <h1>waiting for IGL</h1>
        </div>
    </div>
</template>
  
<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import { lobbyStore, reactiveLobby } from "@/store/LobbyStore";

export default defineComponent({

    setup() {
        const imageUrl1 = ref('')
        const imageUrl2 = ref('')
        const userId = localStorage.getItem("id")
        const somePicture = ref<string>('');
        const showHoverImage = ref(false);
        return { showHoverImage, somePicture, lobby: ref<reactiveLobby>(lobbyStore), userId, imageUrl1, imageUrl2 }
    },
    created() {
        watch(() => lobbyStore.lobby, (newVal, oldVal) => {
            watch(() => lobbyStore.lobby?.members[this.userId!].grenadeAssignment, (newGrenadeAssignment, oldGrenadeAssignment) => {
                if (newGrenadeAssignment?.imageUrl != null) {
                    this.imageRefactor(newGrenadeAssignment.imageUrl)
                }
            })
        })
    },
    methods: {
        imageRefactor(imageUrl: string) {
            //image name will allways be: SIDE_WHERE_DESCRIPTION-HERE_NUMBE.jpg
            // eg: T_CT_smoke-ct-fra-tetris_1
            this.imageUrl1 = imageUrl
            this.imageUrl2 = imageUrl.replace('1', '2')
        }
    },
    components: {

    }
});
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  