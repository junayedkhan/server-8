const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const uri = "mongodb+srv://junayed:7890@cluster0.8v6ct.mongodb.net/junayed?retryWrites=true&w=majority";
const app = express();
const port = 5000;
//data
Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log(Error)
})
//data format
const singUpSchema = Mongoose.Schema({
    email:{type:String},
    password:{type:String}
})
//model
const singUp = Mongoose.model('singUp', singUpSchema);



//handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//get handle
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/allpublic', (req, res) => {
    res.render('public')
})
//post handle
app.post('/public', (req, res) => {
   const {email, password} = req.body
   
	const public = new singUp({
		email,
		password
	})
   
	public.save().then(newPublic => {
		if(newPublic){
			res.redirect('/allpublic')
		}
	}).catch(err => {
		console.log('Something went Wrong !')
	})
})

app.listen(port, console.log('server runing '+port))