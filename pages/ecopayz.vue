<template>
	<section :class="['content', 'content_ecopayz']">
		<div class="ecopayz">
			<vip-payments-header
				:title="$t('vip_ecopayz.title')"
				type="ecopayz"
				:summary="$t('vip_ecopayz.description')"
			>
				<template #buttons>
					<payments-button-action
						type="ecopayz"
						:label="$t('vip_ecopayz.register')"
						target="_blank"
						url="https://secure.ecopayz.com/Registration.aspx?_atc=WPD_"
					/>

					<payments-button-action
						:external="false"
						type="default"
						:label="$t('vip_ecopayz.vip')"
						@click="handleJoinClick"
					/>
				</template>
			</vip-payments-header>

			<div class="ecopayz-body">
				<div class="ecopayz-advantages">
					<div class="ecopayz-advantages__header">
						<h2 class="ecopayz-advantages__title" v-html="$t('vip_ecopayz.advantages_title')"></h2>

						<svg-icon
							class="ecopayz__logo ecopayz-advantages__header-logo"
							icon="ecopayz-logo"
							:image="true"
							:width="305"
							:height="72"
						/>
					</div>

					<div class="ecopayz-advantages__row">
						<div class="ecopayz-advantages__col">
							<svg-icon
								:width="50"
								:height="50"
								:image="true"
								class="ecopayz-advantages__icon"
								icon="ecopayz-gold"
							/>
							<span class="ecopayz-advantages__label" v-html="$t('vip_ecopayz.advantages')[0]"></span>
						</div>
						<div class="ecopayz-advantages__col">
							<svg-icon
								:width="50"
								:height="50"
								:image="true"
								class="ecopayz-advantages__icon"
								icon="ecopayz-rakeback"
							/>
							<span class="ecopayz-advantages__label" v-html="$t('vip_ecopayz.advantages')[1]"></span>
						</div>
					</div>

					<div class="ecopayz-list-wrap">
						<div class="ecopayz-list-wrap__title">
							<b>ecoPayz</b> <span> + Worldpokerdeals</span>
						</div>
						<ul class="ecopayz-list">
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[0] }}
							</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[1] }}
							</li>
							<li class="ecopayz-list__item">{{ $t('vip_ecopayz.benefits')[2] }}</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[3] }}
							</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[4] }}
							</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[5] }}
							</li>
							<li class="ecopayz-list__item">{{ $t('vip_ecopayz.benefits')[6] }}</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[7] }}
							</li>
							<li class="ecopayz-list__item">
								{{ $t('vip_ecopayz.benefits')[8] }}
							</li>
						</ul>
					</div>

					<div class="ecopayz-advantages-footer">
						<figure class="ecopayz-advantages-footer__item">
							<img
								loading="lazy"
								decoding="async"
								src="~assets/i/ecopayz-gold-img.png"
								:alt="$t('vip_ecopayz.benefits')[9]"
							/>
							<figcaption class="ecopayz-advantages-footer__caption">
								{{ $t('vip_ecopayz.benefits')[9] }}
							</figcaption>
						</figure>
						<figure class="ecopayz-advantages-footer__item">
							<img
								loading="lazy"
								decoding="async"
								src="~assets/i/ecopayz-rakeback-img.png"
								:alt="$t('vip_ecopayz.benefits')[10]"
							/>
							<figcaption class="ecopayz-advantages-footer__caption">
								{{ $t('vip_ecopayz.benefits')[10] }}
							</figcaption>
						</figure>
					</div>
				</div>

				<div class="ecopayz-info">
					<div class="ecopayz-info__title">
						{{ $t('vip_ecopayz.features_title') }}
					</div>

					<table class="ecopayz-table">
						<thead>
							<tr>
								<th class="ecopayz-table__status">{{ $t('status') }}</th>
								<th class="ecopayz-table__header-wpd" v-html="$t('vip_ecopayz.features')[0]['title']"></th>
								<th class="ecopayz-table__header-common" v-html="$t('vip_ecopayz.features')[1]['title']"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Gold</td>
								<td v-html="$t('vip_ecopayz.features')[0]['items'][0]"></td>
								<td>
									<ul class="ecopayz-table-list">
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][0] }}
										</li>
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][1] }}
										</li>
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][2] }}
										</li>
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][3] }}
										</li>
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][4] }}
										</li>
									</ul>
								</td>
							</tr>
							<tr>
								<td>VIP</td>
								<td v-html="$t('vip_ecopayz.features')[0]['items'][1]"></td>
								<td>
									<ul class="ecopayz-table-list">
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][5] }}
										</li>
										<li class="ecopayz-table-list__item">
											{{ $t('vip_ecopayz.features')[1]['items'][6] }}
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div id="ecopayz-footer" class="ecopayz-footer">
				<h2 class="ecopayz-footer__title">{{ $t('vip_ecopayz.form_title') }}</h2>
				<div class="ecopayz-footer__info">{{ $t('vip_ecopayz.form_text') }}</div>

				<payments-form
					class="ecopayz-footer__payment"
					action="/payments/ecopayz/getvip"
					type="ecopayz"
				/>

				<manager
					v-if="manager"
					:style="{ margin: 0 }"
					:pattern="true"
					:status="false"
					:image="manager.image"
					:name="manager.name"
					:position="manager.position"
					:telegram="manager.telegram"
					:skype="manager.skype"
					:whatsapp="manager.whatsapp"
					:email="manager.email"
					:label="$t('vip_ecopayz.manager_title')"
					:description="$t('vip_ecopayz.manager_info')"
				/>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pageMixin from '~/mixins/pageMixin'
	import Manager from '~/components/cards/Manager'

	export default {
		components: {
			Manager,
		},
		layout: 'basic',

		mixins: [pageMixin],

		metaInfo: {},

		data: () => ({
			manager: null,
		}),

		computed: {
			...mapGetters({
				topList: 'rooms/topList',
				locale: 'lang/locale',
			}),
		},

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						id: this.locale === 'es' ? 664 : 502,
					},
				})
				.then(response => {
					this.manager = {
						image: response.data.image
							? {
									filename: response.data.image.filename,
							  }
							: null,
						name: response.data.name,
						position: response.data.position,
						telegram: response.data.telegram,
						skype: response.data.skype,
						whatsapp: response.data.whatsapp,
						email: response.data.email,
					}
				})
		},

		watch: {},

		mounted() {},

		methods: {
			handleJoinClick() {
				let el = document.querySelector('#ecopayz-footer')
				if (el) {
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset
					window.scrollTo({ top: offset, behavior: 'smooth' })
				}
			},
		},
	}
</script>

<style lang="scss">
	$ico-ecopayz-form: url('~assets/i/ico-ecopayz-form.svg?data');
	$ico-ecopayz-plus: url('~assets/i/ico-ecopayz-plus.svg?data');
	$ico-ecopayz-list: url('~assets/i/ico-ecopayz-list.svg?data');

	.ecopayz {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1440px;
		&__logo {
			float: right;
			max-width: 100%;
		}

		&-body {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			margin-top: -338px;
			background: linear-gradient(
				180deg,
				rgba(236, 235, 235, 0) 0%,
				#f3f1f1 100%
			);
		}

		&-advantages {
			max-width: 1152px;
			padding: 40px 40px 44px 40px;
			background: radial-gradient(
				96.88% 66.11% at 57.43% 2.13%,
				#3a3e51 0%,
				#1d1f2c 100%
			);
			border-radius: 10px;
			&__header {
				display: flex;
			}
			&__header-logo {
				margin-left: auto;
			}

			&__title {
				max-width: 640px;
				margin-bottom: 44px;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 32px;
				line-height: 36px;
				color: #ffffff;
				&-highlight {
					font-family: 'Proxima Nova Th';
					color: #f6a519;
				}
			}

			&__label {
				padding-top: 15px;
				padding-left: 20px;
				font-family: Proxima Nova;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 24px;
				color: #ffffff;
			}

			&__icon {
				flex: 0 0 50px;
			}

			&__row {
				display: flex;
				gap: 28px;
				padding-bottom: 44px;
			}

			&__col {
				display: flex;
				width: calc(100% / 2);
			}

			&-footer {
				margin-top: -70px;
				display: flex;
				justify-content: center;
				&__item {
					flex: 0 0 250px;
					figure {
						margin: 0;
					}

					img {
						margin: 0 auto;
						display: block;
						max-width: 100%;
						height: auto;
					}

					figcaption {
						margin-top: 16px;
						text-align: center;
						font-family: Proxima Nova;
						font-weight: bold;
						font-size: 18px;
						line-height: 22px;
						color: #ffffff;
					}
				}
			}
		}

		&-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0;
			margin: 0;
			&-wrap {
				padding: 28px 68px 102px 68px;
				margin: 0 -68px;
				background: linear-gradient(0deg, #373a4a, #373a4a),
					radial-gradient(
						96.88% 66.11% at 57.43% 2.13%,
						#3a3e51 0%,
						#1d1f2c 100%
					);
				border-radius: 10px;
				&__title {
					margin-bottom: 28px;
					b {
						font-family: 'Proxima Nova Th';
						font-size: 32px;
						line-height: 32px;
						color: #f8f8f8;
					}
					span {
						font-family: Proxima Nova;
						font-weight: bold;
						font-size: 24px;
						line-height: 32px;
						color: #f8f8f8;
						opacity: 0.8;
					}
				}
			}
			&__item {
				list-style: none;
				padding-left: 36px;
				margin-bottom: 16px;
				margin-right: 40px;
				width: calc(100% / 3 - 40px);
				font-family: Proxima Nova;
				font-size: 18px;
				line-height: 22px;
				color: #e5e5e5;
				background: $ico-ecopayz-list no-repeat 0 0;
			}
		}

		&-info {
			max-width: 1152px;
			&__title {
				margin: 40px 0 77px 0;
				font-family: Proxima Nova;
				font-weight: bold;
				font-size: 32px;
				line-height: 36px;
				text-align: center;
				color: #222222;
			}
		}

		&-table {
			width: 100%;
			margin-bottom: 60px;
			thead {
				tr {
					th {
						padding: 28px;
						font-family: 'Proxima Nova Sb';
						font-style: normal;
						font-size: 24px;
						line-height: 24px;
						&:nth-child(1) {
							border-right: 1px solid #e5e5e5;
							border-top-left-radius: 10px;
							color: #8f8f8f;
							background: linear-gradient(0deg, #e5e5e5, #e5e5e5),
								radial-gradient(
									61.16% 100% at 61.16% 0%,
									#9d2777 0%,
									#731a56 61.46%
								);
						}

						&:nth-child(2) {
							border-top-left-radius: 10px;
							border-top-right-radius: 10px;
							display: block;
							margin-top: -40px;
							font-family: Proxima Nova;
							font-style: normal;
							font-weight: bold;
							font-size: 32px;
							line-height: 32px;
							color: #f8f8f8;
							background: linear-gradient(0deg, #3c9be0, #3c9be0),
								radial-gradient(
									363.3% 931.9% at 73.15% -35.54%,
									#3a3e51 0%,
									#1d1f2c 100%
								);
						}

						&:nth-child(3) {
							border-top-right-radius: 10px;
							color: #e5e5e5;
							background: linear-gradient(0deg, #6c6e7d, #6c6e7d),
								radial-gradient(
									61.16% 100% at 61.16% 0%,
									#9d2777 0%,
									#731a56 61.46%
								);
						}
					}
				}
			}

			tbody {
				tr {
					td {
						padding: 28px;
						border: 1px solid #e5e5e5;
						&:first-child {
							border-left: 0;
						}
						&:last-child {
							border-right: 0;
						}
						&:nth-child(1) {
							background: linear-gradient(0deg, #c1a161, #c1a161),
								radial-gradient(
									61.16% 100% at 61.16% 0%,
									#9d2777 0%,
									#731a56 61.46%
								);
						}
						&:nth-child(2) {
							background: linear-gradient(0deg, #2e87c8, #2e87c8),
								radial-gradient(
									61.16% 100% at 61.16% 0%,
									#9d2777 0%,
									#731a56 61.46%
								);
							box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.15);
						}
						&:nth-child(3) {
							background: linear-gradient(0deg, #e5e5e5, #e5e5e5),
								radial-gradient(
									61.16% 100% at 61.16% 0%,
									#9d2777 0%,
									#731a56 61.46%
								);
						}
					}

					&:nth-child(1) {
						td {
							border-top: 0;
						}
					}

					&:nth-child(1),
					&:nth-child(2) {
						td {
							&:nth-child(1) {
								font-family: Proxima Nova;
								font-weight: bold;
								font-size: 30px;
								line-height: 30px;
								color: #f8f8f8;
							}
						}

						td {
							&:nth-child(2) {
								font-family: Proxima Nova;
								font-weight: bold;
								font-size: 24px;
								line-height: 28px;
								color: #ffffff;
							}
						}

						td {
							&:nth-child(3) {
								border-bottom-color: #d5d5d5;
							}
						}
					}

					&:nth-child(2) {
						td {
							&:nth-child(1) {
								border-bottom-left-radius: 10px;
								background: linear-gradient(0deg, #e38b3a, #e38b3a),
									radial-gradient(
										61.16% 100% at 61.16% 0%,
										#9d2777 0%,
										#731a56 61.46%
									);
							}

							&:nth-child(2) {
								border-bottom-right-radius: 10px;
							}

							&:nth-child(3) {
								border-bottom-right-radius: 10px;
							}
						}
					}

					&:last-child {
						td {
							border-bottom: 0;
						}
					}
				}
			}

			&-list {
				padding: 0;
				margin: 0;
				&__item {
					margin-bottom: 12px;
					padding-left: 36px;
					list-style: none;
					font-family: Proxima Nova;
					font-size: 18px;
					line-height: 22px;
					color: #555555;
					background: $ico-ecopayz-plus no-repeat 0 0;
					&:last-child {
						margin: 0;
					}
				}
			}
		}

		&-footer {
			width: 916px;
			display: flex;
			flex-direction: column;
			align-items: center;
			&__payment {
				width: 100%;
			}
			&__title {
				padding-top: 112px;
				margin-top: 44px;
				margin-bottom: 20px;
				font-family: 'Proxima Nova';
				font-weight: bold;
				font-size: 32px;
				line-height: 36px;
				text-align: center;
				color: #222222;
				background: $ico-ecopayz-form no-repeat center top;
			}

			&__info {
				margin-bottom: 32px;
				font-family: Proxima Nova;
				font-size: 20px;
				line-height: 24px;
				text-align: center;
				color: #555555;
			}
		}
	}

	.ptn-payments-form {
		padding: 10px 45px;
	}

	@include mq('desktop') {
		.ecopayz-advantages {
			max-width: 1016px;
		}
		.ecopayz-info {
			max-width: 1016px;
		}
		.ecopayz-footer {
			max-width: 916px;
		}
	}

	@include mq('laptop') {
		.ecopayz-body {
			width: 100%;
			@include paddings('tablet');
		}

		.ecopayz-advantages {
			padding: 28px 24px 40px;
			&__title {
				margin-bottom: 40px;
			}
			&-footer {
				margin-top: -62px;
				&__item {
					margin-bottom: 0;
				}
			}
		}
		.ecopayz-list {
			column-gap: 20px;
			row-gap: 16px;
			&__item {
				width: calc(100% / 2 - 10px);
				margin-right: 0;
				margin-bottom: 0;
			}
		}

		.ecopayz-footer {
			width: 100%;
			@include paddings('tablet');
		}
	}

	@include mq('tablet') {
		.ecopayz-body {
			width: 100%;
			margin-top: -290px;
			@include paddings('mobile');
		}

		.ecopayz-advantages {
			@include paddings('mobile');
			padding-bottom: 28px;
			&__header {
				flex-direction: column-reverse;
				align-items: center;
			}
			&__header-logo {
				margin-left: 0;
				max-width: 190px;
			}
			&__title {
				font-size: 24px;
				text-align: center;
				margin-bottom: 24px;
			}
			&__row {
				flex-direction: column;
				padding-bottom: 24px;
			}
			&__col {
				width: 100%;
			}
		}

		.ecopayz-list {
			row-gap: 16px;
			&__item {
				width: 100%;
				margin-right: 0;
				margin-bottom: 0;
			}
			&-wrap {
				padding: 34px 40px 86px;
				margin-left: -40px;
				margin-right: -40px;
			}
		}

		.ecopayz-advantages-footer {
			img {
				max-width: 100px;
			}
			&__item {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 0 0 50%;
			}
			&__caption {
				max-width: 180px;
			}
		}

		.ecopayz-info {
			width: calc(100% + 20px);
			padding-top: 52px;
			overflow-x: scroll;
			@include hide-scroll();
			max-width: none;
			margin-right: -20px;
			align-self: flex-start;
			&__title {
				display: none;
			}
		}

		.ecopayz-table {
			width: auto;
			table-layout: fixed;
			thead tr th:nth-child(1) {
				min-width: 108px;
				font-size: 20px;
				line-height: 24px;
			}
			tbody tr td {
				font-size: 24px;
			}
			thead tr th {
				padding: 20px;
			}
			thead tr th:nth-child(2) {
				min-width: 196px;
				font-size: 20px;
				line-height: 24px;
				margin-top: -24px;
			}
			thead tr th:nth-child(3) {
				min-width: 472px;
				font-size: 20px;
				line-height: 24px;
			}
			& tbody tr:nth-child(1) td:nth-child(2),
			& tbody tr:nth-child(2) td:nth-child(2),
			& tbody tr:nth-child(1) td:nth-child(3),
			& tbody tr:nth-child(2) td:nth-child(3) {
				font-size: 18px;
				line-height: 20px;
			}
		}
	}

	// @media (max-width: 400px) {
	// 	.ecopayz-body {
	// 		margin-top: -200px;
	// 	}
	// }
</style>
