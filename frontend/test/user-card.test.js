import { mount } from '@vue/test-utils'
import UserCard from '@/components/user-card.vue'

describe('UserCard component', () => {
  test('Renders an example user', () => {
    const wrapper = mount(UserCard, {
      propsData: {
        user: {
          name: 'Armagan Amcalar',
          age: '36',
          photos: [{ filename: '/test.jpg', likedBy: [{ name: 'Mihri' }] }],
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
