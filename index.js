const express = require('express');
const jwt = require('jsonwebtoken');
const port = 8080;
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome everyone!'
    })
})

//checking verification
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }
        else
        {
            res.json({
                message: 'Post created ...',
                data
            })
        }
    })
})
//Format of the token
// Authorization: Bearer <token>
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'abc',
        email: 'abc@gmail.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn : '30s'}, (err, token) => {
        res.json({
            token
        })
    })
})

//verify token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
   console.log(`Server is running on port: ${port}`)
})