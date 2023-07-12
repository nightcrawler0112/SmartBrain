const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smartBrain'
    }
  });

//   db.select('*').from('users').then(data=>{
//     console.log(data);
//   });

process.on('uncaughtException', function (err) {
    console.log(err);
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());




app.get('/',(req,res)=>{
    res.send('success');
})

app.post('/signin',(req,res)=>{
//     bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
        const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
        //console.log(isValid);
        if(isValid){
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user=>{
                console.log(user);
                res.json(user[0])
            })
            .catch(err=> res.status(400).json('unable to get user'))
        }

        else{
            res.status(400).json('enter the correct password')
        }
    })
    .catch(err=> res.status(400).json('enter the correct email or password'))
    
})

app.post('/register',(req,res)=>{
    
    const { email,name,password }= req.body;

    const hash = bcrypt.hashSync(password);

        db.transaction(trx=>{
            trx.insert({
                hash:hash,
                email:email
            }).into('login')
            .returning('email')
            .then(loginemail=>{
                        return trx('users')
                        .returning('*')
                        .insert({
                            email: loginemail[0].email,
                            name: name,
                            joined: new Date()
                        }).then(user =>{
                            res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        
    .catch(err => res.status(400).json('unable to register'))
    
})

app.get('/profile/:id',(req,res)=>{
    const { id } = req.params;
   
     db.select('*').from('users').where({
        id:id
     }).then(user=>{
        // console.log(user[0]);
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).json('Not found')
        }

     })
     .catch(err => res.status(400).json('error getting yser'))

    
})


app.put('/image',(req,res)=>{
    const { id } = req.body;
    db('users').where('id','=',id).increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err=> res.status(400).json('unable to get entries'))

    

})


// Load hash from your password DB.

app.listen(3000,()=>{
    console.log('app is running on port 3000')
})


