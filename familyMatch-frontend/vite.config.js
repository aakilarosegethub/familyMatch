import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  

  //Added this proxy so that we can use the api without any CORS issues
  // server: {
  //   proxy: {
  //     '/api': {
  //       // target: 'http://192.168.0.169/familymatch',
  //       target: 'https://familymatch.aakilarose.com/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api'),
  //     },
  //   },
  // },
})



// //test
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://192.168.0.170',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/familymatch/api'),
//       },
//     },
//   },
// })

