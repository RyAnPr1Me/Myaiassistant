// pages/api/integration.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, location, symbol } = req.query;

  try {
    // Weather endpoint using OpenWeatherMap API
    if (type === 'weather' && location) {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
      );
      const weatherData = weatherRes.data;
      return res.status(200).json({
        location,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description
      });
    }
    // News endpoint using NewsAPI.org
    else if (type === 'news' && location) {
      const newsRes = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(location)}&apiKey=${process.env.NEWSAPI_KEY}`
      );
      const articles = newsRes.data.articles;
      return res.status(200).json({ location, articles });
    }
    // Stocks endpoint using Alpha Vantage API
    else if (type === 'stocks' && symbol) {
      const stockRes = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
      );
      const stockData = stockRes.data['Global Quote'];
      if (!stockData || Object.keys(stockData).length === 0) {
        return res.status(404).json({ error: 'Stock data not found.' });
      }
      return res.status(200).json({
        symbol: stockData['01. symbol'],
        price: stockData['05. price'],
        change: stockData['09. change'],
        changePercent: stockData['10. change percent']
      });
    }
    // If none of the conditions match, return error.
    else {
      return res.status(400).json({
        error: 'Invalid query parameters. For weather use type=weather&location=<city>, for news use type=news&location=<topic>, and for stocks use type=stocks&symbol=<symbol>.'
      });
    }
  } catch (error) {
    console.error('Integration API error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'External API call failed.' });
  }
}
