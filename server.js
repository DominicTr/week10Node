const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 8080;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

hbs.registerHelper('menu', (link) => {
	return link;
})

hbs.registerHelper('meme', () => {
	return 'https://i.kym-cdn.com/photos/images/newsfeed/000/173/576/Wat8.jpg?1315930535'
})

app.use((request, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	// response.render('maintenance.hbs', {
	// 	message1: 'The site is curently down for a maintenance'
	// })
	next();
});
app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.render('home', {
		info: '/info',
		welcome: 'Hello!',
		home: 'home',
		meme2: 'dhttps://www.livemint.com/rf/Image-621x414/LiveMint/Period1/2013/01/16/Photos/house--621x414.jpg'
	})
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		welcome: 'Hello!',
		help: 'help!',
		meme2: 'http://www.themarketingsage.com/wp-content/uploads/2015/08/about-me-leon-severan-we-buy-houses.jpg',
		home: '/'
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});