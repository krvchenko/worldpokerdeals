<template>
	<div>
		<room-action-button
			:slug="room.slug"
			:url="room.url"
			:icon="true"
			type="download"
			:label="$t('room_download')"
		/>
		<room-action-button
			:slug="room.slug"
			:url="room.url"
			:icon="true"
			type="connection"
			:label="$t('tag_account')"
		/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomActions',

		components: {},

		props: {
			contenteditable: {
				type: [Boolean, String],
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				room: 'rooms/room',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style scoped lang="scss">
	.room-actions {
		display: flex;
		margin: 32px 0 40px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		@include mq('mobile') {
			flex-flow: column;
		}
	}

	.btn-room-action {
		&_download {
			max-width: 212px;
			margin-right: 14px;
			padding: 13px 70px 15px 70px;
			&:after {
				right: 6px;
			}

			@include mq('mobile') {
				max-width: none;
				width: 100%;
				margin-right: 0;
				margin-bottom: 20px;
			}
		}
		&_connection {
			max-width: 212px;
			margin-left: 14px;
			padding: 11px 40px 13px 40px;
			border: 2px solid rgba(85, 85, 85, 0.4);
			color: #555555;
			background: transparent;
			&:hover {
				border-color: #dddddd;
				background: #dddddd;
			}

			@include mq('mobile') {
				max-width: none;
				width: 100%;
				margin-left: 0;
			}
		}
	}
</style>
