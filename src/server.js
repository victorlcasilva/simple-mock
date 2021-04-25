const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3333;

app.use('/', routes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
