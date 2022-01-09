const express = require('express')
const router = express.Router()
const multer = require('multer')

const { Space } = require('../models/Space')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/space/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    // 가져온 이미지를 저장 해주면 된다.
    upload(req, res, err => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.filename })
    })

})

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