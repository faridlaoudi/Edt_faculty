const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('here')
  res.download('L2-ING-INF-MAJ.pdf')
  res.status(500).send('Hello World!')
})

app.listen(3000)