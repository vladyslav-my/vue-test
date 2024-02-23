<template>
   <div>
      Its index {{ store.count }}
      <button @click="store.increment">+</button>
      <my-button></my-button>
   </div>
</template>

<script setup>

import { useCounterStore } from '@/stores/useCounterStore';
const store = useCounterStore();

onMounted(() => {
   console.log(store);
})

</script>
<style lang="css">
   
</style>