<template>
	<div class="posts">
		<div
			:class="[
				'block-title',
				'posts-title',
				featured && 'posts-title_featured',
			]"
		>
			<span
				:class="[
					'posts-title__label',
					featured && 'posts-title__label_featured',
				]"
				>{{ $t(label) }}</span
			>
		</div>
		<div class="posts__list" :class="{ 'posts__list--row': asRow }">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PostList',

		components: {},

		props: {
			asRow: {
				type: Boolean,
				default: false,
			},

			label: {
				type: String,
				default: 'blog_recent',
			},

			featured: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-posts-featured: url('~assets/i/ico-posts-featured.svg?data');
	.posts {
		margin: 40px 0;
		&:first-child {
			margin-top: 0;
		}
		&_recent {
			margin: 0;
		}
		&_related {
			margin: 0;
		}
	}
	.posts-title {
		&_featured {
			margin-top: 0;
			padding: 0;
			text-align: center;
			position: relative;
			justify-content: center;
			&:before {
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				height: 1px;
				display: block;
				background: #fcb43b;
			}
		}

		&__label {
			&_featured {
				position: relative;
				display: inline-flex;
				padding: 7px 14px 7px 36px;
				font-family: 'Proxima Nova Th';
				font-style: normal;
				font-size: 14px;
				line-height: 16px;
				letter-spacing: 0.5px;
				color: #333333;
				text-transform: uppercase;
				border: 1px solid #fcb43b;
				border-radius: 50px;
				background: #ffffff $ico-posts-featured no-repeat 14px 6px;
			}
		}
	}
	.posts__list {
		overflow: hidden;
		&--row {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(0, max-content));
			gap: 28px;
			.post-item {
				margin-bottom: 0;
			}
		}
	}

	@include mq('laptop') {
		.posts__list {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 20px;
			&--row {
				display: grid;
				overflow-x: scroll;
				grid-template-columns: none;
				margin-right: -24px;
				margin-bottom: -16px;
				@include hide-scroll();
				grid-auto-columns: calc((100% - 60px) / 3);
				grid-auto-flow: column;
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.posts__list {
			grid-template-columns: 100%;
			column-gap: 32px;
			row-gap: 0;
			margin-bottom: -4px;
			&--row {
				grid-template-columns: none;
				margin-right: -20px;
				grid-auto-columns: 288px;
				column-gap: 16px;
			}
		}
	}
</style>
