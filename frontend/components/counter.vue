<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Counter',
  computed: {
    ...mapState(['count']),
  },
  mounted() {
    this.incrementCount()
  },
  methods: {
    ...mapActions(['incrementCount']),
  },
}
</script>

<template lang="pug">
  div
    p Pages I've visited: {{ count }}
</template>
