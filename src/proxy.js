// proxy.js
const express = require('express');
const cors = require('cors-anywhere');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.listen(PORT, () => {
  console.log(`CORS Anywhere server is running on http://localhost:${PORT}`);
});
