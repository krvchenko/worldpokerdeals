<template>
	<ul
		class="breadcrumb-list"
		itemscope
		itemtype="http://schema.org/BreadcrumbList"
	>
		<breadcrumb-item
			:slug="null"
			:title="$t('menu.main')"
			:index="0"
			:parent="null"
			:last="false"
			:white="white"
		></breadcrumb-item>

		<slot />
		<breadcrumb-item
			v-if="auto"
			v-for="(item, index) in items"
			:key="item.id"
			:slug="item.slug"
			:title="item.title || item.heading || item.slug"
			:index="index"
			:parent="item.parent"
			:last="index === Object.keys(items).length - 1"
			:white="white"
		></breadcrumb-item>
	</ul>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'BreadcrumbList',

		components: {},

		props: {
			white: {
				type: Boolean,
				default: false,
			},

			auto: {
				type: Boolean,
				default: true,
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				pageable: 'pages/page',
			}),

			items() {
				return this.pageable ? this.flatten(this.pageable) : null
			},
		},

		watch: {},

		methods: {
			flatten(obj) {
				const array = Array.isArray(obj) ? obj : [obj]
				return array.reduce((acc, value) => {
					acc.push(value)
					if (value.parent) {
						acc = acc.concat(this.flatten(value.parent))
					}
					return acc.reverse()
				}, [])
			},
		},
	}
</script>

<style lang="scss">
	.breadcrumb-list {
		margin: 0;
		padding: 20px 0 16px 0;
		font-size: 0;
	}
</style>
