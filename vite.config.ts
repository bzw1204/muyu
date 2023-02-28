import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 支持setup语法糖name属性
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import { NaiveAutoImport, NaiveResolver, VisualizerConfig } from './plugins'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_PATH,
    plugins: [vue(), VueSetupExtend(), WindiCSS(), NaiveAutoImport(), NaiveResolver(), VisualizerConfig()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '.', 'src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'naive-ui': ['naive-ui'],
            'vue': ['vue', 'vue-router', 'pinia']
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
})
