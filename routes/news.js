
const express = require('express')
const router = express.Router()
const { News } = require('../models/News')

router.post('/create', (req, res) => {

    const news = new News(req.body)

    news.save((err) => {
        if (err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true })
      })
})

router.post('/list', (req, res) => {

    News.find()
    .exec((err, NewsesInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, NewsesInfo, postSize: NewsesInfo.length })
    })
  })

module.exports = router