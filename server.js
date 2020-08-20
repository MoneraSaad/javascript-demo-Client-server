const express = require('express');
const app = express();

const url = "mongodb+srv://UserName:Password@cluster0.gkvm6.mongodb.net/test";
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static('public'));

const User = mongoose.model("User", {
    userName: String,
    email: String,
    Password: String,
    imgUrl: String,
    online:Boolean
});


//register user and save to the database
app.post('/Register', function (req, res) {
    console.log('hereeeee');
    const {userName,email,password,imgUrl} = req.body;
    let { success } = false;
     let newUser = new User({userName:userName, email:email, Password: password, imgUrl:imgUrl,online:false});
    User.find({userName:userName, email:email}, function (err, doc) {
        if (doc.length === 0 || doc.length === []) {
            newUser.save().then(docs => { console.log('user saved to the databade, user name: ',userName) });
            res.send([{ success: true }])
        } else {
            console.log("user Found")
            res.send([{ success: false }])
        }
    })
})

//check user in the database if yes login id no return false
app.post('/checkUser', function (req, res) {
    let {success} = false;
    
    const {email,password}=req.body;
    User.find({email:email,Password:password}, function (err, doc) {
        if (doc.length === 0 || doc.length === []) {
            res.send([{success:false}])
        } else {
            let val=true;
            User.updateOne({email:email}, {online:val}, function (err, docs) {
                res.send([{success: true}, {doc:doc}])
              })
        }
    })
})

app.get('/getUsers', function (req, res) {
    let {success} = false;
    User.find({}, function (err, doc) {
        if (doc.length === 0 || doc.length === []) {
            res.send([{success:false}])
        } else {
            res.send([{doc}])
        }
    })
})

app.get('/group', (req, res) => {
    User.find({}, function (err, docs) {
        res.send(docs);

    })
})








const port = process.env.PORT || 3000
app.listen(port, () => { console.log('server listen on port ', port) })