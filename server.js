const path = require('path')

const express = require('express')
const multer = require('multer')
const cors = require('cors')


const port = process.env.PORT || 3000
const app = express()


app.set('view engine', 'pug')

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.static(path.join(__dirname ,'public')))
app.use('/uploads', express.static(path.join(__dirname ,'uploads')))
app.use(multer().single('upfile'))


app.post('/api/fileanalyse', (req, res, next) => {
   if (!req.file) { return res.status(422).json({ error: 'file not selected' }) }
   const { originalname, size, mimetype } = req.file
   return res.status(200).json({ name: originalname, type: mimetype, size })
})

app.get('/', (req, res, next) => res.render('index'))


app.listen(port, () => console.log('Connected'))