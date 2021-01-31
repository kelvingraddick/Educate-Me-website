var search = async function(limit, offset, title, location) {
  return fetch('http://api.educateme.wavelinkllc.com/educators/?limit=' + limit + '&offset=' + offset + '&title=' + title + '&location=' + location, { method: 'GET' })
    .then((response) => { 
      if (response.status == 200) {
        return response.json()
        .then((responseJson) => {
          if (responseJson.isSuccess) {
            return { educators: responseJson.educators };
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