const express = require('express');

const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// app.post()

// app.put()

// app.delete()

app.listen(3000, () => {
  console.log('Server is listening in port 3000');
});
