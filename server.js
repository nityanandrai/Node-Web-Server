const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ' ' + req.method + ' ' + ' ' + req.url;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err)
      console.log('Unable to append server.log');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     message: 'Maintenance work going on. Site would be doen for some time. Please bear with us'
//   });
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('Capitalize', (text) => {
  return text;
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'HBS',
    welcome: 'Welcome to Hell'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/project', (req, res) => {
  res.render(('project.hbs'), {
    pageTitle: 'Project Page',
    message: 'Portfolio'
  });
});

app.listen(port, () => {
  console.log('Server is up and running at port ' + port);
});
