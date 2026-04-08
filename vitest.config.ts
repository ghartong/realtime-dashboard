import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {
    setupFiles: ['src/__tests__/setupTests.ts'],
    globals: true,
    environment: 'jsdom',
    include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/components/ui/**/*',
        'src/**/*.d.ts'
      ]
    }
  }
})

// using globals true lets us write tests without importing describe, it, expect, etc. in every file.
// The setupFiles option points to a file that will be executed before each test file, allowing us to 
// set up the testing environment (like extending expect with jest-dom matchers and cleaning up after each test). 
// However, our ide linter may freak out about describe, it, expect, etc. being undefined in our test files. 
// To fix this, we can configure the linter to recognize them as globals in the context of test files.