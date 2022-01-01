const express = require('express')
const app = express()
const port = 8000
// const bodyParser = require('body-parser')

const config = require('./config/key')
const { User } = require('./models/User')

// application/x-www-form-urllencoded 데이터를 분석해서 가져올 수 있게?
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }))

// application/json 을 분석해서 가져올 수 있게?
// app.use(bodyParser.json())
app.use(express.json())


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! by Nodemon')
})

app.post('/register', (req, res) => {
    // 회원가입할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣는다

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})

app.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 찾는다
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }
        // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })

            // 비밀번호까지 맞다면 토큰을 생성하기
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})