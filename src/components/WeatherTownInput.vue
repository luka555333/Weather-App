<template>
  <div>
    <input
        type="text"
        placeholder="Enter city name..."
        class="input-search"
        v-model="city"
    >
  </div>
</template>

<script setup>
const city = defineModel()
</script>

<style lang="scss" scoped>

</style>