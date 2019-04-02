const fs = require('fs')
const path = require('path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('hello world'))
router.use('/docs', express.static('docs'))

// auto mounting route
fs
  .readdirSync(__dirname)
  .filter(file => file.slice(-3) !== '.js')
  .forEach(row => {
    let filePath = path.join(process.cwd(), '/src/routes/', row)
    router.use('/' + row, require(filePath))
  })

module.exports = router
