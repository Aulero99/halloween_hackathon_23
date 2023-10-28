<template>
    <Playspace/>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState';
import vars from './variables.json'
import { logger } from './utils/Logger';
import Playspace from './components/Playspace.vue';
  export default {
  components: { Playspace },
    setup() {
        
        onMounted(()=>{
        })

      return {
        appState: computed(() => AppState)
      }
    }
  }
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

</style>