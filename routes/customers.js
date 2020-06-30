const express = require('express');
const router = express.Router();

const customersData = [
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

// Handle API route
router.get('/', (req, res) => {
  res.send(customersData);
});

// Handle a route with one param
router.get('/:id', (req, res) => {
  const customer = customersData.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  // 404 resource not found
  if (!customer)
    return res.status(404).send('The customer with the given id was not found');
  res.send(customer);
});

// Handle a route with multiple params
router.get('/:id/:date', (req, res) => {
  res.send(req.params);
});

// Handle a route with query params which are optional
router.get('/:id/:date/:name', (req, res) => {
  res.send(req.query);
});

// Add a new customer
router.post('/', (req, res) => {
  const { error } = validateCustomer(req.body);

  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  const customer = {
    id: customersData.length + 1,
    name: req.body.name,
  };

  customersData.push(customer);

  res.send(customer);
});

// Update resource
router.put('/:id', (req, res) => {
  const customer = customersData.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  customer.name = req.body.name;
  res.send(customer);
});

// Delete resource
router.delete('/:id', (req, res) => {
  const customer = customersData.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (!customer)
    return res.status(404).send('The customer with the given id was not found');

  const index = customersData.indexOf(customer);
  // Delete the selected object
  customersData.splice(index, 1);

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(customer, schema);
}

module.exports = router;
