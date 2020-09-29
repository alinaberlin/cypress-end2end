import { mount, createLocalVue } from '@vue/test-utils'
import Counter from '@/components/counter.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('Counter', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      incrementCount: jest.fn(),
    }

    store = new Vuex.Store({
      actions,
    })
  })

  test('Count goes up when mounted', () => {
    mount(Counter, { store, localVue })
    expect(actions.incrementCount).toHaveBeenCalled()
  })
})
