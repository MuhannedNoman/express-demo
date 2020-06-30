const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');

const customers = require('./routes/customers');
const home = require('./routes/home');

const env = require('./env');

const app = express();
app.use('/api/customers', customers);
app.use('/', home);

// Set the view engein.
app.set('view engine', 'pug');
app.set('views', './views'); //default, change if you wanna override

app.use(helmet());
if (env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
  dbDebugger('DB stuff');
}

// use() -> create a middleware, next refers to the next middlware that take control after this function.
app.use(logger);

app.use(authenticator);

// Allow body parse
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse key&value url old version
// use this to serve static files.
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
