const express = require('express')
const mysql =  require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

var isHttp = 'http'; 
var port = 3001;

var base_url = isHttp + '://localhost:' + port;

const conn = mysql.createConnection(
    {
        user : 'root',
        password : '',
        hostname :'localhost',
        database :'test'
    }
)

conn.connect((err)=>{
    if(err)
        console.log('error')
    else
        console.log('Database Connected')
})

app.use(express.static('public')); 
app.use('/images', express.static('images'));

//listening /tabledata
app.get('/tabledata',(req,res)=>{
    conn.query('SELECT a.*, c.name as type FROM all_items a, category c where c.id=a.type order by c.name desc',(err,results)=>{
        if(err)
            console.log("error")
        else
        {
            if(results.length)
            {
                var tmp = {};
                for(var i in results)
                {
                  results[i].image = base_url + "/images/" + results[i].image;
                  if(!tmp[results[i].type])
                    tmp[results[i].type] = [];
                  tmp[results[i].type].push(results[i]);
                }
                results = tmp;
            }
            res.send(JSON.stringify(results))
        }

    })
})


app.listen(port,()=>{
    console.log('Server Started')
})
  