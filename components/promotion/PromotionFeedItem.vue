<template>
	<div class="promotion-feed-item">
		<div class="promotion-feed-item__content">
			<div class="promotion-feed-item__icon-wrapper">
				<svg-icon
					class="promotion-feed-item__icon"
					:icon="parent ? parent.slug : room.slug"
					:width="42"
					:height="42"
					:image="true"
					view-box="0 0 200 200"
				/>
			</div>

			<div class="promotion-feed-item__text">
				<span
					:style="{
						color: category.label_color,
						borderColor: category.label_color,
					}"
					:class="{
						'promotion-feed-item__category': true,
						[`promotion-feed-item__category_${category.id}`]: true,
					}"
					>{{ category.name }}
				</span>
				<span class="promotion-feed-item__title">{{ title }}</span>
			</div>

			<span v-if="type === 'bonus'" class="promotion-feed-item__params">
				<span class="promotion-feed-item__cashback">
					<span class="promotion-feed-item__params-label">{{ $t('cashback') }}</span>
					{{ cashback_value }}%
				</span>
				<span class="promotion-feed-item__deposit">
					<span class="promotion-feed-item__params-label">{{ $t('deposit') }}</span>
					+{{ deposit_bonus }}%
				</span>
				<span class="promotion-feed-item__max">
					<span class="promotion-feed-item__params-label">{{ $t('max_bonus') }}</span>
					<template v-if="max_bonus_currency">{{
						max_bonus_currency.symbol
					}}</template>
					{{ max_bonus }}
				</span>
			</span>

			<span v-else class="promotion-feed-item__params">
				<span class="promotion-feed-item__prize">
					<span class="promotion-feed-item__params-label">{{ $t('prize_pool') }}</span>
					{{ formatMoney(prize) }}
					<template v-if="currency">{{ currency.symbol }}</template>
				</span>

				<span
					v-if="permanent && regularity"
					class="promotion-feed-item__regularity"
				>
					<span class="promotion-feed-item__params-label">{{ $t('permanent') }}</span>
					{{ regularity }}
				</span>

				<template v-else>
					<span class="promotion-feed-item__start">
						<span class="promotion-feed-item__params-label">{{ $t('time_start') }}</span>
						{{ dateFormat(start) }}
					</span>

					<span class="promotion-feed-item__end">
						<span class="promotion-feed-item__params-label">{{ $t('time_end') }}</span>
						{{ dateFormat(end) }}
					</span>
				</template>
			</span>

			<div class="promotion-feed-item__actions">

				<bonus-code
					v-if="type === 'bonus'"
					:code="code"
					:small="true"
				/>

				<span
					v-else-if="time_left || time_before"
					class="promotion-feed-item__countdown"
				>
					<span class="promotion-feed-item__countdown-label">
						<template v-if="time_left">{{ $t('time_left') }}</template>
						<template v-if="time_before">{{ $t('time_before') }}</template>
					</span>
					<countdown v-if="time_left" :days="time_left.days" :live="true" />
					<countdown v-if="time_before" :days="time_before.days" />
				</span>

				<span class="promotion-feed-item__buttons">
					<room-action-button
						class="btn-get-promotion"
						:icon="false"
						type="download"
						:label="type === 'promotion' ? $t('get_in') : $t('get')"
						:slug="room.slug"
						:url="room.url"
					/>

					<nuxt-link
						v-if="hasPage"
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
							:class="['btn btn-promotion-review']"
							:href="href"
							@click="navigate"
						></a>
					</nuxt-link>
				</span>
			</div>
		</div>

		<div
			:class="[
				'promotion-feed-item__info',
				showTerms && 'promotion-feed-item__info--expanded',
			]"
		>
			<span
				:class="[
					'promotion-feed-item__terms',
					showTerms && 'promotion-feed-item__terms--expanded',
				]"
				@click="terms ? (showTerms = !showTerms) : (showTerms = false)"
			>
				<i class="promotion-feed-item__terms-icon"></i>
				<span>{{ $t('more') }}</span>
			</span>
<!-- 			<span
				:class="{
					'promotion-feed-item__avaliable': true,
					[`promotion-feed-item__avaliable_yes`]: !room.restricted,
					[`promotion-feed-item__avaliable_no`]: room.restricted,
				}"
			>
				<svg-icon
					width="16px"
					height="16px"
					:icon="country.code"
					:image="true"
					prefix="flags/"
				/>
				<span v-if="room.restricted">{{
					$t('room_geo_restricted', { country: country.from })
				}}</span>
				<span v-else>{{
					$t('room_geo_allowed', { country: country.from })
				}}</span>
			</span> -->
		</div>

		<div
			class="promotion-feed-item__terms-text"
			v-show="showTerms"
			v-html="terms"
		></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PromotionFeedItem',

		components: {},

		props: {
			index: {
				type: [String, Number],
			},

			type: {
				type: [String],
				default: 'bonus',
			},

			time_left: {
				type: Object,
			},

			time_before: {
				type: Object,
			},

			title: {
				type: String,
				required: true,
			},

			slug: {
				type: String,
				required: true,
			},

			url: {
				type: [String, Boolean, Number],
			},

			available: {
				type: [Number, Boolean],
			},

			closed: {
				type: [Number, Boolean],
			},

			created: {
				type: String,
				required: true,
			},

			code: {
				type: [String, Boolean],
				default: false,
			},

			category: {
				type: Object,
			},

			room: {
				type: Object,
			},

			page: {
				type: Object,
			},

			min_deposit: {
				type: Number,
				default: 0,
			},

			min_deposit_currency: {
				type: [Object, Boolean],
				default: false,
			},

			cashback_value: {
				type: Number,
				default: 0,
			},

			max_bonus: {
				type: Number,
				default: 0,
			},

			max_bonus_currency: {
				type: [Object, Boolean],
				default: false,
			},

			deposit_bonus: {
				type: Number,
				default: 0,
			},

			prize: {
				type: [Number, String],
				default: null,
			},

			currency: {
				type: [String, Object],
				default: null,
			},

			start: {
				type: String,
				default: '',
			},

			end: {
				type: String,
				default: '',
			},

			regularity: {
				type: String,
			},

			permanent: {
				type: Boolean,
				default: false,
			},

			terms: {
				type: [String, Boolean],
				default: '',
			},

			hasPage: {
				type: [Boolean, Number],
				default: true,
			},
		},

		data: () => ({
			showTerms: false,
			codeHovered: false,
		}),

		created() {},

		mounted() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				locale: 'lang/locale',
				locales: 'lang/locales',
				country: 'location/country',
				parent: 'rooms/room',
			}),
		},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
			formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ',') {
				try {
					decimalCount = Math.abs(decimalCount)
					decimalCount = isNaN(decimalCount) ? 2 : decimalCount

					const negativeSign = amount < 0 ? '-' : ''

					let i = parseInt(
						(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
					).toString()
					let j = i.length > 3 ? i.length % 3 : 0

					return (
						negativeSign +
						(j ? i.substr(0, j) + thousands : '') +
						i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
						(decimalCount
							? decimal +
							  Math.abs(amount - i)
									.toFixed(decimalCount)
									.slice(2)
							: '')
					)
				} catch (e) {}
			},
		},
	}
</script>

<style scoped lang="scss">
	$ico-arrow-right: url('~assets/i/promotion/ico-bonus-arrow-right.svg?data');
	$ico-terms: url('~assets/i/promotion/ico-bonus-terms.svg?data');
	$ico-scissors: url('~assets/i/promotion/ico-scissors.svg?data');

	.promotion-feed-item {
		display: grid;
		grid-template-columns: 1fr;
		background: #ffffff;
		border: none;

		&__table {
			width: 100%;
		}

		&__content {
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			display: grid;
			gap: 16px;
			padding: 20px;
			grid-template-columns: 42px minmax(0, 1fr) minmax(188px, max-content);
			grid-template-areas:
				'icon text actions'
				'icon bonus actions';
		}

		&__title {
		}

		&__icon {
			width: 100%;
			height: auto;
			border-radius: 4px;
		}
		&__icon-wrapper {
			grid-area: icon;
			align-self: start;
			width: 100%;
			border-radius: 4px;
			display: block;
		}
		&__text {
			grid-area: text;
			display: flex;
			flex-direction: column;
			border: none;
			padding: 0;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 18px;
			line-height: 22px;
			color: #222222;
		}

		&__actions {
			grid-area: actions;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			padding: 0;
			position: relative;
		}

		&__info {
			border: 1px solid #e9e9e9;
			padding: 8px 20px;
			background: #fafafa;
			border-bottom-width: 2px;
			font-size: 0;
			&--expanded {
				border-bottom: none;
			}
		}

		&__terms-text {
			border: 1px solid #e9e9e9;
			border-top: none;
			background: #fafafa;
			padding: 4px 20px 20px 20px;
			&::v-deep ol {
				margin: 0;
				padding: 0;
				list-style-position: inside;
			}

			&::v-deep ul {
				margin: 0;
				padding: 0;
				list-style-position: inside;
			}

			&::v-deep ol {
				margin-bottom: 20px;
				list-style-type: decimal;
				&:last-child {
					margin: 0;
				}
			}

			&::v-deep ul {
				margin-bottom: 20px;
				list-style: none;
				&:last-child {
					margin: 0;
				}
			}

			&::v-deep ol > li {
				margin: 0 0 10px 0;
				padding: 0;
				font-family: 'Proxima Nova';
				font-size: 15px;
				line-height: 18px;
				color: #777777;
				&:last-child {
					margin: 0;
				}
				&:before {
					display: none;
				}
			}

			&::v-deep ul li {
				margin: 0 0 10px 0;
				padding: 0 0 0 0;
				font-family: 'Proxima Nova';
				font-size: 15px;
				line-height: 18px;
				color: #777777;
				&:last-child {
					margin: 0;
				}
				&:before {
					display: none;
					// top: 7px;
					// left: 0px;
				}
			}

			&::v-deep p {
				margin: 0 0 16px 0;
				font-family: 'Proxima Nova';
				font-size: 15px;
				line-height: 18px;
				color: #777777;
				&:last-child {
					margin: 0;
				}
			}
		}

		&_cashback,
		&_deposit,
		&_max {
			position: relative;
			&:before {
				content: '';
				top: calc(50% - (40px / 2));
				left: 0px;
				position: absolute;
				display: block;
				width: 1px;
				height: calc(100% / 2);
				background: #e9e9e9;
			}
		}

		&__category {
			align-self: start;
			margin-bottom: 4px;
			padding: 4px 8px 3px 8px;
			display: inline-block;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 11px;
			line-height: 11px;
			letter-spacing: 0.2px;
			border-radius: 100px;
			text-transform: uppercase;
			color: #212529;
			border: 1px solid #212529;

			&_19 {
				color: #55bf4f;
				border: 1px solid #55bf4f;
			}

			&_20 {
				color: #c128b2;
				border: 1px solid #c128b2;
			}

			&_21 {
				color: #3c9be0;
				border: 1px solid #3c9be0;
			}
		}

		&__params {
			grid-area: bonus;
			display: flex;
			&-label {
				margin-bottom: 4px;
				display: block;
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 16px;
				letter-spacing: 0.3px;
				text-transform: uppercase;
				color: #777777;
			}
		}

		&__cashback {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__start {
			border-left: 1px solid #e9e9e9;
			padding: 0 20px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__end {
			border-left: 1px solid #e9e9e9;
			padding-left: 20px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__deposit {
			border-left: 1px solid #e9e9e9;
			padding-left: 20px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__max {
			border-left: 1px solid #e9e9e9;
			padding-left: 20px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__prize {
			padding-right: 20px;
			margin: 0;
			white-space: nowrap;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: bold;
			font-size: 20px;
			line-height: 22px;
			color: #243238;
			flex: 0 0 33.3%;
		}

		&__regularity {
			border-left: 1px solid #e9e9e9;
			padding-left: 20px;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 22px;
			color: #222222;
			flex: 0 0 66.6%;
		}

		&__code {
			position: relative;
			cursor: pointer;
			display: block;
			min-width: 130px;
			padding: 8px 0 4px 0;
			background: #fafafa;
			border: 1px dashed rgba(119, 119, 119, 0.5);
			border-radius: 4px;
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&--hover {
				border-color: #008be2;

				&:before {
					content: '';
					top: -12px;
					left: 50%;
					margin-left: -9px;
					position: absolute;
					width: 18px;
					height: 12px;
					display: block;
					background: $ico-scissors no-repeat center;
				}
			}

			&-label {
				display: block;
				text-align: center;
				font-family: 'Proxima Nova Sb';
				font-size: 10px;
				line-height: 12px;
				letter-spacing: 0.3px;
				text-transform: uppercase;
				color: #777777;
				transition: background 0.1s ease, border-color 0.1s ease,
					color 0.1s ease;
				&--hover {
					color: #008be2;
				}
			}

			&-value {
				display: block;
				text-align: center;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 16px;
				line-height: 20px;
				letter-spacing: 0.3px;
				color: #555555;
				text-transform: uppercase;
			}
		}

		&__countdown {
			white-space: nowrap;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			&-label {
				margin-right: 12px;
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 16px;
				color: #777777;
			}
		}

		&__buttons {
			display: flex;
			justify-content: flex-start;
			margin-top: auto;
			max-width: 188px;
		}

		&__terms {
			margin-right: 40px;
			padding-left: 20px;
			position: relative;
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
			font-family: 'Proxima Nova';
			white-space: nowrap;
			font-size: 12px;
			line-height: 16px;
			color: #777777;
			span {
				border-bottom: 1px dashed #aaaaaa;
			}
			&:hover {
				span {
					border: none;
				}
			}
			&-icon {
				left: 0;
				top: 0;
				position: absolute;
				width: 16px;
				height: 16px;
				display: block;
				transition: transform 0.1s ease;
				background: $ico-terms no-repeat center;
			}

			&--expanded {
				.promotion-feed-item__terms-icon {
					transform: rotate(180deg);
				}
			}
		}

		&__avaliable {
			display: inline-block;
			vertical-align: middle;
			font-size: 0;
			white-space: nowrap;
			span {
				margin-left: 8px;
				vertical-align: middle;
				font-size: 12px;
				line-height: 16px;
				font-family: 'Proxima Nova';
			}
			&_yes {
				color: #777777;
			}
			&_no {
				color: #eb5757;
			}
		}
	}

	.btn-get-promotion {
		flex-grow: 1;
		display: block;
		padding: 12px 24px;
		font-family: 'Proxima Nova Sb';
		font-size: 16px;
		line-height: 16px;
		text-align: center;
		color: #ffffff;
		background: #ff4151;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:hover,
		&:active,
		&:focus {
			background: #ee3c4b;
		}
	}

	.btn-promotion-review {
		margin-left: 20px;
		display: block;
		padding: 0;
		border: 1px solid rgba(119, 119, 119, 0.3);
		border-radius: 3px;
		width: 40px;
		height: 40px;
		background: $ico-arrow-right no-repeat center;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:hover,
		&:active,
		&:focus {
			background: #dddddd $ico-arrow-right no-repeat center;
		}
	}

	@media screen and (min-width: 1280px) and (max-width: 1339px) {
		.promotion-feed-item {
			&__params {
				display: grid;
				grid-template-columns: 1.46fr 1.32fr 1.54fr;
			}
			&__prize {
				padding-right: 12px;
			}
			&__start {
				padding: 0 12px;
			}
			&__end {
				padding-left: 12px;
			}
			&__regularity {
				padding-left: 12px;
			}
		}
	}

	@include mq('laptop') {
		.promotion-feed-item {
			&__params {
				display: grid;
				grid-template-columns: 1.46fr 1.32fr 1.54fr;
			}
		}
	}

	@include mq('tablet') {
		.promotion-feed-item {
			&__title {
				font-weight: 600;
				font-size: 20px;
				line-height: 24px;
			}
			&__content {
				grid-template-columns: 52px 1fr;
				gap: 16px;
				grid-template-areas:
					'icon text'
					'icon bonus'
					'icon actions';
			}
			&__actions {
				justify-self: start;
				justify-content: end;
				align-items: center;
				width: 100%;
				flex-direction: row;
				flex-wrap: wrap;
			}
			&__params {
				justify-content: space-between;
				grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
			}
			&__deposit,
			&__max {
				padding-left: 10px;
			}
			&__regularity {
				padding-left: 10px;
			}
			&__buttons {
				margin-left: auto;
				max-width: none;
			}
			&__countdown {
				margin-right: auto;
				flex-direction: column;
				align-items: flex-start;
				gap: 8px;
			}
			&__code {
				margin-bottom: 0;
				margin-right: auto;
				height: 40px;
				padding-top: 4px;
				min-width: 149px;
			}
			&__info {
				display: flex;
			}
			&__terms {
				margin-right: 40px;
			}
		}

		.btn-promotion-review {
			margin-left: 16px;
		}

		.btn-room-action_download {
			min-width: 149px;
		}
	}

	@include mq('mobile') {
		.promotion-feed-item {
			&__content {
				grid-template-areas:
					'icon text'
					'bonus bonus'
					'actions actions';
			}
			&__params {
				justify-content: space-between;
				grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
			}
			&__info {
				justify-content: space-between;
			}
			&__terms {
				margin-right: 0px;
			}
			&__prize {
				padding-right: 16px;
			}
			&__start {
				padding: 0 16px;
			}
			&__end {
				padding-left: 16px;
			}
			&__code {
				min-width: 132px;
			}
		}

		.btn-room-action_download {
			min-width: 132px;
			max-width: 132px;
		}
	}
</style>
