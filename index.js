const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const session = require('express-session')
const app = express()
const porta = 3000 //process.env.PORT


app.use(express.static(path.join(__dirname, 'html')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'id',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const db = mysql.createConnection({
    host: '26.18.32.83', //"localhost",
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

app.get('/cadastro', (req, res)=>{
    res.sendFile(path.join(__dirname, 'html', '/cadastro.html'))
})

app.get('/meufinanceiro', (req, res)=>{
    if (!req.session.userId){
        return console.log('Você precisa fazer login para ver as financas.')
    }

    res.sendFile(path.join(__dirname, 'html', '/meufinanceiro.html'))
})

app.get('/financas', (req, res)=>{
    if (!req.session.userId){
        return console.log('Você precisa fazer login para ver as financas.')
    }

    const userId = req.session.userId;
    const sql = 'SELECT * FROM FINANCAS WHERE USUARIOID = ?'

    db.query(sql, [userId], (err, results) => {
        if(err){
            console.error('erro ao obter finanças', err)
            return res.status(500).send('Erro ao obter finanças.')
        }
        res.json(results)
    })
})

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body
    const sql = 'INSERT INTO USUARIOS (nome, email, senha) VALUES (?, ?, ?)'

    db.query(sql, [nome, email, senha], (err, result) => {
        if(err) {
            console.error('Erro ao cadastrar usuario: ', err)
            return res.status(500).send('Erro ao cadastrar usuario.')
        }
        console.log('Usuario cadastrado com sucesso: ', result)
        res.send('Cadastro realizado com sucesso!')
    })

})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = 'SELECT * FROM USUARIOS WHERE EMAIL = ? AND SENHA = ?'

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err)
            return res.status(500).send('Erro ao fazer login.')
        }

        if (results.length > 0) {
            req.session.userId = results[0].ID
            console.log('requisição do usuario ' + results[0].NOME + ' do ID: ' + results[0].ID)
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    });
});

app.post('/addfinancas', (req, res) => {
    const { VALOR, GANHO, NOME } = req.body
    const sql = 'INSERT INTO FINANCAS (VALOR, DATA, GANHO, USUARIOID, NOME) VALUES (?, NOW(), ?, ?, ?)'

    db.query(sql, [VALOR, GANHO, req.session.userId, NOME], (err, results) => {
        if(err) {
            console.error('Erro ao adicionar financa: ', err)
        }
        console.log('Financa adicionada: ', results)
        res.send('Financa adicionada!')
    });
});

app.listen(porta, ()=>{console.log('servidor rodando')})

