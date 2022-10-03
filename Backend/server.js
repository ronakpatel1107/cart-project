const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
const { urlencoded } = require('express');
// const multer = require('multer')
const app = express()

app.use(express.json());
app.use(cors());

var isHttp = 'http';
var port = 3001;

var base_url = isHttp + '://localhost:' + port;

const conn = mysql.createConnection(
    {
        user: 'root',
        password: '',
        hostname: 'localhost',
        database: 'test'
    }
)

conn.connect((err) => {
    if (err)
        console.log('error')
    else
        console.log('Database Connected')
})

app.use(express.static('public'));
app.use('/images', express.static('images'));

//listening /tabledata
app.get('/tabledata', (req, res) => {
    conn.query('SELECT a.*, c.name as type FROM all_items a, category c where c.id=a.type order by c.name desc', (err, results) => {
        if (err)
            console.log("error")
        else {
            if (results.length) {
                var tmp = {};
                for (var i in results) {
                    results[i].image = base_url + "/images/" + results[i].image;
                    if (!tmp[results[i].type])
                        tmp[results[i].type] = [];
                    tmp[results[i].type].push(results[i]);
                }
                results = tmp;
            }
            res.send(JSON.stringify(results))
        }

    })
})

app.get('/ViewOrder', (req, res) => {
    conn.query('SELECT * from order_details', (err, results) => {
        if (err)
            console.log("error")
        else 
            console.log(results)
            res.send(JSON.stringify(results))

    })
})

// const storage = multer.diskStorage({
//     destination: (req, image, cb) => {
//         cb(null, './public/images/')
//     },
//     filename: (req, image, cb) => {
//         cb(null, image.originalname)
//     },

// })

// const upload = multer({ storage });

app.post('/storedata', (req, res) => {
    
    let main_keys = [
        name = req.body.name,
        price = req.body.price,
        quantity = req.body.quantity,
        type = req.body.quantity,
        image ='abc.jpg'
    ]
    conn.query("INSERT INTO all_items (name,price,image,quantity,type) VALUES (?,?,?,?,?)", main_keys, (err, results) => {
        if (err)
            console.log("error")
        else {
            console.log(results)
        }

    })
})
app.post('/placeorder', (req, res) => {
    
    let main_keys = [
        username = req.body.username,
        total_items =req.body.total_items,
        total_amount = req.body.total_amount
    ]
    conn.query("INSERT INTO order_details (username,total_items,total_amount) VALUES (?,?,?)", main_keys, (err, results) => {
        if (err)
            console.log("error")
        else {
            console.log(results)
        }

    })
})


app.listen(port, () => {
    console.log('Server Started')
})
