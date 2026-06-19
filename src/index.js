const express = require('express');
const app = express();

const db = require("./db");
const authRouter = require('./routes/authRoutes');

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
//localhost:3000/auth/signup
app.use("/auth", authRouter);


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