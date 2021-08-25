const express = require('express');
require('dotenv').config({ path: '.env' });

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
