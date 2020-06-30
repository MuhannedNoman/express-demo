const express = require('express');
const router = express.Router();

// Route handler
router.get('/', (req, res) => {
  // res.send('Hello World!!');
  res.render('index', { title: 'Hello world', message: 'My First template' });
});

module.exports = router;
