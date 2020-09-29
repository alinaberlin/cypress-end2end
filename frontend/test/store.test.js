import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import r from 'randomstring'
import setup from '../store.setup'

axios.defaults.baseURL = 'http://picories.localhost'

describe('store', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore
  let store

  beforeAll(async () => {
    await setup()

    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)

    axios.defaults.baseURL = 'http://picories.localhost'
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
    store.$axios = axios
  })

  describe('count', () => {
    test('default count is 0', () => {
      expect(store.state.count).toBe(0)
    })

    test('should increment', () => {
      store.dispatch('incrementCount')
      expect(store.state.count).toBe(1)
    })
  })

  describe('users', () => {
    test('fetchUser', async () => {
      const users = await store.dispatch('fetchUsers')
      expect(users).toBeTruthy()
    })

    test('register', async () => {
      const registration = async () => {
        const user = {
          name: r.generate(),
          age: 36,
          email: `${r.generate()}@coyotiv.com`,
          password: r.generate(),
        }

        await store.dispatch('register', user)
      }

      await expect(registration).not.toThrow()
    })

    test('login', async () => {
      const user = {
        name: r.generate(),
        age: 36,
        email: `${r.generate()}@coyotiv.com`,
        password: r.generate(),
      }

      await store.dispatch('register', user)

      await store.dispatch('login', {
        email: user.email,
        password: user.password,
      })

      expect(store.state.user).toMatchObject({
        name: user.name,
        email: user.email,
        age: user.age,
      })
    })
  })
})
