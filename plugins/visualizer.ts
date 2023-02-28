/**
 * Package file volume analysis
 * 打包分析报告
 * 插件必须放到所有插件最后
 */
import { visualizer } from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'

export default function VisualizerConfig() {
  if (process.env.REPORT === 'true') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as Plugin
  }
  return []
}
