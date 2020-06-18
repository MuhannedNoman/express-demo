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

// app.post()

// app.put()

// app.delete()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
