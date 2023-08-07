<template>
    <div id="smokePic">
        <div>
            <div v-if="imageUrl2">
                <div class="centered" style="font-size: large; padding-left: 5px; padding-right: 5px;">
                    {{ givenGrenade?.description }}
                    <br>
                    <div id="smokepicJumpthrow" v-if="givenGrenade?.jumpthrow">
                        <b>Jumpthrow</b>
                    </div>
                </div>
                <img v-if="!showHoverImage" :src="imageUrl2" @mouseover="showHoverImage = true"
                    style="width: 1050px; height: 820px;" />
                <img v-else :src="imageUrl1" @mouseout="showHoverImage = false" style="width: 1050px; height: 820px;" />
            </div>
            <div v-else style="width: 1050px; height: 820px;">
                <h1>waiting for IGL</h1>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import { lobbyStore, reactiveLobby } from "@/store/LobbyStore";
import { Grenade } from '@/model/Grenade';

export default defineComponent({

    setup() {
        const imageUrl1 = ref('')
        const imageUrl2 = ref('')
        const userId = localStorage.getItem("id")
        const somePicture = ref<string>('');
        const showHoverImage = ref(false);
        const givenGrenade = ref<Grenade>()
        return { showHoverImage, somePicture, lobby: ref<reactiveLobby>(lobbyStore), userId, imageUrl1, imageUrl2, givenGrenade }
    },
    created() {
        watch(() => lobbyStore.lobby, (newVal, oldVal) => {
            watch(() => lobbyStore.lobby?.members[this.userId!].grenadeAssignment, (newGrenadeAssignment, oldGrenadeAssignment) => {
                if (newGrenadeAssignment?.imageUrl != null) {
                    this.imageRefactor(newGrenadeAssignment.imageUrl)
                    console.debug("newGrenadeAssignment: ", newGrenadeAssignment)
                    this.givenGrenade = newGrenadeAssignment
                }
            })
        })
    },
    methods: {
        imageRefactor(imageUrl: string) {
            //image name will allways be: SIDE_JUMPTHROW_DESCRIPTION-HERE_NUMBE.jpg
            // eg: T_false_smoke-ct-fra-tetris_1
            this.imageUrl1 = imageUrl
            this.imageUrl2 = imageUrl.replace('1', '2')
        }
    },
});
</script>
<style scoped>
.container {
    position: relative;
    text-align: center;
    color: white;
}

.centered {
    position: absolute;
    top: 80%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.596);
    transform: translate(-50%, -50%);
}
</style>
  