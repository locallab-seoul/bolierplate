const express = require('express')
const router = express.Router()
const { Space } = require('../models/Space')

router.post('/create', (req, res) => {

    const space = new Space(req.body)

    space.save((err) => {
        if (err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true })
      })
})

router.post('/list', (req, res) => {
    Space.find()
    .exec((err, SpacesInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, SpacesInfo, postSize: SpacesInfo.length })
    })
  })

module.exports = router