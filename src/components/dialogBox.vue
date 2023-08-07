<template>
    <div v-if="dialogVisible" class="dialog-container">
        <div class="dialog">
            <input v-model="inputValue" placeholder="Enter username" />
            <button @click="setUsername">Save</button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { createUser } from '@/service/dataService';
import { ref, watch } from 'vue';

export default {
    props: {
        isOpen: Boolean,
    },
    setup(props: any) {
        const inputValue = ref('');
        const dialogVisible = ref(props.isOpen);

        watch(() => props.isOpen, (newValue) => {
            dialogVisible.value = newValue;
        });

        const setUsername = () => {
            const resp = createUser(inputValue.value)
            resp.then(value => {
                localStorage.setItem('id', value.id);
                localStorage.setItem('username', value.name);
            })
            dialogVisible.value = false;
        };

        return {
            inputValue,
            setUsername,
            dialogVisible,
        };
    },
}
</script>
  
<style scoped>
.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
