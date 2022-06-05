var tryEducatorSignIn = async function(store) {
  var token = localStorage.getItem('TOKEN') || store.state.token;
  if (token) {
    localStorage.setItem('TOKEN', token);
    store.commit('setToken', token);
    var response = await _signIn('educator', token);
    if (response) {
      store.commit('setEducator', response.educator);
    }
  }
}

var tryEmployerSignIn = async function(store) {
  var token = localStorage.getItem('TOKEN') || store.state.token;
  if (token) {
    localStorage.setItem('TOKEN', token);
    store.commit('setToken', token);
    var response = await _signIn('employer', token);
    if (response) {
      store.commit('setEmployer', response.employer);
    }
  }
}

var _signIn = async function(userType, token) {
	return fetch('https://api.edcomjobs.com/' + userType + '/authorize', {
		method: 'POST',
		headers: { 'Authorization': 'Bearer ' + token }
	})
	.then((response) => { 
		if (response.status == 200) {
			return response.json()
			.then((responseJson) => {
				if (responseJson.isSuccess) {
					return responseJson;
				}
			})
		}
		return undefined;
	})
	.catch((error) => {
		console.error(error);
		return undefined;
	});
};

export default {
  tryEducatorSignIn: tryEducatorSignIn,
  tryEmployerSignIn: tryEmployerSignIn
}