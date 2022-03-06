<template>
    <div class="main-container">
      <nav class="navbar">
      <router-link to="/Home" class="router">Home</router-link>
      <router-link to="/Details" class="router">Detailed</router-link>
      </nav>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
