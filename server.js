const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

let app = express()

app.use(serveStatic(path.join(__dirname, 'build')))

const port = process.env.PORT || 3737

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});