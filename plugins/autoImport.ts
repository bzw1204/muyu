import AutoImport from 'unplugin-auto-import/vite'

export default function NaiveAutoImport() {
	return AutoImport({
		dts: 'src/types/auto-import.d.ts',
		dirs:['src/store',],
		imports: [
			'vue',
			'vue-router',
			'pinia',
			{
				'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar', 'NIcon']
			}
		]
	})
}
