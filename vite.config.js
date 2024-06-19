// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
<<<<<<< HEAD
export default defineConfig({
  build: '/notes/',
  plugins: [react()],
=======
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/notes/'
  }

  return config
>>>>>>> a7516a912ed491a9f8c947bb93054739621aaaa1
})
