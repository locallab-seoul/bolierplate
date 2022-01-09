const express = require('express')
const router = express.Router()
const multer = require('multer')

const { News } = require('../models/News')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/news')
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