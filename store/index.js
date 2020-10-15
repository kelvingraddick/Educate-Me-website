export const state = () => ({
	token: undefined,
	educator: undefined
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
	},
	setEducator(state, educator) {
    state.educator = educator;
	},
}