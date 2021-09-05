// state
export const state = () => ({
	isMobile: false,
	isTablet: false,
})

// getters
export const getters = {
	isTouch: state => state.isMobile || state.isTablet,
	isMobile: state => state.isMobile,
	isTablet: state => state.isTablet,
}

// mutations
export const mutations = {
	SET_IS_MOBILE(state, { value }) {
		state.isMobile = value
	},
	SET_IS_TABLET(state, { value }) {
		state.isTablet = value
	},
}

// actions
export const actions = {}
