<template>
	<div :class="['room-front']">
		<div
			class="room-front__img"
			:style="{
				backgroundColor: background,
			}"
		>
			<img
				decoding="async"
				loading="lazy"
				:src="img"
				:alt="image.alt || `${title} logo`"
			/>
		</div>

		<div class="room-front__wrap">
			<div class="room-front__network">{{ network.title }}</div>
			<div class="room-front__title">{{ title }}</div>

			<div class="room-front__rating">
				<rating
					:style="{
						alignItems: 'baseline',
						justifyContent: 'center',
					}"
					:value="rating"
				/>
			</div>

			<dl class="room-front__details">
				<dt class="room-front__dt">{{ $t('bonus') }}</dt>
				<dd class="room-front__dd">{{ bonus || 'n/a' }}</dd>
				<dt class="room-front__dt">{{ $t('rakeback') }}</dt>
				<dd class="room-front__dd">{{ rakeback }}</dd>
			</dl>

			<div class="room-front__summary" v-html="summary"></div>

			<div class="room-front__actions">
				<nuxt-link
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: { parent: 'rakeback-deals', child: review.slug },
					}"
				>
					<a
						:class="[
							'btn',
							'btn-block',
							'room-front__link room-front__link_review',
						]"
						:href="href"
						@click="navigate"
						>{{ $t('review') }}</a
					>
				</nuxt-link>

				<nuxt-link v-if="!isClub && !isBlacklist"
				v-slot="{ href, route, navigate }" :to="{ name: 'front' }">
					<button
						:class="[
							'btn',
							'btn-block',
							'room-front__link',
							'room-front__link_download',
							isDisabled && 'room-front__link_disabled',
						]"
						:disabled="isDisabled"
						@click="handleDownload"
					>
						{{ $t('room_download') }}
					</button>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomFrontItem',

		components: {},

		props: {
			id: {
				type: Number,
				required: true,
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

			isClub: {
				type: [Number, Boolean],
			},

			isBlacklist: {
				type: [Number, Boolean],
			},

			summary: {
				type: String,
				required: true,
			},

			rating: {
				type: [String, Number],
				required: true,
			},

			rakeback: {
				type: [String, Number],
				default: 'n/a',
			},

			bonus: {
				type: [String, Number],
				default: 'n/a',
			},

			background: {
				type: String,
				default: '#000000',
			},

			image: {
				type: [String, Object],
				required: true,
			},

			network: {
				type: [String, Object],
				required: true,
			},

			review: {
				type: Object,
				required: true,
			},

			categories: {
				type: Array,
			},
		},

		data: () => ({}),

		computed: {
			img() {
				return `${this.mediaUrl}/room-card/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},

			isDisabled() {
				return !this.available || this.closed || !this.url || this.url === ''
			},

			...mapGetters({
				country: 'location/country',
			}),
		},

		watch: {},

		created() {},

		methods: {
			handleDownload() {
				let route = this.$router.resolve({
					name: 'download',
					params: { slug: this.slug },
				})
				return window.open(route.href, '_blank')
			},
		},
	}
</script>

<style lang="scss">
	$ico-room-front-summary: url('~assets/i/ico-room-front-summary.svg?data');
	.room-front {
		min-width: 260px;
		margin: 0 14px;
		border: 1px solid #e9e9e9;
		background: #fafafa;
		border-radius: 4px;
		overflow: hidden;
		transition: border 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;

		&__img {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 125px;
			img {
				max-width: 80%;
				max-height: 80%;
				height: auto;
				margin: 0;
			}
		}

		&__wrap {
			padding: 0 20px 20px 20px;
			text-align: center;
			font-size: 0;
		}

		&__title {
			height: 24px;
			margin: 8px 0 10px 0;
			overflow: hidden;
			text-align: center;
			color: #243238;
			letter-spacing: -0.1px;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			font-family: 'Proxima Nova';
		}

		&__network {
			margin-top: -12px;
			border-radius: 50px;
			padding: 3px 10px;
			border: 1px solid #e9e9e9;
			background: #fafafa;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #777777;
			display: inline-flex;
		}

		&__label {
			color: #777777;
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			&_restricted {
				color: #ff4151;
			}
		}

		&__details {
			text-align: left;
			padding-bottom: 15px;
			margin-bottom: 12px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			border-bottom: 1px solid #dfdede;
		}

		&__dt {
			color: #555555;
			font-family: Proxima Nova;
			font-weight: normal;
			font-style: normal;
			font-size: 14px;
			line-height: 16px;
			flex: 0 0 50%;
		}

		&__dd {
			margin-bottom: 12px;
			color: #243238;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 16px;
			text-align: right;
			flex: 0 0 50%;
			&:last-child {
				margin: 0;
			}
		}

		&__summary {
			text-align: left;
			margin-bottom: 20px;
			position: relative;
			height: 120px;
			overflow: hidden;
			&:after {
				content: '';
				bottom: 0;
				left: 0;
				position: absolute;
				display: block;
				width: 100%;
				height: 31px;
				background: linear-gradient(
					180deg,
					rgba(250, 250, 250, 0.0001) 0.16%,
					#fafafa 100%
				);
			}
			ul {
				padding: 0;
				margin: 0;
				list-style: none;
				li {
					padding-left: 16px;
					margin-bottom: 5px;
					position: relative;
					font-family: 'Proxima Nova';
					font-size: 14px;
					line-height: 16px;
					color: #555555;
					&:before {
						content: '';
						top: 3px;
						left: 0;
						position: absolute;
						display: block;
						width: 8px;
						height: 8px;
						background: $ico-room-front-summary no-repeat center;
					}
					&:last-child {
						margin: 0;
					}
				}
			}
		}

		&__actions {
			display: flex;
		}

		&__link {
			padding: 9px 22px;
			border-radius: 3px;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 14px;
			line-height: 14px;
			&_review {
				margin-right: 10px;
				color: #777777;
				background: #dfe4e6;
				&:hover,
				&:active,
				&:focus {
					color: #555555;
					background: #dddddd;
				}
			}

			&_download {
				margin-left: 10px;
				color: #ffffff;
				background: #ff4151;
				&:hover,
				&:active,
				&:focus {
					color: #ffffff;
					background: #ee3c4b;
				}
			}

			&_disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}

		&:hover {
			border: 1px solid transparent;
			background: #ffffff;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
			.room-front__summary {
				&:after {
					background: linear-gradient(
						180deg,
						rgba(250, 250, 250, 0.0001) 0.16%,
						#ffffff 100%
					);
				}
			}
		}
	}
</style>
