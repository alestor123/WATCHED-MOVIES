const axios = require('axios')
module.exports = async (username, token, tmdb, limit) => {
  if (!(typeof (username && token && tmdb) === 'string' && typeof limit === 'number')) throw Error('Please enter a valid input')
  const data = (await axios.get('https://api.trakt.tv/users/' + username + '/' + '/history?limit=' + limit || 300, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': token
    }
  })).data
  return await Promise.all(data.map(async dt => {
    dt.tmdb = (await axios.get(`https://api.themoviedb.org/3/movie/${dt.movie.ids.tmdb}?api_key=${tmdb}`)).data
    return dt
  }
  ))
}
