const express = require('express');

const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Handle API route
app.get('/api/customers', (req, res) => {
  res.send(['Ahmed', 'Ali', 'Mark', 'Mona']);
});

// Handle a route with one param
app.get('/api/customers/:id', (req, res) => {
  res.send(req.params.id);
});

// Handle a route with multiple params
app.get('/api/customers/:id/:date', (req, res) => {
  res.send(req.params);
});

// Handle a route with query params which are optional
app.get('/api/customers/:id/:date/:name', (req, res) => {
  res.send(req.query);
});

// app.post()

// app.put()

// app.delete()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
