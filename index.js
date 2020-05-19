const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_db'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Database Connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/product', (req, res) => {
    let sql = 'SELECT * FROM product';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/product', (req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = 'INSERT INTO product SET ?';
    let query = conn.query(sql, data,(err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
        // res.send('Product added successfully');
    });
});

app.put('/product', (req, res) => {
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
    console.log('req data',req.body);
    let query = conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.end('Product Updated');
        // res.send('product updated');
    });
});

app.delete('/product', (req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
    let query = conn.query(sql, (err, result) => {
        if (err) {
            console.log('err',err);
            throw err;
        }
        res.end('Record has been deleted');
        // res.send('product deleted');
    });
});

app.listen(3000, () => {
    console.log('Server Started');
})