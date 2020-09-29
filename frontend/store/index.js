import axios from 'axios'

// import io from 'socket.io-client'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

// const socket = io(process.env.VUE_APP_BASE_URL)

const Mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
  SET_LIVE_STREAM: 'set live stream',
  ADD_LIVE_STREAM: 'add live stream',
  ADD_MESSAGE_TO_LIVE_STREAM: 'add message to live stream',
}

export const state = () => ({
  count: 0,
  user: null,
  currentLiveStream: null,
  liveStreams: [],
  liveStreamMessages: [],
})

export const mutations = {
  [Mutations.INCREMENT_COUNT](state) {
    state.count++
  },
  [Mutations.SET_USER](state, user) {
    state.user = user
  },
  [Mutations.SET_LIVE_STREAM](state, live) {
    state.currentLiveStream = live
  },
  [Mutations.ADD_LIVE_STREAM](state, stream) {
    state.liveStreams.push(stream)
  },
  [Mutations.ADD_MESSAGE_TO_LIVE_STREAM](state, message) {
    state.liveStreamMessages.push(message)
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const user = await this.$axios.get('/api/account/session')

    commit(Mutations.SET_USER, user.data || null)
  },
  incrementCount({ commit }) {
    commit(Mutations.INCREMENT_COUNT)
  },
  async fetchUser(store, id) {
    const userRequest = await this.$axios.get(`/api/users/${id}`)
    return userRequest.data
  },
  async fetchUsers() {
    const usersRequest = await this.$axios.get('/api/users')
    return usersRequest.data
  },
  async fetchSession({ commit }) {
    const user = await this.$axios.get('/api/account/session')

    commit(Mutations.SET_USER, user.data || null)
  },
  async login({ commit }, credentials) {
    const user = await this.$axios.post('/api/account/session', credentials)
    commit(Mutations.SET_USER, user.data)
  },
  register(store, user) {
    return this.$axios.post('/api/account', user)
  },
  async logout({ commit }) {
    await this.$axios.delete('/api/account/session')
    commit(Mutations.SET_USER, null)
  },
  goLive({ state, commit }) {
    // socket.emit('go live', state.user._id, (status) => {
    //   commit(Mutations.SET_LIVE_STREAM, state.user._id)
    // })
  },
  addLiveStream({ state, commit }, stream) {
    commit(Mutations.ADD_LIVE_STREAM, stream)
  },
  sendMessageToLiveStream({ state, commit }, body) {
    const message = {
      body,
      author: state.user.name,
    }
    commit(Mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
    // socket.emit('new message', state.currentLiveStream, message)
  },
  joinStream({ state, commit }, stream) {
    // socket.emit('join stream', stream)
    commit(Mutations.SET_LIVE_STREAM, stream)
  },
}

// socket.on('new live stream', (user) => {
//   store.dispatch('addLiveStream', user)
// })

// socket.on('new live stream message', (message) => {
//   store.commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
// })
