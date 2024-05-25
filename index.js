const express = require('express');
const axios = require('axios');
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/api/news/', async (req, res) => {
    const year=req.query.year
    const month=req.query.month
    const key=req.query.key
  try {
    const response = await axios.get("https://api.nytimes.com/svc/archive/v1/"+year+"/"+month+".json?api-key="+key);
    res.json({response:response.data.response.docs});
  } catch (error) {
    res.status(500).send({ 
        error: 'Error fetching data from New York Times'
    });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port'+PORT);
});