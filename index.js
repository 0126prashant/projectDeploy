const express = require('express');
const app = express();

require('dotenv').config(); 
const cors=require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const { OpenAIAPI } = require('openai');
const openai = new OpenAIAPI({ key: OPENAI_API_KEY });


// Middleware for parsing JSON requests
app.use(express.json());

app.post('/generate_shayari', async (req, res) => {
    const keyword = req.body.keyword;
  
    // Use ChatGPT to generate Shayari
    try {
      const response = await openai.complete({
        model: 'davinci', // You can try different models if needed
        prompt: `Write me a Shayari on ${keyword}`,
        maxTokens: 50, // Adjust as per your preference
        n: 1
      });
      
      const shayari = response.choices[0].text.trim();
      res.json({ shayari });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
