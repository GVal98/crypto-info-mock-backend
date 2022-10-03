const express = require('express')
cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({origin: true}))
app.options('*', cors())

const favorites = new Map()

const getUsername = accessToken => (
  accessToken.slice(0, accessToken.length / 2).split('').reverse().join('')
)

app.post('/accessToken', function (req, res) {
  const username = req.body.username
  res.json({
    username,
    accessToken: username.split('').reverse().join('').repeat(2)
  })
})

app.get('/favorites', function (req, res) {
  const username = getUsername(req.headers.accesstoken)
  if (!favorites.has(username)) favorites.set(username, new Set())
  res.json(
    [...favorites.get(username)]
  )
  console.log(favorites)
})

app.post('/favorites/:coinId', function (req, res) {
  const coinId = req.params.coinId
  const username = getUsername(req.headers.accesstoken)

  if (!favorites.has(username)) favorites.set(username, new Set())
  favorites.get(username).add(coinId)
  res.json({success: true})
  console.log(favorites)
})

app.delete('/favorites/:coinId', function (req, res) {
  const coinId = req.params.coinId
  const username = getUsername(req.headers.accesstoken)

  if (!favorites.has(username)) favorites.set(username, new Set())
  favorites.get(username).delete(coinId)
  res.json({success: true})
  console.log(favorites)
})
 
app.listen(3001)