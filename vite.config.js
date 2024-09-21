import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";


import MarkdownInVue from "./index.js";

export default defineConfig({
  plugins: [
    MarkdownInVue(),
    MarkdownInVue({
      elementNameBlock: "MdBlock",
      elementNameInline: "MdInline"
    }),
    Markdown(),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
  ],
})
