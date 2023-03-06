const express = require('express'); // express
const { engine } = require('express-handlebars'); // express-handlebars

const chalk = require('chalk'); // chalk
const path = require('path');

const port = 1337; // port

const app = express();
app.use('/static', express.static('static'));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');



app.get('/', (req, res) => {  // radiance homepagina view
    res.render('home.hbs'); // home.hbs
})

app.get('/filter-page', (req, res) => { //  filter pagina
  res.render('filter-page.hbs');
})

app.listen(port, () => {
  console.log(chalk.magenta(`Running on port: ${port}`))
})

