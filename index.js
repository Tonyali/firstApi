var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mysql= require('mysql');
var _ = require('underscore');

var con = mysql.createConnection({
    host: '192.168.1.39',
    user: 'root',
    password: '1234', 
    database: 'fabrika'
});
con.connect(function(err){
    if (err) throw err;
    console.log('Connected!');
});
/*var sorgu = "SELECT * FROM loglar WHERE makineId=1 AND durum='calisiyor'";
con.query(sorgu, function(err, result){
    if (err) throw err;
    console.log(result);
})*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get', function(req, res){
    res.send('Hello World!');
});
app.post('/post', function(req, res){
    res.send('POST isteği gönderildi..!!');
});
app.put('/getirJson', function(req, res){
    let body = _.pick(req.body, "first_name", "last_name", "Age");
    res.send([body.first_name, body.last_name, body.Age]);
})
app.post('/carpma', function(req, res){
    res.json(req.body.a * req.body.b);
 });

app.post('/getSql', function(req, res){
    var sql = "SELECT * FROM loglar WHERE makineId='"+req.body.makineId + "' AND durum='"+req.body.durum+ "';";
    con.query(sql, function(err, result){
        if(err)throw err;
        console.log('Post request succeeded!!!');
        res.json(result);
    })
    
});

app.listen(6161);

