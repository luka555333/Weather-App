<template>
    <div class="main-container">
      <p class="home-p"><router-link to="/Home" class="router">Home</router-link></p>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style lang="scss">
.router{
  font-size: 1.25rem;
  color: white;
  text-decoration: none;
  transition: 0.7s ease-in;
  border-radius: 10px;
  margin-top: 1.25rem;
  padding: 0.6rem;
}
.router:hover{
  background-color: rgba(255,255,255,0.3);

}
</style>