//server.js

const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api', api.getData);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
