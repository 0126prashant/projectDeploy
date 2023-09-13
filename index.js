const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration)
const port = process.env.PORT || 8000

app.post('', async (req, res) => {
  console.log(req.body)
  const { type } = req.body
  if (!type) return res.status(400).json({ message: 'no data' })
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Use "gpt-3.5-turbo" for the chat model
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that generates Shayari in both Hindi and English based on user input on ${type}. also take care to send data in a way which can be easily extracted and displayed in both hindi and english at the frontend side.`,
        },
        {
          role: 'user',
          content: `generate a Shayari on ${type}`,
        },
      ],
      temperature: 0.6,
    })
    const result = completion.data.choices[0].message.content

    const [hindiShayari, englishShayari] = result.split('\n\n')

    res.status(200).json({ data: [hindiShayari, englishShayari] })
    console.log(completion)
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
})


// routes for send assignment CODE CONVERTER
// Endpoint to handle code conversion
app.get("/",(req,res)=>{
  res.send("hello")
})
const GPT_API_KEY = process.env.OPENAI_API_KEY;
app.post('/convert', async (req, res) => {
  const { code, toLanguage } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Invalid request. Please provide code' });
  }

  try {

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `Convert this code to ${toLanguage}: ${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});

app.post('/debug', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
  }

  try {

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `${code} debug this code and provide what is write  what we have to change or put`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});
app.post('/check', async (req, res) => {
  const { code,  toLanguage } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
  }

  try {

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `${code} provide me a quality check for this code with the percentage and some details`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});




app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})