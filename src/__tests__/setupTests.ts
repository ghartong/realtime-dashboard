import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

// Extends Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Mock a window.matchMedia implementation for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: unknown) => ({
    matches: false, // Default value for your tests
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated but often needed for older hooks
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});


// Runs a cleanup after each test case (common for React)
afterEach(() => {
  cleanup()
})
