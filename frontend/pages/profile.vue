<script>
import Counter from '@/components/counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter },
  async fetch() {
    this.users = await this.fetchUsers()
  },
  data() {
    return {
      users: [],
      time: new Date(),
      message: '',
    }
  },
  computed: {
    ...mapState([
      'currentLiveStream',
      'liveStreams',
      'user',
      'liveStreamMessages',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'goLive',
      'sendMessageToLiveStream',
      'joinStream',
    ]),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
}
</script>

<template lang="pug">
  .home
    h1 Picories {{ user && user.name }}
    p The time is: {{ time }}
    h2 Users
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{ user.name }}
    div(v-if="liveStreams.length")
      h2 Live streams
      div(v-for="stream in liveStreams")
        p {{ stream }}
        button(@click="joinStream(stream)") Join stream
    button(@click="goLive") Go live
    div(v-if="currentLiveStream")
      h3 Live stream
      .messages
        .message(v-for="message in liveStreamMessages")
          p
            span {{ message.author }}:&nbsp;
            span {{ message.body }}
      form(@submit="sendMessage")
        input(type="text" v-model="message")
        input(type="submit" value="Send message")
</template>
