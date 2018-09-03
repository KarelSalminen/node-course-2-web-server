const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Environment variable (port) for Heroku:
const port = process.env.PORT || 3000;

var app = express();


app.set('view engine', 'hbs');





//Logging
app.use((req, res, next) => {
    const now = new Date(). toString();

    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to serler.log');
        }
    });
    next();
});

// Maintenance mode
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => { 
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Handler for an http GET request
// app.get('/', (req, res) => {
//     //res.send('<h1>hello Express!</h1>');
//     res.send({
//         name: 'Karel',
//         age: 47,
//         likes: [
//             'coding',
//             'gym',
//             'eating'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome to page',
        welcomeMessage: 'A warm welcome to this fabulous page.',
        title: 'Welcome Page'
    });
});

app.get('/bad', (req, res) => { 
    res.send({
        errorMessage: 'Unable to handle request. Please try again later.'
    });
});




// Bind the application to a port on our machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

//http://http://127.0.0.1:3000/
//localhost:3000