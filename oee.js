var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mysql= require('mysql');
var _ = require('underscore');
const { lastIndexOf } = require('underscore');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'fabrika'
});
con.connect(function(err){
    if (err) throw err;
    console.log('Connected!');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', function(req, res){
    var sql = "SELECT * FROM operatör WHERE operatörAdı='"+req.body.operatörAdı + "' AND şifre='"+req.body.şifre+ "';";
    con.query(sql, function(err, result){
        if(err)throw err;
        if(result.length > 0){
            console.log('Giriş Yapıldı!!!');
            res.json(result);
        }else{
            console.log('Yanlış isim veya şifre girdiniz!');
        }   
    })    
});


app.listen(6161);

