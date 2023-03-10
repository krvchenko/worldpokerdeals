<template>
	<div
		:class="['page-banner']"
		:style="{
			background: background,
		}"
	>
		<img
			class="page-banner__img"
			decoding="async"
			loading="lazy"
			width="198px"
			height="200px"
			:src="require(`~/assets/i/${image}`)"
			alt="title"
		/>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{
				name: 'index',
				params: {
					parent: page.parent ? page.parent.slug : page.slug,
					child: page.parent ? page.slug : null,
				},
			}"
		>
			<a
				class="page-banner__link"
				:href="href"
				@click="navigate"
				draggable="false"
			>
				<div class="page-banner__wrap">
					<span class="page-banner__title">{{ title }}</span>
					<span class="page-banner__text">{{ text }}</span>
				</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'PageBannersItem',

		components: {},

		props: {
			page: {
				type: Object,
			},
			title: {
				type: String,
				default: '',
			},
			text: {
				type: String,
				default: '',
			},
			image: {
				type: String,
				default: '',
			},
			background: {
				type: String,
				default: '',
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-card-arrow: url('~assets/i/ico-card-arrow.svg?data');
	.page-banner {
		margin-right: 20px;
		position: relative;
		min-width: 228px;
		max-width: 262px;
		min-height: 200px;
		border-radius: 10px;
		overflow: hidden;
		flex-basis: 100%;
		transition: margin-top 0.1s ease, box-shadow 0.1s ease;
		&:last-child {
			margin-right: 0;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: block;
			background: linear-gradient(
				120.23deg,
				rgba(0, 0, 0, 0.9) 0%,
				rgba(0, 0, 0, 0.0001) 100%
			);
			opacity: 0.5;
			z-index: 1;
		}
		&:hover {
			margin-top: -8px;
			box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
		}
		&__img {
			display: block;
			position: absolute;
			right: 0;
			bottom: 0;
			z-index: 2;
		}
		&__link {
			min-height: 200px;
			padding: 28px 24px 24px 24px;
			display: block;
			position: relative;
			text-decoration: none;
			z-index: 2;
			&:hover {
				text-decoration: none;
			}
			&:after {
				content: '';
				left: 24px;
				bottom: 24px;
				position: absolute;
				width: 28px;
				height: 12px;
				display: block;
				background: $ico-card-arrow no-repeat center;
			}
		}
		&__wrap {
			max-width: 75%;
		}
		&__title {
			display: block;
			margin-bottom: 16px;
			font-family: 'Proxima Nova Th';
			font-size: 24px;
			line-height: 28px;
			letter-spacing: -0.3px;
			color: #ffffff;
		}
		&__text {
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 16px;
			color: #ffffff;
			opacity: 0.9;
		}
	}

	@include mq('laptop') {
		.page-banner {
			min-width: 288px;
			background: none;
		}
	}
</style>
