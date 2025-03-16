import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/CS4227ResearchManagementSystem/",
  plugins: [react()],
})
