import 'vue-router'

declare module 'vue-router' {
	export declare interface RouteMeta {
		name?: string // The locale name show in side menu and breadcrumb
		icon?: Component // The icon show in the side menu
		order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is
		hidden?: boolean // If true, it is not displayed in the side menu
		permission?: string[] // Controls roles that have access to the page
		affix?: boolean // if set true, the tag will not affix in the tab-bar
		ignoreCache?: boolean // if set true, the page will not be cached
	}
}
