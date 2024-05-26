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
    const newresponse=response.data.response.docs.map((doc) =>{ 
        const {document_type,news_desk,section_name,subsection_name,type_of_material,_id,word_count,uri,...rest}= doc
        return rest
    })
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET");
    res.json({response:newresponse});
  } catch (error) {
    res.status(500).send({ 
        error: 'Error fetching data from New York Times'
    });
  }
});

app.get('/api/test/', async (req, res) => {
    const saludo=req.query.saludo
    const nombre=req.query.nombre
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET");
    res.send({msg: saludo+" "+nombre})
})

app.listen(PORT, () => {
  console.log('Server running on port'+PORT);
});