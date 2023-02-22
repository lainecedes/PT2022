const express = require('express');
const app = express();

const chalk = require('chalk');

const port = 1337; // port

app.use(express.static('static'));


app.get('/', (req, res) => { // radiance homepagina
  res.send('Hallo! Dit is de homepagina');
})

app.get('/filter', (req, res) => { //  filter pagina
  res.send('Filter pagina');
})

app.get('/filter/results', (req, res) => { //  filter pagina + resultaten
  res.send('Resultaten pagina van filters');
})

.listen(port,() => {
console.log(chalk.magenta(`Running on port: ${port}`))
})
