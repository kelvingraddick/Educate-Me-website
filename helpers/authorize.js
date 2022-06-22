var tryEducatorSignIn = async function(baseUrl, store) {
  var token = localStorage.getItem('TOKEN') || store.state.token;
  if (token) {
    localStorage.setItem('TOKEN', token);
    store.commit('setToken', token);
    var response = await _signIn(baseUrl, 'educator', token);
    if (response) {
      store.commit('setEducator', response.educator);
    }
  }
}

var tryEmployerSignIn = async function(baseUrl, store) {
  var token = localStorage.getItem('TOKEN') || store.state.token;
  if (token) {
    localStorage.setItem('TOKEN', token);
    store.commit('setToken', token);
    var response = await _signIn(baseUrl, 'employer', token);
    if (response) {
      store.commit('setEmployer', response.employer);
    }
  }
}

var _signIn = async function(baseUrl, userType, token) {
	return fetch(baseUrl + '/' + userType + '/authorize', {
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