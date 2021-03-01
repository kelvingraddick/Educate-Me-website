var search = async function(limit, offset, title, type, location) {
  return fetch('http://api.educateme.wavelinkllc.com/jobs/?limit=' + limit + '&offset=' + offset + '&title=' + title + '&type=' + type + '&location=' + location, { method: 'GET' })
    .then((response) => { 
      if (response.status == 200) {
        return response.json()
        .then((responseJson) => {
          if (responseJson.isSuccess) {
            return { jobs: responseJson.jobs };
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