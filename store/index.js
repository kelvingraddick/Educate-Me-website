export const state = () => ({
	token: undefined,
  educator: undefined,
  employer: undefined
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
	},
	setEducator(state, educator) {
    state.educator = educator;
  },
  setEmployer(state, employer) {
    state.employer = employer;
	},
}