import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Vite config is being loaded!')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/c300': 'http://showroom.eis24.me'
    },
  },
})

/* 
prev version

proxy: {
  "/api": {
    target: "http://showroom.eis24.me",
      changeOrigin: true,
      secure: false,
    },
  },
},

proxy: {
      '/c300': {
        target: "https://showroom.eis24.me",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/c300/, ''),
      },
    },
*/