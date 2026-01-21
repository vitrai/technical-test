import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Mock fetch
global.fetch = vi.fn()

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toBe('Technical Test App')
    expect(wrapper.find('input#textbox').exists()).toBe(true)
  })

  it('has a textbox with placeholder', () => {
    const wrapper = mount(App)
    const input = wrapper.find('input#textbox')
    expect(input.attributes('placeholder')).toBe('Type something...')
  })

  it('calls the backend on input change', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: 'OK' }),
    })

    const wrapper = mount(App)
    const input = wrapper.find('input#textbox')
    
    await input.setValue('test input')
    await input.trigger('input')

    // Wait for async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/do-work',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: 'test input' }),
      })
    )
  })

  it('displays the response from the backend', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: 'OK' }),
    })

    const wrapper = mount(App)
    const input = wrapper.find('input#textbox')
    
    await input.setValue('test')
    await input.trigger('input')

    // Wait for async operations
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(wrapper.text()).toContain('Response: OK')
  })

  it('does not call the backend when input is empty', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input#textbox')
    
    await input.setValue('')
    await input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(fetch).not.toHaveBeenCalled()
  })
})
