const express = require('express'); // express
const { engine } = require('express-handlebars'); // express-handlebars
const chalk = require('chalk'); // chalk
const path = require('path'); // path
const app = express();
const port = 1337; // port


app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true})); // parses form data

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');




app.get('/', (req, res) => {  // radiance homepagina view
    res.render('home.hbs', {title: 'Radiance - Home'}); // home.hbs
})

app.get('/filter-page', (req, res) => { //  filter pagina
  res.render('filter-page.hbs', {title: 'Radiance - Filter'});
})

// post method

app.post('/filter-page', (req, res) => { //  filter pagina druk op submit en dan post
    res.render('filter-results.hbs'); 
})




app.listen(port, () => {
  console.log(chalk.magenta(`Running on port: ${port}`))
})

