// lib/apiAdapter.js
import axios from 'axios';
import logger from './logger';

export async function getAIResponse(query, model, userApiKey = null) {
  logger.info(`Processing query for model: ${model}`);

  if (model === 'groq') {
    const endpoint = "https://api.groq.com/openai"; // Real GROQ API endpoint
    try {
      const response = await axios.post(
        endpoint,
        {
          model: "llama3-8b-8192", // Replace with your actual model name
          messages: [{ role: "user", content: query }]
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error(`GROQ API error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      throw new Error("GROQ API call failed.");
    }
  } else if (model === 'together') {
    const endpoint = "https://api.together.ai/v1/chat/completions"; // Real Together AI endpoint
    try {
      const response = await axios.post(
        endpoint,
        {
          model: "gpt-3.5-turbo", // Replace if necessary
          messages: [{ role: "user", content: query }]
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error(`Together AI API error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      throw new Error("Together AI API call failed.");
    }
  } else if (model === 'chatgpt') {
    if (!userApiKey) {
      throw new Error('ChatGPT API key is required for ChatGPT model.');
    }
    const endpoint = "https://api.openai.com/v1/chat/completions"; // OpenAI ChatGPT endpoint
    try {
      const response = await axios.post(
        endpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }]
        },
        {
          headers: {
            "Authorization": `Bearer ${userApiKey}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error(`ChatGPT API error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      throw new Error("ChatGPT API call failed.");
    }
  } else {
    throw new Error('Invalid model selected.');
  }
}
