var search = async function(baseUrl, limit, offset, name, location) {
  return fetch(baseUrl + '/employers/?limit=' + limit + '&offset=' + offset + '&query=' + name + '&city=' + location, { method: 'GET' })
    .then((response) => { 
      if (response.status == 200) {
        return response.json()
        .then((responseJson) => {
          if (responseJson.isSuccess) {
            return { employers: responseJson.employers };
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
  search: search
}