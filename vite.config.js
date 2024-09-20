import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import markdownInVue from "./index.js";

export default defineConfig({
  plugins: [
    markdownInVue(),
    vue(),
  ],
})
