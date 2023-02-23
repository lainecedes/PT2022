const express = require('express'); // express
const app = express();
const chalk = require('chalk'); // chalk
const path = require('path');
const { engine } = require('express-handlebars'); // express-handlebars
const port = 1337; // port

app.use(express.static('static'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {  // radiance homepagina view
    res.render('home');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// app.get('/filter-open', (req, res) => { //  filter pagina
//   res.send('Filter pagina open');
// })

// .listen(port,() => {
// console.log(chalk.magenta(`Running on port: ${port}`))
// })
