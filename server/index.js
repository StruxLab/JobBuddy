const express = require('express');
require('dotenv').config();

const responseHandler = require('./routes/responseHandler');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./models/v1/authentication'));

app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    method: req.method,
    path: req.url,
  });
});

app.use(responseHandler);

app.listen(PORT, () => {
  process.stdout.write(`JobBuddy API Server started on port ${PORT}.\n`);
});
