import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default function NaiveResolver() {
	return Components({
		dts: 'src/types/components.d.ts',
		dirs: ['src/components'],
		resolvers: [NaiveUiResolver()]
	})
}
