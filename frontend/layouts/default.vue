<script>
import { mapActions } from 'vuex'

export default {
  name: 'Layout',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<template lang="pug">
  #app
    #nav
      nuxt-link(to="/profile") Profile
      nuxt-link(to="/login") Login
      nuxt-link(to="/register") Register
      a(@click="doLogout" href="#") Logout
    Nuxt
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
