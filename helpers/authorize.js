var trySignIn = async function(store) {
  var token = localStorage.getItem('TOKEN'); // TODO: remove in use refresh_token flow
  if (token) {
    store.commit('setToken', token);
    var response = await _signIn(token);
    if (response) {
      store.commit('setEducator', response.educator);
    }
  }
}

var _signIn = async function(token) {
	return fetch('http://api.educateme.wavelinkllc.com/educator/authorize', {
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
  trySignIn: trySignIn
}