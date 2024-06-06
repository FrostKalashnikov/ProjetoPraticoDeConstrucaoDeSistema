const conectar = async ()=>{
    if (global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql=require('mysql2/promise')
    const ip = "26.18.32.83" //"localhost"
    const con=mysql.createConnection("mysql://root:password@" + ip + ":3306/AppFinanceiro")
    console.log('Conectou ao banco')
    global.conexao=con
    return con
}

conectar()

module.exports = {}