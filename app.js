const express = require('express');

const app = express();

const customers = [
  {
    id: 1,
    name: 'Mark',
  },
  {
    id: 2,
    name: 'James',
  },
  {
    id: 3,
    name: 'Laila',
  },
];

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Handle API route
app.get('/api/customers', (req, res) => {
  res.send(customers);
});

// Handle a route with one param
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer)
    res.status(404).send('The customer with the given id was not found');
  res.send(customer);
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
