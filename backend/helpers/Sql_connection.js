const mysql=require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'yassine123456789',
    database:'pfe',
    charset: 'utf8mb4',
})

connection.connect() 

connection.query('Select * from learner', (err, rows, fields) => {
    if(err) throw err
    
    console.log('ConnectedDB')
})

module.exports = connection