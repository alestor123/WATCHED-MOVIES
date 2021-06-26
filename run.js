const movies = require('./App');
(async () => {
  const data = await movies('alestor123r', process.env.TRAK, process.env.TMDB, 300)
  console.log(JSON.stringify(data[0]))
})()
// example
