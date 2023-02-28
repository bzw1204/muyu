import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 支持setup语法糖name属性
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import { NaiveAutoImport, NaiveResolver } from './plugins'

export default defineConfig({
  base: './',
  plugins: [vue(), VueSetupExtend(), WindiCSS(), NaiveAutoImport(), NaiveResolver()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.', 'src')
    }
  }
})
