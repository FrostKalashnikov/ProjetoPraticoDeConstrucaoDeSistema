const express = require('express')
const path = require('path')
const app = express()
const porta = process.env.PORT 

(async ()=>{ const db = require('./src/db') })()

app.use(express.static(path.join(__dirname, 'html')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'html', '/index.html'))

})


app.listen(porta || 3000, ()=>{console.log('servidor rodando')})

