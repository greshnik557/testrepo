const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersdb', 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true
				 });

const UserSchema = new mongoose.Schema({
    name: String,
	passwd: String
});

let Users = mongoose.model('Users', UserSchema);


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'secret'}));


app.get('/signup', (req, res) => {
	res.render('signup');
});


app.post('/signup', (req, res) => {
	
	if(!req.body.id || !req.body.password) {
		res.status("400");
		res.render('signup', {message: "Не введен логин или пароль!"});
	} 
	else if (req.body.id && req.body.password) {
		
		Users.findOne({name: req.body.id}, (err, user) => {

			let newUser = {name: req.body.id, passwd: req.body.password};
			
			if (req.session.user = newUser) {
				Users.create(newUser);
				res.redirect('/');
			}
			else if (user.name == req.body.id) {
				res.render('signup', {message: "Такой пользователь уже есть"});
			}
			if (err) {
				console.log(err);
			}
		});
	}
});

app.get('/login', (req, res) => {
	res.render('login');
});
app.post('/login', (req, res) => {
	if(!req.body.id || !req.body.password) {
		res.render('login', {message: "Введите логин и пароль"});
	}
	else {
		Users.findOne({name: req.body.id}, (err, user) => {
    		if (user.name == req.body.id && user.passwd == req.body.password) {
				res.redirect('/');
			}
			else {
				res.render("login", {message: "Некорректные данные"});
			}
		});	
	}
});

app.get('/', checkSignIn, (req, res) => {
	res.render('protected', {id: req.session.user.name});
});

app.get('/stats', checkSignIn, (req, res) => {
	res.render('stats', {id: req.session.user.name});
});

app.get('/config', checkSignIn, (req, res) => {
	res.render('config', {id: req.session.user.name});
});

function checkSignIn(req, res, next) {
	if(req.session.user) {
		next();
	}
	else {
		next(new Error('Попытка доступа к закрытой странице'));
	}
}

app.get('/logout', (req, res) => {
	res.session.destroy(err => {
		if(!err) {
			res.redirect('/login');
		}
	});
});

app.use('/', (err, req, res, next) => {
	res.redirect('/login');
});

app.listen(8080);