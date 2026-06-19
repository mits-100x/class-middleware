const express = require('express');
const app = express();

let db = [
    {
        username: 'admin',
        password: '123456',
        role: "admin",
        token : "123"
    },
    {
        username: 'user',
        password: '123456',
        role: "user",
        token : "1234"
    }
]

function adminMiddlwware(req,res,next){
    const token = req.headers.token;
    const user = db.find(user => user.token === token);
    if(user.role !== 'admin') {
        return res.status(401).send('Unauthorized');
    }
    req.user = user
    next();
}

function userMiddlwware(req,res,next){
    const token = req.headers.token;
    const user = db.find(user => user.token === token);
    if(user.role !== 'user') {  //ADMIN
        return res.status(401).send('Unauthorized');
    }
    req.user = user
    next();
}

app.post('/adminRoute', adminMiddlwware,(req, res) => {
    const userRole = req.user.role;
    console.log(userRole);
    res.send('Hello World');
});

app.post('/userRoute', userMiddlwware, (req, res) => {
    const userRole = req.user.role;
    console.log(userRole);
    res.send('Hello World');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});