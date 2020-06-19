const express = require('express');
const Joi = require('joi');
const e = require('express');

const app = express();

// Allow body parse
app.use(express.json());

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
  // 404 resource not found
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

// Add a new customer
app.post('/api/customers', (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    // 400 bad request
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = {
    id: customers.length + 1,
    name: req.body.name,
  };

  customers.push(customer);

  res.send(customer);
});

// Update resource
app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer)
    res.status(404).send('The customer with the given id was not found');

  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  customer.name = req.body.name;
  res.send(customer);
});

// Delete resource
app.delete('/api/customers/:id', (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer) {
    res.status(404).send('The customer with the given id was not found');
  } else {
    const index = customers.indexOf(customer);
    // Delete the selected object
    customers.splice(index, 1);

    res.send(customer);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(customer, schema);
}
