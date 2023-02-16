import chalk from 'chalk';
import express from 'express';

// const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
// const chalk = require('chalk');

app.get('/', onHome).listen(PORT, console.log(chalk.magenta(`Running on port: ${PORT}`)));

function onHome(req, res) {
  res.send('Hallo');
}
