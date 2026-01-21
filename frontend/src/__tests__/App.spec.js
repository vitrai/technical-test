import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Mock fetch
global.fetch = vi.fn()

describe('App', () => {
  beforeEach(() => {
    fetch.mockReset()
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
    const mockResponse = {
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ message: 'OK' }),
    }
    fetch.mockResolvedValueOnce(mockResponse)

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

  it('does not call the backend when input is empty', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input#textbox')
    
    await input.setValue('')
    await input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(fetch).not.toHaveBeenCalled()
  })
})
