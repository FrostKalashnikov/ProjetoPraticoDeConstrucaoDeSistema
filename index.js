const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const porta = process.env.PORT


app.use(express.static(path.join(__dirname, 'html')))
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'AppFinanceiro'
})

db.connect((err) => {
    if(err) throw err
    console.log('Conectado ao banco de dados MySQL.')
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'html', '/index.html'))

})


app.listen(porta, ()=>{console.log('servidor rodando')})

