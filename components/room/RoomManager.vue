<template>
	<div class="manager-card">
		<div class="manager-card__info">
			<div class="manager-card__info-wrap">
				<div class="manager-card__label">
					<span class="manager-card__badge_yellow">Vip</span
					>{{ $t('vip_support') }}
				</div>
				<div class="manager-card__name">{{ name }}</div>
				<div class="manager-card__position">{{ position }}</div>
			</div>
			<div class="manager-card__img-wrap">
				<img class="manager-card__img" :src="src" :alt="name" loading="lazy" />
			</div>
		</div>
		<div class="manager-card__actions">
			<div
				class="manager-card__features"
				v-html="manager_info ? manager_info : $t('manager_info')"
			></div>

			<button-contact block size="md" type="chat">{{
				$t('start_chat')
			}}</button-contact>
			<div class="manager-card__messengers-label">
				{{ $t('contact_manager_via_messengers', { name: name }) }}
			</div>
			<div class="manager-card__messengers">
				<button-contact
					icon
					size="md"
					type="telegram"
					target="_blank"
					rel="nofollow noopener"
					:href="telegram"
				></button-contact>
				<button-contact
					icon
					size="md"
					type="skype"
					target="_blank"
					rel="nofollow noopener"
					:href="skype"
				></button-contact>
				<button-contact
					icon
					size="md"
					type="whatsapp"
					target="_blank"
					rel="nofollow noopener"
					:href="whatsapp"
				></button-contact>
				<button-contact
					icon
					size="md"
					type="email"
					target="_blank"
					rel="nofollow noopener"
					:href="email"
				></button-contact>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RoomManager',

		components: {},

		props: {
			image: {
				type: Object,
				required: true,
			},

			name: {
				type: String,
				required: true,
			},

			position: {
				type: String,
				required: true,
			},

			telegram: {
				type: String,
				required: true,
			},

			skype: {
				type: String,
				required: true,
			},

			whatsapp: {
				type: String,
				required: true,
			},

			email: {
				type: String,
				required: true,
			},

			manager_info: {
				type: [String],
			},
		},

		data: () => ({}),

		computed: {
			src() {
				return `${this.mediaUrl}/manager-small/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-manager-card-list: url('~assets/i/ico-manager-card-list.svg?data');

	.manager-card {
		margin: 0 0 40px 0;
		border-radius: 4px;
		overflow: hidden;
		background: #2e3141;
		box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
		&__info {
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			padding: 20px;
			position: relative;
			display: flex;
			justify-content: space-between;
		}
		&__label {
			margin: 4px 0 12px 0;
			font-family: Proxima Nova;
			font-weight: 800;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #efd500;
		}
		&__badge {
			&_green {
				top: -7px;
				display: inline-block;
				position: relative;
				padding: 1px 5px;
				background: #70ac30;
				border: 1px solid #2e3141;
				border-radius: 30px;
				text-transform: uppercase;
				font-family: 'Proxima Nova Sb';
				font-size: 10px;
				line-height: 12px;
				color: #ffffff;
			}
			&_yellow {
				margin-right: 5px;
				width: 30px;
				height: 18px;
				color: #2e3141;
				background: #efd500;
				display: inline-block;
				border-radius: 4px;
				text-align: center;
				line-height: 19px;
			}
		}
		&__name {
			margin-bottom: 4px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 24px;
			line-height: 28px;
			color: #ffffff;
		}
		&__position {
			font-family: 'Proxima Nova';
			font-size: 16px;
			line-height: 16px;
			color: #e5e5e5;
			opacity: 0.7;
		}

		&__img {
			border-radius: 50%;
			max-width: 100%;
			height: auto;
			&-wrap {
				margin-top: -4px;
				text-align: center;
				width: 84px;
				height: 84px;
				border: 2px solid #424557;
				border-radius: 50%;
			}
		}
		&__actions {
			padding: 24px 28px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}

		&__title {
			margin-bottom: 15px;
			color: #2a2d3c;
			letter-spacing: -0.2px;
			text-align: center;
			font-weight: bold;
			font-size: 21px;
			line-height: 21px;
			font-family: 'Proxima Nova';
		}

		&__messengers {
			padding: 0 24px;
			display: flex;
			justify-content: space-between;
			&-label {
				margin: 20px 0 12px 0;
				font-family: 'Proxima Nova';
				font-style: normal;
				font-weight: normal;
				font-size: 14px;
				line-height: 16px;
				text-align: center;
				color: #555555;
			}
		}

		&__features {
			ul {
				padding: 0 12px;
				margin: 0 0 24px 0;
				li {
					list-style: none;
					position: relative;
					padding-left: 40px;
					min-height: 20px;
					margin-bottom: 12px;
					font-family: 'Proxima Nova';
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					line-height: 20px;
					color: #243238;
					&:last-child {
						margin: 0;
					}
					&::before {
						content: '';
						top: 0;
						left: 0;
						position: absolute;
						width: 20px;
						height: 20px;
						display: block;
						background: $ico-manager-card-list no-repeat center;
					}
				}
			}
		}
	}

	@include mq('laptop') {
		.manager-card {
			max-width: 474px;
			margin: 0px auto;
		}
	}

	@include mq('tablet') {
		.manager-card {
			max-width: 376px;
		}
	}
</style>
