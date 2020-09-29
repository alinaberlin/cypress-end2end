import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/pages/login.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      login: jest.fn(),
    }

    store = new Vuex.Store({
      actions,
    })
  })

  test('Login page', () => {
    const wrapper = mount(Login, {
      stubs: ['router-link'],
    })
    expect(wrapper).toMatchSnapshot()
  })

  test('Login user', async () => {
    const routerMock = { push: jest.fn() }

    const wrapper = mount(Login, {
      stubs: ['router-link'],
      mocks: { $router: routerMock },
      store,
      localVue,
    })

    const email = wrapper.find('#email')
    email.element.value = 'armagan@coyotiv.com'
    email.trigger('input')

    const password = wrapper.find('#password')
    password.element.value = 'test'
    password.trigger('input')

    await wrapper.find('form').trigger('submit')

    await expect(actions.login).toHaveBeenCalledWith(expect.anything(), {
      email: 'armagan@coyotiv.com',
      password: 'test',
    })

    expect(routerMock.push).toHaveBeenCalledWith('/profile')
  })
})
